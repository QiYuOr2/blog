<script setup lang="ts">
import { computed } from "vue";
import { useBangumi } from "../useBangumi";
import type { BangumiCache } from "../schema";
import type { CollectionType } from "../types";
import CategoryFilter, { type CategoryOption } from "@/components/category-filter.vue";
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

// bangumi 的分类是互斥的收藏状态，没有「全部」选项，所以这里用标签反向映射回类型。
const labelToType = {} as Record<string, CollectionType>;
for (const type of types) labelToType[labels[type]] = type;
const categories = computed<CategoryOption[]>(() =>
  types.map((type) => ({ name: labels[type], count: counts.value[type] })),
);
const selectedCategory = computed<string | null>(() => labels[selected.value]);

function onSelectCategory(category: string | null) {
  if (category === null) return; // bangumi 无「全部」，不会走到这里
  const type = labelToType[category];
  if (type !== undefined) changeType(type);
}
</script>
<template>
  <div>

    <div v-if="useCache" class="mb-4 text-size-xs opacity-60">
      bangumi 请求超时，展示缓存数据，最后更新时间：{{ cacheUpdatedAt }}
    </div>

    <div class="mb-6">
      <CategoryFilter
        :categories="categories"
        :selected-category="selectedCategory"
        :show-all="false"
        @select="onSelectCategory"
      />
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
