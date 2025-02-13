import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  site: "https://qiyuor2.github.io/blog/",
  base: "blog",

  integrations: [
    vue({ appEntrypoint: "/src/pages/_app" }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [
      Icons({
        compiler: 'vue3'
      }),
    ],
  },
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});