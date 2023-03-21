<template>
  <fe-button class="back-top" size="mini" auto @click="backTop">
    <template #icon>
      <ChevronUp />
    </template>
  </fe-button>
</template>

<script setup lang="ts">
import { ChevronUp } from '@fect-ui/vue-icons';

const backTop = () => {
  scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style lang="less" scoped>
.back-top {
  position: fixed;
  right: 1.4rem;
  bottom: 4rem;
  z-index: 9999;

  color: rgb(176, 176, 176);
}
</style>
