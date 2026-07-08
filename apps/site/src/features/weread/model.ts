import type { CollectionEntry } from 'astro:content'
import { wereadSchema } from './schema'
import type { ReadMode, WereadStaticData } from './schema'

const defaultWereadData: WereadStaticData = {
  updatedAt: new Date().toISOString(),
  modes: {
    weekly: {},
    monthly: {},
    annually: {},
    overall: {},
  },
}

export function getWereadStaticData(entries: CollectionEntry<'weread'>[]): WereadStaticData {
  const rawData = entries[0]?.data
  if (!rawData) {
    return defaultWereadData
  }

  return wereadSchema.parse(rawData)
}

export function getReadBooks(data: WereadStaticData, mode: ReadMode = 'overall') {
  return data.modes[mode]?.readLongest?.filter(item => item.book) ?? []
}

export function getShelfBooks(data: WereadStaticData) {
  return data.shelf?.books ?? []
}

export function getShelfProgressMap(data: WereadStaticData) {
  return new Map(
    Object.entries(data.progressMap ?? {}).map(([key, value]) => [
      key,
      value as { progress?: number; readingTime?: number; readTime?: number; recordReadingTime?: number; finishTime?: number }
    ]),
  )
}
