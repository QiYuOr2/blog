import { createRouter } from 'vue-router';
import { posts } from './common/utils';

import List from './pages/List.vue';
import Article from './pages/Article.vue';
import About from './pages/About.vue';
import Archives from './pages/Archives.vue';
import Links from './pages/Links.vue';
import Talk from './pages/Talk.vue';

console.log(posts)

const routes = [
  { path: '/', name: 'list', component: List },
  {
    path: '/posts',
    name: 'article',
    component: Article,
    children: /* posts */ [],
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
  {
    path: '/links',
    name: 'links',
    component: Links,
  },
];

export default function (history) {
  return createRouter({
    history,
    routes,
  });
}
