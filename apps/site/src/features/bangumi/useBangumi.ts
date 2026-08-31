import { computed, onMounted, ref, watch } from "vue";
import { CollectionType, type CollectionItem } from "./types";
import type { BangumiCache } from "./schema";
import {
  computePageButtons,
  getCachedPage,
  getCachedTotal,
  hasBangumiCache,
} from "./model";
import { fetchCollectionCounts, fetchCollections, PAGE_SIZE } from "./api";

const COLLECTION_TYPES = [
  CollectionType.Wish,
  CollectionType.Collect,
  CollectionType.Doing,
  CollectionType.OnHold,
  CollectionType.Dropped,
] as const;

const COLLECTION_LABELS: Record<CollectionType, string> = {
  [CollectionType.Wish]: "想看",
  [CollectionType.Collect]: "看过",
  [CollectionType.Doing]: "在看",
  [CollectionType.OnHold]: "搁置",
  [CollectionType.Dropped]: "抛弃",
};

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * 集中管理 bangumi 列表的接口/缓存回退、分页与 tab 计数。
 * 一旦因接口超时/失败进入缓存模式，后续分页与计数都只读缓存，直到刷新页面。
 */
export function useBangumi(props: { cache?: BangumiCache }) {
  const data = ref<CollectionItem[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const useCache = ref(false);
  const selected = ref<CollectionType>(CollectionType.Doing);
  const page = ref(1);
  const total = ref(0);
  const counts = ref<Record<CollectionType, number>>({
    [CollectionType.Wish]: 0,
    [CollectionType.Collect]: 0,
    [CollectionType.Doing]: 0,
    [CollectionType.OnHold]: 0,
    [CollectionType.Dropped]: 0,
  });

  const cacheUpdatedAt = computed(() => formatDate(props.cache?.updatedAt));
  const totalPages = computed(() => Math.ceil(total.value / PAGE_SIZE));
  const pageButtons = computed(() => computePageButtons(page.value, totalPages.value));

  function applyCachedPage() {
    const cache = props.cache;
    if (!hasBangumiCache(cache)) return;
    const cached = getCachedPage(cache, selected.value, page.value, PAGE_SIZE);
    data.value = cached.items;
    total.value = cached.total;
  }

  async function load() {
    loading.value = true;
    error.value = null;
    const cache = props.cache;

    // 一旦触发缓存，就完全使用缓存数据（含分页），不再请求接口，除非刷新页面。
    if (useCache.value && hasBangumiCache(cache)) {
      applyCachedPage();
      loading.value = false;
      return;
    }

    try {
      const result = await fetchCollections(selected.value, page.value);
      data.value = result.data;
      total.value = result.total;
      useCache.value = false;
    } catch (e) {
      if (hasBangumiCache(cache)) {
        applyCachedPage();
        useCache.value = true;
      } else {
        error.value = e instanceof Error ? e.message : "Unknown error";
        useCache.value = false;
      }
    } finally {
      loading.value = false;
    }
  }

  async function loadCounts() {
    const cache = props.cache;
    // 缓存模式下直接使用缓存计数，不再请求接口。
    if (useCache.value && hasBangumiCache(cache)) {
      for (const type of COLLECTION_TYPES) {
        counts.value[type] = getCachedTotal(cache, type);
      }
      return;
    }

    const remote = await fetchCollectionCounts(COLLECTION_TYPES);
    for (const type of COLLECTION_TYPES) {
      // 一旦进入缓存模式，计数统一回退到缓存，保证与分页一致。
      if (useCache.value && hasBangumiCache(cache)) {
        counts.value[type] = getCachedTotal(cache, type);
      } else if (remote[type] != null) {
        counts.value[type] = remote[type]!;
      } else if (hasBangumiCache(cache)) {
        counts.value[type] = getCachedTotal(cache, type);
      }
    }
  }

  onMounted(() => {
    load();
    loadCounts();
  });

  watch(useCache, (cached) => {
    // 进入缓存模式后，把 tab 计数也统一回退到缓存数据，保证分页与计数一致。
    const cache = props.cache;
    if (cached && hasBangumiCache(cache)) {
      for (const type of COLLECTION_TYPES) {
        counts.value[type] = getCachedTotal(cache, type);
      }
    }
  });

  watch([page, selected], load);

  function changeType(type: CollectionType) {
    selected.value = type;
    page.value = 1;
  }

  function setPage(next: number) {
    page.value = next;
  }

  return {
    types: COLLECTION_TYPES,
    labels: COLLECTION_LABELS,
    pageSize: PAGE_SIZE,
    data,
    loading,
    error,
    useCache,
    selected,
    page,
    counts,
    cacheUpdatedAt,
    totalPages,
    pageButtons,
    changeType,
    setPage,
  };
}
