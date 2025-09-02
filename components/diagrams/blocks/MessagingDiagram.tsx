export function MessagingDiagram() {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label="Messaging & Streaming Platform overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .queue { fill: var(--primary-light); stroke: var(--primary); rx: 4; ry: 4; }
        .stream { fill: var(--orange-light); stroke: var(--orange); rx: 4; ry: 4; }
        .edge { stroke: var(--text-secondary); stroke-width: 1.5; marker-end: url(#arrow); }
        .security { fill: var(--surface-alt); stroke: var(--border-strong); stroke-dasharray: 2,2; }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
        </marker>
      </defs>

      {/* Security boundary */}
      <rect x="5" y="5" width="230" height="150" className="security" />
      <text x="10" y="18" className="subtle">🔒 Security & Observability</text>

      {/* Producers */}
      <rect x="20" y="35" width="50" height="20" className="box" />
      <text x="45" y="47" textAnchor="middle" className="subtle">Apps</text>

      {/* Message Queue */}
      <rect x="90" y="30" width="60" height="30" className="queue" />
      <text x="120" y="47" textAnchor="middle" className="label">Queues</text>

      {/* Stream */}
      <rect x="90" y="80" width="60" height="30" className="stream" />
      <text x="120" y="97" textAnchor="middle" className="label">Streams</text>

      {/* Consumers */}
      <rect x="170" y="35" width="50" height="20" className="box" />
      <text x="195" y="47" textAnchor="middle" className="subtle">Services</text>

      <rect x="170" y="90" width="50" height="20" className="box" />
      <text x="195" y="102" textAnchor="middle" className="subtle">Analytics</text>

      {/* Connections */}
      <line x1="70" y1="45" x2="90" y2="45" className="edge" />
      <line x1="70" y1="45" x2="90" y2="95" className="edge" />
      <line x1="150" y1="45" x2="170" y2="45" className="edge" />
      <line x1="150" y1="95" x2="170" y2="100" className="edge" />

      {/* Labels */}
      <text x="120" y="130" textAnchor="middle" className="subtle">TLS/mTLS • RBAC • Tracing</text>
    </svg>
  );
}
