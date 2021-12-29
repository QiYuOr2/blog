<template>
  <MDXProvider>
    <Layout />
  </MDXProvider>
</template>

<script>
import { MDXProvider } from '@mdx-js/vue';
import Layout from './components/Layout.vue';

export default {
  components: {
    MDXProvider,
    Layout,
  },
};
</script>

<style>
:root {
  --color-text: #121212;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text: hsla(0, 0%, 100%, 0.87);
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: var(--color-text);
}
</style>
