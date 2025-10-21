import { memo } from "react";
import { Handle, Position, type NodeProps } from '@xyflow/react'

function Point({ data }: NodeProps) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default memo(Point)