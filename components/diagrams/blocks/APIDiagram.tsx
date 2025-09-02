import { DiagramBase, diagramStyles, diagramFonts, commonStyles } from '../DiagramBase';
import { Node, Edge, TitleBar, SectionLabel } from '../DiagramElements';

export function APIDiagram() {
  return (
    <DiagramBase
      viewBox="0 0 340 220"
      title="API Management Platform"
      description="Comprehensive API management with gateway, policies, security, and backend service orchestration"
      width={340}
      height={220}
    >
      <style>{commonStyles}</style>

      {/* Background grid */}
      <rect width="340" height="220" fill="url(#grid-light)" />

  {/* Title */}
  <TitleBar x={100} y={10} width={140} text="🌐 API Management" />

      {/* Client Layer */}
  <SectionLabel x={30} y={60} text="Clients" />
  <Node x={15} y={70} width={50} height={22} lines={["📱 Mobile"]} />
  <Node x={15} y={100} width={50} height={22} lines={["🌐 Web App"]} />
  <Node x={15} y={130} width={50} height={22} lines={["🔗 API Client"]} />
  <Node x={15} y={160} width={50} height={22} lines={["🤖 Bot/CLI"]} />

      {/* API Gateway Core */}
      <rect x="90" y="90" width="80" height="50" className="diagram-node diagram-node-primary" filter="url(#drop-shadow)" />
      <text x="130" y="110" className="diagram-text-heading">🚪 API Gateway</text>
      <text x="130" y="125" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>Kong • Envoy • NGINX</text>

      {/* Policy Layer */}
  <Node x={100} y={50} width={60} height={18} lines={["📋 Policies"]} variant="warning" />
      
      {/* Policy Details */}
  <Node x={85} y={25} width={25} height={15} lines={["Auth"]} variant="secondary" lineFont="micro" />
  <Node x={115} y={25} width={25} height={15} lines={["Rate"]} variant="secondary" lineFont="micro" />
  <Node x={145} y={25} width={25} height={15} lines={["CORS"]} variant="secondary" lineFont="micro" />

      {/* Management Layer */}
  <Node x={200} y={50} width={70} height={18} lines={["⚙️ Management"]} variant="accent" />

      {/* Backend Services */}
  <SectionLabel x={280} y={90} text="Services" />
  <Node x={280} y={100} width={45} height={20} lines={["User API"]} variant="success" lineFont="caption" />
  <Node x={280} y={125} width={45} height={20} lines={["Order API"]} variant="success" lineFont="caption" />
  <Node x={280} y={150} width={45} height={20} lines={["Payment API"]} variant="success" lineFont="caption" />

      {/* External Services */}
  <Node x={210} y={100} width={55} height={20} lines={["🔒 OAuth2"]} lineFont="caption" />
  <Node x={210} y={130} width={55} height={20} lines={["📊 Analytics"]} lineFont="caption" />

      {/* Traffic Flow - Client to Gateway */}
  <Edge d="M 65 81 Q 75 75 90 95" />
  <Edge d="M 65 111 Q 75 105 90 115" />
  <Edge d="M 65 141 Q 75 135 90 125" />
  <Edge d="M 65 171 Q 75 155 90 135" />

      {/* Policy Integration */}
  <Edge x1={130} y1={68} x2={130} y2={90} variant="primary" />
  <Edge d="M 130 50 Q 120 40 97 40" dashed />
  <Edge d="M 130 50 Q 130 40 127 40" dashed />
  <Edge d="M 130 50 Q 140 40 157 40" dashed />

      {/* Management Integration */}
  <Edge x1={170} y1={115} x2={200} y2={59} variant="accent" dashed />

      {/* Gateway to Services */}
  <Edge d="M 170 105 Q 190 100 210 110" variant="primary" />
  <Edge d="M 170 115 Q 190 125 210 140" variant="primary" />
  <Edge d="M 170 125 Q 240 135 280 110" variant="primary" />
  <Edge d="M 170 125 Q 240 135 280 135" variant="primary" />
  <Edge d="M 170 125 Q 240 145 280 160" variant="primary" />

      {/* Key Features */}
      <rect x="50" y="195" width="240" height="20" fill={diagramStyles.surface} stroke={diagramStyles.border} rx="10" opacity="0.9" />
      <text x="170" y="207" className="diagram-text-secondary" style={{ font: diagramFonts.caption }}>
        🔐 Authentication • ⚡ Rate Limiting • 📊 Analytics • 🔄 Load Balancing • 🛡️ Security
      </text>
    </DiagramBase>
  );
}
