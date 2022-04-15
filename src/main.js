import { createSSRApp } from 'vue';
import { createMemoryHistory, createWebHistory } from 'vue-router';
import createRouter from './router';
import { createHead } from '@vueuse/head';
import Hide from './components/Hide.vue';
import App from './App.vue';
import FectUI from '@fect-ui/vue';
import '@fect-ui/vue/lib/main.css';
import '@fect-ui/themes/main.css';

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
/**
 * @param {'memory'|undefined} routerType
 */
export function createApp(routerType = '') {
  const app = createSSRApp(App);
  const router = createRouter(routerType === 'memory' ? createMemoryHistory() : createWebHistory());

  const head = createHead();

  app.use(head);
  app.use(router);
  app.use(FectUI);
  app.component('Hide', Hide);

  return { app, router };
}
