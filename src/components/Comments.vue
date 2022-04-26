<template>
  <div class="white"></div>
  <giscus-widget
    id="comments"
    repo="QiYuOr2/blog"
    repoid="R_kgDOGlnN5w"
    category="Announcements"
    categoryid="DIC_kwDOGlnN584COx7K"
    mapping="url"
    reactions-enabled="1"
    emitmetadata="0"
    inputposition="top"
    :theme="theme"
    lang="zh-CN"
  ></giscus-widget>
</template>

<script lang="ts">
import { useTheme } from '@fect-ui/vue';
import { computed } from '@vue/runtime-core';
import { ref, watch, onMounted } from 'vue';
export default {
  setup() {
    const selfDoc = ref(null);
    const { theme } = useTheme();

    onMounted(() => {
      selfDoc.value = document;
    });

    watch(theme, (v) => {
      console.log(v);
    });

    const formattedTheme = computed(() => {
      const themeClass = selfDoc.value?.querySelector('html')?.getAttribute?.('class');

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

<style lang="less" scoped>
.white {
  width: 100%;
  height: 1rem;
}
</style>
