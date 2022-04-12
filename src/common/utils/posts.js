const formatter = (modules) => {
  console.log(modules)
  return Object.keys(modules).map((modulePath) => {
    const page = modules[modulePath];

    return {
      title: page.title,
      component: page.default,
    };
  });
};

export const posts = formatter(import.meta.globEager('../../posts/**/*.md'));
