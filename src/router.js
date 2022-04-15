import { createRouter } from 'vue-router';
import { posts } from './common/utils';

import List from './pages/List.vue';
import Article from './pages/Article.vue';
import About from './pages/About.vue';
import Archives from './pages/Archives.vue';
import Talk from './pages/Talk.vue';

const routes = [
  { path: '/', name: 'list', component: List },
  {
    path: '/posts',
    name: 'article',
    component: Article,
    children: posts,
  },
  {
    path: '/talk',
    name: 'talk',
    component: Talk,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/archives',
    name: 'archives',
    component: Archives,
  },
];

export default function (history) {
  return createRouter({
    history,
    routes,
  });
}
