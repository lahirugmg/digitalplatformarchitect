'use client';

import { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  Connection,
  useNodesState,
  useEdgesState,
  NodeTypes,
  EdgeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { toast } from 'sonner';
import CustomNode, { NodeData } from './CustomNode';
import AnimatedEdge, { EdgeData } from './AnimatedEdge';
import { validateConnection, validatePipeline, calculateMetrics } from '../lib/validation';
import EmptyCanvas from '../../components/shared/EmptyCanvas';

const initialNodes: Node<NodeData>[] = [];
const initialEdges: Edge<EdgeData>[] = [];

interface DataPipelineCanvasProps {
  isRunning: boolean;
  onMetricsUpdate: (metrics: any) => void;
  onValidationUpdate: (validation: any) => void;
  onNodesChange?: (nodes: Node<NodeData>[]) => void;
  onEdgesChange?: (edges: Edge<EdgeData>[]) => void;
}

export default function DataPipelineCanvas({
  isRunning,
  onMetricsUpdate,
  onValidationUpdate,
  onNodesChange: onNodesChangeExternal,
  onEdgesChange: onEdgesChangeExternal,
}: DataPipelineCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Notify parent of node/edge changes
  useEffect(() => {
    if (onNodesChangeExternal) {
      onNodesChangeExternal(nodes);
    }
  }, [nodes, onNodesChangeExternal]);

  useEffect(() => {
    if (onEdgesChangeExternal) {
      onEdgesChangeExternal(edges);
    }
  }, [edges, onEdgesChangeExternal]);

  const nodeTypes: NodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const edgeTypes: EdgeTypes = useMemo(() => ({ animated: AnimatedEdge }), []);

  const onSave = useCallback(() => {
    const pipeline = { nodes, edges };
    localStorage.setItem('pipeline-save', JSON.stringify(pipeline));
    toast.success('Pipeline saved!');
  }, [nodes, edges]);

  const onLoad = useCallback(() => {
    const savedPipeline = localStorage.getItem('pipeline-save');
    if (savedPipeline) {
      const pipeline = JSON.parse(savedPipeline);
      setNodes(pipeline.nodes || []);
      setEdges(pipeline.edges || []);
      toast.success('Pipeline loaded!');
    } else {
      toast.info('No saved pipeline found');
    }
  }, [setNodes, setEdges]);

  // Handle new connections with validation
  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      const sourceNode = nodes.find(n => n.id === params.source);
      const targetNode = nodes.find(n => n.id === params.target);

      if (!sourceNode || !targetNode) return;

      const validation = validateConnection(sourceNode as Node<NodeData>, targetNode as Node<NodeData>);

      const newEdge: Edge<EdgeData> = {
        id: `e${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
        type: 'animated',
        data: {
          isRunning,
          isValid: validation.isValid,
          validationMessage: validation.message,
        }
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [nodes, isRunning, setEdges]
  );

  // Handle drag and drop from component library
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 100,
      };

      const componentData = JSON.parse(type);
      const newNode: Node<NodeData> = {
        id: `node-${Date.now()}`,
        type: 'custom',
        position,
        data: {
          label: componentData.name,
          icon: componentData.icon,
          type: componentData.componentType,
          status: 'idle',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Update node and edge states when pipeline runs
  useEffect(() => {
    if (isRunning) {
      const metrics = calculateMetrics(nodes as Node<NodeData>[], edges);
      onMetricsUpdate(metrics);

      setNodes((nds) =>
        nds.map((node) => {
          // Assign weather characteristics based on node type
          let writeIntensity = metrics.writeIntensity;
          let replicationLag: number | undefined = undefined;
          let consistencyModel: 'CA' | 'CP' | 'AP' | undefined = undefined;

          // Source nodes have high write intensity
          if (node.data.type === 'source') {
            writeIntensity = Math.min(100, (metrics.writeIntensity || 0) * 1.2);
          }

          // Streaming platforms show moderate writes
          if (node.data.type === 'streaming') {
            writeIntensity = metrics.writeIntensity;
          }

          // Storage nodes show replication lag and CAP classification
          if (node.data.type === 'storage') {
            replicationLag = metrics.replicationLag;
            // Classify storage CAP based on quality (simplified)
            if (metrics.quality > 95) consistencyModel = 'CA'; // High consistency
            else if (metrics.quality > 80) consistencyModel = 'CP'; // Partition tolerant
            else consistencyModel = 'AP'; // Available but eventually consistent
          }

          // Analytics nodes show replication lag
          if (node.data.type === 'analytics') {
            replicationLag = Math.round((metrics.replicationLag || 0) * 1.5); // Higher lag for analytics
          }

          return {
            ...node,
            data: {
              ...node.data,
              status: 'running',
              throughput: metrics.throughput,
              quality: metrics.quality,
              writeIntensity,
              replicationLag,
              consistencyModel,
            },
          };
        })
      );

      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          animated: true,
          data: {
            ...edge.data,
            isRunning: true,
            throughput: metrics.throughput,
            quality: metrics.quality,
            backpressure: metrics.backpressure,
          },
        }))
      );
    } else {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: {
            ...node.data,
            status: 'idle',
            throughput: undefined,
            quality: undefined,
          },
        }))
      );

      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          animated: false,
          data: {
            ...edge.data,
            isRunning: false,
            throughput: undefined,
            quality: undefined,
          },
        }))
      );
    }
  }, [isRunning]);

  // Validate pipeline whenever nodes or edges change
  useEffect(() => {
    const validation = validatePipeline(nodes as Node<NodeData>[], edges);
    onValidationUpdate(validation);
  }, [nodes, edges]);

  return (
    <div className="w-full h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background />
        <Controls />

        <div className="absolute top-4 right-4 z-10 space-x-2">
          <button onClick={onSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
          <button onClick={onLoad} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Load
          </button>
        </div>

        {nodes.length === 0 && (
          <EmptyCanvas
            icon="🌊"
            title="Build Your First Pipeline"
            instructions={[
              '✨ <strong>Drag components</strong> from the left sidebar onto this canvas',
              '🔗 <strong>Connect nodes</strong> by dragging from one edge to another',
              '▶️ <strong>Click "Run Pipeline"</strong> to see water flowing',
              '🌊 <strong>Watch animations</strong> - thicker streams = higher throughput',
              '💙 <strong>Blue water</strong> = clean data, brown = quality issues',
            ]}
          />
        )}

        {/* Running Status */}
        {isRunning && nodes.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg shadow-lg p-4 max-w-sm z-10 animate-pulse">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌊</span>
              <div>
                <div className="font-bold text-lg">Pipeline Running</div>
                <div className="text-sm text-blue-100">Watch data flow like water through your system</div>
              </div>
            </div>
          </div>
        )}
      </ReactFlow>
    </div>
  );
}
