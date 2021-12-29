import { createRouter } from 'vue-router';

const routes = [
  { path: '/', name: 'list', component: () => import('./pages/List.vue') },
  { path: '/posts', name: 'article', component: () => import('./pages/Article.vue') },
  { path: '/about', name: 'about', component: () => import('./pages/About.vue') },
  { path: '/archives', name: 'archives', component: () => import('./pages/Archives.vue') },
  { path: '/links', name: 'links', component: () => import('./pages/Links.vue') },
];

export default function (history) {
  return createRouter({
    history,
    routes,
  });
}
