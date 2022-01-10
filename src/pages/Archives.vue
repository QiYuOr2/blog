<template>
  <div class="archives">
    <ul>
      <li class="archives-item" v-for="(item, i) in posts" :key="i">
        <span class="archives-item__date">{{ item.date }}</span>
        <span class="archives-item__title oneline" @click="toDetail(item.to)">
          {{ item.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { importAll, omit } from '../common/utils';
import { useNav } from '../composables';

const posts = importAll(require.context('../posts', true, /\.mdx$/), true)
  .map(({ module, file }) => ({
    ...omit('default', module),
    date: module.date.split(' ')[0],
    to: `/posts/${file.replace(/.\/|.mdx/g, '')}`,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default {
  setup() {
    const { toDetail } = useNav();
    return {
      posts,
      toDetail,
    };
  },
};
</script>

<style lang="less">
.archives {
  padding: 0 1rem;
  &-item {
    display: flex;
    align-items: center;
    height: 2.5rem;

    &__date {
      margin-right: 1rem;
      font-size: var(--size-text-remark);
      font-family: var(--font-family-monospace);
    }

    &__title {
      width: unset !important;
      margin-right: auto;
      transition: color 0.3s;
      cursor: pointer;

      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: var(--color-primary);
        transform: scaleX(0);
        transition: transform 0.3s;
      }

      &:hover {
        &::after {
          transform: scaleX(1);
          transition: transform 0.3s;
        }
      }
    }
  }
}
</style>
