import { z } from "astro/zod";
import { parsePostDate } from "./date";

const shanghaiDate = z.preprocess((value) => parsePostDate(value), z.date());

export const postsSchema = z.object({
  title: z.string(),
  description: z.string(),
  summary: z.string().optional(),
  draft: z.boolean().optional(),
  date: shanghaiDate,
  pubDate: shanghaiDate,
  lastModified: shanghaiDate.optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
});

export type Post = z.infer<typeof postsSchema>;
