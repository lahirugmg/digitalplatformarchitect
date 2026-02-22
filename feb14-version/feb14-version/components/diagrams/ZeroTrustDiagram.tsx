export function ZeroTrustDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    alt: "var(--surface-alt)",
    identity: "var(--primary-light)",
    network: "var(--orange-light)", 
    data: "var(--green-light)",
    device: "var(--purple-light)",
    threat: "#ff6b6b",
  } as const;

  const font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontTitle = "700 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 900 650" role="img" aria-labelledby="zerotrust-title zerotrust-desc" preserveAspectRatio="xMidYMid meet">
      <title id="zerotrust-title">Zero Trust Security Architecture</title>
      <desc id="zerotrust-desc">Never trust, always verify security model with identity verification, network segmentation, and continuous monitoring.</desc>
      
      <defs>
        <marker id="arrow-zt" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
        <pattern id="grid-zt" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c.border} strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <linearGradient id="threat-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.threat} />
          <stop offset="100%" stopColor="#ff8e8e" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Background grid */}
      <rect width="900" height="650" fill="url(#grid-zt)" />

      {/* Main title */}
      <rect x="300" y="15" width="300" height="35" fill={c.identity} stroke="none" rx="17" ry="17" />
      <text x="450" y="38" textAnchor="middle" fill={c.text} style={{ font: fontTitle }}>🔒 Zero Trust Security</text>

      {/* External Threats */}
      <rect x="30" y="100" width="150" height="80" fill="url(#threat-gradient)" rx="12" ry="12" filter="url(#shadow)" />
      <text x="105" y="125" textAnchor="middle" fill={c.text} style={{ font }}>⚠️ External Threats</text>
      <text x="105" y="145" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Malicious Actors</text>
      <text x="105" y="160" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Advanced Persistent Threats</text>
      <text x="105" y="175" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Zero-day Exploits</text>

      {/* Core Principle */}
      <rect x="720" y="100" width="150" height="80" fill={c.alt} stroke={c.border} rx="12" ry="12" opacity="0.9" />
      <text x="795" y="125" textAnchor="middle" fill={c.text} style={{ font }}>🎯 Core Principle</text>
      <text x="795" y="145" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>"Never Trust,</text>
      <text x="795" y="160" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Always Verify"</text>
      <text x="795" y="175" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Assume Breach</text>

      {/* Identity & Access Management Layer */}
      <rect x="220" y="80" width="450" height="120" fill={c.identity} fillOpacity="0.15" 
            stroke={c.identity} strokeWidth="2" rx="15" ry="15" />
      <text x="445" y="105" textAnchor="middle" fill={c.text} style={{ font }}>👤 Identity & Access Management</text>
      
      {/* Identity Components */}
      <rect x="240" y="125" width="90" height="55" fill={c.identity} stroke={c.border} rx="8" ry="8" />
      <text x="285" y="145" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🔐 MFA</text>
      <text x="285" y="160" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Multi-Factor</text>
      <text x="285" y="175" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Authentication</text>

      <rect x="350" y="125" width="90" height="55" fill={c.identity} stroke={c.border} rx="8" ry="8" />
      <text x="395" y="145" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>📱 Device Trust</text>
      <text x="395" y="160" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Device Health</text>
      <text x="395" y="175" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>& Compliance</text>

      <rect x="460" y="125" width="90" height="55" fill={c.identity} stroke={c.border} rx="8" ry="8" />
      <text x="505" y="145" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>⚖️ Risk Engine</text>
      <text x="505" y="160" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Behavioral</text>
      <text x="505" y="175" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Analytics</text>

      <rect x="570" y="125" width="90" height="55" fill={c.identity} stroke={c.border} rx="8" ry="8" />
      <text x="615" y="145" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>📋 Policy Engine</text>
      <text x="615" y="160" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Access Control</text>
      <text x="615" y="175" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>& Policies</text>

      {/* Network Security Layer */}
      <rect x="180" y="230" width="540" height="100" fill={c.network} fillOpacity="0.15" 
            stroke={c.network} strokeWidth="2" rx="15" ry="15" />
      <text x="450" y="255" textAnchor="middle" fill={c.text} style={{ font }}>🛡️ Network Micro-Segmentation</text>
      
      {/* Network Segments */}
      <rect x="200" y="275" width="110" height="45" fill={c.network} stroke={c.border} rx="8" ry="8" />
      <text x="255" y="295" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🌐 DMZ Zone</text>
      <text x="255" y="310" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>External Access</text>

      <rect x="330" y="275" width="110" height="45" fill={c.network} stroke={c.border} rx="8" ry="8" />
      <text x="385" y="295" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🖥️ App Zone</text>
      <text x="385" y="310" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Application Tier</text>

      <rect x="460" y="275" width="110" height="45" fill={c.network} stroke={c.border} rx="8" ry="8" />
      <text x="515" y="295" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🗄️ Data Zone</text>
      <text x="515" y="310" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Sensitive Data</text>

      <rect x="590" y="275" width="110" height="45" fill={c.network} stroke={c.border} rx="8" ry="8" />
      <text x="645" y="295" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>👨‍💼 Admin Zone</text>
      <text x="645" y="310" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Privileged Access</text>

      {/* Protected Resources Layer */}
      <rect x="120" y="360" width="660" height="140" fill={c.data} fillOpacity="0.15" 
            stroke={c.data} strokeWidth="2" rx="15" ry="15" />
      <text x="450" y="385" textAnchor="middle" fill={c.text} style={{ font }}>🛡️ Protected Resources & Assets</text>
      
      {/* Individual Resources */}
      <rect x="150" y="405" width="90" height="75" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="195" y="425" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🌐 Web Apps</text>
      <text x="195" y="440" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• SPA/MPA</text>
      <text x="195" y="455" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Dashboards</text>
      <text x="195" y="470" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Portals</text>

      <rect x="260" y="405" width="90" height="75" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="305" y="425" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🔌 APIs</text>
      <text x="305" y="440" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• REST/GraphQL</text>
      <text x="305" y="455" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Microservices</text>
      <text x="305" y="470" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Webhooks</text>

      <rect x="370" y="405" width="90" height="75" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="415" y="425" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🗃️ Databases</text>
      <text x="415" y="440" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• SQL/NoSQL</text>
      <text x="415" y="455" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Data Lakes</text>
      <text x="415" y="470" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Warehouses</text>

      <rect x="480" y="405" width="90" height="75" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="525" y="425" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>📁 File Systems</text>
      <text x="525" y="440" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Object Storage</text>
      <text x="525" y="455" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• NAS/SAN</text>
      <text x="525" y="470" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Document Mgmt</text>

      <rect x="590" y="405" width="90" height="75" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="635" y="425" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>⚙️ Services</text>
      <text x="635" y="440" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Cloud Services</text>
      <text x="635" y="455" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Legacy Systems</text>
      <text x="635" y="470" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Third-party</text>

      <rect x="700" y="405" width="90" height="75" fill={c.surface} stroke={c.border} rx="8" ry="8" />
      <text x="745" y="425" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>📱 Devices</text>
      <text x="745" y="440" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Laptops/Mobile</text>
      <text x="745" y="455" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• IoT Devices</text>
      <text x="745" y="470" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Servers</text>

      {/* Continuous Monitoring Layer */}
      <rect x="200" y="530" width="500" height="80" fill={c.device} fillOpacity="0.15" 
            stroke={c.device} strokeWidth="2" rx="15" ry="15" />
      <text x="450" y="555" textAnchor="middle" fill={c.text} style={{ font }}>📊 Continuous Monitoring & Analytics</text>
      <text x="450" y="575" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Real-time threat detection • Behavioral analytics • Compliance monitoring</text>
      <text x="450" y="590" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Risk scoring • Incident response • Security orchestration</text>

      {/* Flow Arrows */}
      <line x1="180" y1="140" x2="220" y2="140" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-zt)" />
      <line x1="450" y1="200" x2="450" y2="230" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-zt)" />
      <line x1="450" y1="330" x2="450" y2="360" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-zt)" />
      <line x1="450" y1="500" x2="450" y2="530" stroke={c.subtle} strokeWidth={2.5} markerEnd="url(#arrow-zt)" />

      {/* Key Principles sidebar (shifted left to avoid overlap) */}
      <rect x="10" y="250" width="130" height="220" fill={c.alt} stroke={c.border} rx="10" ry="10" opacity="0.9" />
      <text x="75" y="275" textAnchor="middle" fill={c.text} style={{ font }}>🎯 Key Principles</text>
      
      <text x="75" y="300" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>✅ Verify Explicitly</text>
      <text x="75" y="320" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🔒 Least Privilege</text>
      <text x="75" y="340" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>💣 Assume Breach</text>
      <text x="75" y="360" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>📈 Continuous Monitor</text>
      <text x="75" y="380" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🔄 Dynamic Policies</text>
      <text x="75" y="400" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🎛️ Context Aware</text>
      <text x="75" y="420" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🛡️ Defense in Depth</text>
      <text x="75" y="440" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>📍 Data-centric</text>
      <text x="75" y="460" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🚫 Never Trust</text>

      {/* Bottom summary */}
      <text x="450" y="635" textAnchor="middle" fill={c.text} style={{ font }}>Benefits: Enhanced security posture • Reduced attack surface • Improved compliance • Better visibility</text>
    </svg>
  );
}
