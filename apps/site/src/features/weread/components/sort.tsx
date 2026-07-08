import { useState } from 'react'
import type { SortKey } from '../utils/progress-utils'
import { sortOptions } from '../utils/progress-utils'

interface WereadSortProps {
  sortKey: SortKey
  onChange: (key: SortKey) => void
}

export function WereadSort({ sortKey, onChange }: WereadSortProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentLabel = sortOptions.find((option) => option.value === sortKey)?.label ?? '排序'

  return (
    <div className="relative inline-flex flex-col items-start">
      <div className="flex gap-1 px-0.5 py-0.5 bg-cool-gray-100 dark:bg-true-gray-700 rounded-full text-sm text-true-gray-400 relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative inline-flex items-center gap-2 rounded-full bg-light-50 px-2.5 py-1.5 text-sm font-medium text-black shadow-sm transition duration-150 dark:(bg-dark text-light-50)"
        >
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[rgb(59,105,61)] shadow-sm"></span>
          <span>{currentLabel}</span>
          <i className={`i-mingcute:down-fill transition-transform duration-150 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full z-10 mt-2 min-w-[180px] overflow-hidden rounded-3xl border border-cool-gray-100 bg-light-50 shadow-lg dark:border-true-gray-600 dark:bg-true-gray-700">
            <div className="grid gap-1 p-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`w-full rounded-2xl px-4 py-2 text-left text-sm transition ${
                    sortKey === option.value
                      ? 'bg-cool-gray-100 text-black dark:bg-dark dark:text-slate-100'
                      : 'text-true-gray-400 hover:bg-cool-gray-50 dark:text-true-gray-400 dark:hover:bg-true-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
