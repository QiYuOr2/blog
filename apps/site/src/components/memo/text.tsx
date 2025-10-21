import type { Memo } from "@/collections/memo";

export default function Text(memo: Omit<Memo, 'type' | 'link' | 'image'>) {
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