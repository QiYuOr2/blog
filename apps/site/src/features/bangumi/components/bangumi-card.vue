<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import type { CollectionItem } from "../types";

enum ImageLoadStatus {
  Loading = "loading",
  Loaded = "loaded",
  Failed = "failed",
}

const props = defineProps<{ item: CollectionItem; imageTimeoutMs?: number }>();
const title = computed(() => props.item.subject.name_cn || props.item.subject.name);
const loadStatus = ref<ImageLoadStatus>(ImageLoadStatus.Loading);

let timeoutId: ReturnType<typeof setTimeout> | undefined;

function clearImageTimeout() {
  if (timeoutId !== undefined) {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  }
}

function startImageTimeout() {
  clearImageTimeout();
  if (loadStatus.value !== ImageLoadStatus.Loading) return;
  const timeout = props.imageTimeoutMs;
  if (!timeout || timeout <= 0) return;
  timeoutId = setTimeout(() => {
    if (loadStatus.value === ImageLoadStatus.Loading) {
      loadStatus.value = ImageLoadStatus.Failed;
    }
  }, timeout);
}

function onImageLoad() {
  loadStatus.value = ImageLoadStatus.Loaded;
  clearImageTimeout();
}

function onImageError() {
  loadStatus.value = ImageLoadStatus.Failed;
  clearImageTimeout();
}

function resetImage() {
  loadStatus.value = ImageLoadStatus.Loading;
  startImageTimeout();
}

onMounted(startImageTimeout);
onUnmounted(clearImageTimeout);
// 缓存模式下由父组件传入超时；切换进缓存模式时重新计时。
watch(() => props.imageTimeoutMs, startImageTimeout);
// 封面 URL 变化（例如接口数据与缓存数据不一致）时，重置加载状态并重新计时。
watch(() => props.item.subject.images.small, resetImage);

function open() {
  window.open(`https://bgm.tv/subject/${props.item.subject.id}`, "_blank");
}
</script>
<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:(shadow-lg)"
    @click="open"
  >
    <!-- 加载中：骨架屏 -->
    <div v-if="loadStatus === ImageLoadStatus.Loading" class="absolute inset-0 skeleton" />
    <!-- 加载失败：占位 -->
    <div
      v-if="loadStatus === ImageLoadStatus.Failed"
      class="h-36 md:h-48 lg:h-48 w-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900"
    >
      <span class="i-mdi:image-outline text-2xl text-gray-400" />
      <span class="px-3 text-center text-xs text-gray-600 dark:text-gray-200 line-clamp-2">
        {{ title }}
      </span>
    </div>
    <!-- 封面：加载中与已加载都保留，加载中透明透出骨架，失败时移除 -->
    <img
      v-if="loadStatus !== ImageLoadStatus.Failed"
      :src="item.subject.images.small"
      :alt="title"
      class="relative h-36 md:h-48 lg:h-48 w-full object-cover"
      @load="onImageLoad"
      @error="onImageError"
    />
    <!-- 加载成功后的暗色遮罩 -->
    <div
      v-if="loadStatus === ImageLoadStatus.Loaded"
      class="absolute top-10 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"
    />
    <!-- 底部标题：加载中（骨架屏上方）与已加载显示 -->
    <div
      v-if="
        loadStatus === ImageLoadStatus.Loaded ||
        (loadStatus === ImageLoadStatus.Loading && title)
      "
      class="px-2 py-2 absolute bottom-0 text-white text-xs"
    >
      {{ title }}
    </div>
    <div
      class="px-1 py-0.5 text-xs absolute top-1 right-1 bg-[rgba(0,0,0,0.6)] text-white rounded opacity-85"
    >
      {{ item.subject.score }}
    </div>
  </div>
</template>
