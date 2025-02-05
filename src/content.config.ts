import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postsSchema } from './collections/posts';

const posts = defineCollection({
  loader: glob({ pattern:"**/*.md", base: "./posts" }),
  schema: postsSchema
});

export const collections = { posts };