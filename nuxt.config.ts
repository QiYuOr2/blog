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
      script: [
        { type: 'module', src: 'https://unpkg.com/giscus?module' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;900&display=swap' }
      ]
    }
  },
  modules: [
    '@nuxt/content'
  ],
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai'
      }
    }
  },
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
  },
  build: {
    transpile: ['@fect-ui/vue']
  }
});
