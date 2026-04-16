import { type CollectionEntry } from 'astro:content';

export function flattenMemo(memos: CollectionEntry<'memos'>[]) {
  return memos.map(memosCollection => memosCollection.data).flat()
}
