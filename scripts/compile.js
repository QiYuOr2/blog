const { existsSync } = require('fs');
const { readdir, mkdir, rm, writeFile } = require('fs/promises');
const { join } = require('path');

const POSTS_DIR = '../src/posts';

const template = filename =>
  `<template><h1>{{ title }}</h1><mdx-source /><copyright filename="${filename
    .slice(4)
    .replace(
      '.md',
      ''
    )}" /></template><script>import Copyright from '../components/Copyright.vue';const MdxSource = require('../posts/${filename}');export default { components: { MdxSource: MdxSource, Copyright }, setup() { return { title: MdxSource.title } } };</script>
`;

const compiledDir = join(__dirname, '../src/_posts');

(async function setup() {
  const postsDirs = (await readdir(join(__dirname, POSTS_DIR))).map(dir =>
    join(POSTS_DIR, dir)
  );

  const files = [];

  for await (const postsDir of postsDirs) {
    const filenames = (await readdir(join(__dirname, postsDir))).map(f =>
      join(postsDir.replace(`${POSTS_DIR}/`, ''), f)
    );
    files.push(filenames);
  }

  if (existsSync(compiledDir)) {
    await rm(compiledDir, { recursive: true, force: true });
  }

  await mkdir(compiledDir);

  const willCompileFiles = files.flat();
  for await (const file of willCompileFiles) {
    await writeFile(
      join(
        compiledDir,
        `${file.replace(/.*\\src\\posts\\[0-9]{4}/, '').replace('.md', '.vue')}`
      ),
      template(file)
    );
  }
})();
