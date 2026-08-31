<script setup lang="ts">
import { useBangumi } from "../useBangumi";
import type { BangumiCache } from "../schema";
import BangumiCard from "./bangumi-card.vue";
import BangumiPagination from "./bangumi-pagination.vue";

const CACHE_IMAGE_TIMEOUT_MS = 5_000;
const props = defineProps<{ cache?: BangumiCache }>();
const {
  types,
  labels,
  pageSize,
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
} = useBangumi(props);
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
      bangumi 接口请求超时，展示缓存数据，缓存更新时间：{{ cacheUpdatedAt }}
    </div>
    <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>

    <div class="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-4">
      <template v-if="loading">
        <div
          v-for="n in pageSize"
          :key="n"
          class="rounded-lg h-36 md:h-48 lg:h-48 w-full skeleton"
        />
      </template>
      <template v-else>
        <BangumiCard
          v-for="item in data"
          :key="item.subject.id"
          :item="item"
          :image-timeout-ms="useCache ? CACHE_IMAGE_TIMEOUT_MS : undefined"
        />
      </template>
    </div>

    <BangumiPagination
      :page="page"
      :total-pages="totalPages"
      :page-buttons="pageButtons"
      @change="setPage"
    />
  </div>
</template>
