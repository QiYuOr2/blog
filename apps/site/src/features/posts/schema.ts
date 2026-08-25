import { z } from "astro/zod";

export const postsSchema = z.object({
  title: z.string(),
  description: z.string(),
  summary: z.string().optional(),
  draft: z.boolean().optional(),
  date: z.coerce.date(),
  pubDate: z.coerce.date(),
  lastModified: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
});

export type Post = z.infer<typeof postsSchema>;
