<script setup lang="ts">
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
type MemoLink = string | { href: string; title: string; cover?: string; description?: string };
interface MemoCardProps {
  type: string;
  timestamp: string | number;
  create_at: Date;
  content: string | string[];
  link?: MemoLink;
  back?: boolean;
  className?: string;
}
const props = defineProps<MemoCardProps>();
const displayTime = dayjs(props.create_at).format("YYYY 年 MM 月 DD 日 dddd");
const icon =
  "ml-2 cursor-pointer hover:(text-dark scale-180 transition-all dark:text-light) duration-150";
</script>
<template>
  <div :class="['mb-2', className]">
    <div class="time px-1 py-1 flex items-center">
      <div class="w-2 h-2 rounded-full bg-[rgb(59,105,61)] mr-2" />
      <div>{{ displayTime }}</div>
      <div v-if="back" title="返回" class="back">
        <div :class="`i-mingcute:large-arrow-left-fill ${icon}`" />
      </div>
      <a
        v-else
        :href="`/memo/${timestamp}`"
        title="查看"
        class="bg-transparent hover:bg-transparent dark:(bg-[var(--un-prose-invert-bg-soft)] text-[var(--un-prose-invert-body)])"
      >
        <div :class="`i-mingcute:chat-1-line ${icon}`" />
      </a>
    </div>
    <div class="border-l-neutral-200 border-solid border-l-1 ml-2">
      <div
        class="inline-block bg-[var(--un-prose-bg-soft)] text-[var(--un-prose-body)] dark:(bg-[var(--un-prose-invert-bg-soft)] text-[var(--un-prose-invert-body)]) px-3.5 py-3 ml-4 my-2 rounded-2xl"
      >
        <div v-if="Array.isArray(content)">
          <p v-for="item in content" :key="item" class="mt-0 mb-[0.5em] last:mb-0">{{ item }}</p>
        </div>
        <div v-else>{{ content }}</div>
        <template v-if="link">
          <a v-if="typeof link === 'string'" class="inline-flex items-center" :href="link">
            <i class="i-mdi:link-variant" /><span class="text-sm">{{ link }}</span>
          </a>
          <a
            v-else-if="link.cover"
            class="mt-[0.5em] mb-0.5 flex p-2 bg-white dark:bg-black rounded-xl no-underline"
            :href="link.href"
          >
            <img class="w-16 h-22 object-cover rounded-lg" :src="link.cover" />
            <div class="flex-1 ml-3">
              <p class="font-bold m-0 dark:(text-[var(--un-prose-invert-headings)])">
                {{ link.title }}
              </p>
              <p class="text-sm m-0 line-clamp-3 text-true-gray-500">
                {{ link.description ?? link.href }}
              </p>
            </div>
          </a>
          <div v-else class="mt-[0.5em]">
            <a class="inline-flex items-center" :href="link.href">
              <i class="i-mdi:link-variant" /><span class="text-sm">{{ link.title }}</span>
            </a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
