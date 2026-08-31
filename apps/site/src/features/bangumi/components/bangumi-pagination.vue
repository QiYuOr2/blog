<script setup lang="ts">
import type { PageButton } from "../model";

defineProps<{
  page: number;
  totalPages: number;
  pageButtons: PageButton[];
}>();

const emit = defineEmits<{ change: [page: number] }>();

function goTo(pageButton: PageButton) {
  if (typeof pageButton === "number") emit("change", pageButton);
}
</script>
<template>
  <div v-if="totalPages > 1" class="mt-4 flex items-center justify-center gap-2">
    <button
      class="i-mingcute:left-fill text-true-gray-500"
      :disabled="page === 1"
      @click="emit('change', page - 1)"
    >
      上一页
    </button>
    <template v-for="pageButton in pageButtons" :key="pageButton">
      <span
        v-if="typeof pageButton === 'string'"
        class="mx-1 px-2 py-1 font-bold text-true-gray-500"
        >...</span
      >
      <button
        v-else
        :class="[
          'h-8 w-8 rounded-md',
          pageButton === page ? 'bg-[rgb(59,105,61)] text-white' : 'bg-[var(--un-prose-bg-soft)]',
        ]"
        @click="goTo(pageButton)"
      >
        {{ pageButton }}
      </button>
    </template>
    <button
      class="i-mingcute:right-fill text-true-gray-500"
      :disabled="page === totalPages"
      @click="emit('change', page + 1)"
    >
      下一页
    </button>
  </div>
</template>
