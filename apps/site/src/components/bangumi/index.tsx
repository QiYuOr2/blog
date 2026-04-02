import { useEffect, useState, type JSX } from 'react'
import { Card, CardSkeleton } from './card'
import { CollectionType, type CollectionItem, type CollectionsDTO } from './types'

/**
 * @summary https://api.bgm.tv/v0/users/qiyuor2/collections?subject_type=2&limit=50&offset=0
 */
const BANGUMI_USER_API = 'https://api.bgm.tv/v0/users/qiyuor2/collections?subject_type=2'

const collectionTypes = [
  CollectionType.Wish,
  CollectionType.Collect,
  CollectionType.Doing,
  CollectionType.OnHold,
  CollectionType.Dropped
] as const

const EMPTY_TYPE_COUNTS: Record<CollectionType, number> = {
  [CollectionType.Wish]: 0,
  [CollectionType.Collect]: 0,
  [CollectionType.Doing]: 0,
  [CollectionType.OnHold]: 0,
  [CollectionType.Dropped]: 0
}

const typeLabels = {
  [CollectionType.Wish]: '想看',
  [CollectionType.Collect]: '看过',
  [CollectionType.Doing]: '在看',
  [CollectionType.OnHold]: '搁置',
  [CollectionType.Dropped]: '抛弃'
} satisfies Record<CollectionType, string>

export function Bangumi() {
  const [data, setData] = useState<CollectionItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<CollectionType>(CollectionType.Doing)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [typeCounts, setTypeCounts] = useState<Record<CollectionType, number>>(EMPTY_TYPE_COUNTS)
  const pageSize = 12

  const fetchPageData = async (page: number, type: CollectionType) => {
    setLoading(true)
    setError(null)

    try {
      const offset = (page - 1) * pageSize
      const url = `${BANGUMI_USER_API}&type=${type}&offset=${offset}&limit=${pageSize}`
      const response = await fetch(url)

      if (!response.ok) throw new Error('Failed to fetch data')

      const result: CollectionsDTO = await response.json()
      setData(result.data)
      setTotal(result.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const fetchTypeCounts = async () => {
    try {
      const totals = await Promise.all(
        collectionTypes.map(async (type) => {
          const response = await fetch(`${BANGUMI_USER_API}&type=${type}&offset=0&limit=1`)

          if (!response.ok) throw new Error('Failed to fetch type counts')

          const result: CollectionsDTO = await response.json()
          return [type, result.total] as const
        })
      )

      const nextTypeCounts = { ...EMPTY_TYPE_COUNTS }
      for (const [type, count] of totals) {
        nextTypeCounts[type] = count
      }

      setTypeCounts(nextTypeCounts)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPageData(currentPage, selectedType)
  }, [currentPage, selectedType])

  useEffect(() => {
    fetchTypeCounts()
  }, [])

  const totalPages = Math.ceil(total / pageSize)
  const paginatedData = data

  const handleTypeChange = (type: CollectionType) => {
    setSelectedType(type)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderPageButtons = () => {
    const maxVisible = 5
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)
    const startPage = Math.max(1, end - maxVisible + 1)
    const pages: (number | string)[] = []

    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) pages.push('start-ellipsis')
    }

    for (let i = startPage; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('end-ellipsis')
      pages.push(totalPages)
    }

    return pages.map((page) => {
      if (typeof page === 'string') {
        return <span key={page} className="mx-1 px-2 py-1 font-bold text-true-gray-500">...</span>
      }

      const isActive = page === currentPage

      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`h-8 w-8 rounded-md ${
            isActive ? 'bg-[rgb(59,105,61)] text-white' : 'bg-[var(--un-prose-bg-soft)]'
          }`}
        >
          {page}
        </button>
      )
    })
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {collectionTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`rounded-full px-3 py-1 text-xs ${
              selectedType === type ? 'bg-[rgb(59,105,61)] text-white' : 'bg-[var(--un-prose-bg-soft)]'
            }`}
          >
            {typeLabels[type]} ({typeCounts[type]})
          </button>
        ))}
      </div>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      {loading
        ? (
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-4">
              {Array.from({ length: pageSize }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          )
        : (
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-4">
              {paginatedData.map((item) => (
                <Card
                  key={item.subject.id}
                  id={item.subject.id}
                  name={item.subject.name_cn || item.subject.name}
                  image={item.subject.images.small}
                  score={item.subject.score}
                  rank={item.subject.rank}
                />
              ))}
            </div>
          )}

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="i-mingcute:left-fill text-true-gray-500"
          >
            上一页
          </button>
          {renderPageButtons()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="i-mingcute:right-fill text-true-gray-500"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  )
}
