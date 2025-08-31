export function MonolithicDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    alt: "var(--surface-alt)",
    monolith: "var(--primary-light)",
    module: "var(--orange-light)",
    shared: "var(--purple-light)",
    infra: "var(--green-light)",
  } as const;

  const font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontTitle = "700 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 900 600" role="img" aria-labelledby="monolithic-title monolithic-desc" preserveAspectRatio="xMidYMid meet">
      <title id="monolithic-title">Monolithic Architecture</title>
      <desc id="monolithic-desc">Single deployable application with internal modular structure and shared infrastructure.</desc>
      
      <defs>
        <marker id="arrow-mono" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
        <pattern id="grid-mono" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c.border} strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <linearGradient id="monolith-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.monolith} />
          <stop offset="100%" stopColor={c.module} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Background grid */}
      <rect width="900" height="600" fill="url(#grid-mono)" />

      {/* Main title */}
      <rect x="300" y="15" width="300" height="35" fill={c.monolith} stroke="none" rx="17" ry="17" />
      <text x="450" y="38" textAnchor="middle" fill="#fff" style={{ font: fontTitle }}>🏢 Monolithic Architecture</text>

      {/* External Load Balancer */}
      <rect x="350" y="70" width="200" height="40" fill={c.infra} stroke={c.border} rx="8" ry="8" />
      <text x="450" y="90" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🔄 Load Balancer</text>
      <text x="450" y="105" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Traffic Distribution</text>

      {/* Main Application Container */}
      <rect x="150" y="130" width="500" height="380" fill="url(#monolith-gradient)" stroke={c.border} strokeWidth="3" rx="15" ry="15" />
      <text x="400" y="160" textAnchor="middle" fill={c.text} style={{ font }}>📦 Single Deployable Application</text>
      <text x="400" y="180" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>One codebase, one deployment unit</text>

      {/* Internal Modules */}
      <text x="400" y="210" textAnchor="middle" fill={c.text} style={{ font }}>🧩 Business Modules</text>
      
      <rect x="180" y="220" width="120" height="85" fill={c.module} stroke={c.border} rx="8" ry="8" />
      <text x="240" y="245" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>👥 User Module</text>
      <text x="240" y="265" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Authentication</text>
      <text x="240" y="280" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• User Management</text>
      <text x="240" y="295" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Profile Service</text>

      <rect x="330" y="220" width="120" height="85" fill={c.module} stroke={c.border} rx="8" ry="8" />
      <text x="390" y="245" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>📋 Order Module</text>
      <text x="390" y="265" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Order Processing</text>
      <text x="390" y="280" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Inventory Mgmt</text>
      <text x="390" y="295" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Shipping Logic</text>

      <rect x="480" y="220" width="120" height="85" fill={c.module} stroke={c.border} rx="8" ry="8" />
      <text x="540" y="245" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>💳 Payment Module</text>
      <text x="540" y="265" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Payment Processing</text>
      <text x="540" y="280" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Billing & Invoicing</text>
      <text x="540" y="295" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Transaction History</text>

      {/* Shared Components */}
      <text x="400" y="335" textAnchor="middle" fill={c.text} style={{ font }}>🔧 Shared Infrastructure</text>
      
      <rect x="180" y="345" width="130" height="70" fill={c.shared} stroke={c.border} rx="8" ry="8" />
      <text x="245" y="370" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🛡️ Cross-cutting</text>
      <text x="245" y="385" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Security</text>
      <text x="245" y="400" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Logging & Metrics</text>
      <text x="245" y="415" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Caching</text>

      <rect x="340" y="345" width="140" height="70" fill={c.shared} stroke={c.border} rx="8" ry="8" />
      <text x="410" y="370" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>💾 Data Access Layer</text>
      <text x="410" y="385" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• ORM/Entity Framework</text>
      <text x="410" y="400" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Repository Pattern</text>
      <text x="410" y="415" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Data Validation</text>

      <rect x="510" y="345" width="110" height="70" fill={c.shared} stroke={c.border} rx="8" ry="8" />
      <text x="565" y="370" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🖥️ Presentation</text>
      <text x="565" y="385" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Web Controllers</text>
      <text x="565" y="400" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• API Endpoints</text>
      <text x="565" y="415" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• UI Components</text>

      {/* Database */}
      <rect x="250" y="440" width="300" height="60" fill={c.infra} stroke={c.border} rx="10" ry="10" />
      <text x="400" y="465" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🗄️ Shared Database</text>
      <text x="400" y="485" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Single database for all modules • ACID transactions</text>

      {/* Multiple Instances */}
      <text x="730" y="150" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>⚖️ Horizontal Scaling</text>
      <rect x="680" y="170" width="80" height="200" fill={c.surface} stroke={c.border} strokeDasharray="5,5" rx="10" ry="10" />
      <text x="720" y="195" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Instance 2</text>
      <text x="720" y="280" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Full App Copy</text>
      <rect x="700" y="190" width="80" height="200" fill={c.surface} stroke={c.border} strokeDasharray="5,5" rx="10" ry="10" />
      <text x="740" y="215" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Instance N</text>
      <text x="740" y="300" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Full App Copy</text>

      {/* Connections */}
      <line x1="450" y1="110" x2="450" y2="130" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-mono)" />
      <line x1="400" y1="415" x2="400" y2="440" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-mono)" />
      <line x1="650" y1="270" x2="680" y2="270" stroke={c.subtle} strokeWidth={2} strokeDasharray="3,3" markerEnd="url(#arrow-mono)" />

      {/* Internal connections */}
      <line x1="240" y1="305" x2="245" y2="345" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-mono)" />
      <line x1="390" y1="305" x2="410" y2="345" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-mono)" />
      <line x1="540" y1="305" x2="565" y2="345" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-mono)" />

      {/* Benefits & Trade-offs */}
      <rect x="30" y="200" width="100" height="140" fill={c.alt} stroke={c.border} rx="8" ry="8" opacity="0.8" />
      <text x="80" y="220" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>✅ Benefits</text>
      <text x="80" y="240" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Simple deployment</text>
      <text x="80" y="255" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Easy development</text>
      <text x="80" y="270" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Strong consistency</text>
      <text x="80" y="285" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• ACID transactions</text>
      <text x="80" y="300" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Efficient testing</text>
      <text x="80" y="315" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Single codebase</text>
      <text x="80" y="330" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Performance</text>

      <rect x="30" y="360" width="100" height="120" fill={c.alt} stroke={c.border} rx="8" ry="8" opacity="0.8" />
      <text x="80" y="380" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>⚠️ Trade-offs</text>
      <text x="80" y="400" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• All-or-nothing scale</text>
      <text x="80" y="415" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Technology coupling</text>
      <text x="80" y="430" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Single failure point</text>
      <text x="80" y="445" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Large codebase</text>
      <text x="80" y="460" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Team coordination</text>

      {/* Bottom summary */}
      <text x="450" y="550" textAnchor="middle" fill={c.text} style={{ font }}>Best for: Small-medium teams • Well-understood domains • Performance-critical apps</text>
      
      {/* When to use */}
      <rect x="680" y="420" width="180" height="120" fill={c.alt} stroke={c.border} rx="8" ry="8" opacity="0.8" />
      <text x="770" y="440" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🎯 When to Use</text>
      <text x="770" y="460" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Small to medium teams</text>
      <text x="770" y="475" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Well-understood domain</text>
      <text x="770" y="490" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Rapid prototyping</text>
      <text x="770" y="505" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Simple deployment needs</text>
      <text x="770" y="520" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Performance critical</text>
    </svg>
  );
}