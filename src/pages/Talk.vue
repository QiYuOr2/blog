<template>
  <div class="talk">
    <fe-grid-group :gap="2">
      <fe-grid v-for="(p, i) in posts" :xs="24" :sm="12" :md="8" :key="i">
        <fe-card
          class="card"
          @click="toDetail(p.to)"
          style="cursor: pointer"
          hoverable
        >
          <div v-if="p.cover" class="card__cover">
            <fe-image :src="p.cover" />
          </div>
          <div class="card__desc">
            <p class="title">{{ p.title }}</p>
            <p class="summary">{{ p.summary }}</p>
          </div>
        </fe-card>
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script>
import { inject } from 'vue';
import { useNav } from '../composables';
import { injectKey } from '../common/constants';

export default {
  setup() {
    const { toDetail } = useNav();

    const getPosts = inject(injectKey.POSTS, () => []);

    return {
      posts: getPosts().filter((item) => item.isTalk),
      toDetail,
    };
  },
};
</script>

<style lang="less" scoped>
.talk {
  /deep/ .fect-card {
    &__content {
      height: 100%;
      padding: 0;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  /deep/ .fect-image {
    border-top-left-radius: var(--fect-radius);
    border-top-right-radius: var(--fect-radius);
  }

  .card {
    &__desc {
      margin-top: 0;
      padding: 0.6rem 1rem;
      p {
        margin: 0;
        &.summary {
          margin-top: 0.2rem;
          font-size: var(--size-text-remark);
          color: var(--accents-6);
        }
      }
    }
  }
}
</style>
