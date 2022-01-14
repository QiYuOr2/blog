<template>
  <p>
    <fe-card class="hide">
      {{ tips }}
      <slot v-if="false"></slot>
    </fe-card>
  </p>
</template>

<script>
export default {
  props: {
    tips: {
      type: String,
      default: '作者隐藏了这段内容',
    },
  },
};
</script>

<style lang="less">
.hide {
  background: var(--accents-2);
}
</style>
