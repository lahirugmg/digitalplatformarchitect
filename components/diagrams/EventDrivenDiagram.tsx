export function EventDrivenDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    alt: "var(--surface-alt)",
    queue: "var(--orange-light)",
    stream: "var(--primary-light)",
    producer: "var(--green-light)",
    consumer: "var(--blue-light)",
  } as const;

  const font = "600 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 10px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontTitle = "700 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 1000 400" role="img" aria-labelledby="eda-title eda-desc" preserveAspectRatio="xMidYMid meet">
      <title id="eda-title">Event-Driven Architecture</title>
      <desc id="eda-desc">Event-driven systems showing messaging patterns (pub/sub) and streaming patterns (event logs) with producers, brokers, and consumers.</desc>
      
      <defs>
        <marker id="arrow-eda" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
        <marker id="arrow-event" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.queue} />
        </marker>
        <marker id="arrow-stream" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.stream} />
        </marker>
        <linearGradient id="gradient-accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={c.queue} />
          <stop offset="100%" stopColor={c.stream} />
        </linearGradient>
        <pattern id="grid-eda" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c.border} strokeWidth="0.3" opacity="0.2"/>
        </pattern>
      </defs>

      {/* Background grid */}
      <rect width="1000" height="400" fill="url(#grid-eda)" />

      {/* Main title */}
      <rect x="350" y="15" width="300" height="30" fill="url(#gradient-accent)" stroke="none" rx="15" ry="15" />
      <text x="500" y="35" textAnchor="middle" fill="#fff" style={{ font: fontTitle }}>Event-Driven Architecture</text>

      {/* Section titles */}
      <text x="240" y="70" textAnchor="middle" fill={c.text} style={{ font: fontTitle }}>📨 Message-Based Events</text>
      <text x="760" y="70" textAnchor="middle" fill={c.text} style={{ font: fontTitle }}>🌊 Stream-Based Events</text>

      {/* Messaging Section */}
      <rect x="30" y="80" width="460" height="280" fill={c.surface} stroke={c.border} rx="15" ry="15" opacity="0.5" />
      
      {/* Producers - Messaging */}
      <rect x="50" y="110" width="100" height="40" fill={c.producer} stroke={c.border} rx="8" ry="8" />
      <text x="100" y="127" textAnchor="middle" fill={c.text} style={{ font }}>Producer A</text>
      <text x="100" y="140" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Order Service</text>

      <rect x="50" y="170" width="100" height="40" fill={c.producer} stroke={c.border} rx="8" ry="8" />
      <text x="100" y="187" textAnchor="middle" fill={c.text} style={{ font }}>Producer B</text>
      <text x="100" y="200" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>User Service</text>

      <rect x="50" y="230" width="100" height="40" fill={c.producer} stroke={c.border} rx="8" ry="8" />
      <text x="100" y="247" textAnchor="middle" fill={c.text} style={{ font }}>Producer C</text>
      <text x="100" y="260" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Payment Service</text>

      {/* Message Broker */}
      <rect x="200" y="170" width="120" height="60" fill={c.queue} stroke={c.border} rx="8" ry="8" />
      <text x="260" y="193" textAnchor="middle" fill={c.text} style={{ font }}>Message Broker</text>
      <text x="260" y="206" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Topics & Queues</text>
      <text x="260" y="219" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>At-least-once</text>

      {/* Consumers - Messaging */}
      <rect x="370" y="110" width="100" height="40" fill={c.consumer} stroke={c.border} rx="8" ry="8" />
      <text x="420" y="127" textAnchor="middle" fill={c.text} style={{ font }}>Consumer 1</text>
      <text x="420" y="140" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Email Service</text>

      <rect x="370" y="170" width="100" height="40" fill={c.consumer} stroke={c.border} rx="8" ry="8" />
      <text x="420" y="187" textAnchor="middle" fill={c.text} style={{ font }}>Consumer 2</text>
      <text x="420" y="200" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Analytics</text>

      <rect x="370" y="230" width="100" height="40" fill={c.consumer} stroke={c.border} rx="8" ry="8" />
      <text x="420" y="247" textAnchor="middle" fill={c.text} style={{ font }}>Consumer 3</text>
      <text x="420" y="260" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Audit Service</text>

      {/* Messaging connections */}
      <line x1="150" y1="130" x2="200" y2="190" stroke={c.queue} strokeWidth={2.5} markerEnd="url(#arrow-event)" />
      <line x1="150" y1="190" x2="200" y2="200" stroke={c.queue} strokeWidth={2.5} markerEnd="url(#arrow-event)" />
      <line x1="150" y1="250" x2="200" y2="210" stroke={c.queue} strokeWidth={2.5} markerEnd="url(#arrow-event)" />

      <line x1="320" y1="190" x2="370" y2="130" stroke={c.queue} strokeWidth={2.5} markerEnd="url(#arrow-event)" />
      <line x1="320" y1="200" x2="370" y2="190" stroke={c.queue} strokeWidth={2.5} markerEnd="url(#arrow-event)" />
      <line x1="320" y1="210" x2="370" y2="250" stroke={c.queue} strokeWidth={2.5} markerEnd="url(#arrow-event)" />

      {/* Messaging characteristics */}
      <text x="260" y="300" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>✓ Decoupled producers/consumers</text>
      <text x="260" y="315" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>✓ Load balancing & competing consumers</text>
      <text x="260" y="330" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>✓ Guaranteed delivery with retries & DLQ</text>

      {/* Streaming Section */}
      <rect x="510" y="80" width="460" height="280" fill={c.surface} stroke={c.border} rx="15" ry="15" opacity="0.5" />

      {/* Producers - Streaming */}
      <rect x="530" y="110" width="100" height="40" fill={c.producer} stroke={c.border} rx="8" ry="8" />
      <text x="580" y="127" textAnchor="middle" fill={c.text} style={{ font }}>Producer A</text>
      <text x="580" y="140" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Click Events</text>

      <rect x="530" y="170" width="100" height="40" fill={c.producer} stroke={c.border} rx="8" ry="8" />
      <text x="580" y="187" textAnchor="middle" fill={c.text} style={{ font }}>Producer B</text>
      <text x="580" y="200" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>IoT Sensors</text>

      <rect x="530" y="230" width="100" height="40" fill={c.producer} stroke={c.border} rx="8" ry="8" />
      <text x="580" y="247" textAnchor="middle" fill={c.text} style={{ font }}>Producer C</text>
      <text x="580" y="260" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>CDC Events</text>

      {/* Event Stream (Partitioned Log) */}
      <rect x="680" y="150" width="140" height="80" fill={c.stream} stroke={c.border} rx="8" ry="8" />
      <text x="750" y="170" textAnchor="middle" fill={c.text} style={{ font }}>Event Stream</text>
      <text x="750" y="185" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Partitioned Log</text>
      
      {/* Partition visualization */}
      <rect x="690" y="195" width="30" height="6" fill={c.alt} stroke={c.border} rx="1" />
      <rect x="725" y="195" width="30" height="6" fill={c.alt} stroke={c.border} rx="1" />
      <rect x="760" y="195" width="30" height="6" fill={c.alt} stroke={c.border} rx="1" />
      <rect x="795" y="195" width="30" height="6" fill={c.alt} stroke={c.border} rx="1" />
      
      <rect x="690" y="205" width="30" height="6" fill={c.alt} stroke={c.border} rx="1" />
      <rect x="725" y="205" width="30" height="6" fill={c.alt} stroke={c.border} rx="1" />
      <rect x="760" y="205" width="30" height="6" fill={c.alt} stroke={c.border} rx="1" />
      <rect x="795" y="205" width="30" height="6" fill={c.alt} stroke={c.border} rx="1" />

      <text x="750" y="222" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Retention & Replay</text>

      {/* Consumers - Streaming */}
      <rect x="850" y="110" width="100" height="40" fill={c.consumer} stroke={c.border} rx="8" ry="8" />
      <text x="900" y="127" textAnchor="middle" fill={c.text} style={{ font }}>Consumer A</text>
      <text x="900" y="140" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Real-time ML</text>

      <rect x="850" y="170" width="100" height="40" fill={c.consumer} stroke={c.border} rx="8" ry="8" />
      <text x="900" y="187" textAnchor="middle" fill={c.text} style={{ font }}>Consumer B</text>
      <text x="900" y="200" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Data Lake</text>

      <rect x="850" y="230" width="100" height="40" fill={c.consumer} stroke={c.border} rx="8" ry="8" />
      <text x="900" y="247" textAnchor="middle" fill={c.text} style={{ font }}>Consumer C</text>
      <text x="900" y="260" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Dashboard</text>

      {/* Streaming connections */}
      <line x1="630" y1="130" x2="680" y2="170" stroke={c.stream} strokeWidth={2.5} markerEnd="url(#arrow-stream)" />
      <line x1="630" y1="190" x2="680" y2="190" stroke={c.stream} strokeWidth={2.5} markerEnd="url(#arrow-stream)" />
      <line x1="630" y1="250" x2="680" y2="210" stroke={c.stream} strokeWidth={2.5} markerEnd="url(#arrow-stream)" />

      <line x1="820" y1="170" x2="850" y2="130" stroke={c.stream} strokeWidth={2.5} markerEnd="url(#arrow-stream)" />
      <line x1="820" y1="190" x2="850" y2="190" stroke={c.stream} strokeWidth={2.5} markerEnd="url(#arrow-stream)" />
      <line x1="820" y1="210" x2="850" y2="250" stroke={c.stream} strokeWidth={2.5} markerEnd="url(#arrow-stream)" />

      {/* Streaming characteristics */}
      <text x="740" y="300" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>✓ High throughput & low latency</text>
      <text x="740" y="315" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>✓ Event replay & time-travel queries</text>
      <text x="740" y="330" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>✓ Partitioning & parallel processing</text>

      {/* Key Benefits Section */}
      <text x="500" y="375" textAnchor="middle" fill={c.text} style={{ font }}>Key Benefits: Loose coupling • Scalability • Resilience • Real-time processing</text>
    </svg>
  );
}