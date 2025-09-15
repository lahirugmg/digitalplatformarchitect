export function AIMLDiagram() {
  return (
    <svg viewBox="0 0 280 200" role="img" aria-label="AI/ML & Intelligent Services Platform overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .ai-box { fill: var(--surface-variant, #f5f5f5); stroke: var(--border, #e0e0e0); rx: 6; ry: 6; }
        .ml-box { fill: var(--surface-variant, #f5f5f5); stroke: var(--text-secondary, #666); rx: 6; ry: 6; }
        .edge { stroke: var(--text-secondary, #666); stroke-width: 1.5; marker-end: url(#arrow); }
        .data-edge { stroke: var(--primary, #1a73e8); stroke-width: 2; marker-end: url(#arrow); }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary, #666)" />
        </marker>
      </defs>

      {/* Data Sources */}
      <rect x="20" y="30" width="50" height="20" className="box" />
      <text x="45" y="42" textAnchor="middle" className="subtle">Training Data</text>

      <rect x="20" y="60" width="50" height="20" className="box" />
      <text x="45" y="72" textAnchor="middle" className="subtle">Real-time Data</text>

      <rect x="20" y="90" width="50" height="20" className="box" />
      <text x="45" y="102" textAnchor="middle" className="subtle">Feature Store</text>

      {/* ML Pipeline */}
      <rect x="90" y="40" width="45" height="25" className="ml-box" />
      <text x="112" y="50" textAnchor="middle" className="subtle">Data Prep</text>
      <text x="112" y="60" textAnchor="middle" className="subtle">& Training</text>

      <rect x="90" y="75" width="45" height="25" className="ml-box" />
      <text x="112" y="85" textAnchor="middle" className="subtle">Model</text>
      <text x="112" y="95" textAnchor="middle" className="subtle">Registry</text>

      {/* AI Services */}
      <rect x="155" y="25" width="45" height="20" className="ai-box" />
      <text x="177" y="37" textAnchor="middle" className="subtle">LLM APIs</text>

      <rect x="155" y="50" width="45" height="20" className="ai-box" />
      <text x="177" y="62" textAnchor="middle" className="subtle">Vision APIs</text>

      <rect x="155" y="75" width="45" height="20" className="ai-box" />
      <text x="177" y="87" textAnchor="middle" className="subtle">Speech APIs</text>

      <rect x="155" y="100" width="45" height="20" className="ai-box" />
      <text x="177" y="112" textAnchor="middle" className="subtle">Custom Models</text>

      {/* Applications */}
      <rect x="220" y="35" width="40" height="20" className="box" />
      <text x="240" y="47" textAnchor="middle" className="subtle">Chatbots</text>

      <rect x="220" y="65" width="40" height="20" className="box" />
      <text x="240" y="77" textAnchor="middle" className="subtle">Analytics</text>

      <rect x="220" y="95" width="40" height="20" className="box" />
      <text x="240" y="107" textAnchor="middle" className="subtle">Automation</text>

      {/* Orchestration Platform */}
      <rect x="90" y="130" width="110" height="25" className="ai-box" />
      <text x="145" y="142" textAnchor="middle" className="label">AI/ML Orchestration Platform</text>
      <text x="145" y="152" textAnchor="middle" className="subtle">Workflow • Monitoring • Governance</text>

      {/* Connections */}
      <line x1="70" y1="40" x2="90" y2="52" className="data-edge" />
      <line x1="70" y1="70" x2="90" y2="87" className="data-edge" />
      <line x1="70" y1="100" x2="90" y2="87" className="data-edge" />

      <line x1="135" y1="52" x2="155" y2="45" className="edge" />
      <line x1="135" y1="87" x2="155" y2="85" className="edge" />

      <line x1="200" y1="35" x2="220" y2="45" className="edge" />
      <line x1="200" y1="60" x2="220" y2="75" className="edge" />
      <line x1="200" y1="85" x2="220" y2="75" className="edge" />
      <line x1="200" y1="110" x2="220" y2="105" className="edge" />

      {/* Platform connections */}
      <line x1="112" y1="100" x2="145" y2="130" className="edge" />
      <line x1="177" y1="120" x2="145" y2="130" className="edge" />

      {/* Features */}
      <text x="140" y="180" textAnchor="middle" className="subtle">MLOps • AutoML • Model Serving • AI Governance</text>
    </svg>
  );
}