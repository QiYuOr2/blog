import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/Users/xmy/Workspace/blog/node_modules/.pnpm/nuxt@3.0.0_k5dkqej4somlah3wpt6ll7p5ge/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}