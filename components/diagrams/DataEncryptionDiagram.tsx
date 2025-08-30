export function DataEncryptionDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-muted)" />
        </marker>
        <pattern id="encrypted" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill="var(--accent)" fillOpacity="0.1"/>
          <path d="M0,8 L8,0" stroke="var(--accent)" strokeWidth="1" opacity="0.3"/>
        </pattern>
      </defs>
      
      {/* Background */}
      <rect width="800" height="600" fill="var(--surface)"/>
      
      {/* Title */}
      <text x="400" y="30" textAnchor="middle" className="text-lg font-bold" fill="var(--text)">
        Data Encryption Patterns - At Rest, In Transit, In Use
      </text>
      
      {/* Key Management Section */}
      <rect x="50" y="60" width="700" height="80" fill="var(--secondary)" fillOpacity="0.1" 
            stroke="var(--secondary)" strokeWidth="2" rx="8"/>
      <text x="400" y="85" textAnchor="middle" fill="var(--secondary)" className="font-bold text-lg">
        Key Management System (KMS)
      </text>
      
      <rect x="80" y="105" width="120" height="25" fill="var(--secondary)" rx="4"/>
      <text x="140" y="122" textAnchor="middle" fill="white" className="text-xs font-medium">
        Hardware Security Module
      </text>
      
      <rect x="220" y="105" width="100" height="25" fill="var(--secondary)" rx="4"/>
      <text x="270" y="122" textAnchor="middle" fill="white" className="text-xs font-medium">
        Key Rotation
      </text>
      
      <rect x="340" y="105" width="120" height="25" fill="var(--secondary)" rx="4"/>
      <text x="400" y="122" textAnchor="middle" fill="white" className="text-xs font-medium">
        Envelope Encryption
      </text>
      
      <rect x="480" y="105" width="100" height="25" fill="var(--secondary)" rx="4"/>
      <text x="530" y="122" textAnchor="middle" fill="white" className="text-xs font-medium">
        Key Escrow
      </text>
      
      <rect x="600" y="105" width="120" height="25" fill="var(--secondary)" rx="4"/>
      <text x="660" y="122" textAnchor="middle" fill="white" className="text-xs font-medium">
        Access Control
      </text>
      
      {/* Encryption in Transit */}
      <rect x="50" y="170" width="200" height="140" fill="var(--accent)" fillOpacity="0.1" 
            stroke="var(--accent)" strokeWidth="2" rx="8"/>
      <text x="150" y="195" textAnchor="middle" fill="var(--accent)" className="font-bold">
        Encryption in Transit
      </text>
      
      <rect x="70" y="210" width="60" height="40" fill="var(--accent)" rx="4"/>
      <text x="100" y="225" textAnchor="middle" fill="white" className="text-xs">Client</text>
      <text x="100" y="240" textAnchor="middle" fill="white" className="text-xs">App</text>
      
      <rect x="160" y="210" width="60" height="40" fill="var(--accent)" rx="4"/>
      <text x="190" y="225" textAnchor="middle" fill="white" className="text-xs">API</text>
      <text x="190" y="240" textAnchor="middle" fill="white" className="text-xs">Server</text>
      
      <line x1="130" y1="230" x2="155" y2="230" stroke="var(--accent)" strokeWidth="3"/>
      <text x="142" y="222" textAnchor="middle" className="text-xs font-bold" fill="var(--accent)">TLS</text>
      
      <text x="75" y="270" className="text-xs" fill="var(--text)">• HTTPS/TLS 1.3</text>
      <text x="75" y="285" className="text-xs" fill="var(--text)">• Message Encryption</text>
      <text x="75" y="300" className="text-xs" fill="var(--text)">• Certificate Pinning</text>
      
      {/* Encryption at Rest */}
      <rect x="300" y="170" width="200" height="180" fill="var(--primary)" fillOpacity="0.1" 
            stroke="var(--primary)" strokeWidth="2" rx="8"/>
      <text x="400" y="195" textAnchor="middle" fill="var(--primary)" className="font-bold">
        Encryption at Rest
      </text>
      
      <rect x="320" y="210" width="70" height="50" fill="url(#encrypted)" 
            stroke="var(--primary)" strokeWidth="2" rx="4"/>
      <text x="355" y="230" textAnchor="middle" fill="var(--primary)" className="text-xs font-bold">Database</text>
      <text x="355" y="245" textAnchor="middle" fill="var(--primary)" className="text-xs">TDE</text>
      
      <rect x="410" y="210" width="70" height="50" fill="url(#encrypted)" 
            stroke="var(--primary)" strokeWidth="2" rx="4"/>
      <text x="445" y="230" textAnchor="middle" fill="var(--primary)" className="text-xs font-bold">File</text>
      <text x="445" y="245" textAnchor="middle" fill="var(--primary)" className="text-xs">System</text>
      
      <rect x="320" y="280" width="70" height="50" fill="url(#encrypted)" 
            stroke="var(--primary)" strokeWidth="2" rx="4"/>
      <text x="355" y="300" textAnchor="middle" fill="var(--primary)" className="text-xs font-bold">Object</text>
      <text x="355" y="315" textAnchor="middle" fill="var(--primary)" className="text-xs">Storage</text>
      
      <rect x="410" y="280" width="70" height="50" fill="url(#encrypted)" 
            stroke="var(--primary)" strokeWidth="2" rx="4"/>
      <text x="445" y="295" textAnchor="middle" fill="var(--primary)" className="text-xs font-bold">Application</text>
      <text x="445" y="310" textAnchor="middle" fill="var(--primary)" className="text-xs">Field Level</text>
      <text x="445" y="325" textAnchor="middle" fill="var(--primary)" className="text-xs">AES-256</text>
      
      {/* Encryption in Use */}
      <rect x="550" y="170" width="200" height="140" fill="#4ecdc4" fillOpacity="0.1" 
            stroke="#4ecdc4" strokeWidth="2" rx="8"/>
      <text x="650" y="195" textAnchor="middle" fill="#4ecdc4" className="font-bold">
        Encryption in Use
      </text>
      
      <rect x="570" y="210" width="160" height="30" fill="#4ecdc4" rx="4"/>
      <text x="650" y="230" textAnchor="middle" fill="white" className="text-xs font-bold">
        Homomorphic Encryption
      </text>
      
      <rect x="570" y="250" width="160" height="30" fill="#4ecdc4" rx="4"/>
      <text x="650" y="270" textAnchor="middle" fill="white" className="text-xs font-bold">
        Secure Enclaves (TEE)
      </text>
      
      <text x="575" y="295" className="text-xs" fill="var(--text)">• Process encrypted data</text>
      <text x="575" y="308" className="text-xs" fill="var(--text)">• Zero-knowledge proofs</text>
      
      {/* Key Distribution Arrows */}
      <line x1="150" y1="140" x2="150" y2="165" stroke="var(--secondary)" 
            strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
      <line x1="400" y1="140" x2="400" y2="165" stroke="var(--secondary)" 
            strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
      <line x1="650" y1="140" x2="650" y2="165" stroke="var(--secondary)" 
            strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
      
      {/* Compliance Framework */}
      <rect x="50" y="380" width="700" height="80" fill="var(--surface-alt)" 
            stroke="var(--text-muted)" strokeWidth="1" rx="8"/>
      <text x="400" y="405" textAnchor="middle" fill="var(--text)" className="font-bold">
        Regulatory Compliance Frameworks
      </text>
      
      <rect x="80" y="420" width="80" height="25" fill="#e74c3c" rx="4"/>
      <text x="120" y="437" textAnchor="middle" fill="white" className="text-xs font-bold">GDPR</text>
      
      <rect x="180" y="420" width="80" height="25" fill="#3498db" rx="4"/>
      <text x="220" y="437" textAnchor="middle" fill="white" className="text-xs font-bold">HIPAA</text>
      
      <rect x="280" y="420" width="80" height="25" fill="#f39c12" rx="4"/>
      <text x="320" y="437" textAnchor="middle" fill="white" className="text-xs font-bold">PCI-DSS</text>
      
      <rect x="380" y="420" width="80" height="25" fill="#9b59b6" rx="4"/>
      <text x="420" y="437" textAnchor="middle" fill="white" className="text-xs font-bold">SOC 2</text>
      
      <rect x="480" y="420" width="80" height="25" fill="#27ae60" rx="4"/>
      <text x="520" y="437" textAnchor="middle" fill="white" className="text-xs font-bold">FedRAMP</text>
      
      <rect x="580" y="420" width="80" height="25" fill="#e67e22" rx="4"/>
      <text x="620" y="437" textAnchor="middle" fill="white" className="text-xs font-bold">ISO 27001</text>
      
      {/* Encryption Algorithms */}
      <rect x="50" y="480" width="700" height="60" fill="var(--surface-alt)" 
            stroke="var(--accent)" strokeWidth="1" rx="6"/>
      <text x="60" y="500" className="text-sm font-bold" fill="var(--accent)">Encryption Standards:</text>
      <text x="60" y="515" className="text-xs" fill="var(--text)">
        • AES-256 (Symmetric) • RSA-4096 (Asymmetric) • ChaCha20-Poly1305 (AEAD)
      </text>
      <text x="60" y="530" className="text-xs" fill="var(--text)">
        • SHA-256/SHA-3 (Hashing) • PBKDF2/Argon2 (Key Derivation) • ECDH/ECDSA (ECC)
      </text>
      
      {/* Data Flow Indicators */}
      <text x="275" y="240" className="text-xs font-bold" fill="var(--accent)">🔒 Encrypted</text>
      <text x="520" y="240" className="text-xs font-bold" fill="var(--primary)">🔐 Stored</text>
      
    </svg>
  );
}