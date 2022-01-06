import { existsSync } from 'fs';
import { readdir, mkdir, rm, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = '../src/posts';

const template = (filename) =>
  `<template><h1>{{ title }}</h1><mdx-source /><copyright filename="${filename.replace('.mdx', '')}" /></template><script>import Copyright from '../components/Copyright.vue';const MdxSource = require('../posts/${filename}');export default { components: { MdxSource: MdxSource.default, Copyright }, setup() { return { title: MdxSource.title } } };</script>
`;

const compliedDir = join(__dirname, '../src/_posts');

(async function setup() {
  const files = await readdir(join(__dirname, POSTS_DIR));

  if (existsSync(compliedDir)) {
    await rm(compliedDir, { recursive: true, force: true });
  }

  await mkdir(compliedDir);

  for await (const file of files) {
    await writeFile(
      join(compliedDir, `${file.replace('.mdx', '.vue')}`),
      template(file)
    );
  }
})();
