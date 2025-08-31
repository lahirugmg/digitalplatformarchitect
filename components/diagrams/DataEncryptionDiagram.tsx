export function DataEncryptionDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    alt: "var(--surface-alt)",
    kms: "var(--purple-light)",
    transit: "var(--orange-light)",
    rest: "var(--green-light)",
    use: "#4ecdc4",
    compliance: "#e74c3c",
  } as const;

  const font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontTitle = "700 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 900 700" role="img" aria-labelledby="encryption-title encryption-desc" preserveAspectRatio="xMidYMid meet">
      <title id="encryption-title">Data Encryption Patterns</title>
      <desc id="encryption-desc">Comprehensive data encryption covering at rest, in transit, and in use with key management and compliance frameworks.</desc>
      
      <defs>
        <marker id="arrow-enc" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
        <pattern id="grid-enc" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c.border} strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <pattern id="encrypted-pattern" patternUnits="userSpaceOnUse" width="12" height="12">
          <rect width="12" height="12" fill={c.rest} fillOpacity="0.1"/>
          <path d="M0,12 L12,0" stroke={c.rest} strokeWidth="1" opacity="0.3"/>
          <path d="M0,6 L6,0 M6,12 L12,6" stroke={c.rest} strokeWidth="0.5" opacity="0.2"/>
        </pattern>
        <filter id="shadow-enc">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
        <linearGradient id="kms-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.kms} />
          <stop offset="100%" stopColor="#e8eaf6" />
        </linearGradient>
      </defs>

      {/* Background grid */}
      <rect width="900" height="700" fill="url(#grid-enc)" />

      {/* Main title */}
      <rect x="200" y="15" width="500" height="35" fill={c.kms} stroke="none" rx="17" ry="17" />
      <text x="450" y="38" textAnchor="middle" fill="#fff" style={{ font: fontTitle }}>🔐 Data Encryption Patterns</text>

      {/* Key Management System - Top Layer */}
      <rect x="50" y="70" width="800" height="100" fill="url(#kms-gradient)" fillOpacity="0.2" 
            stroke={c.kms} strokeWidth="3" rx="15" ry="15" filter="url(#shadow-enc)" />
      <text x="450" y="100" textAnchor="middle" fill={c.text} style={{ font: fontTitle }}>🗝️ Key Management System (KMS)</text>
      
      <rect x="80" y="120" width="130" height="35" fill={c.kms} stroke={c.border} rx="6" ry="6" />
      <text x="145" y="135" textAnchor="middle" fill="white" style={{ font: fontSub }}>🏛️ Hardware Security</text>
      <text x="145" y="150" textAnchor="middle" fill="white" style={{ font: fontSub }}>Module (HSM)</text>

      <rect x="230" y="120" width="110" height="35" fill={c.kms} stroke={c.border} rx="6" ry="6" />
      <text x="285" y="135" textAnchor="middle" fill="white" style={{ font: fontSub }}>🔄 Key Rotation</text>
      <text x="285" y="150" textAnchor="middle" fill="white" style={{ font: fontSub }}>Automated</text>

      <rect x="360" y="120" width="130" height="35" fill={c.kms} stroke={c.border} rx="6" ry="6" />
      <text x="425" y="135" textAnchor="middle" fill="white" style={{ font: fontSub }}>📦 Envelope Encryption</text>
      <text x="425" y="150" textAnchor="middle" fill="white" style={{ font: fontSub }}>DEK + KEK Pattern</text>

      <rect x="510" y="120" width="110" height="35" fill={c.kms} stroke={c.border} rx="6" ry="6" />
      <text x="565" y="135" textAnchor="middle" fill="white" style={{ font: fontSub }}>🛡️ Key Escrow</text>
      <text x="565" y="150" textAnchor="middle" fill="white" style={{ font: fontSub }}>Recovery</text>

      <rect x="640" y="120" width="130" height="35" fill={c.kms} stroke={c.border} rx="6" ry="6" />
      <text x="705" y="135" textAnchor="middle" fill="white" style={{ font: fontSub }}>🔐 Access Control</text>
      <text x="705" y="150" textAnchor="middle" fill="white" style={{ font: fontSub }}>RBAC + Policies</text>

      {/* Three Main Encryption Types */}
      
      {/* Encryption in Transit */}
      <rect x="60" y="200" width="240" height="180" fill={c.transit} fillOpacity="0.15" 
            stroke={c.transit} strokeWidth="2" rx="12" ry="12" />
      <text x="180" y="225" textAnchor="middle" fill={c.text} style={{ font }}>🚀 Encryption in Transit</text>
      
      <rect x="80" y="245" width="80" height="50" fill={c.transit} stroke={c.border} rx="8" ry="8" />
      <text x="120" y="265" textAnchor="middle" fill="white" style={{ font: fontSub }}>💻 Client</text>
      <text x="120" y="280" textAnchor="middle" fill="white" style={{ font: fontSub }}>Browser/App</text>

      <rect x="200" y="245" width="80" height="50" fill={c.transit} stroke={c.border} rx="8" ry="8" />
      <text x="240" y="265" textAnchor="middle" fill="white" style={{ font: fontSub }}>🌐 Server</text>
      <text x="240" y="280" textAnchor="middle" fill="white" style={{ font: fontSub }}>API Gateway</text>

      {/* TLS Connection */}
      <line x1="160" y1="270" x2="200" y2="270" stroke={c.transit} strokeWidth={4} />
      <text x="180" y="265" textAnchor="middle" fill="white" style={{ font: fontSub }}>TLS 1.3</text>

      <rect x="75" y="310" width="190" height="55" fill={c.alt} stroke={c.border} rx="6" ry="6" opacity="0.9" />
      <text x="170" y="325" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🔒 Protocols & Standards</text>
      <text x="170" y="340" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• HTTPS/TLS 1.3 • QUIC</text>
      <text x="170" y="355" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Certificate Pinning • HSTS</text>

      {/* Encryption at Rest */}
      <rect x="330" y="200" width="240" height="240" fill={c.rest} fillOpacity="0.15" 
            stroke={c.rest} strokeWidth="2" rx="12" ry="12" />
      <text x="450" y="225" textAnchor="middle" fill={c.text} style={{ font }}>💾 Encryption at Rest</text>
      
      <rect x="350" y="245" width="90" height="60" fill="url(#encrypted-pattern)" 
            stroke={c.rest} strokeWidth="2" rx="8" ry="8" />
      <text x="395" y="265" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🗄️ Database</text>
      <text x="395" y="280" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>TDE</text>
      <text x="395" y="295" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>AES-256</text>

      <rect x="460" y="245" width="90" height="60" fill="url(#encrypted-pattern)" 
            stroke={c.rest} strokeWidth="2" rx="8" ry="8" />
      <text x="505" y="265" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>📁 File System</text>
      <text x="505" y="280" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>BitLocker/LUKS</text>
      <text x="505" y="295" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Full Disk</text>

      <rect x="350" y="320" width="90" height="60" fill="url(#encrypted-pattern)" 
            stroke={c.rest} strokeWidth="2" rx="8" ry="8" />
      <text x="395" y="340" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>☁️ Object Storage</text>
      <text x="395" y="355" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>S3/Blob</text>
      <text x="395" y="370" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Server-side</text>

      <rect x="460" y="320" width="90" height="60" fill="url(#encrypted-pattern)" 
            stroke={c.rest} strokeWidth="2" rx="8" ry="8" />
      <text x="505" y="340" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>⚙️ Application</text>
      <text x="505" y="355" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Field Level</text>
      <text x="505" y="370" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Column Encrypt</text>

      <rect x="405" y="395" width="90" height="35" fill={c.alt} stroke={c.border} rx="6" ry="6" opacity="0.9" />
      <text x="450" y="415" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>🔑 Key Hierarchy</text>
      <text x="450" y="425" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Master → Data Keys</text>

      {/* Encryption in Use */}
      <rect x="600" y="200" width="240" height="180" fill={c.use} fillOpacity="0.15" 
            stroke={c.use} strokeWidth="2" rx="12" ry="12" />
      <text x="720" y="225" textAnchor="middle" fill={c.text} style={{ font }}>🧠 Encryption in Use</text>
      
      <rect x="620" y="245" width="200" height="40" fill={c.use} stroke={c.border} rx="8" ry="8" />
      <text x="720" y="265" textAnchor="middle" fill="white" style={{ font: fontSub }}>🔢 Homomorphic Encryption</text>
      <text x="720" y="280" textAnchor="middle" fill="white" style={{ font: fontSub }}>Compute on Encrypted Data</text>

      <rect x="620" y="300" width="200" height="40" fill={c.use} stroke={c.border} rx="8" ry="8" />
      <text x="720" y="320" textAnchor="middle" fill="white" style={{ font: fontSub }}>🏰 Secure Enclaves (TEE)</text>
      <text x="720" y="335" textAnchor="middle" fill="white" style={{ font: fontSub }}>Intel SGX, ARM TrustZone</text>

      <rect x="615" y="350" width="210" height="20" fill={c.alt} stroke={c.border} rx="4" ry="4" opacity="0.9" />
      <text x="720" y="362" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Zero-knowledge proofs • Confidential computing</text>

      {/* Key Distribution Arrows */}
      <line x1="180" y1="170" x2="180" y2="200" stroke={c.kms} strokeWidth={2.5} strokeDasharray="5,5" markerEnd="url(#arrow-enc)" />
      <line x1="450" y1="170" x2="450" y2="200" stroke={c.kms} strokeWidth={2.5} strokeDasharray="5,5" markerEnd="url(#arrow-enc)" />
      <line x1="720" y1="170" x2="720" y2="200" stroke={c.kms} strokeWidth={2.5} strokeDasharray="5,5" markerEnd="url(#arrow-enc)" />

      {/* Compliance Frameworks */}
      <rect x="50" y="460" width="800" height="100" fill={c.alt} fillOpacity="0.3" 
            stroke={c.compliance} strokeWidth="2" rx="12" ry="12" />
      <text x="450" y="485" textAnchor="middle" fill={c.text} style={{ font }}>📋 Regulatory Compliance Frameworks</text>
      
      <rect x="80" y="500" width="90" height="35" fill="#e74c3c" stroke={c.border} rx="6" ry="6" />
      <text x="125" y="520" textAnchor="middle" fill="white" style={{ font: fontSub }}>🇪🇺 GDPR</text>
      <text x="125" y="530" textAnchor="middle" fill="white" style={{ font: fontSub }}>Data Protection</text>

      <rect x="190" y="500" width="90" height="35" fill="#3498db" stroke={c.border} rx="6" ry="6" />
      <text x="235" y="520" textAnchor="middle" fill="white" style={{ font: fontSub }}>🏥 HIPAA</text>
      <text x="235" y="530" textAnchor="middle" fill="white" style={{ font: fontSub }}>Healthcare</text>

      <rect x="300" y="500" width="90" height="35" fill="#f39c12" stroke={c.border} rx="6" ry="6" />
      <text x="345" y="520" textAnchor="middle" fill="white" style={{ font: fontSub }}>💳 PCI-DSS</text>
      <text x="345" y="530" textAnchor="middle" fill="white" style={{ font: fontSub }}>Payment Cards</text>

      <rect x="410" y="500" width="90" height="35" fill="#9b59b6" stroke={c.border} rx="6" ry="6" />
      <text x="455" y="520" textAnchor="middle" fill="white" style={{ font: fontSub }}>🔒 SOC 2</text>
      <text x="455" y="530" textAnchor="middle" fill="white" style={{ font: fontSub }}>Security Controls</text>

      <rect x="520" y="500" width="90" height="35" fill="#27ae60" stroke={c.border} rx="6" ry="6" />
      <text x="565" y="520" textAnchor="middle" fill="white" style={{ font: fontSub }}>🏛️ FedRAMP</text>
      <text x="565" y="530" textAnchor="middle" fill="white" style={{ font: fontSub }}>Government</text>

      <rect x="630" y="500" width="90" height="35" fill="#e67e22" stroke={c.border} rx="6" ry="6" />
      <text x="675" y="520" textAnchor="middle" fill="white" style={{ font: fontSub }}>🌍 ISO 27001</text>
      <text x="675" y="530" textAnchor="middle" fill="white" style={{ font: fontSub }}>Info Security</text>

      <rect x="740" y="500" width="90" height="35" fill="#34495e" stroke={c.border} rx="6" ry="6" />
      <text x="785" y="520" textAnchor="middle" fill="white" style={{ font: fontSub }}>🌐 NIST</text>
      <text x="785" y="530" textAnchor="middle" fill="white" style={{ font: fontSub }}>Cybersecurity</text>

      {/* Encryption Standards */}
      <rect x="50" y="580" width="800" height="100" fill={c.alt} stroke={c.border} rx="10" ry="10" opacity="0.9" />
      <text x="450" y="605" textAnchor="middle" fill={c.text} style={{ font }}>🔐 Encryption Standards & Algorithms</text>
      
      <text x="450" y="630" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Symmetric: AES-256, ChaCha20-Poly1305 • Asymmetric: RSA-4096, ECDSA-P384, Ed25519</text>
      <text x="450" y="645" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Hashing: SHA-256, SHA-3, BLAKE2 • Key Derivation: PBKDF2, Argon2, scrypt</text>
      <text x="450" y="660" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Digital Signatures: ECDSA, RSA-PSS • Key Exchange: ECDH, X25519</text>

      {/* Benefits summary */}
      <text x="450" y="690" textAnchor="middle" fill={c.text} style={{ font }}>Benefits: Data confidentiality • Integrity protection • Compliance assurance • Trust establishment</text>
    </svg>
  );
}