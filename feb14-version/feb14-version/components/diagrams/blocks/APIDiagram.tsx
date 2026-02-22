export function APIDiagram() {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label="API Management overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .gateway { fill: var(--primary-light); stroke: var(--primary); rx: 6; ry: 6; }
        .edge { stroke: var(--text-secondary); stroke-width: 1.5; marker-end: url(#arrow); }
        .policy { fill: var(--orange-light); stroke: var(--orange); rx: 3; ry: 3; }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
        </marker>
      </defs>

      {/* Clients */}
      <rect x="20" y="30" width="40" height="20" className="box" />
      <text x="40" y="42" textAnchor="middle" className="subtle">Mobile</text>

      <rect x="20" y="70" width="40" height="20" className="box" />
      <text x="40" y="82" textAnchor="middle" className="subtle">Web</text>

      <rect x="20" y="110" width="40" height="20" className="box" />
      <text x="40" y="122" textAnchor="middle" className="subtle">API</text>

      {/* API Gateway */}
      <rect x="90" y="60" width="60" height="40" className="gateway" />
      <text x="120" y="78" textAnchor="middle" className="label">API</text>
      <text x="120" y="90" textAnchor="middle" className="label">Gateway</text>

      {/* Policies */}
      <rect x="100" y="45" width="40" height="12" className="policy" />
      <text x="120" y="53" textAnchor="middle" className="subtle">Policies</text>

      {/* Backend Services */}
      <rect x="180" y="45" width="40" height="20" className="box" />
      <text x="200" y="57" textAnchor="middle" className="subtle">Service A</text>

      <rect x="180" y="80" width="40" height="20" className="box" />
      <text x="200" y="92" textAnchor="middle" className="subtle">Service B</text>

      <rect x="180" y="115" width="40" height="20" className="box" />
      <text x="200" y="127" textAnchor="middle" className="subtle">Service C</text>

      {/* Connections */}
      <line x1="60" y1="40" x2="90" y2="70" className="edge" />
      <line x1="60" y1="80" x2="90" y2="80" className="edge" />
      <line x1="60" y1="120" x2="90" y2="90" className="edge" />

      <line x1="150" y1="70" x2="180" y2="55" className="edge" />
      <line x1="150" y1="80" x2="180" y2="90" className="edge" />
      <line x1="150" y1="90" x2="180" y2="125" className="edge" />

      {/* Features */}
      <text x="120" y="150" textAnchor="middle" className="subtle">Auth • Rate Limiting • Analytics</text>
    </svg>
  );
}
