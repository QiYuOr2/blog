import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function get() {
  return rss({
    title: '@柒宇',
    description: '柒宇的个人博客',
    site: 'https://blog.qiyuor2.cn',
    items: await pagesGlobToRssItems(import.meta.glob('./posts/**/*.md')),
    customData: `<language>zh-CN</language>`,
  });
}