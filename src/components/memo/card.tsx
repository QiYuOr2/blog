import Image from "./image"
import Link from "./link"
import Text from "./text"
import TextImage from "./textImage"
import { type Memo } from "@/collections/memo"
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import type { JSX } from "react"
import relativeTime from 'dayjs/plugin/relativeTime'
import { navigate } from "astro:transitions/client"

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

type CardComponent = (...args: any) => JSX.Element

const typeToCard: Record<Memo['type'], CardComponent> = {
  'text': Text,
  'image': Image,
  'text_image': TextImage
}

type MemoCardProps = Memo & {
  back?: boolean
  className?: string
}

export default function MemoCard({ type, link, create_at, ...rest }: MemoCardProps) {

  const ContentCard = typeToCard[type](rest)

  const createdAt = dayjs(create_at)
  // const isWithinWeek = dayjs().diff(createdAt, 'day') < 7
  // const displayTime = isWithinWeek
  //   ? createdAt.fromNow()
  //   : createdAt.format('YYYY 年 MM 月 DD 日 dddd')

  const displayTime = createdAt.format('YYYY 年 MM 月 DD 日 dddd')

  
  const icon = 'ml-2 cursor-pointer hover:(text-dark scale-180 transition-all dark:text-light) duration-150'

  const Time = () => (
    <div className='time px-1 py-1 flex items-center'>
      <div className="w-2 h-2 rounded-full bg-[rgb(59,105,61)] mr-2"></div>
      <div>{displayTime}</div>
      
      {
        rest.back
          ? <div title="返回" className="back">
              <div className={`i-mingcute:large-arrow-left-fill ${icon}`}></div>
            </div>
      
          : <a title="查看" href={`/memo/${rest.timestamp}`}>
              <div className={`i-mingcute:chat-1-line ${icon}`}></div>
            </a>
      }
    </div>
  )

  return (
    <div key={rest.timestamp} className={`mb-2 ${rest.className}`}>
      <Time />
      <div className="border-l-neutral-200 border-solid border-l-1 ml-2">
        <div className='inline-block bg-cool-gray-100 dark:(bg-true-gray-700 text-light-50) px-3.5 py-3 ml-4 my-2 rounded-2xl'>
          {ContentCard}
          {link && Link(link)}
        </div>
      </div>
    </div>
  )
}