<script lang="ts" setup>
import MdiGithub from '~icons/mdi/github';
import MdiRss from '~icons/mdi/rss';
</script>

<template>
  <header class="header">
    <a class="header--logo" href="/blog/">
      <Image src="https://avatars.githubusercontent.com/u/48339849" width="32px" height="32px" alt="avatar" round />
      <div ml-3>@柒宇</div>
    </a>
      <nav class="header--nav">
      <a href="/blog/rss.xml">
        <MdiRss text-2xl />
      </a>
      <a href="https://github.com/QiYuOr2">
        <MdiGithub text-2xl />
      </a>
    </nav>
  </header>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem 2rem;

  &--logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #000000d1;

    position: fixed;
    left: 1.5rem;
    top: 1.5rem;

  }

  &--nav {
    display: flex;
    gap: 1.4rem;
    margin-left: auto;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000000d1;
    }
  }
}

@media screen and (max-width: 1024px) {
  .header {
    &--logo {
      position: relative;
      left: 0;
      top: 0;
    }
  }
}
</style>