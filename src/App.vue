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

<style lang="less">
:root {
  /* #edfcf7 */
  --color-primary-light: #bbf0de;
  /* #8de3c9 */
  /* #63d6b7 */
  /* #3cc9a9 */
  --color-primary: #1abc9c;
  /* #0e9680 */
  /* #047062 */
  --color-primary-dark: #004a43;
  /* #002421 */

  --color-select-light: #acd2fe;
  --color-select-dark: #304b6a;

  --color-text: #002421;
  --color-text-hover: #002421af;
  --color-text-underline: #0000000f;
  --color-hover: #edfcf7;
  --color-shadow: #0000002f;
  --color-selection: var(--color-select-light);

  --size-radius: 4px;
  --size-layout: 48rem;

  --size-text-remark: 0.8rem;
  --size-text-title: 1.5rem;
  --size-text-main: 1.15rem;

  --shadow-hover: 0 0 10px 1px var(--color-shadow);

  --font-family-monospace: 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono',
    'Courier New', monospace;

  /* 覆盖fect color */
  --success-default: var(--color-primary) !important;
  --success-light: var(--color-primary) !important;
  --primary-selection: var(--color-selection) !important;
  --primary-foreground: var(--color-text) !important;

  &.dark-theme {
    --color-primary: #edfcf7;
    --color-hover: #1abc9cbf;
    --color-text-underline: #edfcf74f;
    --color-selection: var(--color-select-dark);
  }
}

/* @media (prefers-color-scheme: dark) {
  :root {
    --color-text: hsla(0, 0%, 100%, 0.87);
  }
} */

html {
  font-size: 16px;
  font-family: PT Sans, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, PingFang SC, Hiragino Sans GB, Noto Sans CJK SC,
    Microsoft YaHei, Noto Sans, Segoe UI, Roboto, Helvetica Neue, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
    Noto Color Emoji;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

/* 单行显示，超出部分显示为省略号 */
.oneline {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 适配
@media screen and (min-width: 1200px) {
  :root {
    --size-layout: 48rem;
  }
}
/* 当页面宽度大于960px小于1200px */
@media screen and (min-width: 960px) and (max-width: 1200px) {
  :root {
    --size-layout: 48rem;
  }
}
/* 当页面宽度大于600px小于960px */
@media screen and (min-width: 600px) and (max-width: 960px) {
  :root {
    --size-layout: 34rem;
  }
}
/* 当页面宽度大于300px小于600px */
@media screen and (min-width: 300px) and (max-width: 600px) {
  :root {
    --size-layout: 92%;
    --size-text-title: 1.25rem;
    --size-text-main: 1rem;
  }
}
/* 当页面宽度小于300px*/
@media screen and (max-width: 300px) {
  :root {
    --size-layout: 96%;
    --size-text-title: 1.25rem;
    --size-text-main: 1rem;
  }
}
</style>
