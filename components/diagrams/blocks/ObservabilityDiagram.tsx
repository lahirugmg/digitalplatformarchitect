export function ObservabilityDiagram() {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label="Observability & Operations overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .observability { fill: var(--primary-light); stroke: var(--primary); rx: 8; ry: 8; }
        .telemetry { fill: var(--orange-light); stroke: var(--orange); rx: 4; ry: 4; }
        .edge { stroke: var(--text-secondary); stroke-width: 1.5; marker-end: url(#arrow); }
        .data-flow { stroke-dasharray: 2,2; }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
        </marker>
      </defs>

      {/* Applications */}
      <rect x="15" y="40" width="40" height="20" className="box" />
      <text x="35" y="52" textAnchor="middle" className="subtle">Apps</text>

      <rect x="15" y="70" width="40" height="20" className="box" />
      <text x="35" y="82" textAnchor="middle" className="subtle">Services</text>

      <rect x="15" y="100" width="40" height="20" className="box" />
      <text x="35" y="112" textAnchor="middle" className="subtle">Infra</text>

      {/* Telemetry Collection */}
      <rect x="75" y="45" width="40" height="15" className="telemetry" />
      <text x="95" y="55" textAnchor="middle" className="subtle">Metrics</text>

      <rect x="75" y="70" width="40" height="15" className="telemetry" />
      <text x="95" y="80" textAnchor="middle" className="subtle">Traces</text>

      <rect x="75" y="95" width="40" height="15" className="telemetry" />
      <text x="95" y="105" textAnchor="middle" className="subtle">Logs</text>

      {/* Observability Platform */}
      <rect x="135" y="60" width="60" height="40" className="observability" />
      <text x="165" y="75" textAnchor="middle" className="label">Observability</text>
      <text x="165" y="87" textAnchor="middle" className="label">Platform</text>
      <text x="165" y="97" textAnchor="middle" className="subtle">Alerts • SLOs</text>

      {/* Outputs */}
      <rect x="85" y="20" width="50" height="15" className="box" />
      <text x="110" y="30" textAnchor="middle" className="subtle">Dashboards</text>

      <rect x="155" y="20" width="50" height="15" className="box" />
      <text x="180" y="30" textAnchor="middle" className="subtle">Incidents</text>

      {/* Data collection */}
      <line x1="55" y1="50" x2="75" y2="52" className="edge data-flow" />
      <line x1="55" y1="80" x2="75" y2="77" className="edge data-flow" />
      <line x1="55" y1="110" x2="75" y2="102" className="edge data-flow" />

      {/* Telemetry to platform */}
      <line x1="115" y1="52" x2="135" y2="70" className="edge" />
      <line x1="115" y1="77" x2="135" y2="80" className="edge" />
      <line x1="115" y1="102" x2="135" y2="90" className="edge" />

      {/* Alerting */}
      <line x1="155" y1="60" x2="130" y2="35" className="edge" />
      <line x1="175" y1="60" x2="180" y2="35" className="edge" />

      {/* Features */}
      <text x="120" y="145" textAnchor="middle" className="subtle">MTTD • MTTR • SLA Monitoring</text>
    </svg>
  );
}
