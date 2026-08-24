<script setup lang="ts">
import { computed } from "vue";
import "@/styles/toc.css";
const props = defineProps<{ headings: { depth: number; slug: string; text: string }[] }>();
const depth = computed(() =>
  props.headings.length ? Math.min(...props.headings.map((h) => h.depth)) : 0,
);
</script>
<template>
  <ul v-if="headings.length" class="pl-0">
    <p class="mb-[0.2rem]">目录</p>
    <li v-for="h in headings" :key="h.slug" :class="`toc__archor toc__archor--${h.depth - depth}`">
      <a
        class="no-underline border-b border-warm-gary-400 transition-all duration-300 text-warm-gray-400 hover:(text-dark border-black) dark:border-warm-gray-500 dark:hover:(text-white border-white)"
        :href="`#${h.slug}`"
        >{{ h.text }}</a
      >
    </li>
  </ul>
</template>
