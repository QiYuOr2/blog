import { z, type CollectionEntry } from 'astro:content';

export const postsSchema = z.object({
  title: z.string(),
  description: z.string(),
  draft: z.boolean().optional(),
  date: z.coerce.date(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).optional(),
})

export function date(post: CollectionEntry<'posts'>) {
  return new Date(post.data.date).toLocaleString('zh-CN');
}

export function visibleFilter(post: CollectionEntry<'posts'>) {
  return !post.data.draft;
}

export function sortByDate(pre: CollectionEntry<'posts'>, current: CollectionEntry<'posts'>) {
  return new Date(current.data.date).getTime() - new Date(pre.data.date).getTime();
}

export function getPostCreatedYear(post: CollectionEntry<'posts'>) {
  return date(post).split(" ")[0].split("/").slice(0, 1)[0];
}

export function postURL(post: CollectionEntry<'posts'>) {
  return `${import.meta.env.PUBLIC_BASE_URL}/${post.id}`
}