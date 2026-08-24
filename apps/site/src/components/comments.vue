<script setup lang="ts">
import Giscus from "@giscus/vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { colorModeEffect, Mode } from "@/features/theme/color-mode";

const colorMode = colorModeEffect();
const toGiscusTheme = (mode: Mode) => (mode === Mode.Dark ? "dark" : "light");
const theme = ref(toGiscusTheme(colorMode.getCurrentMode()));

const handleColorModeChange = (mode: Mode.Dark | Mode.Light) => {
  theme.value = toGiscusTheme(mode);
};

const commentsContainer = ref<HTMLElement | null>(null);
const loaded = ref(false);
let observer: MutationObserver | null = null;

onMounted(() => {
  colorMode.addEventListener(handleColorModeChange);

  if (!commentsContainer.value) return;
  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const widget = mutation.addedNodes[0] as HTMLElement | undefined;
      if (!widget) continue;
      setTimeout(() => {
        const iframe = widget.shadowRoot?.querySelector("iframe");
        iframe?.addEventListener("load", () => {
          loaded.value = true;
          observer?.disconnect();
        });
      }, 0);
    }
  });
  observer.observe(commentsContainer.value, { childList: true, subtree: true });
});

onBeforeUnmount(() => {
  colorMode.removeEventLister(handleColorModeChange);
  observer?.disconnect();
});
</script>

<template>
  <section class="flex justify-center py-7" aria-label="评论">
    <div ref="commentsContainer" class="w-full sm:w-[95%]">
      <div v-if="!loaded" class="w-full flex flex-col items-center">
        <div class="w-12 h-12 rounded mb-3 skeleton"></div>
        <div class="w-48 h-6 rounded skeleton"></div>
      </div>
      <Giscus
        id="comments"
        class="w-full"
        repo="QiYuOr2/blog"
        repo-id="R_kgDOGlnN5w"
        category="Announcements"
        category-id="DIC_kwDOGlnN584COx7K"
        mapping="pathname"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="top"
        :theme="theme"
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  </section>
</template>
