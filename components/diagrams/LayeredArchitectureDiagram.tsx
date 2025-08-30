export function LayeredArchitectureDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    presentation: "var(--primary-light)",
    business: "var(--orange-light)",
    persistence: "var(--purple-light)",
    database: "var(--green-light)",
  } as const;

  const font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 800 480" role="img" aria-labelledby="layered-title layered-desc" preserveAspectRatio="xMidYMid meet">
      <title id="layered-title">Layered Architecture</title>
      <desc id="layered-desc">Four-layer architecture showing presentation, business, persistence, and database layers with top-down dependencies.</desc>
      
      <defs>
        <marker id="arrow-down" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={c.subtle} />
        </marker>
      </defs>

      {/* Presentation Layer */}
      <rect x="100" y="40" width="600" height="80" fill={c.presentation} stroke={c.border} rx="12" ry="12" />
      <text x="400" y="70" textAnchor="middle" fill={c.text} style={{ font }}>Presentation Layer</text>
      <text x="400" y="95" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>UI Components, Controllers, Input Validation</text>

      {/* Business Layer */}
      <rect x="100" y="160" width="600" height="80" fill={c.business} stroke={c.border} rx="12" ry="12" />
      <text x="400" y="190" textAnchor="middle" fill={c.text} style={{ font }}>Business Layer</text>
      <text x="400" y="215" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Domain Logic, Use Cases, Business Rules</text>

      {/* Persistence Layer */}
      <rect x="100" y="280" width="600" height="80" fill={c.persistence} stroke={c.border} rx="12" ry="12" />
      <text x="400" y="310" textAnchor="middle" fill={c.text} style={{ font }}>Persistence Layer</text>
      <text x="400" y="335" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Repositories, Data Access, Object Mapping</text>

      {/* Database Layer */}
      <rect x="100" y="400" width="600" height="60" fill={c.database} stroke={c.border} rx="12" ry="12" />
      <text x="400" y="425" textAnchor="middle" fill={c.text} style={{ font }}>Database Layer</text>
      <text x="400" y="445" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>RDBMS, NoSQL, File Systems</text>

      {/* Dependency arrows */}
      <line x1="400" y1="120" x2="400" y2="160" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-down)" />
      <line x1="400" y1="240" x2="400" y2="280" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-down)" />
      <line x1="400" y1="360" x2="400" y2="400" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-down)" />

      {/* Side annotations */}
      <text x="50" y="85" fill={c.subtle} style={{ font: fontSub }}>Users</text>
      <line x1="80" y1="80" x2="100" y2="80" stroke={c.subtle} strokeWidth={1} markerEnd="url(#arrow-down)" />

      <text x="720" y="200" fill={c.subtle} style={{ font: fontSub }}>Dependencies</text>
      <text x="720" y="220" fill={c.subtle} style={{ font: fontSub }}>flow downward</text>
    </svg>
  );
}