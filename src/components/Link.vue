<template>
  <a class="custom-link">
    <icon-link class="custom-link__icon" size="12" />
    <slot></slot>
  </a>
</template>

<script>
import { Link } from '@fect-ui/vue-icons';

export default {
  components: { 'icon-link': Link },
};
</script>

<style lang="less">
.custom-link {
  display: inline-block;
  align-items: center;
  line-height: 1.5rem;
  margin: 0 5px;

  vertical-align: middle;
  transform: translateY(-1px);
  &__icon {
    margin-right: 2px;
  }

  &:hover {
    padding-block-end: 0 !important;
    border-block-end: 0 !important;
    text-decoration: underline !important;
  }
}
</style>
