<template>
  <link :href="FONT_LINK" />
  <link rel="stylesheet" :href="HETI_LINK" />
  <Layout />
</template>

<script>
import { posts as source } from './common/utils';
import { injectKey } from './common/constants';
import Layout from './components/Layout.vue';
import Link from './components/Link.vue';
import { provide } from 'vue';

const FONT_LINK = 'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap';
const HETI_LINK = '//unpkg.com/heti/umd/heti.min.css';

const posts = source.sort(
  (pre, cur) => new Date(cur.date).getTime() - new Date(pre.date).getTime()
);

export default {
  components: {
    Layout,
  },
  setup() {
    const customComponents = {
      a: Link,
    };

    provide(injectKey.POSTS, () => posts);

    return { FONT_LINK, HETI_LINK, customComponents };
  },
};
</script>

<style lang="less">
@import url('./common/lib/light.less');
@import url('./common/lib/dark.less');

:root {
  --color-primary-light2: #edfef9bf;
  --color-primary-light: #bbf0de;
  --color-gray: #999;
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
  --size-text-navbar: 1.2rem;

  --shadow-hover: 0 0 10px 1px var(--color-shadow);

  --font-family-monospace: 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New',
    monospace;

  --article-blockquote-bg: var(--color-primary-light2);
  --article-blockquote-mark: var(--color-primary);

  /* 覆盖fect color */
  --success-default: var(--color-primary) !important;
  --success-light: var(--color-primary) !important;
  --primary-selection: var(--color-selection) !important;
  --primary-foreground: var(--color-text) !important;
  --fect-code-color: #f39c12 !important;
  --fect-link-color: #3498db !important;

  &.dark-theme {
    --color-primary: #edfcf7;
    --color-hover: #1abc9cbf;
    --color-text: hsla(0, 0%, 100%, 0.87);
    --color-text-underline: #edfcf74f;
    --color-selection: var(--color-select-dark);

    --article-blockquote-bg: #004a439f;
    --article-blockquote-mark: var(--color-primary-dark);
  }
}

/* @media (prefers-color-scheme: dark) {
  :root {
    --color-text: hsla(0, 0%, 100%, 0.87);
  }
} */

html {
  font-size: 16px;
  font-family: PT Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, PingFang SC,
    Hiragino Sans GB, Noto Sans CJK SC, Microsoft YaHei, Noto Sans, Segoe UI, Roboto, Helvetica Neue,
    Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
    Noto Color Emoji;
}

ul {
  margin-left: 0;
  margin-right: 0;
  padding: 0;
}

ul li {
  list-style: none;

  margin-bottom: unset;
  font-size: unset;
  line-height: unset;
}

ul li::before {
  display: none !important;
}

h1 {
  margin-bottom: 0 !important;
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
@media screen and (min-width: 1920px) {
  :root {
    --size-layout: 54rem;
  }
}
@media screen and (min-width: 1280px) and (max-width: 1920px) {
  :root {
    --size-layout: 52rem;
  }
}
@media screen and (min-width: 900px) and (max-width: 1280px) {
  :root {
    --size-layout: 48rem;
  }
}
@media screen and (min-width: 650px) and (max-width: 900px) {
  :root {
    --size-layout: 34rem;
  }
}
@media screen and (min-width: 300px) and (max-width: 650px) {
  :root {
    --size-text-navbar: 0.8rem;
    --size-layout: 92%;
    --size-text-title: 1.25rem;
    --size-text-main: 1rem;
  }
}
@media screen and (max-width: 300px) {
  :root {
    --size-layout: 96%;
    --size-text-title: 1.25rem;
    --size-text-main: 1rem;
  }
}
</style>
