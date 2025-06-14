<script lang="ts" setup>
const props = defineProps<{
  headings: { depth: number; slug: string; text: string }[]
}>()

const basicDepth = computed(() => {
  let result = props.headings[0].depth
  for (let i = 1; i < props.headings.length; i++) {
    const item = props.headings[i]
    if (result > item.depth) {
      result = item.depth
    }
  }

  return result
})
</script>

<template>
  <ul v-if="props.headings.length" class="toc">
    <p class="toc__title">目录</p>
    <li :class="`toc__archor toc__archor--${h.depth - basicDepth}`"  v-for="h in props.headings">
      <a class="hover:text-dark hover:border-black dark:hover:text-white dark:hover:border-white" :href="`#${h.slug}`">{{ h.text }}</a>
    </li>
  </ul>
</template>

<style lang="less">
.toc {
  padding-left: 0 !important;

  &__title {
    margin-bottom: .2rem !important;
  }

  &__archor {
    list-style-type: none;
    &::before {
      content: "-";
      display: inline-block;
      position: absolute; 
      margin-left: -.9375em;
    }
    &--0 {
      margin-left: 1em;
    }
    &--1 {
      margin-left: 2em;
    }
  }

  a {
    display: inline-block;
    color: rgba(156, 156, 156, 0.77);
    border-bottom: 1px solid #00000000;
    transition: all .3s;

    &:hover {
      // color: #000000db;
      // border-color: #000000db;
      transition: all .3s;
    }
  }
}

@media screen and (max-width: 1200px) {
  .toc {
    position: unset;
    font-size: unset;
    width: unset;

    padding-left: 0;
  }
}
</style>