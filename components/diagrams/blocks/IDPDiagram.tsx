export function IDPDiagram() {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label="Internal Developer Platform overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .portal { fill: var(--primary-light); stroke: var(--primary); rx: 8; ry: 8; }
        .service { fill: var(--orange-light); stroke: var(--orange); rx: 4; ry: 4; }
        .edge { stroke: var(--text-secondary); stroke-width: 1.5; marker-end: url(#arrow); }
        .flow { stroke-dasharray: 2,2; }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
        </marker>
      </defs>

      {/* Developers */}
      <rect x="20" y="65" width="45" height="30" className="box" />
      <text x="42" y="78" textAnchor="middle" className="subtle">Dev</text>
      <text x="42" y="88" textAnchor="middle" className="subtle">Teams</text>

      {/* IDP Portal */}
      <rect x="90" y="60" width="60" height="40" className="portal" />
      <text x="120" y="75" textAnchor="middle" className="label">Developer</text>
      <text x="120" y="87" textAnchor="middle" className="label">Portal</text>
      <text x="120" y="97" textAnchor="middle" className="subtle">Self-Service</text>

      {/* Golden Paths */}
      <rect x="95" y="45" width="50" height="12" className="service" />
      <text x="120" y="53" textAnchor="middle" className="subtle">Golden Paths</text>

      {/* Platform Services */}
      <rect x="175" y="25" width="45" height="20" className="box" />
      <text x="197" y="37" textAnchor="middle" className="subtle">CI/CD</text>

      <rect x="175" y="55" width="45" height="20" className="box" />
      <text x="197" y="67" textAnchor="middle" className="subtle">K8s</text>

      <rect x="175" y="85" width="45" height="20" className="box" />
      <text x="197" y="97" textAnchor="middle" className="subtle">Observability</text>

      <rect x="175" y="115" width="45" height="20" className="box" />
      <text x="197" y="127" textAnchor="middle" className="subtle">Security</text>

      {/* Interactions */}
      <line x1="65" y1="80" x2="90" y2="80" className="edge" />
      
      <line x1="150" y1="70" x2="175" y2="35" className="edge flow" />
      <line x1="150" y1="75" x2="175" y2="65" className="edge flow" />
      <line x1="150" y1="85" x2="175" y2="95" className="edge flow" />
      <line x1="150" y1="90" x2="175" y2="125" className="edge flow" />

      {/* Features */}
      <text x="120" y="150" textAnchor="middle" className="subtle">Templates • Catalogs • Scorecards</text>
    </svg>
  );
}
