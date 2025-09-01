export function AIFocusedCapabilitiesDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    primary: "var(--primary-light)",
    orange: "var(--orange-light)",
    blue: "var(--blue-light)",
    green: "var(--green-light)",
    purple: "var(--purple-light)",
    cyan: "var(--cyan-light)",
    red: "var(--red-light)",
    yellow: "var(--yellow-light)",
  } as const;

  const font = "600 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontTitle = "700 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontMini = "500 11px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 1600 1400" role="img" aria-labelledby="ai-focus-title ai-focus-desc" preserveAspectRatio="xMidYMid meet">
      <title id="ai-focus-title">AI + Digital Platform: Capabilities</title>
      <desc id="ai-focus-desc">Focused view of AI for Code and Code for AI across platform building blocks with use cases and KPIs.</desc>

      <defs>
        <linearGradient id="aiFocusBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c.primary} stopOpacity="0.15" />
          <stop offset="100%" stopColor={c.primary} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="1600" height="1400" fill="url(#aiFocusBg)" />

      {/* Title */}
      <text x="800" y="48" textAnchor="middle" fill={c.text} style={{ font: "700 20px system-ui" }}>AI + Digital Platform: Capabilities</text>
      <text x="800" y="70" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Focused building blocks with AI for Code, Code for AI, use cases, and KPIs</text>

      {/* Layout constants (manually applied) */}
      {/* Card size: 720w x 260h, gap 40 */}

      {/* Row 1 */}
      <g>
        {/* Messaging & Streaming Platforms */}
        <rect x="60" y="100" width="720" height="260" fill={c.yellow} stroke={c.border} rx="16" ry="16" opacity="0.35" />
        <text x="80" y="125" fill={c.text} style={{ font: fontTitle }}>🟡 Messaging & Streaming Platforms</text>
        <text x="80" y="145" fill={c.subtle} style={{ font: fontMini }}>Asynchronous queues, topics, and log-based streams with security and observability.</text>

        <text x="80" y="170" fill={c.text} style={{ font }}>AI for Code</text>
        <text x="80" y="188" fill={c.subtle} style={{ font: fontMini }}>• Copilots suggest partitions/retention; auto-generate stream jobs & schemas</text>
        <text x="80" y="204" fill={c.subtle} style={{ font: fontMini }}>• Chaos simulations validate retries and back-pressure strategies</text>

        <text x="80" y="228" fill={c.text} style={{ font }}>Code for AI</text>
        <text x="80" y="246" fill={c.subtle} style={{ font: fontMini }}>• Real-time inference pipelines; multi-agent orchestration; replayable logs for vectors</text>

        <text x="80" y="270" fill={c.text} style={{ font }}>Use Case</text>
        <text x="80" y="288" fill={c.subtle} style={{ font: fontMini }}>Bank fraud scoring on Kafka; under 100ms scoring; alerts to agents</text>

        <text x="480" y="288" textAnchor="start" fill={c.subtle} style={{ font: fontMini }}><tspan fontWeight="700">KPIs:</tspan> p99 latency, consumer lag, failover time</text>
      </g>

      <g>
        {/* Enterprise Integration */}
        <rect x="820" y="100" width="720" height="260" fill={c.blue} stroke={c.border} rx="16" ry="16" opacity="0.35" />
        <text x="840" y="125" fill={c.text} style={{ font: fontTitle }}>🔵 Enterprise Integration</text>
        <text x="840" y="145" fill={c.subtle} style={{ font: fontMini }}>Connect heterogeneous systems reliably and securely.</text>

        <text x="840" y="170" fill={c.text} style={{ font }}>AI for Code</text>
        <text x="840" y="188" fill={c.subtle} style={{ font: fontMini }}>• NL designer: “Connect SAP orders to Salesforce CRM”</text>
        <text x="840" y="204" fill={c.subtle} style={{ font: fontMini }}>• Error triage explains DLQ messages in plain English</text>

        <text x="840" y="228" fill={c.text} style={{ font }}>Code for AI</text>
        <text x="840" y="246" fill={c.subtle} style={{ font: fontMini }}>• Orchestrates agent tool calls with compensations; managed MCP integrations</text>

        <text x="840" y="270" fill={c.text} style={{ font }}>Use Case</text>
        <text x="840" y="288" fill={c.subtle} style={{ font: fontMini }}>AI service desk resets password, updates CRM, notifies employee</text>

        <text x="1240" y="288" textAnchor="start" fill={c.subtle} style={{ font: fontMini }}><tspan fontWeight="700">KPIs:</tspan> MTTR, % AI‑generated flows, autonomous success</text>
      </g>

      {/* Row 2 */}
      <g>
        {/* API Management */}
        <rect x="60" y="390" width="720" height="260" fill={c.orange} stroke={c.border} rx="16" ry="16" opacity="0.35" />
        <text x="80" y="415" fill={c.text} style={{ font: fontTitle }}>🟠 API Management</text>
        <text x="80" y="435" fill={c.subtle} style={{ font: fontMini }}>Design, publish, secure, and observe APIs as products.</text>

        <text x="80" y="460" fill={c.text} style={{ font }}>AI for Code</text>
        <text x="80" y="478" fill={c.subtle} style={{ font: fontMini }}>• Conversational API design and automatic test generation</text>
        <text x="80" y="494" fill={c.subtle} style={{ font: fontMini }}>• Smart discovery in developer portals</text>

        <text x="80" y="518" fill={c.text} style={{ font }}>Code for AI</text>
        <text x="80" y="536" fill={c.subtle} style={{ font: fontMini }}>• APIs as safe tools (policies, quotas, scopes); managed MCP; egress gateway</text>

        <text x="80" y="560" fill={c.text} style={{ font }}>Use Case</text>
        <text x="80" y="578" fill={c.subtle} style={{ font: fontMini }}>Portal suggests payment API, generates SDK, enforces rate limits</text>

        <text x="480" y="578" textAnchor="start" fill={c.subtle} style={{ font: fontMini }}><tspan fontWeight="700">KPIs:</tspan> TTF call, AI‑discovered APIs, policy blocks</text>
      </g>

      <g>
        {/* Data Platforms */}
        <rect x="820" y="390" width="720" height="260" fill={c.purple} stroke={c.border} rx="16" ry="16" opacity="0.35" />
        <text x="840" y="415" fill={c.text} style={{ font: fontTitle }}>🟣 Data Platforms</text>
        <text x="840" y="435" fill={c.subtle} style={{ font: fontMini }}>Lakehouse, analytics, and ML pipelines with governance.</text>

        <text x="840" y="460" fill={c.text} style={{ font }}>AI for Code</text>
        <text x="840" y="478" fill={c.subtle} style={{ font: fontMini }}>• Natural language → SQL; AI‑suggested DQ rules; lineage summaries</text>

        <text x="840" y="502" fill={c.text} style={{ font }}>Code for AI</text>
        <text x="840" y="520" fill={c.subtle} style={{ font: fontMini }}>• Feature stores & vector DBs; train/infer pipelines; model registry</text>

        <text x="840" y="544" fill={c.text} style={{ font }}>Use Case</text>
        <text x="840" y="562" fill={c.subtle} style={{ font: fontMini }}>Governed RAG: ingest with lineage/consent → secure embeddings → support</text>

        <text x="1240" y="562" textAnchor="start" fill={c.subtle} style={{ font: fontMini }}><tspan fontWeight="700">KPIs:</tspan> freshness SLA, feature reuse, RAG accuracy</text>
      </g>

      {/* Row 3 */}
      <g>
        {/* Internal Developer Platform (IDP) */}
        <rect x="60" y="680" width="720" height="260" fill={c.cyan} stroke={c.border} rx="16" ry="16" opacity="0.35" />
        <text x="80" y="705" fill={c.text} style={{ font: fontTitle }}>🔷 Internal Developer Platform (IDP)</text>
        <text x="80" y="725" fill={c.subtle} style={{ font: fontMini }}>Golden paths and self‑service for reliable delivery.</text>

        <text x="80" y="750" fill={c.text} style={{ font }}>AI for Code</text>
        <text x="80" y="768" fill={c.subtle} style={{ font: fontMini }}>• Blueprint generation; AI SRE suggests autoscaling & cost policies</text>

        <text x="80" y="792" fill={c.text} style={{ font }}>Code for AI</text>
        <text x="80" y="810" fill={c.subtle} style={{ font: fontMini }}>• Inference templates with canary/A‑B; agent sandboxes with tool catalogs</text>

        <text x="80" y="834" fill={c.text} style={{ font }}>Use Case</text>
        <text x="80" y="852" fill={c.subtle} style={{ font: fontMini }}>Spin up safe AI agent sandbox; guardrails baked‑in</text>

        <text x="480" y="852" textAnchor="start" fill={c.subtle} style={{ font: fontMini }}><tspan fontWeight="700">KPIs:</tspan> lead time, % golden‑path launches, cost/inference</text>
      </g>

      <g>
        {/* Identity & Access Management (IAM) */}
        <rect x="820" y="680" width="720" height="260" fill={c.red} stroke={c.border} rx="16" ry="16" opacity="0.35" />
        <text x="840" y="705" fill={c.text} style={{ font: fontTitle }}>🔴 Identity & Access Management (IAM)</text>
        <text x="840" y="725" fill={c.subtle} style={{ font: fontMini }}>Centralized identity, authentication, authorization, and federation.</text>

        <text x="840" y="750" fill={c.text} style={{ font }}>AI for Code</text>
        <text x="840" y="768" fill={c.subtle} style={{ font: fontMini }}>• Risk‑based MFA flows; conversational policy editor</text>

        <text x="840" y="792" fill={c.text} style={{ font }}>Code for AI</text>
        <text x="840" y="810" fill={c.subtle} style={{ font: fontMini }}>• OAuth2/OIDC scoped tokens for agents; consent & purpose binding</text>

        <text x="840" y="834" fill={c.text} style={{ font }}>Use Case</text>
        <text x="840" y="852" fill={c.subtle} style={{ font: fontMini }}>Federated access for third‑party AI apps with per‑tenant scopes</text>

        <text x="1240" y="852" textAnchor="start" fill={c.subtle} style={{ font: fontMini }}><tspan fontWeight="700">KPIs:</tspan> auth failures avoided, prompts blocked, consent audits</text>
      </g>

      {/* Row 4 */}
      <g>
        {/* Observability & Operations */}
        <rect x="60" y="970" width="720" height="260" fill={c.green} stroke={c.border} rx="16" ry="16" opacity="0.35" />
        <text x="80" y="995" fill={c.text} style={{ font: fontTitle }}>🟢 Observability & Operations</text>
        <text x="80" y="1015" fill={c.subtle} style={{ font: fontMini }}>Telemetry, tracing, and visibility across all layers.</text>

        <text x="80" y="1040" fill={c.text} style={{ font }}>AI for Code</text>
        <text x="80" y="1058" fill={c.subtle} style={{ font: fontMini }}>• LLMs summarize incidents and draft postmortems; explain anomalies</text>

        <text x="80" y="1082" fill={c.text} style={{ font }}>Code for AI</text>
        <text x="80" y="1100" fill={c.subtle} style={{ font: fontMini }}>• Correlate prompts ↔ API calls ↔ traces; drift & cost monitoring</text>

        <text x="80" y="1124" fill={c.text} style={{ font }}>Use Case</text>
        <text x="80" y="1142" fill={c.subtle} style={{ font: fontMini }}>Drift detected in sentiment; automatic rollback to prior model</text>

        <text x="480" y="1142" textAnchor="start" fill={c.subtle} style={{ font: fontMini }}><tspan fontWeight="700">KPIs:</tspan> MTTR, auto‑remediations, eval pass rate, cost/request</text>
      </g>
    </svg>
  );
}
