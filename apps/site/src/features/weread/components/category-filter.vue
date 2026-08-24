<script setup lang="ts">
export interface WereadCategory {
  name: string
  count: number
}

defineProps<{
  categories: WereadCategory[]
  selectedCategory: string | null
  total: number
}>()

const emit = defineEmits<{ select: [category: string | null] }>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      :class="['rounded-full px-3 py-1 text-xs transition-colors duration-150', selectedCategory === null ? 'bg-[rgb(59,105,61)] text-white' : 'bg-[var(--un-prose-bg-soft)] text-[var(--un-prose-body)] dark:text-[var(--un-prose-invert-body)]']"
      @click="emit('select', null)"
    >
      全部 ({{ total }})
    </button>
    <button
      v-for="category in categories"
      :key="category.name"
      type="button"
      :class="['rounded-full px-3 py-1 text-xs transition-colors duration-150', selectedCategory === category.name ? 'bg-[rgb(59,105,61)] text-white' : 'bg-[var(--un-prose-bg-soft)] text-[var(--un-prose-body)] dark:text-[var(--un-prose-invert-body)]']"
      @click="emit('select', category.name)"
    >
      {{ category.name }} ({{ category.count }})
    </button>
  </div>
</template>
