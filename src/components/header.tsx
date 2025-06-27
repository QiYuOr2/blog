import type { PropsWithChildren } from "react"
import Picture from "./picture"

type HeaderProps = PropsWithChildren<{
  className?: string
}>

export default function Header({ children, ...rest }: HeaderProps) {
  const iconSize = 'w-6 h-6 my-1'

  return (
    <header className={`flex pt-10 py-8 mx-auto text-true-gray-800 dark:text-white relative ${rest.className}`}>
      <a href="/">
        <Picture src="https://avatars.githubusercontent.com/u/48339849" width="88px" height="88px" alt="avatar" round />
      </a>
      <div className="ml-6 flex-1 flex flex-col gap-1">
        <div className="flex items-center">
          <a href="/">
              <h1 className="text-xl font-bold">柒宇</h1>
          </a>
          <div className="flex items-center ml-auto">
            <a className="sm:(static h-unset) absolute bottom-7 right-7 h-8" href="/rss.xml" aria-label="RSS">
              <div className="i-mdi:rss w-6 h-6 text-xl" />
            </a>
          </div>
        </div>
        <div className="text-true-gray-500 text-sm">前端开发 / 动画 / 日语初心者</div>

        <div className="text-xl mt-auto flex items-center gap-2">
          <a  href="https://github.com/QiYuOr2" aria-label="GitHub" title="GitHub">
            <div className={`i-mdi:github ${iconSize}`}  />
          </a>
          <a href="https://space.bilibili.com/10980643" aria-label="Bilibili" title="Bilibili">
            <div className={`i-mingcute:bilibili-fill ${iconSize}`}  />
          </a>
          <a href="https://www.travellings.cn/go.html" aria-label="Travelling" title="Travelling">
            <div className={`i-mdi:train ${iconSize}`}></div>
          </a>

          <div className="ml-0 sm:ml-auto">
            {children}
          </div>
        </div>
      </div>
    </header>
  )
}