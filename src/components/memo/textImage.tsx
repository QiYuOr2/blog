import Text from "./text";
import type { MemoVO } from "./types";

export default function TextImage(memo: Omit<MemoVO, 'type'>) {

  const TextContent = Text(memo)

  return (
    <div>
      {TextContent}
    </div>
  )
}
