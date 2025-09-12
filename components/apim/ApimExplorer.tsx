"use client";

import React, { useEffect, useMemo, useRef } from "react";
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, MarkerType, ReactFlowProvider } from "reactflow";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import { toPng, toSvg } from "html-to-image";
import { Code, User, UserCog } from "lucide-react";
import { useApimStore } from "./store";
import type { ArchSpec, EdgeKind, NodeSpec, Persona } from "@/lib/api-arch/schema";

type Spec = ArchSpec;

const edgeStyles: Record<EdgeKind, React.CSSProperties> = {
  data: { stroke: "var(--primary)", strokeWidth: 2 },
  control: { stroke: "var(--text-muted)", strokeDasharray: "6 6", strokeWidth: 2 },
  observability: { stroke: "var(--orange)", strokeDasharray: "2 6", strokeWidth: 2 },
  security: { stroke: "var(--green, #2e7d32)", strokeWidth: 2.5 },
  "ci-cd": { stroke: "var(--purple, #6a1b9a)", strokeDasharray: "8 4 2 4", strokeWidth: 2 }
};

const personaIcon = (p: Persona) => p === 'api-developer' ? <Code size={14}/> : p === 'api-product-manager' ? <UserCog size={14}/> : <User size={14}/>;

function useSpec(): [Spec | null, boolean] {
  const [spec, setSpec] = React.useState<Spec | null>(null);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    fetch("/data/apim-architecture.json").then(r => r.json()).then(setSpec).finally(()=>setLoading(false));
  }, []);
  return [spec, loading];
}

function assignPositions(nodes: NodeSpec[]): NodeSpec[] {
  const groupX: Record<string, number> = { personas: 20, 'control-plane': 280, 'data-plane': 620, clients: 980, backends: 980, observability: 580 };
  const startY: Record<string, number> = { personas: 120, 'control-plane': 80, 'data-plane': 120, clients: 120, backends: 360, observability: 600 };
  const gapY = 28;
  const yCursor: Record<string, number> = { ...startY };
  const estimateHeight = (n: NodeSpec) => 84 + Math.min(n.features?.length ?? 0, 3) * 18;
  return nodes.map(n => {
    if (n.position) return n;
    const g = n.group || n.plane;
    const x = groupX[g] ?? 280;
    const y = yCursor[g] ?? 80;
    yCursor[g] = y + estimateHeight(n) + gapY;
    return { ...n, position: { x, y } };
  });
}

function NodeCard({ spec }: { spec: NodeSpec }) {
  const { selectNode } = useApimStore();
  const primaryPersona = spec.personas?.[0];
  const tooltip = [spec.description, ...(spec.features?.map(f=>f.title) ?? [])].filter(Boolean).slice(0,4).join(" • ");
  return (
    <div role="button" tabIndex={0} title={tooltip} onClick={() => selectNode(spec.id)} style={{ padding: 12, minWidth: 200, cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems:'center', gap: 10, minHeight: 28, marginBottom: 6 }}>
        <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width: 26, height: 26, borderRadius: 8, background: 'var(--surface-variant)', border: '1px solid var(--border)' }}>
          {primaryPersona ? personaIcon(primaryPersona) : null}
        </span>
        <strong style={{ fontSize: 13 }}>{spec.title}</strong>
      </div>
      {spec.features?.length ? (
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-secondary)', lineHeight: 1.3, fontSize: 11, minHeight: 42 }}>
          {spec.features.slice(0,3).map(f => <li key={f.id}>{f.title}</li>)}
        </ul>
      ) : null}
    </div>
  );
}

const nodeTypes = { apimNode: ({ data }: any) => <NodeCard spec={data.spec} /> };

function buildGraph(spec: Spec, persona: ReturnType<typeof useApimStore.getState>["persona"], filters: ReturnType<typeof useApimStore.getState>["filters"], search: string, activeStep?: { highlightNodes: string[]; highlightEdges: string[]; }) {
  const nodesWithPos = assignPositions(spec.nodes);
  const fuse = new Fuse(nodesWithPos.map(n => ({ id: n.id, title: n.title, f: (n.features||[]).map(f=>f.title).join(' ') })), { keys:['title','f'], threshold: 0.35 });
  const searchIds = new Set<string>(search ? fuse.search(search).map(r=>r.item.id) : []);

  const shouldDimNode = (n: NodeSpec) => {
    if (!filters.planes[n.plane]) return true;
    if (persona !== 'all' && n.personas && !n.personas.includes(persona)) return true;
    if (search && searchIds.size && !searchIds.has(n.id)) return true;
    return false;
  };

  const hNodes = new Set(activeStep?.highlightNodes ?? []);
  const hEdges = new Set(activeStep?.highlightEdges ?? []);

  const rfNodes: Node[] = nodesWithPos.map(n => ({
    id: n.id,
    position: n.position!,
    type: 'apimNode',
    data: { spec: n },
    draggable: false,
    style: {
      width: 230,
      borderRadius: 10,
      border: hNodes.has(n.id) ? '2px solid var(--primary)' : '1px solid var(--border)',
      background: 'var(--surface)',
      boxShadow: hNodes.has(n.id) ? '0 6px 18px rgba(26,115,232,0.25)' : 'var(--shadow-sm)',
      opacity: hNodes.size ? (hNodes.has(n.id) ? 1 : 0.25) : (shouldDimNode(n) ? 0.3 : 1)
    }
  }));

  const rfEdges: Edge[] = spec.edges
    .filter(e => filters.edges[e.kind])
    .map(e => {
      const isDim = persona !== 'all' && e.personas && !e.personas.includes(persona);
      const style = { ...edgeStyles[e.kind] } as React.CSSProperties;
      if (e.dashed) style.strokeDasharray = style.strokeDasharray || '6 6';
      return {
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        markerEnd: { type: MarkerType.ArrowClosed, color: (style.stroke as string) || 'var(--text-muted)' },
        style: { ...style, opacity: hEdges.size ? (hEdges.has(e.id) ? 1 : 0.25) : (isDim ? 0.3 : 0.85) },
        animated: e.kind === 'data' || hEdges.has(e.id)
      } as Edge;
    });

  return { nodes: rfNodes, edges: rfEdges };
}

function Sidebar({ spec }: { spec: Spec }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { persona, setPersona, filters, togglePlane, toggleEdgeKind, flowId, setFlow, stepIndex, setStep, search, setSearch } = useApimStore();

  useEffect(()=>{
    const qp = new URLSearchParams(searchParams.toString());
    if (persona !== 'all') qp.set('persona', persona); else qp.delete('persona');
    if (flowId) qp.set('flow', flowId); else qp.delete('flow');
    if (flowId && stepIndex) qp.set('step', String(stepIndex)); else qp.delete('step');
    if (search) qp.set('search', search); else qp.delete('search');
    router.replace(`?${qp.toString()}`);
  }, [persona, flowId, stepIndex, search]);

  return (
    <aside className="controls-group" style={{ width: 280, alignSelf:'stretch', display:'flex', flexDirection:'column', gap: 14 }}>
      <div>
        <div className="controls-title" style={{ marginBottom: 8 }}>Persona</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap: 8 }}>
          {(['all','api-consumer','api-developer','api-product-manager'] as const).map(p => (
            <button key={p} className={`chip ${persona===p?'active':''}`} onClick={()=>setPersona(p)} aria-pressed={persona===p}>{p==='all'?'All':p.replace('api-','').replace('-', ' ')}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="controls-title" style={{ marginBottom: 8 }}>Layers</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap: 8 }}>
          {(Object.keys(filters.planes) as (keyof typeof filters.planes)[]).map(pl => (
            <button key={pl} className={`chip ${filters.planes[pl]?'active':''}`} onClick={()=>togglePlane(pl)}>{pl}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="controls-title" style={{ marginBottom: 8 }}>Edges</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap: 8 }}>
          {(Object.keys(filters.edges) as (keyof typeof filters.edges)[]).map(k => (
            <button key={k} className={`chip ${filters.edges[k]?'active':''}`} onClick={()=>toggleEdgeKind(k as EdgeKind)}>{k}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="controls-title" style={{ marginBottom: 8 }}>Flow</div>
        <div style={{ display:'flex', gap: 8, alignItems:'center', flexWrap:'wrap' }}>
          <select value={flowId||''} onChange={(e)=>setFlow(e.target.value || undefined)} style={{ padding:'0.4rem 0.6rem', borderRadius: 8, border:'1px solid var(--border)', flex:1 }}>
            <option value="">None</option>
            {spec.flows.map(f => <option key={f.id} value={f.id}>{f.title}</option>)}
          </select>
          {flowId && (
            <>
              <button className="chip" onClick={()=>setStep(Math.max(0, stepIndex-1))} disabled={stepIndex<=0}>Prev</button>
              <span style={{ fontSize: 12, color:'var(--text-secondary)' }}>Step {stepIndex+1}/{spec.flows.find(f=>f.id===flowId)?.steps.length}</span>
              <button className="chip" onClick={()=>setStep(Math.min((spec.flows.find(f=>f.id===flowId)?.steps.length||1)-1, stepIndex+1))}>Next</button>
            </>
          )}
        </div>
      </div>

      <div>
        <div className="controls-title" style={{ marginBottom: 8 }}>Search</div>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search nodes or features" aria-label="Search nodes" style={{ width:'100%', padding:'0.5rem 0.75rem', border:'1px solid var(--border)', borderRadius: 8 }} />
      </div>
    </aside>
  );
}

function DiagramInner() {
  const [spec, loading] = useSpec();
  const { persona, filters, flowId, stepIndex, search, selectedNodeId, selectNode, setFromQuery } = useApimStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{ setFromQuery(searchParams); }, []);

  const activeStep = useMemo(()=>{
    if (!spec || !flowId) return null;
    return spec.flows.find(f=>f.id===flowId)?.steps[stepIndex] || null;
  }, [spec, flowId, stepIndex]);

  const graph = useMemo(()=>{
    if (!spec) return { nodes: [], edges: [] };
    return buildGraph(spec, persona, filters, search, activeStep || undefined);
  }, [spec, persona, filters, search, activeStep]);

  const selectedSpec = useMemo(()=> spec?.nodes.find(n=>n.id===selectedNodeId) || null, [spec, selectedNodeId]);

  const exportPng = async () => { if (!containerRef.current) return; const d = await toPng(containerRef.current); const a = document.createElement('a'); a.href=d; a.download='apim-diagram.png'; a.click(); };
  const exportSvg = async () => { if (!containerRef.current) return; const d = await toSvg(containerRef.current); const a = document.createElement('a'); a.href=d; a.download='apim-diagram.svg'; a.click(); };

  if (loading) return <p>Loading diagram…</p>;
  if (!spec) return <p>Failed to load diagram.</p>;

  return (
    <section className="api-mgmt-interactive full-bleed" aria-label="Interactive API Management Diagram">
      <div className="api-mgmt-intro" style={{ textAlign:'center', marginBottom: 24 }}>
        <h1 className="page-title centered" style={{ marginBottom: 12 }}>API Management</h1>
        <p className="section-description" style={{ marginBottom: 16 }}>Explore Control Plane, Data Plane and Observability by persona, flow, and layer.</p>
      </div>

      <div className="api-mgmt-arch enhanced-block-diagram" style={{ position: 'relative' }}>
        <div className="enhanced-diagram-container" style={{ display:'flex', gap: 16, alignItems:'stretch' }}>
          <Sidebar spec={spec} />
          <div ref={containerRef} style={{ position:'relative', flex:1 }}>
            <ReactFlow nodes={graph.nodes} edges={graph.edges} nodeTypes={nodeTypes} fitView nodesDraggable={false} nodesConnectable={false} panOnDrag zoomOnPinch proOptions={{ hideAttribution: true }} />
            <div style={{ position:'absolute', top: 16, right: 16, display:'flex', gap: 8 }}>
              <button className="diagram-control-btn" onClick={exportPng}>Export PNG</button>
              <button className="diagram-control-btn" onClick={exportSvg}>Export SVG</button>
            </div>
          </div>
        </div>

        {activeStep && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding:'12px 16px', borderTop:'1px solid var(--border)' }}>
            <strong>Step {stepIndex+1}:</strong> <span style={{ color:'var(--text-secondary)' }}>{activeStep.narration}</span>
          </motion.div>
        )}
      </div>

      {selectedSpec && (
        <div role="dialog" aria-label={`${selectedSpec.title} details`} style={{ position:'fixed', top:0, right:0, bottom:0, width: 360, background:'var(--surface)', borderLeft:'1px solid var(--border)', zIndex: 200, padding: 16, overflow:'auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <h3 style={{ margin:0 }}>{selectedSpec.title}</h3>
            <button className="chip" onClick={()=>selectNode(undefined)}>Close</button>
          </div>
          {selectedSpec.description && <p style={{ marginTop: 6 }}>{selectedSpec.description}</p>}
          {selectedSpec.features && (
            <div>
              <h4>Features</h4>
              <ul>
                {selectedSpec.features.map(f => (
                  <li key={f.id}>
                    <strong>{f.title}</strong>
                    <div style={{ color:'var(--text-secondary)' }}>{f.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default function ApimExplorer() {
  return (
    <ReactFlowProvider>
      <DiagramInner />
    </ReactFlowProvider>
  );
}
