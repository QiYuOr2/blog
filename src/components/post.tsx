import { cn } from '@/common/utils'

interface PostProps {
  title: string
  path: string
  summary?: string
  date: string,
  tags?: string | string[]
  isExternal?: boolean
}

export default function Post({ title, path, date, isExternal }: PostProps) {

  return (
    <a href={path} target={isExternal ? '_blank' : '_self'} className="no-underline">
      <li className={cn(
        "flex flex-col sm:flex-row gap-2 py-2 px-8 my-2 mx--8",
        "list-none cursor-pointer"
      )}>
        <div className="flex transition-all duration-300 text-[1.1rem] text-true-gray-500 dark:text-true-gray-400 hover:text-warm-gray-900 dark:hover:text-warm-gray-50">
          <div>{ title }</div>
          {isExternal && <div className="i-fluent:arrow-up-right-20-filled text-[0.6rem] ml-[0.3rem] text-true-gray-500 dark:text-true-gray-400 text-opacity-80" />}
        </div>
        <div className="flex items-center time">
          <div>
            { date.split(' ')[0].split('/').slice(1).join('/') }
          </div>
        </div>
      </li>
    </a>
  )
}