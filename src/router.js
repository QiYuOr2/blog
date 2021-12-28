import { createRouter } from 'vue-router';

const routes = [
  { path: '/', name: 'list', component: () => import('./pages/List.vue') },
  { path: '/posts', name: 'article', component: () => import('./pages/Article.vue') },
];

export default function (history) {
  return createRouter({
    history,
    routes,
  });
}
