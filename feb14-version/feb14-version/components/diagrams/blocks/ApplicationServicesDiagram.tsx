export function ApplicationServicesDiagram() {
  return (
    <svg viewBox="0 0 280 180" role="img" aria-label="Application Services Platform overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .service-box { fill: var(--surface-variant, #f5f5f5); stroke: var(--border, #e0e0e0); rx: 6; ry: 6; }
        .platform-box { fill: var(--surface-variant, #f5f5f5); stroke: var(--text-secondary, #666); rx: 6; ry: 6; }
        .edge { stroke: var(--text-secondary, #666); stroke-width: 1.5; marker-end: url(#arrow); }
        .mesh-edge { stroke: var(--primary, #1a73e8); stroke-width: 2; marker-end: url(#arrow); }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary, #666)" />
        </marker>
      </defs>

      {/* Client Applications */}
      <rect x="20" y="30" width="40" height="20" className="box" />
      <text x="40" y="42" textAnchor="middle" className="subtle">Web Apps</text>

      <rect x="20" y="60" width="40" height="20" className="box" />
      <text x="40" y="72" textAnchor="middle" className="subtle">Mobile</text>

      <rect x="20" y="90" width="40" height="20" className="box" />
      <text x="40" y="102" textAnchor="middle" className="subtle">APIs</text>

      {/* Service Mesh / Gateway */}
      <rect x="80" y="50" width="50" height="30" className="platform-box" />
      <text x="105" y="63" textAnchor="middle" className="label">Service</text>
      <text x="105" y="73" textAnchor="middle" className="label">Mesh</text>

      {/* Microservices */}
      <rect x="150" y="20" width="45" height="20" className="service-box" />
      <text x="172" y="32" textAnchor="middle" className="subtle">Auth Service</text>

      <rect x="150" y="45" width="45" height="20" className="service-box" />
      <text x="172" y="57" textAnchor="middle" className="subtle">User Service</text>

      <rect x="150" y="70" width="45" height="20" className="service-box" />
      <text x="172" y="82" textAnchor="middle" className="subtle">Order Service</text>

      <rect x="150" y="95" width="45" height="20" className="service-box" />
      <text x="172" y="107" textAnchor="middle" className="subtle">Payment Service</text>

      <rect x="150" y="120" width="45" height="20" className="service-box" />
      <text x="172" y="132" textAnchor="middle" className="subtle">Notification</text>

      {/* Data Layer */}
      <rect x="215" y="35" width="45" height="20" className="box" />
      <text x="237" y="47" textAnchor="middle" className="subtle">User DB</text>

      <rect x="215" y="65" width="45" height="20" className="box" />
      <text x="237" y="77" textAnchor="middle" className="subtle">Order DB</text>

      <rect x="215" y="95" width="45" height="20" className="box" />
      <text x="237" y="107" textAnchor="middle" className="subtle">Cache</text>

      <rect x="215" y="125" width="45" height="20" className="box" />
      <text x="237" y="137" textAnchor="middle" className="subtle">Queue</text>

      {/* Client to Service Mesh */}
      <line x1="60" y1="40" x2="80" y2="60" className="edge" />
      <line x1="60" y1="70" x2="80" y2="65" className="edge" />
      <line x1="60" y1="100" x2="80" y2="70" className="edge" />

      {/* Service Mesh to Services */}
      <line x1="130" y1="55" x2="150" y2="30" className="mesh-edge" />
      <line x1="130" y1="60" x2="150" y2="55" className="mesh-edge" />
      <line x1="130" y1="65" x2="150" y2="80" className="mesh-edge" />
      <line x1="130" y1="70" x2="150" y2="105" className="mesh-edge" />
      <line x1="130" y1="75" x2="150" y2="130" className="mesh-edge" />

      {/* Services to Data */}
      <line x1="195" y1="55" x2="215" y2="45" className="edge" />
      <line x1="195" y1="80" x2="215" y2="75" className="edge" />
      <line x1="195" y1="105" x2="215" y2="105" className="edge" />
      <line x1="195" y1="130" x2="215" y2="135" className="edge" />

      {/* Inter-service communication */}
      <line x1="172" y1="40" x2="172" y2="45" className="edge" strokeDasharray="3,3" />
      <line x1="172" y1="65" x2="172" y2="70" className="edge" strokeDasharray="3,3" />
      <line x1="172" y1="90" x2="172" y2="95" className="edge" strokeDasharray="3,3" />

      {/* Features */}
      <text x="140" y="165" textAnchor="middle" className="subtle">Load Balancing • Circuit Breaking • Observability • Security</text>
    </svg>
  );
}