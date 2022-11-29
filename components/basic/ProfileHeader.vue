<template>
  <header class="profile-header container">
    <NuxtLink class="content" to="/">
      <fe-avatar src="https://avatars.githubusercontent.com/u/48339849" size="medium" />
      <h1>柒宇的博客</h1>
    </NuxtLink>

    <NuxtLink class="about" to="/about">
      <User />
    </NuxtLink>
  </header>
</template>

<script setup lang="ts">
import { User } from '@fect-ui/vue-icons';

</script>

<style lang="less" scoped>
.profile-header {
  display: flex;
  align-items: center;
  padding: 2rem;

  .content {
    display: flex;
    align-items: center;

    h1 {
      margin-left: 1rem;
      margin-bottom: 0;
      font-size: 1.8rem;
      color: #000;
    }
  }

  .about {
    margin-left: auto;
    margin-right: 1rem;
    color: #000;
  }
}
</style>
