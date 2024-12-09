import { readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { VFile } from 'vfile';
import { visit } from 'unist-util-visit';
import { remove } from 'unist-util-remove';
import yaml from 'yaml';
import { Feed } from 'feed';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = '../src/posts';
const BASE_URL = 'https://qiyuor2.github.io/blog/posts/';

function compileFrontmatter() {
  return (tree, file) => {
    visit(tree, 'yaml', (node) => {
      file.data.frontmatter = yaml.parse(node.value);
    });
    remove(tree, 'yaml');
  };
}

function compileMdx(code) {
  return new Promise((resolve, reject) => {
    const p = createProcessor({
      remarkPlugins: [remarkFrontmatter, compileFrontmatter],
    });
    p.process(new VFile(code), (err, file) => {
      if (err) {
        reject(err);
      }
      resolve(file);
    });
  });
}

(async function setup() {
  const years = await readdir(join(__dirname, POSTS_DIR));

  const feed = new Feed({
    title: '柒宇的博客',
    description: '柒宇的博客',
    link: 'https://qiyuor2.github.io/blog/',
    image: 'https://qiyuor2.github.io/blog/favicon.ico',
    copyright: 'QIYUOR2 © 2021',
    author: {
      name: '柒宇',
      email: 'mengyu6498@icloud.com',
      link: 'https://github.com/QiYuOr2',
    },
  });

  for await (const y of years) {
    const files = await readdir(join(__dirname, POSTS_DIR, y));
    for await (const file of files) {
      const fileContent = await readFile(join(__dirname, POSTS_DIR, y, file), {
        encoding: 'utf-8',
      });

      const frontmatter = yaml.parse(fileContent.split('---\n')[1]);

      feed.addItem({
        title: frontmatter.title,
        description: frontmatter.summary,
        date: new Date(frontmatter.date),
        link: `${BASE_URL}${file.replace('.md', '')}`,
      });
    }

    await writeFile(join(__dirname, '../dist/client/atom.xml'), feed.atom1());
    await writeFile(join(__dirname, '../dist/client/rss.xml'), feed.rss2());
  }
})();
