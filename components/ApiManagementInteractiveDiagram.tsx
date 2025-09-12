"use client";

import { useMemo, useState } from "react";

type Requirement =
  | "REST"
  | "GraphQL"
  | "Async"
  | "AI"
  | "MCP"
  | "Docs"
  | "Policies"
  | "Testing"
  | "Subscription"
  | "PolicySelection"
  | "TryOut"
  | "MCPHub"
  | "Lightweight"
  | "Distributed"
  | "Mediation"
  | "Ingress"
  | "Egress"
  | "Analytics"
  | "Monetization";

const publisherReqs: Requirement[] = [
  "REST",
  "GraphQL",
  "MCP",
  "AI",
  "Async",
  "Docs",
  "Policies",
  "Testing",
  "Ingress",
  "Egress",
];

const portalReqs: Requirement[] = [
  "Subscription",
  "PolicySelection",
  "TryOut",
  "MCPHub",
  "Analytics",
  "Monetization",
];

const gatewayReqs: Requirement[] = [
  "Lightweight",
  "Distributed",
  "Mediation",
];

const groups = {
  publisher: publisherReqs,
  portal: portalReqs,
  gateway: gatewayReqs,
};

function Chip({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={`chip ${active ? "active" : ""}`}
      onClick={onToggle}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export function ApiManagementInteractiveDiagram() {
  const [selected, setSelected] = useState<Set<Requirement>>(new Set());
  // Zoom & pan state for improved UX
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [panning, setPanning] = useState(false);
  const [start, setStart] = useState<{x:number;y:number;px:number;py:number}|null>(null);

  const toggle = (r: Requirement) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r);
      else next.add(r);
      return next;
    });
  };

  const isActive = (...keys: Requirement[]) =>
    keys.some((k) => selected.has(k)) || selected.size === 0; // show all when none selected


  const zoomIn = () => setZoom((z) => Math.min(2.5, +(z + 0.15).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.75, +(z - 0.15).toFixed(2)));
  const resetView = () => { setZoom(1); setPanX(0); setPanY(0); };
  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    setPanning(true);
    setStart({ x: e.clientX, y: e.clientY, px: panX, py: panY });
    (e.currentTarget as any).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!panning || !start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    setPanX(start.px + dx);
    setPanY(start.py + dy);
  };
  const onPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    setPanning(false);
    setStart(null);
    (e.currentTarget as any).releasePointerCapture?.(e.pointerId);
  };

  return (
    <section className="api-mgmt-interactive full-bleed">
      <div className="api-mgmt-intro">
        <h2 className="section-title centered">API Management Architecture</h2>
        <p className="section-description">
          Select requirements to highlight how a product like WSO2 or Kong satisfies them across Publisher, Gateway, and Developer Portal.
        </p>
      </div>

      <div className="api-mgmt-controls">
        <div className="controls-group">
          <h3 className="controls-title">API Publisher</h3>
          <div className="chips">
            {publisherReqs.map((r) => (
              <Chip key={r} label={r} active={selected.has(r)} onToggle={() => toggle(r)} />
            ))}
          </div>
        </div>
        <div className="controls-group">
          <h3 className="controls-title">Developer Portal</h3>
          <div className="chips">
            {portalReqs.map((r) => (
              <Chip key={r} label={r} active={selected.has(r)} onToggle={() => toggle(r)} />
            ))}
          </div>
        </div>
        <div className="controls-group">
          <h3 className="controls-title">Gateway</h3>
          <div className="chips">
            {gatewayReqs.map((r) => (
              <Chip key={r} label={r} active={selected.has(r)} onToggle={() => toggle(r)} />
            ))}
          </div>
        </div>
      </div>

      <div className="enhanced-block-diagram interactive api-mgmt-arch">
        <div className="diagram-header">
          <h3>API Management Architecture</h3>
          <p className="diagram-subtitle">Control Plane (left) and Data Plane (right) with ingress/egress gateways, analytics, and monetization.</p>
        </div>
        <div className="enhanced-diagram-container">
          <div className="diagram-toolbar">
            <button className="diagram-control-btn" title="Zoom Out" onClick={zoomOut}>−</button>
            <button className="diagram-control-btn" title="Reset View" onClick={resetView}>↻</button>
            <button className="diagram-control-btn" title="Zoom In" onClick={zoomIn}>+</button>
          </div>
          <svg
            viewBox="0 0 1200 700"
            role="img"
            aria-label="Interactive API Management diagram"
            preserveAspectRatio="xMidYMid meet"
            style={{ maxWidth: "1200px", touchAction: "none", cursor: panning ? "grabbing" : "grab" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <style>{`
              .section { 
                stroke: var(--border-strong); 
                stroke-width: 2;
                fill-opacity: 0.85;
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                rx: 20;
                ry: 20;
              }
              .cp { fill: #e3f2fd; stroke: #1976d2; }
              .dp { fill: #e0f7fa; stroke: #0097a7; }
              .portal { fill: #f3e5f5; stroke: #7b1fa2; }
              
              .title { 
                fill: var(--text); 
                font: 700 20px system-ui; 
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .section-title {
                fill: var(--text); 
                font: 600 16px system-ui; 
                text-shadow: 0 1px 2px rgba(0,0,0,0.08);
              }
              .label { 
                fill: var(--text); 
                font: 600 14px system-ui; 
                text-shadow: 0 1px 1px rgba(0,0,0,0.05);
              }
              .small { 
                fill: var(--text-secondary); 
                font: 500 13px system-ui; 
              }
              .micro { 
                fill: var(--text-muted); 
                font: 400 11px system-ui; 
              }
              
              .node { 
                fill: var(--surface); 
                stroke: var(--border); 
                stroke-width: 2;
                rx: 12; 
                ry: 12;
                filter: drop-shadow(0 3px 8px rgba(0,0,0,0.12));
                transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .node:hover {
                stroke: var(--primary);
                stroke-width: 3;
                filter: drop-shadow(0 6px 16px rgba(26, 115, 232, 0.2));
                transform: translateY(-2px);
              }
              .node.active { 
                stroke: var(--primary); 
                stroke-width: 3; 
                fill: var(--primary-light);
                filter: drop-shadow(0 8px 24px rgba(26, 115, 232, 0.3));
                animation: pulse 3s infinite;
              }
              .node.dim { 
                opacity: 0.25; 
                transition: opacity 0.4s ease;
              }
              
              .main-flow { 
                stroke: var(--primary); 
                stroke-width: 4; 
                marker-end: url(#arrow-primary);
                opacity: 0.8;
                transition: all 0.4s ease;
              }
              .main-flow.active {
                opacity: 1;
                stroke-width: 5;
                animation: mainFlow 2.5s infinite;
              }
              
              .edge { 
                stroke: var(--text-muted); 
                stroke-width: 2; 
                marker-end: url(#arrow);
                opacity: 0.6;
                transition: all 0.4s ease;
              }
              .edge.active { 
                stroke: var(--primary); 
                stroke-width: 3;
                opacity: 1;
                animation: flow 2s infinite;
              }
              
              .boundary { 
                stroke: var(--border); 
                stroke-dasharray: 12 8; 
                fill: transparent; 
                rx: 24; 
                ry: 24;
                stroke-width: 2;
                opacity: 0.7;
              }
              
              .capability-group {
                fill: var(--surface-variant);
                stroke: var(--border);
                stroke-width: 1;
                rx: 16;
                ry: 16;
                opacity: 0.9;
                transition: all 0.3s ease;
              }
              .capability-group:hover {
                opacity: 1;
                stroke: var(--primary);
              }
              
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.03); }
              }
              
              @keyframes flow {
                0% { stroke-dasharray: 6 6; stroke-dashoffset: 0; }
                100% { stroke-dasharray: 6 6; stroke-dashoffset: 12; }
              }
              
              @keyframes mainFlow {
                0% { stroke-dasharray: 12 12; stroke-dashoffset: 0; }
                100% { stroke-dasharray: 12 12; stroke-dashoffset: 24; }
              }
            `}</style>

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--text-muted)" />
              </marker>
              <marker id="arrow-primary" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L12,6 L0,12 z" fill="var(--primary)" />
              </marker>
              
              <linearGradient id="cpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e3f2fd" stopOpacity="1"/>
                <stop offset="100%" stopColor="#bbdefb" stopOpacity="0.8"/>
              </linearGradient>
              
              <linearGradient id="dpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0f7fa" stopOpacity="1"/>
                <stop offset="100%" stopColor="#b2ebf2" stopOpacity="0.8"/>
              </linearGradient>
              
              <linearGradient id="portalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3e5f5" stopOpacity="1"/>
                <stop offset="100%" stopColor="#e1bee7" stopOpacity="0.8"/>
              </linearGradient>
              
              <filter id="cardShadow">
                <feDropShadow dx="0" dy="6" stdDeviation="12" floodOpacity="0.15"/>
              </filter>
            </defs>

            <g transform={`translate(${panX} ${panY}) scale(${zoom})`}>
            
            {/* Main Architecture - Three Column Layout */}
            
            {/* Column 1: Control Plane */}
            <rect x="80" y="60" width="320" height="540" fill="url(#cpGradient)" className="section cp" filter="url(#cardShadow)" />
            <text x="90" y="85" className="section-title">Control Plane</text>
            
            {/* Developer Portal */}
            <rect x="100" y="110" width="280" height="120" className={`node ${isActive("Subscription", "PolicySelection", "TryOut", "MCPHub") ? "active" : selected.size ? "dim" : ""}`} />
            <text x="240" y="135" textAnchor="middle" className="title">Developer Portal</text>
            <text x="120" y="160" className="small">API Discovery & Consumption</text>
            <text x="120" y="180" className="small">Subscription Management</text>
            <text x="120" y="200" className="small">Testing & Documentation</text>
            
            {/* API Publisher */}
            <rect x="100" y="250" width="280" height="140" className={`node ${isActive("REST", "GraphQL", "Async", "AI", "MCP", "Docs", "Policies", "Testing") ? "active" : selected.size ? "dim" : ""}`} />
            <text x="240" y="275" textAnchor="middle" className="title">API Publisher</text>
            <text x="120" y="300" className="small">API Design & Lifecycle</text>
            <text x="120" y="320" className="small">Policy Management</text>
            <text x="120" y="340" className="small">Version Control</text>
            <text x="120" y="360" className="small">Testing & Analytics</text>
            
            {/* Management Services */}
            <rect x="100" y="410" width="280" height="100" className="node" />
            <text x="240" y="435" textAnchor="middle" className="label">Management Services</text>
            <text x="120" y="455" className="small">Key Management</text>
            <text x="120" y="475" className="small">User Management</text>
            <text x="120" y="495" className="small">Analytics & Monitoring</text>
            
            {/* Column 2: Gateway Layer */}
            <rect x="440" y="60" width="280" height="540" fill="url(#dpGradient)" className="section dp" filter="url(#cardShadow)" />
            <text x="450" y="85" className="section-title">Data Plane</text>
            
            {/* API Gateway */}
            <rect x="460" y="150" width="240" height="280" className={`node ${isActive("Lightweight", "Distributed", "Mediation", "Ingress", "Egress") ? "active" : selected.size ? "dim" : ""}`} />
            <text x="580" y="185" textAnchor="middle" className="title">API Gateway</text>
            
            {/* Gateway capabilities */}
            <rect x="480" y="210" width="200" height="80" className="capability-group" />
            <text x="580" y="230" textAnchor="middle" className="small">Traffic Management</text>
            <text x="580" y="250" textAnchor="middle" className="small">Security & Auth</text>
            <text x="580" y="270" textAnchor="middle" className="small">Rate Limiting</text>
            
            <rect x="480" y="310" width="200" height="80" className="capability-group" />
            <text x="580" y="330" textAnchor="middle" className="small">Protocol Translation</text>
            <text x="580" y="350" textAnchor="middle" className="small">Load Balancing</text>
            <text x="580" y="370" textAnchor="middle" className="small">Circuit Breaking</text>
            
            {/* Analytics */}
            <rect x="460" y="460" width="240" height="60" className={`node ${isActive("Analytics", "Monetization") ? "active" : selected.size ? "dim" : ""}`} />
            <text x="580" y="485" textAnchor="middle" className="label">Analytics & Billing</text>
            <text x="580" y="505" textAnchor="middle" className="small">Usage Analytics • Monetization</text>
            
            {/* Column 3: Clients & Services */}
            <rect x="760" y="60" width="280" height="540" className="boundary" />
            <text x="770" y="85" className="section-title">Clients & Services</text>
            
            {/* External Clients */}
            <rect x="780" y="110" width="240" height="100" className="node" />
            <text x="900" y="135" textAnchor="middle" className="label">External Clients</text>
            <text x="800" y="160" className="small">• Mobile Applications</text>
            <text x="800" y="180" className="small">• Web Applications</text>
            <text x="800" y="200" className="small">• Partner APIs</text>
            
            {/* Internal Services */}
            <rect x="780" y="240" width="240" height="100" className="node" />
            <text x="900" y="265" textAnchor="middle" className="label">Internal Services</text>
            <text x="800" y="290" className="small">• Microservices</text>
            <text x="800" y="310" className="small">• Legacy Systems</text>
            <text x="800" y="330" className="small">• Databases</text>
            
            {/* External Services */}
            <rect x="780" y="370" width="240" height="100" className="node" />
            <text x="900" y="395" textAnchor="middle" className="label">External Services</text>
            <text x="800" y="420" className="small">• AI/ML Services</text>
            <text x="800" y="440" className="small">• Third-party APIs</text>
            <text x="800" y="460" className="small">• Cloud Services</text>
            
            {/* Main Flow Connections */}
            <line x1="400" y1="180" x2="460" y2="180" className={`main-flow ${isActive("Subscription", "PolicySelection", "TryOut", "MCPHub") ? "active" : ""}`} />
            <line x1="400" y1="320" x2="460" y2="320" className={`main-flow ${isActive("REST", "GraphQL", "Async", "AI", "MCP", "Docs", "Policies", "Testing") ? "active" : ""}`} />
            
            <line x1="700" y1="160" x2="780" y2="160" className={`main-flow ${isActive("Ingress") ? "active" : ""}`} />
            <line x1="700" y1="290" x2="780" y2="290" className={`main-flow ${isActive("Ingress") ? "active" : ""}`} />
            <line x1="700" y1="420" x2="780" y2="420" className={`main-flow ${isActive("Egress") ? "active" : ""}`} />

            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
