import { DiagramBase, diagramStyles, diagramFonts, commonStyles } from '../DiagramBase';

export function CloudNativeDiagram() {
  return (
    <DiagramBase
      viewBox="0 0 320 200"
      title="Cloud-Native Platform"
      description="Comprehensive cloud-native architecture with Kubernetes orchestration, service mesh, and platform services"
      width={320}
      height={200}
    >
      <style>{commonStyles}</style>

      {/* Background grid */}
      <rect width="320" height="200" fill="url(#grid-light)" />

      {/* Title */}
      <rect x="90" y="10" width="140" height="25" fill="url(#primary-gradient)" rx="12" />
      <text x="160" y="26" className="diagram-text" fill="white" style={{ font: diagramFonts.heading }}>☸️ Cloud-Native Platform</text>

      {/* External Layer */}
      <text x="30" y="60" className="diagram-text-secondary">External</text>
      
      <rect x="15" y="70" width="45" height="22" className="diagram-node" />
      <text x="37" y="81" className="diagram-text-label">👥 Users</text>

      <rect x="15" y="100" width="45" height="22" className="diagram-node" />
      <text x="37" y="111" className="diagram-text-label">🔗 APIs</text>

      <rect x="15" y="130" width="45" height="22" className="diagram-node" />
      <text x="37" y="141" className="diagram-text-label">💾 Storage</text>

      {/* Kubernetes Core */}
      <rect x="80" y="60" width="120" height="80" className="diagram-node diagram-node-primary" filter="url(#drop-shadow)" />
      <text x="140" y="80" className="diagram-text-heading">☸️ Kubernetes Cluster</text>
      
      {/* Workloads inside K8s */}
      <rect x="90" y="95" width="28" height="20" className="diagram-node diagram-node-warning" />
      <text x="104" y="107" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Pod A</text>

      <rect x="125" y="95" width="28" height="20" className="diagram-node diagram-node-warning" />
      <text x="139" y="107" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Pod B</text>

      <rect x="160" y="95" width="28" height="20" className="diagram-node diagram-node-warning" />
      <text x="174" y="107" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Pod C</text>

      {/* Service Mesh overlay */}
      <line x1="104" y1="122" x2="139" y2="122" stroke={diagramStyles.primary} strokeWidth="2" strokeDasharray="3,2" />
      <line x1="139" y1="122" x2="174" y2="122" stroke={diagramStyles.primary} strokeWidth="2" strokeDasharray="3,2" />
      <text x="140" y="135" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🔗 Service Mesh</text>

      {/* Platform Services */}
      <text x="250" y="60" className="diagram-text-secondary">Platform</text>
      
      <rect x="220" y="70" width="50" height="20" className="diagram-node diagram-node-accent" />
      <text x="245" y="82" className="diagram-text-label">⚡ GitOps</text>

      <rect x="220" y="100" width="50" height="20" className="diagram-node diagram-node-accent" />
      <text x="245" y="112" className="diagram-text-label">🌐 Ingress</text>

      <rect x="220" y="130" width="50" height="20" className="diagram-node diagram-node-accent" />
      <text x="245" y="142" className="diagram-text-label">🛡️ Policy</text>

      {/* Observability Layer */}
      <rect x="280" y="70" width="30" height="50" className="diagram-node diagram-node-success" />
      <text x="295" y="82" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📊</text>
      <text x="295" y="95" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Obs</text>
      <text x="295" y="108" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>↗️</text>

      {/* Traffic Flow */}
      <path d="M 60 81 Q 70 75 80 85" className="diagram-edge" />
      <path d="M 60 111 Q 70 105 80 105" className="diagram-edge" />
      <path d="M 60 141 Q 70 125 80 115" className="diagram-edge" />

      {/* Platform Integration */}
      <path d="M 200 85 Q 210 80 220 80" className="diagram-edge diagram-edge-primary" />
      <path d="M 200 105 Q 210 105 220 110" className="diagram-edge diagram-edge-primary" />
      <path d="M 200 125 Q 210 130 220 140" className="diagram-edge diagram-edge-primary" />

      {/* Observability Integration */}
      <line x1="200" y1="100" x2="280" y2="95" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />

      {/* Key Features */}
      <rect x="40" y="170" width="240" height="20" fill={diagramStyles.surface} stroke={diagramStyles.border} rx="10" opacity="0.9" />
      <text x="160" y="182" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>
        🔄 Auto-scaling • 🔐 mTLS • ⚡ Zero Downtime • 🎯 Blue-Green • 📈 HPA/VPA
      </text>
    </DiagramBase>
  );
}
