<script setup lang="ts">
const Colors = {
  Primary: '#58b99d'
};

const cssVars = {
  linkColor: Colors.Primary,
  FectLinkColor: Colors.Primary,
  linkHoverColor: Colors.Primary,
  FectCodeColor: '#5a5a5f'
};
</script>

<template>
  <Header />
  <main container mx-auto px-7 overflow-hidden>
    <div prose mx-auto>
      <slot />
    </div>
  </main>
  <Footer />
</template>

<style>
main {
  min-height: calc(100vh - var(--h-header) - var(--h-footer));
}
</style>
