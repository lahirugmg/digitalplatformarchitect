'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  NodeTypes,
  Panel,
  Node,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Info } from 'lucide-react';

import LayerSelector from './components/LayerSelector';
import StreamFilter, { StreamFilterType } from './components/StreamFilter';
import L0BlackBoxNode from '@/components/architecture-playground/nodes/L0BlackBoxNode';
import ExternalActorNode from '@/components/architecture-playground/nodes/ExternalActorNode';
import StrategicOutcomeNode from '@/components/architecture-playground/nodes/StrategicOutcomeNode';
import BusinessProcessNode from '@/components/architecture-playground/nodes/BusinessProcessNode';
import OrchestrationHubNode from '@/components/architecture-playground/nodes/OrchestrationHubNode';

type BusinessLayer = 'L0' | 'L1';

const nodeTypes: NodeTypes = {
  'blackbox': L0BlackBoxNode,
  'actor': ExternalActorNode,
  'outcome': StrategicOutcomeNode,
  'process': BusinessProcessNode,
  'hub': OrchestrationHubNode,
};

export default function BusinessArchitecturePage() {
  const [currentLayer, setCurrentLayer] = useState<BusinessLayer>('L0');
  const [streamFilter, setStreamFilter] = useState<StreamFilterType>('all');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showInfo, setShowInfo] = useState(false);

  // Load and filter nodes based on current layer and stream filter
  useEffect(() => {
    const loadBusinessArchitecture = async () => {
      try {
        const data = await import('@/lib/architecture-playground/data/business-architecture.json');
        const graph = data.default;

        // Filter components by level
        const filteredComponents = graph.components.filter((comp: any) => {
          const hasLevelData = comp.levels && comp.levels[currentLayer];
          if (!hasLevelData) return false;

          // L1 stream filtering
          if (currentLayer === 'L1') {
            if (streamFilter === 'retail') {
              return ['retail-customers', 'ecommerce-channel', 'customer-experience', 'order-management'].includes(comp.id);
            } else if (streamFilter === 'wholesale') {
              return ['wholesale-customers', 'wholesale-operations', 'order-management'].includes(comp.id);
            } else if (streamFilter === 'operations') {
              return ['order-management', 'inventory-fulfillment', 'procurement', 'logistics-delivery', 'suppliers', 'delivery-partners'].includes(comp.id);
            }
          }

          return true;
        });

        // Map components to ReactFlow nodes
        const flowNodes: Node[] = filteredComponents.map((comp: any) => {
          let nodeType = 'process';

          if (currentLayer === 'L0') {
            if (comp.id === 'apparel-enterprise') nodeType = 'blackbox';
            else if (comp.type === 'external') nodeType = 'actor';
            else if (comp.type === 'platform') nodeType = 'outcome';
          } else {
            if (comp.id === 'order-management') nodeType = 'hub';
            else if (comp.type === 'external') nodeType = 'actor';
            else nodeType = 'process';
          }

          // Determine stream type for L1
          let streamType: any = undefined;
          if (currentLayer === 'L1' && nodeType === 'process') {
            if (['ecommerce-channel', 'customer-experience'].includes(comp.id)) {
              streamType = 'retail';
            } else if (['wholesale-operations'].includes(comp.id)) {
              streamType = 'wholesale';
            } else if (['inventory-fulfillment', 'procurement', 'logistics-delivery'].includes(comp.id)) {
              streamType = 'operations';
            } else if (['customer-support'].includes(comp.id)) {
              streamType = 'support';
            }
          }

          return {
            id: comp.id,
            type: nodeType,
            position: comp.position,
            data: {
              label: comp.names.business,
              component: comp,
              color: comp.levels[currentLayer]?.color || '#3b82f6',
              levelData: comp.levels[currentLayer],
              streamType
            },
          };
        });

        // Filter connections by level and stream
        const componentIds = new Set(filteredComponents.map((c: any) => c.id));
        const filteredConnections = graph.connections.filter((conn: any) => {
          const visibility = conn.visibility;
          if (!visibility || !visibility.personas.length) return false;

          const minLevel = visibility.minLevel || 'L0';
          if (currentLayer < minLevel) return false;

          return componentIds.has(conn.source) && componentIds.has(conn.target);
        });

        // Map connections to ReactFlow edges
        const flowEdges: Edge[] = filteredConnections.map((conn: any) => ({
          id: conn.id,
          source: conn.source,
          target: conn.target,
          type: conn.style?.animated ? 'default' : 'straight',
          animated: conn.style?.animated || false,
          style: {
            stroke: conn.style?.color || '#64748b',
            strokeWidth: conn.style?.width || 2,
            strokeDasharray: conn.style?.dashed ? '5,5' : undefined,
          },
          label: conn.labels?.[currentLayer] || '',
          labelStyle: { fontSize: 11, fontWeight: 600 },
          labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
        }));

        setNodes(flowNodes);
        setEdges(flowEdges);
      } catch (error) {
        console.error('Failed to load business architecture:', error);
      }
    };

    loadBusinessArchitecture();
  }, [currentLayer, streamFilter, setNodes, setEdges]);

  const handleLayerChange = useCallback((layer: BusinessLayer) => {
    setCurrentLayer(layer);
    if (layer === 'L0') {
      setStreamFilter('all'); // Reset filter when going back to L0
    }
  }, []);

  const handleStreamFilterChange = useCallback((filter: StreamFilterType) => {
    setStreamFilter(filter);
  }, []);

  const exportDiagram = useCallback(() => {
    // Placeholder for export functionality
    alert('Export functionality coming soon!');
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">🏛️ Business Architecture</h1>
            <p className="text-blue-100 text-sm">
              Omnichannel B2B & B2C Apparel Company
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              Help
            </button>
            <button
              onClick={exportDiagram}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <Link
              href="/architecture-playground"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Controls */}
        <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto p-4 space-y-4">
          <LayerSelector
            currentLayer={currentLayer}
            onLayerChange={handleLayerChange}
          />

          <StreamFilter
            currentFilter={streamFilter}
            onFilterChange={handleStreamFilterChange}
            disabled={currentLayer === 'L0'}
          />

          {/* Layer Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-900 mb-2">
              {currentLayer === 'L0' ? '📦 L0: Context Level' : '⚙️ L1: Process Level'}
            </h3>
            <p className="text-xs text-blue-800 leading-relaxed">
              {currentLayer === 'L0'
                ? 'The organization is shown as a "Black Box" focusing on external actors (customers, suppliers, delivery partners) and strategic business outcomes.'
                : 'Internal view revealing retail and wholesale streams that converge at Order Management, along with downstream operations.'}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-sm font-bold text-purple-900 mb-2">📚 Learning Objective</h3>
            <ul className="text-xs text-purple-800 space-y-1.5">
              {currentLayer === 'L0' ? (
                <>
                  <li>• Identify key external actors</li>
                  <li>• Understand strategic goals</li>
                  <li>• See business context</li>
                </>
              ) : (
                <>
                  <li>• Understand internal processes</li>
                  <li>• See how streams converge</li>
                  <li>• Learn order orchestration</li>
                  <li>• Identify downstream ops</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{
              padding: 0.2,
              minZoom: 0.5,
              maxZoom: 1.2
            }}
            minZoom={0.3}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          >
            <Background color="#cbd5e1" gap={16} />
            <Controls />
            <MiniMap
              nodeColor={(node) => node.data.color || '#94a3b8'}
              pannable
              zoomable
            />

            <Panel position="top-right" className="bg-white rounded-lg shadow-lg p-3">
              <div className="text-sm">
                <div className="font-bold text-slate-900">Current View</div>
                <div className="text-xs text-slate-600 mt-1">
                  <div>Level: <span className="font-medium">{currentLayer}</span></div>
                  <div>Stream: <span className="font-medium capitalize">{streamFilter}</span></div>
                  <div className="mt-1 text-blue-600">Nodes: {nodes.length}</div>
                </div>
              </div>
            </Panel>

            {/* Layer Transition Overlay */}
            <AnimatePresence>
              {showInfo && (
                <Panel position="top-center">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg shadow-2xl p-6 max-w-md border-2 border-blue-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-slate-900">How to Use</h3>
                      <button
                        onClick={() => setShowInfo(false)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        ✕
                      </button>
                    </div>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>• <strong>Select Level:</strong> Choose L0 (Context) or L1 (Process)</li>
                      <li>• <strong>Filter Streams:</strong> In L1, filter by retail/wholesale/operations</li>
                      <li>• <strong>Hover Nodes:</strong> See detailed information</li>
                      <li>• <strong>Click Nodes:</strong> Expand to view responsibilities</li>
                      <li>• <strong>Zoom & Pan:</strong> Use mouse wheel and drag</li>
                    </ul>
                  </motion.div>
                </Panel>
              )}
            </AnimatePresence>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
