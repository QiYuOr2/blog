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

// https://astro.build/config
export default defineConfig({
  site: "https://qiyuor2.github.io/blog/",
  base: "blog",

  integrations: [
    AutoImport({ imports: ['vue'], dts: true }),
    vue({ appEntrypoint: "/src/pages/_app" }),
    UnoCSS({
      injectReset: true
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [
      Components(),
      Icons({
        compiler: 'vue3'
      }),
    ],
  },
  markdown: {
    remarkPlugins: [remarkReadingTime/*, remarkImage*/],
    shikiConfig: {
      theme: "vitesse-light",
    },
  },
});