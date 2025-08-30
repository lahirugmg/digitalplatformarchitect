export function DigitalPlatformDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    primary: "var(--primary-light)",
    api: "var(--orange-light)",
    integration: "var(--blue-light)",
    microservices: "var(--green-light)",
    data: "var(--purple-light)",
    devops: "var(--cyan-light)",
    security: "var(--red-light)",
  } as const;

  const font = "600 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 10px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontTitle = "600 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 1200 800" role="img" aria-labelledby="digital-platform-title digital-platform-desc" preserveAspectRatio="xMidYMid meet">
      <title id="digital-platform-title">Digital Platform Architecture</title>
      <desc id="digital-platform-desc">Core building blocks of a digital platform including API management, integration, microservices, data lake, developer platform, and identity management.</desc>
      
      <defs>
        <marker id="arrow-dp" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
        <pattern id="grid" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c.border} strokeWidth="0.5" opacity="0.3"/>
        </pattern>
      </defs>

      {/* Background grid */}
      <rect width="1200" height="800" fill="url(#grid)" />

      {/* Title */}
      <text x="600" y="35" textAnchor="middle" fill={c.text} style={{ font: "700 18px system-ui" }}>Digital Platform Building Blocks</text>

      {/* API Management Layer */}
      <rect x="50" y="70" width="1100" height="120" fill={c.api} stroke={c.border} rx="12" ry="12" opacity="0.3" />
      <text x="70" y="95" fill={c.text} style={{ font: fontTitle }}>API Management</text>
      
      <rect x="100" y="110" width="180" height="60" fill={c.api} stroke={c.border} rx="8" ry="8" />
      <text x="190" y="130" textAnchor="middle" fill={c.text} style={{ font }}>API Gateway</text>
      <text x="190" y="145" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Routing & Security</text>
      <text x="190" y="158" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Rate Limiting</text>

      <rect x="320" y="110" width="180" height="60" fill={c.api} stroke={c.border} rx="8" ry="8" />
      <text x="410" y="130" textAnchor="middle" fill={c.text} style={{ font }}>Developer Portal</text>
      <text x="410" y="145" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>API Discovery</text>
      <text x="410" y="158" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Documentation</text>

      <rect x="540" y="110" width="180" height="60" fill={c.api} stroke={c.border} rx="8" ry="8" />
      <text x="630" y="130" textAnchor="middle" fill={c.text} style={{ font }}>API Analytics</text>
      <text x="630" y="145" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Usage Monitoring</text>
      <text x="630" y="158" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Performance</text>

      {/* Enterprise Integration Layer */}
      <rect x="50" y="210" width="550" height="120" fill={c.integration} stroke={c.border} rx="12" ry="12" opacity="0.3" />
      <text x="70" y="235" fill={c.text} style={{ font: fontTitle }}>Enterprise Integration</text>

      <rect x="100" y="250" width="180" height="60" fill={c.integration} stroke={c.border} rx="8" ry="8" />
      <text x="190" y="270" textAnchor="middle" fill={c.text} style={{ font }}>ESB/EIP</text>
      <text x="190" y="285" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Message Routing</text>
      <text x="190" y="298" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Data Transformation</text>

      <rect x="320" y="250" width="180" height="60" fill={c.integration} stroke={c.border} rx="8" ry="8" />
      <text x="410" y="270" textAnchor="middle" fill={c.text} style={{ font }}>Message Queue</text>
      <text x="410" y="285" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Event Streaming</text>
      <text x="410" y="298" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Async Processing</text>

      {/* Microservices Layer */}
      <rect x="620" y="210" width="530" height="120" fill={c.microservices} stroke={c.border} rx="12" ry="12" opacity="0.3" />
      <text x="640" y="235" fill={c.text} style={{ font: fontTitle }}>Microservices</text>

      <rect x="670" y="250" width="120" height="60" fill={c.microservices} stroke={c.border} rx="8" ry="8" />
      <text x="730" y="270" textAnchor="middle" fill={c.text} style={{ font }}>Service A</text>
      <text x="730" y="285" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Business Logic</text>

      <rect x="810" y="250" width="120" height="60" fill={c.microservices} stroke={c.border} rx="8" ry="8" />
      <text x="870" y="270" textAnchor="middle" fill={c.text} style={{ font }}>Service B</text>
      <text x="870" y="285" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Domain Logic</text>

      <rect x="950" y="250" width="120" height="60" fill={c.microservices} stroke={c.border} rx="8" ry="8" />
      <text x="1010" y="270" textAnchor="middle" fill={c.text} style={{ font }}>Service C</text>
      <text x="1010" y="285" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Processing</text>

      {/* Data Lake Layer */}
      <rect x="50" y="350" width="550" height="120" fill={c.data} stroke={c.border} rx="12" ry="12" opacity="0.3" />
      <text x="70" y="375" fill={c.text} style={{ font: fontTitle }}>Data Lake & Analytics</text>

      <rect x="100" y="390" width="140" height="60" fill={c.data} stroke={c.border} rx="8" ry="8" />
      <text x="170" y="410" textAnchor="middle" fill={c.text} style={{ font }}>Data Ingestion</text>
      <text x="170" y="425" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>ETL/ELT</text>
      <text x="170" y="438" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Real-time</text>

      <rect x="260" y="390" width="140" height="60" fill={c.data} stroke={c.border} rx="8" ry="8" />
      <text x="330" y="410" textAnchor="middle" fill={c.text} style={{ font }}>Data Storage</text>
      <text x="330" y="425" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Data Warehouse</text>
      <text x="330" y="438" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Object Storage</text>

      <rect x="420" y="390" width="140" height="60" fill={c.data} stroke={c.border} rx="8" ry="8" />
      <text x="490" y="410" textAnchor="middle" fill={c.text} style={{ font }}>Analytics</text>
      <text x="490" y="425" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>BI Tools</text>
      <text x="490" y="438" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>ML/AI</text>

      {/* Internal Developer Platform */}
      <rect x="620" y="350" width="530" height="120" fill={c.devops} stroke={c.border} rx="12" ry="12" opacity="0.3" />
      <text x="640" y="375" fill={c.text} style={{ font: fontTitle }}>Internal Developer Platform</text>

      <rect x="670" y="390" width="140" height="60" fill={c.devops} stroke={c.border} rx="8" ry="8" />
      <text x="740" y="410" textAnchor="middle" fill={c.text} style={{ font }}>CI/CD Pipeline</text>
      <text x="740" y="425" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Build & Deploy</text>
      <text x="740" y="438" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Testing</text>

      <rect x="830" y="390" width="140" height="60" fill={c.devops} stroke={c.border} rx="8" ry="8" />
      <text x="900" y="410" textAnchor="middle" fill={c.text} style={{ font }}>Infrastructure</text>
      <text x="900" y="425" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Kubernetes</text>
      <text x="900" y="438" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Service Mesh</text>

      <rect x="990" y="390" width="140" height="60" fill={c.devops} stroke={c.border} rx="8" ry="8" />
      <text x="1060" y="410" textAnchor="middle" fill={c.text} style={{ font }}>Observability</text>
      <text x="1060" y="425" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Monitoring</text>
      <text x="1060" y="438" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Logging</text>

      {/* Identity and Access Management */}
      <rect x="50" y="490" width="1100" height="120" fill={c.security} stroke={c.border} rx="12" ry="12" opacity="0.3" />
      <text x="70" y="515" fill={c.text} style={{ font: fontTitle }}>Identity & Access Management</text>

      <rect x="100" y="530" width="160" height="60" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="180" y="550" textAnchor="middle" fill={c.text} style={{ font }}>Identity Provider</text>
      <text x="180" y="565" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>OIDC/SAML</text>
      <text x="180" y="578" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>OAuth 2.0</text>

      <rect x="300" y="530" width="160" height="60" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="380" y="550" textAnchor="middle" fill={c.text} style={{ font }}>Authorization</text>
      <text x="380" y="565" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>RBAC/ABAC</text>
      <text x="380" y="578" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Policy Engine</text>

      <rect x="500" y="530" width="160" height="60" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="580" y="550" textAnchor="middle" fill={c.text} style={{ font }}>Multi-Factor Auth</text>
      <text x="580" y="565" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>TOTP/SMS</text>
      <text x="580" y="578" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Biometrics</text>

      <rect x="700" y="530" width="160" height="60" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="780" y="550" textAnchor="middle" fill={c.text} style={{ font }}>Security Gateway</text>
      <text x="780" y="565" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>WAF</text>
      <text x="780" y="578" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>DDoS Protection</text>

      <rect x="900" y="530" width="160" height="60" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="980" y="550" textAnchor="middle" fill={c.text} style={{ font }}>Audit & Compliance</text>
      <text x="980" y="565" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Access Logs</text>
      <text x="980" y="578" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Compliance Reports</text>

      {/* Connections between layers */}
      <line x1="190" y1="190" x2="190" y2="250" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-dp)" />
      <line x1="410" y1="190" x2="410" y2="250" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-dp)" />
      <line x1="630" y1="190" x2="730" y2="250" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-dp)" />

      <line x1="190" y1="330" x2="190" y2="390" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-dp)" />
      <line x1="410" y1="330" x2="410" y2="390" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-dp)" />
      <line x1="730" y1="330" x2="740" y2="390" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-dp)" />
      <line x1="870" y1="330" x2="900" y2="390" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-dp)" />

      <line x1="325" y1="470" x2="380" y2="530" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-dp)" />
      <line x1="885" y1="470" x2="780" y2="530" stroke={c.subtle} strokeWidth={2} markerEnd="url(#arrow-dp)" />

      {/* Cross-layer connections */}
      <line x1="500" y1="280" x2="670" y2="280" stroke={c.subtle} strokeWidth={1.5} strokeDasharray="5,5" markerEnd="url(#arrow-dp)" />
      <line x1="560" y1="420" x2="670" y2="420" stroke={c.subtle} strokeWidth={1.5} strokeDasharray="5,5" markerEnd="url(#arrow-dp)" />

      {/* Legend */}
      <text x="50" y="650" fill={c.text} style={{ font: fontTitle }}>Key Features:</text>
      <text x="50" y="675" fill={c.subtle} style={{ font: fontSub }}>• Scalable and resilient architecture</text>
      <text x="50" y="690" fill={c.subtle} style={{ font: fontSub }}>• Event-driven communication</text>
      <text x="50" y="705" fill={c.subtle} style={{ font: fontSub }}>• Self-service developer experience</text>

      <text x="350" y="650" fill={c.text} style={{ font: fontTitle }}>Benefits:</text>
      <text x="350" y="675" fill={c.subtle} style={{ font: fontSub }}>• Faster time-to-market</text>
      <text x="350" y="690" fill={c.subtle} style={{ font: fontSub }}>• Independent team scaling</text>
      <text x="350" y="705" fill={c.subtle} style={{ font: fontSub }}>• Technology diversity</text>

      <text x="600" y="650" fill={c.text} style={{ font: fontTitle }}>Integration Patterns:</text>
      <text x="600" y="665" fill={c.subtle} style={{ font: fontSub }}>━━━ Direct API calls</text>
      <text x="600" y="680" fill={c.subtle} style={{ font: fontSub }}>┅┅┅ Event-driven messaging</text>
      <text x="600" y="695" fill={c.subtle} style={{ font: fontSub }}>▬▬▬ Security & governance</text>

      <rect x="850" y="635" width="14" height="14" fill={c.api} rx="2" />
      <text x="875" y="647" fill={c.subtle} style={{ font: fontSub }}>API Management</text>
      
      <rect x="850" y="655" width="14" height="14" fill={c.integration} rx="2" />
      <text x="875" y="667" fill={c.subtle} style={{ font: fontSub }}>Integration</text>
      
      <rect x="850" y="675" width="14" height="14" fill={c.microservices} rx="2" />
      <text x="875" y="687" fill={c.subtle} style={{ font: fontSub }}>Microservices</text>

      <rect x="1000" y="635" width="14" height="14" fill={c.data} rx="2" />
      <text x="1025" y="647" fill={c.subtle} style={{ font: fontSub }}>Data & Analytics</text>
      
      <rect x="1000" y="655" width="14" height="14" fill={c.devops} rx="2" />
      <text x="1025" y="667" fill={c.subtle} style={{ font: fontSub }}>Developer Platform</text>
      
      <rect x="1000" y="675" width="14" height="14" fill={c.security} rx="2" />
      <text x="1025" y="687" fill={c.subtle} style={{ font: fontSub }}>Identity & Security</text>
    </svg>
  );
}