import { createSSRApp } from 'vue';
import { createWebHistory } from 'vue-router';
import createRouter from './router.js';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import FectUI from '@fect-ui/vue';
import '@fect-ui/vue/lib/main.css';
import '@fect-ui/themes/main.css';

const app = createSSRApp(App);
const router = createRouter(createWebHistory());
const head = createHead();

console.log(head)

app.use(head);
app.use(router);
app.use(FectUI);

router.isReady().then(() => {
  app.mount('#app');
});
