export function APISecurityDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    alt: "var(--surface-alt)",
    gateway: "var(--primary-light)",
    security: "#ff6b6b",
    client: "var(--orange-light)",
    backend: "var(--green-light)",
    identity: "var(--purple-light)",
  } as const;

  const font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontTitle = "700 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 900 650" role="img" aria-labelledby="apisecurity-title apisecurity-desc" preserveAspectRatio="xMidYMid meet">
      <title id="apisecurity-title">API Security Gateway Architecture</title>
      <desc id="apisecurity-desc">API gateway with security layers including WAF, authentication, rate limiting, and threat protection.</desc>
      
      <defs>
        <marker id="arrow-api" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
        <marker id="arrow-blocked" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.security} />
        </marker>
        <pattern id="grid-api" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c.border} strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <filter id="shadow-api">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
        <linearGradient id="gateway-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.gateway} />
          <stop offset="100%" stopColor="#e3f2fd" />
        </linearGradient>
      </defs>

      {/* Background grid */}
      <rect width="900" height="650" fill="url(#grid-api)" />

      {/* Main title */}
      <rect x="250" y="15" width="400" height="35" fill={c.gateway} stroke="none" rx="17" ry="17" />
      <text x="450" y="38" textAnchor="middle" fill={c.text} style={{ font: fontTitle }}>🛡️ API Security Gateway</text>

      {/* Internet/Threats Zone */}
      <rect x="30" y="80" width="150" height="280" fill={c.security} fillOpacity="0.1" 
            stroke={c.security} strokeWidth="2" rx="10" ry="10" />
      <text x="105" y="105" textAnchor="middle" fill={c.text} style={{ font }}>🌐 Internet / Threats</text>

      {/* External Clients */}
      <rect x="50" y="120" width="110" height="45" fill={c.client} stroke={c.border} rx="8" ry="8" />
      <text x="105" y="140" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>💻 Web Clients</text>
      <text x="105" y="155" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Browsers, SPAs</text>
      
      <rect x="50" y="175" width="110" height="45" fill={c.client} stroke={c.border} rx="8" ry="8" />
      <text x="105" y="195" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>📱 Mobile Apps</text>
      <text x="105" y="210" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>iOS, Android</text>
      
      <rect x="50" y="230" width="110" height="45" fill={c.client} stroke={c.border} rx="8" ry="8" />
      <text x="105" y="250" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🤝 Partner Systems</text>
      <text x="105" y="265" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>B2B Integration</text>
      
      <rect x="50" y="285" width="110" height="45" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="105" y="305" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🚨 Malicious Traffic</text>
      <text x="105" y="320" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Bots, Attacks</text>

      {/* Load Balancer */}
      <rect x="220" y="180" width="100" height="80" fill={c.alt} stroke={c.border} strokeWidth="2" rx="10" ry="10" />
      <text x="270" y="205" textAnchor="middle" fill={c.text} style={{ font }}>⚖️ Load Balancer</text>
      <text x="270" y="225" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• SSL Termination</text>
      <text x="270" y="240" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• DDoS Protection</text>
      <text x="270" y="255" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Health Checks</text>

      {/* API Security Gateway - Main Component */}
      <rect x="360" y="90" width="220" height="320" fill="url(#gateway-gradient)" fillOpacity="0.2" 
            stroke={c.gateway} strokeWidth="3" rx="15" ry="15" filter="url(#shadow-api)" />
      <text x="470" y="120" textAnchor="middle" fill={c.text} style={{ font: fontTitle }}>🔐 API Security Gateway</text>
      
      {/* Security Layers within Gateway */}
      <text x="470" y="145" textAnchor="middle" fill={c.text} style={{ font }}>Security Layers:</text>

      <rect x="375" y="155" width="190" height="35" fill={c.security} stroke={c.border} rx="6" ry="6" />
      <text x="470" y="175" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🔥 Web Application Firewall</text>
      <text x="470" y="185" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>OWASP Top 10 Protection</text>

      <rect x="375" y="200" width="190" height="35" fill={c.identity} stroke={c.border} rx="6" ry="6" />
      <text x="470" y="220" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🔑 Authentication & Authorization</text>
      <text x="470" y="230" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>OAuth2, JWT, API Keys</text>

      <rect x="375" y="245" width="190" height="35" fill={c.client} stroke={c.border} rx="6" ry="6" />
      <text x="470" y="265" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🚦 Rate Limiting & Throttling</text>
      <text x="470" y="275" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Quota Management, Circuit Breaker</text>

      <rect x="375" y="290" width="190" height="35" fill={c.backend} stroke={c.border} rx="6" ry="6" />
      <text x="470" y="310" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>✅ Request/Response Validation</text>
      <text x="470" y="320" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Schema Validation, Data Sanitization</text>

      <rect x="375" y="335" width="190" height="35" fill={c.subtle} stroke={c.border} rx="6" ry="6" />
      <text x="470" y="355" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🔄 Routing & Transformation</text>
      <text x="470" y="365" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Load Balancing, Protocol Translation</text>

      <rect x="375" y="380" width="190" height="25" fill={c.alt} stroke={c.border} rx="6" ry="6" />
      <text x="470" y="395" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>📊 Logging & Monitoring</text>

      {/* Backend Services */}
      <rect x="620" y="100" width="220" height="280" fill={c.backend} fillOpacity="0.1" 
            stroke={c.backend} strokeWidth="2" rx="10" ry="10" />
      <text x="730" y="125" textAnchor="middle" fill={c.text} style={{ font }}>🏢 Backend Services</text>
      
      <rect x="640" y="140" width="90" height="50" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="685" y="160" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>👥 User Service</text>
      <text x="685" y="175" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Profile, Auth</text>
      
      <rect x="750" y="140" width="90" height="50" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="795" y="160" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>📦 Order Service</text>
      <text x="795" y="175" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>E-commerce</text>
      
      <rect x="640" y="200" width="90" height="50" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="685" y="220" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>💳 Payment Service</text>
      <text x="685" y="235" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Billing, Charges</text>
      
      <rect x="750" y="200" width="90" height="50" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="795" y="220" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>📞 Notification</text>
      <text x="795" y="235" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Email, SMS</text>
      
      <rect x="640" y="260" width="90" height="50" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="685" y="280" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🏛️ Legacy Systems</text>
      <text x="685" y="295" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Mainframe, SOAP</text>

      <rect x="750" y="260" width="90" height="50" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="795" y="280" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🗄️ Databases</text>
      <text x="795" y="295" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>SQL, NoSQL</text>

      <rect x="695" y="320" width="90" height="50" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="740" y="340" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>☁️ Cloud Services</text>
      <text x="740" y="355" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>AWS, Azure</text>

      {/* External Security Services */}
      <rect x="360" y="450" width="100" height="70" fill={c.identity} stroke={c.border} rx="10" ry="10" filter="url(#shadow-api)" />
      <text x="410" y="475" textAnchor="middle" fill={c.text} style={{ font }}>🏛️ Identity</text>
      <text x="410" y="490" textAnchor="middle" fill={c.text} style={{ font }}>Provider</text>
      <text x="410" y="505" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>OAuth2/OIDC</text>

      <rect x="480" y="450" width="100" height="70" fill={c.client} stroke={c.border} rx="10" ry="10" filter="url(#shadow-api)" />
      <text x="530" y="475" textAnchor="middle" fill={c.text} style={{ font }}>📊 SIEM</text>
      <text x="530" y="490" textAnchor="middle" fill={c.text} style={{ font }}>Analytics</text>
      <text x="530" y="505" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Security Events</text>

      {/* Traffic Flow Arrows */}
      <line x1="160" y1="142" x2="220" y2="200" stroke={c.client} strokeWidth={2.5} markerEnd="url(#arrow-api)" />
      <line x1="160" y1="197" x2="220" y2="220" stroke={c.client} strokeWidth={2.5} markerEnd="url(#arrow-api)" />
      <line x1="160" y1="252" x2="220" y2="240" stroke={c.client} strokeWidth={2.5} markerEnd="url(#arrow-api)" />

      {/* Blocked malicious traffic */}
      <line x1="160" y1="307" x2="200" y2="280" stroke={c.security} strokeWidth={3} strokeDasharray="8,4" markerEnd="url(#arrow-blocked)" />
      <text x="175" y="300" fill={c.security} style={{ font: fontSub }}>BLOCKED</text>

      <line x1="320" y1="220" x2="360" y2="220" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-api)" />

      {/* Gateway to backends */}
      <line x1="580" y1="165" x2="620" y2="165" stroke={c.gateway} strokeWidth={2.5} markerEnd="url(#arrow-api)" />
      <line x1="580" y1="225" x2="620" y2="225" stroke={c.gateway} strokeWidth={2.5} markerEnd="url(#arrow-api)" />
      <line x1="580" y1="285" x2="620" y2="285" stroke={c.gateway} strokeWidth={2.5} markerEnd="url(#arrow-api)" />
      <line x1="580" y1="345" x2="620" y2="345" stroke={c.gateway} strokeWidth={2.5} markerEnd="url(#arrow-api)" />

      {/* Gateway to external security services */}
      <line x1="450" y1="410" x2="410" y2="450" stroke={c.identity} strokeWidth={2} strokeDasharray="5,5" markerEnd="url(#arrow-api)" />
      <line x1="490" y1="410" x2="530" y2="450" stroke={c.client} strokeWidth={2} strokeDasharray="5,5" markerEnd="url(#arrow-api)" />

      {/* Security Features */}
      <rect x="50" y="550" width="800" height="85" fill={c.alt} stroke={c.border} rx="10" ry="10" opacity="0.9" />
      <text x="450" y="575" textAnchor="middle" fill={c.text} style={{ font }}>🛡️ Security Capabilities</text>
      <text x="450" y="595" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• OWASP Top 10 Protection • DDoS Mitigation • Bot Detection • Certificate Management</text>
      <text x="450" y="610" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Real-time Threat Intelligence • Compliance Reporting • Zero-Trust Enforcement</text>
      <text x="450" y="625" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• API Discovery • Vulnerability Scanning • Behavioral Analytics • Forensic Logging</text>
    </svg>
  );
}
