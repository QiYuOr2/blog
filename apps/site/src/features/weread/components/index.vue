<script setup lang="ts">
import { computed, ref } from "vue";
import type { WereadStaticData } from "../schema";
import { getShelfBooks, getShelfProgressMap } from "../model";
import { shouldRenderShelfBook, getReadDuration } from "../utils/progress-utils";
import WereadCategoryFilter, { type WereadCategory } from './category-filter.vue'
import WereadShelfGrid from "./shelf-grid.vue";
const props = defineProps<{ data: WereadStaticData }>();
const selectedCategory = ref<string | null>(null)
const modeData = computed(() => props.data.modes.overall);
const progressMap = computed(() => getShelfProgressMap(props.data));
const shelfBooks = computed(() =>
  getShelfBooks(props.data).filter((item) => shouldRenderShelfBook(item, progressMap.value)),
);
function getCategoryName(category?: string) {
  return category?.split('-')[0] || '未分类'
}
const categories = computed<WereadCategory[]>(() => {
  const counts = new Map<string, number>()
  for (const book of shelfBooks.value) {
    const category = getCategoryName(book.category)
    counts.set(category, (counts.get(category) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((first, second) => second.count - first.count || first.name.localeCompare(second.name, 'zh-CN'))
})
const filteredBooks = computed(() => {
  const books = selectedCategory.value === null
    ? shelfBooks.value
    : shelfBooks.value.filter(book => getCategoryName(book.category) === selectedCategory.value)

  return [...books].sort((first, second) => {
    const firstDuration = getReadDuration(progressMap.value.get(first.bookId ?? "")) ?? -1
    const secondDuration = getReadDuration(progressMap.value.get(second.bookId ?? "")) ?? -1
    return secondDuration - firstDuration
  })
})
</script>
<template>
  <div
    v-if="!modeData"
    class="rounded-xl border border-[var(--un-prose-border)] bg-[var(--un-prose-bg-soft)] p-6 text-[var(--un-prose-body)] dark:border-[var(--un-prose-invert-border)] dark:bg-[var(--un-prose-invert-bg-soft)] dark:text-[var(--un-prose-invert-body)]"
  >
    微信读书数据尚未生成，请先执行构建前的数据更新。
  </div>
  <div v-else class="space-y-6 pb-8">
    <WereadCategoryFilter
      :categories="categories"
      :selected-category="selectedCategory"
      :total="shelfBooks.length"
      @select="selectedCategory = $event"
    />
    <WereadShelfGrid :books="filteredBooks" :progress-map="progressMap" />
  </div>
</template>
