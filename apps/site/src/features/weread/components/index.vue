<script setup lang="ts">
import { computed, shallowRef } from "vue";
import type { WereadStaticData } from "../schema";
import {
  getShelfBooks,
  getShelfProgressMap,
  getReadTimesByDay,
  getSeriesOverrides,
} from "../model";
import {
  getCardCategory,
  getCardDuration,
  groupShelfSeries,
  shouldRenderCard,
} from "../utils/series-utils";
import CategoryFilter, { type CategoryOption } from "@/components/category-filter.vue";
import WereadShelfGrid from "./shelf-grid.vue";
import WereadReadHeatmap from "./read-heatmap.vue";

const props = defineProps<{ data: WereadStaticData }>();

const selectedCategory = shallowRef<string | null>(null);
const modeData = computed(() => props.data.modes.overall);
const progressMap = computed(() => getShelfProgressMap(props.data));
const readTimesByDay = computed(() => getReadTimesByDay(props.data));
const seriesOverrides = getSeriesOverrides();

/** 书架里同系列的多册折成一张卡，筛选与计数都按卡片口径走。 */
const cards = computed(() =>
  groupShelfSeries(getShelfBooks(props.data), seriesOverrides).filter((card) =>
    shouldRenderCard(card, progressMap.value),
  ),
);

function getCategoryName(category?: string) {
  return category?.split("-")[0] || "未分类";
}

const categories = computed<CategoryOption[]>(() => {
  const counts = new Map<string, number>();
  for (const card of cards.value) {
    const category = getCategoryName(getCardCategory(card));
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort(
      (first, second) =>
        second.count - first.count || first.name.localeCompare(second.name, "zh-CN"),
    );
});

const filteredCards = computed(() => {
  const visible =
    selectedCategory.value === null
      ? cards.value
      : cards.value.filter(
          (card) => getCategoryName(getCardCategory(card)) === selectedCategory.value,
        );

  return [...visible].sort(
    (first, second) =>
      getCardDuration(second, progressMap.value) - getCardDuration(first, progressMap.value),
  );
});
</script>
<template>
  <div
    v-if="!modeData"
    class="rounded-xl border border-[var(--un-prose-border)] bg-[var(--un-prose-bg-soft)] p-6 text-[var(--un-prose-body)] dark:border-[var(--un-prose-invert-border)] dark:bg-[var(--un-prose-invert-bg-soft)] dark:text-[var(--un-prose-invert-body)]"
  >
    微信读书数据尚未生成，请先执行构建前的数据更新。
  </div>
  <div v-else class="space-y-6 pb-8">
    <WereadReadHeatmap :read-times-by-day="readTimesByDay" />
    <CategoryFilter
      :categories="categories"
      :selected-category="selectedCategory"
      :total="cards.length"
      @select="selectedCategory = $event"
    />
    <WereadShelfGrid :cards="filteredCards" :progress-map="progressMap" />
  </div>
</template>
