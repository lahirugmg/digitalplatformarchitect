export function APISecurityDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-muted)" />
        </marker>
      </defs>
      
      {/* Background */}
      <rect width="800" height="600" fill="var(--surface)"/>
      
      {/* Title */}
      <text x="400" y="30" textAnchor="middle" className="text-lg font-bold" fill="var(--text)">
        API Security Gateway Architecture
      </text>
      
      {/* External Clients */}
      <g>
        <rect x="30" y="80" width="80" height="50" fill="var(--accent)" rx="6" filter="url(#shadow)"/>
        <text x="70" y="100" textAnchor="middle" fill="white" className="text-xs font-medium">Web App</text>
        <text x="70" y="115" textAnchor="middle" fill="white" className="text-xs">Client</text>
        
        <rect x="30" y="150" width="80" height="50" fill="var(--accent)" rx="6" filter="url(#shadow)"/>
        <text x="70" y="170" textAnchor="middle" fill="white" className="text-xs font-medium">Mobile App</text>
        <text x="70" y="185" textAnchor="middle" fill="white" className="text-xs">Client</text>
        
        <rect x="30" y="220" width="80" height="50" fill="var(--accent)" rx="6" filter="url(#shadow)"/>
        <text x="70" y="240" textAnchor="middle" fill="white" className="text-xs font-medium">Partner</text>
        <text x="70" y="255" textAnchor="middle" fill="white" className="text-xs">System</text>
        
        <rect x="30" y="290" width="80" height="50" fill="#ff6b6b" rx="6" filter="url(#shadow)"/>
        <text x="70" y="310" textAnchor="middle" fill="white" className="text-xs font-medium">Malicious</text>
        <text x="70" y="325" textAnchor="middle" fill="white" className="text-xs">Traffic</text>
      </g>
      
      {/* Load Balancer */}
      <rect x="160" y="180" width="80" height="60" fill="var(--surface-alt)" 
            stroke="var(--text-muted)" strokeWidth="2" rx="6"/>
      <text x="200" y="200" textAnchor="middle" fill="var(--text)" className="text-xs font-medium">Load</text>
      <text x="200" y="215" textAnchor="middle" fill="var(--text)" className="text-xs font-medium">Balancer</text>
      <text x="200" y="230" textAnchor="middle" fill="var(--text-muted)" className="text-xs">SSL Term</text>
      
      {/* API Gateway - Main Component */}
      <rect x="300" y="100" width="200" height="280" fill="var(--primary)" fillOpacity="0.1" 
            stroke="var(--primary)" strokeWidth="3" rx="10" filter="url(#shadow)"/>
      <text x="400" y="125" textAnchor="middle" fill="var(--primary)" className="font-bold text-lg">
        API Security Gateway
      </text>
      
      {/* Security Layers within Gateway */}
      <rect x="320" y="140" width="160" height="30" fill="#ff6b6b" rx="4"/>
      <text x="400" y="160" textAnchor="middle" fill="white" className="text-xs font-bold">
        Web Application Firewall (WAF)
      </text>
      
      <rect x="320" y="180" width="160" height="25" fill="var(--accent)" rx="4"/>
      <text x="400" y="197" textAnchor="middle" fill="white" className="text-xs font-medium">
        Authentication & Authorization
      </text>
      
      <rect x="320" y="215" width="160" height="25" fill="var(--secondary)" rx="4"/>
      <text x="400" y="232" textAnchor="middle" fill="white" className="text-xs font-medium">
        Rate Limiting & Throttling
      </text>
      
      <rect x="320" y="250" width="160" height="25" fill="#4ecdc4" rx="4"/>
      <text x="400" y="267" textAnchor="middle" fill="white" className="text-xs font-medium">
        Request/Response Validation
      </text>
      
      <rect x="320" y="285" width="160" height="25" fill="var(--text)" rx="4"/>
      <text x="400" y="302" textAnchor="middle" fill="white" className="text-xs font-medium">
        API Routing & Transformation
      </text>
      
      <rect x="320" y="320" width="160" height="25" fill="var(--surface-alt)" 
            stroke="var(--text-muted)" strokeWidth="1" rx="4"/>
      <text x="400" y="337" textAnchor="middle" fill="var(--text)" className="text-xs font-medium">
        Logging & Monitoring
      </text>
      
      {/* Backend Services */}
      <g>
        <rect x="580" y="120" width="80" height="50" fill="var(--surface-alt)" 
              stroke="var(--primary)" strokeWidth="2" rx="6"/>
        <text x="620" y="140" textAnchor="middle" fill="var(--text)" className="text-xs font-medium">User</text>
        <text x="620" y="155" textAnchor="middle" fill="var(--text)" className="text-xs font-medium">Service</text>
        
        <rect x="580" y="190" width="80" height="50" fill="var(--surface-alt)" 
              stroke="var(--primary)" strokeWidth="2" rx="6"/>
        <text x="620" y="210" textAnchor="middle" fill="var(--text)" className="text-xs font-medium">Order</text>
        <text x="620" y="225" textAnchor="middle" fill="var(--text)" className="text-xs font-medium">Service</text>
        
        <rect x="580" y="260" width="80" height="50" fill="var(--surface-alt)" 
              stroke="var(--primary)" strokeWidth="2" rx="6"/>
        <text x="620" y="280" textAnchor="middle" fill="var(--text)" className="text-xs font-medium">Payment</text>
        <text x="620" y="295" textAnchor="middle" fill="var(--text)" className="text-xs font-medium">Service</text>
        
        <rect x="580" y="330" width="80" height="50" fill="var(--surface-alt)" 
              stroke="var(--primary)" strokeWidth="2" rx="6"/>
        <text x="620" y="350" textAnchor="middle" fill="var(--text)" className="text-xs font-medium">Legacy</text>
        <text x="620" y="365" textAnchor="middle" fill="var(--text)" className="text-xs font-medium">Systems</text>
      </g>
      
      {/* Identity Provider */}
      <rect x="300" y="420" width="100" height="60" fill="var(--accent)" rx="6" filter="url(#shadow)"/>
      <text x="350" y="445" textAnchor="middle" fill="white" className="text-xs font-bold">Identity</text>
      <text x="350" y="460" textAnchor="middle" fill="white" className="text-xs font-bold">Provider</text>
      <text x="350" y="475" textAnchor="middle" fill="white" className="text-xs">(OAuth2/OIDC)</text>
      
      {/* SIEM/Monitoring */}
      <rect x="450" y="420" width="100" height="60" fill="var(--secondary)" rx="6" filter="url(#shadow)"/>
      <text x="500" y="440" textAnchor="middle" fill="white" className="text-xs font-bold">SIEM</text>
      <text x="500" y="455" textAnchor="middle" fill="white" className="text-xs font-bold">Analytics</text>
      <text x="500" y="470" textAnchor="middle" fill="white" className="text-xs">Security Events</text>
      
      {/* Traffic Flow Arrows */}
      <line x1="110" y1="105" x2="155" y2="200" stroke="var(--text-muted)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="110" y1="175" x2="155" y2="210" stroke="var(--text-muted)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="110" y1="245" x2="155" y2="220" stroke="var(--text-muted)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="110" y1="315" x2="155" y2="230" stroke="#ff6b6b" 
            strokeWidth="3" markerEnd="url(#arrowhead)"/>
      
      <line x1="240" y1="210" x2="295" y2="210" stroke="var(--text-muted)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      
      <line x1="500" y1="145" x2="575" y2="145" stroke="var(--primary)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="500" y1="215" x2="575" y2="215" stroke="var(--primary)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="500" y1="285" x2="575" y2="285" stroke="var(--primary)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="500" y1="355" x2="575" y2="355" stroke="var(--primary)" 
            strokeWidth="2" markerEnd="url(#arrowhead)"/>
      
      {/* Gateway to Identity Provider */}
      <line x1="380" y1="380" x2="350" y2="415" stroke="var(--accent)" 
            strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
      
      {/* Gateway to SIEM */}
      <line x1="420" y1="380" x2="500" y2="415" stroke="var(--secondary)" 
            strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
      
      {/* Security Features */}
      <rect x="50" y="520" width="700" height="60" fill="var(--surface-alt)" 
            stroke="var(--primary)" strokeWidth="1" rx="6"/>
      <text x="60" y="540" className="text-sm font-bold" fill="var(--primary)">Security Capabilities:</text>
      <text x="60" y="555" className="text-xs" fill="var(--text)">
        • OWASP Top 10 Protection • DDoS Mitigation • Bot Detection • Certificate Management
      </text>
      <text x="60" y="570" className="text-xs" fill="var(--text)">
        • Real-time Threat Intelligence • Compliance Reporting • Zero-Trust Enforcement
      </text>
      
      {/* Threat Protection Indicator */}
      <text x="130" y="320" className="text-xs fill-red-600 font-bold">BLOCKED</text>
      <line x1="110" y1="315" x2="130" y2="315" stroke="#ff6b6b" strokeWidth="4"/>
    </svg>
  );
}