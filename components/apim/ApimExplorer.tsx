"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  Edge,
  MarkerType,
  ReactFlowProvider,
  useReactFlow
} from "reactflow";
import "reactflow/dist/style.css";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { toPng, toSvg } from "html-to-image";
import { Code, User, UserCog, Search, Play, Pause, SkipBack, SkipForward, Download, X } from "lucide-react";
import { useApimStore, type PersonaFilter } from "./store";
import type { ArchSpec, EdgeKind, NodeSpec, Persona, Plane } from "@/lib/api-arch/schema";

type Spec = ArchSpec;

// Enhanced color scheme with proper CSS variable fallbacks
const planeColors: Record<Plane, { bg: string; border: string }> = {
  control: { bg: "var(--blue-light, #e3f2fd)", border: "var(--blue, #1976d2)" },
  data: { bg: "var(--teal-light, #e0f2f1)", border: "var(--teal, #00796b)" },
  support: { bg: "var(--surface-variant, #f5f5f5)", border: "var(--border, #e0e0e0)" }
};

// Enhanced edge styling with proper visual distinction
const edgeStyles: Record<EdgeKind, React.CSSProperties> = {
  data: { 
    stroke: "var(--primary, #1a73e8)", 
    strokeWidth: 3,
    strokeDasharray: "none"
  },
  control: { 
    stroke: "var(--text-muted, #666)", 
    strokeDasharray: "8 6", 
    strokeWidth: 2 
  },
  observability: { 
    stroke: "var(--orange, #f57c00)", 
    strokeDasharray: "3 3", 
    strokeWidth: 2 
  },
  security: { 
    stroke: "var(--green, #2e7d32)", 
    strokeWidth: 3.5,
    strokeDasharray: "none"
  },
  "ci-cd": { 
    stroke: "var(--purple, #6a1b9a)", 
    strokeDasharray: "10 4 2 4", 
    strokeWidth: 2 
  }
};

const personaIcons = {
  "api-developer": <Code size={14} />,
  "api-product-manager": <UserCog size={14} />,
  "api-consumer": <User size={14} />
};

// Hook to load APIM architecture spec
function useSpec(): [Spec | null, boolean, string | null] {
  const [spec, setSpec] = useState<Spec | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/data/apim-architecture.json")
      .then((r) => r.json())
      .then((json) => { if (mounted) setSpec(json); })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return [spec, loading, error];
}

// Enhanced position assignment with proper swimlanes
function assignPositions(nodes: NodeSpec[]): NodeSpec[] {
  const groupColumns: Record<string, number> = {
    personas: 40,
    'control-plane': 300,
    'data-plane': 680,
    clients: 1020,
    backends: 1020,
    observability: 600
  };

  const groupStartY: Record<string, number> = {
    personas: 120,
    'control-plane': 80,
    'data-plane': 140,
    clients: 140,
    backends: 380,
    observability: 620
  };

  const verticalGap = 110;
  const yCursors: Record<string, number> = { ...groupStartY };

  const estimateNodeHeight = (node: NodeSpec) => {
    const featuresHeight = Math.min(node.features?.length ?? 0, 3) * 20;
    return 90 + featuresHeight;
  };

  return nodes.map((node) => {
    if (node.position) return node;

    const group = node.group || node.plane;
    const x = groupColumns[group] ?? (node.plane === 'control' ? 300 : node.plane === 'data' ? 680 : 100);
    const currentY = yCursors[group] ?? 80;
    
    yCursors[group] = currentY + estimateNodeHeight(node) + verticalGap;
    
    return { ...node, position: { x, y: currentY } };
  });
}

// Enhanced graph building with proper filtering and highlighting
function buildGraph(
  spec: Spec,
  persona: PersonaFilter,
  filters: ReturnType<typeof useApimStore.getState>["filters"],
  highlightNodes = new Set<string>(),
  highlightEdges = new Set<string>(),
  searchTerm = ""
): { nodes: Node[]; edges: Edge[] } {
  const nodesWithPos = assignPositions(spec.nodes);

  // Fuzzy search implementation
  const fuse = new Fuse(
    nodesWithPos.map((n) => ({
      id: n.id,
      title: n.title,
      features: (n.features || []).map((f) => f.title).join(" "),
      description: n.description || ""
    })),
    { 
      keys: ["title", "features", "description"], 
      threshold: 0.3,
      includeScore: true 
    }
  );
  
  const searchMatches = new Set<string>(
    searchTerm ? fuse.search(searchTerm).map((r) => r.item.id) : []
  );

  // Enhanced node filtering logic
  const shouldDimNode = (node: NodeSpec) => {
    if (!filters.planes[node.plane]) return true;
    if (persona !== "all" && node.personas && !node.personas.includes(persona)) return true;
    if (searchTerm && searchMatches.size && !searchMatches.has(node.id)) return true;
    return false;
  };

  // Create React Flow nodes with enhanced styling
  const rfNodes: Node[] = nodesWithPos.map((node) => {
    const isHighlighted = highlightNodes.has(node.id);
    const isDimmed = shouldDimNode(node);
    const hasHighlights = highlightNodes.size > 0;
    
    let opacity = 1;
    if (hasHighlights) {
      opacity = isHighlighted ? 1 : 0.25;
    } else if (isDimmed) {
      opacity = 0.3;
    }

    return {
      id: node.id,
      position: node.position!,
      type: "apimNode",
      data: { 
        spec: node, 
        highlight: isHighlighted,
        searchMatch: searchMatches.has(node.id)
      },
      draggable: false,
      style: {
        opacity,
        borderRadius: 12,
        border: isHighlighted 
          ? "3px solid var(--primary)" 
          : searchMatches.has(node.id)
          ? "2px solid var(--orange)"
          : "1px solid var(--border)",
        background: "var(--surface)",
        boxShadow: isHighlighted 
          ? "0 8px 24px rgba(26,115,232,0.3)" 
          : searchMatches.has(node.id)
          ? "0 6px 18px rgba(245,124,0,0.2)"
          : "var(--shadow-sm)",
        width: 260,
        transition: "all 0.3s ease"
      }
    };
  });

  // Create React Flow edges with enhanced styling
  const rfEdges: Edge[] = spec.edges
    .filter((edge) => filters.edges[edge.kind])
    .map((edge) => {
      const isHighlighted = highlightEdges.has(edge.id);
      const isDimmed = persona !== "all" && edge.personas && !edge.personas.includes(persona);
      const hasHighlights = highlightEdges.size > 0;
      
      let opacity = 0.85;
      if (hasHighlights) {
        opacity = isHighlighted ? 1 : 0.25;
      } else if (isDimmed) {
        opacity = 0.3;
      }

      const style = { ...edgeStyles[edge.kind] };
      if (edge.dashed) {
        style.strokeDasharray = style.strokeDasharray || "6 6";
      }

      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        type: "smoothstep",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: edge.kind === 'security' ? 22 : 20,
          height: edge.kind === 'security' ? 22 : 20,
          color: (style.stroke as string) || "var(--text-muted)"
        },
        style: { ...style, opacity },
        animated: isHighlighted || (edge.kind === "data" && !hasHighlights),
        data: { kind: edge.kind, personas: edge.personas }
      } as Edge;
    });

  // Add swimlane background nodes
  const swimlaneNodes = createSwimlaneNodes(nodesWithPos);

  return { 
    nodes: [...swimlaneNodes, ...rfNodes], 
    edges: rfEdges 
  };
}

// Create swimlane background nodes
function createSwimlaneNodes(nodes: NodeSpec[]): Node[] {
  type BoundingBox = { minX: number; minY: number; maxX: number; maxY: number };
  const groupBounds: Record<string, BoundingBox> = {};
  const groupNodes: Record<string, Node[]> = {};

  // Group nodes by their group/plane
  nodes.forEach((node) => {
    const group = node.group || node.plane;
    if (!groupNodes[group]) groupNodes[group] = [];
    
    const rfNode: Node = {
      id: node.id,
      position: node.position!,
      data: {},
      type: 'default'
    };
    
    groupNodes[group].push(rfNode);
  });

  // Calculate bounding boxes for each group
  Object.entries(groupNodes).forEach(([group, groupNodeList]) => {
    if (groupNodeList.length === 0) return;
    
    const positions = groupNodeList.map((n) => n.position);
    const nodeWidth = 260;
    const nodeHeight = 100;
    
    const minX = Math.min(...positions.map((p) => p.x)) - 30;
    const minY = Math.min(...positions.map((p) => p.y)) - 50;
    const maxX = Math.max(...positions.map((p) => p.x)) + nodeWidth + 30;
    const maxY = Math.max(...positions.map((p) => p.y)) + nodeHeight + 50;
    
    groupBounds[group] = { minX, minY, maxX, maxY };
  });

  // Group labels mapping
  const groupLabels: Record<string, string> = {
    'personas': 'Personas',
    'control-plane': 'APIM Control Plane',
    'data-plane': 'APIM Data Plane',
    'clients': 'Client Applications',
    'backends': 'Backend Services',
    'observability': 'Analytics & Monetization'
  };

  // Create swimlane background nodes
  return Object.entries(groupBounds).map(([group, bounds]) => ({
    id: `swimlane-${group}`,
    position: { x: bounds.minX, y: bounds.minY },
    type: "swimlaneNode",
    data: { 
      label: groupLabels[group] || group,
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY,
      group
    },
    style: { zIndex: -1 },
    draggable: false,
    selectable: false
  }));
}

// Enhanced Node Card Component
function NodeCard({ spec, highlight, searchMatch }: { 
  spec: NodeSpec; 
  highlight?: boolean; 
  searchMatch?: boolean; 
}) {
  const { selectNode } = useApimStore();
  const primaryPersona = spec.personas?.[0];
  const planeColor = planeColors[spec.plane];
  
  const tooltipContent = [
    spec.description,
    ...(spec.features?.slice(0, 3).map(f => f.title) ?? [])
  ].filter(Boolean).join(" • ");

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      tabIndex={0}
      role="button"
      aria-label={`${spec.title} node. Click for details.`}
      onClick={() => selectNode(spec.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectNode(spec.id);
        }
      }}
      title={tooltipContent}
      style={{ 
        padding: 16, 
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header with icon and title */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 12, 
        marginBottom: 12 
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          borderRadius: 10,
          background: planeColor.bg,
          border: `2px solid ${planeColor.border}`,
          fontSize: 14
        }}>
          {primaryPersona ? personaIcons[primaryPersona] : 
           spec.plane.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ 
            fontSize: 14, 
            fontWeight: 700, 
            marginBottom: 2,
            color: "var(--text)"
          }}>
            {spec.title}
          </div>
          {spec.personas && (
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {spec.personas.slice(0, 2).map(p => (
                <span key={p} style={{
                  fontSize: 10,
                  padding: '2px 6px',
                  background: planeColor.bg,
                  borderRadius: 8,
                  color: planeColor.border,
                  fontWeight: 500
                }}>
                  {p.replace('api-', '').replace('-', ' ')}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features list */}
      {spec.features && spec.features.length > 0 && (
        <div style={{ flex: 1 }}>
          <ul style={{ 
            margin: 0, 
            paddingLeft: 0,
            listStyle: 'none',
            color: "var(--text-secondary)", 
            fontSize: 12,
            lineHeight: 1.4
          }}>
            {spec.features.slice(0, 3).map((feature) => (
              <li key={feature.id} style={{ 
                marginBottom: 6,
                paddingLeft: 16,
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: 2,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: planeColor.border
                }} />
                {feature.title}
              </li>
            ))}
            {spec.features.length > 3 && (
              <li style={{ 
                marginTop: 8, 
                fontSize: 11, 
                fontStyle: 'italic',
                color: 'var(--text-muted)'
              }}>
                +{spec.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

// Swimlane background component
function SwimlaneNode({ data }: { data: any }) {
  const groupColors: Record<string, { bg: string; border: string; text: string }> = {
    'control-plane': { 
      bg: 'rgba(25, 118, 210, 0.04)', 
      border: 'rgba(25, 118, 210, 0.2)', 
      text: 'var(--blue, #1976d2)' 
    },
    'data-plane': { 
      bg: 'rgba(0, 121, 107, 0.04)', 
      border: 'rgba(0, 121, 107, 0.2)', 
      text: 'var(--teal, #00796b)' 
    },
    'personas': { 
      bg: 'rgba(156, 39, 176, 0.04)', 
      border: 'rgba(156, 39, 176, 0.2)', 
      text: 'var(--purple, #9c27b0)' 
    },
    'clients': { 
      bg: 'rgba(245, 124, 0, 0.04)', 
      border: 'rgba(245, 124, 0, 0.2)', 
      text: 'var(--orange, #f57c00)' 
    },
    'backends': { 
      bg: 'rgba(46, 125, 50, 0.04)', 
      border: 'rgba(46, 125, 50, 0.2)', 
      text: 'var(--green, #2e7d32)' 
    },
    'observability': { 
      bg: 'rgba(121, 85, 72, 0.04)', 
      border: 'rgba(121, 85, 72, 0.2)', 
      text: 'var(--brown, #795548)' 
    }
  };

  const colors = groupColors[data.group] || groupColors['control-plane'];

  return (
    <div
      style={{
        width: data.width,
        height: data.height,
        background: colors.bg,
        border: `2px dashed ${colors.border}`,
        borderRadius: 16,
        position: 'relative',
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -12,
          left: 16,
          background: 'var(--surface)',
          padding: '4px 12px',
          borderRadius: 12,
          fontSize: 12,
          fontWeight: 700,
          color: colors.text,
          border: `2px solid ${colors.border}`
        }}
      >
        {data.label}
      </div>
    </div>
  );
}

// Node types for React Flow
const nodeTypes = {
  apimNode: ({ data }: any) => <NodeCard {...data} />,
  swimlaneNode: ({ data }: any) => <SwimlaneNode data={data} />
};

// Enhanced Side Drawer Component
function SideDrawer({ spec, onClose }: { spec: NodeSpec | null; onClose: () => void }) {
  const { setFlow } = useApimStore();
  
  if (!spec) return null;
  
  const planeColor = planeColors[spec.plane];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: 420 }}
        animate={{ x: 0 }}
        exit={{ x: 420 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        role="dialog" 
        aria-label={`${spec.title} details`} 
        style={{ 
          position: "fixed", 
          top: 64, 
          right: 0, 
          bottom: 0, 
          width: "min(420px, 90vw)", 
          background: "var(--surface)", 
          borderLeft: "1px solid var(--border)", 
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)", 
          zIndex: 200, 
          padding: "0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(100vh - 64px)"
        }}
      >
        {/* Header */}
        <div style={{ 
          padding: "24px", 
          borderBottom: "1px solid var(--border)",
          background: planeColor.bg
        }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "flex-start", 
            marginBottom: 16 
          }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: 22, 
                fontWeight: 800, 
                color: planeColor.border 
              }}>
                {spec.title}
              </h3>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 8, 
                marginTop: 8 
              }}>
                <span style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  width: 24, 
                  height: 24, 
                  borderRadius: 6, 
                  background: "var(--surface)",
                  border: `2px solid ${planeColor.border}`,
                  fontSize: 12,
                  fontWeight: 600,
                  color: planeColor.border
                }}>
                  {spec.plane.charAt(0).toUpperCase()}
                </span>
                <span style={{ 
                  fontSize: 14, 
                  color: planeColor.border, 
                  textTransform: 'capitalize',
                  fontWeight: 600
                }}>
                  {spec.plane} Plane
                </span>
              </div>
            </div>
            <button 
              onClick={onClose} 
              aria-label="Close" 
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}
            >
              <X size={16} />
            </button>
          </div>

          {spec.personas && spec.personas.length > 0 && (
            <div>
              <h4 style={{ 
                fontSize: 12, 
                fontWeight: 600, 
                marginBottom: 8,
                textTransform: 'uppercase',
                color: 'var(--text-secondary)'
              }}>
                Primary Personas
              </h4>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {spec.personas.map(p => (
                  <span key={p} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    fontSize: 12,
                    fontWeight: 500
                  }}>
                    {personaIcons[p]}
                    {p.replace('api-', '').replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Scrollable content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {spec.description && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ 
                marginBottom: 0, 
                lineHeight: 1.6, 
                color: 'var(--text-secondary)',
                fontSize: 14
              }}>
                {spec.description}
              </p>
            </div>
          )}
          
          {spec.features && spec.features.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ 
                fontSize: 16, 
                fontWeight: 600, 
                marginBottom: 16,
                color: 'var(--text)'
              }}>
                Features & Capabilities
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {spec.features.map((f) => (
                  <div key={f.id} style={{
                    padding: 16,
                    background: 'var(--surface-variant)',
                    borderRadius: 12,
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ 
                      fontSize: 14, 
                      fontWeight: 600, 
                      marginBottom: 6,
                      color: 'var(--text)'
                    }}>
                      {f.title}
                    </div>
                    <div style={{ 
                      color: "var(--text-secondary)", 
                      fontSize: 13, 
                      lineHeight: 1.5,
                      marginBottom: f.personas ? 8 : 0
                    }}>
                      {f.description}
                    </div>
                    {f.personas && (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {f.personas.map(p => (
                          <span key={p} style={{
                            fontSize: 11,
                            padding: '3px 8px',
                            background: 'var(--surface)',
                            borderRadius: 10,
                            color: 'var(--text-muted)',
                            fontWeight: 500
                          }}>
                            {p.replace('api-', '')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {spec.links && spec.links.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ 
                fontSize: 16, 
                fontWeight: 600, 
                marginBottom: 12,
                color: 'var(--text)'
              }}>
                Related Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {spec.links.map((l, idx) => (
                  <a key={idx} href={l.href} target="_blank" rel="noreferrer" style={{
                    padding: '12px 16px',
                    background: 'var(--surface-variant)',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontSize: 14,
                    border: '1px solid var(--border)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'var(--text)'
                  }}>
                    <span>{l.label}</span>
                    <span style={{ opacity: 0.6 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer with action button */}
        <div style={{ 
          padding: '24px', 
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)'
        }}>
          <button 
            onClick={() => {
              // Find flows that highlight this node
              const relevantFlows = (window as any).apimSpec?.flows?.filter((f: any) => 
                f.steps.some((s: any) => s.highlightNodes.includes(spec.id))
              ) || [];
              if (relevantFlows.length > 0) {
                setFlow(relevantFlows[0].id);
                onClose();
              }
            }}
            style={{
              width: '100%',
              padding: '12px 20px',
              background: planeColor.border,
              color: 'white',
              border: 'none',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Play size={16} />
            Show me in a flow
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Enhanced Toolbar Component
function Toolbar({ spec }: { spec: Spec }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    persona, setPersona, 
    filters, togglePlane, toggleEdgeKind, 
    flowId, setFlow, stepIndex, setStep, 
    search, setSearch 
  } = useApimStore();

  // Store spec globally for drawer access
  useEffect(() => {
    (window as any).apimSpec = spec;
  }, [spec]);

  // URL synchronization with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const qp = new URLSearchParams(searchParams.toString());
      if (persona && persona !== "all") qp.set("persona", persona); else qp.delete("persona");
      if (flowId) qp.set("flow", flowId); else qp.delete("flow");
      if (stepIndex && flowId) qp.set("step", String(stepIndex)); else qp.delete("step");
      if (search && search.trim()) qp.set("search", search.trim()); else qp.delete("search");
      
      router.replace(`?${qp.toString()}`);
    }, search ? 300 : 0);
    
    return () => clearTimeout(timeoutId);
  }, [persona, flowId, stepIndex, search, router, searchParams]);

  const currentFlow = flowId ? spec.flows.find(f => f.id === flowId) : null;
  const canGoPrev = stepIndex > 0;
  const canGoNext = currentFlow && stepIndex < currentFlow.steps.length - 1;

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: '16px',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'sticky',
      top: 64,
      maxHeight: 'calc(100vh - 64px)',
      overflow: 'auto'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Persona Selection */}
        <div>
          <label style={{ 
            display: 'block',
            fontSize: 12, 
            fontWeight: 700, 
            marginBottom: 8,
            textTransform: 'uppercase',
            color: 'var(--text-secondary)'
          }}>
            Persona
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(["all", "api-consumer", "api-developer", "api-product-manager"] as const).map((p) => (
              <button 
                key={p} 
                className={`chip ${persona === p ? 'active' : ''}`}
                onClick={() => setPersona(p)} 
                aria-pressed={persona === p}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 12px',
                  fontSize: 12,
                  fontWeight: persona === p ? 600 : 400,
                  borderRadius: 20,
                  border: '1px solid var(--border)',
                  background: persona === p ? 'var(--primary)' : 'var(--surface)',
                  color: persona === p ? 'white' : 'var(--text)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {p !== 'all' && personaIcons[p as Persona]}
                {p === "all" ? "All" : p.replace(/api-/, '').replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Layer Filters */}
        <div>
          <label style={{ 
            display: 'block',
            fontSize: 12, 
            fontWeight: 700, 
            marginBottom: 8,
            textTransform: 'uppercase',
            color: 'var(--text-secondary)'
          }}>
            Layers
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(Object.keys(filters.planes) as (keyof typeof filters.planes)[]).map((pl) => (
              <button 
                key={pl} 
                onClick={() => togglePlane(pl)}
                style={{
                  padding: '8px 12px',
                  fontSize: 12,
                  fontWeight: filters.planes[pl] ? 600 : 400,
                  borderRadius: 20,
                  border: '1px solid var(--border)',
                  background: filters.planes[pl] ? planeColors[pl].border : 'var(--surface)',
                  color: filters.planes[pl] ? 'white' : 'var(--text)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize'
                }}
              >
                {pl}
              </button>
            ))}
          </div>
        </div>

        {/* Edge Type Filters */}
        <div>
          <label style={{ 
            display: 'block',
            fontSize: 12, 
            fontWeight: 700, 
            marginBottom: 8,
            textTransform: 'uppercase',
            color: 'var(--text-secondary)'
          }}>
            Connections
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(Object.keys(filters.edges) as EdgeKind[]).map((k) => (
              <button 
                key={k} 
                onClick={() => toggleEdgeKind(k)}
                style={{
                  padding: '8px 12px',
                  fontSize: 12,
                  fontWeight: filters.edges[k] ? 600 : 400,
                  borderRadius: 20,
                  border: `1px solid ${edgeStyles[k].stroke}`,
                  background: filters.edges[k] ? edgeStyles[k].stroke as string : 'var(--surface)',
                  color: filters.edges[k] ? 'white' : edgeStyles[k].stroke as string,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flow Player Controls */}
      <div style={{ 
        marginTop: 20, 
        paddingTop: 20, 
        borderTop: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 16,
        alignItems: 'center'
      }}>
        <div>
          <label style={{ 
            display: 'block',
            fontSize: 12, 
            fontWeight: 700, 
            marginBottom: 8,
            textTransform: 'uppercase',
            color: 'var(--text-secondary)'
          }}>
            Guided Flow
          </label>
          <select 
            value={flowId || ''} 
            onChange={(e) => setFlow(e.target.value || undefined)} 
            style={{ 
              padding: '8px 12px', 
              borderRadius: 20, 
              border: '1px solid var(--border)', 
              background: 'var(--surface-variant)',
              fontSize: 13,
              minWidth: 200,
              fontFamily: 'inherit'
            }}
          >
            <option value="">Choose a flow to explore...</option>
            {spec.flows.map((f) => <option key={f.id} value={f.id}>{f.title}</option>)}
          </select>
        </div>

        {/* Flow Navigation */}
        {currentFlow && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button 
              onClick={() => setStep(Math.max(0, stepIndex - 1))} 
              disabled={!canGoPrev}
              style={{
                padding: '8px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: canGoPrev ? 'var(--surface)' : 'var(--surface-variant)',
                cursor: canGoPrev ? 'pointer' : 'not-allowed',
                opacity: canGoPrev ? 1 : 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Previous step"
            >
              <SkipBack size={16} />
            </button>
            
            <span style={{ 
              fontSize: 12, 
              fontWeight: 600, 
              color: 'var(--text-secondary)', 
              whiteSpace: 'nowrap',
              minWidth: 60,
              textAlign: 'center'
            }}>
              {stepIndex + 1} / {currentFlow.steps.length}
            </span>
            
            <button 
              onClick={() => setStep(Math.min(currentFlow.steps.length - 1, stepIndex + 1))} 
              disabled={!canGoNext}
              style={{
                padding: '8px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: canGoNext ? 'var(--surface)' : 'var(--surface-variant)',
                cursor: canGoNext ? 'pointer' : 'not-allowed',
                opacity: canGoNext ? 1 : 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Next step"
            >
              <SkipForward size={16} />
            </button>
          </div>
        )}

        {/* Search */}
        <div style={{ gridColumn: '1 / -1', marginTop: 8 }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ 
              position: 'absolute', 
              left: 12, 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)'
            }} />
            <input 
              aria-label="Search nodes" 
              placeholder="Search nodes or features..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              style={{ 
                width: '100%',
                padding: '10px 12px 10px 36px', 
                border: '1px solid var(--border)', 
                borderRadius: 24,
                fontSize: 14,
                background: 'var(--surface-variant)',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit'
              }} 
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(26,115,232,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)'
                }}
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Diagram Component
function DiagramInner() {
  const [spec, loading, error] = useSpec();
  const { 
    persona, filters, selectedNodeId, selectNode, 
    flowId, stepIndex, setFromQuery, search, setStep, setPersona 
  } = useApimStore();
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const rf = useReactFlow();

  // Initialize from URL params
  useEffect(() => {
    setFromQuery(searchParams);
  }, [setFromQuery, searchParams]);

  // Get current active step
  const activeStep = useMemo(() => {
    if (!spec || !flowId) return null;
    return spec.flows.find(f => f.id === flowId)?.steps[stepIndex] || null;
  }, [spec, flowId, stepIndex]);

  // Build graph with current state
  const { nodes, edges } = useMemo(() => {
    if (!spec) return { nodes: [], edges: [] };
    const hNodes = new Set(activeStep?.highlightNodes ?? []);
    const hEdges = new Set(activeStep?.highlightEdges ?? []);
    return buildGraph(spec, persona, filters, hNodes, hEdges, search);
  }, [spec, persona, filters, activeStep, search]);

  // Auto-fit view when active step changes
  useEffect(() => {
    if (!activeStep || !rf) return;
    
    const timeoutId = setTimeout(() => {
      try {
        rf.fitView({ 
          nodes: activeStep.highlightNodes.map(id => ({ id })), 
          duration: 800, 
          padding: 0.2 
        });
      } catch (e) {
        // Fallback if nodes not found
        rf.fitView({ duration: 800, padding: 0.1 });
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [activeStep, rf]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || 
          (e.target as HTMLElement)?.tagName === 'SELECT') return;
      
      if (e.key === 'Escape') {
        e.preventDefault();
        selectNode(undefined);
      }
      
      if (activeStep && spec) {
        const currentFlow = spec.flows.find(f => f.id === flowId);
        if (!currentFlow) return;
        
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          if (stepIndex < currentFlow.steps.length - 1) {
            setStep(stepIndex + 1);
          }
        }
        
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (stepIndex > 0) {
            setStep(stepIndex - 1);
          }
        }
      }
      
      // Quick persona switching (1-4 keys)
      if (e.key >= '1' && e.key <= '4' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const personas: PersonaFilter[] = ['all', 'api-consumer', 'api-developer', 'api-product-manager'];
        const persona = personas[parseInt(e.key) - 1];
        if (persona) setPersona(persona);
      }
      
      // Focus search with '/' key
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const searchInput = document.querySelector('input[aria-label="Search nodes"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeStep, stepIndex, flowId, spec, selectNode, setStep, setPersona]);

  // Get selected node spec
  const selectedSpec = useMemo(() => 
    spec?.nodes.find(n => n.id === selectedNodeId) || null, 
    [selectedNodeId, spec]
  );

  // Export functions
  const exportPng = async () => {
    if (!containerRef.current) return;
    try {
      const dataUrl = await toPng(containerRef.current, { 
        cacheBust: true, 
        backgroundColor: "white",
        quality: 1.0,
        pixelRatio: 2
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `api-management-${persona}-${Date.now()}.png`;
      a.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const exportSvg = async () => {
    if (!containerRef.current) return;
    try {
      const dataUrl = await toSvg(containerRef.current, { 
        cacheBust: true, 
        backgroundColor: "white"
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `api-management-${persona}-${Date.now()}.svg`;
      a.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (loading) return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: 400,
      color: 'var(--text-secondary)'
    }}>
      Loading diagram...
    </div>
  );
  
  if (error || !spec) return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: 400,
      color: 'var(--text-secondary)'
    }}>
      Error loading diagram. Please try again.
    </div>
  );

  return (
    <div 
      className="api-mgmt-interactive full-bleed"
      role="application"
      aria-label="Interactive API Management Architecture Diagram"
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 className="page-title" style={{ 
          marginBottom: 12,
          fontSize: 'clamp(24px, 4vw, 32px)'
        }}>
          API Management
        </h1>
        <p style={{ 
          marginBottom: 20, 
          color: 'var(--text-secondary)',
          fontSize: 'clamp(14px, 2vw, 16px)',
          maxWidth: 600,
          margin: '0 auto 20px'
        }}>
          Explore the Control Plane, Data Plane and Observability by persona, flow, and layer.
        </p>
        
        {/* Keyboard shortcuts help */}
        <details style={{ 
          marginTop: 16,
          fontSize: 12,
          color: 'var(--text-muted)'
        }}>
          <summary style={{ cursor: 'pointer', userSelect: 'none' }}>
            Keyboard shortcuts
          </summary>
          <div style={{ 
            marginTop: 8,
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap'
          }}>
            <span><kbd>/</kbd> Search</span>
            <span><kbd>←→</kbd> Navigate flows</span>
            <span><kbd>Esc</kbd> Close details</span>
            <span><kbd>1-4</kbd> Switch personas</span>
          </div>
        </details>
      </div>

      {/* Controls + Diagram in a two-column layout */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', marginBottom: activeStep ? 0 : 32 }}>
        {/* Left vertical sidebar */}
        <div style={{ width: 280, flex: '0 0 280px' }}>
          <Toolbar spec={spec} />
        </div>
        {/* Diagram canvas on the right */}
        <div 
          ref={containerRef}
          style={{
            flex: 1,
            height: "clamp(500px, 70vh, 900px)",
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            position: 'relative',
            background: 'var(--surface)'
          }}
        >
          <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            nodeTypes={nodeTypes} 
            fitView 
            nodesDraggable={false} 
            nodesConnectable={false} 
            panOnDrag 
            zoomOnPinch
            minZoom={0.1}
            maxZoom={1.5}
            attributionPosition="top-right"
            proOptions={{ hideAttribution: true }}
            onNodeClick={(event, node) => {
              if (node.type === 'apimNode') {
                selectNode(node.id);
                const qp = new URLSearchParams(searchParams.toString());
                qp.set('selected', node.id);
                router.replace(`?${qp.toString()}`);
              }
            }}
            onPaneClick={() => {
              selectNode(undefined);
              const qp = new URLSearchParams(searchParams.toString());
              qp.delete('selected');
              router.replace(`?${qp.toString()}`);
            }}
          >
            <Background gap={24} color="var(--border)" variant={BackgroundVariant.Dots} size={1} />
            <MiniMap pannable zoomable style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}
              nodeColor={(node) => {
                if (node.type === 'swimlaneNode') return 'transparent';
                const nodeSpec = spec.nodes.find(n => n.id === node.id);
                return nodeSpec ? planeColors[nodeSpec.plane].border : 'var(--surface-variant)';
              }}
            />
            <Controls showInteractive={false} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }} />
          </ReactFlow>
          {/* Export Controls */}
          <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8, zIndex: 10 }}>
            <button onClick={exportPng} style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 6 }} title="Export as PNG">
              <Download size={14} />
              PNG
            </button>
            <button onClick={exportSvg} style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 6 }} title="Export as SVG">
              <Download size={14} />
              SVG
            </button>
          </div>
        </div>
      </div>

      {/* Flow Narration */}
      {activeStep && (
        <div style={{ padding: '20px 24px', borderTop: '3px solid var(--primary)', background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-variant) 100%)', borderRadius: '0 0 16px 16px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ minWidth: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800 }}>
              {stepIndex + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>
                {spec.flows.find((f) => f.id === flowId)?.title} - Step {stepIndex + 1}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                {activeStep.narration}
              </div>
            </div>
          </div>
        </div>
      )}
    {/* Side Drawer */}
    <SideDrawer spec={selectedSpec} onClose={() => selectNode(undefined)} />
  </div>
  );
}

// Main Export Component
export default function ApimExplorer() {
  return (
    <ReactFlowProvider>
      <DiagramInner />
    </ReactFlowProvider>
  );
}
