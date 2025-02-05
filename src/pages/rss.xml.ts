import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { sortByDate, visibleFilter } from "../collections/posts";
import { getCollection } from "astro:content";
import { BASE_URL } from "../constants";

export async function GET(ctx) {
  const posts = await getCollection("posts");

  return rss({
    title: "@柒宇",
    description: "柒宇的个人博客",
    site: ctx.site,
    items:  posts
      .filter(visibleFilter)
      .sort(sortByDate)
      .map(item => ({ 
        ...item.data, 
        link: `${BASE_URL}/${item.id}`, 
        content: item.rendered?.html 
      })),
    customData: `<language>zh-CN</language>`,
  });
}
