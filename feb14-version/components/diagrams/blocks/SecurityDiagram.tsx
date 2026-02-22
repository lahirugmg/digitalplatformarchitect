export function SecurityDiagram() {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label="Security Services overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .security { fill: var(--primary-light); stroke: var(--primary); rx: 8; ry: 8; }
        .shield { fill: var(--orange-light); stroke: var(--orange); rx: 4; ry: 4; }
        .edge { stroke: var(--text-secondary); stroke-width: 1.5; marker-end: url(#arrow); }
        .secure { stroke-dasharray: 3,3; stroke: var(--primary); }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
        </marker>
      </defs>

      {/* Applications */}
      <rect x="20" y="50" width="40" height="20" className="box" />
      <text x="40" y="62" textAnchor="middle" className="subtle">Apps</text>

      <rect x="20" y="90" width="40" height="20" className="box" />
      <text x="40" y="102" textAnchor="middle" className="subtle">Data</text>

      {/* Security Core */}
      <rect x="90" y="60" width="60" height="40" className="security" />
      <text x="120" y="75" textAnchor="middle" className="label">Security</text>
      <text x="120" y="87" textAnchor="middle" className="label">Services</text>
      <text x="120" y="97" textAnchor="middle" className="subtle">Zero Trust</text>

      {/* Security Components */}
      <rect x="85" y="30" width="25" height="15" className="shield" />
      <text x="97" y="40" textAnchor="middle" className="subtle">Vault</text>

      <rect x="125" y="30" width="25" height="15" className="shield" />
      <text x="137" y="40" textAnchor="middle" className="subtle">KMS</text>

      <rect x="85" y="115" width="25" height="15" className="shield" />
      <text x="97" y="125" textAnchor="middle" className="subtle">Policy</text>

      <rect x="125" y="115" width="25" height="15" className="shield" />
      <text x="137" y="125" textAnchor="middle" className="subtle">Scan</text>

      {/* Protected Resources */}
      <rect x="180" y="40" width="40" height="20" className="box" />
      <text x="200" y="52" textAnchor="middle" className="subtle">APIs</text>

      <rect x="180" y="70" width="40" height="20" className="box" />
      <text x="200" y="82" textAnchor="middle" className="subtle">Services</text>

      <rect x="180" y="100" width="40" height="20" className="box" />
      <text x="200" y="112" textAnchor="middle" className="subtle">Storage</text>

      {/* Security flows */}
      <line x1="60" y1="60" x2="90" y2="70" className="edge secure" />
      <line x1="60" y1="100" x2="90" y2="90" className="edge secure" />

      {/* Protection */}
      <line x1="150" y1="70" x2="180" y2="50" className="edge secure" />
      <line x1="150" y1="80" x2="180" y2="80" className="edge secure" />
      <line x1="150" y1="90" x2="180" y2="110" className="edge secure" />

      {/* Features */}
      <text x="120" y="150" textAnchor="middle" className="subtle">Encryption • Secrets • Compliance</text>
    </svg>
  );
}
