export function CloudNativeDiagram() {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label="Cloud-Native Platform Services overview">
      <style>{`
        .label { fill: var(--text); font: 600 11px system-ui; }
        .subtle { fill: var(--text-secondary); font: 500 9px system-ui; }
        .box { fill: var(--surface); stroke: var(--border); rx: 6; ry: 6; }
        .k8s { fill: var(--primary-light); stroke: var(--primary); rx: 8; ry: 8; }
        .workload { fill: var(--orange-light); stroke: var(--orange); rx: 4; ry: 4; }
        .edge { stroke: var(--text-secondary); stroke-width: 1.5; marker-end: url(#arrow); }
        .mesh { stroke-dasharray: 2,2; stroke: var(--primary); }
      `}</style>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
        </marker>
      </defs>

      {/* Kubernetes Cluster */}
      <rect x="70" y="50" width="100" height="60" className="k8s" />
      <text x="120" y="68" textAnchor="middle" className="label">Kubernetes</text>
      <text x="120" y="80" textAnchor="middle" className="label">Cluster</text>

      {/* Workloads */}
      <rect x="80" y="85" width="25" height="18" className="workload" />
      <text x="92" y="96" textAnchor="middle" className="subtle">Pod</text>

      <rect x="110" y="85" width="25" height="18" className="workload" />
      <text x="122" y="96" textAnchor="middle" className="subtle">Pod</text>

      <rect x="140" y="85" width="25" height="18" className="workload" />
      <text x="152" y="96" textAnchor="middle" className="subtle">Pod</text>

      {/* External Services */}
      <rect x="20" y="30" width="35" height="18" className="box" />
      <text x="37" y="41" textAnchor="middle" className="subtle">Users</text>

      <rect x="20" y="70" width="35" height="18" className="box" />
      <text x="37" y="81" textAnchor="middle" className="subtle">APIs</text>

      <rect x="20" y="110" width="35" height="18" className="box" />
      <text x="37" y="121" textAnchor="middle" className="subtle">Storage</text>

      {/* Platform Services */}
      <rect x="185" y="25" width="40" height="18" className="box" />
      <text x="205" y="36" textAnchor="middle" className="subtle">GitOps</text>

      <rect x="185" y="50" width="40" height="18" className="box" />
      <text x="205" y="61" textAnchor="middle" className="subtle">Mesh</text>

      <rect x="185" y="75" width="40" height="18" className="box" />
      <text x="205" y="86" textAnchor="middle" className="subtle">Ingress</text>

      <rect x="185" y="100" width="40" height="18" className="box" />
      <text x="205" y="111" textAnchor="middle" className="subtle">Policy</text>

      {/* Traffic flow */}
      <line x1="55" y1="39" x2="70" y2="60" className="edge" />
      <line x1="55" y1="79" x2="70" y2="80" className="edge" />
      <line x1="55" y1="119" x2="70" y2="100" className="edge" />

      {/* Service mesh */}
      <line x1="105" y1="94" x2="122" y2="94" className="mesh" />
      <line x1="135" y1="94" x2="152" y2="94" className="mesh" />

      {/* Platform integration */}
      <line x1="170" y1="60" x2="185" y2="34" className="edge" />
      <line x1="170" y1="70" x2="185" y2="59" className="edge" />
      <line x1="170" y1="80" x2="185" y2="84" className="edge" />
      <line x1="170" y1="90" x2="185" y2="109" className="edge" />

      {/* Features */}
      <text x="120" y="145" textAnchor="middle" className="subtle">Auto-scaling • mTLS • Zero Downtime</text>
    </svg>
  );
}
