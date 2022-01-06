<template>
  <div class="layout">
    <nav-bar />
    <router-view></router-view>
    <div class="layout__footer">
      <x-footer  />
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';

export default {
  components: { NavBar, 'x-footer': Footer },
  setup() {},
};
</script>

<style lang="less">
.layout {
  display: flex;
  flex-direction: column;
  width: var(--size-layout);
  min-height: 100vh;
  margin: 0 auto;

  &__footer {
    margin-top: auto;
  }
}
</style>
