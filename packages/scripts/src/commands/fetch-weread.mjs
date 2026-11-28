import path from "node:path";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { parseArgs } from "../lib/args.mjs";
import { mapLimit, sleep } from "../lib/async.mjs";
import { loadRepoEnv } from "../lib/env.mjs";
import { info, task } from "../lib/log.mjs";
import { writeJsonIfChanged } from "../lib/json.mjs";
import {
  applyCategoryOverrides,
  applyTitleOverrides,
  loadOverrideTable,
  overrideTableFile,
} from "../lib/overrides.mjs";
import { repoRelative, wereadDataFile } from "../lib/paths.mjs";

dayjs.extend(utc);
dayjs.extend(timezone);

const SKILL_VERSION = "1.0.6";
const WEREAD_API_URL = "https://i.weread.qq.com/api/agent/gateway";
/** 微信读书按 Asia/Shanghai（UTC+8，无夏令时）划分“今天/当月”。 */
const SHANGHAI_TZ = "Asia/Shanghai";
/** 热力图的日级数据窗口（月）。 */
const DAILY_WINDOW_MONTHS = 6;
const REQUEST_TIMEOUT_MS = 30_000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 500;
const CONCURRENCY = 4;

/** 仅保留页面消费所需的书架书籍字段，剔除 intro/price 等大段冗余属性。 */
export function slimShelfBook(book) {
  return {
    ...(book.bookId ? { bookId: book.bookId } : {}),
    ...(book.title ? { title: book.title } : {}),
    ...(book.author ? { author: book.author } : {}),
    ...(book.category ? { category: book.category } : {}),
    ...(book.cover ? { cover: book.cover } : {}),
    ...(book.deepLink ? { deepLink: book.deepLink } : {}),
    ...(book.finishReading != null ? { finishReading: book.finishReading } : {}),
  };
}

/** 仅保留页面消费所需的进度字段，剔除每日波动的同步元信息。 */
export function slimProgressEntry(entry) {
  if (!entry || typeof entry !== "object") return {};
  return {
    ...(entry.progress != null ? { progress: entry.progress } : {}),
    ...(entry.readingTime != null ? { readingTime: entry.readingTime } : {}),
    ...(entry.readTime != null ? { readTime: entry.readTime } : {}),
    ...(entry.recordReadingTime != null
      ? { recordReadingTime: entry.recordReadingTime }
      : {}),
    ...(entry.finishTime != null ? { finishTime: entry.finishTime } : {}),
  };
}

async function postApi(body) {
  const apiKey = process.env.WEREAD_API_KEY;
  if (!apiKey) {
    throw new Error(
      "WEREAD_API_KEY 未设置，请写入仓库根目录 .env.local 或进程环境变量。",
    );
  }

  let lastError;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const res = await fetch(WEREAD_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      const rawText = typeof res.text === "function" ? await res.text() : null;
      let json;
      if (rawText !== null) {
        try {
          json = JSON.parse(rawText);
        } catch {
          if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES) {
            await sleep(RETRY_DELAY_MS * (attempt + 1));
            continue;
          }
          throw new Error(
            `微信读书接口返回非 JSON 响应，api=${body.api_name}, status=${res.status}`,
          );
        }
      } else {
        json = await res.json();
      }

      if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * (attempt + 1));
        continue;
      }

      if (!res.ok || (json.errcode && json.errcode !== 0)) {
        throw new Error(
          `微信读书接口请求失败，api=${body.api_name}, status=${res.status}, 错误：${json.errmsg || JSON.stringify(json)}`,
        );
      }

      return json;
    } catch (err) {
      lastError = err;
      const isRetryable =
        err?.name === "TimeoutError" ||
        err?.name === "AbortError" ||
        err?.name === "TypeError";
      if (isRetryable && attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * (attempt + 1));
        continue;
      }
      throw err;
    }
  }

  throw lastError;
}

async function fetchOverallMode() {
  const data = await postApi({
    api_name: "/readdata/detail",
    mode: "overall",
    skill_version: SKILL_VERSION,
  });
  return {
    ...(data.totalReadTime != null ? { totalReadTime: data.totalReadTime } : {}),
  };
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
  const months = Array.from({ length: DAILY_WINDOW_MONTHS }, (_, index) =>
    today.subtract(DAILY_WINDOW_MONTHS - 1 - index, "month").startOf("month"),
  );

  const buckets = await mapLimit(months, CONCURRENCY, async (monthStart) => {
    const done = task(`Fetching daily read times for ${monthStart.format("YYYY-MM")}`);
    const data = await postApi({
      api_name: "/readdata/detail",
      mode: "monthly",
      baseTime: monthStart.unix(),
      skill_version: SKILL_VERSION,
    });
    const readTimes = data.readTimes ?? {};
    done(`${Object.keys(readTimes).length} days`);
    return readTimes;
  });

  for (const readTimes of buckets) {
    Object.assign(monthBuckets, readTimes);
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

/**
 * 拉取笔记本概览的全部页（有笔记的书）。
 * /user/notebooks 用游标分页：下一页的 lastSort 取上一页最后一项的 sort，
 * 业务参数必须平铺在 body 顶层（见 WeRead Skill 的 notes 文档）。
 */
async function fetchNotebooks() {
  const books = [];
  let lastSort;
  for (;;) {
    const body = {
      api_name: "/user/notebooks",
      count: 100,
      skill_version: SKILL_VERSION,
    };
    if (lastSort !== undefined) body.lastSort = lastSort;
    const data = await postApi(body);
    const page = Array.isArray(data.books) ? data.books : [];
    books.push(...page);
    if (!data.hasMore || !page.length) break;
    lastSort = page[page.length - 1]?.sort;
    if (lastSort === undefined) break;
  }
  return books;
}

/**
 * 汇总全部划线（书摘）：只对 noteCount > 0 的书逐本调 /book/bookmarklist
 * （该接口已过滤书签，只返回划线）。归一成扁平数组存入产物，
 * 顺序为笔记本顺序（最近有笔记的书在前）× 接口返回顺序，构建期不再加工。
 * 书名以书架条目为准（与页面其他区域口径一致），并套用 title 覆盖表。
 */
async function fetchHighlights(shelfBooks, titleOverrides) {
  const shelfById = new Map(shelfBooks.map((book) => [book.bookId, book]));
  const notebooks = await fetchNotebooks();

  const targets = notebooks.filter((notebook) => {
    const bookId = notebook?.bookId;
    // CB_ 前缀是用户自己导入的书，书摘不收录这类书，只保留微信读书书城的正式书籍。
    return Boolean(bookId && notebook.noteCount > 0 && !bookId.startsWith("CB_"));
  });

  const perBookHighlights = await mapLimit(targets, CONCURRENCY, async (notebook) => {
    const bookId = notebook.bookId;
    const done = task(`Fetching highlights for bookId=${bookId}`);
    const data = await postApi({
      api_name: "/book/bookmarklist",
      bookId,
      skill_version: SKILL_VERSION,
    });
    const chapterTitleByUid = new Map(
      (Array.isArray(data.chapters) ? data.chapters : []).map((chapter) => [
        chapter.chapterUid,
        chapter.title,
      ]),
    );
    const shelfBook = shelfById.get(bookId) ?? {};
    const apiBook = data.book ?? notebook.book ?? {};
    const title = titleOverrides[bookId] ?? shelfBook.title ?? apiBook.title;
    const author = shelfBook.author ?? apiBook.author;
    const cover = shelfBook.cover ?? apiBook.cover;
    const book = {
      bookId,
      ...(title ? { title } : {}),
      ...(author ? { author } : {}),
      ...(cover ? { cover } : {}),
    };
    const items = [];
    for (const item of Array.isArray(data.updated) ? data.updated : []) {
      if (!item?.bookmarkId || !item?.markText) continue;
      const chapterTitle = chapterTitleByUid.get(item.chapterUid);
      items.push({
        bookmarkId: item.bookmarkId,
        bookId,
        ...(chapterTitle ? { chapterTitle } : {}),
        markText: item.markText,
        ...(item.createTime != null ? { createTime: item.createTime } : {}),
        book,
      });
    }
    done(`${items.length} highlights`);
    return items;
  });

  return perBookHighlights.flat();
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

  const doneOverall = task("Fetching WeRead overall summary");
  const overallMode = await fetchOverallMode();
  doneOverall();

  const doneShelf = task("Fetching shelf data");
  const shelfData = await fetchShelf();
  doneShelf();

  const rawBooks = (Array.isArray(shelfData.books) ? shelfData.books : []).filter(
    (book) => Boolean(book?.bookId),
  );
  const enrichedBooks = await mapLimit(rawBooks, CONCURRENCY, async (book) => {
    const done = task(`Fetching book info for bookId=${book.bookId}`);
    const bookInfo = await fetchBookInfo(book.bookId);
    const bookDetail = bookInfo.book ?? bookInfo;
    done();
    return { ...book, ...bookDetail };
  });

  applyCategoryOverrides(enrichedBooks, categoryOverrides);
  const slimBooks = enrichedBooks.map(slimShelfBook);

  const progressEntries = await mapLimit(slimBooks, CONCURRENCY, async (book) => {
    const done = task(`Fetching progress for bookId=${book.bookId}`);
    const bookProgress = await fetchBookProgress(book.bookId);
    done();
    return [book.bookId, slimProgressEntry(bookProgress.book ?? bookProgress)];
  });
  const progressMap = Object.fromEntries(progressEntries);

  info(`Fetching daily read times for the past ${DAILY_WINDOW_MONTHS} months`);
  const readTimesByDay = await fetchDailyReadTimes();

  const result = {
    updatedAt: new Date().toISOString(),
    modes: {
      weekly: {},
      monthly: {},
      annually: {},
      overall: overallMode,
    },
    shelf: {
      books: slimBooks,
    },
    progressMap,
    readTimesByDay,
    highlights: [],
  };

  applyTitleOverrides(result, titleOverrides);

  // 划线在覆盖表生效后再拉：fetchHighlights 内部按 bookId 手工套用 title 覆盖，
  // 避免把 highlights 放进 result 后被递归覆盖在条目顶层多写一个 title 字段。
  info("Fetching highlights (bookmarks) for all noted books");
  result.highlights = await fetchHighlights(result.shelf.books, titleOverrides);
  info(`Fetched ${result.highlights.length} highlights`);

  const { written } = await writeJsonIfChanged(outputFile, result);
  if (written) {
    info(`Saved WeRead data to ${repoRelative(outputFile)}`);
  } else {
    info(`WeRead data unchanged, skipped writing ${repoRelative(outputFile)}`);
  }
}

export default {
  name: "fetch-weread",
  describe: "拉取微信读书数据（阅读统计 / 书架 / 进度 / 热力图 / 划线书摘）并写入 content/weread",
  usage: "[--out <file>]",
  run,
};
