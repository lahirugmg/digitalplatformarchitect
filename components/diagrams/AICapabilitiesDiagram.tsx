export function AICapabilitiesDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    primary: "var(--primary-light)",
    orange: "var(--orange-light)",
    data: "var(--purple-light)",
    devops: "var(--cyan-light)",
    security: "var(--red-light)",
    green: "var(--green-light)",
    blue: "var(--blue-light)",
  } as const;

  const font = "600 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 11px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontMini = "500 10px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 1200 720" role="img" aria-labelledby="ai-cap-title ai-cap-desc" preserveAspectRatio="xMidYMid meet">
      <title id="ai-cap-title">AI Capabilities in Digital Platforms</title>
      <desc id="ai-cap-desc">Diagram showing AI for Code and Code for AI capabilities across platform building blocks.</desc>

      <defs>
        <marker id="arrow-ai" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
        </marker>
        <linearGradient id="aiBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c.primary} stopOpacity="0.15"/>
          <stop offset="100%" stopColor={c.primary} stopOpacity="0.05"/>
        </linearGradient>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="1200" height="720" fill="url(#aiBg)" />

      {/* Title */}
      <text x="600" y="40" textAnchor="middle" fill={c.text} style={{ font: "700 18px system-ui" }}>AI + Digital Platform: Capabilities</text>
      <text x="600" y="60" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Two lenses: AI for Code and Code for AI</text>

      {/* Left: AI for Code */}
      <rect x="60" y="90" width="510" height="520" fill={c.orange} stroke={c.border} rx="16" ry="16" opacity="0.35" />
      <text x="80" y="115" fill={c.text} style={{ font: "700 16px system-ui" }}>🤖 AI for Code</text>
      <text x="80" y="135" fill={c.subtle} style={{ font: fontMini }}>AI accelerates design, build, and operations</text>

      {/* For Code: three lanes */}
      <rect x="80" y="160" width="470" height="120" fill={c.blue} stroke={c.border} rx="10" ry="10" />
      <text x="100" y="185" fill={c.text} style={{ font: fontSub }}>Design & Plan</text>
      <text x="100" y="205" fill={c.subtle} style={{ font: fontMini }}>• Natural-language integration design</text>
      <text x="100" y="220" fill={c.subtle} style={{ font: fontMini }}>• Pattern guidance, risk and trade-off analysis</text>
      <text x="100" y="235" fill={c.subtle} style={{ font: fontMini }}>• API discovery and contract suggestions</text>

      <rect x="80" y="300" width="470" height="120" fill={c.green} stroke={c.border} rx="10" ry="10" />
      <text x="100" y="325" fill={c.text} style={{ font: fontSub }}>Build & Test</text>
      <text x="100" y="345" fill={c.subtle} style={{ font: fontMini }}>• Scaffolds services and integration flows</text>
      <text x="100" y="360" fill={c.subtle} style={{ font: fontMini }}>• Generates tests, mocks, and data contracts</text>
      <text x="100" y="375" fill={c.subtle} style={{ font: fontMini }}>• Recommends messaging partitions and policies</text>

      <rect x="80" y="440" width="470" height="120" fill={c.devops} stroke={c.border} rx="10" ry="10" />
      <text x="100" y="465" fill={c.text} style={{ font: fontSub }}>Operate & Optimize</text>
      <text x="100" y="485" fill={c.subtle} style={{ font: fontMini }}>• Incident summarization and remediation hints</text>
      <text x="100" y="500" fill={c.subtle} style={{ font: fontMini }}>• SLO insights, cost and capacity tuning</text>
      <text x="100" y="515" fill={c.subtle} style={{ font: fontMini }}>• Postmortem drafts and runbook generation</text>

      {/* Right: Code for AI */}
      <rect x="630" y="90" width="510" height="520" fill={c.data} stroke={c.border} rx="16" ry="16" opacity="0.35" />
      <text x="650" y="115" fill={c.text} style={{ font: "700 16px system-ui" }}>🧱 Code for AI</text>
      <text x="650" y="135" fill={c.subtle} style={{ font: fontMini }}>Platform building blocks power AI safely</text>

      {/* For AI blocks */}
      <rect x="650" y="160" width="470" height="110" fill={c.data} stroke={c.border} rx="10" ry="10" />
      <text x="670" y="185" fill={c.text} style={{ font: fontSub }}>Data Platform</text>
      <text x="670" y="205" fill={c.subtle} style={{ font: fontMini }}>• Vector stores, feature stores, lineage & consent</text>
      <text x="670" y="220" fill={c.subtle} style={{ font: fontMini }}>• Retrieval‑Augmented Generation (RAG) services</text>

      <rect x="650" y="290" width="470" height="110" fill={c.blue} stroke={c.border} rx="10" ry="10" />
      <text x="670" y="315" fill={c.text} style={{ font: fontSub }}>Messaging & Integration</text>
      <text x="670" y="335" fill={c.subtle} style={{ font: fontMini }}>• Event bus for agents and streaming inference</text>
      <text x="670" y="350" fill={c.subtle} style={{ font: fontMini }}>• Orchestration to ERP/CRM via managed APIs</text>

      <rect x="650" y="420" width="470" height="110" fill={c.devops} stroke={c.border} rx="10" ry="10" />
      <text x="670" y="445" fill={c.text} style={{ font: fontSub }}>Runtime, Security & Observability</text>
      <text x="670" y="465" fill={c.subtle} style={{ font: fontMini }}>• Identity, scopes, and policy enforcement</text>
      <text x="670" y="480" fill={c.subtle} style={{ font: fontMini }}>• Inference services on standardized platforms</text>
      <text x="670" y="495" fill={c.subtle} style={{ font: fontMini }}>• Prompt/response telemetry, cost & quality</text>

      {/* Relationship arrows */}
      <path d="M 550 220 L 630 220" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow-ai)" />
      <path d="M 550 360 L 630 360" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow-ai)" />
      <path d="M 550 500 L 630 500" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow-ai)" />

      {/* Legend */}
      <rect x="60" y="630" width="1080" height="60" fill={c.surface} stroke={c.border} rx="12" ry="12" />
      <text x="80" y="655" fill={c.subtle} style={{ font: fontMini }}>Legend</text>
      <rect x="80" y="665" width="12" height="10" fill={c.orange} stroke={c.border} rx="2" />
      <text x="98" y="673" fill={c.subtle} style={{ font: fontMini }}>AI for Code (assistants, copilots)</text>
      <rect x="340" y="665" width="12" height="10" fill={c.data} stroke={c.border} rx="2" />
      <text x="358" y="673" fill={c.subtle} style={{ font: fontMini }}>Code for AI (platform blocks)</text>
      <rect x="650" y="665" width="12" height="10" fill={c.devops} stroke={c.border} rx="2" />
      <text x="668" y="673" fill={c.subtle} style={{ font: fontMini }}>Runtime/Security/Observability</text>
    </svg>
  );
}

