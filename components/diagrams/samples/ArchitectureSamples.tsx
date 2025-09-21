type Props = { title?: string };

type GlossaryItem = { term: string; description: string };

const hexPoints = (cx: number, cy: number, w = 120, h = 74) => {
  const halfWidth = w / 2;
  const quarterWidth = w / 4;
  const halfHeight = h / 2;
  return [
    `${cx - halfWidth},${cy}`,
    `${cx - quarterWidth},${cy - halfHeight}`,
    `${cx + quarterWidth},${cy - halfHeight}`,
    `${cx + halfWidth},${cy}`,
    `${cx + quarterWidth},${cy + halfHeight}`,
    `${cx - quarterWidth},${cy + halfHeight}`,
  ].join(" ");
};

function ArrowDefs() {
  return (
    <defs>
      <marker id="arrow-sync" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
        <path d="M2,1 L10,6 L2,11 Z" fill="#1f2937" />
      </marker>
      <marker id="arrow-async" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
        <path d="M2,1 L10,6 L2,11 Z" fill="#2563eb" />
      </marker>
      <marker id="arrow-batch" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
        <path d="M2,1 L10,6 L2,11 Z" fill="#475569" />
      </marker>
    </defs>
  );
}

const baseStyles = `
  text { font-family: 'system-ui', sans-serif; }
  .title { font: 700 28px system-ui; fill: #0f172a; }
  .label { font: 600 14px system-ui; fill: #0f172a; }
  .small { font: 500 12px system-ui; fill: #334155; }
  .note { font: 500 11px system-ui; fill: #475569; }
  .lane-label { font: 700 12px system-ui; fill: #0f172a; letter-spacing: .04em; text-transform: uppercase; }
  .lane-bg { fill: rgba(148, 163, 184, 0.12); }
  .persona { fill: #ffffff; stroke: #2563eb; stroke-width: 2.5; }
  .experience { fill: #dbeafe; stroke: #2563eb; stroke-width: 2.5; }
  .capability { fill: #ede9fe; stroke: #6d28d9; stroke-width: 2.5; }
  .process { fill: #fee2e2; stroke: #b91c1c; stroke-width: 2.5; }
  .service { fill: #cffafe; stroke: #0e7490; stroke-width: 2.5; }
  .service-core { fill: #bfdbfe; stroke: #1d4ed8; stroke-width: 2.5; }
  .platform { fill: #ecfdf5; stroke: #047857; stroke-width: 2.5; }
  .platform.planned { fill: #fef3c7; stroke: #d97706; }
  .datastore-fill { fill: #f8fafc; }
  .datastore-stroke { stroke: #0f172a; stroke-width: 2.5; }
  .external { fill: #fff7ed; stroke: #c2410c; stroke-width: 2.5; stroke-dasharray: 6 4; }
  .cluster { fill: rgba(15, 23, 42, 0.08); stroke: rgba(15, 23, 42, 0.16); stroke-width: 1.5; }
  .environment { fill: rgba(148, 163, 184, 0.14); stroke: rgba(71, 85, 105, 0.4); stroke-dasharray: 8 6; }
  .edge { fill: none; stroke-width: 2.75; }
  .edge-sync { stroke: #1f2937; stroke-dasharray: none; marker-end: url(#arrow-sync); }
  .edge-async { stroke: #2563eb; stroke-dasharray: 10 6; marker-end: url(#arrow-async); }
  .edge-batch { stroke: #475569; stroke-dasharray: 2 10; marker-end: url(#arrow-batch); }
  .legend-card { fill: rgba(255,255,255,0.94); stroke: #e5e7eb; stroke-width: 1.5; }
  .legend-title { font: 700 13px system-ui; fill: #0f172a; letter-spacing: .04em; text-transform: uppercase; }
  .legend-label { font: 500 12px system-ui; fill: #334155; }
  .badge { font: 700 11px system-ui; fill: #2563eb; text-transform: uppercase; letter-spacing: .08em; }
  .mission { fill: #f8fafc; stroke: #0f172a; stroke-width: 2; }
  .goal-text { font: 500 12px system-ui; fill: #1e293b; }
  .stakeholder { fill: #fef9c3; stroke: #b45309; stroke-width: 2.5; }
  .stakeholder-label { font: 600 12px system-ui; fill: #92400e; }
  .unit { fill: #e0f2fe; stroke: #0369a1; stroke-width: 2.5; }
  .unit-title { font: 700 12px system-ui; fill: #0f172a; text-transform: uppercase; letter-spacing: .05em; }
  .value-stream { fill: #0ea5e9; opacity: 0.9; }
  .value-stream-alt { fill: #38bdf8; opacity: 0.9; }
  .value-stream-label { font: 700 12px system-ui; fill: #0f172a; letter-spacing: .03em; }
  .policy-line { stroke: #b91c1c; stroke-dasharray: 6 6; stroke-width: 2; }
  .policy-callout { fill: none; stroke: #b91c1c; stroke-dasharray: 6 6; stroke-width: 2; }
  .policy-text { font: 500 12px system-ui; fill: #991b1b; }
  .kpi-callout { fill: #eef2ff; stroke: #4338ca; stroke-width: 2; rx: 12; }
  .kpi-label { font: 600 12px system-ui; fill: #312e81; }
  .scope { font: 500 12px system-ui; fill: #475569; }
  .measure-line { stroke: #4338ca; stroke-dasharray: 4 6; stroke-width: 2; }
`;

const Legend = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`} aria-label="Legend">
    <rect className="legend-card" x={0} y={0} width={360} height={300} rx={12} />
    <text className="legend-title" x={20} y={30}>Legend</text>

    <rect className="experience" x={20} y={52} width={52} height={24} rx={18} />
    <text className="legend-label" x={84} y={68}>Experience channel</text>

    <rect className="capability" x={20} y={86} width={52} height={24} rx={12} />
    <text className="legend-label" x={84} y={102}>Business capability</text>

    <rect className="process" x={20} y={120} width={52} height={24} rx={8} />
    <text className="legend-label" x={84} y={136}>Process stage / KPI</text>

    <polygon className="platform" points={hexPoints(36, 168, 60, 40)} />
    <polygon className="platform planned" points={hexPoints(84, 168, 60, 40)} />
    <text className="legend-label" x={120} y={172}>Platform service (blue=current, amber=planned)</text>

    <rect className="external" x={20} y={204} width={52} height={24} rx={10} />
    <text className="legend-label" x={84} y={220}>Partner / external dependency</text>

    <g transform="translate(18,238)">
      <ellipse className="datastore-fill datastore-stroke" cx={28} cy={6} rx={28} ry={6} />
      <rect className="datastore-fill datastore-stroke" x={0} y={6} width={56} height={20} />
      <ellipse className="datastore-fill datastore-stroke" cx={28} cy={26} rx={28} ry={6} />
    </g>
    <text className="legend-label" x={84} y={262}>Data platform / persistent store</text>

    <line className="edge edge-sync" x1={200} y1={90} x2={300} y2={90} />
    <text className="legend-label" x={310} y={94}>Synchronous API call</text>

    <line className="edge edge-async" x1={200} y1={126} x2={300} y2={126} />
    <text className="legend-label" x={310} y={130}>Async event / streaming</text>

    <line className="edge edge-batch" x1={200} y1={162} x2={300} y2={162} />
    <text className="legend-label" x={310} y={166}>Batch / scheduled transfer</text>
  </g>
);

const Glossary = ({ x, y, items }: { x: number; y: number; items: GlossaryItem[] }) => {
  const cardHeight = 56 + items.length * 22;
  return (
    <g transform={`translate(${x}, ${y})`} aria-label="Glossary">
      <rect className="legend-card" x={0} y={0} width={360} height={cardHeight} rx={12} />
      <text className="legend-title" x={20} y={30}>Glossary</text>
      {items.map((item, index) => (
        <text key={item.term} className="legend-label" x={20} y={58 + index * 22}>
          <tspan className="badge">{item.term}</tspan>
          <tspan className="legend-label" dx={8}>{item.description}</tspan>
        </text>
      ))}
    </g>
  );
};

const BusinessL0Legend = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`} aria-label="Legend">
    <rect className="legend-card" x={0} y={0} width={340} height={210} rx={12} />
    <text className="legend-title" x={20} y={28}>Legend</text>

    <rect className="experience" x={20} y={52} width={110} height={36} rx={18} />
    <text className="legend-label" x={150} y={74}>Experience / Channel API</text>

    <polygon className="platform" points={hexPoints(75, 122, 90, 54)} />
    <text className="legend-label" x={150} y={126}>Platform module (API • AI • Integration)</text>

    <rect className="service" x={20} y={150} width={110} height={32} rx={12} />
    <text className="legend-label" x={150} y={170}>Security & operations control</text>

    <g transform="translate(12,180)">
      <ellipse className="datastore-fill datastore-stroke" cx={38} cy={6} rx={36} ry={6} />
      <rect className="datastore-fill datastore-stroke" x={2} y={6} width={72} height={20} />
      <ellipse className="datastore-fill datastore-stroke" cx={38} cy={26} rx={36} ry={6} />
    </g>
    <text className="legend-label" x={150} y={200}>Data / knowledge platform</text>
  </g>
);

export function BusinessL0Diagram(_: Props) {
  const glossary: GlossaryItem[] = [
    { term: "Experience API", description: "Channel facade that abstracts domain services" },
    { term: "AI Agent Hub", description: "Reusable assistants infused into journeys and ops" },
    { term: "Zero Trust", description: "Security fabric unifying identity, policy, and telemetry" },
  ];

  return (
    <svg viewBox="0 0 1100 860" role="img" aria-label="Unified Commerce Platform — Solution L0" style={{ width: "100%", height: "auto" }}>
      <style>{baseStyles}</style>
      <ArrowDefs />

      <text className="title" x={550} y={48} textAnchor="middle">Unified Commerce Platform — Solution L0</text>
      <text className="scope" x={550} y={68} textAnchor="middle">Technology platform view • APIs • AI agents • Security</text>

      <rect className="lane-bg" x={80} y={96} width={940} height={150} rx={24} />
      <rect className="lane-bg" x={80} y={270} width={940} height={200} rx={24} />
      <rect className="lane-bg" x={80} y={500} width={940} height={150} rx={24} />

      <text className="lane-label" x={120} y={120}>Experience & Channel APIs</text>
      <text className="lane-label" x={120} y={300}>Platform Fabric</text>
      <text className="lane-label" x={120} y={530}>Security, Identity & Operations</text>

      {[
        { x: 160, label: "Customer Experience APIs", note: "Web/App BFF · GraphQL" },
        { x: 440, label: "Partner & Marketplace APIs", note: "Quota tiers · Async events" },
        { x: 720, label: "Associate Assistants", note: "Task APIs · Operational insights" },
      ].map(({ x, label, note }) => (
        <g key={label}>
          <rect className="experience" x={x} y={140} width={220} height={64} rx={24} />
          <text className="label" x={x + 110} y={174} textAnchor="middle">{label}</text>
          <text className="note" x={x + 110} y={194} textAnchor="middle">{note}</text>
        </g>
      ))}

      {[
        { cx: 220, cy: 340, label: "API Gateway", note: "Policy · throttling · monetisation" },
        { cx: 420, cy: 340, label: "Integration Mesh", note: "Event choreography · service discovery" },
        { cx: 620, cy: 340, label: "AI Agent Hub", note: "Reasoning, copilots, guardrails" },
        { cx: 820, cy: 340, label: "Automation & Orchestration", note: "Rules · workflow · RPA" },
      ].map(({ cx, cy, label, note }) => (
        <g key={label}>
          <polygon className="platform" points={hexPoints(cx, cy, 140, 88)} />
          <text className="label" x={cx} y={cy} textAnchor="middle">{label}</text>
          <text className="note" x={cx} y={cy + 18} textAnchor="middle">{note}</text>
        </g>
      ))}

      <g transform="translate(260, 380)" aria-label="Data platform">
        <ellipse className="datastore-fill datastore-stroke" cx={90} cy={10} rx={90} ry={10} />
        <rect className="datastore-fill datastore-stroke" x={0} y={10} width={180} height={44} />
        <ellipse className="datastore-fill datastore-stroke" cx={90} cy={54} rx={90} ry={10} />
      </g>
      <text className="label" x={350} y={452} textAnchor="middle">Data Lakehouse & Feature Store</text>
      <text className="note" x={350} y={470} textAnchor="middle">Streaming ingestion · unified profiles · model registry</text>

      <g transform="translate(580, 392)" aria-label="Observability data">
        <ellipse className="datastore-fill datastore-stroke" cx={70} cy={8} rx={70} ry={8} />
        <rect className="datastore-fill datastore-stroke" x={0} y={8} width={140} height={32} />
        <ellipse className="datastore-fill datastore-stroke" cx={70} cy={40} rx={70} ry={8} />
      </g>
      <text className="label" x={650} y={452} textAnchor="middle">Telemetry & Knowledge Graph</text>
      <text className="note" x={650} y={470} textAnchor="middle">Metrics · traces · decision intelligence</text>

      {[
        { x: 140, label: "Identity & Access", note: "SSO · MFA · policy enforcement" },
        { x: 380, label: "Zero-Trust Mesh", note: "mTLS · posture management" },
        { x: 620, label: "Security Automation", note: "Runtime protection · drift guardrails" },
        { x: 860, label: "Observability & SLOs", note: "Dashboards · alerts · compliance" },
      ].map(({ x, label, note }) => (
        <g key={label}>
          <rect className="service" x={x} y={540} width={200} height={70} rx={18} />
          <text className="label" x={x + 100} y={572} textAnchor="middle">{label}</text>
          <text className="note" x={x + 100} y={592} textAnchor="middle">{note}</text>
        </g>
      ))}

      <path className="edge edge-sync" d="M270 204 V260" />
      <path className="edge edge-sync" d="M550 204 V260" />
      <path className="edge edge-sync" d="M830 204 V260" />

      <path className="edge edge-sync" d="M220 296 V320" />
      <path className="edge edge-sync" d="M420 296 V320" />
      <path className="edge edge-async" d="M620 296 V320" />
      <path className="edge edge-async" d="M820 296 V320" />

      <path className="edge edge-async" d="M350 424 V468" />
      <path className="edge edge-async" d="M650 424 V468" />

      <path className="edge edge-sync" d="M240 510 V540" />
      <path className="edge edge-sync" d="M480 510 V540" />
      <path className="edge edge-sync" d="M720 510 V540" />
      <path className="edge edge-sync" d="M900 510 V540" />

      <BusinessL0Legend x={360} y={640} />
      <Glossary x={80} y={640} items={glossary} />
    </svg>
  );
}

export function BusinessL1Diagram(_: Props) {
  const glossary: GlossaryItem[] = [
    { term: "CDP", description: "Customer Data Platform curating profiles across channels" },
    { term: "OMS", description: "Order Management Service handles ATP, sourcing, routing" },
    { term: "BFF", description: "Backend-for-Frontend layer tailoring APIs per channel" },
    { term: "SLAs", description: "Operational targets for fulfillment and support" },
  ];

  return (
    <svg viewBox="0 0 1100 880" role="img" aria-label="Unified Commerce Platform — Business Architecture L1" style={{ width: "100%", height: "auto" }}>
      <style>{baseStyles}</style>
      <ArrowDefs />

      <text className="title" x={550} y={48} textAnchor="middle">Journey-to-Capability Mapping — Business L1</text>

      <rect className="lane-bg" x={60} y={90} width={980} height={90} rx={24} />
      <rect className="lane-bg" x={60} y={210} width={980} height={140} rx={24} />
      <rect className="lane-bg" x={60} y={380} width={980} height={140} rx={24} />

      <text className="lane-label" x={90} y={140} textAnchor="start">Journey Stages</text>
      <text className="lane-label" x={90} y={260} textAnchor="start">Business Capabilities</text>
      <text className="lane-label" x={90} y={430} textAnchor="start">Platform Enablers</text>

      {/* Journey stages */}
      <rect className="experience" x={220} y={110} width={170} height={56} rx={24} />
      <text className="label" x={305} y={142} textAnchor="middle">Discover</text>
      <text className="note" x={305} y={158} textAnchor="middle">Personalized browsing</text>

      <rect className="experience" x={420} y={110} width={170} height={56} rx={24} />
      <text className="label" x={505} y={142} textAnchor="middle">Decide</text>
      <text className="note" x={505} y={158} textAnchor="middle">Real-time pricing & ATP</text>

      <rect className="experience" x={620} y={110} width={170} height={56} rx={24} />
      <text className="label" x={705} y={142} textAnchor="middle">Purchase</text>
      <text className="note" x={705} y={158} textAnchor="middle">Checkout, payment, tax</text>

      <rect className="experience" x={820} y={110} width={170} height={56} rx={24} />
      <text className="label" x={905} y={142} textAnchor="middle">Fulfill & Support</text>
      <text className="note" x={905} y={158} textAnchor="middle">Delivery, case management</text>

      {/* Capabilities */}
      <rect className="capability" x={190} y={230} width={200} height={60} rx={16} />
      <text className="label" x={290} y={262} textAnchor="middle">Customer Data Platform</text>
      <text className="note" x={290} y={280} textAnchor="middle">Profiles, consent, segmentation</text>

      <rect className="capability" x={420} y={230} width={200} height={60} rx={16} />
      <text className="label" x={520} y={262} textAnchor="middle">Offer & Pricing Engine</text>
      <text className="note" x={520} y={280} textAnchor="middle">Promotion rules, price guardrails</text>

      <rect className="capability" x={650} y={230} width={200} height={60} rx={16} />
      <text className="label" x={750} y={262} textAnchor="middle">Order Management Service</text>
      <text className="note" x={750} y={280} textAnchor="middle">Cart, payment orchestration, OMS</text>

      <rect className="capability" x={880} y={230} width={200} height={60} rx={16} />
      <text className="label" x={980} y={262} textAnchor="middle">Post-Purchase Care</text>
      <text className="note" x={980} y={280} textAnchor="middle">Returns, cases, knowledge</text>

      <rect className="process" x={190} y={310} width={200} height={56} rx={12} />
      <text className="label" x={290} y={342} textAnchor="middle">Engagement KPIs</text>
      <text className="note" x={290} y={360} textAnchor="middle">NPS, dwell time, conversion</text>

      <rect className="process" x={420} y={310} width={200} height={56} rx={12} />
      <text className="label" x={520} y={342} textAnchor="middle">Commerce KPIs</text>
      <text className="note" x={520} y={360} textAnchor="middle">AOV, cart success, SLA</text>

      <rect className="process" x={650} y={310} width={200} height={56} rx={12} />
      <text className="label" x={750} y={342} textAnchor="middle">Fulfillment KPIs</text>
      <text className="note" x={750} y={360} textAnchor="middle">OTIF, cost-to-serve</text>

      <rect className="process" x={880} y={310} width={200} height={56} rx={12} />
      <text className="label" x={980} y={342} textAnchor="middle">Care KPIs</text>
      <text className="note" x={980} y={360} textAnchor="middle">First-contact resolution</text>

      {/* Platform enablers */}
      <polygon className="platform" points={hexPoints(290, 440)} />
      <text className="label" x={290} y={440} textAnchor="middle">Experience BFF</text>
      <text className="note" x={290} y={458} textAnchor="middle">Node.js / GraphQL federation</text>

      <polygon className="platform" points={hexPoints(520, 440)} />
      <text className="label" x={520} y={440} textAnchor="middle">API Gateway</text>
      <text className="note" x={520} y={458} textAnchor="middle">WSO2 + policy enforcement</text>

      <polygon className="platform" points={hexPoints(750, 440)} />
      <text className="label" x={750} y={440} textAnchor="middle">Event Mesh</text>
      <text className="note" x={750} y={458} textAnchor="middle">Kafka topics for inventory, orders</text>

      <polygon className="platform planned" points={hexPoints(980, 440)} />
      <text className="label" x={980} y={440} textAnchor="middle">AI Copilot (Planned)</text>
      <text className="note" x={980} y={458} textAnchor="middle">Generative assistance for associates</text>

      <g transform="translate(120, 410)">
        <ellipse className="datastore-fill datastore-stroke" cx={50} cy={10} rx={50} ry={9} />
        <rect className="datastore-fill datastore-stroke" x={0} y={10} width={100} height={40} />
        <ellipse className="datastore-fill datastore-stroke" cx={50} cy={50} rx={50} ry={9} />
      </g>
      <text className="label" x={170} y={470} textAnchor="middle">Customer Data Platform</text>

      {/* External dependencies */}
      <rect className="external" x={120} y={520} width={220} height={56} rx={16} />
      <text className="label" x={230} y={554} textAnchor="middle">AdTech & Social APIs</text>

      <rect className="external" x={760} y={520} width={280} height={56} rx={16} />
      <text className="label" x={900} y={554} textAnchor="middle">Logistics & Tax Providers</text>

      {/* Connectors */}
      <path className="edge edge-sync" d="M305 166 V230" />
      <path className="edge edge-sync" d="M505 166 V230" />
      <path className="edge edge-sync" d="M705 166 V230" />
      <path className="edge edge-sync" d="M905 166 V230" />

      <path className="edge edge-sync" d="M290 290 V310" />
      <path className="edge edge-sync" d="M520 290 V310" />
      <path className="edge edge-sync" d="M750 290 V310" />
      <path className="edge edge-sync" d="M980 290 V310" />

      <path className="edge edge-sync" d="M290 366 V410" />
      <path className="edge edge-async" d="M520 366 V410" />
      <path className="edge edge-async" d="M750 366 V410" />
      <path className="edge edge-async" d="M980 366 V410" />

      <path className="edge edge-batch" d="M230 470 V520" />
      <path className="edge edge-batch" d="M900 470 V520" />

      <Legend x={720} y={560} />
      <Glossary x={60} y={560} items={glossary} />
    </svg>
  );
}

export function BusinessL2Diagram(_: Props) {
  const glossary: GlossaryItem[] = [
    { term: "OTIF", description: "On-Time In-Full delivery measurement" },
    { term: "AOV", description: "Average Order Value uplift tracked per release" },
    { term: "NPS", description: "Net Promoter Score aggregated by channel" },
    { term: "SLO", description: "Service Level Objective tied to uptime and latency" },
  ];

  return (
    <svg viewBox="0 0 1100 880" role="img" aria-label="Unified Commerce Platform — Business Architecture L2" style={{ width: "100%", height: "auto" }}>
      <style>{baseStyles}</style>
      <ArrowDefs />

      <text className="title" x={550} y={48} textAnchor="middle">Customer Journey Flow & KPIs — Business L2</text>

      {/* Process timeline */}
      <g aria-label="Journey timeline">
        <rect className="lane-bg" x={80} y={110} width={940} height={120} rx={24} />
        <rect className="lane-bg" x={80} y={260} width={940} height={120} rx={24} />
        <rect className="lane-bg" x={80} y={410} width={940} height={120} rx={24} />

        <text className="lane-label" x={100} y={102}>Journey checkpoints</text>
        <text className="lane-label" x={100} y={252}>Supporting services & signals</text>
        <text className="lane-label" x={100} y={402}>Operations & insight</text>

        <rect className="process" x={120} y={140} width={150} height={70} rx={18} />
        <text className="label" x={195} y={180} textAnchor="middle">Browse</text>
        <text className="note" x={195} y={198} textAnchor="middle">Goal: curated discovery</text>

        <rect className="process" x={300} y={140} width={150} height={70} rx={18} />
        <text className="label" x={375} y={180} textAnchor="middle">Add to Cart</text>
        <text className="note" x={375} y={198} textAnchor="middle">Goal: no friction</text>

        <rect className="process" x={480} y={140} width={150} height={70} rx={18} />
        <text className="label" x={555} y={180} textAnchor="middle">Checkout</text>
        <text className="note" x={555} y={198} textAnchor="middle">Goal: &lt; 2 clicks, MFA</text>

        <rect className="process" x={660} y={140} width={150} height={70} rx={18} />
        <text className="label" x={735} y={180} textAnchor="middle">Fulfillment</text>
        <text className="note" x={735} y={198} textAnchor="middle">Goal: OTIF 96%</text>

        <rect className="process" x={840} y={140} width={150} height={70} rx={18} />
        <text className="label" x={915} y={180} textAnchor="middle">Care & Loyalty</text>
        <text className="note" x={915} y={198} textAnchor="middle">Goal: NPS +10</text>

        {/* KPI callouts */}
        <text className="note" x={195} y={128} textAnchor="middle">CTR +18%</text>
        <text className="note" x={375} y={128} textAnchor="middle">Cart success 92%</text>
        <text className="note" x={555} y={128} textAnchor="middle">Conversion 3.6%</text>
        <text className="note" x={735} y={128} textAnchor="middle">Ship-from-store 45%</text>
        <text className="note" x={915} y={128} textAnchor="middle">NPS 64</text>
      </g>

      {/* Supporting services */}
      <rect className="service" x={120} y={290} width={170} height={70} rx={18} />
      <text className="label" x={205} y={324} textAnchor="middle">CMS & Personalization</text>
      <text className="note" x={205} y={342} textAnchor="middle">Adobe Experience Cloud</text>

      <rect className="service-core" x={320} y={290} width={170} height={70} rx={18} />
      <text className="label" x={405} y={324} textAnchor="middle">Cart & Pricing API</text>
      <text className="note" x={405} y={342} textAnchor="middle">BFF + Pricing Engine</text>

      <rect className="service-core" x={520} y={290} width={170} height={70} rx={18} />
      <text className="label" x={605} y={324} textAnchor="middle">Checkout Service</text>
      <text className="note" x={605} y={342} textAnchor="middle">PCI zone + PSP orchestration</text>

      <rect className="service" x={720} y={290} width={170} height={70} rx={18} />
      <text className="label" x={805} y={324} textAnchor="middle">Fulfillment Control</text>
      <text className="note" x={805} y={342} textAnchor="middle">WMS + Delivery orchestration</text>

      <rect className="service" x={920} y={290} width={170} height={70} rx={18} />
      <text className="label" x={1005} y={324} textAnchor="middle">Customer Care Portal</text>
      <text className="note" x={1005} y={342} textAnchor="middle">Salesforce Service Cloud</text>

      {/* Operations & insight */}
      <g transform="translate(140, 420)">
        <ellipse className="datastore-fill datastore-stroke" cx={60} cy={10} rx={60} ry={10} />
        <rect className="datastore-fill datastore-stroke" x={0} y={10} width={120} height={46} />
        <ellipse className="datastore-fill datastore-stroke" cx={60} cy={56} rx={60} ry={10} />
      </g>
      <text className="label" x={200} y={486} textAnchor="middle">Real-time Analytics Lake</text>
      <text className="note" x={200} y={504} textAnchor="middle">Snowflake streaming ingestion</text>

      <polygon className="platform" points={hexPoints(420, 470)} />
      <text className="label" x={420} y={470} textAnchor="middle">Kafka Event Mesh</text>
      <text className="note" x={420} y={488} textAnchor="middle">Order.created • Inventory.changed</text>

      <polygon className="platform" points={hexPoints(600, 470)} />
      <text className="label" x={600} y={470} textAnchor="middle">API Gateway Policies</text>
      <text className="note" x={600} y={488} textAnchor="middle">Rate limits, JWT, partner tiers</text>

      <polygon className="platform planned" points={hexPoints(780, 470)} />
      <text className="label" x={780} y={470} textAnchor="middle">AI Insight Layer (Planned)</text>
      <text className="note" x={780} y={488} textAnchor="middle">Explainable recommendations</text>

      <rect className="external" x={900} y={440} width={120} height={70} rx={16} />
      <text className="label" x={960} y={474} textAnchor="middle">3rd-party Tax</text>

      {/* Connectors between stages */}
      <path className="edge edge-sync" d="M270 175 H300" />
      <path className="edge edge-sync" d="M450 175 H480" />
      <path className="edge edge-sync" d="M630 175 H660" />
      <path className="edge edge-sync" d="M810 175 H840" />

      <path className="edge edge-async" d="M195 210 V290" />
      <path className="edge edge-async" d="M375 210 V290" />
      <path className="edge edge-async" d="M555 210 V290" />
      <path className="edge edge-async" d="M735 210 V290" />
      <path className="edge edge-async" d="M915 210 V290" />

      <path className="edge edge-async" d="M205 360 V420" />
      <path className="edge edge-async" d="M405 360 V430" />
      <path className="edge edge-async" d="M605 360 V430" />
      <path className="edge edge-async" d="M805 360 V430" />
      <path className="edge edge-sync" d="M1005 360 V430" />

      <path className="edge edge-batch" d="M420 520 Q500 520 540 490" />
      <path className="edge edge-batch" d="M780 500 H900" />

      <Legend x={720} y={560} />
      <Glossary x={80} y={560} items={glossary} />
    </svg>
  );
}

export function SolutionL1Diagram(_: Props) {
  const glossary: GlossaryItem[] = [
    { term: "Edge", description: "CloudFront CDN with WAF shields" },
    { term: "BFF", description: "Backend-for-Frontend Node.js tier" },
    { term: "ESB", description: "MuleSoft integration with ERP/CRM" },
    { term: "MES", description: "Manufacturing execution integration for availability" },
  ];

  return (
    <svg viewBox="0 0 1100 880" role="img" aria-label="Unified Commerce Platform — Solution Architecture L1" style={{ width: "100%", height: "auto" }}>
      <style>{baseStyles}</style>
      <ArrowDefs />

      <text className="title" x={550} y={48} textAnchor="middle">Solution Architecture — Interaction & Core Services (L1)</text>

      {/* Edge and clients */}
      <rect className="lane-bg" x={80} y={90} width={940} height={120} rx={24} />
      <text className="lane-label" x={110} y={130}>Omnichannel clients</text>

      <rect className="experience" x={150} y={120} width={200} height={64} rx={28} />
      <text className="label" x={250} y={154} textAnchor="middle">Web & App</text>
      <text className="note" x={250} y={172} textAnchor="middle">Next.js storefront</text>

      <rect className="experience" x={380} y={120} width={200} height={64} rx={28} />
      <text className="label" x={480} y={154} textAnchor="middle">POS & Associate</text>
      <text className="note" x={480} y={172} textAnchor="middle">React Native offline-first</text>

      <rect className="experience" x={610} y={120} width={200} height={64} rx={28} />
      <text className="label" x={710} y={154} textAnchor="middle">Partner Portal</text>
      <text className="note" x={710} y={172} textAnchor="middle">Seller onboarding + APIs</text>

      <rect className="experience" x={840} y={120} width={150} height={64} rx={28} />
      <text className="label" x={915} y={154} textAnchor="middle">IoT Touchpoints</text>
      <text className="note" x={915} y={172} textAnchor="middle">In-store kiosks</text>

      {/* Edge services */}
      <rect className="service" x={120} y={220} width={860} height={80} rx={20} />
      <text className="label" x={550} y={260} textAnchor="middle">Edge: CDN + WAF + Global Load Balancer</text>
      <text className="note" x={550} y={278} textAnchor="middle">CloudFront, AWS WAF, Route53, bot mitigation</text>

      {/* BFF/API tier */}
      <rect className="service-core" x={120} y={330} width={860} height={90} rx={20} />
      <text className="label" x={550} y={370} textAnchor="middle">API Gateway & BFF Layer</text>
      <text className="note" x={550} y={388} textAnchor="middle">WSO2 API Manager • GraphQL Federation • Rate limiting</text>

      <rect className="capability" x={150} y={350} width={200} height={56} rx={16} />
      <text className="label" x={250} y={382} textAnchor="middle">Customer BFF</text>
      <text className="note" x={250} y={400} textAnchor="middle">Session, profile, offers</text>

      <rect className="capability" x={380} y={350} width={200} height={56} rx={16} />
      <text className="label" x={480} y={382} textAnchor="middle">Commerce BFF</text>
      <text className="note" x={480} y={400} textAnchor="middle">Cart, inventory, checkout</text>

      <rect className="capability" x={610} y={350} width={200} height={56} rx={16} />
      <text className="label" x={710} y={382} textAnchor="middle">Fulfillment BFF</text>
      <text className="note" x={710} y={400} textAnchor="middle">Order status, slot booking</text>

      <rect className="capability" x={840} y={350} width={120} height={56} rx={16} />
      <text className="label" x={900} y={382} textAnchor="middle">Partner APIs</text>
      <text className="note" x={900} y={400} textAnchor="middle">OAuth, quota tiers</text>

      {/* Core services */}
      <rect className="lane-bg" x={80} y={440} width={940} height={120} rx={24} />
      <text className="lane-label" x={110} y={470}>Domain microservices</text>

      <rect className="service-core" x={120} y={470} width={180} height={70} rx={18} />
      <text className="label" x={210} y={504} textAnchor="middle">Customer 360</text>
      <text className="note" x={210} y={522} textAnchor="middle">Profiles, consent, loyalty</text>

      <rect className="service-core" x={320} y={470} width={180} height={70} rx={18} />
      <text className="label" x={410} y={504} textAnchor="middle">Product Catalog</text>
      <text className="note" x={410} y={522} textAnchor="middle">Headless PIM, search index</text>

      <rect className="service-core" x={520} y={470} width={180} height={70} rx={18} />
      <text className="label" x={610} y={504} textAnchor="middle">Order Management</text>
      <text className="note" x={610} y={522} textAnchor="middle">Sagas, payment orchestration</text>

      <rect className="service-core" x={720} y={470} width={180} height={70} rx={18} />
      <text className="label" x={810} y={504} textAnchor="middle">Fulfillment & Logistics</text>
      <text className="note" x={810} y={522} textAnchor="middle">Warehouse, carrier, slotting</text>

      <rect className="external" x={920} y={470} width={100} height={70} rx={16} />
      <text className="label" x={970} y={504} textAnchor="middle">ERP+</text>
      <text className="note" x={970} y={522} textAnchor="middle">SAP S/4, MES</text>

      {/* Integration fabric */}
      <polygon className="platform" points={hexPoints(550, 590)} />
      <text className="label" x={550} y={590} textAnchor="middle">Event Mesh</text>
      <text className="note" x={550} y={608} textAnchor="middle">Kafka • Order • Inventory • Alerts</text>

      <polygon className="platform" points={hexPoints(720, 590)} />
      <text className="label" x={720} y={590} textAnchor="middle">Integration Hub</text>
      <text className="note" x={720} y={608} textAnchor="middle">MuleSoft flows, SAP connectors</text>

      <g transform="translate(330, 560)">
        <ellipse className="datastore-fill datastore-stroke" cx={60} cy={10} rx={60} ry={10} />
        <rect className="datastore-fill datastore-stroke" x={0} y={10} width={120} height={46} />
        <ellipse className="datastore-fill datastore-stroke" cx={60} cy={56} rx={60} ry={10} />
      </g>
      <text className="label" x={390} y={626} textAnchor="middle">Unified Data Lake</text>

      {/* Connectors */}
      <path className="edge edge-sync" d="M250 184 V220" />
      <path className="edge edge-sync" d="M480 184 V220" />
      <path className="edge edge-sync" d="M710 184 V220" />
      <path className="edge edge-sync" d="M915 184 V220" />

      <path className="edge edge-sync" d="M550 300 V330" />

      <path className="edge edge-sync" d="M250 386 V470" />
      <path className="edge edge-sync" d="M480 386 V470" />
      <path className="edge edge-sync" d="M710 386 V470" />
      <path className="edge edge-sync" d="M900 386 V470" />

      <path className="edge edge-async" d="M610 540 V560" />
      <path className="edge edge-async" d="M810 540 L780 560" />
      <path className="edge edge-async" d="M410 540 V560" />

      <path className="edge edge-batch" d="M970 540 V560" />

      <Legend x={720} y={560} />
      <Glossary x={80} y={560} items={glossary} />
    </svg>
  );
}

export function SolutionL2Diagram(_: Props) {
  const glossary: GlossaryItem[] = [
    { term: "SAGA", description: "Orchestration pattern for distributed transactions" },
    { term: "Egress", description: "Dedicated outbound integration egress services" },
    { term: "Topic", description: "Kafka topic taxonomy for events" },
    { term: "Vault", description: "Secrets management (HashiCorp Vault)" },
  ];

  return (
    <svg viewBox="0 0 1100 980" role="img" aria-label="Unified Commerce Platform — Solution Architecture L2" style={{ width: "100%", height: "auto" }}>
      <style>{baseStyles}</style>
      <ArrowDefs />

      <text className="title" x={550} y={48} textAnchor="middle">Solution Architecture — Service Mesh & Integrations (L2)</text>

      <rect className="environment" x={80} y={80} width={940} height={560} rx={24} />
      <text className="lane-label" x={100} y={110}>EKS Cluster (Prod)</text>

      {/* API ingress */}
      <rect className="service" x={120} y={130} width={220} height={80} rx={18} />
      <text className="label" x={230} y={170} textAnchor="middle">Ingress Gateway</text>
      <text className="note" x={230} y={188} textAnchor="middle">Istio GW + mTLS + WAF</text>

      <rect className="service-core" x={370} y={130} width={220} height={80} rx={18} />
      <text className="label" x={480} y={170} textAnchor="middle">API Gateway Pods</text>
      <text className="note" x={480} y={188} textAnchor="middle">WSO2 autoscaling x6</text>

      <rect className="service-core" x={620} y={130} width={220} height={80} rx={18} />
      <text className="label" x={730} y={170} textAnchor="middle">BFF Services</text>
      <text className="note" x={730} y={188} textAnchor="middle">Node.js GraphQL / REST</text>

      <rect className="service" x={870} y={130} width={120} height={80} rx={18} />
      <text className="label" x={930} y={170} textAnchor="middle">Auth Adapter</text>
      <text className="note" x={930} y={188} textAnchor="middle">Keycloak sidecar</text>

      {/* Domain pods */}
      <rect className="cluster" x={120} y={240} width={880} height={170} rx={18} />
      <text className="lane-label" x={140} y={262}>Domain Microservice Pools</text>

      <rect className="service-core" x={150} y={270} width={160} height={60} rx={16} />
      <text className="label" x={230} y={306} textAnchor="middle">Customer Profile</text>
      <text className="note" x={230} y={324} textAnchor="middle">3 pods • GoLang</text>

      <rect className="service-core" x={330} y={270} width={160} height={60} rx={16} />
      <text className="label" x={410} y={306} textAnchor="middle">Catalog</text>
      <text className="note" x={410} y={324} textAnchor="middle">4 pods • Java</text>

      <rect className="service-core" x={510} y={270} width={160} height={60} rx={16} />
      <text className="label" x={590} y={306} textAnchor="middle">Pricing</text>
      <text className="note" x={590} y={324} textAnchor="middle">Rules engine • Drools</text>

      <rect className="service-core" x={690} y={270} width={160} height={60} rx={16} />
      <text className="label" x={770} y={306} textAnchor="middle">Order Saga</text>
      <text className="note" x={770} y={324} textAnchor="middle">Orchestrator + state store</text>

      <rect className="service-core" x={870} y={270} width={120} height={60} rx={16} />
      <text className="label" x={930} y={306} textAnchor="middle">Fulfillment</text>
      <text className="note" x={930} y={324} textAnchor="middle">WMS adapter</text>

      <rect className="service" x={150} y={340} width={200} height={60} rx={16} />
      <text className="label" x={250} y={376} textAnchor="middle">Recommendation Engine</text>
      <text className="note" x={250} y={394} textAnchor="middle">Python ML, GPU autoscale</text>

      <rect className="service" x={370} y={340} width={200} height={60} rx={16} />
      <text className="label" x={470} y={376} textAnchor="middle">Inventory Service</text>
      <text className="note" x={470} y={394} textAnchor="middle">Event sourcing</text>

      <rect className="service" x={590} y={340} width={200} height={60} rx={16} />
      <text className="label" x={690} y={376} textAnchor="middle">Payment Adapter</text>
      <text className="note" x={690} y={394} textAnchor="middle">PCI enclave</text>

      <rect className="service" x={810} y={340} width={160} height={60} rx={16} />
      <text className="label" x={890} y={376} textAnchor="middle">Experience Cache</text>
      <text className="note" x={890} y={394} textAnchor="middle">Redis + CDN invalidation</text>

      {/* Data and messaging */}
      <rect className="cluster" x={120} y={430} width={880} height={120} rx={18} />
      <text className="lane-label" x={140} y={452}>Streaming & Persistence</text>

      <polygon className="platform" points={hexPoints(220, 500)} />
      <text className="label" x={220} y={500} textAnchor="middle">Kafka Cluster</text>
      <text className="note" x={220} y={518} textAnchor="middle">Topics: order, payment, inventory</text>

      <polygon className="platform" points={hexPoints(420, 500)} />
      <text className="label" x={420} y={500} textAnchor="middle">Schema Registry</text>
      <text className="note" x={420} y={518} textAnchor="middle">Contracts + compatibility</text>

      <g transform="translate(520, 470)">
        <ellipse className="datastore-fill datastore-stroke" cx={60} cy={10} rx={60} ry={10} />
        <rect className="datastore-fill datastore-stroke" x={0} y={10} width={120} height={46} />
        <ellipse className="datastore-fill datastore-stroke" cx={60} cy={56} rx={60} ry={10} />
      </g>
      <text className="label" x={580} y={536} textAnchor="middle">Operational Data Store</text>
      <text className="note" x={580} y={554} textAnchor="middle">Aurora PostgreSQL</text>

      <g transform="translate(710, 470)">
        <ellipse className="datastore-fill datastore-stroke" cx={60} cy={10} rx={60} ry={10} />
        <rect className="datastore-fill datastore-stroke" x={0} y={10} width={120} height={46} />
        <ellipse className="datastore-fill datastore-stroke" cx={60} cy={56} rx={60} ry={10} />
      </g>
      <text className="label" x={770} y={536} textAnchor="middle">Analytics Lake</text>
      <text className="note" x={770} y={554} textAnchor="middle">Snowflake + dbt pipelines</text>

      <polygon className="platform planned" points={hexPoints(900, 500)} />
      <text className="label" x={900} y={500} textAnchor="middle">ML Feature Store</text>
      <text className="note" x={900} y={518} textAnchor="middle">Feast (roadmap)</text>

      {/* Integration / egress */}
      <rect className="cluster" x={120} y={560} width={880} height={70} rx={18} />
      <text className="lane-label" x={140} y={586}>Integration egress</text>

      <rect className="service" x={150} y={580} width={200} height={40} rx={12} />
      <text className="label" x={250} y={606} textAnchor="middle">ERP Connector</text>
      <text className="note" x={250} y={624} textAnchor="middle">MuleSoft SAP</text>

      <rect className="service" x={380} y={580} width={200} height={40} rx={12} />
      <text className="label" x={480} y={606} textAnchor="middle">CRM Connector</text>
      <text className="note" x={480} y={624} textAnchor="middle">Salesforce streaming</text>

      <rect className="service" x={610} y={580} width={200} height={40} rx={12} />
      <text className="label" x={710} y={606} textAnchor="middle">3PL Gateway</text>
      <text className="note" x={710} y={624} textAnchor="middle">Carrier APIs</text>

      <rect className="service" x={840} y={580} width={140} height={40} rx={12} />
      <text className="label" x={910} y={606} textAnchor="middle">Monitoring</text>
      <text className="note" x={910} y={624} textAnchor="middle">Prometheus, Grafana, Loki</text>

      {/* Connectors */}
      <path className="edge edge-sync" d="M340 170 H370" />
      <path className="edge edge-sync" d="M590 170 H620" />
      <path className="edge edge-sync" d="M840 170 H870" />

      <path className="edge edge-sync" d="M230 210 V270" />
      <path className="edge edge-sync" d="M480 210 V270" />
      <path className="edge edge-sync" d="M730 210 V270" />
      <path className="edge edge-sync" d="M930 210 V270" />

      <path className="edge edge-async" d="M410 330 V340" />
      <path className="edge edge-async" d="M590 330 V340" />
      <path className="edge edge-async" d="M770 330 V340" />

      <path className="edge edge-async" d="M470 400 V430" />
      <path className="edge edge-async" d="M690 400 V430" />
      <path className="edge edge-async" d="M890 400 V430" />
      <path className="edge edge-async" d="M230 400 V430" />

      <path className="edge edge-async" d="M220 520 V560" />
      <path className="edge edge-async" d="M420 520 V560" />
      <path className="edge edge-async" d="M580 516 Q580 540 480 580" />
      <path className="edge edge-batch" d="M770 520 V580" />
      <path className="edge edge-batch" d="M900 520 V580" />

      <Legend x={720} y={660} />
      <Glossary x={80} y={660} items={glossary} />
    </svg>
  );
}

export function DeploymentL0Diagram(_: Props) {
  const glossary: GlossaryItem[] = [
    { term: "Region", description: "Primary cloud region (eu-west-1) with multi-AZ" },
    { term: "Active-Active", description: "Blue/green across regions with global routing" },
    { term: "Mesh", description: "Service mesh (Istio) with zero-trust networking" },
    { term: "Observability", description: "Centralized logging, metrics, tracing stack" },
  ];

  return (
    <svg viewBox="0 0 1100 880" role="img" aria-label="Unified Commerce Platform — Deployment Architecture L0" style={{ width: "100%", height: "auto" }}>
      <style>{baseStyles}</style>
      <ArrowDefs />

      <text className="title" x={550} y={48} textAnchor="middle">Deployment Topology — Global Footprint (L0)</text>

      <rect className="environment" x={120} y={100} width={380} height={240} rx={24} />
      <text className="lane-label" x={140} y={130}>Region A — EU (Ireland)</text>
      <rect className="service" x={150} y={150} width={330} height={70} rx={18} />
      <text className="label" x={315} y={188} textAnchor="middle">EKS Cluster (prod-a)</text>
      <text className="note" x={315} y={206} textAnchor="middle">3 AZ nodes, Istio mesh</text>
      <rect className="platform" x={180} y={240} width={270} height={70} rx={16} />
      <text className="label" x={315} y={276} textAnchor="middle">Confluent Kafka (managed)</text>
      <text className="note" x={315} y={294} textAnchor="middle">Multi-zone, 3 brokers</text>

      <rect className="environment" x={600} y={100} width={380} height={240} rx={24} />
      <text className="lane-label" x={620} y={130}>Region B — US (N. Virginia)</text>
      <rect className="service" x={630} y={150} width={330} height={70} rx={18} />
      <text className="label" x={795} y={188} textAnchor="middle">EKS Cluster (prod-b)</text>
      <text className="note" x={795} y={206} textAnchor="middle">3 AZ nodes, Istio mesh</text>
      <rect className="platform planned" x={660} y={240} width={270} height={70} rx={16} />
      <text className="label" x={795} y={276} textAnchor="middle">AI Inference Platform</text>
      <text className="note" x={795} y={294} textAnchor="middle">GPU autoscale (Q3 rollout)</text>

      <rect className="service" x={320} y={360} width={460} height={80} rx={18} />
      <text className="label" x={550} y={400} textAnchor="middle">Global Services Layer</text>
      <text className="note" x={550} y={418} textAnchor="middle">Route53 latency routing • CloudFront • WAF</text>

      <polygon className="platform" points={hexPoints(250, 470)} />
      <text className="label" x={250} y={470} textAnchor="middle">Secrets Manager</text>
      <text className="note" x={250} y={488} textAnchor="middle">HashiCorp Vault (multi-region)</text>

      <polygon className="platform" points={hexPoints(550, 470)} />
      <text className="label" x={550} y={470} textAnchor="middle">Observability Stack</text>
      <text className="note" x={550} y={488} textAnchor="middle">Prometheus, Tempo, Loki</text>

      <polygon className="platform" points={hexPoints(850, 470)} />
      <text className="label" x={850} y={470} textAnchor="middle">Data Platform</text>
      <text className="note" x={850} y={488} textAnchor="middle">Snowflake multi-cluster warehouses</text>

      <path className="edge edge-sync" d="M500 190 H600" />
      <path className="edge edge-async" d="M450 275 Q550 320 660 275" />
      <path className="edge edge-batch" d="M315 310 V360" />
      <path className="edge edge-batch" d="M795 310 V360" />

      <Legend x={720} y={560} />
      <Glossary x={120} y={560} items={glossary} />
    </svg>
  );
}

export function DeploymentL1Diagram(_: Props) {
  const glossary: GlossaryItem[] = [
    { term: "NodeGroup", description: "EKS managed node groups by workload class" },
    { term: "AZ", description: "Availability Zone - isolated failure domain" },
    { term: "HPA", description: "Horizontal Pod Autoscaler thresholds" },
    { term: "Vault", description: "Secrets injection into pods via sidecars" },
  ];

  return (
    <svg viewBox="0 0 1100 940" role="img" aria-label="Unified Commerce Platform — Deployment Architecture L1" style={{ width: "100%", height: "auto" }}>
      <style>{baseStyles}</style>
      <ArrowDefs />

      <text className="title" x={550} y={48} textAnchor="middle">Deployment Architecture — EKS & Shared Services (L1)</text>

      <rect className="environment" x={80} y={90} width={940} height={520} rx={24} />
      <text className="lane-label" x={100} y={122}>Region EU — prod-a</text>

      {/* AZ columns */}
      <rect className="cluster" x={120} y={140} width={260} height={420} rx={18} />
      <text className="lane-label" x={140} y={164}>AZ-a</text>

      <rect className="cluster" x={410} y={140} width={260} height={420} rx={18} />
      <text className="lane-label" x={430} y={164}>AZ-b</text>

      <rect className="cluster" x={700} y={140} width={260} height={420} rx={18} />
      <text className="lane-label" x={720} y={164}>AZ-c</text>

      {/* Node groups in AZ-a */}
      <rect className="service" x={140} y={190} width={220} height={90} rx={16} />
      <text className="label" x={250} y={230} textAnchor="middle">NodeGroup: Edge</text>
      <text className="note" x={250} y={248} textAnchor="middle">m6i.large x6 • HPA 40-80%</text>

      <rect className="service" x={140} y={300} width={220} height={90} rx={16} />
      <text className="label" x={250} y={340} textAnchor="middle">NodeGroup: Core Services</text>
      <text className="note" x={250} y={358} textAnchor="middle">c6i.xlarge x8 • 2 replicas each</text>

      <rect className="service" x={140} y={410} width={220} height={90} rx={16} />
      <text className="label" x={250} y={450} textAnchor="middle">NodeGroup: Data</text>
      <text className="note" x={250} y={468} textAnchor="middle">c6i.2xlarge x3 • Kafka Connect</text>

      {/* Node groups in AZ-b */}
      <rect className="service" x={430} y={190} width={220} height={90} rx={16} />
      <text className="label" x={540} y={230} textAnchor="middle">NodeGroup: Services</text>
      <text className="note" x={540} y={248} textAnchor="middle">General workloads, autoscale</text>

      <rect className="service" x={430} y={300} width={220} height={90} rx={16} />
      <text className="label" x={540} y={340} textAnchor="middle">StatefulSet: Order Saga</text>
      <text className="note" x={540} y={358} textAnchor="middle">3 shards, volume replication</text>

      <rect className="service" x={430} y={410} width={220} height={90} rx={16} />
      <text className="label" x={540} y={450} textAnchor="middle">DaemonSet: Service Mesh</text>
      <text className="note" x={540} y={468} textAnchor="middle">Istio sidecars, mTLS certificates</text>

      {/* Node groups in AZ-c */}
      <rect className="service" x={720} y={190} width={220} height={90} rx={16} />
      <text className="label" x={830} y={230} textAnchor="middle">NodeGroup: Async</text>
      <text className="note" x={830} y={248} textAnchor="middle">Kafka, streaming, workers</text>

      <rect className="service" x={720} y={300} width={220} height={90} rx={16} />
      <text className="label" x={830} y={340} textAnchor="middle">NodeGroup: AI</text>
      <text className="note" x={830} y={358} textAnchor="middle">g5.xlarge x2 • TensorRT</text>

      <rect className="service" x={720} y={410} width={220} height={90} rx={16} />
      <text className="label" x={830} y={450} textAnchor="middle">NodeGroup: Jobs</text>
      <text className="note" x={830} y={468} textAnchor="middle">Batch ETL, Argo Workflows</text>

      {/* Shared services */}
      <rect className="platform" x={140} y={530} width={780} height={60} rx={18} />
      <text className="label" x={530} y={566} textAnchor="middle">Shared Services: Vault injector • Prometheus • Loki • Tempo • External DNS</text>

      <rect className="external" x={160} y={600} width={220} height={50} rx={14} />
      <text className="label" x={270} y={632} textAnchor="middle">RDS Aurora PostgreSQL (Multi-AZ)</text>

      <rect className="external" x={440} y={600} width={220} height={50} rx={14} />
      <text className="label" x={550} y={632} textAnchor="middle">Redis Enterprise (Global Active)</text>

      <rect className="external" x={720} y={600} width={220} height={50} rx={14} />
      <text className="label" x={830} y={632} textAnchor="middle">Snowflake (cross-region)</text>

      {/* Connectors */}
      <path className="edge edge-async" d="M330 230 H430" />
      <path className="edge edge-async" d="M620 230 H720" />
      <path className="edge edge-async" d="M330 340 H430" />
      <path className="edge edge-async" d="M620 340 H720" />
      <path className="edge edge-async" d="M330 450 H430" />
      <path className="edge edge-async" d="M620 450 H720" />

      <path className="edge edge-batch" d="M530 570 V600" />

      <Legend x={720} y={620} />
      <Glossary x={100} y={620} items={glossary} />
    </svg>
  );
}

export function DeploymentL2Diagram(_: Props) {
  const glossary: GlossaryItem[] = [
    { term: "CIDR", description: "Subnet addressing per AZ" },
    { term: "NLB", description: "AWS Network Load Balancer for gRPC/HTTP2" },
    { term: "PodDisruption", description: "Budget across microservices" },
    { term: "Backup", description: "Continuous backup to cross-region bucket" },
  ];

  return (
    <svg viewBox="0 0 1100 940" role="img" aria-label="Unified Commerce Platform — Deployment Architecture L2" style={{ width: "100%", height: "auto" }}>
      <style>{baseStyles}</style>
      <ArrowDefs />

      <text className="title" x={550} y={48} textAnchor="middle">Deployment Architecture — Detailed View (L2)</text>

      <rect className="environment" x={80} y={90} width={940} height={520} rx={24} />
      <text className="lane-label" x={100} y={122}>VPC 10.16.0.0/16 — prod-a</text>

      {/* Networking */}
      <rect className="cluster" x={110} y={130} width={900} height={120} rx={18} />
      <text className="lane-label" x={130} y={154}>Networking & ingress</text>
      <rect className="service" x={140} y={160} width={200} height={60} rx={16} />
      <text className="label" x={240} y={194} textAnchor="middle">Public Subnet 10.16.10.0/24</text>
      <text className="note" x={240} y={212} textAnchor="middle">ALB + WAF</text>
      <rect className="service" x={360} y={160} width={200} height={60} rx={16} />
      <text className="label" x={460} y={194} textAnchor="middle">NLB 10.16.20.0/24</text>
      <text className="note" x={460} y={212} textAnchor="middle">gRPC/gateway</text>
      <rect className="service" x={580} y={160} width={200} height={60} rx={16} />
      <text className="label" x={680} y={194} textAnchor="middle">Private Subnet 10.16.30.0/24</text>
      <text className="note" x={680} y={212} textAnchor="middle">Services</text>
      <rect className="service" x={800} y={160} width={180} height={60} rx={16} />
      <text className="label" x={890} y={194} textAnchor="middle">Private Subnet 10.16.40.0/24</text>
      <text className="note" x={890} y={212} textAnchor="middle">Data</text>

      {/* Control plane */}
      <rect className="cluster" x={110} y={260} width={900} height={160} rx={18} />
      <text className="lane-label" x={130} y={284}>Control plane & shared workloads</text>

      <rect className="service" x={140} y={300} width={200} height={60} rx={16} />
      <text className="label" x={240} y={334} textAnchor="middle">Istio Pilot x3</text>
      <text className="note" x={240} y={352} textAnchor="middle">PodDisruptionBudget 1</text>

      <rect className="service" x={360} y={300} width={200} height={60} rx={16} />
      <text className="label" x={460} y={334} textAnchor="middle">Cert Manager</text>
      <text className="note" x={460} y={352} textAnchor="middle">ACME, Vault issuer</text>

      <rect className="service" x={580} y={300} width={200} height={60} rx={16} />
      <text className="label" x={680} y={334} textAnchor="middle">Argo CD</text>
      <text className="note" x={680} y={352} textAnchor="middle">GitOps pipelines</text>

      <rect className="service" x={800} y={300} width={180} height={60} rx={16} />
      <text className="label" x={890} y={334} textAnchor="middle">Vault Agent Injector</text>
      <text className="note" x={890} y={352} textAnchor="middle">Sidecar secrets, PKI</text>

      <rect className="service" x={140} y={370} width={230} height={60} rx={16} />
      <text className="label" x={255} y={404} textAnchor="middle">Prometheus + Thanos sidecar</text>
      <text className="note" x={255} y={422} textAnchor="middle">15d retention</text>

      <rect className="service" x={400} y={370} width={230} height={60} rx={16} />
      <text className="label" x={515} y={404} textAnchor="middle">Loki + Tempo</text>
      <text className="note" x={515} y={422} textAnchor="middle">Logs/traces (OTLP)</text>

      <rect className="service" x={660} y={370} width={230} height={60} rx={16} />
      <text className="label" x={775} y={404} textAnchor="middle">ExternalDNS</text>
      <text className="note" x={775} y={422} textAnchor="middle">Route53 sync</text>

      {/* Workload plane */}
      <rect className="cluster" x={110} y={440} width={900} height={130} rx={18} />
      <text className="lane-label" x={130} y={464}>Workload namespaces</text>

      <rect className="service-core" x={140} y={470} width={200} height={70} rx={16} />
      <text className="label" x={240} y={504} textAnchor="middle">ns:experience</text>
      <text className="note" x={240} y={522} textAnchor="middle">BFF, personalization, caching</text>

      <rect className="service-core" x={360} y={470} width={200} height={70} rx={16} />
      <text className="label" x={460} y={504} textAnchor="middle">ns:commerce</text>
      <text className="note" x={460} y={522} textAnchor="middle">Pricing, cart, order saga</text>

      <rect className="service-core" x={580} y={470} width={200} height={70} rx={16} />
      <text className="label" x={680} y={504} textAnchor="middle">ns:fulfillment</text>
      <text className="note" x={680} y={522} textAnchor="middle">Warehouse, carrier, slots</text>

      <rect className="service-core" x={800} y={470} width={200} height={70} rx={16} />
      <text className="label" x={900} y={504} textAnchor="middle">ns:data-ai</text>
      <text className="note" x={900} y={522} textAnchor="middle">ML pipelines, streaming</text>

      {/* Backup & replication */}
      <rect className="service" x={140} y={580} width={380} height={50} rx={14} />
      <text className="label" x={330} y={612} textAnchor="middle">Backup: Velero to S3 (15 min RPO)</text>

      <rect className="service" x={540} y={580} width={380} height={50} rx={14} />
      <text className="label" x={730} y={612} textAnchor="middle">Cross-region replication to prod-b bucket</text>

      {/* Connectors */}
      <path className="edge edge-sync" d="M340 190 H360" />
      <path className="edge edge-sync" d="M560 190 H580" />
      <path className="edge edge-sync" d="M780 190 H800" />

      <path className="edge edge-async" d="M240 220 V300" />
      <path className="edge edge-async" d="M460 220 V300" />
      <path className="edge edge-async" d="M680 220 V300" />
      <path className="edge edge-async" d="M890 220 V300" />

      <path className="edge edge-async" d="M255 430 V470" />
      <path className="edge edge-async" d="M515 430 V470" />
      <path className="edge edge-async" d="M775 430 V470" />

      <path className="edge edge-batch" d="M330 630 H540" />

      <Legend x={720} y={620} />
      <Glossary x={100} y={620} items={glossary} />
    </svg>
  );
}
