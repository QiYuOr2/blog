import { useCallback } from 'react';
import '@xyflow/react/dist/style.css';

import {
  ReactFlow,
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position,
  type Node,
} from '@xyflow/react';
import Point from './nodes/Point';
import FloatingStraight from './edges/FloatingStraight';
import Text from './nodes/Text';

const xPosition = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
}

const initialNodes: Node[] = [
  { id: '1', type: 'input', position: { x: 0, y: 0 }, data: { label: '地址栏输入 URL' }, ...xPosition },

  // URL
  { id: '2', position: { x: 200, y: 0 }, data: { label: '解析 URL' }, ...xPosition  },
  { id: '2-1', type: 'point', position: { x: 269, y: -80 }, data: { label: '' } },
  { id: '2-1-1', type: 'output', position: { x: 300, y: -94 }, data: { label: 'DNS 域名解析' }, ...xPosition  },
  { id: '2-2', type: 'point', position: { x: 269, y: -150 }, data: { label: '' } },
  { id: '2-2-1', position: { x: 300, y: -164 }, data: { label: '强缓存检查' }, ...xPosition  },
  { id: '2-2-1-1', type: 'text', position: { x: 500, y: -204 }, data: { label: '从HTTP缓存中检查' }, ...xPosition  },
  { id: '2-2-1-2', type: 'text', position: { x: 500, y: -144 }, data: { label: '校验参数' }, ...xPosition  },
  { id: '2-2-1-2-1', type: 'text', position: { x: 620, y: -164 }, data: { label: 'Expairs' }, ...xPosition  },
  { id: '2-2-1-2-2', type: 'text', position: { x: 620, y: -124 }, data: { label: 'Cache-Control' }, ...xPosition  },

  // TCP
  { id: '3', position: { x: 400, y: 0 }, data: { label: 'TCP 连接' }, ...xPosition  },


  { id: '4', position: { x: 600, y: 0 }, data: { label: 'HTTP 请求' }, ...xPosition  },
  { id: '5', position: { x: 800, y: 0 }, data: { label: '渲染页面' }, ...xPosition  },
  { id: '6', type: 'point', position: { x: 1000, y: 14 }, data: { label: '' }  },
  { id: '7', position: { x: 1065, y: 0 }, data: { label: '断开 TCP 连接' }, ...xPosition  },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' ,type: 'straight', },

  // 2
  { id: 'e2-2-1', source: '2', target: '2-1' ,type: 'floating-straight', },
  { id: 'e2-2-1-1', source: '2-1', target: '2-1-1' ,type: 'floating-straight', },
  { id: 'e2-2-2', source: '2', target: '2-2' ,type: 'floating-straight', },
  { id: 'e2-2-2-1', source: '2-2', target: '2-2-1' ,type: 'floating-straight', },
  { id: 'e2-2-2-1-1', source: '2-2-1', target: '2-2-1-1' ,type: 'smoothstep', },
  { id: 'e2-2-2-1-2', source: '2-2-1', target: '2-2-1-2' ,type: 'smoothstep', },
  { id: 'e2-2-2-1-2-1', source: '2-2-1-2', target: '2-2-1-2-1' ,type: 'smoothstep', },
  { id: 'e2-2-2-1-2-2', source: '2-2-1-2', target: '2-2-1-2-2' ,type: 'smoothstep', },

  { id: 'e2-3', source: '2', target: '3' ,type: 'straight', },
  { id: 'e3-4', source: '3', target: '4' ,type: 'straight', },
  { id: 'e4-5', source: '4', target: '5' ,type: 'straight', },
  { id: 'e5-6', source: '5', target: '6' ,type: 'straight', },
  { id: 'e6-7', source: '6', target: '7' ,type: 'straight', },
];

const nodeTypes = {
  point: Point,
  text: Text
}

const edgeTypes = {
  'floating-straight': FloatingStraight,
}

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className='w-full h-[calc(100vh-var(--h-footer)-80px)]'>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesDraggable={false}
        nodesConnectable={false}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}