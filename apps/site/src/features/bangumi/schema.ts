import { z } from "astro/zod";
import { CollectionType, type CollectionItem, type Subject } from "./types";

const subjectSchema: z.ZodType<Subject> = z
  .object({
    id: z.number(),
    date: z.union([
      z.string(),
      z.null(),
      z
        .object({
          year: z.number().optional(),
          month: z.number().optional(),
          day: z.number().optional(),
        })
        .passthrough(),
    ]),
    images: z
      .object({
        small: z.string(),
        grid: z.string(),
        large: z.string(),
        medium: z.string(),
        common: z.string(),
      })
      .passthrough(),
    name: z.string(),
    name_cn: z.string(),
    score: z.number().nullable(),
    rank: z.number().nullable(),
  });

const collectionItemSchema: z.ZodType<CollectionItem> = z
  .object({
    updated_at: z.string(),
    subject: subjectSchema,
    type: z.nativeEnum(CollectionType),
  });

const typeBucketSchema = z.object({
  total: z.number().int().nonnegative(),
  items: z.array(collectionItemSchema),
});

export const bangumiSchema = z
  .object({
    updatedAt: z.string(),
    username: z.string().optional(),
    subjectType: z.number().int().optional(),
    types: z.record(z.string(), typeBucketSchema),
  })
  .passthrough();

export type BangumiCache = z.infer<typeof bangumiSchema>;
export type BangumiTypeBucket = z.infer<typeof typeBucketSchema>;
