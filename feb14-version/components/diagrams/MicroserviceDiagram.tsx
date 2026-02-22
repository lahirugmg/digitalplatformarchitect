export function MicroserviceDiagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    service: "var(--primary-light)",
    api: "var(--orange-light)",
    data: "var(--green-light)",
    infra: "var(--purple-light)",
  } as const;

  const font = "600 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 10px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 1000 600" role="img" aria-labelledby="microservice-title microservice-desc" preserveAspectRatio="xMidYMid meet">
      <title id="microservice-title">Microservice Architecture</title>
      <desc id="microservice-desc">Independent services communicating via APIs and events, each owning its data and deployment.</desc>
      
      <defs>
        <marker id="arrow-ms" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
      </defs>

      {/* API Gateway */}
      <rect x="400" y="40" width="200" height="50" fill={c.api} stroke={c.border} rx="10" ry="10" />
      <text x="500" y="60" textAnchor="middle" fill={c.text} style={{ font }}>API Gateway</text>
      <text x="500" y="75" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Routing, Auth, Rate Limiting</text>

      {/* Services Layer */}
      {/* User Service */}
      <rect x="80" y="150" width="160" height="120" fill={c.service} stroke={c.border} rx="10" ry="10" />
      <text x="160" y="175" textAnchor="middle" fill={c.text} style={{ font }}>User Service</text>
      <text x="160" y="195" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Registration</text>
      <text x="160" y="210" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Authentication</text>
      <text x="160" y="225" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Profile Mgmt</text>
      
      {/* Order Service */}
      <rect x="280" y="150" width="160" height="120" fill={c.service} stroke={c.border} rx="10" ry="10" />
      <text x="360" y="175" textAnchor="middle" fill={c.text} style={{ font }}>Order Service</text>
      <text x="360" y="195" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Order Processing</text>
      <text x="360" y="210" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• State Management</text>
      <text x="360" y="225" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Business Logic</text>

      {/* Payment Service */}
      <rect x="480" y="150" width="160" height="120" fill={c.service} stroke={c.border} rx="10" ry="10" />
      <text x="560" y="175" textAnchor="middle" fill={c.text} style={{ font }}>Payment Service</text>
      <text x="560" y="195" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Payment Processing</text>
      <text x="560" y="210" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Fraud Detection</text>
      <text x="560" y="225" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Refunds</text>

      {/* Notification Service */}
      <rect x="680" y="150" width="160" height="120" fill={c.service} stroke={c.border} rx="10" ry="10" />
      <text x="760" y="175" textAnchor="middle" fill={c.text} style={{ font }}>Notification Service</text>
      <text x="760" y="195" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Email</text>
      <text x="760" y="210" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• SMS</text>
      <text x="760" y="225" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Push</text>

      {/* Event Bus */}
      <rect x="200" y="320" width="520" height="40" fill={c.infra} stroke={c.border} rx="8" ry="8" />
      <text x="460" y="345" textAnchor="middle" fill={c.text} style={{ font }}>Event Bus / Message Queue</text>

      {/* Databases */}
      <rect x="80" y="410" width="120" height="60" fill={c.data} stroke={c.border} rx="8" ry="8" />
      <text x="140" y="435" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>User DB</text>
      <text x="140" y="450" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>PostgreSQL</text>

      <rect x="280" y="410" width="120" height="60" fill={c.data} stroke={c.border} rx="8" ry="8" />
      <text x="340" y="435" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Order DB</text>
      <text x="340" y="450" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>MongoDB</text>

      <rect x="480" y="410" width="120" height="60" fill={c.data} stroke={c.border} rx="8" ry="8" />
      <text x="540" y="435" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Payment DB</text>
      <text x="540" y="450" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>PostgreSQL</text>

      <rect x="720" y="410" width="120" height="60" fill={c.data} stroke={c.border} rx="8" ry="8" />
      <text x="780" y="435" textAnchor="middle" fill={c.text} style={{ font: fontSub }}>Notification Cache</text>
      <text x="780" y="450" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Redis</text>

      {/* API connections */}
      <line x1="450" y1="90" x2="160" y2="150" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />
      <line x1="500" y1="90" x2="360" y2="150" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />
      <line x1="520" y1="90" x2="560" y2="150" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />
      <line x1="550" y1="90" x2="760" y2="150" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />

      {/* Event connections */}
      <line x1="160" y1="270" x2="320" y2="320" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />
      <line x1="360" y1="270" x2="400" y2="320" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />
      <line x1="560" y1="270" x2="520" y2="320" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />
      <line x1="760" y1="270" x2="600" y2="320" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />

      {/* Database connections */}
      <line x1="140" y1="270" x2="140" y2="410" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />
      <line x1="340" y1="270" x2="340" y2="410" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />
      <line x1="540" y1="270" x2="540" y2="410" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />
      <line x1="760" y1="270" x2="780" y2="410" stroke={c.subtle} strokeWidth={1.5} markerEnd="url(#arrow-ms)" />

      {/* Legend */}
      <text x="50" y="540" fill={c.subtle} style={{ font: fontSub }}>Key Benefits:</text>
      <text x="50" y="560" fill={c.subtle} style={{ font: fontSub }}>• Independent deployment & scaling</text>
      <text x="50" y="575" fill={c.subtle} style={{ font: fontSub }}>• Technology diversity per service</text>
      
      <text x="500" y="540" fill={c.subtle} style={{ font: fontSub }}>Communication:</text>
      <text x="500" y="560" fill={c.subtle} style={{ font: fontSub }}>• Synchronous: HTTP/gRPC</text>
      <text x="500" y="575" fill={c.subtle} style={{ font: fontSub }}>• Asynchronous: Events/Messages</text>
    </svg>
  );
}