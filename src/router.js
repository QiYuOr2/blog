import { createRouter } from 'vue-router';
import { importAll } from './common/utils';

import List from './pages/List.vue';
import Article from './pages/Article.vue';
import About from './pages/About.vue';
import Archives from './pages/Archives.vue';
import Links from './pages/Links.vue';

const posts = importAll(require.context('./_posts', true, /\.vue$/), true).map(
  ({ module, file }) => {
    const name = file.replace(/.\/|.vue/g, '');
    return { path: `/posts/${name}`, name, component: module.default };
  }
);

const routes = [
  { path: '/', name: 'list', component: List },
  {
    path: '/posts',
    name: 'article',
    component: Article,
    children: posts,
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
