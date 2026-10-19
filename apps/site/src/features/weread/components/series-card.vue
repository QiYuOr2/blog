<script setup lang="ts">
import { computed, shallowRef } from "vue";
import type { ReadProgress } from "../utils/progress-utils";
import { formatDuration, getProgressLabel } from "../utils/progress-utils";
import type { SeriesInfo } from "../utils/series-utils";
import WereadCard from "./card.vue";

const { info, progressMap } = defineProps<{
  info: SeriesInfo;
  progressMap: Map<string, ReadProgress>;
}>();

const progressFor = (bookId?: string) => progressMap.get(bookId ?? "");

const expanded = shallowRef(false);

/**
 * 展开行为：
 * 分册区用 `col-span-full` 占满整行。由于它紧跟在系列卡之后渲染，
 * 若系列卡后面还有空位，网格会把它塞进剩余列——所以这里用 `grid-column: 1 / -1`
 * 强制它独占一整行，从下一行开始；系列卡所在行剩余的空位由后续卡片自然补上
 * （`grid-auto-flow: row dense` 会让后面的卡片回填）。
 */
function toggle() {
  expanded.value = !expanded.value;
}

const durationBadge = computed(() =>
  info.duration > 0 ? formatDuration(info.duration) : "未知时长",
);

/** 右上角第二行：系列册数（原「读完 x/x」的位置）；书名自带总册数时一并标出。 */
const countBadge = computed(() =>
  info.expected != null && info.expected > info.total
    ? `${info.total} 册·共${info.expected}册`
    : `${info.total} 册`,
);

const progressPercent = computed(() =>
  info.total > 0 ? Math.round((info.finished / info.total) * 100) : 0,
);
</script>

<template>
  <button
    type="button"
    class="cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(59,105,61)] dark:focus-visible:outline-[rgb(76,145,90)]"
    :aria-expanded="expanded"
    :aria-controls="`series-${info.name}`"
    @click="toggle"
  >
    <WereadCard
      :image="info.books[0]?.cover"
      :name="info.name"
      :top-badge="durationBadge"
      :bottom-badge="countBadge"
      :progress="progressPercent"
      :interactive="false"
    />
    <span class="sr-only">
      {{ expanded ? "收起" : "展开" }}{{ info.name }}的 {{ info.total }} 个分册
    </span>
  </button>

  <!--
    分册区占满整行：它紧跟在占 1 格的系列卡之后，放不进本行剩余列，
    于是自动换到下一行并横跨整行——后面的行整体下移，同行卡片不受影响。
    （本行剩余空格由 shelf-grid 的 grid-flow-row-dense 回填。）
  -->
  <Transition name="sink">
    <div
      v-if="expanded"
      :id="`series-${info.name}`"
      class="col-span-full"
    >
      <ul
        class="grid list-none gap-4 rounded-lg bg-[var(--un-prose-bg-soft)] p-3 shadow-inner dark:bg-[var(--un-prose-invert-bg-soft)] [grid-template-columns:repeat(3,minmax(0,1fr))] sm:[grid-template-columns:repeat(4,minmax(0,1fr))]"
      >
        <li v-for="book in info.books" :key="book.bookId ?? book.title">
          <WereadCard
            :image="book.cover"
            :name="book.title || '未知书籍'"
            :bottom-badge="getProgressLabel(book, progressFor(book.bookId))"
            :href="book.deepLink"
          />
        </li>
      </ul>
    </div>
  </Transition>
</template>

<style scoped>
/*
  动画相关的三个状态类必须写在 CSS 里：它们由 Vue 的 <Transition> 按 name="sink"
  自动挂载（sink-enter-active / sink-enter-from / …），无法用工具类表达。
  其余布局与视觉（网格、间距、圆角、背景、阴影）都在模板上用 UnoCSS 描述。
*/
.sink-enter-active,
.sink-leave-active {
  transition:
    opacity 200ms ease-out,
    transform 250ms ease-out;
}

.sink-enter-from,
.sink-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

@media (prefers-reduced-motion: reduce) {
  .sink-enter-active,
  .sink-leave-active {
    transition: none;
  }
}
</style>
