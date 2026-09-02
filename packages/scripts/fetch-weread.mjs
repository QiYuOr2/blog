import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const SKILL_VERSION = "1.0.4";
const WEREAD_API_URL = "https://i.weread.qq.com/api/agent/gateway";
const MODES = ["weekly", "monthly", "annually", "overall"];
/** 微信读书按 Asia/Shanghai（UTC+8，无夏令时）划分“今天/当月”。 */
const SHANGHAI_TZ = "Asia/Shanghai";

const scriptRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptRoot, "../..");
const dataDir = path.join(repoRoot, "content", "weread");
const outputFile = path.join(dataDir, "weread.json");
const overridesFile = path.join(scriptRoot, "category-overrides.json");

async function loadCategoryOverrides() {
  try {
    const raw = await fs.readFile(overridesFile, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") {
      return {};
    }
    throw err;
  }
}

async function postApi(body) {
  const apiKey = process.env.WEREAD_API_KEY;
  if (!apiKey) {
    throw new Error("WEREAD_API_KEY 未设置，请在构建环境中配置该环境变量。");
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
  for (let i = 5; i >= 0; i -= 1) {
    // 上海当月 1 日 00:00，供 /readdata/detail 归一化到该月（monthStart.unix() 即该时刻的 UTC 秒）。
    const monthStart = today.subtract(i, "month").startOf("month");
    const baseTime = monthStart.unix();
    const label = monthStart.format("YYYY-MM");
    process.stdout.write(`Fetching daily read times for ${label}... `);
    const data = await postApi({
      api_name: "/readdata/detail",
      mode: "monthly",
      baseTime,
      skill_version: SKILL_VERSION,
    });
    Object.assign(monthBuckets, data.readTimes ?? {});
    process.stdout.write(`done (${Object.keys(data.readTimes ?? {}).length} days)\n`);
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

async function main() {
  await fs.mkdir(dataDir, { recursive: true });
  const categoryOverrides = await loadCategoryOverrides();

  const result = {
    updatedAt: new Date().toISOString(),
    modes: {},
    shelf: {},
    progressMap: {},
    readTimesByDay: {},
  };

  for (const mode of MODES) {
    process.stdout.write(`Fetching WeRead data for mode=${mode}... `);
    const data = await fetchMode(mode);
    result.modes[mode] = data;
    process.stdout.write("done\n");
  }

  process.stdout.write("Fetching shelf data... ");
  const shelfData = await fetchShelf();
  process.stdout.write("done\n");

  const books = Array.isArray(shelfData.books) ? shelfData.books : [];
  const enrichedBooks = [];
  for (const book of books) {
    if (!book?.bookId) continue;
    process.stdout.write(`Fetching book info for bookId=${book.bookId}... `);
    const bookInfo = await fetchBookInfo(book.bookId);
    const bookDetail = bookInfo.book ?? bookInfo;
    enrichedBooks.push({ ...book, ...bookDetail });
    process.stdout.write("done\n");
  }

  for (const book of enrichedBooks) {
    const override = categoryOverrides[book.bookId];
    if (override) {
      book.category = override;
    }
  }

  result.shelf = {
    ...shelfData,
    books: enrichedBooks,
  };

  for (const book of enrichedBooks) {
    if (!book?.bookId) continue;
    process.stdout.write(`Fetching progress for bookId=${book.bookId}... `);
    const bookProgress = await fetchBookProgress(book.bookId);
    result.progressMap[book.bookId] = bookProgress.book ?? bookProgress;
    process.stdout.write("done\n");
  }

  process.stdout.write("Fetching daily read times for the past 6 months...\n");
  result.readTimesByDay = await fetchDailyReadTimes();

  await fs.writeFile(outputFile, JSON.stringify(result, null, 2), "utf-8");
  console.log(`Saved WeRead data to ${path.relative(repoRoot, outputFile)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
