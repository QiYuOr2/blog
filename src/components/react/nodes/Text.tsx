import { memo } from "react";
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'

export type TextNode = Node<{ label: string }, 'text'>;

function Text({ data }: NodeProps<TextNode>) {
  return (
    <div>
      <div>{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default memo(Text)