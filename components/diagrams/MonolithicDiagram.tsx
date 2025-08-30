export function MonolithicDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    monolith: "var(--primary-light)",
    module: "var(--orange-light)",
    shared: "var(--purple-light)",
    infra: "var(--green-light)",
  } as const;

  const font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 800 550" role="img" aria-labelledby="monolithic-title monolithic-desc" preserveAspectRatio="xMidYMid meet">
      <title id="monolithic-title">Monolithic Architecture</title>
      <desc id="monolithic-desc">Single deployable application with internal modular structure and shared infrastructure.</desc>
      
      <defs>
        <marker id="arrow-mono" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
      </defs>

      {/* Main Application Container */}
      <rect x="150" y="100" width="500" height="350" fill={c.monolith} stroke={c.border} strokeWidth="3" rx="15" ry="15" />
      <text x="400" y="130" textAnchor="middle" fill={c.text} style={{ font }}>Single Deployable Application</text>

      {/* Internal Modules */}
      <rect x="180" y="160" width="120" height="80" fill={c.module} stroke={c.border} rx="8" ry="8" />
      <text x="240" y="185" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>User Module</text>
      <text x="240" y="205" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Authentication</text>
      <text x="240" y="220" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• User Management</text>

      <rect x="330" y="160" width="120" height="80" fill={c.module} stroke={c.border} rx="8" ry="8" />
      <text x="390" y="185" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Order Module</text>
      <text x="390" y="205" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Order Processing</text>
      <text x="390" y="220" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Inventory</text>

      <rect x="480" y="160" width="120" height="80" fill={c.module} stroke={c.border} rx="8" ry="8" />
      <text x="540" y="185" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Payment Module</text>
      <text x="540" y="205" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Payment Processing</text>
      <text x="540" y="220" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Billing</text>

      {/* Shared Components */}
      <rect x="180" y="270" width="140" height="60" fill={c.shared} stroke={c.border} rx="8" ry="8" />
      <text x="250" y="295" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Shared Components</text>
      <text x="250" y="315" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Utilities, Security, Logging</text>

      <rect x="350" y="270" width="140" height="60" fill={c.shared} stroke={c.border} rx="8" ry="8" />
      <text x="420" y="295" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Data Access Layer</text>
      <text x="420" y="315" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>ORM, Repositories</text>

      <rect x="520" y="270" width="100" height="60" fill={c.shared} stroke={c.border} rx="8" ry="8" />
      <text x="570" y="295" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Web Layer</text>
      <text x="570" y="315" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Controllers, UI</text>

      {/* Database */}
      <rect x="250" y="480" width="300" height="50" fill={c.infra} stroke={c.border} rx="10" ry="10" />
      <text x="400" y="510" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Shared Database</text>

      {/* External Load Balancer */}
      <rect x="320" y="30" width="160" height="40" fill={c.infra} stroke={c.border} rx="8" ry="8" />
      <text x="400" y="55" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Load Balancer</text>

      {/* Multiple Instances */}
      <rect x="680" y="150" width="80" height="200" fill={c.surface} stroke={c.border} strokeDasharray="5,5" rx="10" ry="10" />
      <text x="720" y="175" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Instance 2</text>
      <rect x="700" y="170" width="80" height="200" fill={c.surface} stroke={c.border} strokeDasharray="5,5" rx="10" ry="10" />
      <text x="740" y="195" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Instance N</text>

      {/* Connections */}
      <line x1="400" y1="70" x2="400" y2="100" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-mono)" />
      <line x1="400" y1="450" x2="400" y2="480" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-mono)" />

      {/* Internal connections */}
      <line x1="240" y1="240" x2="250" y2="270" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-mono)" />
      <line x1="390" y1="240" x2="420" y2="270" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-mono)" />
      <line x1="540" y1="240" x2="570" y2="270" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-mono)" />

      {/* Benefits text */}
      <text x="50" y="200" fill={c.text} style={{ font: fontSub }}>Benefits:</text>
      <text x="50" y="220" fill={c.subtle} style={{ font: fontSub }}>• Simple deployment</text>
      <text x="50" y="240" fill={c.subtle} style={{ font: fontSub }}>• Easy local development</text>
      <text x="50" y="260" fill={c.subtle} style={{ font: fontSub }}>• Strong consistency</text>
      <text x="50" y="280" fill={c.subtle} style={{ font: fontSub }}>• Efficient testing</text>

      {/* Trade-offs text */}
      <text x="50" y="320" fill={c.text} style={{ font: fontSub }}>Trade-offs:</text>
      <text x="50" y="340" fill={c.subtle} style={{ font: fontSub }}>• All-or-nothing scaling</text>
      <text x="50" y="360" fill={c.subtle} style={{ font: fontSub }}>• Technology coupling</text>
      <text x="50" y="380" fill={c.subtle} style={{ font: fontSub }}>• Single point of failure</text>

      {/* Scaling indication */}
      <text x="720" y="400" fill={c.subtle} style={{ font: fontSub }}>Horizontal</text>
      <text x="720" y="420" fill={c.subtle} style={{ font: fontSub }}>Scaling</text>
      <line x1="650" y1="250" x2="680" y2="250" stroke={c.subtle} strokeWidth={1.5} strokeDasharray="3,3" markerEnd="url(#arrow-mono)" />
    </svg>
  );
}