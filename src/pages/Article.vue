<template>
  <article class="article heti">
    <HelloWorld />
  </article>
</template>

<script>
import HelloWorld from '../posts/use-webpack-build-vue.mdx';

export default {
  components: { HelloWorld },
  setup() {},
};
</script>

<style lang="less">
.article {
  padding: 0 1rem;
}
</style>
