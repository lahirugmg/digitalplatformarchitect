type Props = { title?: string };

function ArrowDefs() {
  return (
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--text-muted, #6b7280)" />
      </marker>
    </defs>
  );
}

const baseStyles = `
  .label { fill: var(--text, #0f172a); font: 600 14px system-ui; }
  .small { fill: var(--text-secondary, #334155); font: 500 12px system-ui; }
  .box { fill: var(--surface, #fff); stroke: var(--border, #e5e7eb); stroke-width: 2; rx: 12; ry: 12; }
  .block { fill: var(--surface-variant, #f8fafc); stroke: var(--border, #e5e7eb); stroke-width: 2; rx: 14; ry: 14; }
  .edge { stroke: var(--text-muted, #6b7280); stroke-width: 2; marker-end: url(#arrow); opacity: .8 }
  .edge-sync { stroke-dasharray: none; }
  .edge-async { stroke-dasharray: 6 4; }
  .edge-batch { stroke-dasharray: 2 6; }
  .cap { font: 700 16px system-ui; fill: var(--text, #0f172a); }
  .legend { fill: none; stroke: var(--border, #e5e7eb); stroke-width: 1.5; rx: 10; ry: 10; }
  .legend-title { font: 700 12px system-ui; fill: var(--text-secondary, #334155); }
  .legend-label { font: 500 11px system-ui; fill: var(--text-secondary, #334155); }
  .datastore-fill { fill: var(--surface, #fff); }
  .datastore-stroke { stroke: var(--border, #e5e7eb); stroke-width: 2; }
`;

export function BusinessL0Diagram(_: Props) {
  return (
    <svg viewBox="0 0 900 480" role="img" aria-label="Business Architecture L0" style={{ width: '100%', height: 'auto' }}>
      <style>{baseStyles}</style>
      <ArrowDefs />

      <text x="450" y="44" textAnchor="middle" className="cap">Business Architecture — L0</text>

      {/* Experiences */}
      <rect x="40" y="80" width="240" height="90" className="block" />
      <text x="160" y="126" textAnchor="middle" className="label">Customer & Partner Channels</text>
      {/* Actor icon inside channels */}
      <g transform="translate(70,108)">
        <circle cx="0" cy="0" r="10" fill="none" stroke="#94a3b8" strokeWidth="2" />
        <line x1="0" y1="10" x2="0" y2="28" stroke="#94a3b8" strokeWidth="2" />
        <line x1="-12" y1="18" x2="12" y2="18" stroke="#94a3b8" strokeWidth="2" />
      </g>

      {/* Core capabilities */}
      <rect x="330" y="80" width="240" height="90" className="block" />
      <text x="450" y="115" textAnchor="middle" className="label">Application & Services</text>
      <text x="450" y="135" textAnchor="middle" className="small">Enterprise Business Capabilities</text>

      {/* Outcomes */}
      <rect x="620" y="80" width="240" height="90" className="block" />
      <text x="740" y="115" textAnchor="middle" className="label">Digital Outcomes</text>
      <text x="740" y="135" textAnchor="middle" className="small">Experience, Revenue, Compliance</text>

      {/* Platform capabilities */}
      <rect x="100" y="220" width="200" height="80" className="box" />
      <text x="200" y="260" textAnchor="middle" className="small">API Management</text>

      <rect x="350" y="220" width="200" height="80" className="box" />
      <text x="450" y="260" textAnchor="middle" className="small">Identity & Access Management</text>

      <rect x="600" y="220" width="200" height="80" className="box" />
      <text x="700" y="250" textAnchor="middle" className="small">Enterprise Integration</text>
      <text x="700" y="268" textAnchor="middle" className="small">Messaging & Streaming</text>

      {/* Data Platform as datastore/cylinder shape */}
      <g aria-label="Data Platform" role="img">
        {/* top ellipse */}
        <ellipse cx="325" cy="340" rx="100" ry="12" className="datastore-fill datastore-stroke" />
        {/* body */}
        <rect x="225" y="340" width="200" height="56" className="datastore-fill datastore-stroke" />
        {/* bottom ellipse */}
        <ellipse cx="325" cy="396" rx="100" ry="12" className="datastore-fill datastore-stroke" />
      </g>
      <text x="325" y="360" textAnchor="middle" className="small">Data Platform</text>

      <rect x="475" y="330" width="200" height="80" className="box" />
      <text x="575" y="360" textAnchor="middle" className="small">AI/ML & Intelligent Services</text>

      <rect x="725" y="330" width="140" height="80" className="box" />
      <text x="795" y="355" textAnchor="middle" className="small">Observability</text>
      <text x="795" y="373" textAnchor="middle" className="small">Metrics/Logs/Traces</text>

      {/* Edges */}
      <line x1="280" y1="125" x2="330" y2="125" className="edge edge-sync" />
      <line x1="570" y1="125" x2="620" y2="125" className="edge edge-sync" />
      <line x1="160" y1="170" x2="200" y2="220" className="edge edge-async" />
      <line x1="450" y1="170" x2="450" y2="220" className="edge edge-sync" />
      <line x1="740" y1="170" x2="700" y2="220" className="edge edge-batch" />
      <line x1="325" y1="300" x2="325" y2="330" className="edge edge-batch" />
      <line x1="575" y1="300" x2="575" y2="330" className="edge edge-async" />
      <line x1="700" y1="300" x2="725" y2="330" className="edge edge-async" />

      {/* Legend */}
      <g transform="translate(24,372)">
        <rect x="0" y="0" width="230" height="88" className="legend" />
        <text x="12" y="18" className="legend-title">Legend</text>

        {/* Shapes */}
        <rect x="12" y="28" width="24" height="16" className="box" />
        <text x="42" y="40" className="legend-label">Capability / Platform Block</text>

        <g transform="translate(12,52)">
          <ellipse cx="12" cy="8" rx="12" ry="4" className="datastore-fill datastore-stroke" />
          <rect x="0" y="8" width="24" height="12" className="datastore-fill datastore-stroke" />
          <ellipse cx="12" cy="20" rx="12" ry="4" className="datastore-fill datastore-stroke" />
        </g>
        <text x="42" y="66" className="legend-label">Datastore</text>

        {/* Lines */}
        <line x1="140" y1="34" x2="200" y2="34" className="edge edge-sync" />
        <text x="204" y="37" className="legend-label" textAnchor="start">Sync</text>
        <line x1="140" y1="54" x2="200" y2="54" className="edge edge-async" />
        <text x="204" y="57" className="legend-label" textAnchor="start">Async</text>
        <line x1="140" y1="74" x2="200" y2="74" className="edge edge-batch" />
        <text x="204" y="77" className="legend-label" textAnchor="start">Batch</text>
      </g>

      {/* Glossary (compact) */}
      <text x="876" y="456" textAnchor="end" className="legend-label">IAM: Identity & Access Management • KPI: Key Performance Indicator</text>
    </svg>
  );
}

export function BusinessL1Diagram(_: Props) {
  return (
    <svg viewBox="0 0 900 520" role="img" aria-label="Business Architecture L1" style={{ width: '100%', height: 'auto' }}>
      <style>{baseStyles}</style>
      <ArrowDefs />
      <text x="450" y="44" textAnchor="middle" className="cap">Business Architecture — L1</text>

      {/* Units with named systems */}
      <rect x="40" y="80" width="260" height="110" className="block" />
      <text x="170" y="110" textAnchor="middle" className="label">Sales & Service</text>
      <text x="170" y="132" textAnchor="middle" className="small">Salesforce • Zendesk</text>

      <rect x="320" y="80" width="260" height="110" className="block" />
      <text x="450" y="110" textAnchor="middle" className="label">Core Operations</text>
      <text x="450" y="132" textAnchor="middle" className="small">SAP • Custom Services</text>

      <rect x="600" y="80" width="260" height="110" className="block" />
      <text x="730" y="110" textAnchor="middle" className="label">Marketing & Web</text>
      <text x="730" y="132" textAnchor="middle" className="small">CMS • Analytics</text>

      {/* Platform products */}
      <rect x="120" y="240" width="220" height="80" className="box" />
      <text x="230" y="270" textAnchor="middle" className="small">API Mgmt (WSO2 APIM)</text>

      <rect x="360" y="240" width="220" height="80" className="box" />
      <text x="470" y="270" textAnchor="middle" className="small">IAM (WSO2 IS)</text>

      <rect x="600" y="240" width="220" height="80" className="box" />
      <text x="710" y="270" textAnchor="middle" className="small">Integration (WSO2 / ESB)</text>

      <rect x="220" y="350" width="220" height="80" className="box" />
      <text x="330" y="380" textAnchor="middle" className="small">Messaging (Kafka)</text>

      <rect x="460" y="350" width="220" height="80" className="box" />
      <text x="570" y="372" textAnchor="middle" className="small">Data Platform (Lakehouse)</text>

      <rect x="700" y="350" width="160" height="80" className="box" />
      <text x="780" y="380" textAnchor="middle" className="small">Observability</text>

      {/* Edges */}
      <line x1="170" y1="190" x2="230" y2="240" className="edge" />
      <line x1="450" y1="190" x2="470" y2="240" className="edge" />
      <line x1="730" y1="190" x2="710" y2="240" className="edge" />
      <line x1="470" y1="320" x2="570" y2="350" className="edge" />
      <line x1="710" y1="320" x2="780" y2="350" className="edge" />
    </svg>
  );
}

export function BusinessL2Diagram(_: Props) {
  return (
    <svg viewBox="0 0 940 560" role="img" aria-label="Business Architecture L2" style={{ width: '100%', height: 'auto' }}>
      <style>{baseStyles}</style>
      <ArrowDefs />
      <text x="470" y="44" textAnchor="middle" className="cap">Business Architecture — L2</text>

      {/* Processes */}
      <rect x="40" y="80" width="260" height="120" className="block" />
      <text x="170" y="115" textAnchor="middle" className="label">Lead → Order</text>
      <text x="170" y="140" textAnchor="middle" className="small">KPIs: Conv. Rate, Cycle Time</text>

      <rect x="320" y="80" width="260" height="120" className="block" />
      <text x="450" y="115" textAnchor="middle" className="label">Fulfilment</text>
      <text x="450" y="140" textAnchor="middle" className="small">KPIs: SLA, Defects</text>

      <rect x="600" y="80" width="300" height="120" className="block" />
      <text x="750" y="115" textAnchor="middle" className="label">Service & Support</text>
      <text x="750" y="140" textAnchor="middle" className="small">KPIs: CSAT, TTR</text>

      <rect x="80" y="240" width="220" height="80" className="box" />
      <text x="190" y="270" textAnchor="middle" className="small">APIs (REST/OAuth2)</text>

      <rect x="340" y="240" width="220" height="80" className="box" />
      <text x="450" y="270" textAnchor="middle" className="small">Events (Kafka/Avro)</text>

      <rect x="600" y="240" width="260" height="80" className="box" />
      <text x="730" y="270" textAnchor="middle" className="small">Integrations (SaaS/EDI/SOAP)</text>

      {/* Edges */}
      <line x1="300" y1="140" x2="320" y2="140" className="edge" />
      <line x1="580" y1="140" x2="600" y2="140" className="edge" />
      <line x1="190" y1="200" x2="190" y2="240" className="edge" />
      <line x1="450" y1="200" x2="450" y2="240" className="edge" />
      <line x1="750" y1="200" x2="730" y2="240" className="edge" />
    </svg>
  );
}

export function SolutionL1Diagram(_: Props) {
  return (
    <svg viewBox="0 0 900 560" role="img" aria-label="Solution Architecture L1" style={{ width: '100%', height: 'auto' }}>
      <style>{baseStyles}</style>
      <ArrowDefs />
      <text x="450" y="44" textAnchor="middle" className="cap">Solution Architecture — L1</text>

      {/* Core blocks */}
      <rect x="60" y="90" width="220" height="100" className="box" />
      <text x="170" y="125" textAnchor="middle" className="small">API Management</text>
      <text x="170" y="145" textAnchor="middle" className="small">(WSO2 API Manager)</text>

      <rect x="340" y="90" width="220" height="100" className="box" />
      <text x="450" y="125" textAnchor="middle" className="small">Integration</text>
      <text x="450" y="145" textAnchor="middle" className="small">(WSO2 / Apache Camel)</text>

      <rect x="620" y="90" width="220" height="100" className="box" />
      <text x="730" y="125" textAnchor="middle" className="small">Identity & Access</text>
      <text x="730" y="145" textAnchor="middle" className="small">(WSO2 IS)</text>

      <rect x="200" y="230" width="220" height="90" className="box" />
      <text x="310" y="265" textAnchor="middle" className="small">Messaging</text>
      <text x="310" y="285" textAnchor="middle" className="small">(Kafka / Pulsar)</text>

      <rect x="480" y="230" width="220" height="90" className="box" />
      <text x="590" y="270" textAnchor="middle" className="small">Data Platform</text>
      <text x="590" y="290" textAnchor="middle" className="small">(Lakehouse/BI)</text>

      <rect x="340" y="350" width="220" height="90" className="box" />
      <text x="450" y="385" textAnchor="middle" className="small">Observability</text>
      <text x="450" y="405" textAnchor="middle" className="small">(Otel, Grafana)</text>

      {/* Edges */}
      <line x1="280" y1="140" x2="340" y2="140" className="edge" />
      <line x1="560" y1="140" x2="620" y2="140" className="edge" />
      <line x1="450" y1="190" x2="450" y2="230" className="edge" />
      <line x1="590" y1="320" x2="450" y2="350" className="edge" />
    </svg>
  );
}

export function SolutionL2Diagram(_: Props) {
  return (
    <svg viewBox="0 0 980 600" role="img" aria-label="Solution Architecture L2" style={{ width: '100%', height: 'auto' }}>
      <style>{baseStyles}</style>
      <ArrowDefs />
      <text x="490" y="44" textAnchor="middle" className="cap">Solution Architecture — L2</text>

      <rect x="60" y="90" width="240" height="110" className="box" />
      <text x="180" y="120" textAnchor="middle" className="small">Public/Partner APIs</text>
      <text x="180" y="140" textAnchor="middle" className="small">REST • GraphQL</text>
      <text x="180" y="160" textAnchor="middle" className="small">OAuth2/OIDC</text>

      <rect x="360" y="90" width="240" height="110" className="box" />
      <text x="480" y="120" textAnchor="middle" className="small">Service Mesh</text>
      <text x="480" y="140" textAnchor="middle" className="small">mTLS • JWT</text>

      <rect x="660" y="90" width="240" height="110" className="box" />
      <text x="780" y="120" textAnchor="middle" className="small">Identity</text>
      <text x="780" y="140" textAnchor="middle" className="small">SAML • OIDC</text>

      <rect x="200" y="240" width="240" height="100" className="box" />
      <text x="320" y="270" textAnchor="middle" className="small">Integration Flows</text>
      <text x="320" y="290" textAnchor="middle" className="small">Sync/Async • Mapping</text>

      <rect x="520" y="240" width="240" height="100" className="box" />
      <text x="640" y="270" textAnchor="middle" className="small">Events</text>
      <text x="640" y="290" textAnchor="middle" className="small">Kafka • Avro</text>

      <rect x="360" y="380" width="240" height="100" className="box" />
      <text x="480" y="410" textAnchor="middle" className="small">Data Products</text>
      <text x="480" y="430" textAnchor="middle" className="small">Lakehouse • Feature Store</text>

      <line x1="300" y1="145" x2="360" y2="145" className="edge" />
      <line x1="600" y1="145" x2="660" y2="145" className="edge" />
      <line x1="480" y1="200" x2="480" y2="240" className="edge" />
      <line x1="640" y1="340" x2="480" y2="380" className="edge" />
    </svg>
  );
}

export function DeploymentL0Diagram(_: Props) {
  return (
    <svg viewBox="0 0 940 480" role="img" aria-label="Deployment Architecture L0" style={{ width: '100%', height: 'auto' }}>
      <style>{baseStyles}</style>
      <ArrowDefs />
      <text x="470" y="44" textAnchor="middle" className="cap">Deployment Architecture — L0</text>

      <rect x="100" y="100" width="300" height="120" className="block" />
      <text x="250" y="150" textAnchor="middle" className="label">Cloud</text>
      <text x="250" y="170" textAnchor="middle" className="small">Global Regions</text>

      <rect x="520" y="100" width="300" height="120" className="block" />
      <text x="670" y="150" textAnchor="middle" className="label">On‑Prem</text>
      <text x="670" y="170" textAnchor="middle" className="small">Datacenter</text>

      <rect x="220" y="260" width="500" height="100" className="box" />
      <text x="470" y="300" textAnchor="middle" className="small">Connectivity & Security Controls</text>
    </svg>
  );
}

export function DeploymentL1Diagram(_: Props) {
  return (
    <svg viewBox="0 0 980 560" role="img" aria-label="Deployment Architecture L1" style={{ width: '100%', height: 'auto' }}>
      <style>{baseStyles}</style>
      <ArrowDefs />
      <text x="490" y="44" textAnchor="middle" className="cap">Deployment Architecture — L1</text>

      <rect x="80" y="90" width="280" height="120" className="box" />
      <text x="220" y="125" textAnchor="middle" className="small">Kubernetes</text>
      <text x="220" y="145" textAnchor="middle" className="small">API Mgmt • Integration</text>

      <rect x="360" y="90" width="280" height="120" className="box" />
      <text x="500" y="125" textAnchor="middle" className="small">Kafka Cluster</text>
      <text x="500" y="145" textAnchor="middle" className="small">Messaging/Streaming</text>

      <rect x="640" y="90" width="280" height="120" className="box" />
      <text x="780" y="125" textAnchor="middle" className="small">Data Platform</text>
      <text x="780" y="145" textAnchor="middle" className="small">Warehouse/Lakehouse</text>

      <rect x="260" y="240" width="460" height="100" className="box" />
      <text x="490" y="275" textAnchor="middle" className="small">Identity & Access</text>
      <text x="490" y="295" textAnchor="middle" className="small">SSO • mTLS • Secrets</text>

      <rect x="380" y="360" width="240" height="100" className="box" />
      <text x="500" y="395" textAnchor="middle" className="small">Observability</text>
      <text x="500" y="415" textAnchor="middle" className="small">Metrics • Logs • Traces</text>
    </svg>
  );
}

export function DeploymentL2Diagram(_: Props) {
  return (
    <svg viewBox="0 0 1000 620" role="img" aria-label="Deployment Architecture L2" style={{ width: '100%', height: 'auto' }}>
      <style>{baseStyles}</style>
      <ArrowDefs />
      <text x="500" y="44" textAnchor="middle" className="cap">Deployment Architecture — L2</text>

      {/* Ingress and gateway */}
      <rect x="60" y="90" width="240" height="100" className="box" />
      <text x="180" y="125" textAnchor="middle" className="small">Ingress / WAF</text>
      <text x="180" y="145" textAnchor="middle" className="small">TLS • Rate Limit</text>

      <rect x="340" y="90" width="240" height="100" className="box" />
      <text x="460" y="125" textAnchor="middle" className="small">API Gateway</text>
      <text x="460" y="145" textAnchor="middle" className="small">REST • GraphQL</text>

      <rect x="620" y="90" width="240" height="100" className="box" />
      <text x="740" y="125" textAnchor="middle" className="small">Service Mesh</text>
      <text x="740" y="145" textAnchor="middle" className="small">mTLS • JWT</text>

      <rect x="200" y="230" width="240" height="100" className="box" />
      <text x="320" y="265" textAnchor="middle" className="small">Integration</text>
      <text x="320" y="285" textAnchor="middle" className="small">Adapters • Mapping</text>

      <rect x="460" y="230" width="240" height="100" className="box" />
      <text x="580" y="265" textAnchor="middle" className="small">Messaging</text>
      <text x="580" y="285" textAnchor="middle" className="small">Kafka • Schema Registry</text>

      <rect x="720" y="230" width="240" height="100" className="box" />
      <text x="840" y="265" textAnchor="middle" className="small">Data Platform</text>
      <text x="840" y="285" textAnchor="middle" className="small">ETL • Warehouse</text>

      <rect x="340" y="370" width="240" height="100" className="box" />
      <text x="460" y="405" textAnchor="middle" className="small">Identity</text>
      <text x="460" y="425" textAnchor="middle" className="small">OIDC • SAML • mTLS</text>

      <rect x="60" y="370" width="240" height="100" className="box" />
      <text x="180" y="405" textAnchor="middle" className="small">Observability</text>
      <text x="180" y="425" textAnchor="middle" className="small">Metrics • Logs • Traces</text>

      {/* Flows */}
      <line x1="300" y1="140" x2="340" y2="140" className="edge" />
      <line x1="580" y1="140" x2="620" y2="140" className="edge" />
      <line x1="460" y1="190" x2="460" y2="230" className="edge" />
      <line x1="620" y1="280" x2="720" y2="280" className="edge" />
      <line x1="460" y1="330" x2="460" y2="370" className="edge" />
      <line x1="200" y1="420" x2="340" y2="420" className="edge" />
    </svg>
  );
}
