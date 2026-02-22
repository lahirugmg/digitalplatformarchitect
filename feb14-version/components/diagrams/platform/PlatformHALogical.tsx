export function PlatformHALogical() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    alt: "var(--surface-alt)",
  } as const;

  const title = (x: number, y: number, t: string) => (
    <text x={x} y={y} fill={c.text} style={{ font: "600 13px system-ui, -apple-system, Segoe UI, Roboto" }}>{t}</text>
  );
  const label = (x: number, y: number, t: string) => (
    <text x={x} y={y} fill={c.subtle} style={{ font: "500 11px system-ui, -apple-system, Segoe UI, Roboto" }}>{t}</text>
  );

  return (
    <svg viewBox="0 0 960 520" role="img" aria-labelledby="platform-logical-title" preserveAspectRatio="xMidYMid meet">
      <title id="platform-logical-title">Platform HA Logical Architecture</title>
      {/* Lanes */}
      <rect x="20" y="20" width="920" height="150" rx="14" ry="14" fill={c.surface} stroke={c.border} />
      {title(40, 44, "API Management")}
      <rect x="20" y="190" width="920" height="140" rx="14" ry="14" fill={c.surface} stroke={c.border} />
      {title(40, 214, "Integration")}
      <rect x="20" y="350" width="920" height="150" rx="14" ry="14" fill={c.surface} stroke={c.border} />
      {title(40, 374, "Identity & Security / Observability")}

      {/* API-M */}
      <rect x="60" y="70" width="180" height="70" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {label(150, 95, "Gateway (Edge)")}
      {label(150, 115, "Traffic, policies, rate limits")}
      <rect x="270" y="70" width="180" height="70" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {label(360, 95, "Publisher / Dev Portal")}
      {label(360, 115, "Design, publish, discover")}

      {/* Integration */}
      <rect x="60" y="230" width="200" height="80" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {label(160, 255, "Micro Integrator")}
      {label(160, 275, "Mediation, connectors")}
      <rect x="290" y="230" width="200" height="80" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {label(390, 255, "Message / Event Flows")}
      {label(390, 275, "Queues / Streams / ETL")}

      {/* Identity */}
      <rect x="60" y="400" width="200" height="70" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {label(160, 425, "Identity Server")}
      {label(160, 445, "OIDC, SAML, MFA")}

      {/* Observability */}
      <rect x="290" y="400" width="240" height="70" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {label(410, 425, "Observability")}
      {label(410, 445, "OTel → Prometheus/Grafana/ELK")}

      {/* Data services / External */}
      <rect x="560" y="400" width="180" height="70" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {label(650, 425, "Databases / Caches")}
      {label(650, 445, "RDBMS, Redis, etc.")}

      {/* Simple arrows */}
      <defs>
        <marker id="arrow-gray" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={c.subtle} />
        </marker>
      </defs>
      <line x1="240" y1="105" x2="270" y2="105" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-gray)" />
      <line x1="160" y1="300" x2="160" y2="400" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-gray)" />
      <line x1="360" y1="300" x2="410" y2="400" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-gray)" />
      <line x1="410" y1="470" x2="560" y2="470" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-gray)" />
    </svg>
  );
}

