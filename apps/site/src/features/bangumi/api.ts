import type { CollectionType, CollectionsDTO } from "./types";

const API_BASE = "https://api.bgm.tv";
const USERNAME = "qiyuor2";
const SUBJECT_TYPE = 2; // 2 = 动画
const REQUEST_TIMEOUT_MS = 5_000;

export const PAGE_SIZE = 12;

type CountResult = Partial<Record<CollectionType, number>>;

function collectionsUrl(type: CollectionType, offset: number, limit: number): string {
  return (
    `${API_BASE}/v0/users/${USERNAME}/collections` +
    `?subject_type=${SUBJECT_TYPE}&type=${type}&offset=${offset}&limit=${limit}`
  );
}

async function fetchJson(url: string): Promise<CollectionsDTO> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Failed to fetch data (HTTP ${response.status})`);
    return (await response.json()) as CollectionsDTO;
  } finally {
    clearTimeout(timer);
  }
}

/** 拉取指定类型的一页收藏（bgm 后端分页）。 */
export function fetchCollections(
  type: CollectionType,
  page: number,
  pageSize: number = PAGE_SIZE,
): Promise<CollectionsDTO> {
  return fetchJson(collectionsUrl(type, (page - 1) * pageSize, pageSize));
}

/** 拉取各类型的收藏总数（用于 tab 计数），失败的类型会缺省，由调用方回退到缓存。 */
export async function fetchCollectionCounts(
  types: readonly CollectionType[],
): Promise<CountResult> {
  const results = await Promise.allSettled(
    types.map(async (type) => {
      const dto = await fetchJson(collectionsUrl(type, 0, 1));
      return { type, total: dto.total };
    }),
  );
  const counts: CountResult = {};
  results.forEach((result, index) => {
    if (result.status === "fulfilled") counts[types[index]] = result.value.total;
  });
  return counts;
}
