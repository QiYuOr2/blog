import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import {
  applyCategoryOverrides,
  applyTitleOverrides,
  loadOverrideTable,
  overrideTableFile,
} from "../src/lib/overrides.mjs";

const TITLE_TABLE = { b1: "改名后的书" };

test("applyTitleOverrides 递归命中嵌套在数组 / 对象里的书籍", () => {
  const payload = {
    modes: {
      monthly: { readLongest: [{ book: { bookId: "b1", title: "原名" } }] },
    },
    shelf: {
      books: [
        { bookId: "b1", title: "原名" },
        { bookId: "b2", title: "不受影响" },
      ],
    },
  };

  applyTitleOverrides(payload, TITLE_TABLE);

  assert.equal(payload.modes.monthly.readLongest[0].book.title, "改名后的书");
  assert.equal(payload.shelf.books[0].title, "改名后的书");
  assert.equal(payload.shelf.books[1].title, "不受影响");
});

test("applyCategoryOverrides 只改命中的书架条目", () => {
  const books = [
    { bookId: "b1", category: "未分类" },
    { bookId: "b2" },
    { title: "没有 bookId" },
  ];

  applyCategoryOverrides(books, { b1: "轻小说", b2: "文学" });

  assert.equal(books[0].category, "轻小说");
  assert.equal(books[1].category, "文学");
  assert.equal(books[2].category, undefined);
});

test("覆盖表：缺失时返回空对象，存在的表能读成对象", async () => {
  const missing = await loadOverrideTable(
    path.join(import.meta.dirname, "fixtures", "not-exists.json"),
  );
  assert.deepEqual(missing, {});

  const real = await loadOverrideTable(
    overrideTableFile("weread", "title-overrides.json"),
  );
  assert.equal(typeof real, "object");
});

test("覆盖表写坏时要抛错，而不是静默忽略", async () => {
  await assert.rejects(
    () => loadOverrideTable(path.join(import.meta.dirname, "fixtures", "broken.json")),
    SyntaxError,
  );
});
