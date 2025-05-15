import { useCallback } from 'react';
import '@xyflow/react/dist/style.css';

import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

const initialNodes = [
  { id: 'InputURL', type: 'input', position: { x: 0, y: 0 }, data: { label: '地址栏输入 URL' } },
  { id: 'ParseURL', position: { x: 200, y: 0 }, data: { label: '解析 URL' } },
  { id: 'TCP', position: { x: 400, y: 0 }, data: { label: 'TCP 连接' } },
  { id: 'HTTP', position: { x: 600, y: 0 }, data: { label: 'HTTP 请求' } },
  { id: 'PageRender', position: { x: 800, y: 0 }, data: { label: '渲染页面' } },
  { id: 'Point', position: { x: 1000, y: 0 }, data: { label: '' } },
  { id: 'StopTCP', position: { x: 1200, y: 0 }, data: { label: '断开 TCP 连接' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {}

const Flow = () => {
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
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  )
}

export default Flow;