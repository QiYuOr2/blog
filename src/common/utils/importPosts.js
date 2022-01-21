import { importAll } from './importAll';
import { omit } from './omit';

/**
 * @param {*} dir
 * @param {'asc'|'desc'} order
 * @return {Array}
 */
export function importPosts(dir, order = 'desc') {
  return importAll(dir, true)
    .map(({ module, file }) => ({
      ...omit('default', module),
      to: `/posts/${file.replace(/.\/\d{4}\/|.mdx/g, '')}`,
    }))
    .sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return order === 'asc' ? aTime - bTime : bTime - aTime;
    });
}
