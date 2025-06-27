import '@xyflow/react/dist/style.css';

import {
  ReactFlow,
  Controls,
  Background,
  type Node,
  type Edge,
} from '@xyflow/react';
import Point from './nodes/Point';
import FloatingStraight from './edges/FloatingStraight';
import Text from './nodes/Text';
import Common from './nodes/Common';
import '../../xy-theme.css'

const nodeTypes = {
  point: Point,
  text: Text,
  common: Common
}

const edgeTypes = {
  'floating-straight': FloatingStraight,
}

export type FlowProps = {
  nodes: Node[]
  edges: Edge[]
}

export default function Flow({ nodes, edges }: FlowProps) {
  return (
    <div className='w-full h-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnScroll={false}
        elementsSelectable={false}
        fitView
      >
        <Controls showInteractive={false} />
        <Background />
      </ReactFlow>
    </div>
  )
}