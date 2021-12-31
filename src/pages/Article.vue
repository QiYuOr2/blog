<template>
  <article class="article heti">
    <component :is="currentArticle"></component>
  </article>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { importAll } from '../common/utils';

const posts = importAll(
  require.context('../posts', false, /\.mdx$/),
  true
).reduce((total, { module, file }) => {
  total[file.replace(/.\/|.mdx/g, '')] = module.default;

  return total;
}, {});

export default {
  components: posts,
  setup() {
    const r = useRouter();
    const currentArticle = ref('');
    watch(
      () => r.currentRoute.value.name,
      (val) => {
        scrollTo({ top: 0 });
        currentArticle.value = val;
      },
      { immediate: true }
    );

    return { currentArticle };
  },
};
</script>

<style lang="less">
.article {
  padding: 0 1rem;
}
</style>
