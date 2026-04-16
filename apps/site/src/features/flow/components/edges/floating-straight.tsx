import {  type EdgeProps, useInternalNode, getStraightPath } from "@xyflow/react";
import { memo } from "react";
import { getEdgeParams } from "./edgeUtils";

function FloatingStraight({ id, source, target, style } : EdgeProps) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode,
  );

  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
    // targetX: targetNode.position.x,
    // targetY:  targetNode.position.y + (targetNode.measured.height ?? 0) / 2,
  });

  return  (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      style={style}
    />
  )
}

export default memo(FloatingStraight);