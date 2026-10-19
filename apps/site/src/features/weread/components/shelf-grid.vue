<script setup lang="ts">
import { computed } from "vue";
import type { ReadProgress } from "../utils/progress-utils";
import { formatDuration, getProgressLabel, getReadDuration } from "../utils/progress-utils";
import { getSeriesInfo, indexSeriesOverrides, type ShelfCard } from "../utils/series-utils";
import { getSeriesOverrides } from "../model";
import WereadCard from "./card.vue";
import WereadSeriesCard from "./series-card.vue";

const { cards, progressMap } = defineProps<{
  cards: ShelfCard[];
  progressMap: Map<string, ReadProgress>;
}>();

/** 白名单：系列名与卷号全部以它为准。 */
const overrideOf = indexSeriesOverrides(getSeriesOverrides());

/** 每张卡片一个稳定 key：单本用 bookId，系列用首册 bookId。 */
const cardKeys = computed(() =>
  cards.map((card) =>
    card.kind === "series" ? `series:${card.books[0]?.bookId ?? card.books[0]?.title}` : `book:${card.book.bookId ?? card.book.title}`,
  ),
);

/** 系列卡片的汇总信息一次算好，模板里不再做统计。 */
const seriesInfos = computed(() =>
  cards.map((card) => {
    if (card.kind !== "series") return null;
    const override = overrideOf.get(card.books[0]?.bookId ?? "");
    // 白名单里的每本书都能查到所属系列；查不到说明数据不一致，直接跳过而不是猜。
    return override ? getSeriesInfo(card.books, progressMap, override) : null;
  }),
);

const progressFor = (bookId?: string) => progressMap.get(bookId ?? "");
</script>

<template>
  <!--
    `items-start`：同排卡片按各自高度顶部对齐，不被拉满整行。
    `grid-flow-row-dense`：系列卡展开后会在它后面插入一整行的分册区，
    本行剩余的格子由后续卡片回填，避免中间空出一块。
  -->
  <div class="grid grid-flow-row-dense grid-cols-3 items-start gap-4 sm:grid-cols-4">
    <template v-if="cards.length">
      <template v-for="(card, index) in cards" :key="cardKeys[index]">
        <!-- 系列卡占一格（和单本卡同尺寸），展开时由它下方的分册区横跨整行。 -->
        <WereadSeriesCard
          v-if="card.kind === 'series' && seriesInfos[index]"
          :info="seriesInfos[index]!"
          :progress-map="progressMap"
        />
        <WereadCard
          v-else-if="card.kind === 'book'"
          :image="card.book.cover"
          :name="card.book.title || '未知书籍'"
          :top-badge="
            getReadDuration(progressFor(card.book.bookId)) != null
              ? formatDuration(getReadDuration(progressFor(card.book.bookId)))
              : '未知时长'
          "
          :bottom-badge="getProgressLabel(card.book, progressFor(card.book.bookId))"
          :href="card.book.deepLink"
        />
      </template>
    </template>
    <div
      v-else
      class="col-span-full rounded-2xl border border-dashed border-[var(--un-prose-border)] bg-[var(--un-prose-bg-soft)] p-6 text-[var(--un-prose-body)] dark:border-[var(--un-prose-invert-border)] dark:bg-[var(--un-prose-invert-bg-soft)] dark:text-[var(--un-prose-invert-body)]"
    >
      暂无书籍阅读记录。
    </div>
  </div>
</template>
