<script setup lang="ts">
import type { WereadShelfBook } from "../schema";
import WereadCard from "./card.vue";
import {
  formatDuration,
  getProgressLabel,
  getReadDuration,
  type ReadProgress,
} from "../utils/progress-utils";

const props = defineProps<{ books: WereadShelfBook[]; progressMap: Map<string, ReadProgress> }>();
const progressFor = (book: WereadShelfBook) => props.progressMap.get(book.bookId ?? "");
</script>

<template>
  <div class="grid grid-cols-3 gap-4 sm:grid-cols-4">
    <template v-if="books.length">
      <WereadCard
        v-for="(item, index) in books"
        :key="`${item.title || '未知书籍'}-${index}`"
        :image="item.cover"
        :name="item.title || '未知书籍'"
        :top-badge="
          getReadDuration(progressFor(item)) != null
            ? formatDuration(getReadDuration(progressFor(item)))
            : '未知时长'
        "
        :bottom-badge="getProgressLabel(item, progressFor(item))"
        :href="item.deepLink"
      />
    </template>
    <div
      v-else
      class="rounded-2xl border border-dashed border-[var(--un-prose-border)] bg-[var(--un-prose-bg-soft)] p-6 text-[var(--un-prose-body)] dark:border-[var(--un-prose-invert-border)] dark:bg-[var(--un-prose-invert-bg-soft)] dark:text-[var(--un-prose-invert-body)]"
    >
      暂无书籍阅读记录。
    </div>
  </div>
</template>
