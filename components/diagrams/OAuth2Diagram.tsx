export function OAuth2Diagram() {
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
        OAuth2 Authorization Code Flow with PKCE
      </text>
      
      {/* Actors */}
      <rect x="50" y="80" width="100" height="70" fill="var(--accent)" rx="8" filter="url(#shadow)"/>
      <text x="100" y="105" textAnchor="middle" fill="white" className="font-bold">User</text>
      <text x="100" y="125" textAnchor="middle" fill="white" className="text-sm">Resource</text>
      <text x="100" y="140" textAnchor="middle" fill="white" className="text-sm">Owner</text>
      
      <rect x="250" y="80" width="120" height="70" fill="var(--primary)" rx="8" filter="url(#shadow)"/>
      <text x="310" y="105" textAnchor="middle" fill="white" className="font-bold">Client App</text>
      <text x="310" y="125" textAnchor="middle" fill="white" className="text-sm">SPA / Mobile</text>
      
      <rect x="450" y="80" width="120" height="70" fill="var(--secondary)" rx="8" filter="url(#shadow)"/>
      <text x="510" y="105" textAnchor="middle" fill="white" className="font-bold">Auth Server</text>
      <text x="510" y="125" textAnchor="middle" fill="white" className="text-sm">Identity Provider</text>
      
      <rect x="650" y="80" width="100" height="70" fill="#4ecdc4" rx="8" filter="url(#shadow)"/>
      <text x="700" y="105" textAnchor="middle" fill="white" className="font-bold">API</text>
      <text x="700" y="125" textAnchor="middle" fill="white" className="text-sm">Resource</text>
      <text x="700" y="140" textAnchor="middle" fill="white" className="text-sm">Server</text>
      
      {/* Flow Steps */}
      <g className="text-sm" fill="var(--text)">
        {/* Step 1: Generate PKCE */}
        <line x1="310" y1="170" x2="310" y2="190" stroke="var(--primary)" strokeWidth="3"/>
        <text x="320" y="185" className="font-medium">1. Generate PKCE</text>
        <text x="320" y="200" className="text-xs text-muted">code_verifier, code_challenge</text>
        
        {/* Step 2: Authorization Request */}
        <line x1="150" y1="220" x2="250" y2="220" stroke="var(--text-muted)" 
              strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="200" y="215" textAnchor="middle" className="text-xs">2. Login Request</text>
        
        <line x1="310" y1="230" x2="450" y2="250" stroke="var(--text-muted)" 
              strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="380" y="235" textAnchor="middle" className="text-xs font-medium">3. Authorization Request</text>
        <text x="380" y="248" textAnchor="middle" className="text-xs">+ code_challenge</text>
        
        {/* Step 4: User Authentication */}
        <line x1="450" y1="270" x2="150" y2="290" stroke="var(--text-muted)" 
              strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="300" y="275" textAnchor="middle" className="text-xs font-medium">4. User Authentication</text>
        <text x="300" y="288" textAnchor="middle" className="text-xs">Login Form</text>
        
        {/* Step 5: User Consent */}
        <line x1="150" y1="310" x2="450" y2="330" stroke="var(--text-muted)" 
              strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="300" y="315" textAnchor="middle" className="text-xs font-medium">5. Grant Permission</text>
        <text x="300" y="328" textAnchor="middle" className="text-xs">User Consent</text>
        
        {/* Step 6: Authorization Code */}
        <line x1="510" y1="340" x2="310" y2="360" stroke="var(--text-muted)" 
              strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="410" y="345" textAnchor="middle" className="text-xs font-medium">6. Authorization Code</text>
        <text x="410" y="358" textAnchor="middle" className="text-xs">Redirect with code</text>
        
        {/* Step 7: Token Exchange */}
        <line x1="310" y1="380" x2="450" y2="400" stroke="var(--text-muted)" 
              strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="380" y="385" textAnchor="middle" className="text-xs font-medium">7. Token Request</text>
        <text x="380" y="398" textAnchor="middle" className="text-xs">code + code_verifier</text>
        
        {/* Step 8: Access Token */}
        <line x1="450" y1="420" x2="310" y2="440" stroke="var(--text-muted)" 
              strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="380" y="425" textAnchor="middle" className="text-xs font-medium">8. Access Token</text>
        <text x="380" y="438" textAnchor="middle" className="text-xs">+ ID Token (OIDC)</text>
        
        {/* Step 9: API Request */}
        <line x1="370" y1="460" x2="650" y2="480" stroke="var(--text-muted)" 
              strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="510" y="465" textAnchor="middle" className="text-xs font-medium">9. API Request</text>
        <text x="510" y="478" textAnchor="middle" className="text-xs">Bearer Token</text>
        
        {/* Step 10: Protected Resource */}
        <line x1="650" y1="500" x2="370" y2="520" stroke="var(--text-muted)" 
              strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="510" y="505" textAnchor="middle" className="text-xs font-medium">10. Protected Resource</text>
        <text x="510" y="518" textAnchor="middle" className="text-xs">API Response</text>
      </g>
      
      {/* Security Features Callout */}
      <rect x="50" y="550" width="700" height="40" fill="var(--surface-alt)" 
            stroke="var(--accent)" strokeWidth="1" rx="4"/>
      <text x="60" y="567" className="text-xs font-bold" fill="var(--accent)">Security Features:</text>
      <text x="160" y="567" className="text-xs" fill="var(--text)">
        PKCE prevents code interception • State parameter prevents CSRF • 
        Short-lived tokens • Secure redirect URIs
      </text>
      <text x="60" y="582" className="text-xs font-bold" fill="var(--accent)">Token Types:</text>
      <text x="130" y="582" className="text-xs" fill="var(--text)">
        Access Token (API authorization) • ID Token (user identity) • 
        Refresh Token (token renewal)
      </text>
    </svg>
  );
}