import { createStyleImportPlugin } from 'vite-plugin-style-import';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ComponentResolver } from 'unplugin-vue-components/types';

function FectUiResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(Fe[A-Z]|fe-[a-z])/)) {
        return {
          name: name.replace(/^(Fe|fe-)/, ''),
          from: '@fect-ui/vue'
        };
      }
    }
  };
}

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'description', content: '柒宇的个人博客' }
      ],
      script: [
        { type: 'module', src: 'https://unpkg.com/giscus?module', defer: true },
        { src: 'https://staticfile.qnssl.com/webfont/1.6.16/webfontloader.js', defer: true }
      ]
    }
  },
  build: {
    transpile: ['@fect-ui/vue']
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai'
      }
    }
  },
  hooks: {
  },
  modules: [
    '@nuxt/content'
  ],
  vite: {
    plugins: [
      AutoImport({
        resolvers: [FectUiResolver()]
      }),
      Components({
        resolvers: [FectUiResolver()]
      }),
      createStyleImportPlugin({
        libs: [
          {
            libraryName: '@fect-ui/vue',
            esModule: true,
            resolveStyle: (name) => {
              return `@fect-ui/vue/dist/esm/${name}/style`;
            }
          }
        ]
      })
    ]
  }
});
