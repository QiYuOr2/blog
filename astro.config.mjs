import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://qiyuor2.github.io',
  base: 'blog',

  integrations: [vue({ appEntrypoint: '/src/pages/_app' })],
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  },
});
