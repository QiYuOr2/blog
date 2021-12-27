import { createRouter } from 'vue-router';

const routes = [
  { path: '/user', component: () => import('./components/MyUser.vue') },
  { path: '/hello', component: () => import('./components/HelloWorld.vue') },
];

export default function (history) {
  return createRouter({
    history,
    routes,
  });
}
