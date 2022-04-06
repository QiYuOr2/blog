import { createSSRApp } from 'vue';
import { createMemoryHistory } from 'vue-router';
import createRouter from './router.js';
import App from './App.vue';
import FectUI from '@fect-ui/vue';
import '@fect-ui/vue/lib/main.css';
import '@fect-ui/themes/main.css';

export default function () {
  const app = createSSRApp(App);
  const router = createRouter(createMemoryHistory());

  app.use(router);
  app.use(FectUI);

  return {
    app,
    router,
  };
}
