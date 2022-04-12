import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
// import VueJsx from '@vitejs/plugin-vue-jsx';
import Md from 'vite-plugin-md';
// import remarkFrontmatter from 'remark-frontmatter';
// import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter';
// import highlight from 'rehype-highlight';

export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //     '~': process.cwd(),
  //   },
  // },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Md({
      headEnabled: true,
    }),
  ],
});
