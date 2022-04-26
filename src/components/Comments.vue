<template>
  <giscus-widget
    id="comments"
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
  ></giscus-widget>
</template>

<script lang="ts">
import { useTheme } from '@fect-ui/vue';
import { computed } from '@vue/runtime-core';
import { watch } from 'vue';
export default {
  setup() {
    const { theme } = useTheme();

    watch(theme, (v) => {
      console.log(v);
    });

    const formattedTheme = computed(() => {
      const themeClass = document.querySelector('html').getAttribute('class');

      const themeMap = {
        'light-theme': 'light',
        'dark-theme': 'dark',
      };
      return themeMap[themeClass] || 'light';
    });

    return { theme: formattedTheme };
  },
};
</script>

<style></style>
