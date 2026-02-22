export function CellBasedDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    accent: "var(--primary-light)",
    accent2: "var(--orange-light)",
    accent3: "var(--green-light)",
  } as const;

  const font = "600 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 10px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontTitle = "700 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 900 420" role="img" aria-labelledby="cell-title cell-desc" preserveAspectRatio="xMidYMid meet">
      <title id="cell-title">Cell‑Based Architecture</title>
      <desc id="cell-desc">Cells as self‑contained units with gateways and clear interfaces communicating via APIs/events.</desc>

      <defs>
        <marker id="arrow-cell" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
        <pattern id="grid-cell" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c.border} strokeWidth="0.3" opacity="0.2"/>
        </pattern>
      </defs>

      <rect width="900" height="420" fill="url(#grid-cell)" />

      <rect x="320" y="10" width="260" height="30" fill={c.accent} rx="15" />
      <text x="450" y="30" textAnchor="middle" fill={c.text} style={{ font: fontTitle }}>Cell‑Based Architecture</text>

      {/* Cell A */}
      <rect x="60" y="70" width="240" height="260" fill={c.surface} stroke={c.border} rx="12" />
      <rect x="70" y="80" width="220" height="28" fill={c.accent} stroke={c.border} rx="8" />
      <text x="180" y="98" textAnchor="middle" fill={c.text} style={{ font }}>Cell A – Gateway</text>
      <rect x="80" y="125" width="200" height="55" fill={c.surface} stroke={c.border} rx="8" />
      <text x="180" y="150" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Services & Integrations</text>
      <rect x="80" y="190" width="200" height="55" fill={c.surface} stroke={c.border} rx="8" />
      <text x="180" y="215" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Data / Messaging</text>
      <rect x="80" y="255" width="200" height="55" fill={c.surface} stroke={c.border} rx="8" />
      <text x="180" y="280" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Policies / Observability</text>

      {/* Cell B */}
      <rect x="330" y="70" width="240" height="260" fill={c.surface} stroke={c.border} rx="12" />
      <rect x="340" y="80" width="220" height="28" fill={c.accent2} stroke={c.border} rx="8" />
      <text x="450" y="98" textAnchor="middle" fill={c.text} style={{ font }}>Cell B – Gateway</text>
      <rect x="350" y="125" width="200" height="55" fill={c.surface} stroke={c.border} rx="8" />
      <text x="450" y="150" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Business Logic</text>
      <rect x="350" y="190" width="200" height="55" fill={c.surface} stroke={c.border} rx="8" />
      <text x="450" y="215" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Events / Streams</text>
      <rect x="350" y="255" width="200" height="55" fill={c.surface} stroke={c.border} rx="8" />
      <text x="450" y="280" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Security Policies</text>

      {/* Cell C */}
      <rect x="600" y="70" width="240" height="260" fill={c.surface} stroke={c.border} rx="12" />
      <rect x="610" y="80" width="220" height="28" fill={c.accent3} stroke={c.border} rx="8" />
      <text x="720" y="98" textAnchor="middle" fill={c.text} style={{ font }}>Cell C – Gateway</text>
      <rect x="620" y="125" width="200" height="55" fill={c.surface} stroke={c.border} rx="8" />
      <text x="720" y="150" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Channel / APIs</text>
      <rect x="620" y="190" width="200" height="55" fill={c.surface} stroke={c.border} rx="8" />
      <text x="720" y="215" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Data / Cache</text>
      <rect x="620" y="255" width="200" height="55" fill={c.surface} stroke={c.border} rx="8" />
      <text x="720" y="280" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Observability</text>

      {/* Inter-cell connections */}
      <line x1="300" y1="115" x2="330" y2="115" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-cell)" />
      <line x1="570" y1="115" x2="600" y2="115" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-cell)" />
      <line x1="600" y1="180" x2="570" y2="180" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-cell)" />
      <line x1="330" y1="180" x2="300" y2="180" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-cell)" />

      <text x="450" y="360" textAnchor="middle" fill={c.text} style={{ font }}>
        Cells expose APIs/events via gateways; compose safely with policy and observability.
      </text>
    </svg>
  );
}

