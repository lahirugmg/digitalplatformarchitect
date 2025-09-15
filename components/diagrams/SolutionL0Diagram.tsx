export function SolutionL0Diagram() {
  return (
    <svg
      viewBox="0 0 1200 520"
      role="img"
      aria-label="Solution Architecture L0: Experiences → Engineering → Delivery/Operations"
      style={{ width: '100%', height: 'auto' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Header */}
      <text x="600" y="74" textAnchor="middle" style={{ font: '700 34px system-ui', fill: '#111827' }}>
        Digital Experiences
      </text>

      {/* Enterprise Software Engineering */}
      <g>
        <rect x="100" y="160" width="1000" height="120" rx="22" ry="22" fill="#ffffff" stroke="#111827" strokeWidth={2} />
        <text x="600" y="230" textAnchor="middle" style={{ font: '700 28px system-ui', fill: '#111827' }}>
          Enterprise Software Engineering
        </text>
      </g>

      {/* Software Delivery and Operations */}
      <g>
        <rect x="100" y="310" width="1000" height="120" rx="22" ry="22" fill="#ffffff" stroke="#111827" strokeWidth={2} />
        <text x="600" y="380" textAnchor="middle" style={{ font: '700 28px system-ui', fill: '#111827' }}>
          Software Delivery and Operations
        </text>
      </g>
    </svg>
  );
}
