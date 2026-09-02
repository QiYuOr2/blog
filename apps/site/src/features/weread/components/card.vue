<script setup lang="ts">
defineProps<{
  image?: string;
  name: string;
  topBadge?: string;
  bottomBadge?: string;
  href?: string;
}>();

function openBook(href?: string) {
  if (href && typeof window !== "undefined") window.open(href, "_blank");
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:(shadow-lg) transition-all transition-duration-150"
    @click="openBook(href)"
  >
    <img v-if="image" :src="image" :alt="name" loading="lazy" decoding="async" class="aspect-[2/3] w-full object-cover" />
    <div
      v-else
      class="flex aspect-[2/3] w-full items-center justify-center bg-slate-100 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300"
    >
      无封面
    </div>
    <div
      class="absolute top-10 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"
    />
    <div class="px-2 py-2 absolute bottom-0 text-white text-xs">{{ name }}</div>
    <div class="absolute top-1 right-1 text-right text-white text-xs flex flex-col items-end gap-1">
      <span v-if="topBadge" class="inline-flex rounded bg-[rgba(0,0,0,0.45)] px-1.5 py-1">{{
        topBadge
      }}</span>
      <span v-if="bottomBadge" class="inline-flex rounded bg-[rgba(0,0,0,0.45)] px-1.5 py-1">{{
        bottomBadge
      }}</span>
    </div>
  </div>
</template>
