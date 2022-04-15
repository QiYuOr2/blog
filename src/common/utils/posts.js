const formatter = (modules) => {
  // console.log(modules);
  return Object.keys(modules).map((modulePath) => {
    const page = modules[modulePath]
    const name = modulePath.match(/[0-9]\/(.*)*.md$/)[1]
    // console.log(modulePath.match(/\.\.\/\.\.\/(.*)*.md$/)[1]);

    return {
      title: page.title,
      name,
      path: `/posts/${name}`,
      component: page.default,
      date: page.date,
      summary: page.summary,
      isTalk: page.isTalk,
    }
  })
}

export const posts = formatter(import.meta.globEager('../../posts/**/*.md'))
