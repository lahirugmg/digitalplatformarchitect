export function SmallHADeployment() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    alt: "var(--surface-alt)",
  } as const;

  const t = (x: number, y: number, s: string) => (
    <text x={x} y={y} fill={c.subtle} style={{ font: "500 11px system-ui, -apple-system, Segoe UI, Roboto" }}>{s}</text>
  );

  return (
    <svg viewBox="0 0 960 520" role="img" aria-labelledby="wso2-deploy-title" preserveAspectRatio="xMidYMid meet">
      <title id="wso2-deploy-title">WSO2 Small HA Deployment Blueprint</title>
      {/* Zones */}
      <rect x="20" y="20" width="920" height="480" rx="14" ry="14" fill={c.surface} stroke={c.border} />
      <text x="40" y="44" fill={c.text} style={{ font: "600 13px system-ui, -apple-system, Segoe UI, Roboto" }}>Region A</text>

      {/* Edge/Ingress */}
      <rect x="40" y="70" width="880" height="70" rx="12" ry="12" fill={c.alt} stroke={c.border} />
      {t(60, 100, "DNS / CDN / WAF / Ingress")}

      {/* Workload pools */}
      <rect x="40" y="160" width="420" height="160" rx="12" ry="12" fill={c.surface} stroke={c.border} />
      <text x="60" y="182" fill={c.text} style={{ font: "600 12px system-ui, -apple-system, Segoe UI, Roboto" }}>API Management</text>
      <rect x="60" y="200" width="180" height="100" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {t(90, 230, "Gateway x2 (HA)")}
      <rect x="260" y="200" width="180" height="100" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {t(280, 230, "Publisher/Portal x2 (HA)")}

      <rect x="500" y="160" width="420" height="160" rx="12" ry="12" fill={c.surface} stroke={c.border} />
      <text x="520" y="182" fill={c.text} style={{ font: "600 12px system-ui, -apple-system, Segoe UI, Roboto" }}>Integration</text>
      <rect x="520" y="200" width="180" height="100" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {t(550, 230, "Micro Integrator x2 (HA)")}
      <rect x="720" y="200" width="180" height="100" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {t(750, 230, "Adapters/Workers")}

      {/* Identity */}
      <rect x="40" y="340" width="300" height="140" rx="12" ry="12" fill={c.surface} stroke={c.border} />
      <text x="60" y="362" fill={c.text} style={{ font: "600 12px system-ui, -apple-system, Segoe UI, Roboto" }}>Identity & Access</text>
      <rect x="60" y="380" width="260" height="80" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {t(120, 415, "WSO2 IS x2 (HA) + DB")}

      {/* Data & Observability */}
      <rect x="360" y="340" width="540" height="140" rx="12" ry="12" fill={c.surface} stroke={c.border} />
      <text x="380" y="362" fill={c.text} style={{ font: "600 12px system-ui, -apple-system, Segoe UI, Roboto" }}>Data / Observability</text>
      <rect x="380" y="380" width="200" height="80" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {t(410, 410, "Databases / Caches (HA)")}
      <rect x="600" y="380" width="280" height="80" rx="10" ry="10" fill={c.surface} stroke={c.border} />
      {t(640, 410, "OTel → Prometheus / Grafana / ELK")}
    </svg>
  );
}

