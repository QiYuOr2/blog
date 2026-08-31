import type { CollectionEntry } from "astro:content";
import { bangumiSchema, type BangumiCache, type BangumiTypeBucket } from "./schema";
import { CollectionType } from "./types";

const ALL_TYPES = [
  CollectionType.Wish,
  CollectionType.Collect,
  CollectionType.Doing,
  CollectionType.OnHold,
  CollectionType.Dropped,
] as const;

const emptyBucket = (): BangumiTypeBucket => ({ total: 0, items: [] });

const defaultBangumiData: BangumiCache = {
  updatedAt: new Date().toISOString(),
  types: ALL_TYPES.reduce<Record<string, BangumiTypeBucket>>((acc, type) => {
    acc[String(type)] = emptyBucket();
    return acc;
  }, {}),
};

/** 从 content collection 里解析出缓存用的静态数据；没有缓存时返回全空的结构。 */
export function getBangumiStaticData(
  entries: CollectionEntry<"bangumi">[],
): BangumiCache {
  const rawData = entries[0]?.data;
  if (!rawData) {
    return defaultBangumiData;
  }
  return bangumiSchema.parse(rawData);
}

/** 从缓存里按「类型 + 页码」取出一页数据，供接口超时/失败时回退。 */
export function getCachedPage(
  cache: BangumiCache,
  type: CollectionType,
  page: number,
  pageSize: number,
): BangumiTypeBucket {
  const bucket = cache.types[String(type)] ?? emptyBucket();
  const start = (page - 1) * pageSize;
  return {
    total: bucket.total,
    items: bucket.items.slice(start, start + pageSize),
  };
}

/** 从缓存里读取某个类型的总条数（tab 上的计数）。 */
export function getCachedTotal(cache: BangumiCache, type: CollectionType): number {
  return cache.types[String(type)]?.total ?? 0;
}
