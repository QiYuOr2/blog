<template>
  <div class="posts-list">
    <ul>
      <li class="posts-list__item" v-for="(post, i) in list" :key="i">
        <h2>{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
      </li>
    </ul>

    <div class="posts-list__pagination">
      <fe-button size="large">查看更多</fe-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { importAll, omit } from '../common/utils';

const posts = importAll(require.context('../posts', false, /\.mdx$/))
  .map(omit('default'))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default {
  setup() {
    const page = ref(1);
    const list = reactive(posts);

    return {
      list,
      page,
    };
  },
};
</script>

<style lang="less">
.posts-list {
  &__item {
    padding: 0 0.65rem;
    margin-bottom: 4rem;
    border-radius: var(--size-radius);

    h2,
    p {
      margin: 0;
    }

    h2 {
      display: inline-block;
      margin: 0 auto 0.5rem -0.5rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--size-radius);

      font-weight: bold;
      cursor: pointer;

      transition: background 0.3s;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0.5rem;
        right: 0.5rem;
        bottom: 0;
        height: 2px;
        background: #0000000f;
        transition: background 0.3s;
      }

      &:hover {
        background: var(--color-hover);
        transition: background 0.3s;

        &::after {
          background: var(--color-primary);
          transition: background 0.3s;
        }
      }
    }

    p {
      font-size: 1.15rem;
    }
  }

  &__pagination {
    margin-top: 3rem;
    margin-left: 1rem;

    .fect-button {
      width: 100%;
    }
  }
}
</style>
