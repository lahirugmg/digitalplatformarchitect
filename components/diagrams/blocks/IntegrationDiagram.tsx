import { DiagramBase, diagramStyles, diagramFonts, commonStyles } from '../DiagramBase';

export function IntegrationDiagram() {
  return (
    <DiagramBase
      viewBox="0 0 360 220"
      title="Enterprise Integration Platform"
      description="Comprehensive integration hub connecting legacy systems, SaaS applications, databases, and modern APIs with multiple protocols and patterns"
      width={360}
      height={220}
    >
      <style>{commonStyles}</style>

      {/* Background grid */}
      <rect width="360" height="220" fill="url(#grid-light)" />

      {/* Title */}
      <rect x="105" y="10" width="150" height="25" fill="url(#primary-gradient)" rx="12" />
      <text x="180" y="26" className="diagram-text" fill="white" style={{ font: diagramFonts.heading }}>🔗 Integration Hub</text>

      {/* Legacy Systems */}
      <text x="30" y="60" className="diagram-text-secondary">Legacy</text>
      
      <rect x="15" y="70" width="50" height="18" className="diagram-node" />
      <text x="40" y="81" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🏢 ERP</text>

      <rect x="15" y="95" width="50" height="18" className="diagram-node" />
      <text x="40" y="106" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🗄️ Mainframe</text>

      <rect x="15" y="120" width="50" height="18" className="diagram-node" />
      <text x="40" y="131" className="diagram-text-label" style={{ font: diagramFonts.caption }}>💾 Database</text>

      <rect x="15" y="145" width="50" height="18" className="diagram-node" />
      <text x="40" y="156" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📁 File System</text>

      {/* Integration Hub Core */}
      <rect x="120" y="95" width="120" height="50" className="diagram-node diagram-node-primary" filter="url(#drop-shadow)" />
      <text x="180" y="115" className="diagram-text-heading">🔗 Integration Hub</text>
      <text x="180" y="132" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>ESB • Message Router • Transformer</text>

      {/* Integration Patterns */}
      <rect x="130" y="55" width="25" height="15" className="diagram-node diagram-node-secondary" />
      <text x="142" y="65" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>ETL</text>

      <rect x="160" y="55" width="25" height="15" className="diagram-node diagram-node-secondary" />
      <text x="172" y="65" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>CDC</text>

      <rect x="190" y="55" width="25" height="15" className="diagram-node diagram-node-secondary" />
      <text x="202" y="65" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Batch</text>

      <rect x="220" y="55" width="25" height="15" className="diagram-node diagram-node-secondary" />
      <text x="232" y="65" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>RT</text>

      {/* Protocol Adapters */}
      <rect x="130" y="160" width="25" height="15" className="diagram-node diagram-node-accent" />
      <text x="142" y="170" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>REST</text>

      <rect x="160" y="160" width="25" height="15" className="diagram-node diagram-node-accent" />
      <text x="172" y="170" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>SOAP</text>

      <rect x="190" y="160" width="25" height="15" className="diagram-node diagram-node-accent" />
      <text x="202" y="170" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>EDI</text>

      <rect x="220" y="160" width="25" height="15" className="diagram-node diagram-node-accent" />
      <text x="232" y="170" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>SFTP</text>

      {/* Modern Systems */}
      <text x="305" y="60" className="diagram-text-secondary">Modern</text>
      
      <rect x="280" y="70" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="305" y="81" className="diagram-text-label" style={{ font: diagramFonts.caption }}>☁️ SaaS</text>

      <rect x="280" y="95" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="305" y="106" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🌐 APIs</text>

      <rect x="280" y="120" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="305" y="131" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📊 Analytics</text>

      <rect x="280" y="145" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="305" y="156" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🤖 AI/ML</text>

      {/* Data Flow - Legacy to Hub */}
      <path d="M 65 79 Q 90 85 120 105" className="diagram-edge" />
      <path d="M 65 104 Q 90 110 120 115" className="diagram-edge" />
      <path d="M 65 129 Q 90 125 120 125" className="diagram-edge" />
      <path d="M 65 154 Q 90 145 120 135" className="diagram-edge" />

      {/* Pattern Integration */}
      <line x1="142" y1="70" x2="142" y2="95" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />
      <line x1="172" y1="70" x2="172" y2="95" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />
      <line x1="202" y1="70" x2="202" y2="95" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />
      <line x1="232" y1="70" x2="232" y2="95" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />

      {/* Protocol Integration */}
      <line x1="142" y1="145" x2="142" y2="160" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />
      <line x1="172" y1="145" x2="172" y2="160" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />
      <line x1="202" y1="145" x2="202" y2="160" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />
      <line x1="232" y1="145" x2="232" y2="160" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />

      {/* Hub to Modern Systems */}
      <path d="M 240 105 Q 260 85 280 79" className="diagram-edge diagram-edge-primary" />
      <path d="M 240 115 Q 260 102 280 104" className="diagram-edge diagram-edge-primary" />
      <path d="M 240 125 Q 260 118 280 129" className="diagram-edge diagram-edge-primary" />
      <path d="M 240 135 Q 260 145 280 154" className="diagram-edge diagram-edge-primary" />

      {/* Key Features */}
      <rect x="50" y="195" width="260" height="20" fill={diagramStyles.surface} stroke={diagramStyles.border} rx="10" opacity="0.9" />
      <text x="180" y="207" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>
        🔄 ETL/ELT • 📡 Real-time • 🔀 Message Routing • 🔄 Protocol Translation • 📊 Monitoring
      </text>
    </DiagramBase>
  );
}
