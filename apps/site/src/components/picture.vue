<script setup lang="ts">
import { ref } from "vue";
defineProps<{ src: string; width?: string; height?: string; alt?: string; round?: boolean }>();
const isError = ref(false);
</script>
<template>
  <div
    :class="[
      'bg-stone-1 overflow-hidden flex justify-center items-center border border-stone-2',
      round ? 'rounded-full' : 'rounded-sm',
    ]"
    :style="{ width, height }"
    title="Avatar"
    aria-label="Avatar"
  >
    <div v-if="isError" class="flex flex-col justify-center items-center text-stone">
      <div class="i-mdi:image-off w-6 h-6" />
      <span class="text-xs">{{ alt }}</span>
    </div>
    <img v-else :src="src" :alt="alt" @error="isError = true" />
  </div>
</template>
