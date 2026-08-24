<script setup lang="ts">
import { computed } from "vue";
import { date, sortByDate } from "@/features/posts/model";
import type { CollectionEntry } from "astro:content";

type PostEntry = CollectionEntry<"posts"> & { link?: string };

interface PostViewModel {
  key: string;
  href: string;
  target: "_blank" | "_self";
  title: string;
  date: string;
  isExternal: boolean;
  isNote: boolean;
}

interface PostYearViewModel {
  year: string;
  posts: PostViewModel[];
}

const props = defineProps<{ posts: Partial<Record<string, PostEntry[]>> }>();

function toPostViewModel(post: PostEntry): PostViewModel {
  const isExternal = typeof post.link === "string";
  const postDate = date(post);

  return {
    key: isExternal ? post.link! : post.id,
    href: isExternal ? post.link! : `/${post.id}`,
    target: isExternal ? "_blank" : "_self",
    title: post.data.title,
    date: postDate.split(" ")[0].split("/").slice(1).join("/"),
    isExternal,
    isNote: post.data.tags?.includes("笔记") ?? false,
  };
}

const years = computed<PostYearViewModel[]>(() =>
  Object.entries(props.posts)
    .sort(([firstYear], [secondYear]) => Number(secondYear) - Number(firstYear))
    .map(([year, posts]) => ({
      year,
      posts: [...(posts ?? [])].sort(sortByDate).map(toPostViewModel),
    })),
);
</script>

<template>
  <div>
    <div v-for="year in years" :key="year.year" class="mb-8">
      <div class="text-2xl font-bold">{{ year.year }}</div>
      <div>
        <a
          v-for="post in year.posts"
          :key="post.key"
          :href="post.href"
          :target="post.target"
          class="no-underline relative"
          ><li
            class="flex flex-col sm:flex-row gap-2 py-2 px-8 my-2 mx--8 list-none cursor-pointer"
          >
            <div
              class="flex transition-all duration-300 text-[1.1rem] text-true-gray-800 dark:text-true-gray-200 hover:text-warm-gray-900 dark:hover:text-warm-gray-50"
            >
              <div>{{ post.title }}</div>
              <div
                v-if="post.isExternal"
                class="i-fluent:arrow-up-right-20-filled text-[0.6rem] ml-[0.3rem] text-true-gray-500 dark:text-true-gray-400 text-opacity-80"
              />
            </div>
            <div class="flex items-center time gap-2">
              <div>{{ post.date }}</div>
              <div
                v-if="post.isNote"
                class="md:(absolute -left-8 top-1/2 transform -translate-y-1/2) px-1 py-0.5 rounded text-[0.6rem] font-bold opacity-65 bg-true-gray-300 text-true-gray-800 dark:bg-true-gray-600 dark:text-true-gray-200"
              >
                笔记
              </div>
            </div>
          </li>
        </a>
      </div>
    </div>
  </div>
</template>
