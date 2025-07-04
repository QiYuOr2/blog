import { useMemo } from "react";
import '@/styles/toc.css'

interface TOCProps {
  headings: { depth: number; slug: string; text: string }[]
}

export default function TOC({ headings }: TOCProps) {
  const basicDepth = useMemo<number>(() => {
    if (headings.length === 0) 
      return 0
    
    let result = headings[0].depth
    for (let i = 1; i < headings.length; i++) {
      const item = headings[i]
      if (result > item.depth) {
        result = item.depth
      }
    }
    return result
  }, [headings])

  return headings.length && (
    <ul className="pl-0">
      <p className="mb-[0.2rem]">目录</p>
      {headings.map(h => (
        <li className={`toc__archor toc__archor--${h.depth - basicDepth}`}>
          <a className="no-underline border-b border-warm-gary-400 transition-all duration-300 text-warm-gray-400 hover:(text-dark border-black) dark:border-warm-gray-500 dark:hover:(text-white border-white)" href={`#${h.slug}`}>{h.text}</a>
        </li>
      ))}
    </ul>
  )
}