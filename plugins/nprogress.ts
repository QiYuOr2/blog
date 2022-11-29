import NProgress from 'nprogress';

export default defineNuxtPlugin((app) => {
  app.hooks.hook('page:start', () => {
    NProgress.start();
  });
  app.hooks.hook('page:finish', () => {
    NProgress.done();
  });
});
