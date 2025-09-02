import { DiagramBase, diagramStyles, diagramFonts, commonStyles } from '../DiagramBase';

export function IDPDiagram() {
  return (
    <DiagramBase
      viewBox="0 0 360 220"
      title="Internal Developer Platform"
      description="Comprehensive IDP with self-service capabilities, golden paths, platform services, and developer experience optimization"
      width={360}
      height={220}
    >
      <style>{commonStyles}</style>

      {/* Background grid */}
      <rect width="360" height="220" fill="url(#grid-light)" />

      {/* Title */}
      <rect x="80" y="10" width="200" height="25" fill="url(#primary-gradient)" rx="12" />
      <text x="180" y="26" className="diagram-text" fill="white" style={{ font: diagramFonts.heading }}>🚀 Internal Developer Platform</text>

      {/* Developer Teams */}
      <text x="30" y="60" className="diagram-text-secondary">Developers</text>
      
      <rect x="15" y="70" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="82" className="diagram-text-label" style={{ font: diagramFonts.caption }}>👥 Frontend</text>

      <rect x="15" y="95" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="107" className="diagram-text-label" style={{ font: diagramFonts.caption }}>⚙️ Backend</text>

      <rect x="15" y="120" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="132" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📊 Data</text>

      <rect x="15" y="145" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="157" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🔧 DevOps</text>

      {/* IDP Portal Core */}
      <rect x="85" y="100" width="100" height="50" className="diagram-node diagram-node-primary" filter="url(#drop-shadow)" />
      <text x="135" y="120" className="diagram-text-heading">🌐 Developer Portal</text>
      <text x="135" y="137" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>Self-Service • Backstage</text>

      {/* Golden Paths & Standards */}
      <rect x="95" y="55" width="30" height="15" className="diagram-node diagram-node-warning" />
      <text x="110" y="65" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🌟 Golden</text>

      <rect x="130" y="55" width="30" height="15" className="diagram-node diagram-node-warning" />
      <text x="145" y="65" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📜 Templates</text>

      <rect x="165" y="55" width="30" height="15" className="diagram-node diagram-node-warning" />
      <text x="180" y="65" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📋 Catalog</text>

      {/* Platform Services */}
      <text x="255" y="60" className="diagram-text-secondary">Platform Services</text>
      
      <rect x="215" y="75" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="240" y="86" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🔄 CI/CD</text>

      <rect x="215" y="100" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="240" y="111" className="diagram-text-label" style={{ font: diagramFonts.caption }}>☸️ Kubernetes</text>

      <rect x="215" y="125" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="240" y="136" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📊 Observability</text>

      <rect x="215" y="150" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="240" y="161" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🔒 Security</text>

      {/* Quality & Governance */}
      <rect x="280" y="95" width="40" height="50" className="diagram-node diagram-node-accent" />
      <text x="300" y="110" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🎯</text>
      <text x="300" y="123" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Quality</text>
      <text x="300" y="136" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Gates</text>

      {/* Infrastructure Services */}
      <rect x="330" y="100" width="25" height="40" className="diagram-node diagram-node-secondary" />
      <text x="342" y="115" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>☁️</text>
      <text x="342" y="128" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Infra</text>

      {/* Developer Flows */}
      <path d="M 60 80 Q 72 90 85 110" className="diagram-edge" />
      <path d="M 60 105 Q 72 115 85 125" className="diagram-edge" />
      <path d="M 60 130 Q 72 130 85 130" className="diagram-edge" />
      <path d="M 60 155 Q 72 145 85 140" className="diagram-edge" />

      {/* Golden Path Integration */}
      <line x1="110" y1="70" x2="110" y2="100" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />
      <line x1="145" y1="70" x2="145" y2="100" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />
      <line x1="180" y1="70" x2="180" y2="100" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />

      {/* Portal to Services */}
      <path d="M 185 110 Q 200 90 215 84" className="diagram-edge diagram-edge-primary" />
      <path d="M 185 120 Q 200 110 215 109" className="diagram-edge diagram-edge-primary" />
      <path d="M 185 130 Q 200 128 215 134" className="diagram-edge diagram-edge-primary" />
      <path d="M 185 140 Q 200 145 215 159" className="diagram-edge diagram-edge-primary" />

      {/* Quality Integration */}
      <line x1="265" y1="120" x2="280" y2="120" className="diagram-edge diagram-edge-accent" />
      <line x1="320" y1="120" x2="330" y2="120" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />

      {/* Key Features */}
      <rect x="40" y="185" width="280" height="20" fill={diagramStyles.surface} stroke={diagramStyles.border} rx="10" opacity="0.9" />
      <text x="180" y="197" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>🌟 Golden Paths • 📊 Scorecards • 🔍 Service Catalog • 📜 Templates • 🎯 Governance</text>

      {/* Additional Features */}
      <rect x="40" y="200" width="280" height="15" fill={diagramStyles.surface} stroke={diagramStyles.border} rx="8" opacity="0.8" />
      <text x="180" y="210" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🚀 One-Click Deploy • 🔄 Auto-Scaling • 🔍 Discovery • 📊 Metrics • 📝 Documentation</text>
    </DiagramBase>
  );
}
