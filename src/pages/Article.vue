<template>
  <article class="article heti custom">
    <router-view></router-view>
  </article>
</template>

<script>
export default {
  setup() {},
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
