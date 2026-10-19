import type { WereadShelfBook } from "../schema";
import {
  getProgressLabel,
  getReadDuration,
  shouldRenderShelfBook,
  type ReadProgress,
} from "./progress-utils.ts";

/** 系列聚合后的统计：卡片上展示的就是这几个数。 */
export type SeriesInfo = {
  /** 按卷号升序排列（没有卷号的排最后）。 */
  books: WereadShelfBook[];
  /** bookId（缺 bookId 时用书名）→ 卷号。 */
  volumes: Map<string, number>;
  name: string;
  /** 读完册数 / 书架已有册数。 */
  finished: number;
  total: number;
  /** 书名自带的总册数（`套装1-7册`、`全四卷`），没有则为 null。 */
  expected: number | null;
  /** 系列合计阅读时长（秒）。 */
  duration: number;
};

export type ShelfCard =
  | { kind: "book"; book: WereadShelfBook }
  | {
      kind: "series";
      books: WereadShelfBook[];
    };

/**
 * 手工系列白名单（`packages/scripts/overrides/weread/series-overrides.json`）的一条。
 * 读书页的系列分组**完全**由它决定，不再按书名推断——
 * 书名规律追不上真实写法（缩写、简繁、缺卷号、换译名），白名单则逐本可确认、可复查。
 */
export type SeriesOverride = {
  /** 合并后卡片上显示的系列名。 */
  name: string;
  /** bookId → 卷号；卷号决定分册在展开区里的先后顺序。 */
  books: Record<string, number>;
};

/**
 * 微信读书书架是「一本一个条目」的平铺结构，单行本和系列里的一册长得一样。
 * 分组只在本模块的读取侧完成、不改数据：`content/weread/weread.json` 每天由
 * `pnpm weread:sync` 覆盖写入，任何写进数据的字段都会在下次同步时被冲掉。
 */

/** 解析覆盖表；逐条校验，写坏了直接抛错，避免线上悄悄丢一次合并。 */
export function parseSeriesOverrides(raw: unknown): SeriesOverride[] {
  if (raw == null) return [];
  if (!Array.isArray(raw)) {
    throw new Error("series-overrides.json 顶层必须是数组");
  }

  const seen = new Map<string, string>();
  return raw.map((entry, index) => {
    const name = entry?.name;
    const books = entry?.books;
    if (typeof name !== "string" || !name.trim()) {
      throw new Error(`series-overrides.json 第 ${index + 1} 条缺少 name`);
    }
    if (!books || typeof books !== "object" || Array.isArray(books)) {
      throw new Error(`series-overrides.json 的「${name}」缺少 books 映射`);
    }

    const volumes: Record<string, number> = {};
    for (const [bookId, volume] of Object.entries(books)) {
      if (!Number.isInteger(volume) || (volume as number) <= 0) {
        throw new Error(`series-overrides.json 的「${name}」里 ${bookId} 的卷号必须是正整数`);
      }
      // 一本书同时出现在两个系列里，说明覆盖表写串了。
      const owner = seen.get(bookId);
      if (owner && owner !== name) {
        throw new Error(`bookId ${bookId} 同时出现在「${owner}」和「${name}」中`);
      }
      seen.set(bookId, name);
      volumes[bookId] = volume as number;
    }

    return { name, books: volumes };
  });
}

/**
 * 汇总一组书的系列信息。
 * 系列名与卷号**全部**取自白名单：`override` 是该系列在 `series-overrides.json` 里的登记项，
 * 不做任何书名推断，因此这里拿到的每个字段都是明确的、可复查的。
 */
export function getSeriesInfo(
  books: WereadShelfBook[],
  progressMap: Map<string, ReadProgress>,
  override: SeriesOverride,
): SeriesInfo {
  const progressOf = (book: WereadShelfBook) => progressMap.get(book.bookId ?? "");
  const volumes = new Map<string, number>();
  let duration = 0;
  let finished = 0;

  for (const book of books) {
    volumes.set(volumeKey(book), override.books[book.bookId ?? ""] ?? 0);
    duration += getReadDuration(progressOf(book)) ?? 0;
    if (getProgressLabel(book, progressOf(book)) === "已读完") finished += 1;
  }

  // 白名单登记了多少册就是多少册；书架暂时没有的册不做估算。
  const expected = Object.keys(override.books).length;

  return {
    // 卷号相同的多册（如《败犬女主太多了！》两个第 7 卷）按原书架顺序排，保持稳定。
    books: books
      .map((book, index) => ({ book, index, volume: volumes.get(volumeKey(book)) ?? 0 }))
      .sort((first, second) => first.volume - second.volume || first.index - second.index)
      .map((item) => item.book),
    volumes,
    name: override.name,
    finished,
    total: books.length,
    expected,
    duration,
  };
}

/** bookId 优先；老数据里可能有条目缺 bookId，退回用书名作 key。 */
function volumeKey(book: WereadShelfBook) {
  return book.bookId ?? book.title ?? "";
}

/** bookId → 覆盖表条目。分组和统计共用同一份索引，避免两处规则走偏。 */
export function indexSeriesOverrides(overrides: SeriesOverride[] = []) {
  const index = new Map<string, SeriesOverride>();
  for (const override of overrides) {
    for (const bookId of Object.keys(override.books)) index.set(bookId, override);
  }
  return index;
}

/**
 * 把书架拆成「单本卡片 + 系列卡片」，并保持书架原有顺序。
 *
 * 分组**完全**由白名单（`series-overrides.json`）决定，不再做任何书名推断：
 * 书名规律永远追不上真实数据的写法（缩写、简繁、异体、缺卷号、换译名），
 * 而白名单是逐本确认的，结果可预期、可复查。没登记的书一律按单本展示。
 */
export function groupShelfSeries(
  books: WereadShelfBook[],
  overrides: SeriesOverride[] = [],
): ShelfCard[] {
  const overrideOf = indexSeriesOverrides(overrides);

  const cards: ShelfCard[] = [];
  const emitted = new Set<SeriesOverride>();
  for (const book of books) {
    const override = overrideOf.get(book.bookId ?? "");
    if (!override) {
      cards.push({ kind: "book", book });
      continue;
    }
    // 同一个系列只出一张卡，位置取系列里第一册在书架上的位置。
    if (emitted.has(override)) continue;
    emitted.add(override);

    const seriesBooks = books.filter((item) => overrideOf.get(item.bookId ?? "") === override);
    // 只登记了 1 册时没有折叠的意义，仍按单本展示。
    cards.push(
      seriesBooks.length > 1
        ? { kind: "series", books: seriesBooks }
        : { kind: "book", book: seriesBooks[0] },
    );
  }
  return cards;
}

/** 卡片（单本或系列）的阅读时长：系列取各册之和。 */
export function getCardDuration(card: ShelfCard, progressMap: Map<string, ReadProgress>) {
  const books = card.kind === "series" ? card.books : [card.book];
  return books.reduce(
    (sum, book) => sum + (getReadDuration(progressMap.get(book.bookId ?? "")) ?? 0),
    0,
  );
}

/**
 * 卡片是否值得展示。
 * - 单本：沿用原来的 10 分钟门槛（没怎么读过的零碎单本不占格子）；
 * - 系列：始终展示——已在 `series-overrides.json` 里逐本登记，说明人工确认过它是一整个系列，
 *   不该因为"读得少"被整组藏起来（例如 10 册的《君主·埃尔梅罗二世事件簿》合计只读了 30 秒）。
 */
export function shouldRenderCard(card: ShelfCard, progressMap: Map<string, ReadProgress>) {
  if (card.kind === "book") return shouldRenderShelfBook(card.book, progressMap);
  return true;
}

export function getCardCategory(card: ShelfCard) {
  if (card.kind === "book") return card.book.category;
  return card.books.find((book) => book.category)?.category;
}
