import { useEffect, useMemo, useState } from 'react'
import type { WereadShelfBook, WereadStaticData } from '../schema'
import { getShelfBooks, getShelfProgressMap } from '../model'
import { getSortValue, shouldRenderShelfBook } from '../utils/progress-utils'
import type { SortKey } from '../utils/progress-utils'

const DEFAULT_PAGE_SIZE = 12

export function useWereadProgress(data: WereadStaticData, pageSize = DEFAULT_PAGE_SIZE) {
  const modeData = data.modes.overall
  const progressMap = useMemo(() => getShelfProgressMap(data), [data])

  const shelfBooks = useMemo(() => {
    return getShelfBooks(data).filter((item) => shouldRenderShelfBook(item, progressMap))
  }, [data, progressMap])

  const [currentPage, setCurrentPage] = useState(1)
  const [sortKey, setSortKey] = useState<SortKey>('readTime')

  useEffect(() => {
    setCurrentPage(1)
  }, [sortKey])

  const sortedBooks = useMemo(() => {
    return [...shelfBooks].sort((a, b) => {
      const diff = getSortValue(b, sortKey, progressMap) - getSortValue(a, sortKey, progressMap)
      if (diff !== 0) return diff
      return (b.title ?? '').localeCompare(a.title ?? '')
    })
  }, [progressMap, shelfBooks, sortKey])

  const totalPages = Math.max(1, Math.ceil(sortedBooks.length / pageSize))

  const pageBooks = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedBooks.slice(start, start + pageSize)
  }, [currentPage, pageSize, sortedBooks])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return {
    modeData,
    progressMap,
    pageBooks,
    currentPage,
    totalPages,
    sortKey,
    setSortKey,
    handlePageChange,
  }
}
