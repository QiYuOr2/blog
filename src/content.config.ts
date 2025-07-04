import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postsSchema } from './collections/posts';
import { memosSchema } from './collections/memo';

const posts = defineCollection({
  loader: glob({ pattern:"**/*.{md,mdx}", base: "./posts" }),
  schema: postsSchema
});

const memos = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./memos"}),
  schema: memosSchema
})

export const collections = { posts, memos };