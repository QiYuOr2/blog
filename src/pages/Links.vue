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
  </div>
</template>

<script>
import { useNav } from '../composables';
import linksConfig from '../links.json';

export default {
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
  padding: 0 1rem;

  --fay-gap: 1.8vh 0.6vw;
}
</style>
