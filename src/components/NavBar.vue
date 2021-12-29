<template>
  <header class="nav-bar">
    <div class="nav-bar__info">
      <div>柒宇</div>
      <fe-button size="mini" auto>
        <template #icon>
          <moon />
        </template>
      </fe-button>
    </div>
    <nav class="nav-bar__links">
      <router-link to="/">主页</router-link>
      <router-link to="archives">归档</router-link>
      <router-link to="links">链接</router-link>
      <router-link to="about">关于</router-link>
    </nav>
  </header>
</template>

<script>
import { Moon } from '@fect-ui/vue-icons';

export default {
  components: {
    Moon,
  },
  setup() {},
};
</script>

<style>
.nav-bar {

}

.nav-bar .nav-bar__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
