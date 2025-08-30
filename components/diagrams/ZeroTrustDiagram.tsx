export function ZeroTrustDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Background */}
      <rect width="800" height="600" fill="var(--surface)"/>
      
      {/* Title */}
      <text x="400" y="30" textAnchor="middle" className="text-lg font-bold" fill="var(--text)">
        Zero-Trust Security Architecture
      </text>
      
      {/* External Threats */}
      <rect x="20" y="80" width="120" height="60" fill="#ff6b6b" rx="8" filter="url(#shadow)"/>
      <text x="80" y="100" textAnchor="middle" fill="white" className="font-medium">External</text>
      <text x="80" y="120" textAnchor="middle" fill="white" className="font-medium">Threats</text>
      
      {/* Identity Verification Layer */}
      <rect x="200" y="60" width="400" height="100" fill="var(--accent)" fillOpacity="0.1" 
            stroke="var(--accent)" strokeWidth="2" rx="8"/>
      <text x="400" y="85" textAnchor="middle" fill="var(--accent)" className="font-bold">
        Identity Verification Layer
      </text>
      
      {/* MFA Component */}
      <rect x="220" y="100" width="80" height="40" fill="var(--accent)" rx="4"/>
      <text x="260" y="125" textAnchor="middle" fill="white" className="text-sm font-medium">MFA</text>
      
      {/* Device Trust */}
      <rect x="320" y="100" width="80" height="40" fill="var(--accent)" rx="4"/>
      <text x="360" y="115" textAnchor="middle" fill="white" className="text-xs">Device</text>
      <text x="360" y="130" textAnchor="middle" fill="white" className="text-xs">Trust</text>
      
      {/* Risk Assessment */}
      <rect x="420" y="100" width="80" height="40" fill="var(--accent)" rx="4"/>
      <text x="460" y="115" textAnchor="middle" fill="white" className="text-xs">Risk</text>
      <text x="460" y="130" textAnchor="middle" fill="white" className="text-xs">Assessment</text>
      
      {/* Policy Engine */}
      <rect x="520" y="100" width="80" height="40" fill="var(--accent)" rx="4"/>
      <text x="560" y="115" textAnchor="middle" fill="white" className="text-xs">Policy</text>
      <text x="560" y="130" textAnchor="middle" fill="white" className="text-xs">Engine</text>
      
      {/* Network Segmentation */}
      <rect x="150" y="200" width="500" height="80" fill="var(--primary)" fillOpacity="0.1" 
            stroke="var(--primary)" strokeWidth="2" rx="8"/>
      <text x="400" y="225" textAnchor="middle" fill="var(--primary)" className="font-bold">
        Network Micro-Segmentation
      </text>
      
      {/* Secure Zones */}
      <rect x="180" y="245" width="100" height="25" fill="var(--primary)" rx="4"/>
      <text x="230" y="262" textAnchor="middle" fill="white" className="text-xs">DMZ Zone</text>
      
      <rect x="300" y="245" width="100" height="25" fill="var(--primary)" rx="4"/>
      <text x="350" y="262" textAnchor="middle" fill="white" className="text-xs">App Zone</text>
      
      <rect x="420" y="245" width="100" height="25" fill="var(--primary)" rx="4"/>
      <text x="470" y="262" textAnchor="middle" fill="white" className="text-xs">Data Zone</text>
      
      <rect x="540" y="245" width="100" height="25" fill="var(--primary)" rx="4"/>
      <text x="590" y="262" textAnchor="middle" fill="white" className="text-xs">Admin Zone</text>
      
      {/* Resources Layer */}
      <rect x="100" y="320" width="600" height="120" fill="var(--surface-alt)" 
            stroke="var(--text-muted)" strokeWidth="1" rx="8"/>
      <text x="400" y="345" textAnchor="middle" fill="var(--text)" className="font-bold">
        Protected Resources
      </text>
      
      {/* Individual Resources */}
      <rect x="130" y="360" width="80" height="60" fill="var(--surface)" stroke="var(--text-muted)" rx="4"/>
      <text x="170" y="385" textAnchor="middle" fill="var(--text)" className="text-xs">Web Apps</text>
      <circle cx="170" cy="405" r="8" fill="#4ecdc4"/>
      
      <rect x="230" y="360" width="80" height="60" fill="var(--surface)" stroke="var(--text-muted)" rx="4"/>
      <text x="270" y="385" textAnchor="middle" fill="var(--text)" className="text-xs">APIs</text>
      <circle cx="270" cy="405" r="8" fill="#4ecdc4"/>
      
      <rect x="330" y="360" width="80" height="60" fill="var(--surface)" stroke="var(--text-muted)" rx="4"/>
      <text x="370" y="385" textAnchor="middle" fill="var(--text)" className="text-xs">Databases</text>
      <circle cx="370" cy="405" r="8" fill="#4ecdc4"/>
      
      <rect x="430" y="360" width="80" height="60" fill="var(--surface)" stroke="var(--text-muted)" rx="4"/>
      <text x="470" y="385" textAnchor="middle" fill="var(--text)" className="text-xs">Files</text>
      <circle cx="470" cy="405" r="8" fill="#4ecdc4"/>
      
      <rect x="530" y="360" width="80" height="60" fill="var(--surface)" stroke="var(--text-muted)" rx="4"/>
      <text x="570" y="385" textAnchor="middle" fill="var(--text)" className="text-xs">Services</text>
      <circle cx="570" cy="405" r="8" fill="#4ecdc4"/>
      
      <rect x="630" y="360" width="80" height="60" fill="var(--surface)" stroke="var(--text-muted)" rx="4"/>
      <text x="670" y="385" textAnchor="middle" fill="var(--text)" className="text-xs">Devices</text>
      <circle cx="670" cy="405" r="8" fill="#4ecdc4"/>
      
      {/* Monitoring & Analytics */}
      <rect x="200" y="480" width="400" height="60" fill="var(--secondary)" fillOpacity="0.1" 
            stroke="var(--secondary)" strokeWidth="2" rx="8"/>
      <text x="400" y="505" textAnchor="middle" fill="var(--secondary)" className="font-bold">
        Continuous Monitoring & Analytics
      </text>
      <text x="400" y="525" textAnchor="middle" fill="var(--text-muted)" className="text-sm">
        Real-time risk assessment, behavioral analytics, compliance reporting
      </text>
      
      {/* Flow Arrows */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-muted)" />
        </marker>
      </defs>
      
      {/* External threat to verification */}
      <line x1="140" y1="110" x2="190" y2="110" stroke="var(--text-muted)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      
      {/* Verification to segmentation */}
      <line x1="400" y1="160" x2="400" y2="190" stroke="var(--text-muted)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      
      {/* Segmentation to resources */}
      <line x1="400" y1="280" x2="400" y2="310" stroke="var(--text-muted)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      
      {/* Resources to monitoring */}
      <line x1="400" y1="440" x2="400" y2="470" stroke="var(--text-muted)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      
      {/* Principle callouts */}
      <text x="680" y="120" fill="var(--accent)" className="text-xs font-medium">Never Trust</text>
      <text x="680" y="135" fill="var(--accent)" className="text-xs font-medium">Always Verify</text>
      
      <text x="680" y="260" fill="var(--primary)" className="text-xs font-medium">Least Privilege</text>
      <text x="680" y="275" fill="var(--primary)" className="text-xs font-medium">Access</text>
      
      <text x="680" y="410" fill="var(--surface-alt)" className="text-xs font-medium" stroke="var(--text)" strokeWidth="0.5">Assume Breach</text>
      <text x="680" y="425" fill="var(--surface-alt)" className="text-xs font-medium" stroke="var(--text)" strokeWidth="0.5">Minimize Impact</text>
      
    </svg>
  );
}