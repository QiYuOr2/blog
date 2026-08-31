<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

export interface CategoryOption {
  name: string;
  count: number;
}

const props = withDefaults(
  defineProps<{
    categories: CategoryOption[];
    selectedCategory: string | null;
    /** 「全部」选项的计数，仅 showAll 为 true 时展示。 */
    total?: number;
    /** 是否显示「全部」选项；不展示时要求 selectedCategory 始终取一个分类。 */
    showAll?: boolean;
  }>(),
  { total: 0, showAll: true },
);

const emit = defineEmits<{ select: [category: string | null] }>();

const open = ref(false);
const root = ref<HTMLElement>();

const selectedLabel = computed(() => {
  if (!props.selectedCategory) return `全部 (${props.total})`;
  const found = props.categories.find((c) => c.name === props.selectedCategory);
  return found ? `${found.name} (${found.count})` : props.selectedCategory;
});

function select(category: string | null) {
  emit("select", category);
  open.value = false;
}

function onDocumentClick(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) open.value = false;
}

onMounted(() => document.addEventListener("click", onDocumentClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocumentClick));
</script>

<template>
  <!-- 移动端：下拉筛选 -->
  <div ref="root" class="relative sm:hidden">
    <button
      type="button"
      :aria-expanded="open"
      class="flex w-[8rem] items-center justify-between gap-2 rounded-full border border-[var(--un-prose-borders)] bg-[var(--un-prose-bg-soft)] py-1.5 pl-3 pr-2.5 text-xs text-[var(--un-prose-body)] transition-colors duration-150 dark:border-[var(--un-prose-invert-borders)] dark:bg-[var(--un-prose-invert-bg-soft)] dark:text-[var(--un-prose-invert-body)]"
      @click="open = !open"
    >
      <span class="truncate">{{ selectedLabel }}</span>
      <i
        class="i-mingcute:down-line h-4 w-4 shrink-0 text-[var(--un-prose-captions)] transition-transform duration-150 dark:text-[var(--un-prose-invert-captions)]"
        :class="open ? 'rotate-180' : ''"
      />
    </button>

    <div
      v-show="open"
      class="absolute left-0 w-[8rem] top-full z-20 mt-1.5 overflow-auto rounded-xl border border-[var(--un-prose-borders)] bg-white p-1 shadow-md dark:border-[var(--un-prose-invert-borders)] dark:bg-true-gray-700"
    >
      <button
        v-if="showAll"
        type="button"
        class="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors duration-150"
        :class="selectedCategory === null
          ? 'bg-[var(--un-prose-bg-soft)] text-[var(--un-prose-body)] dark:bg-[var(--un-prose-invert-bg-soft)] dark:text-[var(--un-prose-invert-body)]'
          : 'text-[var(--un-prose-body)] hover:bg-[var(--un-prose-bg-soft)] dark:text-[var(--un-prose-invert-body)] dark:hover:bg-[var(--un-prose-invert-bg-soft)]'"
        @click="select(null)"
      >
        <span>全部 ({{ total }})</span>
        <i v-if="selectedCategory === null" class="i-mingcute:check-line h-4 w-4 text-[rgb(59,105,61)]" />
      </button>
      <button
        v-for="category in categories"
        :key="category.name"
        type="button"
        class="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors duration-150"
        :class="selectedCategory === category.name
          ? 'bg-[var(--un-prose-bg-soft)] text-[var(--un-prose-body)] dark:bg-[var(--un-prose-invert-bg-soft)] dark:text-[var(--un-prose-invert-body)]'
          : 'text-[var(--un-prose-body)] hover:bg-[var(--un-prose-bg-soft)] dark:text-[var(--un-prose-invert-body)] dark:hover:bg-[var(--un-prose-invert-bg-soft)]'"
        @click="select(category.name)"
      >
        <span>{{ category.name }} ({{ category.count }})</span>
        <i
          v-if="selectedCategory === category.name"
          class="i-mingcute:check-line h-4 w-4 text-[rgb(59,105,61)]"
        />
      </button>
    </div>
  </div>

  <!-- 桌面端：胶囊按钮 -->
  <div class="hidden flex-wrap gap-2 sm:flex">
    <button
      v-if="showAll"
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
