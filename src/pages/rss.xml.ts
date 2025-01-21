import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function get() {
  const posts = Object.values(import.meta.glob("./posts/**/*.md", { eager: true }));

  const getContent = (post: any) => {
    const content = (posts.find((item: any) => item.frontmatter.title === post.title) as any).compiledContent();
    return { ...post, content };
  };

  function sortRssItemByPubDate(pre: { pubDate: Date }, current: { pubDate: Date }) {
    return current.pubDate.getTime() - pre.pubDate.getTime();
  }

  return rss({
    title: "@柒宇",
    description: "柒宇的个人博客",
    site: "https://qiyuor2.github.io/blog/",
    items: (await pagesGlobToRssItems(import.meta.glob("./posts/**/*.md"))).sort(sortRssItemByPubDate).map(getContent),
    customData: `<language>zh-CN</language>`,
  });
}
