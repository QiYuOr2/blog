# 个人博客

搭建工具：[Astro](https://astro.build/), [Fect UI](https://www.fect-org.com/), [Vercel](https://vercel.com/)

Nuxt.js 会在页面注入一段`window.__nuxt__ = ...`这段代码体积非常大，很影响加载时间，并且未找到合适的解决方案，因此更换了Astro


## Astro 注意事项

Markdown 的 frontmatter 中需要有`pubDate`、`title`、`description`才能通过`await pagesGlobToRssItems(import.meta.glob('./posts/**/*.md'))`解析创建 rss