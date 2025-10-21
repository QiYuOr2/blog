import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { sortByDate, visibleFilter } from "@/collections/posts";
import { getCollection } from "astro:content";
import { BASE_URL } from "@/constants";
import { externalPosts, isExternalPost } from "@/externals";

export async function GET() {
  const posts = await getCollection("posts");

  return rss({
    title: "@柒宇",
    description: "柒宇的个人博客",
    site: BASE_URL,
    items:  [...posts, ...externalPosts]
      .filter(visibleFilter)
      .sort(sortByDate)
      .map(item => isExternalPost(item) ? 
          ({
            ...item.data, 
            link: item.link,
            content: `<a href="${item.link}">${item.data.title}</a>`
          }) 
        : 
          ({ 
            ...item.data, 
            link: `${BASE_URL}/${item.id}`, 
            content: item.rendered?.html 
          })
      ),
    customData: `<language>zh-CN</language><follow_challenge>
    <feedId>124099030538126336</feedId>
    <userId>69259090597208064</userId>
</follow_challenge>`,
  });
}
