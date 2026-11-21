<script setup lang="ts">
import { computed, onMounted, shallowRef } from "vue";
import type { WereadHighlight } from "../schema";
import { dayjs, SHANGHAI_TZ } from "../date";

const props = defineProps<{ highlights: WereadHighlight[] }>();

type BookGroup = {
  bookId: string;
  title: string;
  author?: string;
  cover?: string;
  items: WereadHighlight[];
};

/** 按书分组：保持产物里的顺序（最近有笔记的书在前，书内保持接口返回顺序）。 */
const groups = computed<BookGroup[]>(() => {
  const byId = new Map<string, BookGroup>();
  for (const item of props.highlights) {
    let group = byId.get(item.bookId);
    if (!group) {
      group = {
        bookId: item.bookId,
        title: item.book?.title || "未知书籍",
        author: item.book?.author,
        cover: item.book?.cover,
        items: [],
      };
      byId.set(item.bookId, group);
    }
    group.items.push(item);
  }
  return [...byId.values()];
});

const selectedBookId = shallowRef<string | null>(null);
const query = shallowRef("");

/** 书筛选 + 正文/书名/作者/章节的关键词搜索，两者叠加。 */
const visibleGroups = computed<BookGroup[]>(() => {
  const keyword = query.value.trim().toLowerCase();
  const result: BookGroup[] = [];
  for (const group of groups.value) {
    if (selectedBookId.value !== null && group.bookId !== selectedBookId.value) continue;
    if (!keyword) {
      result.push(group);
      continue;
    }
    const items = group.items.filter(
      (item) =>
        item.markText.toLowerCase().includes(keyword) ||
        (item.chapterTitle ?? "").toLowerCase().includes(keyword),
    );
    const bookMatches =
      group.title.toLowerCase().includes(keyword) ||
      (group.author ?? "").toLowerCase().includes(keyword);
    if (bookMatches) result.push(group);
    else if (items.length) result.push({ ...group, items });
  }
  return result;
});

const isFiltering = computed(() => selectedBookId.value !== null || query.value.trim() !== "");

function clearFilters() {
  selectedBookId.value = null;
  query.value = "";
}

/** 工具栏内的回到顶部（本页隐藏了全站 back-top，见文末样式）。 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function formatDate(createTime?: number) {
  if (!createTime) return "";
  return dayjs.unix(createTime).tz(SHANGHAI_TZ).format("YYYY-MM-DD");
}

/**
 * 从随机书摘卡片跳来时 URL 带 #bookmarkId：原生锚点只会把目标顶到视口上方，
 * 挂载后主动把目标滚到视口中央，并加一层强调样式，方便一眼找到。
 */
onMounted(() => {
  const id = window.location.hash.replace(/^#/, "");
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ block: "center" });
  target.classList.add("highlight-located");
});
</script>

<template>
  <!--
    设计（参考 Readmate 的信息排布，视觉服从本项目）：每条书摘是一张无圆角的白卡，
    不用阴影、只用淡色边框分层；低调引号 + 衬线正文 + 卡内渐淡出处（书名作者在卡内，不设书目头）；
    工具栏底部悬浮，搜索 + 按书筛选叠加；
    强调色仍只用热力图的绿。
  -->
  <!-- 底部留白：让列表末尾能滚过底部悬浮的工具栏。 -->
  <div class="pb-28">
    <!-- 工具栏：底部悬浮，bottom 取安全区与 0.75rem 的较大值，手机上避开 Home 指示条；
      淡色边框划清与内容的界限；保持完整一行，全站 back-top 在本页隐藏（见文末样式），回到顶部按钮放进工具栏内。 -->
    <div
      class="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex w-[min(62ch,calc(100%-2rem))] -translate-x-1/2 flex-wrap items-center gap-2 rounded-full border border-black/10 bg-white/85 p-2 shadow-lg backdrop-blur max-sm:rounded-[1.6rem] dark:border-white/15 dark:bg-gray-800/85"
    >
      <label class="relative min-w-40 flex-1 max-sm:min-w-30">
        <span
          class="i-mingcute:search-line pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 opacity-45"
        />
        <input
          v-model="query"
          type="search"
          placeholder="搜索书摘、章节…"
          class="w-full rounded-full bg-black/4 py-2 pr-3 pl-9 text-sm outline-none placeholder:opacity-50 focus:ring-2 focus:ring-[rgb(59,105,61)]/50 dark:bg-white/8 dark:focus:ring-[rgb(76,145,90)]/50"
        />
      </label>
      <!-- 原生 select 的箭头贴边且不可控：去掉原生外观，箭头图标内缩放置。 -->
      <div class="relative">
        <select
          v-model="selectedBookId"
          aria-label="按书筛选"
          class="max-w-52 cursor-pointer appearance-none rounded-full bg-black/4 py-2 pr-9 pl-4 text-sm outline-none focus:ring-2 focus:ring-[rgb(59,105,61)]/50 max-sm:max-w-40 dark:bg-white/8 dark:focus:ring-[rgb(76,145,90)]/50"
        >
          <option :value="null">全部书籍（{{ groups.length }}）</option>
          <option v-for="group in groups" :key="group.bookId" :value="group.bookId">
            {{ group.title }}（{{ group.items.length }}）
          </option>
        </select>
        <span
          class="i-mingcute:down-line pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-base opacity-60"
          aria-hidden="true"
        />
      </div>
      <!-- 回到顶部：替代本页隐藏掉的全站 back-top，与搜索/筛选同排。 -->
      <button
        type="button"
        aria-label="回到顶部"
        class="shrink-0 cursor-pointer rounded-full bg-black/4 p-2 transition-colors hover:bg-black/8 dark:bg-white/8 dark:hover:bg-white/12"
        @click="scrollToTop"
      >
        <span class="i-mdi:arrow-top-bold block h-5 w-5" />
      </button>
    </div>

    <!-- 不设书目头：书籍信息（书名、作者）放进每张卡片里，列表是一条连续的卡片流。 -->
    <section v-for="group in visibleGroups" :key="group.bookId" class="mb-3 last:mb-0">
      <!-- 书摘条目：无圆角白卡 + 淡色边框——低调引号 + 衬线正文 + 卡内出处（书名作者 / 章节日期）。 -->
      <article
        v-for="item in group.items"
        :id="item.bookmarkId"
        :key="item.bookmarkId"
        class="highlight-item mb-3 scroll-mt-24 border border-black/10 bg-white px-5 py-4 transition-colors duration-150 last:mb-0 hover:border-black/20 dark:border-white/10 dark:bg-gray-800 dark:hover:border-white/20"
      >
        <div
          aria-hidden="true"
          class="quote-serif text-[1.3rem] leading-[0.5] text-[rgb(59,105,61)] opacity-25 select-none dark:text-[rgb(76,145,90)]"
        >
          ❝
        </div>
        <p class="quote-serif my-0! mt-1 text-[1rem] leading-[1.9]">{{ item.markText }}</p>
        <!-- 出处放卡内：书名、章节、作者、日期同在一组，窄屏自然折行，逐项渐淡。 -->
        <div class="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span class="text-[0.8rem] font-medium opacity-80">{{ group.title }}</span>
          <span v-if="item.chapterTitle" class="text-[0.72rem] opacity-55">{{ item.chapterTitle }}</span>
          <span v-if="group.author" class="text-[0.72rem] opacity-55">{{ group.author }}</span>
          <span v-if="item.createTime" class="text-[0.72rem] opacity-40">{{ formatDate(item.createTime) }}</span>
        </div>
      </article>
    </section>

    <div v-if="!visibleGroups.length" class="py-16 text-center">
      <p class="my-0! text-sm opacity-60">没有符合条件的书摘。</p>
      <button
        v-if="isFiltering"
        type="button"
        class="mt-3 cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium text-[rgb(59,105,61)] transition-colors hover:bg-[rgb(59,105,61)]/10 dark:text-[rgb(76,145,90)] dark:hover:bg-[rgb(76,145,90)]/15"
        @click="clearFilters"
      >
        清除筛选
      </button>
    </div>
  </div>
</template>

<style>
  /* 与随机书摘卡共用衬线引文样式。 */
  .quote-serif {
    font-family:
      "Songti SC", "STSong", "Noto Serif SC", "Source Han Serif SC", "SimSun", serif;
  }

  /* 锚点直达（未走 JS 时）与 JS 定位命中时共用：整段染上淡淡的绿 + 边框转绿，像被荧光笔划过。 */
  .highlight-item:target,
  .highlight-item.highlight-located {
    background-color: rgb(59 105 61 / 0.08);
    border-color: rgb(59 105 61 / 0.45);
  }

  :root.dark .highlight-item:target,
  :root.dark .highlight-item.highlight-located {
    background-color: rgb(76 145 90 / 0.12);
    border-color: rgb(76 145 90 / 0.5);
  }

  /* 本页工具栏自带回到顶部按钮：隐藏全站的 back-top，避免两个按钮并存。本组件只用在书摘页，样式不会外溢到其他页面。 */
  .back-top {
    display: none;
  }
</style>
