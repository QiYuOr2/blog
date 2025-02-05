import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://qiyuor2.github.io",
  base: "blog",

  integrations: [
    vue({ appEntrypoint: "/src/pages/_app" }),
    mdx()
  ],
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});
