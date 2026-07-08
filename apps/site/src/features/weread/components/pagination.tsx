interface WereadPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function WereadPagination({ currentPage, totalPages, onPageChange }: WereadPaginationProps) {
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

    for (let i = startPage; i <= end; i += 1) {
      pages.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('end-ellipsis')
      pages.push(totalPages)
    }

    return pages.map((page) => {
      if (typeof page === 'string') {
        return (
          <span key={page} className="mx-1 px-2 py-1 font-bold text-true-gray-500">
            ...
          </span>
        )
      }

      const isActive = page === currentPage
      return (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-8 w-8 rounded-md ${
            isActive ? 'bg-[rgb(59,105,61)] text-white' : 'bg-[var(--un-prose-bg-soft)]'
          }`}
        >
          {page}
        </button>
      )
    })
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="i-mingcute:left-fill text-true-gray-500"
      >
        上一页
      </button>
      {renderPageButtons()}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="i-mingcute:right-fill text-true-gray-500"
      >
        下一页
      </button>
    </div>
  )
}
