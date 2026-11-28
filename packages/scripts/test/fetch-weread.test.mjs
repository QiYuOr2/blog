import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import fetchWeread, {
  slimProgressEntry,
  slimShelfBook,
} from "../src/commands/fetch-weread.mjs";
import { readJson } from "../src/lib/json.mjs";
import { wereadDataFile } from "../src/lib/paths.mjs";

/**
 * 用仓库里已提交的 weread.json 反过来造接口响应，验证
 * 「拉取 → 字段裁剪 → 套覆盖表 → 仅变更落盘」这条链路。
 */
function createFetchStub(fixture) {
  const reply = (payload) => ({
    ok: true,
    status: 200,
    text: async () => JSON.stringify(payload),
    json: async () => payload,
  });

  const monthFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
  });
  const monthOf = (unixSeconds) => monthFormatter.format(new Date(unixSeconds * 1000));

  const readTimesForMonth = (baseTime) =>
    Object.fromEntries(
      Object.entries(fixture.readTimesByDay).filter(
        ([ts]) => monthOf(Number(ts)) === monthOf(baseTime),
      ),
    );

  return async (_url, init) => {
    const { api_name: apiName, mode, bookId, baseTime } = JSON.parse(init.body);

    if (apiName === "/readdata/detail" && mode) {
      return reply(
        mode === "monthly"
          ? {
              ...fixture.modes.monthly,
              readTimes: readTimesForMonth(baseTime ?? fixture.modes.monthly.baseTime),
            }
          : fixture.modes[mode],
      );
    }
    if (apiName === "/shelf/sync") {
      return reply(fixture.shelf);
    }
    if (apiName === "/book/info") {
      return reply({ book: {} });
    }
    if (apiName === "/book/getprogress") {
      return reply({ book: fixture.progressMap[bookId] ?? {} });
    }
    if (apiName === "/user/notebooks") {
      const seen = new Map();
      for (const item of fixture.highlights ?? []) {
        const entry = seen.get(item.bookId) ?? { bookId: item.bookId, noteCount: 0, sort: seen.size };
        entry.noteCount += 1;
        seen.set(item.bookId, entry);
      }
      return reply({ books: [...seen.values()], hasMore: 0 });
    }
    if (apiName === "/book/bookmarklist") {
      const items = (fixture.highlights ?? []).filter((item) => item.bookId === bookId);
      const chapters = [];
      const seenChapters = new Set();
      for (const item of items) {
        if (item.chapterUid === undefined || seenChapters.has(item.chapterUid)) continue;
        seenChapters.add(item.chapterUid);
        chapters.push({ chapterUid: item.chapterUid, title: item.chapterTitle });
      }
      return reply({
        updated: items.map((item) => ({
          bookmarkId: item.bookmarkId,
          bookId: item.bookId,
          chapterUid: item.chapterUid,
          markText: item.markText,
          createTime: item.createTime,
          range: item.range,
          colorStyle: item.colorStyle,
        })),
        chapters,
        book: items[0]?.book ?? {},
      });
    }
    throw new Error(`未预期的接口调用：${apiName}`);
  };
}

test("fetch-weread 裁剪冗余字段、复现核心数据，并在数据无变化时跳过重写", async () => {
  const fixture = await readJson(wereadDataFile, { fallback: null });
  assert.ok(fixture, "缺少 content/weread/weread.json，无法对照");

  const originalFetch = globalThis.fetch;
  const originalWrite = process.stdout.write;
  const originalLog = console.log;
  const originalKey = process.env.WEREAD_API_KEY;
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "tabi-weread-"));
  const outFile = path.join(tmpDir, "weread.json");

  let firstRaw = "";
  let secondRaw = "";
  try {
    globalThis.fetch = createFetchStub(fixture);
    process.env.WEREAD_API_KEY = "test-key";
    process.stdout.write = () => true;
    console.log = () => {};

    await fetchWeread.run(["--out", outFile]);
    firstRaw = await fs.readFile(outFile, "utf-8");

    // 第二次跑同一份接口数据：应跳过写入并保留第一次的 updatedAt。
    await new Promise((resolve) => setTimeout(resolve, 10));
    await fetchWeread.run(["--out", outFile]);
    secondRaw = await fs.readFile(outFile, "utf-8");
  } finally {
    globalThis.fetch = originalFetch;
    process.stdout.write = originalWrite;
    console.log = originalLog;
    if (originalKey === undefined) delete process.env.WEREAD_API_KEY;
    else process.env.WEREAD_API_KEY = originalKey;
    await fs.rm(tmpDir, { recursive: true, force: true });
  }

  const generated = JSON.parse(firstRaw);
  assert.equal(generated.shelf.books.length, fixture.shelf.books.length);
  assert.deepEqual(generated.shelf.books[0], slimShelfBook(fixture.shelf.books[0]));
  assert.equal(Object.keys(generated.progressMap).length, generated.shelf.books.length);
  const firstBookId = generated.shelf.books[0].bookId;
  assert.deepEqual(
    generated.progressMap[firstBookId],
    slimProgressEntry(fixture.progressMap[firstBookId]),
  );
  assert.deepEqual(generated.readTimesByDay, fixture.readTimesByDay);
  assert.equal(generated.highlights.length, fixture.highlights.length);
  // 产物格式固定：2 空格缩进、行尾无换行。
  assert.ok(!firstRaw.endsWith("\n"));
  // 二次运行数据无变化，应保持完全一致（含 updatedAt 未变）。
  assert.equal(secondRaw, firstRaw);
});
