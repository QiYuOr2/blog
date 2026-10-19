import assert from "node:assert/strict";
import test from "node:test";
import {
  getCardDuration,
  getSeriesInfo,
  groupShelfSeries,
  indexSeriesOverrides,
  parseSeriesOverrides,
  shouldRenderCard,
  type ShelfCard,
} from "./series-utils.ts";

const book = (title, extra = {}) => ({ title, bookId: title, ...extra });

/** 模拟白名单：`series-overrides.json` 的结构。 */
const overrides = parseSeriesOverrides([
  {
    name: "君主·埃尔梅罗二世事件簿",
    books: {
      e1: 1,
      e2: 2,
      e5: 5,
      e10: 10,
    },
  },
  {
    name: "安达与岛村",
    books: { a1: 1, a2: 2, a11: 11 },
  },
]);

/** 真实书架上的写法：全名与缩写混排、简繁混排。 */
const SHELF = [
  { title: "君主·埃尔梅罗二世事件簿1　case.剥离塔阿德拉", bookId: "e1" },
  { title: "魔女之旅 3", bookId: "m3" },
  { title: "事件簿2　case.双貌塔伊泽路玛（上）", bookId: "e2" },
  { title: "安達與島村2", bookId: "a2" },
  { title: "事件簿5　case.魔眼收集列车（下）", bookId: "e5" },
  { title: "魔女之旅 1", bookId: "m1" },
  { title: "安达与岛村 11", bookId: "a11" },
  { title: "君主·埃尔梅罗二世事件簿10　case.冠位决议（下）", bookId: "e10" },
  { title: "安達與島村", bookId: "a1" },
];

test("分组完全由白名单决定：没登记的书一律单本", () => {
  const cards = groupShelfSeries(SHELF, overrides);
  const series = cards.filter((card) => card.kind === "series");
  const singles = cards.filter((card) => card.kind === "book");

  // 只有白名单里的两个系列成组；「魔女之旅 1/3」虽然书名规律明显，但没登记，仍是两张单本卡。
  assert.deepEqual(
    series.map((card) => card.books.length).sort((a, b) => a - b),
    [3, 4],
  );
  assert.deepEqual(
    singles.map((card) => card.book.bookId).sort(),
    ["m1", "m3"],
  );
});

test("系列卡出现在系列首册的书架位置，且不丢不重", () => {
  const cards = groupShelfSeries(SHELF, overrides);

  // 第一册在书架第 1 位（e1），因此首张卡就是该系列。
  assert.equal(cards[0].kind, "series");

  const flattened = cards.flatMap((card) => (card.kind === "series" ? card.books : [card.book]));
  assert.equal(flattened.length, SHELF.length);
  assert.equal(new Set(flattened).size, SHELF.length);
});

test("没有白名单时全部按单本展示", () => {
  const cards = groupShelfSeries(SHELF);
  assert.equal(cards.filter((card) => card.kind === "series").length, 0);
  assert.equal(cards.length, SHELF.length);
});

test("只登记了 1 册的系列仍按单本展示", () => {
  const solo = parseSeriesOverrides([{ name: "魔法使之夜", books: { solo: 1 } }]);
  const [card] = groupShelfSeries([book("魔法使之夜-上", { bookId: "solo" })], solo);
  assert.equal(card.kind, "book");
});

test("getSeriesInfo 的系列名与卷号全部取自白名单", () => {
  const cards = groupShelfSeries(SHELF, overrides);
  const seriesCard = cards.find(
    (card) => card.kind === "series" && card.books.some((item) => item.bookId === "a1"),
  );
  assert.ok(seriesCard && seriesCard.kind === "series");

  const info = getSeriesInfo(
    seriesCard.books,
    new Map(),
    indexSeriesOverrides(overrides).get("a1")!,
  );

  assert.equal(info.name, "安达与岛村");
  assert.equal(info.total, 3);
  // 按白名单卷号升序：1 → 2 → 11（若是字符串排序会变成 1, 11, 2）
  assert.deepEqual(
    info.books.map((item) => info.volumes.get(item.bookId ?? "")),
    [1, 2, 11],
  );
});

test("卷号相同的多册按书架顺序稳定排列", () => {
  const duplicate = parseSeriesOverrides([
    { name: "败犬女主太多了！", books: { v7a: 7, v7b: 7, v8: 8 } },
  ]);
  const books = [
    book("败犬女主太多了！7", { bookId: "v7a" }),
    book("败犬女主太多了！ 08", { bookId: "v8" }),
    book("败犬女主太多了！ 07", { bookId: "v7b" }),
  ];
  const cards = groupShelfSeries(books, duplicate);
  const [card] = cards;
  assert.equal(card.kind, "series");
  if (card.kind !== "series") return;
  const info = getSeriesInfo(card.books, new Map(), duplicate[0]);

  assert.deepEqual(
    info.books.map((item) => item.bookId),
    ["v7a", "v7b", "v8"],
  );
});

test("getSeriesInfo 汇总阅读时长与读完册数", () => {
  const progressMap = new Map([
    ["e1", { progress: 100, readingTime: 600 }],
    ["e2", { progress: 40, readingTime: 300 }],
    ["e5", { readingTime: 60 }],
    ["e10", { finishTime: 1, readingTime: 0 }],
  ]);
  const seriesBooks = ["e1", "e2", "e5", "e10"].map((id) =>
    book(`事件簿${id}`, { bookId: id }),
  );
  const info = getSeriesInfo(seriesBooks, progressMap, overrides[0]);

  assert.equal(info.name, "君主·埃尔梅罗二世事件簿");
  assert.equal(info.total, 4);
  assert.equal(info.expected, 4);
  assert.equal(info.finished, 1);
  assert.equal(info.duration, 960);
});

test("系列卡始终展示，单本仍按 10 分钟门槛", () => {
  const cards = groupShelfSeries(SHELF, overrides);
  const seriesCard = cards.find((card) => card.kind === "series");
  assert.ok(seriesCard);

  // 系列阅读时长为 0 也展示——白名单是人工确认过的。
  assert.equal(shouldRenderCard(seriesCard, new Map()), true);
  assert.equal(getCardDuration(seriesCard, new Map()), 0);

  // 没怎么读过的单本照旧被过滤。
  const shortSingle = book("心", { bookId: "s1" });
  const singleCard: ShelfCard = { kind: "book", book: shortSingle };
  assert.equal(shouldRenderCard(singleCard, new Map([["s1", { readingTime: 30 }]])), false);
  assert.equal(shouldRenderCard(singleCard, new Map([["s1", { readingTime: 601 }]])), true);
});

test("parseSeriesOverrides 拒绝写坏的白名单", () => {
  assert.deepEqual(parseSeriesOverrides(undefined), []);
  assert.deepEqual(parseSeriesOverrides(null), []);

  assert.throws(() => parseSeriesOverrides({}), /必须是数组/);
  assert.throws(() => parseSeriesOverrides([{ books: {} }]), /缺少 name/);
  assert.throws(() => parseSeriesOverrides([{ name: "x" }]), /缺少 books/);
  assert.throws(() => parseSeriesOverrides([{ name: "x", books: { a: 0 } }]), /卷号必须是正整数/);
  assert.throws(() => parseSeriesOverrides([{ name: "x", books: { a: "1" } }]), /卷号必须是正整数/);
  // 同一本书出现在两个系列里说明写串了。
  assert.throws(
    () =>
      parseSeriesOverrides([
        { name: "甲", books: { a: 1 } },
        { name: "乙", books: { a: 2 } },
      ]),
    /同时出现在/,
  );
});
