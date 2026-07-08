import type { ReactNode } from 'react'

interface WereadCardProps {
  id?: string | number
  image?: string
  name: string
  score?: number | string
  topBadge?: ReactNode
  bottomBadge?: ReactNode
  href?: string
}

function openBook(href?: string) {
  if (!href) return
  if (typeof window !== 'undefined') {
    window.open(href, '_blank')
  }
}

export function WereadCard({ image, name, topBadge, bottomBadge, href }: WereadCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:(shadow-lg) transition-all transition-duration-150"
      onClick={() => openBook(href)}
    >
      {image ? (
        <img src={image} alt={name} className="h-36 md:h-48 lg:h-48 w-full object-cover" />
      ) : (
        <div className="flex h-36 md:h-48 lg:h-48 w-full items-center justify-center bg-slate-100 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">无封面</div>
      )}
      <div className="absolute top-10 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
      <div className="px-2 py-2 absolute bottom-0 text-white text-xs">{name}</div>
      <div className="absolute top-1 right-1 text-right text-white text-xs flex flex-col items-end gap-1">
        {topBadge ? (
          <span className="inline-flex rounded bg-[rgba(0,0,0,0.45)] px-1.5 py-1">{topBadge}</span>
        ) : null}
        {bottomBadge ? (
          <span className="inline-flex rounded bg-[rgba(0,0,0,0.45)] px-1.5 py-1">{bottomBadge}</span>
        ) : null}
      </div>
    </div>
  )
}

export function WereadCardSkeleton() {
  return (
    <div className="rounded-lg h-36 md:h-48 lg:h-48 w-full skeleton"></div>
  )
}
