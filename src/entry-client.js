import { createSSRApp } from 'vue';
import { createWebHistory } from 'vue-router';
import createRouter from './router.js';
import App from './App.vue';
import FectUI from '@fect-ui/vue'
import '@fect-ui/vue/lib/main.css'

const app = createSSRApp(App);

const router = createRouter(createWebHistory());

app.use(router);
app.use(FectUI)

router.isReady().then(() => {
  app.mount('#app');
});
