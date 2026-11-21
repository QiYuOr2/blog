<script setup lang="ts">
import { computed, onMounted, shallowRef } from "vue";
import type { WereadHighlight } from "../schema";
import { dayjs, SHANGHAI_TZ } from "../date";

const props = defineProps<{ highlights: WereadHighlight[] }>();

/**
 * 首屏（SSR）用「上海日期」做种子的确定性一摘：构建期与客户端算出同一条，
 * 避免水合时内容跳变（与热力图锚定数据日期是同一类处理）。
 * 挂载后再换成真随机，访客每次打开都能看到不同的一条。
 */
const dailyPick = computed<WereadHighlight | null>(() => {
  const list = props.highlights;
  if (!list.length) return null;
  const seed = Number(dayjs().tz(SHANGHAI_TZ).format("YYYYMMDD"));
  return list[seed % list.length];
});

const picked = shallowRef<WereadHighlight | null>(null);
const current = computed(() => picked.value ?? dailyPick.value);

function pickRandom() {
  const list = props.highlights;
  if (list.length <= 1) {
    picked.value = list[0] ?? null;
    return;
  }
  let next = current.value;
  while (next === current.value) {
    next = list[Math.floor(Math.random() * list.length)];
  }
  picked.value = next;
}

onMounted(pickRandom);

function formatDate(createTime?: number) {
  if (!createTime) return "";
  return dayjs.unix(createTime).tz(SHANGHAI_TZ).format("YYYY-MM-DD");
}

/** 点击卡片：跳到全部书摘页，并用 bookmarkId 锚点定位到这一条。 */
function openInList() {
  const item = current.value;
  if (!item) return;
  window.location.href = `/weread/highlights#${item.bookmarkId}`;
}

/** 卡外右下的「全部 N 条」：去全部书摘页顶部，不带锚点。 */
function openAll() {
  window.location.href = "/weread/highlights";
}
</script>

<template>
  <!--
    设计（参考 Readmate 的书摘卡 + 编辑排版的通行做法，并适配本站）：
    - 视觉做成「凹陷」而非凸起：比页面略深的暖纸面 + 内阴影，直角无圆角，不浮在页面上；
    - 文字是主角：摘录用衬线体、放宽行距左对齐，左上一个低调的绿色引号作唯一的装饰标记；
    - 强调色只用一种，就是热力图的绿 rgb(59,105,61)（暗色 rgb(76,145,90)），与 Readmate 的墨绿同系；
    - 出处按 Readmate 的排法放卡片底部：左侧书名（稍粗）/ 章节 / 作者 / 日期逐行渐淡，右侧放封面缩略图。
  -->
  <section v-if="current" aria-label="随机书摘">
    <div class="group relative">
    <!-- 整卡可点：用覆盖层按钮承担跳转（避开 prose 对 <a> 的统一样式，理由同 card.vue）。 -->
    <button
      type="button"
      class="absolute inset-0 z-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(59,105,61)] dark:focus-visible:outline-[rgb(76,145,90)]"
      :aria-label="`在全部书摘中查看这条：${current.book?.title ?? ''}`"
      @click="openInList"
    />
    <div
      class="pointer-events-none relative overflow-hidden bg-[#F4F2EC] shadow-[inset_0_1px_5px_rgb(0,0,0,0.07),inset_0_0_0_1px_rgb(0,0,0,0.04)] transition-colors duration-200 group-hover:bg-[#F0EDE4] dark:bg-white/4 dark:shadow-[inset_0_1px_5px_rgb(0,0,0,0.35),inset_0_0_0_1px_rgb(255,255,255,0.05)] dark:group-hover:bg-white/6"
    >
      <div class="px-6 py-5 sm:px-7">
        <div class="flex items-center justify-between gap-2">
          <span
            class="flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.22em] text-[rgb(59,105,61)] dark:text-[rgb(76,145,90)]"
          >
            <span class="i-mingcute:bookmark-line inline-block h-3.5 w-3.5" />
            随机书摘
          </span>
          <button
            type="button"
            class="pointer-events-auto relative z-10 inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-xs opacity-55 transition-all duration-150 hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
            aria-label="换一条随机书摘"
            @click="pickRandom"
          >
            <span class="i-mdi:shuffle inline-block h-3.5 w-3.5" />
            换一条
          </button>
        </div>

        <!-- key 绑定 bookmarkId：换一条时整段淡入，提示内容已更新。 -->
        <div :key="current.bookmarkId" class="highlight-fade">
          <div
            aria-hidden="true"
            class="quote-serif mt-3 text-[1.7rem] leading-[0.5] text-[rgb(59,105,61)] opacity-30 select-none dark:text-[rgb(76,145,90)]"
          >
            ❝
          </div>
          <!-- prose 的 blockquote 自带底色，在凹陷卡里会浮出一块单独的背景，必须清掉。 -->
          <blockquote class="my-0! border-none bg-transparent! px-0! py-0!">
            <p
              class="quote-serif my-0! line-clamp-6 text-[1.06rem] leading-[1.95] font-normal not-italic"
            >
              {{ current.markText }}
            </p>
          </blockquote>

          <!-- 出处：Readmate 式逐行渐淡，封面在右。 -->
          <div class="mt-5 flex items-end gap-3">
            <div class="min-w-0 flex-1">
              <p class="my-0! truncate text-sm font-semibold">{{ current.book?.title }}</p>
              <p v-if="current.chapterTitle" class="my-0! truncate text-xs opacity-60">
                {{ current.chapterTitle }}
              </p>
              <p v-if="current.book?.author" class="my-0! truncate text-xs opacity-45">
                {{ current.book.author }}
              </p>
              <p v-if="current.createTime" class="my-0! text-xs opacity-40">
                {{ formatDate(current.createTime) }}
              </p>
            </div>
            <img
              v-if="current.book?.cover"
              :src="current.book.cover"
              :alt="current.book.title ?? ''"
              loading="lazy"
              decoding="async"
              class="my-0! h-13 w-9.5 shrink-0 object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
    <!-- 「全部 N 条」不放卡内：独立在卡片外右下角，常显，是进全量列表的入口。 -->
    <div class="mt-2 text-right">
      <button
        type="button"
        class="cursor-pointer text-xs font-medium text-[rgb(59,105,61)] opacity-70 transition-opacity duration-150 hover:opacity-100 dark:text-[rgb(76,145,90)]"
        @click="openAll"
      >
        全部 {{ highlights.length }} 条 →
      </button>
    </div>
  </section>
</template>

<style>
  /* 摘录正文用衬线：中文走系统宋体，与博客无衬线界面拉开「引文」层次。 */
  .quote-serif {
    font-family:
      "Songti SC", "STSong", "Noto Serif SC", "Source Han Serif SC", "SimSun", serif;
  }

  @keyframes highlight-fade {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .highlight-fade {
    animation: highlight-fade 0.35s ease both;
  }

  @media (prefers-reduced-motion: reduce) {
    .highlight-fade {
      animation: none;
    }
  }
</style>
