import type { MemoVO } from "./types";

export default function Text(memo: Omit<MemoVO, 'type' | 'link' | 'image'>) {
  return (
    <div>
      {
        Array.isArray(memo.content)
          ? memo.content.map(item => <p className="mt-0 mb-[0.5em] last:mb-0">{item}</p>)
          : memo.content
      }
    </div>
  )
}