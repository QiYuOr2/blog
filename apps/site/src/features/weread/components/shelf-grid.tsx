import type { WereadShelfBook } from '../schema'
import { WereadCard } from './card'
import { formatDuration, getProgressLabel, getReadDuration } from '../utils/progress-utils'

interface WereadShelfGridProps {
  books: WereadShelfBook[]
  progressMap: Map<string, unknown>
}

export function WereadShelfGrid({ books, progressMap }: WereadShelfGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-4">
      {books.length > 0 ? (
        books.map((item, index) => {
          const title = item.title || '未知书籍'
          const progress = progressMap.get(item.bookId ?? '')
          const readDuration = getReadDuration(progress as any)
          const durationLabel = readDuration != null ? formatDuration(readDuration) : '未知时长'
          const href = typeof item.deepLink === 'string' ? item.deepLink : undefined

          return (
            <WereadCard
              key={`${title}-${index}`}
              image={item.cover}
              name={title}
              topBadge={durationLabel}
              bottomBadge={getProgressLabel(item, progress as any)}
              href={href}
            />
          )
        })
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--un-prose-border)] bg-[var(--un-prose-bg-soft)] p-6 text-[var(--un-prose-body)] dark:border-[var(--un-prose-invert-border)] dark:bg-[var(--un-prose-invert-bg-soft)] dark:text-[var(--un-prose-invert-body)]">
          暂无书籍阅读记录。
        </div>
      )}
    </div>
  )
}
