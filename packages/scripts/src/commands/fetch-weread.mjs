import path from "node:path";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { parseArgs } from "../lib/args.mjs";
import { loadRepoEnv } from "../lib/env.mjs";
import { info, task } from "../lib/log.mjs";
import { writeJson } from "../lib/json.mjs";
import {
  applyCategoryOverrides,
  applyTitleOverrides,
  loadOverrideTable,
  overrideTableFile,
} from "../lib/overrides.mjs";
import { repoRelative, wereadDataFile } from "../lib/paths.mjs";

dayjs.extend(utc);
dayjs.extend(timezone);

const SKILL_VERSION = "1.0.4";
const WEREAD_API_URL = "https://i.weread.qq.com/api/agent/gateway";
const MODES = ["weekly", "monthly", "annually", "overall"];
/** 微信读书按 Asia/Shanghai（UTC+8，无夏令时）划分“今天/当月”。 */
const SHANGHAI_TZ = "Asia/Shanghai";
/** 热力图的日级数据窗口（月）。 */
const DAILY_WINDOW_MONTHS = 6;

async function postApi(body) {
  const apiKey = process.env.WEREAD_API_KEY;
  if (!apiKey) {
    throw new Error(
      "WEREAD_API_KEY 未设置，请写入仓库根目录 .env.local 或进程环境变量。",
    );
  }

  const res = await fetch(WEREAD_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok || (json.errcode && json.errcode !== 0)) {
    throw new Error(
      `微信读书接口请求失败，api=${body.api_name}, 错误：${json.errmsg || JSON.stringify(json)}`,
    );
  }

  return json;
}

async function fetchMode(mode) {
  return postApi({
    api_name: "/readdata/detail",
    mode,
    skill_version: SKILL_VERSION,
  });
}

/**
 * 收集最近半年的每日阅读时长（秒）。
 * /readdata/detail 的年粒度只返回月桶，要拿到日级数据需按连续自然月逐个查询 monthly，
 * 并合并各月返回的 readTimes（key 为每日 00:00 时间戳，value 为秒数）。
 * 窗口固定取最近 6 个月，避免页面热力图过宽。
 */
async function fetchDailyReadTimes() {
  const monthBuckets = {};
  // 以上海“今天”为基准，避免抓取月份随构建/机器时区漂移。
  const today = dayjs().tz(SHANGHAI_TZ);

  for (let i = DAILY_WINDOW_MONTHS - 1; i >= 0; i -= 1) {
    // 上海当月 1 日 00:00，供 /readdata/detail 归一化到该月（monthStart.unix() 即该时刻的 UTC 秒）。
    const monthStart = today.subtract(i, "month").startOf("month");
    const done = task(`Fetching daily read times for ${monthStart.format("YYYY-MM")}`);
    const data = await postApi({
      api_name: "/readdata/detail",
      mode: "monthly",
      baseTime: monthStart.unix(),
      skill_version: SKILL_VERSION,
    });
    Object.assign(monthBuckets, data.readTimes ?? {});
    done(`${Object.keys(data.readTimes ?? {}).length} days`);
  }

  return monthBuckets;
}

async function fetchShelf() {
  return postApi({
    api_name: "/shelf/sync",
    skill_version: SKILL_VERSION,
  });
}

async function fetchBookInfo(bookId) {
  return postApi({
    api_name: "/book/info",
    bookId,
    skill_version: SKILL_VERSION,
  });
}

async function fetchBookProgress(bookId) {
  return postApi({
    api_name: "/book/getprogress",
    bookId,
    skill_version: SKILL_VERSION,
  });
}

async function run(argv) {
  loadRepoEnv();

  const { options } = parseArgs(argv);
  const out = options.get("out");
  const outputFile = out ? path.resolve(process.cwd(), out) : wereadDataFile;

  const categoryOverrides = await loadOverrideTable(
    overrideTableFile("weread", "category-overrides.json"),
  );
  const titleOverrides = await loadOverrideTable(
    overrideTableFile("weread", "title-overrides.json"),
  );

  const result = {
    updatedAt: new Date().toISOString(),
    modes: {},
    shelf: {},
    progressMap: {},
    readTimesByDay: {},
  };

  for (const mode of MODES) {
    const done = task(`Fetching WeRead data for mode=${mode}`);
    result.modes[mode] = await fetchMode(mode);
    done();
  }

  const doneShelf = task("Fetching shelf data");
  const shelfData = await fetchShelf();
  doneShelf();

  const books = Array.isArray(shelfData.books) ? shelfData.books : [];
  const enrichedBooks = [];
  for (const book of books) {
    if (!book?.bookId) continue;
    const done = task(`Fetching book info for bookId=${book.bookId}`);
    const bookInfo = await fetchBookInfo(book.bookId);
    const bookDetail = bookInfo.book ?? bookInfo;
    enrichedBooks.push({ ...book, ...bookDetail });
    done();
  }

  applyCategoryOverrides(enrichedBooks, categoryOverrides);

  result.shelf = {
    ...shelfData,
    books: enrichedBooks,
  };

  for (const book of enrichedBooks) {
    if (!book?.bookId) continue;
    const done = task(`Fetching progress for bookId=${book.bookId}`);
    const bookProgress = await fetchBookProgress(book.bookId);
    result.progressMap[book.bookId] = bookProgress.book ?? bookProgress;
    done();
  }

  info(`Fetching daily read times for the past ${DAILY_WINDOW_MONTHS} months`);
  result.readTimesByDay = await fetchDailyReadTimes();

  applyTitleOverrides(result, titleOverrides);

  await writeJson(outputFile, result);
  info(`Saved WeRead data to ${repoRelative(outputFile)}`);
}

export default {
  name: "fetch-weread",
  describe: "拉取微信读书数据（阅读统计 / 书架 / 进度 / 热力图）并写入 content/weread",
  usage: "[--out <file>]",
  run,
};
