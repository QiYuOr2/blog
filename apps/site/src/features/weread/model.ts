import type { CollectionEntry } from "astro:content";
import { wereadSchema } from "./schema";
import type { ReadMode, WereadStaticData } from "./schema";
import { parseSeriesOverrides, type SeriesOverride } from "./utils/series-utils.ts";

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
