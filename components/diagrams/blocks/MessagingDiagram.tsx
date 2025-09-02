import { DiagramBase, diagramStyles, diagramFonts, commonStyles } from '../DiagramBase';

export function MessagingDiagram() {
  return (
    <DiagramBase
      viewBox="0 0 380 240"
      title="Messaging & Streaming Platform"
      description="Enterprise messaging platform with queues, streams, event processing, and comprehensive security and observability"
      width={380}
      height={240}
    >
      <style>{commonStyles}</style>

      {/* Background grid */}
      <rect width="380" height="240" fill="url(#grid-light)" />

      {/* Title */}
      <rect x="100" y="10" width="180" height="25" fill="url(#primary-gradient)" rx="12" />
      <text x="190" y="26" className="diagram-text" fill="white" style={{ font: diagramFonts.heading }}>📨 Messaging & Streaming</text>

      {/* Security Boundary */}
      <path d="M 10 50 Q 190 40 370 50 Q 360 120 370 190 Q 190 200 10 190 Q 20 120 10 50" 
            fill="none" stroke={diagramStyles.accent} strokeWidth="2" strokeDasharray="6,4" opacity="0.6" />
      <text x="15" y="65" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🔒 Security & Observability Boundary</text>

      {/* Producers */}
      <text x="30" y="90" className="diagram-text-secondary">Producers</text>
      
      <rect x="15" y="100" width="50" height="18" className="diagram-node diagram-node-warning" />
      <text x="40" y="111" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🏢 Apps</text>

      <rect x="15" y="125" width="50" height="18" className="diagram-node diagram-node-warning" />
      <text x="40" y="136" className="diagram-text-label" style={{ font: diagramFonts.caption }}>⚙️ Services</text>

      <rect x="15" y="150" width="50" height="18" className="diagram-node diagram-node-warning" />
      <text x="40" y="161" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🌐 External</text>

      {/* Messaging Core */}
      <text x="150" y="90" className="diagram-text-secondary">Messaging Core</text>

      <rect x="100" y="100" width="70" height="35" className="diagram-node diagram-node-primary" filter="url(#drop-shadow)" />
      <text x="135" y="115" className="diagram-text-heading">📬 Message Queues</text>
      <text x="135" y="127" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>RabbitMQ • SQS • Kafka</text>

      <rect x="100" y="145" width="70" height="35" className="diagram-node diagram-node-accent" filter="url(#drop-shadow)" />
      <text x="135" y="160" className="diagram-text-heading">🌊 Event Streams</text>
      <text x="135" y="172" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Kafka • Kinesis • Pulsar</text>

      {/* Processing Layer */}
      <rect x="190" y="100" width="60" height="18" className="diagram-node diagram-node-secondary" />
      <text x="220" y="111" className="diagram-text-label" style={{ font: diagramFonts.caption }}>⚡ CEP</text>

      <rect x="190" y="125" width="60" height="18" className="diagram-node diagram-node-secondary" />
      <text x="220" y="136" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🔄 Transform</text>

      <rect x="190" y="150" width="60" height="18" className="diagram-node diagram-node-secondary" />
      <text x="220" y="161" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📊 Aggregate</text>

      {/* Consumers */}
      <text x="305" y="90" className="diagram-text-secondary">Consumers</text>
      
      <rect x="280" y="100" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="305" y="111" className="diagram-text-label" style={{ font: diagramFonts.caption }}>⚙️ Services</text>

      <rect x="280" y="125" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="305" y="136" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📊 Analytics</text>

      <rect x="280" y="150" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="305" y="161" className="diagram-text-label" style={{ font: diagramFonts.caption }}>💾 Storage</text>

      <rect x="280" y="175" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="305" y="186" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🚨 Alerts</text>

      {/* Management & Monitoring */}
      <rect x="340" y="105" width="25" height="70" className="diagram-node diagram-node-accent" />
      <text x="352" y="120" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📊</text>
      <text x="352" y="133" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Mon</text>
      <text x="352" y="146" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>⚙️</text>
      <text x="352" y="159" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Mgmt</text>

      {/* Message Flows - Producers to Messaging */}
      <path d="M 65 109 Q 80 105 100 117" className="diagram-edge" />
      <path d="M 65 134 Q 80 130 100 122" className="diagram-edge" />
      <path d="M 65 159 Q 80 155 100 162" className="diagram-edge" />
      <path d="M 65 159 Q 80 165 100 167" className="diagram-edge" />

      {/* Processing Integration */}
      <line x1="170" y1="109" x2="190" y2="109" className="diagram-edge diagram-edge-primary" />
      <line x1="170" y1="134" x2="190" y2="134" className="diagram-edge diagram-edge-accent" />
      <line x1="170" y1="159" x2="190" y2="159" className="diagram-edge diagram-edge-primary" />

      {/* Processing to Consumers */}
      <path d="M 250 109 Q 265 105 280 109" className="diagram-edge diagram-edge-primary" />
      <path d="M 250 134 Q 265 130 280 134" className="diagram-edge diagram-edge-primary" />
      <path d="M 250 159 Q 265 155 280 159" className="diagram-edge diagram-edge-primary" />
      <path d="M 250 159 Q 265 170 280 184" className="diagram-edge diagram-edge-primary" />

      {/* Monitoring Integration */}
      <line x1="330" y1="140" x2="340" y2="140" className="diagram-edge diagram-edge-accent" />

      {/* Cross-cutting concerns */}
      <rect x="120" y="70" width="30" height="12" className="diagram-node" fill={diagramStyles.warningLight} />
      <text x="135" y="78" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🔐 Security</text>

      <rect x="160" y="70" width="30" height="12" className="diagram-node" fill={diagramStyles.successLight} />
      <text x="175" y="78" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📊 Tracing</text>

      {/* Key Features */}
      <rect x="50" y="215" width="280" height="20" fill={diagramStyles.surface} stroke={diagramStyles.border} rx="10" opacity="0.9" />
      <text x="190" y="227" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>
        🔐 mTLS • 🎯 RBAC • 📊 Tracing • ⚡ At-least-once • 🔄 Dead Letter • 🚨 Circuit Breaker
      </text>
    </DiagramBase>
  );
}
