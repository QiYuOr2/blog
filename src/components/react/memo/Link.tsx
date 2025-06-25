import type { PreviewLink } from "./types"

/**
 * TODO 带图片的链接; 带详情的链接
 */

export default function Link(linkInfo: string | PreviewLink) {
  const linkContent = (title: string, href: string) => (
    <a className='inline-flex items-center' href={href}>
      <i className="i-mdi:link-variant"></i>
      <span className='text-sm'>{title}</span>
    </a>
  )

  if (typeof linkInfo === 'string') {
    return linkContent(linkInfo, linkInfo)
  }

  if (linkInfo.cover) {
    return (
      <a className="mt-[0.5em] flex p-2 bg-white dark:bg-black rounded-3 no-underline" href={linkInfo.href}>
        <div>
          {linkInfo.cover && <img className="w-16 h-22 object-cover rounded-2" src={linkInfo.cover} />}
        </div>
        <div className="flex-1 ml-3">
          <p className="font-bold m-0">{linkInfo.title}</p>
          <p className="text-sm m-0 line-clamp-3 text-true-gray-500">{linkInfo.description ?? linkInfo.href}</p>
        </div>
      </a>
    )
  }

  return (
    <div className="mt-[0.5em]">
      {linkContent(linkInfo.title, linkInfo.href)}
    </div>
  )
}