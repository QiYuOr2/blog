<template>
  <article class="article heti custom">
    <router-view></router-view>
    <comments />
  </article>
</template>

<script>
import Comments from '../components/Comments.vue';
import { onMounted } from 'vue';

export default {
  components: { Comments },
  setup() {
    onMounted(() => {
      window.scrollTo({ top: 0 });
    });
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
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 0;
      padding-right: 0;
      color: unset;
      background-color: unset;
      border-radius: unset;
      margin: unset;
      border: unset;

      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-block-start: 12px;
      padding-block-end: 12px;
      padding-inline-start: 16px;
      padding-inline-end: 16px;
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
      margin-left: 0;
      margin-right: 0;
      li {
        list-style: none;
        position: relative;
        padding-left: 1.5rem;
        &::before {
          display: block !important;
          background-color: #d1d5db;
          border-radius: 50%;
          content: '';
          height: 0.375em;
          left: 1em;
          position: absolute;
          top: 0.6em;
          width: 0.375em;
        }
      }
    }
  }
}
</style>
