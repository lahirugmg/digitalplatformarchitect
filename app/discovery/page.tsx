export const metadata = {
  title: "Technical Discovery",
  description: "Structured checklist for technical sales discovery of business requirements across APIs, integration, security, performance, deployment, and delivery."
};

export default function DiscoveryPage() {
  return (
    <div className="container">
      <article className="prose">
        <header className="page-hero stack gap-sm">
          <h1 className="page-title">Technical Discovery of Business Requirements</h1>
          <p className="lede">
            A structured checklist to guide technical discovery conversations: align on business goals, understand the current landscape, and capture
            requirements across APIs, integration, identity/security, performance, deployment, and delivery.
          </p>
          <nav className="solutions-toc" aria-label="Discovery navigation">
            <a href="#business-objectives" className="toc-link">1. Business Objectives</a>
            <a href="#technical-landscape" className="toc-link">2. Technical Landscape</a>
            <a href="#api-management" className="toc-link">3. API Management</a>
            <a href="#enterprise-integration" className="toc-link">4. Integration</a>
            <a href="#security-identity" className="toc-link">5. Security & Identity</a>
            <a href="#sizing-performance" className="toc-link">6. Sizing & Performance</a>
            <a href="#cloud-onprem" className="toc-link">7. Cloud vs. On‑Prem</a>
            <a href="#team-implementation" className="toc-link">8. Team & Implementation</a>
            <a href="#additional" className="toc-link">9. Additional</a>
          </nav>
        </header>

        <section id="business-objectives">
          <h2>1. Business Objectives</h2>
          <ul>
            <li><strong>Core business needs and goals</strong> — What are we trying to solve or achieve? Overall objectives and success criteria.</li>
            <li><strong>Stakeholders and end‑users</strong> — Departments, partners, external organizations; personas, roles, and decision makers.</li>
            <li><strong>Pain points and gaps</strong> — Shortcomings of the current solution/platform; where does it fail today?</li>
            <li><strong>Future priorities and roadmap</strong> — High‑level objectives for the next 12–36 months.</li>
            <li><strong>Existing business systems</strong> — CRM, HR, data sources; note IBM/WebSphere or other strategic vendors.</li>
            <li><strong>High‑level architecture</strong> — Any existing diagrams, written requirements, or solution overviews.</li>
          </ul>
        </section>

        <section id="technical-landscape">
          <h2>2. Current Technical Landscape</h2>
          <ul>
            <li><strong>Platforms and tools</strong> — API Management, Integration Platform, Identity & Access Management in place?</li>
            <li><strong>Connected systems and channels</strong> — Web, mobile, e‑commerce, partner portals, POS, IoT.</li>
            <li><strong>Deployment & infrastructure</strong> — Kubernetes, VMs, containers; on‑prem vs. cloud (AWS, Azure, GCP, OCI).</li>
            <li><strong>CI/CD approach</strong> — Build, deploy, and testing workflows and tools.</li>
          </ul>
        </section>

        <section id="api-management">
          <h2>3. API Management Requirements</h2>
          <ul>
            <li><strong>Internal vs. external APIs</strong> — Usage scenarios: partner‑facing, public, or internal microservices.</li>
            <li><strong>Developer portal / marketplace</strong> — Need for discovery, onboarding, try‑it, and monetization?</li>
            <li><strong>Gateway architecture</strong> — Containerized gateways, micro‑gateways, monoliths, or hybrid topologies.</li>
            <li><strong>Async API protocols</strong> — MQTT, WebSocket, Server‑Sent Events, AMQP, Kafka/AsyncAPI needs.</li>
            <li><strong>Policies and standards</strong> — Rate limiting, throttling, caching, quotas, monetization, style guides.</li>
          </ul>
        </section>

        <section id="enterprise-integration">
          <h2>4. Enterprise Integration Requirements</h2>
          <ul>
            <li><strong>Integration patterns</strong> — Mapping/transformation, routing, protocol bridging; batch vs. real‑time; streaming vs. request/response.</li>
            <li><strong>Back‑end integrations & connectors</strong> — SAP, Oracle EBS, CRM/HR (Salesforce, Workday), legacy monoliths, SQL/NoSQL DBs, SaaS, partner APIs, IoT/edge, data lake/big‑data platforms.</li>
            <li><strong>Integration technologies</strong> — ESB, iPaaS, custom code; runtime engines or frameworks used today.</li>
            <li><strong>Message formats</strong> — JSON, XML, EDI, CSV, Avro/Protobuf; schema governance.</li>
            <li><strong>Development technologies</strong> — REST, SOAP, GraphQL; Java, .NET, Python; SQL/NoSQL.</li>
            <li><strong>Protocols</strong> — HTTP/HTTPS, AMQP, MQTT; bridging legacy to modern protocols.</li>
            <li><strong>Lifecycle management</strong> — Versioning, promotion, testing, release processes for integrations.</li>
            <li><strong>Monitoring & troubleshooting</strong> — How are flows tracked, logged, traced, and alerted?</li>
          </ul>
        </section>

        <section id="security-identity">
          <h2>5. Security and Identity</h2>
          <ul>
            <li><strong>Authentication & authorization</strong> — OAuth2, OpenID Connect, SAML; workload identity, SPIFFE/SPIRE.</li>
            <li><strong>SSO and MFA</strong> — SAML, OIDC, FIDO/WebAuthn, social/federated login requirements.</li>
            <li><strong>Token and key management</strong> — Expiry, rotation, refresh; secrets storage; PKI and mTLS.</li>
            <li><strong>API security</strong> — API keys, encryption at rest/in‑transit, threat protection, egress controls.</li>
            <li><strong>Threats & protections</strong> — Injection (SQL/JSON), XML threats, DDoS, bot protection, rate limiting.</li>
          </ul>
        </section>

        <section id="sizing-performance">
          <h2>6. Sizing and Performance</h2>
          <ul>
            <li><strong>Transaction volumes</strong> — Current/expected TPS; average vs. peak.</li>
            <li><strong>Message size & throughput</strong> — Typical payload sizes, concurrency levels.</li>
            <li><strong>Asset counts</strong> — Number of APIs and integration flows/endpoints.</li>
            <li><strong>Latency & SLOs</strong> — Minimum response times, p95/p99 targets, error budgets.</li>
            <li><strong>Seasonality</strong> — Peak periods (e.g., Black Friday, month‑end), duration and magnitude.</li>
            <li><strong>Active users</strong> — MAU, DAU; consumers, employees, partners; IAM scale considerations.</li>
          </ul>
        </section>

        <section id="cloud-onprem">
          <h2>7. Cloud vs. On‑Prem</h2>
          <ul>
            <li><strong>Deployment preference</strong> — SaaS, private cloud, on‑prem, or hybrid.</li>
            <li><strong>Cloud strategy</strong> — Current providers/services (AWS, Azure, GCP, OCI); future multi‑cloud plans.</li>
          </ul>
        </section>

        <section id="team-implementation">
          <h2>8. Project Team and Implementation</h2>
          <ul>
            <li><strong>Roles & responsibilities</strong> — Technical leads, developers, architects, DevOps/Platform.</li>
            <li><strong>Timeline & resources</strong> — Team size, duration, milestones.</li>
            <li><strong>Executive sponsorship</strong> — C‑level involvement and decision authority.</li>
            <li><strong>Past experience</strong> — Prior enterprise product/platform experience.</li>
            <li><strong>Implementation approach</strong> — In‑house vs. partner; low‑code vs. pro‑code; skills availability.</li>
          </ul>
        </section>

        <section id="additional">
          <h2>9. Additional Considerations (Optional)</h2>
          <ul>
            <li><strong>Compliance & governance</strong> — Industry regulations (GDPR, HIPAA, PCI‑DSS), data sovereignty.</li>
            <li><strong>Monitoring & observability</strong> — Analytics, logging, tracing, alerting, KPIs/SLOs.</li>
            <li><strong>Scalability & high availability</strong> — SLAs, redundancy, load balancing, DR/BCP, failover.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}

