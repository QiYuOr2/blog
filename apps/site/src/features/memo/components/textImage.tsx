import type { Memo } from "@/features/memo/content";
import Text from "./text";

export default function TextImage(memo: Omit<Memo, 'type'>) {

  const TextContent = Text(memo)

  return (
    <div>
      {TextContent}
    </div>
  )
}
