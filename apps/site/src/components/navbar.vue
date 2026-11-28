<script setup lang="ts">
import { isRouteActive, type NavRoute } from "@/lib/navigation";
export type Route = NavRoute;
const props = defineProps<{ currentPath: string; routes: readonly Route[] }>();
</script>
<template>
  <nav class="mx-auto max-w-[65ch] px-7 mb-6 h-9 xl:(px-0)" :data-current-path="currentPath">
    <div class="flex shadow-inner bg-cool-gray-100 dark:bg-true-gray-700 rounded-full">
      <ul
        class="flex gap-1 px-2 py-1 bg-cool-gray-100 dark:bg-true-gray-700 rounded-full text-sm text-true-gray-400 relative"
      >
        <li
          v-for="route in routes"
          :key="route.path"
          :data-nav-path="route.path"
          :class="[
            'relative',
            isRouteActive(currentPath, route, props.routes) ? 'nav-item-active' : '',
          ]"
        >
          <a class="relative z-20 block px-2 py-1" :href="route.path">{{ route.label }}</a>
        </li>
      </ul>
      <div class="flex-1 m-1 relative">
        <div
          class="custom-bg-radial from-transparent to-white dark:to-dark rounded-full drop-shadow absolute right-0 bottom-0 top-0 left--5"
        />
      </div>
    </div>
  </nav>
</template>
