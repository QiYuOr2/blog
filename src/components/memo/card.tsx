import Image from "./image"
import Link from "./link"
import Text from "./text"
import TextImage from "./textImage"
import { MemoType, type MemoVO } from "./types"
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const typeToCard = {
  [MemoType.Text]: Text,
  [MemoType.Image]: Image,
  [MemoType.TextImage]: TextImage
}


export { type MemoVO }
export default function MemoCard({ type, link, ...rest }: MemoVO) {

  const ContentCard = typeToCard[type](rest)

  return (
    <div className="mb-8">
      <div className='inline-block bg-cool-gray-100 dark:(bg-true-gray-700 text-light-50) px-3.5 py-3 rounded-2xl'>
        {ContentCard}
        {link && Link(link)}
      </div>
      <div className='time px-1 py-1'>- {dayjs(rest.create_at).format('YYYY 年 MM 月 DD 日 dddd')}</div>
    </div>
  )
}