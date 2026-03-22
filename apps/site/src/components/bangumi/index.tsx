import { useState, useEffect, type JSX } from 'react'
import { Card, CardSkeleton } from './card'
import { CollectionType, type CollectionItem, type CollectionsDTO } from './types'



/**
 * @summary https://api.bgm.tv/v0/users/qiyuor2/collections?subject_type=2&limit=50&offset=0
 */
const BANGUMI_USER_API = 'https://api.bgm.tv/v0/users/qiyuor2/collections?subject_type=2'


export function Bangumi() {
  const [data, setData] = useState<CollectionItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<CollectionType>(CollectionType.Doing)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 12

  const fetchPageData = async (page: number, type: CollectionType) => {
    setLoading(true)
    setError(null)
    try {
      const offset = (page - 1) * pageSize
      const typeParam = type !== null ? `&type=${type}` : ''
      const url = `${BANGUMI_USER_API}${typeParam}&offset=${offset}&limit=${pageSize}`
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

  useEffect(() => {
    fetchPageData(currentPage, selectedType)
  }, [currentPage, selectedType])

  const totalPages = Math.ceil(total / pageSize)
  const paginatedData = data // Already paginated from API


  const handleTypeChange = (type: CollectionType) => {
    setSelectedType(type)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderPageButtons = () => {
    const maxVisible = 5;
    
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    const startPage = Math.max(1, end - maxVisible + 1);

    const pages: (number | string)[] = [];
    
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('start-ellipsis');
    }

    for (let i = startPage; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('end-ellipsis');
      pages.push(totalPages);
    }

    return pages.map((page) => {
      if (typeof page === 'string') {
        return <span key={page} className="px-2 py-1 mx-1 font-bold text-true-gray-500">...</span>;
      }

      const isActive = page === currentPage;
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-8 h-8 rounded-md ${
            isActive ? 'bg-[rgb(59,105,61)] text-white' : 'bg-[var(--un-prose-bg-soft)]'
          }`}
        >
          {page}
        </button>
      );
    });
  };

  const typeLabels = {
    [CollectionType.Wish]: '想看',
    [CollectionType.Collect]: '看过',
    [CollectionType.Doing]: '在看',
    [CollectionType.OnHold]: '搁置',
    [CollectionType.Dropped]: '抛弃'
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(typeLabels).map(([type, label]) => (
          <button
            key={type}
            onClick={() => handleTypeChange(Number(type) as CollectionType)}
            className={`px-3 py-1 rounded-full text-xs ${selectedType === Number(type) ? 'bg-[rgb(59,105,61)] text-white' : 'bg-[var(--un-prose-bg-soft)]'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading 
       ? <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {Array.from({ length: pageSize }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div> 
       : <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
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
      }


      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
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