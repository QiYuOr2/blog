import { existsSync } from 'fs';
import { readdir, mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { POSTS_DIR, __dirname } from './constants.mjs';

const template = (filename) =>
  `<template><h1>{{ title }}</h1><mdx-source /><copyright filename="${filename
    .slice(4)
    .replace(
      '.mdx',
      ''
    )}" /></template><script>import Copyright from '../components/Copyright.vue';const MdxSource = require('../posts/${filename}');export default { components: { MdxSource: MdxSource.default, Copyright }, setup() { return { title: MdxSource.title } } };</script>
`;

const compiledDir = join(__dirname, '../src/_posts');

(async function setup() {
  const postsDirs = (await readdir(join(__dirname, POSTS_DIR))).map((dir) =>
    join(POSTS_DIR, dir)
  );

  const files = [];

  for await (const postsDir of postsDirs) {
    const filenames = (await readdir(join(__dirname, postsDir))).map((f) =>
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
      join(compiledDir, `${file.slice(4).replace('.mdx', '.vue')}`),
      template(file)
    );
  }
})();
