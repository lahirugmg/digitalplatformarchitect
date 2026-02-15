'use client';

import { useEffect, useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
  NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';

import { loadArchitecture } from '@/lib/architecture-playground/data-loader';
import { PersonaFilter } from '@/lib/architecture-playground/persona-filter';
import { toReactFlow } from '@/lib/architecture-playground/reactflow-adapter';
import { usePlaygroundStore } from '@/lib/architecture-playground/store';
import { ZoomController } from '@/lib/architecture-playground/zoom-controller';

import BusinessNode from '@/components/architecture-playground/nodes/BusinessNode';
import SystemNode from '@/components/architecture-playground/nodes/SystemNode';
import ComponentNode from '@/components/architecture-playground/nodes/ComponentNode';
import DetailNode from '@/components/architecture-playground/nodes/DetailNode';

interface PlaygroundCanvasProps {
  architectureId: string;
}

const nodeTypes: NodeTypes = {
  'custom-l0': BusinessNode,
  'custom-l1': SystemNode,
  'custom-l2': ComponentNode,
  'custom-l3': DetailNode,
};

export default function PlaygroundCanvas({ architectureId }: PlaygroundCanvasProps) {
  const { persona, level, architecture, setArchitecture, setLevel, setFocusNode } = usePlaygroundStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load architecture data
  useEffect(() => {
    loadArchitecture(architectureId)
      .then(arch => {
        setArchitecture(arch);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load architecture:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [architectureId, setArchitecture]);

  // Update nodes/edges when persona or level changes
  useEffect(() => {
    if (!architecture) return;

    const filtered = PersonaFilter.filterGraph(architecture, persona, level);
    const { nodes: flowNodes, edges: flowEdges } = toReactFlow(
      filtered.components,
      filtered.connections,
      level,
      persona
    );

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [architecture, persona, level, setNodes, setEdges]);

  // Handle node click
  const onNodeClick = useCallback((_event: React.MouseEvent, node: any) => {
    setFocusNode(node.id);
  }, [setFocusNode]);

  // Handle zoom changes to update level
  const onMoveEnd = useCallback((_event: any, viewport: any) => {
    const { transition, newLevel } = ZoomController.shouldTransition(level, viewport.zoom);
    if (transition && newLevel) {
      setLevel(newLevel);
    }
  }, [level, setLevel]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading architecture...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Failed to Load Architecture</h3>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onMoveEnd={onMoveEnd}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        minZoom={0.1}
        maxZoom={2}
      >
        <Background color="#94a3b8" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => node.data.color || '#94a3b8'}
          pannable
          zoomable
        />

        <Panel position="top-right" className="bg-white rounded-lg shadow-lg p-3">
          <div className="text-sm">
            <div className="font-bold text-slate-900 mb-1">{architecture?.metadata.title}</div>
            <div className="text-xs text-slate-600">
              Level: <span className="font-medium">{level}</span>
            </div>
            <div className="text-xs text-slate-600">
              Persona: <span className="font-medium capitalize">{persona}</span>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
