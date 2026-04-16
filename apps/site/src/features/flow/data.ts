import { Position, type Node } from "@xyflow/react";

const xPosition = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
}

export const nodes: Node[] = [
  { id: '1', type: 'input', position: { x: 0, y: 0 }, data: { label: '地址栏输入 URL' }, ...xPosition },

  // URL
  { id: '2', position: { x: 200, y: 0 }, data: { label: '解析 URL' }, ...xPosition },
  { id: '2-1', type: 'point', position: { x: 269, y: -80 }, data: { label: '' } },
  { id: '2-1-1', type: 'output', position: { x: 300, y: -94 }, data: { label: 'DNS 域名解析' }, ...xPosition },
  { id: '2-2', type: 'point', position: { x: 269, y: -150 }, data: { label: '' } },
  { id: '2-2-1', type: 'output', position: { x: 300, y: -164 }, data: { label: '强缓存检查' }, ...xPosition },
  // { id: '2-2-1-1', type: 'text', position: { x: 500, y: -204 }, data: { label: '从HTTP缓存中检查' }, ...xPosition  },
  // { id: '2-2-1-2', type: 'text', position: { x: 500, y: -144 }, data: { label: '校验参数' }, ...xPosition  },
  // { id: '2-2-1-2-1', type: 'text', position: { x: 620, y: -164 }, data: { label: 'Expairs' }, ...xPosition  },
  // { id: '2-2-1-2-2', type: 'text', position: { x: 620, y: -124 }, data: { label: 'Cache-Control' }, ...xPosition  },

  // TCP
  { id: '3', position: { x: 400, y: 0 }, data: { label: 'TCP 连接' }, ...xPosition },
  { id: '3-1', type: 'point', position: { x: 469, y: 90 }, data: { label: '' } },
  { id: '3-1-1', type: 'output', position: { x: 500, y: 76 }, data: { label: '全双工链接' }, ...xPosition },
  { id: '3-2', type: 'point', position: { x: 469, y: 160 }, data: { label: '' } },
  { id: '3-2-1', type: 'output', position: { x: 500, y: 146 }, data: { label: '三次握手' }, ...xPosition },

  // HTTP
  { id: '4', position: { x: 600, y: 0 }, data: { label: 'HTTP 请求' }, ...xPosition },
  { id: '4-1', type: 'point', position: { x: 669, y: -80 }, data: { label: '' } },
  { id: '4-1-1', type: 'output', position: { x: 700, y: -94 }, data: { label: '网络层性能优化' }, ...xPosition },
  { id: '4-2', type: 'point', position: { x: 669, y: -150 }, data: { label: '' } },
  { id: '4-2-1', type: 'output', position: { x: 700, y: -164 }, data: { label: '协商缓存' }, ...xPosition },
  { id: '4-3', type: 'point', position: { x: 669, y: -220 }, data: { label: '' } },
  { id: '4-3-1', type: 'output', position: { x: 700, y: -234 }, data: { label: 'HTTP 状态码' }, ...xPosition },

  { id: '5', position: { x: 800, y: 0 }, data: { label: '渲染页面' }, ...xPosition },
  { id: '5-1', type: 'point', position: { x: 869, y: 90 }, data: { label: '' } },
  { id: '5-1-1', type: 'output', position: { x: 900, y: 76 }, data: { label: '渲染流程' }, ...xPosition },
  { id: '5-2', type: 'point', position: { x: 869, y: 160 }, data: { label: '' } },
  { id: '5-2-1', type: 'output', position: { x: 900, y: 146 }, data: { label: '性能优化' }, ...xPosition },

  { id: '6', type: 'point', position: { x: 1000, y: 14 }, data: { label: '' } },
  { id: '7', type: 'common', position: { x: 1065, y: 0 }, data: { label: '断开 TCP 连接', 'right-close': true }, ...xPosition },

  { id: '7-1', type: 'point', position: { x: 1133, y: -80 }, data: { label: '' } },
  { id: '7-1-1', type: 'output', position: { x: 1163, y: -94 }, data: { label: '四次挥手' }, ...xPosition },

];
export const edges = [
  { id: 'e1-2', source: '1', target: '2', type: 'straight', },

  // 2
  { id: 'e2-2-1', source: '2', target: '2-1', type: 'floating-straight', },
  { id: 'e2-2-1-1', source: '2-1', target: '2-1-1', type: 'floating-straight', },
  { id: 'e2-2-2', source: '2', target: '2-2', type: 'floating-straight', },
  { id: 'e2-2-2-1', source: '2-2', target: '2-2-1', type: 'floating-straight', },
  // { id: 'e2-2-2-1-1', source: '2-2-1', target: '2-2-1-1' ,type: 'smoothstep', },
  // { id: 'e2-2-2-1-2', source: '2-2-1', target: '2-2-1-2' ,type: 'smoothstep', },
  // { id: 'e2-2-2-1-2-1', source: '2-2-1-2', target: '2-2-1-2-1' ,type: 'smoothstep', },
  // { id: 'e2-2-2-1-2-2', source: '2-2-1-2', target: '2-2-1-2-2' ,type: 'smoothstep', },

  { id: 'e2-3', source: '2', target: '3', type: 'straight', },

  { id: 'e3-4', source: '3', target: '4', type: 'straight', },
  { id: 'e3-3-1', source: '3', target: '3-1', type: 'floating-straight', },
  { id: 'e3-3-1-1', source: '3-1', target: '3-1-1', type: 'floating-straight', },
  { id: 'e3-3-2', source: '3', target: '3-2', type: 'floating-straight', },
  { id: 'e3-3-2-1', source: '3-2', target: '3-2-1', type: 'floating-straight', },

  { id: 'e4-5', source: '4', target: '5', type: 'straight', },
  { id: 'e4-4-1', source: '4', target: '4-1', type: 'floating-straight', },
  { id: 'e4-4-1-1', source: '4-1', target: '4-1-1', type: 'floating-straight', },
  { id: 'e4-4-2', source: '4', target: '4-2', type: 'floating-straight', },
  { id: 'e4-4-2-1', source: '4-2', target: '4-2-1', type: 'floating-straight', },
  { id: 'e4-4-3', source: '4', target: '4-3', type: 'floating-straight', },
  { id: 'e4-4-3-1', source: '4-3', target: '4-3-1', type: 'floating-straight', },

  { id: 'e5-6', source: '5', target: '6', type: 'straight', },
  { id: 'e5-5-1', source: '5', target: '5-1', type: 'floating-straight', },
  { id: 'e5-5-1-1', source: '5-1', target: '5-1-1', type: 'floating-straight', },
  { id: 'e5-5-2', source: '5', target: '5-2', type: 'floating-straight', },
  { id: 'e5-5-2-1', source: '5-2', target: '5-2-1', type: 'floating-straight', },

  { id: 'e6-7', source: '6', target: '7', type: 'straight', },


  { id: 'e7-7-1', source: '7', target: '7-1', type: 'floating-straight', },
  { id: 'e7-7-1-1', source: '7-1', target: '7-1-1', type: 'floating-straight', },
];
