<template>
  <link :href="FONT_LINK" />
  <link rel="stylesheet" :href="HETI_LINK" />
  <MDXProvider>
    <Layout />
  </MDXProvider>
</template>

<script>
import { MDXProvider } from '@mdx-js/vue';
import Layout from './components/Layout.vue';

const FONT_LINK =
  'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap';
const HETI_LINK = '//unpkg.com/heti/umd/heti.min.css';

export default {
  components: {
    MDXProvider,
    Layout,
  },
  setup() {
    return { FONT_LINK, HETI_LINK };
  },
};
</script>

<style>
:root {
  /* #edfcf7 */
  /* #bbf0de */
  /* #8de3c9 */
  /* #63d6b7 */
  /* #3cc9a9 */
  --color-primary: #1abc9c;
  /* #0e9680 */
  /* #047062 */
  /* #004a43 */
  /* #002421 */

  --color-text: #002421;
  --color-text-hover: #002421af;
  --color-text-underline: #0000000f;
  --color-hover: #edfcf7;
  --color-shadow: #0000002f;

  --size-radius: 4px;

  --shadow-hover: 0 0 10px 1px var(--color-shadow);

  /* 覆盖fect color */
  --success-default: var(--color-primary) !important;
  --success-light: var(--color-primary) !important;
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
