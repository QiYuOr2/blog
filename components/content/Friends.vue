<template>
  <div class="links">
    <fe-grid-group :gap="2">
      <fe-grid v-for="(f, i) in friends" :key="i" :xs="24" :sm="12" :md="8">
        <fe-card style="cursor: pointer" hoverable @click="toOut(f.link)">
          <fe-user :name="f.name" :src="f.avatar" :alt-text="f.link">
            {{ f.desc }}
          </fe-user>
        </fe-card>
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script setup lang="ts">
import linksConfig from '../../link';

const friends = linksConfig.friends;

const toOut = (href: string) => {
  open(href);
};
</script>

<style lang="less" scoped>
.links {
  display: flex;
  flex-direction: column;
  flex: 1;
  --fect-gap: 1.8vh 0.6vw;
  .fect-grid__group {
    padding: 0;
  }
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
