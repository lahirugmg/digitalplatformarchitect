import { DiagramBase, diagramStyles, diagramFonts, commonStyles } from '../DiagramBase';

export function CollaborationDiagram() {
  return (
    <DiagramBase
      viewBox="0 0 350 200"
      title="Collaboration & Knowledge Platform"
      description="Comprehensive collaboration platform with knowledge management, workflow automation, and team coordination"
      width={350}
      height={200}
    >
      <style>{commonStyles}</style>

      {/* Background grid */}
      <rect width="350" height="200" fill="url(#grid-light)" />

      {/* Title */}
      <rect x="85" y="10" width="180" height="25" fill="url(#primary-gradient)" rx="12" />
      <text x="175" y="26" className="diagram-text" fill="white" style={{ font: diagramFonts.heading }}>🤝 Collaboration Platform</text>

      {/* Stakeholders */}
      <text x="30" y="55" className="diagram-text-secondary">Stakeholders</text>
      
      <rect x="15" y="65" width="45" height="18" className="diagram-node diagram-node-warning" />
      <text x="37" y="76" className="diagram-text-label" style={{ font: diagramFonts.caption }}>👥 Teams</text>

      <rect x="15" y="90" width="45" height="18" className="diagram-node diagram-node-warning" />
      <text x="37" y="101" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🎓 Experts</text>

      <rect x="15" y="115" width="45" height="18" className="diagram-node diagram-node-warning" />
      <text x="37" y="126" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🏢 Leaders</text>

      <rect x="15" y="140" width="45" height="18" className="diagram-node diagram-node-warning" />
      <text x="37" y="151" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🔗 External</text>

      {/* Knowledge Platform Core */}
      <rect x="90" y="90" width="90" height="50" className="diagram-node diagram-node-primary" filter="url(#drop-shadow)" />
      <text x="135" y="110" className="diagram-text-heading">📚 Knowledge Platform</text>
      <text x="135" y="127" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>Search • AI • Workflow</text>

      {/* Content & Tools */}
      <rect x="100" y="55" width="25" height="15" className="diagram-node diagram-node-secondary" />
      <text x="112" y="65" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📄 Docs</text>

      <rect x="130" y="55" width="25" height="15" className="diagram-node diagram-node-secondary" />
      <text x="142" y="65" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📖 Wiki</text>

      <rect x="160" y="55" width="25" height="15" className="diagram-node diagram-node-secondary" />
      <text x="172" y="65" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>💬 Chat</text>

      <rect x="100" y="155" width="25" height="15" className="diagram-node diagram-node-accent" />
      <text x="112" y="165" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🔄 BPMN</text>

      <rect x="130" y="155" width="25" height="15" className="diagram-node diagram-node-accent" />
      <text x="142" y="165" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📋 Forms</text>

      <rect x="160" y="155" width="25" height="15" className="diagram-node diagram-node-accent" />
      <text x="172" y="165" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🎯 KPIs</text>

      {/* Outputs */}
      <text x="255" y="55" className="diagram-text-secondary">Outputs</text>
      
      <rect x="220" y="70" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="245" y="81" className="diagram-text-label" style={{ font: diagramFonts.caption }}>✅ Decisions</text>

      <rect x="220" y="95" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="245" y="106" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📏 Standards</text>

      <rect x="220" y="120" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="245" y="131" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🔄 Workflows</text>

      <rect x="220" y="145" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="245" y="156" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📊 Reports</text>

      {/* AI Assistant */}
      <rect x="285" y="95" width="35" height="40" className="diagram-node diagram-node-accent" />
      <text x="302" y="110" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🤖</text>
      <text x="302" y="123" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>AI</text>
      <text x="302" y="136" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Bot</text>

      {/* Collaboration Flows */}
      <path d="M 60 74 Q 75 80 90 105" className="diagram-edge" />
      <path d="M 60 99 Q 75 105 90 115" className="diagram-edge" />
      <path d="M 60 124 Q 75 120 90 125" className="diagram-edge" />
      <path d="M 60 149 Q 75 135 90 135" className="diagram-edge" />

      {/* Tool Integration */}
      <line x1="112" y1="70" x2="112" y2="90" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />
      <line x1="142" y1="70" x2="142" y2="90" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />
      <line x1="172" y1="70" x2="172" y2="90" className="diagram-edge diagram-edge-primary diagram-edge-dashed" />

      <line x1="112" y1="140" x2="112" y2="155" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />
      <line x1="142" y1="140" x2="142" y2="155" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />
      <line x1="172" y1="140" x2="172" y2="155" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />

      {/* Knowledge Delivery */}
      <path d="M 180 105 Q 200 85 220 79" className="diagram-edge diagram-edge-primary" />
      <path d="M 180 115 Q 200 102 220 104" className="diagram-edge diagram-edge-primary" />
      <path d="M 180 125 Q 200 118 220 129" className="diagram-edge diagram-edge-primary" />
      <path d="M 180 135 Q 200 145 220 154" className="diagram-edge diagram-edge-primary" />

      {/* AI Integration */}
      <line x1="270" y1="115" x2="285" y2="115" className="diagram-edge diagram-edge-accent" />

      {/* Key Features */}
      <rect x="40" y="180" width="270" height="16" fill={diagramStyles.surface} stroke={diagramStyles.border} rx="8" opacity="0.9" />
      <text x="175" y="190" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>🔍 Smart Search • 🤖 AI Assistant • 📊 Analytics • 🔄 Automation • 🌐 Federation</text>
    </DiagramBase>
  );
}
