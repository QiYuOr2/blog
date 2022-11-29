<template>
  <div class="default-layout">
    <BasicProfileHeader />
    <main class="container">
      <slot />
    </main>
    <BasicFooter />
  </div>
</template>

<style lang="less" scoped>
.default-layout {
  main {
    min-height: calc(100vh - var(--h-header) - var(--h-footer));
    padding: 0 1.4rem;
  }
}
</style>
