export function ObservabilityDiagram() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Comprehensive Observability & Operations Architecture">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .label-sm { fill: var(--text); font: 600 9px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .micro { fill: var(--text-secondary); font: 400 7px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .platform { fill: var(--primary-light); stroke: var(--primary); rx: 8; ry: 8; }
        .collector { fill: var(--orange-light); stroke: var(--orange); rx: 4; ry: 4; }
        .backend { fill: var(--purple-light); stroke: var(--purple); rx: 6; ry: 6; }
        .signal { fill: var(--green-light); stroke: var(--green); rx: 3; ry: 3; }
        .edge { stroke: var(--text-secondary); stroke-width: 1.5; marker-end: url(#arrow); }
        .data-flow { stroke-dasharray: 3,2; stroke: var(--primary); }
        .correlation { stroke: var(--purple); stroke-width: 2; }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
        </marker>
      </defs>

      {/* Multi-Layer Sources */}
      <text x="10" y="15" className="label-sm">Sources</text>
      
      {/* Network Layer */}
      <rect x="10" y="25" width="50" height="18" className="box" />
      <text x="35" y="32" textAnchor="middle" className="subtle">Network</text>
      <text x="35" y="41" textAnchor="middle" className="micro">TCP L4 • eBPF</text>

      {/* Application Layer */}
      <rect x="10" y="50" width="50" height="18" className="box" />
      <text x="35" y="57" textAnchor="middle" className="subtle">Application</text>
      <text x="35" y="66" textAnchor="middle" className="micro">APIs • Gateway</text>

      {/* Service Layer */}
      <rect x="10" y="75" width="50" height="18" className="box" />
      <text x="35" y="82" textAnchor="middle" className="subtle">Services</text>
      <text x="35" y="91" textAnchor="middle" className="micro">Microservices</text>

      {/* Infrastructure Layer */}
      <rect x="10" y="100" width="50" height="18" className="box" />
      <text x="35" y="107" textAnchor="middle" className="subtle">Runtime</text>
      <text x="35" y="116" textAnchor="middle" className="micro">K8s • JVM • DB</text>

      {/* Collectors */}
      <text x="80" y="15" className="label-sm">Collection</text>
      
      <rect x="75" y="25" width="45" height="15" className="collector" />
      <text x="97" y="35" textAnchor="middle" className="micro">eBPF Agents</text>

      <rect x="75" y="45" width="45" height="15" className="collector" />
      <text x="97" y="55" textAnchor="middle" className="micro">OTel SDK</text>

      <rect x="75" y="65" width="45" height="15" className="collector" />
      <text x="97" y="75" textAnchor="middle" className="micro">OTel Collector</text>

      <rect x="75" y="85" width="45" height="15" className="collector" />
      <text x="97" y="95" textAnchor="middle" className="micro">DataDog Agent</text>

      {/* Signals */}
      <text x="140" y="15" className="label-sm">Signals</text>
      
      <rect x="135" y="25" width="35" height="12" className="signal" />
      <text x="152" y="33" textAnchor="middle" className="micro">Metrics</text>

      <rect x="135" y="40" width="35" height="12" className="signal" />
      <text x="152" y="48" textAnchor="middle" className="micro">Traces</text>

      <rect x="135" y="55" width="35" height="12" className="signal" />
      <text x="152" y="63" textAnchor="middle" className="micro">Logs</text>

      <rect x="135" y="70" width="35" height="12" className="signal" />
      <text x="152" y="78" textAnchor="middle" className="micro">Profiles</text>

      <rect x="135" y="85" width="35" height="12" className="signal" />
      <text x="152" y="93" textAnchor="middle" className="micro">Events</text>

      {/* Backends */}
      <text x="190" y="15" className="label-sm">Backends</text>
      
      <rect x="185" y="25" width="50" height="15" className="backend" />
      <text x="210" y="35" textAnchor="middle" className="micro">DataDog Suite</text>

      <rect x="185" y="45" width="50" height="15" className="backend" />
      <text x="210" y="55" textAnchor="middle" className="micro">ELK Stack</text>

      <rect x="185" y="65" width="50" height="15" className="backend" />
      <text x="210" y="75" textAnchor="middle" className="micro">Prometheus</text>

      <rect x="185" y="85" width="50" height="15" className="backend" />
      <text x="210" y="95" textAnchor="middle" className="micro">Jaeger/Tempo</text>

      {/* Correlation Engine */}
      <rect x="250" y="45" width="60" height="30" className="platform" />
      <text x="280" y="57" textAnchor="middle" className="label-sm">Correlation</text>
      <text x="280" y="67" textAnchor="middle" className="label-sm">Engine</text>
      <text x="280" y="77" textAnchor="middle" className="micro">Service • Env • Version</text>

      {/* Outputs */}
      <text x="40" y="140" className="label-sm">Outputs</text>
      
      <rect x="10" y="150" width="45" height="15" className="box" />
      <text x="32" y="160" textAnchor="middle" className="micro">Dashboards</text>

      <rect x="65" y="150" width="45" height="15" className="box" />
      <text x="87" y="160" textAnchor="middle" className="micro">Alerts</text>

      <rect x="120" y="150" width="45" height="15" className="box" />
      <text x="142" y="160" textAnchor="middle" className="micro">SLOs</text>

      <rect x="175" y="150" width="45" height="15" className="box" />
      <text x="197" y="160" textAnchor="middle" className="micro">Incidents</text>

      <rect x="230" y="150" width="45" height="15" className="box" />
      <text x="252" y="160" textAnchor="middle" className="micro">Runbooks</text>

      {/* Data Flows */}
      {/* Sources to Collectors */}
      <line x1="60" y1="34" x2="75" y2="32" className="edge data-flow" />
      <line x1="60" y1="59" x2="75" y2="52" className="edge data-flow" />
      <line x1="60" y1="84" x2="75" y2="72" className="edge data-flow" />
      <line x1="60" y1="109" x2="75" y2="92" className="edge data-flow" />

      {/* Collectors to Signals */}
      <line x1="120" y1="35" x2="135" y2="40" className="edge" />
      <line x1="120" y1="55" x2="135" y2="55" className="edge" />
      <line x1="120" y1="75" x2="135" y2="70" className="edge" />

      {/* Signals to Backends */}
      <line x1="170" y1="35" x2="185" y2="40" className="edge" />
      <line x1="170" y1="50" x2="185" y2="55" className="edge" />
      <line x1="170" y1="65" x2="185" y2="70" className="edge" />
      <line x1="170" y1="80" x2="185" y2="85" className="edge" />

      {/* Backends to Correlation */}
      <line x1="235" y1="45" x2="250" y2="55" className="edge correlation" />
      <line x1="235" y1="65" x2="250" y2="65" className="edge correlation" />

      {/* Correlation to Outputs */}
      <line x1="270" y1="75" x2="200" y2="150" className="edge" />

      {/* Features */}
      <text x="160" y="185" textAnchor="middle" className="subtle">MTTD • MTTR • PII Scrubbing • Intelligent Sampling</text>
      <text x="160" y="195" textAnchor="middle" className="subtle">Cross-Layer Correlation • Chaos Testing • Error Budgets</text>
    </svg>
  );
}
