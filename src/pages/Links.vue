<template>
  <div class="links">
    <fe-grid-group :gap="2">
      <fe-grid v-for="(f, i) in friends" :xs="24" :sm="12" :md="8" :key="i">
        <fe-card @click="toOut(f.link)" style="cursor: pointer" hoverable>
          <fe-user :name="f.name" :src="f.avatar" :alt-text="f.link">
            {{ f.desc }}
          </fe-user>
        </fe-card>
      </fe-grid>
    </fe-grid-group>
    <hide class="links__hide" tips="试验区，暂未开放" />
  </div>
</template>

<script>
import Hide from '../components/Hide.vue';
import { useNav } from '../composables';
import linksConfig from '../links.json';

export default {
  components: { Hide },
  setup() {
    const { toOut } = useNav();
    return {
      friends: linksConfig.friends,
      toOut,
    };
  },
};
</script>

<style lang="less">
.links {
  display: flex;
  flex-direction: column;

  flex: 1;
  padding: 0 1rem;

  --fay-gap: 1.8vh 0.6vw;

  &__hide {
    flex: 1;
    margin-top: 2rem;
    position: relative;
    .fect-card {
      position: absolute;
      top: 0;
      bottom: 0;
      &__content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    }
  }
}
</style>
