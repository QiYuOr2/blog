<template>
  <article class="article heti custom">
    <h1>{{ title }}</h1>
    <component :is="currentArticle"></component>
    <copyright />
  </article>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { importAll } from '../common/utils';
import Copyright from '../components/Copyright.vue';

const nameToTitle = {};
const posts = importAll(
  require.context('../posts', false, /\.mdx$/),
  true
).reduce((total, { module, file }) => {
  const name = file.replace(/.\/|.mdx/g, '');
  total[name] = module.default;
  nameToTitle[name] = module.title;
  return total;
}, {});

export default {
  components: { ...posts, Copyright },
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

    return { currentArticle, title: nameToTitle[currentArticle.value] };
  },
};
</script>

<style lang="less">
.article {
  padding: 0 1rem;
  img {
    max-width: 100%;
  }
  &.custom {
    max-width: 100% !important;
    blockquote {
      margin-inline-start: 0;
      margin-inline-end: 0;
      position: relative;
      background: var(--article-blockquote-bg);
      p {
        margin-top: 0;
        margin-bottom: 0;
      }
      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 3px;
        background: var(--article-blockquote-mark);
      }
    }
    ul {
      padding: 0;
      li {
        list-style: none;
        position: relative;
        padding-left: 1.5rem;
        &::before {
          background-color: #d1d5db;
          border-radius: 50%;
          content: '';
          height: 0.375em;
          left: 0.25em;
          position: absolute;
          top: 0.6em;
          width: 0.375em;
        }
      }
    }
  }
}
</style>
