export function OAuth2Diagram() {
  const c = {
    text: "var(--text)",
    subtle: "var(--text-secondary)",
    border: "var(--border)",
    surface: "var(--surface)",
    alt: "var(--surface-alt)",
    user: "var(--primary-light)",
    client: "var(--orange-light)",
    auth: "var(--purple-light)",
    resource: "var(--green-light)",
  } as const;

  const font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontSub = "500 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const fontTitle = "700 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  return (
    <svg viewBox="0 0 900 650" role="img" aria-labelledby="oauth2-title oauth2-desc" preserveAspectRatio="xMidYMid meet">
      <title id="oauth2-title">OAuth 2.0 Authorization Code Flow with PKCE</title>
      <desc id="oauth2-desc">Secure authorization flow showing user authentication, client authorization, and protected resource access with PKCE security extension.</desc>
      
      <defs>
        <marker id="arrow-oauth" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={c.subtle} />
        </marker>
        <pattern id="grid-oauth" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c.border} strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <filter id="shadow-oauth">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
        <linearGradient id="step-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8f9fa" />
          <stop offset="100%" stopColor="#e9ecef" />
        </linearGradient>
      </defs>

      {/* Background grid */}
      <rect width="900" height="650" fill="url(#grid-oauth)" />

      {/* Main title */}
      <rect x="250" y="15" width="400" height="35" fill={c.auth} stroke="none" rx="17" ry="17" />
      <text x="450" y="38" textAnchor="middle" fill="#fff" style={{ font: fontTitle }}>🔐 OAuth 2.0 + PKCE Flow</text>

      {/* Actors/Components */}
      <rect x="50" y="90" width="130" height="80" fill={c.user} stroke={c.border} rx="12" ry="12" filter="url(#shadow-oauth)" />
      <text x="115" y="115" textAnchor="middle" fill="white" style={{ font }}>👤 User</text>
      <text x="115" y="135" textAnchor="middle" fill="white" style={{ font: fontSub }}>Resource Owner</text>
      <text x="115" y="150" textAnchor="middle" fill="white" style={{ font: fontSub }}>• Authenticates</text>
      <text x="115" y="165" textAnchor="middle" fill="white" style={{ font: fontSub }}>• Grants permission</text>
      
      <rect x="250" y="90" width="130" height="80" fill={c.client} stroke={c.border} rx="12" ry="12" filter="url(#shadow-oauth)" />
      <text x="315" y="115" textAnchor="middle" fill="white" style={{ font }}>📱 Client App</text>
      <text x="315" y="135" textAnchor="middle" fill="white" style={{ font: fontSub }}>SPA / Mobile App</text>
      <text x="315" y="150" textAnchor="middle" fill="white" style={{ font: fontSub }}>• Uses PKCE</text>
      <text x="315" y="165" textAnchor="middle" fill="white" style={{ font: fontSub }}>• Public client</text>
      
      <rect x="450" y="90" width="130" height="80" fill={c.auth} stroke={c.border} rx="12" ry="12" filter="url(#shadow-oauth)" />
      <text x="515" y="115" textAnchor="middle" fill="white" style={{ font }}>🏛️ Auth Server</text>
      <text x="515" y="135" textAnchor="middle" fill="white" style={{ font: fontSub }}>Identity Provider</text>
      <text x="515" y="150" textAnchor="middle" fill="white" style={{ font: fontSub }}>• Issues tokens</text>
      <text x="515" y="165" textAnchor="middle" fill="white" style={{ font: fontSub }}>• Validates PKCE</text>
      
      <rect x="650" y="90" width="130" height="80" fill={c.resource} stroke={c.border} rx="12" ry="12" filter="url(#shadow-oauth)" />
      <text x="715" y="115" textAnchor="middle" fill="white" style={{ font }}>🔌 Resource API</text>
      <text x="715" y="135" textAnchor="middle" fill="white" style={{ font: fontSub }}>Protected Resources</text>
      <text x="715" y="150" textAnchor="middle" fill="white" style={{ font: fontSub }}>• Validates tokens</text>
      <text x="715" y="165" textAnchor="middle" fill="white" style={{ font: fontSub }}>• Returns data</text>

      {/* Flow Steps Container */}
      <rect x="30" y="190" width="840" height="340" fill={c.surface} stroke={c.border} rx="15" ry="15" opacity="0.3" />
      <text x="450" y="215" textAnchor="middle" fill={c.text} style={{ font }}>🔄 Authorization Code Flow with PKCE</text>

      {/* Step indicators */}
      <text x="50" y="245" fill={c.text} style={{ font }}>Steps:</text>

      {/* Step 1: Generate PKCE */}
      <rect x="60" y="255" width="350" height="25" fill="url(#step-gradient)" stroke={c.border} rx="4" ry="4" />
      <text x="70" y="272" fill={c.text} style={{ font: fontSub }}>1️⃣ Client generates PKCE: code_verifier + code_challenge</text>

      {/* Step 2: User initiates login */}
      <line x1="180" y1="290" x2="250" y2="290" stroke={c.user} strokeWidth={2.5} markerEnd="url(#arrow-oauth)" />
      <text x="215" y="285" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>2️⃣ Login request</text>

      {/* Step 3: Authorization request */}
      <line x1="315" y1="305" x2="450" y2="325" stroke={c.client} strokeWidth={2.5} markerEnd="url(#arrow-oauth)" />
      <text x="382" y="300" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>3️⃣ Authorization request</text>
      <text x="382" y="315" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>+ code_challenge</text>

      {/* Step 4: User authentication */}
      <line x1="450" y1="340" x2="180" y2="360" stroke={c.auth} strokeWidth={2.5} markerEnd="url(#arrow-oauth)" />
      <text x="315" y="345" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>4️⃣ User authentication</text>
      <text x="315" y="360" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Login form & credentials</text>

      {/* Step 5: User consent */}
      <line x1="180" y1="375" x2="450" y2="395" stroke={c.user} strokeWidth={2.5} markerEnd="url(#arrow-oauth)" />
      <text x="315" y="380" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>5️⃣ Grant permission</text>
      <text x="315" y="395" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>User consent</text>

      {/* Step 6: Authorization code */}
      <line x1="515" y1="410" x2="315" y2="430" stroke={c.auth} strokeWidth={2.5} markerEnd="url(#arrow-oauth)" />
      <text x="415" y="415" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>6️⃣ Authorization code</text>
      <text x="415" y="430" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Redirect + code</text>

      {/* Step 7: Token exchange */}
      <line x1="315" y1="445" x2="450" y2="465" stroke={c.client} strokeWidth={2.5} markerEnd="url(#arrow-oauth)" />
      <text x="382" y="450" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>7️⃣ Token request</text>
      <text x="382" y="465" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>code + code_verifier</text>

      {/* Step 8: Access token */}
      <line x1="450" y1="480" x2="315" y2="500" stroke={c.auth} strokeWidth={2.5} markerEnd="url(#arrow-oauth)" />
      <text x="382" y="485" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>8️⃣ Access + ID tokens</text>
      <text x="382" y="500" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>JWT tokens</text>

      {/* Step 9: API request */}
      <line x1="380" y1="515" x2="650" y2="515" stroke={c.client} strokeWidth={2.5} markerEnd="url(#arrow-oauth)" />
      <text x="515" y="510" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>9️⃣ API request</text>
      <text x="515" y="525" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>Bearer access_token</text>

      {/* Step 10: Protected resource */}
      <line x1="650" y1="530" x2="380" y2="530" stroke={c.resource} strokeWidth={2.5} markerEnd="url(#arrow-oauth)" />
      <text x="515" y="545" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>🔟 Protected resource</text>
      <text x="515" y="555" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>API response data</text>

      {/* Security Features */}
      <rect x="50" y="570" width="400" height="70" fill={c.alt} stroke={c.border} rx="10" ry="10" opacity="0.9" />
      <text x="250" y="590" textAnchor="middle" fill={c.text} style={{ font }}>🔒 Security Features</text>
      <text x="250" y="610" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• PKCE prevents code interception attacks</text>
      <text x="250" y="625" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• State parameter prevents CSRF attacks</text>

      {/* Token Types */}
      <rect x="470" y="570" width="380" height="70" fill={c.alt} stroke={c.border} rx="10" ry="10" opacity="0.9" />
      <text x="660" y="590" textAnchor="middle" fill={c.text} style={{ font }}>🎫 Token Types</text>
      <text x="660" y="610" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• Access Token: API authorization (short-lived)</text>
      <text x="660" y="625" textAnchor="middle" fill={c.subtle} style={{ font: fontSub }}>• ID Token: User identity (OIDC)</text>
    </svg>
  );
}