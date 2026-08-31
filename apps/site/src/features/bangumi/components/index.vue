<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { CollectionType, type CollectionItem, type CollectionsDTO } from "../types";
import type { BangumiCache } from "../schema";
import { getCachedPage, getCachedTotal } from "../model";

const types = [
  CollectionType.Wish,
  CollectionType.Collect,
  CollectionType.Doing,
  CollectionType.OnHold,
  CollectionType.Dropped,
] as const;
const labels: Record<CollectionType, string> = {
  [CollectionType.Wish]: "想看",
  [CollectionType.Collect]: "看过",
  [CollectionType.Doing]: "在看",
  [CollectionType.OnHold]: "搁置",
  [CollectionType.Dropped]: "抛弃",
};
const props = defineProps<{ cache?: BangumiCache }>();
const data = ref<CollectionItem[]>([]),
  loading = ref(true),
  error = ref<string | null>(null),
  useCache = ref(false),
  selected = ref<CollectionType>(CollectionType.Doing),
  page = ref(1),
  total = ref(0),
  counts = ref<Record<CollectionType, number>>({
    [CollectionType.Wish]: 0,
    [CollectionType.Collect]: 0,
    [CollectionType.Doing]: 0,
    [CollectionType.OnHold]: 0,
    [CollectionType.Dropped]: 0,
  });
const pageSize = 12;
const REQUEST_TIMEOUT_MS = 5_000;
const totalPages = computed(() => Math.ceil(total.value / pageSize));
const pageButtons = computed<(number | "start-ellipsis" | "end-ellipsis")[]>(() => {
  const maxVisible = 5;
  const start = Math.max(1, page.value - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages.value, start + maxVisible - 1);
  const startPage = Math.max(1, end - maxVisible + 1);
  const pages: (number | "start-ellipsis" | "end-ellipsis")[] = [];

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) pages.push("start-ellipsis");
  }

  for (let current = startPage; current <= end; current += 1) {
    pages.push(current);
  }

  if (end < totalPages.value) {
    if (end < totalPages.value - 1) pages.push("end-ellipsis");
    pages.push(totalPages.value);
  }

  return pages;
});

async function fetchWithTimeout(url: string): Promise<CollectionsDTO> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw Error(`Failed to fetch data (HTTP ${response.status})`);
    return (await response.json()) as CollectionsDTO;
  } finally {
    clearTimeout(timer);
  }
}

async function load() {
  loading.value = true;
  error.value = null;
  try {
    const result = await fetchWithTimeout(
      `https://api.bgm.tv/v0/users/qiyuor2/collections?subject_type=2&type=${selected.value}&offset=${(page.value - 1) * pageSize}&limit=${pageSize}`,
    );
    data.value = result.data;
    total.value = result.total;
    useCache.value = false;
  } catch (e) {
    const cached = props.cache
      ? getCachedPage(props.cache, selected.value, page.value, pageSize)
      : null;
    if (cached && cached.items.length > 0) {
      data.value = cached.items;
      total.value = cached.total;
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
  const results = await Promise.allSettled(
    types.map(async (type) => {
      const result = await fetchWithTimeout(
        `https://api.bgm.tv/v0/users/qiyuor2/collections?subject_type=2&type=${type}&limit=1`,
      );
      return { type, total: result.total };
    }),
  );
  results.forEach((result, index) => {
    const type = types[index];
    if (result.status === "fulfilled") {
      counts.value[type] = result.value.total;
    } else if (props.cache) {
      counts.value[type] = getCachedTotal(props.cache, type);
    }
  });
}
onMounted(() => {
  load();
  loadCounts();
});
watch([page, selected], load);
const changeType = (type: CollectionType) => {
  selected.value = type;
  page.value = 1;
};
const open = (id: number) => window.open(`https://bgm.tv/subject/${id}`, "_blank");
</script>
<template>
  <div>
    <div class="mb-4 flex flex-wrap gap-2">
      <button
        v-for="type in types"
        :key="type"
        :class="[
          'rounded-full px-3 py-1 text-xs',
          selected === type ? 'bg-[rgb(59,105,61)] text-white' : 'bg-[var(--un-prose-bg-soft)]',
        ]"
        @click="changeType(type)"
      >
        {{ labels[type] }} ({{ counts[type] }})
      </button>
    </div>
    <div v-if="useCache" class="mb-4 text-size-xs opacity-60">
      bgm 接口较慢，当前展示的是缓存数据
    </div>
    <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>
    <div class="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-4">
      <template v-if="loading"
        ><div
          v-for="n in pageSize"
          :key="n"
          class="rounded-lg h-36 md:h-48 lg:h-48 w-full skeleton"
      /></template>
      <div
        v-for="item in data"
        v-else
        :key="item.subject.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:(shadow-lg)"
        @click="open(item.subject.id)"
      >
        <img
          :src="item.subject.images.small"
          :alt="item.subject.name_cn || item.subject.name"
          class="h-36 md:h-48 lg:h-48 w-full object-cover"
        />
        <div
          class="absolute top-10 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"
        />
        <div class="px-2 py-2 absolute bottom-0 text-white text-xs">
          {{ item.subject.name_cn || item.subject.name }}
        </div>
        <div
          class="px-1 py-0.5 text-xs absolute top-1 right-1 bg-[rgba(0,0,0,0.6)] text-white rounded opacity-85"
        >
          {{ item.subject.score }}
        </div>
      </div>
    </div>
    <div v-if="totalPages > 1" class="mt-4 flex items-center justify-center gap-2">
      <button
        class="i-mingcute:left-fill text-true-gray-500"
        :disabled="page === 1"
        @click="page--"
      >
        上一页
      </button>
      <template v-for="pageButton in pageButtons" :key="pageButton">
        <span
          v-if="typeof pageButton === 'string'"
          class="mx-1 px-2 py-1 font-bold text-true-gray-500"
          >...</span
        >
        <button
          v-else
          :class="[
            'h-8 w-8 rounded-md',
            pageButton === page ? 'bg-[rgb(59,105,61)] text-white' : 'bg-[var(--un-prose-bg-soft)]',
          ]"
          @click="page = pageButton"
        >
          {{ pageButton }}
        </button>
      </template>
      <button
        class="i-mingcute:right-fill text-true-gray-500"
        :disabled="page === totalPages"
        @click="page++"
      >
        下一页
      </button>
    </div>
  </div>
</template>
