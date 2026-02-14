'use client';

import React, { ReactNode } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface PatternCanvasProps {
  nodes: Node[];
  edges: Edge[];
  children?: ReactNode;
}

export default function PatternCanvas({ nodes, edges, children }: PatternCanvasProps) {
  return (
    <div className="w-full h-96 rounded-lg shadow-md bg-white relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
        >
          <Background />
          <Controls />
        </ReactFlow>
        {children}
      </ReactFlowProvider>
    </div>
  );
}
