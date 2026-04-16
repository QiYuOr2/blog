import { z, type CollectionEntry } from 'astro:content';

const memoSchema = z.object({
  type: z.enum(['text', 'image', 'text_image']),
  content: z.string().or(z.array(z.string())),
  create_at: z.coerce.date(),
  timestamp: z.number(),
  link: z.object({
    title: z.string(),
    href: z.string(),
    description: z.string().optional(),
    cover: z.string().optional()
  }).optional()
})

export const memosSchema = z.array(memoSchema)

export type Memo = z.infer<typeof memoSchema>;
export type MemoLink = Memo['link']


export function flattenMemo(memos: CollectionEntry<'memos'>[]) {
  return memos.map(memosCollection => memosCollection.data).flat()
}
