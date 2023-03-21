import { writeFile } from 'fs/promises';
import { join } from 'path';
import { POSTS_DIR, __dirname } from './constants.mjs';

const filename = process.argv[2]
  .trim()
  .replace(/([A-Z])/g, '-$1')
  .toLocaleLowerCase();

const isTalk = process.argv[3] && process.argv[3] === '--talk';

const dateFormatter = (date) => {
  const source = new Date(date);
  const year = source.getFullYear();
  const month = String(source.getMonth() + 1).padStart(2, '0');
  const day = String(source.getDate()).padStart(2, '0');

  const h = String(source.getHours()).padStart(2, '0');
  const m = String(source.getMinutes()).padStart(2, '0');
  const s = String(source.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${h}:${m}:${s}`;
};

const template = (name) => `---
title: ${name}
date: ${dateFormatter(Date.now())}
description: ${name}摘要
${isTalk && 'isTalk: true'}
---

${name}摘要

Hello World! :D
`;

(async function setup() {
  try {
    const filePath = join(
      __dirname,
      POSTS_DIR,
      String(new Date().getFullYear()),
      `${filename}.md`
    );
    await writeFile(filePath, template(filename));
    console.log(`${filePath} 创建成功`);
  } catch (error) {
    console.error(`${filePath} 创建失败`, error);
  }
})();
