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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
