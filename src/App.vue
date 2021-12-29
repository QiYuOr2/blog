<template>
  <link :href="FONT_LINK" />
  <MDXProvider>
    <Layout />
  </MDXProvider>
</template>

<script>
import { MDXProvider } from '@mdx-js/vue';
import Layout from './components/Layout.vue';

const FONT_LINK =
  'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap';

export default {
  components: {
    MDXProvider,
    Layout,
  },
  setup() {
    return { FONT_LINK };
  },
};
</script>

<style>
:root {
  --color-text: #121212;
  --color-text-hover: #121212af;
  --color-hover: #0000000f;
  --color-shadow: #0000002f;

  --size-radius: 4px;

  --shadow-hover: 0 0 10px 1px var(--color-shadow);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text: hsla(0, 0%, 100%, 0.87);
  }
}

html {
  font-size: 16px;
  font-family: PT Sans, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, PingFang SC, Hiragino Sans GB, Noto Sans CJK SC,
    Microsoft YaHei, Noto Sans, Segoe UI, Roboto, Helvetica Neue, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
    Noto Color Emoji;
  color: var(--color-text);
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
</style>
