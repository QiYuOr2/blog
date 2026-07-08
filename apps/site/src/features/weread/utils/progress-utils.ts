import type { WereadShelfBook } from '../schema'

export type ReadProgress = {
  progress?: number
  readingTime?: number
  readTime?: number
  recordReadingTime?: number
  finishTime?: number
}

export type SortKey = 'readTime' | 'progress' | 'shelfTime'

export const sortOptions = [
  { value: 'readTime', label: '阅读时长' },
  { value: 'progress', label: '阅读进度' },
  { value: 'shelfTime', label: '加入书架时间' },
] as const

export function formatDuration(seconds?: number) {
  if (!seconds || seconds <= 0) return '0 分钟'

  const hour = Math.floor(seconds / 3600)
  const minute = Math.floor((seconds % 3600) / 60)

  if (hour > 0) {
    return `${hour}小时${minute}分钟`
  }

  return `${minute}分钟`
}

export function getReadDuration(progress?: ReadProgress) {
  return progress?.readingTime ?? progress?.readTime ?? progress?.recordReadingTime
}

export function shouldRenderShelfBook(item: WereadShelfBook, progressMap: Map<string, ReadProgress>) {
  const progress = progressMap.get(item.bookId ?? '')
  const duration = getReadDuration(progress)
  return duration == null || duration >= 20 * 60
}

export function getProgressLabel(item: WereadShelfBook, progress?: ReadProgress) {
  if (item.finishReading === 1) {
    return '已读完'
  }

  if (typeof progress?.progress === 'number') {
    return progress.progress > 98 ? '已读完' : `${progress.progress}%`
  }

  return '未知'
}

export function getSortValue(
  item: WereadShelfBook,
  sortKey: SortKey,
  progressMap: Map<string, ReadProgress>,
) {
  const progress = progressMap.get(item.bookId ?? '')

  if (sortKey === 'readTime') {
    return getReadDuration(progress) ?? 0
  }

  if (sortKey === 'progress') {
    return progress?.progress ?? 0
  }

  return item.readUpdateTime ?? 0
}
