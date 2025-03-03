<script lang="ts" setup>
const props = defineProps<{
  headings: { depth: number; slug: string; text: string }[]
}>()
</script>

<template>
  <ul v-if="props.headings.length" class="toc">
    <p class="toc__title">目录</p>
    <li :class="`toc__archor toc__archor--${h.depth}`" v-for="h in props.headings">
      <a :href="`#${h.slug}`">{{ h.text }}</a>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.toc {
  position: fixed;
  left: .5rem;
  top: 4rem;

  width: 200px;

  font-size: .75rem;

  &__title {
    margin-bottom: .2rem;
  }

  &__archor {
    list-style-type: none;
    &::before {
      content: "-";
      display: inline-block;
      position: absolute; 
      margin-left: -.9375em;
    }
    &--2 {
      margin-left: 0;
    }
    &--3 {
      margin-left: 1em;
    }
  }

  a {
    display: inline-block;
    color: rgba(156, 156, 156, 0.77);
    border-bottom: 1px solid #00000000;
    transition: all .3s;

    &:hover {
      color: #000000db;
      border-color: #000000db;
      transition: all .3s;
    }
  }
}

@media screen and (max-width: 1200px) {
  .toc {
    display: none;
  }
}
</style>