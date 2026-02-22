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
    messaging: "var(--yellow-light)",
    streaming: "var(--teal-light)",
  } as const;

  const font = "600 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 10px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontTitle = "700 15px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontMini = "500 9px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 1600 900" role="img" aria-labelledby="digital-platform-title digital-platform-desc" preserveAspectRatio="xMidYMid meet">
      <title id="digital-platform-title">Digital Platform Architecture</title>
      <desc id="digital-platform-desc">Comprehensive view of digital platform building blocks including API management, messaging, microservices, data platforms, developer tools, and security layers with their interconnections.</desc>
      
      <defs>
        <marker id="arrow-dp" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
        <marker id="arrow-event" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.messaging} />
        </marker>
        <marker id="arrow-stream" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.streaming} />
        </marker>
        <marker id="arrow-security" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.security} />
        </marker>
        <pattern id="grid" patternUnits="userSpaceOnUse" width="25" height="25">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke={c.border} strokeWidth="0.5" opacity="0.2"/>
        </pattern>
        <linearGradient id="platformGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c.primary} stopOpacity="0.1"/>
          <stop offset="100%" stopColor={c.primary} stopOpacity="0.05"/>
        </linearGradient>
      </defs>

      {/* Background with subtle gradient */}
      <rect width="1600" height="900" fill="url(#platformGradient)" />
      <rect width="1600" height="900" fill="url(#grid)" />

      {/* Main Title */}
      <text x="800" y="40" textAnchor="middle" fill={c.text} style={{ font: "700 20px system-ui" }}>Digital Platform Building Blocks</text>
      <text x="800" y="60" textAnchor="middle" fill={c.subtle} style={{ font: "500 14px system-ui" }}>Core Software Platform Capabilities for Enterprise Architecture</text>

      {/* External Interface Layer */}
      <rect x="60" y="90" width="1480" height="80" fill={c.api} stroke={c.border} rx="15" ry="15" opacity="0.25" />
      <text x="80" y="115" fill={c.text} style={{ font: fontTitle }}>🌐 External Interface & API Management</text>
      
      <rect x="120" y="125" width="150" height="35" fill={c.api} stroke={c.border} rx="8" ry="8" />
      <text x="195" y="140" textAnchor="middle" fill={c.text} style={{ font }}>API Gateway</text>
      <text x="195" y="152" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Traffic Control</text>

      <rect x="290" y="125" width="150" height="35" fill={c.api} stroke={c.border} rx="8" ry="8" />
      <text x="365" y="140" textAnchor="middle" fill={c.text} style={{ font }}>Load Balancer</text>
      <text x="365" y="152" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>HA & Scaling</text>

      <rect x="460" y="125" width="150" height="35" fill={c.api} stroke={c.border} rx="8" ry="8" />
      <text x="535" y="140" textAnchor="middle" fill={c.text} style={{ font }}>Developer Portal</text>
      <text x="535" y="152" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>API Discovery</text>

      <rect x="630" y="125" width="150" height="35" fill={c.api} stroke={c.border} rx="8" ry="8" />
      <text x="705" y="140" textAnchor="middle" fill={c.text} style={{ font }}>API Analytics</text>
      <text x="705" y="152" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Usage Metrics</text>

      <rect x="800" y="125" width="150" height="35" fill={c.api} stroke={c.border} rx="8" ry="8" />
      <text x="875" y="140" textAnchor="middle" fill={c.text} style={{ font }}>CDN/Edge</text>
      <text x="875" y="152" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Global Distribution</text>

      <rect x="970" y="125" width="150" height="35" fill={c.api} stroke={c.border} rx="8" ry="8" />
      <text x="1045" y="140" textAnchor="middle" fill={c.text} style={{ font }}>Rate Limiting</text>
      <text x="1045" y="152" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Throttling</text>

      {/* Event Backbone Layer */}
      <rect x="60" y="190" width="1480" height="100" fill={c.messaging} stroke={c.border} rx="15" ry="15" opacity="0.25" />
      <text x="80" y="215" fill={c.text} style={{ font: fontTitle }}>⚡ Event Backbone & Messaging</text>

      <rect x="120" y="235" width="160" height="45" fill={c.messaging} stroke={c.border} rx="8" ry="8" />
      <text x="200" y="250" textAnchor="middle" fill={c.text} style={{ font }}>Message Broker</text>
      <text x="200" y="262" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>RabbitMQ</text>
      <text x="200" y="272" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Pub/Sub, Queues</text>

      <rect x="300" y="235" width="160" height="45" fill={c.streaming} stroke={c.border} rx="8" ry="8" />
      <text x="380" y="250" textAnchor="middle" fill={c.text} style={{ font }}>Event Streaming</text>
      <text x="380" y="262" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Apache Kafka</text>
      <text x="380" y="272" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>High Throughput</text>

      <rect x="480" y="235" width="160" height="45" fill={c.messaging} stroke={c.border} rx="8" ry="8" />
      <text x="560" y="250" textAnchor="middle" fill={c.text} style={{ font }}>Event Store</text>
      <text x="560" y="262" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>EventStore DB</text>
      <text x="560" y="272" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Event Sourcing</text>

      <rect x="660" y="235" width="160" height="45" fill={c.streaming} stroke={c.border} rx="8" ry="8" />
      <text x="740" y="250" textAnchor="middle" fill={c.text} style={{ font }}>Stream Processing</text>
      <text x="740" y="262" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Apache Flink</text>
      <text x="740" y="272" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Real-time CEP</text>

      <rect x="840" y="235" width="160" height="45" fill={c.messaging} stroke={c.border} rx="8" ry="8" />
      <text x="920" y="250" textAnchor="middle" fill={c.text} style={{ font }}>Schema Registry</text>
      <text x="920" y="262" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Confluent</text>
      <text x="920" y="272" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Event Contracts</text>

      <rect x="1020" y="235" width="160" height="45" fill={c.streaming} stroke={c.border} rx="8" ry="8" />
      <text x="1100" y="250" textAnchor="middle" fill={c.text} style={{ font }}>Dead Letter Queue</text>
      <text x="1100" y="262" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Error Handling</text>
      <text x="1100" y="272" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Retry Logic</text>

      <rect x="1200" y="235" width="160" height="45" fill={c.messaging} stroke={c.border} rx="8" ry="8" />
      <text x="1280" y="250" textAnchor="middle" fill={c.text} style={{ font }}>Event Gateway</text>
      <text x="1280" y="262" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Event Routing</text>
      <text x="1280" y="272" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Protocol Bridge</text>

      {/* Business Logic Layer */}
      <rect x="60" y="310" width="720" height="100" fill={c.integration} stroke={c.border} rx="15" ry="15" opacity="0.25" />
      <text x="80" y="335" fill={c.text} style={{ font: fontTitle }}>🔄 Integration & Orchestration</text>

      <rect x="120" y="355" width="140" height="45" fill={c.integration} stroke={c.border} rx="8" ry="8" />
      <text x="190" y="370" textAnchor="middle" fill={c.text} style={{ font }}>ESB/EIP</text>
      <text x="190" y="382" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>WSO2 MI</text>
      <text x="190" y="392" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Mediation</text>

      <rect x="280" y="355" width="140" height="45" fill={c.integration} stroke={c.border} rx="8" ry="8" />
      <text x="350" y="370" textAnchor="middle" fill={c.text} style={{ font }}>Connectors</text>
      <text x="350" y="382" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Legacy APIs</text>
      <text x="350" y="392" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>SOAP/REST</text>

      <rect x="440" y="355" width="140" height="45" fill={c.integration} stroke={c.border} rx="8" ry="8" />
      <text x="510" y="370" textAnchor="middle" fill={c.text} style={{ font }}>Workflow Engine</text>
      <text x="510" y="382" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Camunda</text>
      <text x="510" y="392" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>BPMN</text>

      <rect x="600" y="355" width="140" height="45" fill={c.integration} stroke={c.border} rx="8" ry="8" />
      <text x="670" y="370" textAnchor="middle" fill={c.text} style={{ font }}>Data Transform</text>
      <text x="670" y="382" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>ETL/ELT</text>
      <text x="670" y="392" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Data Mapping</text>

      <rect x="800" y="310" width="740" height="100" fill={c.microservices} stroke={c.border} rx="15" ry="15" opacity="0.25" />
      <text x="820" y="335" fill={c.text} style={{ font: fontTitle }}>🏗️ Microservices & Domain Services</text>

      <rect x="860" y="355" width="110" height="45" fill={c.microservices} stroke={c.border} rx="8" ry="8" />
      <text x="915" y="370" textAnchor="middle" fill={c.text} style={{ font }}>User Service</text>
      <text x="915" y="382" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Identity Domain</text>
      <text x="915" y="392" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>CQRS</text>

      <rect x="990" y="355" width="110" height="45" fill={c.microservices} stroke={c.border} rx="8" ry="8" />
      <text x="1045" y="370" textAnchor="middle" fill={c.text} style={{ font }}>Order Service</text>
      <text x="1045" y="382" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Business Logic</text>
      <text x="1045" y="392" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Event Sourcing</text>

      <rect x="1120" y="355" width="110" height="45" fill={c.microservices} stroke={c.border} rx="8" ry="8" />
      <text x="1175" y="370" textAnchor="middle" fill={c.text} style={{ font }}>Payment Service</text>
      <text x="1175" y="382" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Financial</text>
      <text x="1175" y="392" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Saga Pattern</text>

      <rect x="1250" y="355" width="110" height="45" fill={c.microservices} stroke={c.border} rx="8" ry="8" />
      <text x="1305" y="370" textAnchor="middle" fill={c.text} style={{ font }}>Analytics Service</text>
      <text x="1305" y="382" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>ML/AI</text>
      <text x="1305" y="392" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Batch Processing</text>

      <rect x="1380" y="355" width="110" height="45" fill={c.microservices} stroke={c.border} rx="8" ry="8" />
      <text x="1435" y="370" textAnchor="middle" fill={c.text} style={{ font }}>Notification Service</text>
      <text x="1435" y="382" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Communication</text>
      <text x="1435" y="392" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Multi-Channel</text>

      {/* Data & Platform Layer */}
      <rect x="60" y="430" width="720" height="100" fill={c.data} stroke={c.border} rx="15" ry="15" opacity="0.25" />
      <text x="80" y="455" fill={c.text} style={{ font: fontTitle }}>💾 Data Platform & Analytics</text>

      <rect x="120" y="475" width="130" height="45" fill={c.data} stroke={c.border} rx="8" ry="8" />
      <text x="185" y="490" textAnchor="middle" fill={c.text} style={{ font }}>Data Ingestion</text>
      <text x="185" y="502" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Apache NiFi</text>
      <text x="185" y="512" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Real-time ETL</text>

      <rect x="270" y="475" width="130" height="45" fill={c.data} stroke={c.border} rx="8" ry="8" />
      <text x="335" y="490" textAnchor="middle" fill={c.text} style={{ font }}>Data Lake</text>
      <text x="335" y="502" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Apache Iceberg</text>
      <text x="335" y="512" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Object Storage</text>

      <rect x="420" y="475" width="130" height="45" fill={c.data} stroke={c.border} rx="8" ry="8" />
      <text x="485" y="490" textAnchor="middle" fill={c.text} style={{ font }}>Data Warehouse</text>
      <text x="485" y="502" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Snowflake</text>
      <text x="485" y="512" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>OLAP</text>

      <rect x="570" y="475" width="130" height="45" fill={c.data} stroke={c.border} rx="8" ry="8" />
      <text x="635" y="490" textAnchor="middle" fill={c.text} style={{ font }}>ML Platform</text>
      <text x="635" y="502" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>MLflow</text>
      <text x="635" y="512" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Model Ops</text>

      <rect x="800" y="430" width="740" height="100" fill={c.devops} stroke={c.border} rx="15" ry="15" opacity="0.25" />
      <text x="820" y="455" fill={c.text} style={{ font: fontTitle }}>🚀 Developer Platform & Operations</text>

      <rect x="860" y="475" width="105" height="45" fill={c.devops} stroke={c.border} rx="8" ry="8" />
      <text x="912" y="490" textAnchor="middle" fill={c.text} style={{ font }}>CI/CD Pipeline</text>
      <text x="912" y="502" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>GitLab/Jenkins</text>
      <text x="912" y="512" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>GitOps</text>

      <rect x="985" y="475" width="105" height="45" fill={c.devops} stroke={c.border} rx="8" ry="8" />
      <text x="1037" y="490" textAnchor="middle" fill={c.text} style={{ font }}>Container Platform</text>
      <text x="1037" y="502" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Kubernetes</text>
      <text x="1037" y="512" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Orchestration</text>

      <rect x="1110" y="475" width="105" height="45" fill={c.devops} stroke={c.border} rx="8" ry="8" />
      <text x="1162" y="490" textAnchor="middle" fill={c.text} style={{ font }}>Service Mesh</text>
      <text x="1162" y="502" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Istio</text>
      <text x="1162" y="512" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Traffic Mgmt</text>

      <rect x="1235" y="475" width="105" height="45" fill={c.devops} stroke={c.border} rx="8" ry="8" />
      <text x="1287" y="490" textAnchor="middle" fill={c.text} style={{ font }}>Observability</text>
      <text x="1287" y="502" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>OpenTelemetry</text>
      <text x="1287" y="512" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Monitoring</text>

      <rect x="1360" y="475" width="105" height="45" fill={c.devops} stroke={c.border} rx="8" ry="8" />
      <text x="1412" y="490" textAnchor="middle" fill={c.text} style={{ font }}>Service Catalog</text>
      <text x="1412" y="502" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Backstage</text>
      <text x="1412" y="512" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Self-Service</text>

      <rect x="1485" y="475" width="105" height="45" fill={c.devops} stroke={c.border} rx="8" ry="8" />
      <text x="1537" y="490" textAnchor="middle" fill={c.text} style={{ font }}>Internal Dev Platform</text>
      <text x="1537" y="502" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>WSO2 Choreo</text>
      <text x="1537" y="512" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Low-Code Platform</text>

      {/* Security & Governance Layer */}
      <rect x="60" y="550" width="1480" height="100" fill={c.security} stroke={c.border} rx="15" ry="15" opacity="0.25" />
      <text x="80" y="575" fill={c.text} style={{ font: fontTitle }}>🔐 Security, Identity & Governance</text>

      <rect x="120" y="595" width="130" height="45" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="185" y="610" textAnchor="middle" fill={c.text} style={{ font }}>Identity Provider</text>
      <text x="185" y="622" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Keycloak</text>
      <text x="185" y="632" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>OIDC/SAML</text>

      <rect x="270" y="595" width="130" height="45" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="335" y="610" textAnchor="middle" fill={c.text} style={{ font }}>Authorization</text>
      <text x="335" y="622" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Open Policy Agent</text>
      <text x="335" y="632" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>RBAC/ABAC</text>

      <rect x="420" y="595" width="130" height="45" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="485" y="610" textAnchor="middle" fill={c.text} style={{ font }}>Multi-Factor Auth</text>
      <text x="485" y="622" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Duo/Okta</text>
      <text x="485" y="632" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>TOTP/WebAuthn</text>

      <rect x="570" y="595" width="130" height="45" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="635" y="610" textAnchor="middle" fill={c.text} style={{ font }}>Security Gateway</text>
      <text x="635" y="622" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Cloudflare</text>
      <text x="635" y="632" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>WAF/DDoS</text>

      <rect x="720" y="595" width="130" height="45" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="785" y="610" textAnchor="middle" fill={c.text} style={{ font }}>Secrets Management</text>
      <text x="785" y="622" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>HashiCorp Vault</text>
      <text x="785" y="632" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Key Management</text>

      <rect x="870" y="595" width="130" height="45" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="935" y="610" textAnchor="middle" fill={c.text} style={{ font }}>Certificate Mgmt</text>
      <text x="935" y="622" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Let's Encrypt</text>
      <text x="935" y="632" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>TLS/mTLS</text>

      <rect x="1020" y="595" width="130" height="45" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="1085" y="610" textAnchor="middle" fill={c.text} style={{ font }}>Audit & Compliance</text>
      <text x="1085" y="622" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Splunk</text>
      <text x="1085" y="632" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>SOC2/GDPR</text>

      <rect x="1170" y="595" width="130" height="45" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="1235" y="610" textAnchor="middle" fill={c.text} style={{ font }}>Zero Trust Network</text>
      <text x="1235" y="622" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Palo Alto Prisma</text>
      <text x="1235" y="632" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>Network Security</text>

      <rect x="1320" y="595" width="130" height="45" fill={c.security} stroke={c.border} rx="8" ry="8" />
      <text x="1385" y="610" textAnchor="middle" fill={c.text} style={{ font }}>Data Protection</text>
      <text x="1385" y="622" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Encryption at Rest</text>
      <text x="1385" y="632" textAnchor="middle" fill={c.subtle} style={{ font: fontMini }}>PII/PHI</text>


      {/* Information Panel */}
      {/* Reduced height to eliminate excess bottom whitespace */}
      <rect x="60" y="680" width="1480" height="220" fill={c.surface} stroke={c.border} rx="15" ry="15" opacity="0.8" />
      
      {/* Quick Reference (condensed to reduce crowding) */}
      <text x="80" y="710" fill={c.text} style={{ font: fontTitle }}>📘 Quick Reference</text>

      {/* Left column: Component Types (legend) */}
      <text x="80" y="735" fill={c.text} style={{ font: fontSub }}>🏗️ Component Types</text>
      <rect x="80" y="745" width="12" height="10" fill={c.api} rx="2" />
      <text x="100" y="753" fill={c.subtle} style={{ font: fontMini }}>API & Edge</text>
      <rect x="80" y="760" width="12" height="10" fill={c.messaging} rx="2" />
      <text x="100" y="768" fill={c.subtle} style={{ font: fontMini }}>Messaging/Streaming</text>
      <rect x="80" y="775" width="12" height="10" fill={c.integration} rx="2" />
      <text x="100" y="783" fill={c.subtle} style={{ font: fontMini }}>Integration</text>
      <rect x="80" y="790" width="12" height="10" fill={c.microservices} rx="2" />
      <text x="100" y="798" fill={c.subtle} style={{ font: fontMini }}>Microservices</text>
      <rect x="80" y="805" width="12" height="10" fill={c.data} rx="2" />
      <text x="100" y="813" fill={c.subtle} style={{ font: fontMini }}>Data Platform</text>
      <rect x="80" y="820" width="12" height="10" fill={c.devops} rx="2" />
      <text x="100" y="828" fill={c.subtle} style={{ font: fontMini }}>Dev Platform</text>
      <rect x="80" y="835" width="12" height="10" fill={c.security} rx="2" />
      <text x="100" y="843" fill={c.subtle} style={{ font: fontMini }}>Security</text>

      {/* Center column: Key Capabilities */}
      <text x="560" y="735" fill={c.text} style={{ font: fontSub }}>🎯 Key Capabilities</text>
      <text x="560" y="755" fill={c.subtle} style={{ font: fontSub }}>• Event-driven with CQRS where needed</text>
      <text x="560" y="770" fill={c.subtle} style={{ font: fontSub }}>• Zero-trust identity & policy</text>
      <text x="560" y="785" fill={c.subtle} style={{ font: fontSub }}>• Self-service DevEx & GitOps</text>
      <text x="560" y="800" fill={c.subtle} style={{ font: fontSub }}>• Observability & SLOs</text>

      {/* Right column: Audience & Roles (condensed) */}
      <text x="1050" y="735" fill={c.text} style={{ font: fontSub }}>👥 Audience & Roles</text>
      <text x="1050" y="755" fill={c.subtle} style={{ font: fontMini }}>🏢 Business — domain interactions, value/KPIs (L0/L1)</text>
      <text x="1050" y="770" fill={c.subtle} style={{ font: fontMini }}>✅ ARB — standards, security, NFRs (L1/L2)</text>
      <text x="1050" y="785" fill={c.subtle} style={{ font: fontMini }}>🎯 Eng. Leaders — fit, trade‑offs, risks (L1/L2)</text>
      <text x="1050" y="800" fill={c.subtle} style={{ font: fontMini }}>🛠️ Engineers — interfaces, flows (L2/L3)</text>
      <text x="1050" y="815" fill={c.subtle} style={{ font: fontMini }}>⚙️ Ops — topology, SLOs, runbooks (L2/L3)</text>

      {/* Removed detailed Audience & Roles section to avoid redundancy with condensed list and Solutions page */}
    </svg>
  );
}
