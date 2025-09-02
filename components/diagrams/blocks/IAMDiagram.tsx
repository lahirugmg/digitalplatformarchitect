export function IAMDiagram() {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label="Identity & Access Management overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .iam { fill: var(--primary-light); stroke: var(--primary); rx: 8; ry: 8; }
        .user { fill: var(--orange-light); stroke: var(--orange); rx: 4; ry: 4; }
        .edge { stroke: var(--text-secondary); stroke-width: 1.5; marker-end: url(#arrow); }
        .secure { stroke-dasharray: 3,3; }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
        </marker>
      </defs>

      {/* Users */}
      <rect x="20" y="30" width="35" height="18" className="user" />
      <text x="37" y="41" textAnchor="middle" className="subtle">Users</text>

      <rect x="20" y="70" width="35" height="18" className="user" />
      <text x="37" y="81" textAnchor="middle" className="subtle">Apps</text>

      <rect x="20" y="110" width="35" height="18" className="user" />
      <text x="37" y="121" textAnchor="middle" className="subtle">Services</text>

      {/* IAM Core */}
      <rect x="90" y="60" width="60" height="40" className="iam" />
      <text x="120" y="75" textAnchor="middle" className="label">IAM</text>
      <text x="120" y="87" textAnchor="middle" className="subtle">AuthN/AuthZ</text>
      <text x="120" y="97" textAnchor="middle" className="subtle">Federation</text>

      {/* Protected Resources */}
      <rect x="180" y="40" width="40" height="18" className="box" />
      <text x="200" y="51" textAnchor="middle" className="subtle">API</text>

      <rect x="180" y="70" width="40" height="18" className="box" />
      <text x="200" y="81" textAnchor="middle" className="subtle">Data</text>

      <rect x="180" y="100" width="40" height="18" className="box" />
      <text x="200" y="111" textAnchor="middle" className="subtle">Apps</text>

      {/* Authentication flows */}
      <line x1="55" y1="39" x2="90" y2="70" className="edge" />
      <line x1="55" y1="79" x2="90" y2="80" className="edge" />
      <line x1="55" y1="119" x2="90" y2="90" className="edge" />

      {/* Secure access */}
      <line x1="150" y1="70" x2="180" y2="49" className="edge secure" />
      <line x1="150" y1="80" x2="180" y2="79" className="edge secure" />
      <line x1="150" y1="90" x2="180" y2="109" className="edge secure" />

      {/* Protocols */}
      <text x="120" y="145" textAnchor="middle" className="subtle">OIDC • SAML • JWT • mTLS</text>
    </svg>
  );
}
