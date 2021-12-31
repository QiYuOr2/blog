<template>
  <div class="posts-list">
    <ul>
      <li class="posts-list__item" v-for="(post, i) in list" :key="i">
        <h2 @click="toDetail(post.to)">{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
      </li>
    </ul>

    <div class="posts-list__pagination">
      <fe-button v-if="hasMore" size="large" @click="loadMore">
        查看更多
      </fe-button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { importAll, omit } from '../common/utils';

const posts = importAll(require.context('../posts', false, /\.mdx$/), true)
  .map(({ module, file }) => ({
    ...omit('default', module),
    to: `/posts/${file.replace(/.\/|.mdx/g, '')}`,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const PAGE_SIZE = 7;
const TOTAL_COUNT = posts.length;

export default {
  setup() {
    const page = ref(1);
    const list = computed(() => posts.slice(0, page.value * PAGE_SIZE));
    const hasMore = computed(() => page.value * PAGE_SIZE <= TOTAL_COUNT);

    const loadMore = () => {
      if (hasMore.value) {
        page.value += 1;
      }
    };

    const r = useRouter();
    const toDetail = (to) => {
      r.push(to);
    };

    return {
      list,
      page,
      loadMore,
      hasMore,
      toDetail,
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
        background: var(--color-text-underline);
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
