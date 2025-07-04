import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import UnoCSS from 'unocss/astro'
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';
import { remarkImage } from './plugins/remark-image.mjs'
import { remarkMermaid } from './plugins/remark-mermaid.mjs'
import yaml from '@rollup/plugin-yaml';
import react from '@astrojs/react';
import { resolve } from 'node:path'

// https://astro.build/config
export default defineConfig({
  site: "https://blog.qiyuor2.me/",

  integrations: [
    UnoCSS({
      injectReset: true
    }),
    mdx(),
    sitemap(),
    react(),
  ],
  vite: {
    plugins: [
      yaml()
    ],
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
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