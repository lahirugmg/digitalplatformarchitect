export function DataPlatformDiagram() {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label="Data Platform overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .lakehouse { fill: var(--primary-light); stroke: var(--primary); rx: 8; ry: 8; }
        .source { fill: var(--orange-light); stroke: var(--orange); rx: 4; ry: 4; }
        .edge { stroke: var(--text-secondary); stroke-width: 1.5; marker-end: url(#arrow); }
        .pipeline { stroke-dasharray: 2,2; }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
        </marker>
      </defs>

      {/* Data Sources */}
      <rect x="15" y="25" width="35" height="18" className="source" />
      <text x="32" y="36" textAnchor="middle" className="subtle">Apps</text>

      <rect x="15" y="55" width="35" height="18" className="source" />
      <text x="32" y="66" textAnchor="middle" className="subtle">APIs</text>

      <rect x="15" y="85" width="35" height="18" className="source" />
      <text x="32" y="96" textAnchor="middle" className="subtle">Streams</text>

      <rect x="15" y="115" width="35" height="18" className="source" />
      <text x="32" y="126" textAnchor="middle" className="subtle">Files</text>

      {/* Data Lakehouse */}
      <rect x="85" y="60" width="70" height="40" className="lakehouse" />
      <text x="120" y="75" textAnchor="middle" className="label">Data</text>
      <text x="120" y="87" textAnchor="middle" className="label">Lakehouse</text>
      <text x="120" y="97" textAnchor="middle" className="subtle">Bronze•Silver•Gold</text>

      {/* Consumption */}
      <rect x="185" y="25" width="40" height="18" className="box" />
      <text x="205" y="36" textAnchor="middle" className="subtle">BI</text>

      <rect x="185" y="55" width="40" height="18" className="box" />
      <text x="205" y="66" textAnchor="middle" className="subtle">ML</text>

      <rect x="185" y="85" width="40" height="18" className="box" />
      <text x="205" y="96" textAnchor="middle" className="subtle">APIs</text>

      <rect x="185" y="115" width="40" height="18" className="box" />
      <text x="205" y="126" textAnchor="middle" className="subtle">Reports</text>

      {/* Ingestion */}
      <line x1="50" y1="34" x2="85" y2="70" className="edge pipeline" />
      <line x1="50" y1="64" x2="85" y2="75" className="edge pipeline" />
      <line x1="50" y1="94" x2="85" y2="85" className="edge pipeline" />
      <line x1="50" y1="124" x2="85" y2="90" className="edge pipeline" />

      {/* Serving */}
      <line x1="155" y1="70" x2="185" y2="34" className="edge" />
      <line x1="155" y1="75" x2="185" y2="64" className="edge" />
      <line x1="155" y1="85" x2="185" y2="94" className="edge" />
      <line x1="155" y1="90" x2="185" y2="124" className="edge" />

      {/* Features */}
      <text x="120" y="150" textAnchor="middle" className="subtle">Lineage • Quality • Governance</text>
    </svg>
  );
}
