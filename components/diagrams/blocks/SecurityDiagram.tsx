import { DiagramBase, diagramStyles, diagramFonts, commonStyles } from '../DiagramBase';

export function SecurityDiagram() {
  return (
    <DiagramBase
      viewBox="0 0 360 240"
      title="Zero Trust Security Architecture"
      description="Comprehensive security platform with zero trust principles, identity management, secrets management, and comprehensive threat protection"
      width={360}
      height={240}
    >
      <style>{commonStyles}</style>

      {/* Background grid */}
      <rect width="360" height="240" fill="url(#grid-light)" />

      {/* Title */}
      <rect x="105" y="10" width="150" height="25" fill="url(#primary-gradient)" rx="12" />
      <text x="180" y="26" className="diagram-text" fill="white" style={{ font: diagramFonts.heading }}>🛡️ Zero Trust Security</text>

      {/* Identity Layer */}
      <text x="30" y="60" className="diagram-text-secondary">Identity</text>
      
      <rect x="15" y="70" width="45" height="20" className="diagram-node" />
      <text x="37" y="82" className="diagram-text-label" style={{ font: diagramFonts.caption }}>👥 Users</text>

      <rect x="15" y="95" width="45" height="20" className="diagram-node" />
      <text x="37" y="107" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🤖 Services</text>

      <rect x="15" y="120" width="45" height="20" className="diagram-node" />
      <text x="37" y="132" className="diagram-text-label" style={{ font: diagramFonts.caption }}>💻 Devices</text>

      <rect x="15" y="145" width="45" height="20" className="diagram-node" />
      <text x="37" y="157" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🌐 External</text>

      {/* Security Control Plane */}
      <rect x="90" y="85" width="100" height="70" className="diagram-node diagram-node-primary" filter="url(#drop-shadow)" />
      <text x="140" y="108" className="diagram-text-heading">🔒 Security Control Plane</text>
      <text x="140" y="125" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>Policy Decision Point</text>

      {/* Security Services */}
      <rect x="80" y="50" width="30" height="18" className="diagram-node diagram-node-warning" />
      <text x="95" y="62" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🔐 Vault</text>

      <rect x="120" y="50" width="30" height="18" className="diagram-node diagram-node-warning" />
      <text x="135" y="62" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🔑 KMS</text>

      <rect x="160" y="50" width="30" height="18" className="diagram-node diagram-node-warning" />
      <text x="175" y="62" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📋 Policy</text>

      <rect x="80" y="170" width="30" height="18" className="diagram-node diagram-node-accent" />
      <text x="95" y="182" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🔍 SIEM</text>

      <rect x="120" y="170" width="30" height="18" className="diagram-node diagram-node-accent" />
      <text x="135" y="182" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🛡️ WAF</text>

      <rect x="160" y="170" width="30" height="18" className="diagram-node diagram-node-accent" />
      <text x="175" y="182" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🔐 DLP</text>

      {/* Protected Assets */}
      <text x="265" y="60" className="diagram-text-secondary">Protected Assets</text>
      
      <rect x="230" y="75" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="255" y="86" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🌐 APIs</text>

      <rect x="230" y="100" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="255" y="111" className="diagram-text-label" style={{ font: diagramFonts.caption }}>⚙️ Services</text>

      <rect x="230" y="125" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="255" y="136" className="diagram-text-label" style={{ font: diagramFonts.caption }}>💾 Data</text>

      <rect x="230" y="150" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="255" y="161" className="diagram-text-label" style={{ font: diagramFonts.caption }}>☁️ Cloud</text>

      {/* Monitoring & Compliance */}
      <rect x="300" y="85" width="40" height="70" className="diagram-node diagram-node-secondary" />
      <text x="320" y="105" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📊</text>
      <text x="320" y="118" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>SOC</text>
      <text x="320" y="131" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📋</text>
      <text x="320" y="144" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Audit</text>

      {/* Security Flows - Identity to Control Plane */}
      <path d="M 60 80 Q 75 85 90 105" className="diagram-edge" />
      <path d="M 60 105 Q 75 110 90 120" className="diagram-edge" />
      <path d="M 60 130 Q 75 125 90 135" className="diagram-edge" />
      <path d="M 60 155 Q 75 145 90 145" className="diagram-edge" />

      {/* Security Service Integration */}
      <line x1="95" y1="68" x2="95" y2="85" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />
      <line x1="135" y1="68" x2="135" y2="85" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />
      <line x1="175" y1="68" x2="175" y2="85" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />

      <line x1="95" y1="155" x2="95" y2="170" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />
      <line x1="135" y1="155" x2="135" y2="170" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />
      <line x1="175" y1="155" x2="175" y2="170" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />

      {/* Control Plane to Assets */}
      <path d="M 190 95 Q 210 85 230 84" className="diagram-edge diagram-edge-primary" />
      <path d="M 190 110 Q 210 105 230 109" className="diagram-edge diagram-edge-primary" />
      <path d="M 190 125 Q 210 130 230 134" className="diagram-edge diagram-edge-primary" />
      <path d="M 190 140 Q 210 150 230 159" className="diagram-edge diagram-edge-primary" />

      {/* Monitoring Integration */}
      <line x1="280" y1="120" x2="300" y2="120" className="diagram-edge diagram-edge-accent" />
      <line x1="190" y1="120" x2="300" y2="120" className="diagram-edge diagram-edge-accent diagram-edge-dotted" />

      {/* Zero Trust Perimeter */}
      <path d="M 75 45 Q 140 35 205 45 Q 285 55 315 85 Q 325 120 315 155 Q 285 185 205 195 Q 140 205 75 195 Q 45 185 35 155 Q 25 120 35 85 Q 45 55 75 45" 
            fill="none" stroke={diagramStyles.primary} strokeWidth="2" strokeDasharray="8,4" opacity="0.6" />
      
      <text x="180" y="210" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🔐 Zero Trust Boundary</text>

      {/* Key Features */}
      <rect x="50" y="215" width="260" height="20" fill={diagramStyles.surface} stroke={diagramStyles.border} rx="10" opacity="0.9" />
      <text x="180" y="227" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>
        🔐 mTLS • 🎯 RBAC • 📊 Continuous Monitoring • 🛡️ Threat Detection • ✅ Compliance
      </text>
    </DiagramBase>
  );
}
