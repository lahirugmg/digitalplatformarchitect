export function EventDrivenDiagram() {
  const txt = {
    main: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    queue: "var(--orange-light)",
    stream: "var(--primary-light)",
  } as const;

  const font = "600 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 11px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 980 360" role="img" aria-labelledby="eda-title eda-desc" preserveAspectRatio="xMidYMid meet">
      <title id="eda-title">Event-Driven Architecture</title>
      <desc id="eda-desc">Diagram contrasting messaging with queues and competing consumers versus streaming with partitioned logs and replay.</desc>
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={txt.subtle} />
        </marker>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--orange)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>
      </defs>

      {/* Titles */}
      <text x="70" y="26" fill={txt.main} style={{ font }}>{"Messaging"}</text>
      <text x="560" y="26" fill={txt.main} style={{ font }}>{"Streaming"}</text>

      {/* Messaging lane */}
      <rect x="20" y="34" width="440" height="292" fill={txt.surface} stroke={txt.border} rx={12} ry={12} />
      {/* Producers */}
      <rect x="40" y="80" width="120" height="40" fill={txt.surface} stroke={txt.border} rx={10} ry={10} />
      <text x="100" y="104" textAnchor="middle" fill={txt.subtle} style={{ font: fontSub }}>{"Producer A"}</text>
      <rect x="40" y="140" width="120" height="40" fill={txt.surface} stroke={txt.border} rx={10} ry={10} />
      <text x="100" y="164" textAnchor="middle" fill={txt.subtle} style={{ font: fontSub }}>{"Producer B"}</text>
      {/* Queue/Topic */}
      <rect x="200" y="108" width="120" height="44" fill={txt.queue} stroke={txt.border} rx={8} ry={8} />
      <text x="260" y="134" textAnchor="middle" fill={txt.subtle} style={{ font: fontSub }}>{"Queue / Topic"}</text>
      {/* Edges to queue */}
      <line x1="160" y1="100" x2="200" y2="130" stroke={txt.subtle} strokeWidth={1.5} markerEnd="url(#arrow)" />
      <line x1="160" y1="160" x2="200" y2="130" stroke={txt.subtle} strokeWidth={1.5} markerEnd="url(#arrow)" />
      {/* Consumers (competing) */}
      <rect x="360" y="90" width="80" height="34" fill={txt.surface} stroke={txt.border} rx={10} ry={10} />
      <text x="400" y="110" textAnchor="middle" fill={txt.subtle} style={{ font: fontSub }}>{"Consumer 1"}</text>
      <rect x="360" y="140" width="80" height="34" fill={txt.surface} stroke={txt.border} rx={10} ry={10} />
      <text x="400" y="160" textAnchor="middle" fill={txt.subtle} style={{ font: fontSub }}>{"Consumer 2"}</text>
      {/* Edge from queue to consumers (fan-out competing) */}
      <line x1="320" y1="130" x2="360" y2="107" stroke={txt.subtle} strokeWidth={1.5} markerEnd="url(#arrow)" />
      <line x1="320" y1="130" x2="360" y2="157" stroke={txt.subtle} strokeWidth={1.5} markerEnd="url(#arrow)" />
      <text x="240" y="180" textAnchor="middle" fill={txt.subtle} style={{ font: fontSub }}>{"At-least-once, retries, DLQ"}</text>

      {/* Streaming lane */}
      <rect x="520" y="34" width="440" height="292" fill={txt.surface} stroke={txt.border} rx={12} ry={12} />
      {/* Producers */}
      <rect x="540" y="80" width="120" height="40" fill={txt.surface} stroke={txt.border} rx={10} ry={10} />
      <text x="600" y="104" textAnchor="middle" fill={txt.subtle} style={{ font: fontSub }}>{"Producer A"}</text>
      <rect x="540" y="140" width="120" height="40" fill={txt.surface} stroke={txt.border} rx={10} ry={10} />
      <text x="600" y="164" textAnchor="middle" fill={txt.subtle} style={{ font: fontSub }}>{"Producer B"}</text>
      {/* Partitioned log */}
      <rect x="700" y="90" width="220" height="26" fill={txt.stream} stroke={txt.border} rx={8} ry={8} />
      <rect x="700" y="120" width="220" height="26" fill={txt.stream} stroke={txt.border} rx={8} ry={8} />
      <rect x="700" y="150" width="220" height="26" fill={txt.stream} stroke={txt.border} rx={8} ry={8} />
      <text x="810" y="180" textAnchor="middle" fill={txt.subtle} style={{ font: fontSub }}>{"Partitioned Log (retention + replay)"}</text>
      {/* Edges to partitions */}
      <line x1="660" y1="100" x2="700" y2="103" stroke={txt.subtle} strokeWidth={1.5} markerEnd="url(#arrow)" />
      <line x1="660" y1="160" x2="700" y2="147" stroke={txt.subtle} strokeWidth={1.5} markerEnd="url(#arrow)" />
      {/* Consumers */}
      <rect x="700" y="210" width="100" height="34" fill={txt.surface} stroke={txt.border} rx={10} ry={10} />
      <text x="750" y="230" textAnchor="middle" fill={txt.subtle} style={{ font: fontSub }}>{"Consumer A"}</text>
      <rect x="820" y="210" width="100" height="34" fill={txt.surface} stroke={txt.border} rx={10} ry={10} />
      <text x="870" y="230" textAnchor="middle" fill={txt.subtle} style={{ font: fontSub }}>{"Consumer B"}</text>
      {/* Edges from partitions to consumers */}
      <line x1="760" y1="176" x2="750" y2="210" stroke={txt.subtle} strokeWidth={1.5} markerEnd="url(#arrow)" />
      <line x1="860" y1="176" x2="870" y2="210" stroke={txt.subtle} strokeWidth={1.5} markerEnd="url(#arrow)" />

      {/* Center caption */}
      <rect x="390" y="10" width="200" height="26" fill="url(#accent)" stroke="none" rx={13} ry={13} />
      <text x="490" y="28" textAnchor="middle" fill="#fff" style={{ font }}>{"Event-Driven"}</text>
    </svg>
  );
}
