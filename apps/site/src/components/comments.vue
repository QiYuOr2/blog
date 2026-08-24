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

onMounted(() => colorMode.addEventListener(handleColorModeChange));
onBeforeUnmount(() => colorMode.removeEventLister(handleColorModeChange));
</script>

<template>
  <section class="flex justify-center py-7" aria-label="评论">
    <Giscus
      id="comments"
      class="w-full sm:w-[95%]"
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
  </section>
</template>
