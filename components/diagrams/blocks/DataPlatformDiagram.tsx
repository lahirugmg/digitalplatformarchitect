import { DiagramBase, diagramStyles, diagramFonts, commonStyles } from '../DiagramBase';

export function DataPlatformDiagram() {
  return (
    <DiagramBase
      viewBox="0 0 380 240"
      title="Data Platform Architecture"
      description="Modern data lakehouse architecture with multi-zone processing, real-time streaming, and comprehensive data governance"
      width={380}
      height={240}
    >
      <style>{commonStyles}</style>

      {/* Background grid */}
      <rect width="380" height="240" fill="url(#grid-light)" />

      {/* Title */}
      <rect x="115" y="10" width="150" height="25" fill="url(#primary-gradient)" rx="12" />
      <text x="190" y="26" className="diagram-text" fill="white" style={{ font: diagramFonts.heading }}>📊 Data Platform</text>

      {/* Data Sources Layer */}
      <text x="30" y="55" className="diagram-text-secondary">Sources</text>
      
      <rect x="15" y="65" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="77" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🏢 Apps</text>

      <rect x="15" y="90" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="102" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🔗 APIs</text>

      <rect x="15" y="115" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="127" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🌊 Streams</text>

      <rect x="15" y="140" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="152" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📁 Files</text>

      <rect x="15" y="165" width="45" height="20" className="diagram-node diagram-node-warning" />
      <text x="37" y="177" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🗄️ Databases</text>

      {/* Ingestion Layer */}
      <text x="95" y="55" className="diagram-text-secondary">Ingestion</text>
      
      <rect x="80" y="75" width="35" height="15" className="diagram-node diagram-node-secondary" />
      <text x="97" y="85" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Batch</text>

      <rect x="80" y="95" width="35" height="15" className="diagram-node diagram-node-accent" />
      <text x="97" y="105" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Stream</text>

      <rect x="80" y="115" width="35" height="15" className="diagram-node diagram-node-secondary" />
      <text x="97" y="125" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>CDC</text>

      <rect x="80" y="135" width="35" height="15" className="diagram-node diagram-node-accent" />
      <text x="97" y="145" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Event</text>

      {/* Data Lakehouse Core */}
      <rect x="140" y="85" width="100" height="65" className="diagram-node diagram-node-primary" filter="url(#drop-shadow)" />
      <text x="190" y="105" className="diagram-text-heading">🏛️ Data Lakehouse</text>
      
      {/* Medallion Architecture */}
      <rect x="150" y="115" width="25" height="12" className="diagram-node" style={{ fill: '#CD7F32' }} />
      <text x="162" y="123" className="diagram-text-secondary" style={{ font: diagramFonts.micro, fill: 'white' }}>Bronze</text>

      <rect x="180" y="115" width="25" height="12" className="diagram-node" style={{ fill: '#C0C0C0' }} />
      <text x="192" y="123" className="diagram-text-secondary" style={{ font: diagramFonts.micro, fill: 'black' }}>Silver</text>

      <rect x="210" y="115" width="25" height="12" className="diagram-node" style={{ fill: '#FFD700' }} />
      <text x="222" y="123" className="diagram-text-secondary" style={{ font: diagramFonts.micro, fill: 'black' }}>Gold</text>

      {/* Processing Layer */}
      <rect x="150" y="130" width="80" height="15" className="diagram-node diagram-node-secondary" />
      <text x="190" y="140" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Spark • Flink • dbt</text>

      {/* Consumption Layer */}
      <text x="295" y="55" className="diagram-text-secondary">Consumption</text>
      
      <rect x="270" y="70" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="295" y="81" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📊 BI Tools</text>

      <rect x="270" y="95" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="295" y="106" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🤖 ML Models</text>

      <rect x="270" y="120" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="295" y="131" className="diagram-text-label" style={{ font: diagramFonts.caption }}>🔗 Data APIs</text>

      <rect x="270" y="145" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="295" y="156" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📋 Reports</text>

      <rect x="270" y="170" width="50" height="18" className="diagram-node diagram-node-success" />
      <text x="295" y="181" className="diagram-text-label" style={{ font: diagramFonts.caption }}>📈 Analytics</text>

      {/* Governance Layer */}
      <rect x="330" y="80" width="30" height="80" className="diagram-node diagram-node-accent" />
      <text x="345" y="95" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🔒</text>
      <text x="345" y="108" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Gov</text>
      <text x="345" y="121" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>📋</text>
      <text x="345" y="134" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>Cat</text>
      <text x="345" y="147" className="diagram-text-secondary" style={{ font: diagramFonts.micro }}>🔍</text>

      {/* Data Flow - Sources to Ingestion */}
      <path d="M 60 75 Q 70 75 80 82" className="diagram-edge diagram-edge-dashed" />
      <path d="M 60 100 Q 70 100 80 102" className="diagram-edge diagram-edge-dashed" />
      <path d="M 60 125 Q 70 120 80 122" className="diagram-edge diagram-edge-dashed" />
      <path d="M 60 150 Q 70 145 80 142" className="diagram-edge diagram-edge-dashed" />
      <path d="M 60 175 Q 70 155 80 142" className="diagram-edge diagram-edge-dashed" />

      {/* Ingestion to Lakehouse */}
      <path d="M 115 82 Q 125 88 140 105" className="diagram-edge diagram-edge-primary" />
      <path d="M 115 102 Q 125 108 140 115" className="diagram-edge diagram-edge-accent" />
      <path d="M 115 122 Q 125 120 140 120" className="diagram-edge diagram-edge-primary" />
      <path d="M 115 142 Q 125 135 140 125" className="diagram-edge diagram-edge-accent" />

      {/* Lakehouse to Consumption */}
      <path d="M 240 95 Q 255 85 270 79" className="diagram-edge diagram-edge-primary" />
      <path d="M 240 105 Q 255 102 270 104" className="diagram-edge diagram-edge-primary" />
      <path d="M 240 115 Q 255 118 270 129" className="diagram-edge diagram-edge-primary" />
      <path d="M 240 125 Q 255 135 270 154" className="diagram-edge diagram-edge-primary" />
      <path d="M 240 135 Q 255 155 270 179" className="diagram-edge diagram-edge-primary" />

      {/* Governance Integration */}
      <line x1="320" y1="120" x2="330" y2="120" className="diagram-edge diagram-edge-accent diagram-edge-dashed" />
      <line x1="240" y1="120" x2="330" y2="120" className="diagram-edge diagram-edge-accent diagram-edge-dotted" />

      {/* Key Features */}
      <rect x="60" y="210" width="260" height="20" fill={diagramStyles.surface} stroke={diagramStyles.border} rx="10" opacity="0.9" />
      <text x="190" y="222" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>
        📊 Lineage • ✅ Quality • 🔒 Governance • 🔄 CDC • ⚡ Real-time • 🎯 ACID Transactions
      </text>
    </DiagramBase>
  );
}
