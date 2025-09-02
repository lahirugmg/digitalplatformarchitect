import { DiagramBase, diagramStyles, diagramFonts, commonStyles } from '../DiagramBase';

export function IAMDiagram() {
  return (
    <DiagramBase
      viewBox="0 0 350 220"
      title="Identity & Access Management"
      description="Comprehensive IAM platform with multi-protocol authentication, authorization, federation, and secure access control"
      width={350}
      height={220}
    >
      <style>{commonStyles}</style>

      {/* Background grid */}
      <rect width="350" height="220" fill="url(#grid-light)" />

      {/* Title */}
      <rect x="100" y="10" width="150" height="25" fill="url(#primary-gradient)" rx="12" />
      <text x="175" y="26" className="diagram-text" fill="white" style={{ font: diagramFonts.heading }}>🔐 Identity & Access</text>

      {/* Identity Sources */}
      <text x="30" y="55" className="diagram-text-secondary">Identity Sources</text>
      
      <rect x="15" y="65" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="77" className="diagram-text-label" style={{ font: diagramFonts.caption }}>👥 Users</text>

      <rect x="15" y="90" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="102" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📱 Apps</text>

      <rect x="15" y="115" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="127" className="diagram-text-label" style={{ font: diagramFonts.caption }}>⚙️ Services</text>

      <rect x="15" y="140" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="152" className="diagram-text-label" style={{ font: diagramFonts.caption }}>💻 Devices</text>

      {/* IAM Core Platform */}
      <rect x="85" y="85" width="90" height="60" className="diagram-node diagram-node-primary" filter="url(#drop-shadow)" />
      <text x="130" y="105" className="diagram-text-heading">🔐 IAM Platform</text>
      <text x="130" y="122" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>Authentication • Authorization</text>

      {/* IAM Services */}
      <rect x="95" y="50" width="25" height="15" className="diagram-node diagram-node-secondary" />
      <text x="107" y="60" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>AuthN</text>

      <rect x="125" y="50" width="25" height="15" className="diagram-node diagram-node-secondary" />
      <text x="137" y="60" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>AuthZ</text>

      <rect x="155" y="50" width="25" height="15" className="diagram-node diagram-node-secondary" />
      <text x="167" y="60" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Fed</text>

      <rect x="95" y="160" width="25" height="15" className="diagram-node diagram-node-accent" />
      <text x="107" y="170" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>MFA</text>

      <rect x="125" y="160" width="25" height="15" className="diagram-node diagram-node-accent" />
      <text x="137" y="170" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>RBAC</text>

      <rect x="155" y="160" width="25" height="15" className="diagram-node diagram-node-accent" />
      <text x="167" y="170" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Audit</text>

      {/* External Identity Providers */}
      <rect x="200" y="60" width="40" height="18" className="diagram-node" />
      <text x="220" y="71" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>🔗 LDAP</text>

      <rect x="200" y="85" width="40" height="18" className="diagram-node" />
      <text x="220" y="96" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>☁️ Azure AD</text>

      <rect x="200" y="110" width="40" height="18" className="diagram-node" />
      <text x="220" y="121" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>📱 Social</text>

      {/* Protected Resources */}
      <text x="290" y="55" className="diagram-text-secondary">Protected</text>
      
      <rect x="270" y="70" width="45" height="18" className="diagram-node diagram-node-success" />
      <text x="292" y="81" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🌐 APIs</text>

      <rect x="270" y="95" width="45" height="18" className="diagram-node diagram-node-success" />
      <text x="292" y="106" className="diagram-text-label" style={{ font: diagramFonts.caption }}>💾 Data</text>

      <rect x="270" y="120" width="45" height="18" className="diagram-node diagram-node-success" />
      <text x="292" y="131" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🏢 Apps</text>

      <rect x="270" y="145" width="45" height="18" className="diagram-node diagram-node-success" />
      <text x="292" y="156" className="diagram-text-label" style={{ font: diagramFonts.caption }}>☁️ Cloud</text>

      {/* Identity Flows */}
      <path d="M 60 75 Q 72 80 85 95" className="diagram-edge" />
      <path d="M 60 100 Q 72 105 85 115" className="diagram-edge" />
      <path d="M 60 125 Q 72 125 85 125" className="diagram-edge" />
      <path d="M 60 150 Q 72 145 85 135" className="diagram-edge" />

      {/* Service Integration */}
      <line x1="107" y1="65" x2="107" y2="85" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />
      <line x1="137" y1="65" x2="137" y2="85" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />
      <line x1="167" y1="65" x2="167" y2="85" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />

      <line x1="107" y1="145" x2="107" y2="160" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />
      <line x1="137" y1="145" x2="137" y2="160" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />
      <line x1="167" y1="145" x2="167" y2="160" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />

      {/* External Provider Integration */}
      <path d="M 175 95 Q 185 85 200 69" className="diagram-edge diagram-edge-dashed" />
      <path d="M 175 105 Q 185 95 200 94" className="diagram-edge diagram-edge-dashed" />
      <path d="M 175 125 Q 185 115 200 119" className="diagram-edge diagram-edge-dashed" />

      {/* Secure Access */}
      <path d="M 175 95 Q 225 85 270 79" className="diagram-edge diagram-edge-primary" />
      <path d="M 175 105 Q 225 102 270 104" className="diagram-edge diagram-edge-primary" />
      <path d="M 175 115 Q 225 118 270 129" className="diagram-edge diagram-edge-primary" />
      <path d="M 175 125 Q 225 135 270 154" className="diagram-edge diagram-edge-primary" />

      {/* Key Features */}
      <rect x="50" y="190" width="250" height="20" fill={diagramStyles.surface} stroke={diagramStyles.border} rx="10" opacity="0.9" />
      <text x="175" y="202" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>
        🔐 OIDC • 🎫 SAML • 🔑 JWT • 🛡️ mTLS • 🔄 SSO • 📱 MFA • 🎯 RBAC
      </text>
    </DiagramBase>
  );
}
