<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    image?: string;
    name: string;
    /** 右上角排版的第一枚徽标（阅读时长）。 */
    topBadge?: string;
    /** 紧跟在 topBadge 下方的一枚徽标（阅读进度）。 */
    bottomBadge?: string;
    /** 封面底部的阅读进度条（0–100）；未传或传 0 时不画。 */
    progress?: number;
    /** 有 deepLink 时点击跳转。 */
    href?: string;
    /**
     * 是否渲染成可交互控件。系列卡的封面要自己控制展开行为，
     * 交互由外层按钮承担，这里渲染成非交互容器，避免交互元素嵌套。
     */
    interactive?: boolean;
  }>(),
  { progress: 0, interactive: true },
);

/**
 * 单本书卡片。整张卡片必须渲染成 <button>，不能用 <a>：
 * 页面在 `<article class="prose">` 里，`uno.config.ts` 给正文链接统一设了
 * `opacity: .7` + 背景色（hover 才恢复），卡片是 <a> 时会整张变淡、看起来发灰。
 * 用按钮 + 跳转既躲开正文链接样式，也保住了键盘可达与可见焦点。
 */
function open() {
  if (props.href) window.open(props.href, "_blank", "noopener,noreferrer");
}
</script>

<template>
  <component
    :is="interactive ? 'button' : 'div'"
    :type="interactive ? 'button' : undefined"
    :aria-label="interactive && href ? `${name}（在新窗口打开）` : undefined"
    class="relative block w-full overflow-hidden rounded-lg bg-white text-left shadow-md transition-shadow duration-150 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(59,105,61)] dark:bg-gray-800 dark:focus-visible:outline-[rgb(76,145,90)]"
    @click="interactive ? open() : undefined"
  >
    <img
      v-if="image"
      :src="image"
      :alt="name"
      loading="lazy"
      decoding="async"
      class="aspect-[2/3] w-full object-cover"
    />
    <div
      v-else
      class="flex aspect-[2/3] w-full items-center justify-center bg-slate-100 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300"
    >
      无封面
    </div>

    <!-- 底部渐变：盖在封面之上，给标题提供可读底色。 -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-[4.5rem] bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.55)] to-transparent"
    />

    <p
      class="absolute inset-x-0 bottom-0 my-0! px-2 pb-[0.375rem] text-[0.7rem] text-white [line-height:1.1rem] break-words"
    >
      {{ name }}
    </p>

    <!-- 时长 / 进度徽标竖排在右上角。 -->
    <div class="absolute top-1 right-1 flex flex-col items-end gap-1 text-right text-xs text-white">
      <span v-if="topBadge" class="inline-flex rounded bg-[rgba(0,0,0,0.45)] px-1.5 py-1">
        {{ topBadge }}
      </span>
      <span v-if="bottomBadge" class="inline-flex rounded bg-[rgba(0,0,0,0.45)] px-1.5 py-1">
        {{ bottomBadge }}
      </span>
    </div>

  </component>
</template>
