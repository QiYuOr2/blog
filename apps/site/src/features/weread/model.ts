import type { CollectionEntry } from "astro:content";
import { wereadSchema } from "./schema";
import type { ReadMode, WereadHighlight, WereadShelfBook, WereadStaticData } from "./schema";
import { dayjs, SHANGHAI_TZ } from "./date";
import type { ReadProgress } from "./utils/progress-utils";
import { parseSeriesOverrides, type SeriesOverride } from "./utils/series-utils.ts";

export interface WereadPagePayload {
  hasData: boolean;
  readTimesByDay: Record<string, number>;
  shelfBooks: WereadShelfBook[];
  progressMap: Record<string, ReadProgress>;
  initialHighlight: WereadHighlight | null;
  highlightsCount: number;
  highlightsUrl: string;
}

const defaultWereadData: WereadStaticData = {
  updatedAt: new Date().toISOString(),
  modes: {
    weekly: {},
    monthly: {},
    annually: {},
    overall: {},
  },
};

/**
 * 手工系列覆盖表。和 `category-overrides.json` / `title-overrides.json` 放在一起维护，
 * 用于「书名对不上但确实是同系列」的情况。用 Vite 的 glob 直接读 JSON，
 * 构建期就能把内容内联进产物，不需要额外的数据管线。
 */
const seriesOverrideModules = import.meta.glob<unknown>(
  "../../../../../packages/scripts/overrides/weread/series-overrides.json",
  { eager: true, import: "default" },
);

export function getSeriesOverrides(): SeriesOverride[] {
  const [raw] = Object.values(seriesOverrideModules);
  return parseSeriesOverrides(raw);
}

export function getWereadStaticData(entries: CollectionEntry<"weread">[]): WereadStaticData {
  const rawData = entries[0]?.data;
  if (!rawData) {
    return defaultWereadData;
  }

  return wereadSchema.parse(rawData);
}

export function getReadBooks(data: WereadStaticData, mode: ReadMode = "overall") {
  return data.modes[mode]?.readLongest?.filter((item) => item.book) ?? [];
}

export function getShelfBooks(data: WereadStaticData) {
  return data.shelf?.books ?? [];
}

export function getShelfProgressMap(data: WereadStaticData) {
  return new Map(
    Object.entries(data.progressMap ?? {}).map(([key, value]) => [
      key,
      value as {
        progress?: number;
        readingTime?: number;
        readTime?: number;
        recordReadingTime?: number;
        finishTime?: number;
      },
    ]),
  );
}

export function getReadTimesByDay(data: WereadStaticData) {
  return data.readTimesByDay ?? {};
}

export function getHighlights(data: WereadStaticData) {
  return data.highlights ?? [];
}

/** 仅保留页面渲染所需的书摘字段，剔除接口透传的冗余属性。 */
export function slimWereadHighlights(highlights: WereadHighlight[]): WereadHighlight[] {
  return highlights.map((item) => ({
    bookmarkId: item.bookmarkId,
    bookId: item.bookId,
    ...(item.chapterTitle ? { chapterTitle: item.chapterTitle } : {}),
    markText: item.markText,
    ...(item.createTime != null ? { createTime: item.createTime } : {}),
    ...(item.book
      ? {
          book: {
            ...(item.book.bookId ? { bookId: item.book.bookId } : {}),
            ...(item.book.title ? { title: item.book.title } : {}),
            ...(item.book.author ? { author: item.book.author } : {}),
            ...(item.book.cover ? { cover: item.book.cover } : {}),
          },
        }
      : {}),
  }));
}

/** 仅提取读书页实际消费的字段，避免把 1.7MB+ 的全量书摘与原始字段塞进 HTML props。 */
export function buildWereadPagePayload(
  data: WereadStaticData,
  highlightsUrl: string,
): WereadPagePayload {
  const shelfBooks: WereadShelfBook[] = (data.shelf?.books ?? []).map((book) => ({
    ...(book.bookId ? { bookId: book.bookId } : {}),
    ...(book.title ? { title: book.title } : {}),
    ...(book.category ? { category: book.category } : {}),
    ...(book.cover ? { cover: book.cover } : {}),
    ...(book.deepLink ? { deepLink: book.deepLink } : {}),
    ...(book.finishReading != null ? { finishReading: book.finishReading } : {}),
  }));

  const shelfBookIds = new Set(shelfBooks.map((book) => book.bookId).filter(Boolean));
  const progressMap: Record<string, ReadProgress> = {};
  for (const [bookId, entry] of Object.entries(data.progressMap ?? {})) {
    if (!shelfBookIds.has(bookId)) continue;
    progressMap[bookId] = {
      ...(entry.progress != null ? { progress: entry.progress } : {}),
      ...(entry.readingTime != null ? { readingTime: entry.readingTime } : {}),
      ...(entry.readTime != null ? { readTime: entry.readTime } : {}),
      ...(entry.recordReadingTime != null ? { recordReadingTime: entry.recordReadingTime } : {}),
      ...(entry.finishTime != null ? { finishTime: entry.finishTime } : {}),
    };
  }

  const slimHighlights = slimWereadHighlights(getHighlights(data));
  const seed = Number(dayjs().tz(SHANGHAI_TZ).format("YYYYMMDD"));
  const initialHighlight = slimHighlights.length
    ? slimHighlights[seed % slimHighlights.length]
    : null;

  return {
    hasData: Boolean(data.modes.overall),
    readTimesByDay: data.readTimesByDay ?? {},
    shelfBooks,
    progressMap,
    initialHighlight,
    highlightsCount: slimHighlights.length,
    highlightsUrl,
  };
}
