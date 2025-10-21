import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postsSchema } from './collections/posts';
import { memosSchema } from './collections/memo';
import { POSTS_DIR, MEMOS_DIR } from '@tabi/config/paths'

const posts = defineCollection({
  loader: glob({ pattern:"**/*.{md,mdx}", base: POSTS_DIR }),
  schema: postsSchema
});

const memos = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: MEMOS_DIR }),
  schema: memosSchema
})

export const collections = { posts, memos };