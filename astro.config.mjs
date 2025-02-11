import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://qiyuor2.github.io/blog/",
  base: "blog",

  integrations: [
    vue({ appEntrypoint: "/src/pages/_app" }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});