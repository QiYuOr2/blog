import Image from "./image"
import Link from "./link"
import Text from "./text"
import TextImage from "./textImage"
import { type Memo } from "@/collections/memo"
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import type { JSX } from "react"

dayjs.locale('zh-cn')

type CardComponent = (...args: any) => JSX.Element

const typeToCard: Record<Memo['type'], CardComponent> = {
  'text': Text,
  'image': Image,
  'text_image': TextImage
}

type MemoCardProps = Memo & {
  hideTime?: boolean
  className?: string
}

export default function MemoCard({ type, link, ...rest }: MemoCardProps) {

  const ContentCard = typeToCard[type](rest)

  return (
    <div className={`mb-8 ${rest.className}`}>
      <div className='inline-block bg-cool-gray-100 dark:(bg-true-gray-700 text-light-50) px-3.5 py-3 rounded-2xl'>
        {ContentCard}
        {link && Link(link)}
      </div>
      {
        !rest.hideTime && (<div className='time px-1 py-1 flex items-center'>
          <div>- {dayjs(rest.create_at).format('YYYY 年 MM 月 DD 日 dddd')}</div>
          <a title="查看" href={`/memo/${rest.timestamp}`} className="i-fluent:arrow-right-32-filled ml-2 cursor-pointer hover:(text-dark scale-180 transition-all dark:text-light) duration-150"></a>
        </div>)
      }
    </div>
  )
}