export function IntegrationDiagram() {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label="Enterprise Integration overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .hub { fill: var(--primary-light); stroke: var(--primary); rx: 8; ry: 8; }
        .system { fill: var(--surface-alt); stroke: var(--border-strong); rx: 4; ry: 4; }
        .edge { stroke: var(--text-secondary); stroke-width: 1.5; }
      `}</style>

      {/* Integration Hub */}
      <rect x="90" y="60" width="60" height="40" className="hub" />
      <text x="120" y="78" textAnchor="middle" className="label">Integration</text>
      <text x="120" y="90" textAnchor="middle" className="subtle">Hub</text>

      {/* Legacy Systems */}
      <rect x="20" y="20" width="50" height="25" className="system" />
      <text x="45" y="35" textAnchor="middle" className="subtle">Legacy</text>

      <rect x="20" y="115" width="50" height="25" className="system" />
      <text x="45" y="130" textAnchor="middle" className="subtle">ERP</text>

      {/* SaaS Systems */}
      <rect x="170" y="20" width="50" height="25" className="system" />
      <text x="195" y="35" textAnchor="middle" className="subtle">SaaS</text>

      <rect x="170" y="115" width="50" height="25" className="system" />
      <text x="195" y="130" textAnchor="middle" className="subtle">CRM</text>

      {/* Connections */}
      <line x1="70" y1="32" x2="90" y2="70" className="edge" />
      <line x1="70" y1="127" x2="90" y2="90" className="edge" />
      <line x1="150" y1="70" x2="170" y2="32" className="edge" />
      <line x1="150" y1="90" x2="170" y2="127" className="edge" />

      {/* Protocols */}
      <text x="120" y="150" textAnchor="middle" className="subtle">REST • SOAP • EDI • SFTP</text>
    </svg>
  );
}
