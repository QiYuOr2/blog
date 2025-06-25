import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

enum MemoType {
  Text = 'text',
}

interface PreviewLink {
  title: string
  href: string
  description?: string
  cover?: string
}

export interface MemoVO {
  timestamp: number
  type: MemoType
  content: string
  link?: string | PreviewLink
  create_at: Date
}

function Link(linkInfo: string | PreviewLink) {
  const linkContent = (title: string, href: string) => (
    <a className='inline-flex items-center' href={href}>
      <i className="i-mdi:link-variant"></i>
      <span className='text-sm'>{title}</span>
    </a>
  )

  if (typeof linkInfo === 'string') {
    return linkContent(linkInfo, linkInfo)
  }

  return (
    <div>
      {linkContent(linkInfo.title, linkInfo.href)}
    </div>
  )
}

function TextCard(memo: Omit<MemoVO, 'type'>) {
  return (
    <div>
      <div>{memo.content}</div>
      {memo.link && Link(memo.link)}
    </div>
  )
}

const typeToCard = {
  [MemoType.Text]: TextCard
}

export default function MemoCard({ type, ...rest }: MemoVO) {

  const ContentCard = typeToCard[type](rest)

  return (
    <div className="mb-8">
      <div className='inline-block bg-cool-gray-100 dark:(bg-true-gray-700 text-light-50) px-3.5 py-2 rounded-3'>
        {ContentCard}
      </div>
      <div className='time px-1 py-1'>- {dayjs(rest.create_at).format('YYYY 年 MM 月 DD 日 dddd')}</div>
    </div>
  )
}