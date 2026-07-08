import type { WereadStaticData } from '../schema'
import { useWereadProgress } from '../hooks/useWereadProgress'
import { WereadSort } from './sort'
import { WereadPagination } from './pagination'
import { WereadShelfGrid } from './shelf-grid'

export function WereadProgress({ data }: { data: WereadStaticData }) {
  const {
    modeData,
    progressMap,
    pageBooks,
    currentPage,
    totalPages,
    sortKey,
    setSortKey,
    handlePageChange,
  } = useWereadProgress(data)

  if (!modeData) {
    return (
      <div className="rounded-xl border border-[var(--un-prose-border)] bg-[var(--un-prose-bg-soft)] p-6 text-[var(--un-prose-body)] dark:border-[var(--un-prose-invert-border)] dark:bg-[var(--un-prose-invert-bg-soft)] dark:text-[var(--un-prose-invert-body)]">
        微信读书数据尚未生成，请先执行构建前的数据更新。
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-8">
      <WereadSort sortKey={sortKey} onChange={setSortKey} />
      <WereadShelfGrid books={pageBooks} progressMap={progressMap} />
      <WereadPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

