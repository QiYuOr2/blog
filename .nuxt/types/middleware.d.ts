import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/xmy/Workspace/blog/node_modules/.pnpm/nuxt@3.0.0_k5dkqej4somlah3wpt6ll7p5ge/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}