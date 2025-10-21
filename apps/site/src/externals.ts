import type { postsSchema } from "./collections/posts";

export type ExternalPost = Zod.infer<typeof postsSchema> & { link: string };

export function isExternalPost(post: unknown): post is ExternalPost {
  return (post as any).link !== undefined;
} 

const posts: Array<ExternalPost> = [
  {
    title: 'Live与巡礼与日本旅行流水账',
    description:'',
    date: new Date('2024/09/10 18:36:01'),
    pubDate: new Date('2024/09/10 18:36:01'),
    link: 'https://qiyuro2.notion.site/Live-b37b96eab2034f7d9932b718bac6012b',
    category: '生活',
    tags: ['旅行']
  }
]

function withData(posts: Array<ExternalPost>) {
  return posts.map(post => ({ ...post, data: { ...post } }));

}

export const externalPosts = withData(posts);