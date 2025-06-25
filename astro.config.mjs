import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import Icons from 'unplugin-icons/vite'
import UnoCSS from 'unocss/astro'
import AutoImport from 'unplugin-auto-import/astro'
import Components from 'unplugin-vue-components/vite'
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';
import { remarkImage } from './plugins/remark-image.mjs'
import { remarkMermaid } from './plugins/remark-mermaid.mjs'
import yaml from '@rollup/plugin-yaml';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: "https://blog.qiyuor2.me/",

  integrations: [
    AutoImport({ imports: ['vue'], dts: true }),
    vue({ appEntrypoint: "/src/pages/_app" }),
    UnoCSS({
      injectReset: true
    }),
    mdx(),
    sitemap(),
    react({
      include: ['**/react/*'],
    }),
  ],
  vite: {
    plugins: [
      Components(),
      Icons({
        compiler: 'vue3'
      }),
      yaml()
    ],
  },
  markdown: {
    lazyLoad: false,
    remarkPlugins: [remarkReadingTime, remarkImage, remarkMermaid],
    shikiConfig: {
      theme: "vitesse-light",
    },
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ["mermaid"]
    }
  },
});