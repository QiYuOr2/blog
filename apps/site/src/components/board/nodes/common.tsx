import { memo } from "react";
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'

export type CommonNode = Node<{ label: string; 'right-close'?:boolean }, 'text'>;

function Common({ data }: NodeProps<CommonNode>) {
  return (
    <div className={`common-node ${data['right-close'] ? 'common-node--right-close' : ''}`}>
      <div>{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default memo(Common)