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
import { inject } from 'vue';
import { injectKey } from '../common/constants';
import { useNav } from '../composables';

export default {
  setup() {
    const { toDetail } = useNav();

    const getPosts = inject(injectKey.POSTS, () => []);

    return {
      posts: getPosts(),
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
@media screen and (min-width: 300px) and (max-width: 650px) {
  .archives-item {
    flex-direction: column;
    align-items: flex-start;

    margin-bottom: 1rem;

    &__date {
      color: var(--color-gray);
      margin-bottom: 4px;
    }

    &__title {
      width: 100% !important;
    }
  }
}
</style>
