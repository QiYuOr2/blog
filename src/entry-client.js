import { createSSRApp } from 'vue';
import { createWebHistory } from 'vue-router';
import createRouter from './router.js';
import App from './App.vue';

const app = createSSRApp(App);

const router = createRouter(createWebHistory());

app.use(router);

router.isReady().then(() => {
  app.mount('#app');
});
