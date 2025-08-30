export function HexagonalDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    core: "var(--primary-light)",
    port: "var(--orange-light)",
    adapter: "var(--purple-light)",
    external: "var(--green-light)",
  } as const;

  const font = "600 13px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 11px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

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
    <svg viewBox="0 0 900 700" role="img" aria-labelledby="hexagonal-title hexagonal-desc" preserveAspectRatio="xMidYMid meet">
      <title id="hexagonal-title">Hexagonal Architecture</title>
      <desc id="hexagonal-desc">Domain core surrounded by ports and adapters, showing dependency inversion and external system integration.</desc>
      
      <defs>
        <marker id="arrow-hex" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
      </defs>

      {/* Core Domain Hexagon */}
      <path d={hexPath(450, 350, 120)} fill={c.core} stroke={c.border} strokeWidth="3" />
      <text x="450" y="340" textAnchor="middle" fill={c.text} style={{ font }}>Domain Core</text>
      <text x="450" y="360" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Business Logic</text>
      <text x="450" y="375" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Entities & Use Cases</text>

      {/* Ports (Interfaces) */}
      {/* Left side - Driving ports */}
      <rect x="180" y="250" width="140" height="40" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="250" y="275" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>API Port</text>
      
      <rect x="180" y="350" width="140" height="40" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="250" y="375" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Command Port</text>

      <rect x="180" y="450" width="140" height="40" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="250" y="475" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Query Port</text>

      {/* Right side - Driven ports */}
      <rect x="580" y="250" width="140" height="40" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="650" y="275" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Repository Port</text>

      <rect x="580" y="350" width="140" height="40" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="650" y="375" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Event Port</text>

      <rect x="580" y="450" width="140" height="40" fill={c.port} stroke={c.border} rx="8" ry="8" />
      <text x="650" y="475" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>External API Port</text>

      {/* Adapters */}
      {/* Left side - Driving adapters */}
      <rect x="20" y="240" width="120" height="60" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="80" y="265" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>REST Controller</text>
      <text x="80" y="280" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>HTTP/JSON</text>

      <rect x="20" y="340" width="120" height="60" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="80" y="365" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>CLI Adapter</text>
      <text x="80" y="380" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Command Line</text>

      <rect x="20" y="440" width="120" height="60" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="80" y="465" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>GraphQL Adapter</text>
      <text x="80" y="480" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Query Interface</text>

      {/* Right side - Driven adapters */}
      <rect x="760" y="240" width="120" height="60" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="820" y="265" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>DB Adapter</text>
      <text x="820" y="280" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>PostgreSQL</text>

      <rect x="760" y="340" width="120" height="60" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="820" y="365" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Message Adapter</text>
      <text x="820" y="380" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Kafka/RabbitMQ</text>

      <rect x="760" y="440" width="120" height="60" fill={c.adapter} stroke={c.border} rx="10" ry="10" />
      <text x="820" y="465" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>HTTP Client</text>
      <text x="820" y="480" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>External APIs</text>

      {/* Connections - Adapter to Port */}
      <line x1="140" y1="270" x2="180" y2="270" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />
      <line x1="140" y1="370" x2="180" y2="370" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />
      <line x1="140" y1="470" x2="180" y2="470" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />

      <line x1="720" y1="270" x2="760" y2="270" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />
      <line x1="720" y1="370" x2="760" y2="370" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />
      <line x1="720" y1="470" x2="760" y2="470" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />

      {/* Port to Core connections */}
      <line x1="320" y1="270" x2="360" y2="310" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />
      <line x1="320" y1="370" x2="350" y2="370" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />
      <line x1="320" y1="470" x2="360" y2="420" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />

      <line x1="540" y1="310" x2="580" y2="270" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />
      <line x1="550" y1="370" x2="580" y2="370" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />
      <line x1="540" y1="420" x2="580" y2="470" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-hex)" />

      {/* Labels */}
      <text x="100" y="190" textAnchor="middle" fill={c.text} style={{ font }}>Driving Side</text>
      <text x="100" y="210" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>(Initiates)</text>

      <text x="800" y="190" textAnchor="middle" fill={c.text} style={{ font }}>Driven Side</text>
      <text x="800" y="210" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>(Infrastructure)</text>

      {/* Dependency flow indication */}
      <text x="450" y="550" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Dependencies point inward toward the domain</text>
      
      {/* Legend */}
      <rect x="50" y="580" width="20" height="15" fill={c.core} stroke={c.border} />
      <text x="80" y="592" fill={c.subtle} style={{ font: fontSub }}>Domain Core</text>
      
      <rect x="200" y="580" width="20" height="15" fill={c.port} stroke={c.border} />
      <text x="230" y="592" fill={c.subtle} style={{ font: fontSub }}>Ports (Interfaces)</text>
      
      <rect x="380" y="580" width="20" height="15" fill={c.adapter} stroke={c.border} />
      <text x="410" y="592" fill={c.subtle} style={{ font: fontSub }}>Adapters (Implementations)</text>
    </svg>
  );
}