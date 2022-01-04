<template>
  <div class="layout">
    <nav-bar />
    <router-view></router-view>
    <x-footer />
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

<style>
.layout {
  width: var(--size-layout);
  margin: 0 auto;
}
</style>
