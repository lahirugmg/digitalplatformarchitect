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
  const fontTitle = "700 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 900 550" role="img" aria-labelledby="layered-title layered-desc" preserveAspectRatio="xMidYMid meet">
      <title id="layered-title">Layered Architecture</title>
      <desc id="layered-desc">Four-layer architecture showing presentation, business, persistence, and database layers with top-down dependencies and clear separation of concerns.</desc>
      
      <defs>
        <marker id="arrow-layered" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
        <pattern id="grid-layered" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c.border} strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <linearGradient id="layer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={c.presentation} />
          <stop offset="33%" stopColor={c.business} />
          <stop offset="66%" stopColor={c.persistence} />
          <stop offset="100%" stopColor={c.database} />
        </linearGradient>
      </defs>

      {/* Background grid */}
      <rect width="900" height="550" fill="url(#grid-layered)" />

      {/* Main title */}
      <rect x="300" y="15" width="300" height="35" fill="url(#layer-gradient)" stroke="none" rx="17" ry="17" />
      <text x="450" y="38" textAnchor="middle" fill={c.text} style={{ font: fontTitle }}>Layered Architecture</text>

      {/* User/Client indication */}
      <text x="450" y="80" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>👤 Users / External Clients</text>
      <line x1="450" y1="90" x2="450" y2="105" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-layered)" />

      {/* Presentation Layer */}
      <rect x="100" y="110" width="700" height="85" fill={c.presentation} stroke={c.border} rx="15" ry="15" />
      <text x="150" y="135" fill={c.text} style={{ font }}>🖥️ Presentation Layer</text>
      
      <rect x="130" y="150" width="160" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="210" y="170" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Web Controllers</text>

      <rect x="310" y="150" width="160" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="390" y="170" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>REST APIs</text>

      <rect x="490" y="150" width="160" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="570" y="170" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Input Validation</text>

      <rect x="670" y="150" width="110" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="725" y="170" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Views/DTOs</text>

      {/* Business Layer */}
      <rect x="100" y="220" width="700" height="85" fill={c.business} stroke={c.border} rx="15" ry="15" />
      <text x="150" y="245" fill={c.text} style={{ font }}>⚙️ Business Layer</text>
      
      <rect x="130" y="260" width="160" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="210" y="280" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Domain Services</text>

      <rect x="310" y="260" width="160" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="390" y="280" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Business Rules</text>

      <rect x="490" y="260" width="160" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="570" y="280" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Use Cases</text>

      <rect x="670" y="260" width="110" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="725" y="280" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Workflows</text>

      {/* Persistence Layer */}
      <rect x="100" y="330" width="700" height="85" fill={c.persistence} stroke={c.border} rx="15" ry="15" />
      <text x="150" y="355" fill={c.text} style={{ font }}>💾 Persistence Layer</text>
      
      <rect x="130" y="370" width="160" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="210" y="390" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Repositories</text>

      <rect x="310" y="370" width="160" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="390" y="390" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Data Access</text>

      <rect x="490" y="370" width="160" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="570" y="390" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>ORM/Mappers</text>

      <rect x="670" y="370" width="110" height="35" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="725" y="390" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Caching</text>

      {/* Database Layer */}
      <rect x="100" y="440" width="700" height="70" fill={c.database} stroke={c.border} rx="15" ry="15" />
      <text x="150" y="465" fill={c.text} style={{ font }}>🗄️ Database Layer</text>
      
      <rect x="130" y="480" width="150" height="25" fill={c.surface} stroke={c.border} rx="6" ry="6" />
      <text x="205" y="495" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>PostgreSQL</text>

      <rect x="300" y="480" width="120" height="25" fill={c.surface} stroke={c.border} rx="6" ry="6" />
      <text x="360" y="495" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>MongoDB</text>

      <rect x="440" y="480" width="120" height="25" fill={c.surface} stroke={c.border} rx="6" ry="6" />
      <text x="500" y="495" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Redis Cache</text>

      <rect x="580" y="480" width="100" height="25" fill={c.surface} stroke={c.border} rx="6" ry="6" />
      <text x="630" y="495" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>File System</text>

      <rect x="700" y="480" width="80" height="25" fill={c.surface} stroke={c.border} rx="6" ry="6" />
      <text x="740" y="495" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Message Queue</text>

      {/* Dependency arrows between layers */}
      <line x1="450" y1="195" x2="450" y2="220" stroke={c.subtle} strokeWidth={3} markerEnd="url(#arrow-layered)" />
      <line x1="450" y1="305" x2="450" y2="330" stroke={c.subtle} strokeWidth={3} markerEnd="url(#arrow-layered)" />
      <line x1="450" y1="415" x2="450" y2="440" stroke={c.subtle} strokeWidth={3} markerEnd="url(#arrow-layered)" />

      {/* Side annotations */}
      <text x="50" y="155" fill={c.subtle} style={{ font: fontSub }} transform="rotate(-90, 50, 155)">HTTP</text>
      <text x="50" y="265" fill={c.subtle} style={{ font: fontSub }} transform="rotate(-90, 50, 265)">Logic</text>
      <text x="50" y="375" fill={c.subtle} style={{ font: fontSub }} transform="rotate(-90, 50, 375)">Data</text>
      <text x="50" y="480" fill={c.subtle} style={{ font: fontSub }} transform="rotate(-90, 50, 480)">Storage</text>

      <text x="830" y="200" fill={c.subtle} style={{ font: fontSub }}>Dependencies</text>
      <text x="830" y="220" fill={c.subtle} style={{ font: fontSub }}>flow downward</text>
      <text x="830" y="250" fill={c.subtle} style={{ font: fontSub }}>Higher layers</text>
      <text x="830" y="270" fill={c.subtle} style={{ font: fontSub }}>depend on</text>
      <text x="830" y="290" fill={c.subtle} style={{ font: fontSub }}>lower layers</text>

      {/* Benefits */}
      <text x="450" y="535" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Benefits: Clear separation • Easy testing • Well-understood • Good for CRUD apps</text>
    </svg>
  );
}
