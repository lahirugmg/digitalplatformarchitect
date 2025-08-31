export function HexagonalDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    alt: "var(--surface-alt)",
    core: "var(--primary-light)",
    port: "var(--orange-light)",
    adapter: "var(--purple-light)",
    external: "var(--green-light)",
  } as const;

  const font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontTitle = "700 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  // Hexagon path calculation
  const hexPath = (cx: number, cy: number, radius: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')} Z`;
  };

  return (
    <svg viewBox="0 0 900 750" role="img" aria-labelledby="hexagonal-title hexagonal-desc" preserveAspectRatio="xMidYMid meet">
      <title id="hexagonal-title">Hexagonal Architecture</title>
      <desc id="hexagonal-desc">Domain core surrounded by ports and adapters, showing dependency inversion and external system integration.</desc>
      
      <defs>
        <marker id="arrow-hex" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
        <pattern id="grid-hex" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c.border} strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <linearGradient id="core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.core} />
          <stop offset="100%" stopColor={c.port} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Background grid */}
      <rect width="900" height="750" fill="url(#grid-hex)" />

      {/* Main title */}
      <rect x="300" y="15" width="300" height="35" fill={c.core} stroke="none" rx="17" ry="17" />
      <text x="450" y="38" textAnchor="middle" fill="#fff" style={{ font: fontTitle }}>🏛️ Hexagonal Architecture</text>

      {/* Core Domain Hexagon */}
      <path d={hexPath(450, 380, 120)} fill="url(#core-gradient)" stroke={c.border} strokeWidth="3" />
      <text x="450" y="365" textAnchor="middle" fill={c.text} style={{ font }}>🎯 Domain Core</text>
      <text x="450" y="385" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Business Logic</text>
      <text x="450" y="400" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Domain Entities</text>
      <text x="450" y="415" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Use Cases</text>

      {/* Section labels */}
      <text x="100" y="200" textAnchor="middle" fill={c.text} style={{ font }}>📥 Driving Side</text>
      <text x="100" y="220" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>(User initiates)</text>

      <text x="800" y="200" textAnchor="middle" fill={c.text} style={{ font }}>📤 Driven Side</text>
      <text x="800" y="220" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>(Infrastructure)</text>

      {/* Ports (Interfaces) */}
      {/* Left side - Driving ports */}
      <rect x="180" y="280" width="140" height="50" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="250" y="300" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🌐 API Port</text>
      <text x="250" y="315" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Web Interface</text>
      
      <rect x="180" y="380" width="140" height="50" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="250" y="400" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>⚡ Command Port</text>
      <text x="250" y="415" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Business Operations</text>

      <rect x="180" y="480" width="140" height="50" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="250" y="500" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🔍 Query Port</text>
      <text x="250" y="515" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Read Operations</text>

      {/* Right side - Driven ports */}
      <rect x="580" y="280" width="140" height="50" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="650" y="300" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>💾 Repository Port</text>
      <text x="650" y="315" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Data Persistence</text>

      <rect x="580" y="380" width="140" height="50" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="650" y="400" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>📨 Event Port</text>
      <text x="650" y="415" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Messaging & Events</text>

      <rect x="580" y="480" width="140" height="50" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="650" y="500" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🌍 External API Port</text>
      <text x="650" y="515" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Third-party Services</text>

      {/* Adapters */}
      {/* Left side - Driving adapters */}
      <rect x="20" y="270" width="120" height="70" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="80" y="295" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>REST Controller</text>
      <text x="80" y="310" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• HTTP/JSON</text>
      <text x="80" y="325" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• OpenAPI</text>

      <rect x="20" y="370" width="120" height="70" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="80" y="395" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>CLI Adapter</text>
      <text x="80" y="410" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Command Line</text>
      <text x="80" y="425" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Batch Jobs</text>

      <rect x="20" y="470" width="120" height="70" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="80" y="495" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>GraphQL Adapter</text>
      <text x="80" y="510" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Query Interface</text>
      <text x="80" y="525" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Schema</text>

      {/* Right side - Driven adapters */}
      <rect x="760" y="270" width="120" height="70" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="820" y="295" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>DB Adapter</text>
      <text x="820" y="310" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• PostgreSQL</text>
      <text x="820" y="325" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• ORM/SQL</text>

      <rect x="760" y="370" width="120" height="70" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="820" y="395" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Message Adapter</text>
      <text x="820" y="410" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Kafka</text>
      <text x="820" y="425" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• RabbitMQ</text>

      <rect x="760" y="470" width="120" height="70" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="820" y="495" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>HTTP Client</text>
      <text x="820" y="510" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• External APIs</text>
      <text x="820" y="525" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• REST/SOAP</text>

      {/* Connections - Adapter to Port */}
      <line x1="140" y1="305" x2="180" y2="305" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />
      <line x1="140" y1="405" x2="180" y2="405" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />
      <line x1="140" y1="505" x2="180" y2="505" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />

      <line x1="720" y1="305" x2="760" y2="305" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />
      <line x1="720" y1="405" x2="760" y2="405" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />
      <line x1="720" y1="505" x2="760" y2="505" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />

      {/* Port to Core connections */}
      <line x1="320" y1="305" x2="360" y2="340" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />
      <line x1="320" y1="405" x2="350" y2="400" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />
      <line x1="320" y1="505" x2="360" y2="450" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />

      <line x1="540" y1="340" x2="580" y2="305" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />
      <line x1="550" y1="400" x2="580" y2="405" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />
      <line x1="540" y1="450" x2="580" y2="505" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-hex)" />

      {/* Key Principle */}
      <rect x="300" y="570" width="300" height="60" fill={c.alt} stroke={c.border} rx="10" ry="10" opacity="0.8" />
      <text x="450" y="590" textAnchor="middle" fill={c.text} style={{ font }}>🎯 Key Principle</text>
      <text x="450" y="610" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Dependencies point inward toward the domain</text>
      <text x="450" y="625" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Infrastructure depends on business logic, never vice versa</text>
      
      {/* Legend */}
      <text x="450" y="660" textAnchor="middle" fill={c.text} style={{ font }}>Benefits: Testability • Independence • Flexibility • Clean Dependencies</text>

      <rect x="50" y="680" width="20" height="15" fill={c.core} stroke={c.border} />
      <text x="80" y="692" fill={c.subtle} style={{ font: fontSub }}>Domain Core</text>
      
      <rect x="200" y="680" width="20" height="15" fill={c.port} stroke={c.border} />
      <text x="230" y="692" fill={c.subtle} style={{ font: fontSub }}>Ports (Interfaces)</text>
      
      <rect x="380" y="680" width="20" height="15" fill={c.adapter} stroke={c.border} />
      <text x="410" y="692" fill={c.subtle} style={{ font: fontSub }}>Adapters (Implementations)</text>

      <rect x="580" y="680" width="20" height="15" fill={c.external} stroke={c.border} />
      <text x="610" y="692" fill={c.subtle} style={{ font: fontSub }}>External Systems</text>
    </svg>
  );
}