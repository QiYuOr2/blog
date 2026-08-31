import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { postsSchema } from "./features/posts/schema";
import { memosSchema } from "./features/memo/schema";
import { wereadSchema } from "./features/weread/schema";
import { bangumiSchema } from "./features/bangumi/schema";
import { POSTS_DIR, MEMOS_DIR, WEREAD_DIR, BANGUMI_DIR } from "@tabi/config/paths";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: POSTS_DIR }),
  schema: postsSchema,
});

const memos = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: MEMOS_DIR }),
  schema: memosSchema,
});

const weread = defineCollection({
  loader: glob({ pattern: "**/*.json", base: WEREAD_DIR }),
  schema: wereadSchema,
});

const bangumi = defineCollection({
  loader: glob({ pattern: "**/*.json", base: BANGUMI_DIR }),
  schema: bangumiSchema,
});

export const collections = { posts, memos, weread, bangumi };
