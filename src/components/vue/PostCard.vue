<script setup lang="ts">
import FluentArrowUpRight20Filled from '~icons/fluent/arrow-up-right-20-filled';

defineProps<{
  title: string
  path: string
  summary?: string
  date: string,
  tags?: string | string[]
  isExternal?: boolean
}>();
</script>


<template>
  <a  :href="path" :target="isExternal ? '_blank' : '_self'" no-underline>
    <li class="flex gap-2 py-2 px-8 my-2 mx--8 list-none cursor-pointer">
      <div class="flex transition-all duration-300 text-[1.1rem] text-warm-gray-400 hover:text-warm-gray-900 dark:hover:text-warm-gray-50">
        <div>{{ title }}</div>
        <FluentArrowUpRight20Filled v-if="isExternal" class="text-[0.6rem] ml-[0.3rem] text-warm-gray-400 text-opacity-80" />
      </div>
      <div class="flex items-center font-normal text-[0.8rem] leading-normal text-warm-gray-400 text-opacity-80">
        <div>
          {{ date.split(' ')[0].split('/').slice(1).join('/') }}
        </div>
      </div>
    </li>
  </a>
</template>


<style lang="less" scoped>
@media screen and (max-width: 800px) {
  .post-card--line {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
