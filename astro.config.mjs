import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [vue({ appEntrypoint: '/src/pages/_app' })],
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  },
});
