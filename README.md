# 个人博客

搭建工具：[Astro](https://astro.build/), [Fect UI](https://github.com/fect-org/fect), [Vercel](https://vercel.com/)


## Astro 注意事项

Markdown 的 frontmatter 中需要有`pubDate`、`title`、`description`才能通过`await pagesGlobToRssItems(import.meta.glob('./posts/**/*.md'))`解析创建 rss