<template>
  <div class="posts-list">
    <ul>
      <li class="posts-list__item" v-for="(post, i) in list" :key="i">
        <h2>{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
      </li>
    </ul>

    <div class="posts-list__pagination">
      <fe-button size="small">查看更多</fe-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { importAll, omit } from '../common/utils';

const posts = importAll(require.context('../posts', false, /\.mdx$/)).map(
  omit('default')
);

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
    padding: 1rem;
    margin-bottom: 3rem;
    border-radius: var(--size-radius);
    border: 1px solid transparent;

    cursor: pointer;
    &:hover {
      border-color: var(--color-hover);
    }

    h2,
    p {
      margin: 0;
    }

    h2 {
      display: inline-block;
      margin-bottom: 1rem;
      margin-right: auto;
      font-weight: bold;
    }

    p {
      font-size: 1.15rem;
    }
  }

  &__pagination {
    margin-top: 3rem;
    margin-left: 1rem;
  }
}
</style>
