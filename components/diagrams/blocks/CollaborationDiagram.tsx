export function CollaborationDiagram() {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label="Collaboration & Knowledge Platforms overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .platform { fill: var(--primary-light); stroke: var(--primary); rx: 8; ry: 8; }
        .user { fill: var(--orange-light); stroke: var(--orange); rx: 4; ry: 4; }
        .edge { stroke: var(--text-secondary); stroke-width: 1.5; marker-end: url(#arrow); }
        .workflow { stroke-dasharray: 2,2; }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
        </marker>
      </defs>

      {/* Users */}
      <rect x="20" y="40" width="40" height="18" className="user" />
      <text x="40" y="51" textAnchor="middle" className="subtle">Teams</text>

      <rect x="20" y="70" width="40" height="18" className="user" />
      <text x="40" y="81" textAnchor="middle" className="subtle">Experts</text>

      <rect x="20" y="100" width="40" height="18" className="user" />
      <text x="40" y="111" textAnchor="middle" className="subtle">Stakeholders</text>

      {/* Knowledge Platform */}
      <rect x="90" y="60" width="60" height="40" className="platform" />
      <text x="120" y="75" textAnchor="middle" className="label">Knowledge</text>
      <text x="120" y="87" textAnchor="middle" className="label">Platform</text>
      <text x="120" y="97" textAnchor="middle" className="subtle">Search • Workflow</text>

      {/* Content Types */}
      <rect x="95" y="30" width="25" height="15" className="box" />
      <text x="107" y="40" textAnchor="middle" className="subtle">Docs</text>

      <rect x="125" y="30" width="25" height="15" className="box" />
      <text x="137" y="40" textAnchor="middle" className="subtle">Wiki</text>

      <rect x="95" y="115" width="25" height="15" className="box" />
      <text x="107" y="125" textAnchor="middle" className="subtle">Process</text>

      <rect x="125" y="115" width="25" height="15" className="box" />
      <text x="137" y="125" textAnchor="middle" className="subtle">Templates</text>

      {/* Outputs */}
      <rect x="180" y="40" width="40" height="18" className="box" />
      <text x="200" y="51" textAnchor="middle" className="subtle">Decisions</text>

      <rect x="180" y="70" width="40" height="18" className="box" />
      <text x="200" y="81" textAnchor="middle" className="subtle">Standards</text>

      <rect x="180" y="100" width="40" height="18" className="box" />
      <text x="200" y="111" textAnchor="middle" className="subtle">Workflows</text>

      {/* Collaboration flows */}
      <line x1="60" y1="49" x2="90" y2="70" className="edge" />
      <line x1="60" y1="79" x2="90" y2="80" className="edge" />
      <line x1="60" y1="109" x2="90" y2="90" className="edge" />

      {/* Knowledge delivery */}
      <line x1="150" y1="70" x2="180" y2="49" className="edge" />
      <line x1="150" y1="80" x2="180" y2="79" className="edge" />
      <line x1="150" y1="90" x2="180" y2="109" className="edge workflow" />

      {/* Features */}
      <text x="120" y="150" textAnchor="middle" className="subtle">BPMN • Taxonomy • Discovery</text>
    </svg>
  );
}
