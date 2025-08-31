import Link from "next/link";

export const metadata = {
  title: "Solutions",
  description: "From patterns to platforms: business, solution, and deployment views with the right level of detail (L0–L3)."
};

export default function SolutionsPage() {
  return (
    <div className="container">
      <article className="solutions-article">
        <header className="page-hero stack gap-sm">
          <h1 className="page-title">Solutions: From Patterns to Platforms</h1>
          <p className="lede">
            Turning architecture patterns into real-world digital platforms requires more than just
            building blocks. It needs the right views—business, solution, and deployment—presented at
            the right level of detail (L0–L3) for each audience. This section shows how these
            perspectives connect so stakeholders, architects, and engineers collaborate effectively.
          </p>
          <nav className="solutions-toc" aria-label="Solutions navigation">
            <a href="#audience-roles" className="toc-link">Audience & Roles</a>
            <a href="#business-architecture" className="toc-link">Business Architecture</a>
            <a href="#solution-architecture" className="toc-link">Solution Architecture</a>
            <a href="#security-architecture" className="toc-link">Security Architecture</a>
            <a href="#deployment-architecture" className="toc-link">Deployment Architecture</a>
            <a href="#other-considerations" className="toc-link">Other Considerations</a>
            <a href="#how-it-connects" className="toc-link">How It Connects</a>
          </nav>
        </header>

        <section id="audience-roles" className="solutions-section">
          <div className="section-card roles-card">
            <div className="section-header">
              <div className="section-icon">👥</div>
              <h2>Audience & Roles</h2>
            </div>
            <div className="section-content">
              <p className="section-description">
                These views serve different stakeholders at the right level of detail, from business intent to operational reality.
              </p>
              <div className="content-grid">
                <div className="content-block">
                  <h3>Business Stakeholders</h3>
                  <ul className="feature-list">
                    <li><span className="bullet">🏢</span> Understand how an application interacts with other applications in their domain</li>
                    <li><span className="bullet">🧭</span> Focus on value, capabilities, KPIs (use Business Architecture L0/L1)</li>
                  </ul>
                </div>
                <div className="content-block">
                  <h3>Architecture Review Board / Design Authority</h3>
                  <ul className="feature-list">
                    <li><span className="bullet">✅</span> Validate conformance to standards and guidelines</li>
                    <li><span className="bullet">🛡️</span> Review patterns, security, governance, NFRs (Solution/Deployment L1/L2)</li>
                  </ul>
                </div>
                <div className="content-block">
                  <h3>Software Engineering Leaders</h3>
                  <ul className="feature-list">
                    <li><span className="bullet">🎯</span> Assess how the solution addresses the problem and the trade‑offs</li>
                    <li><span className="bullet">🧩</span> Plan dependencies, staffing, and risks (Solution Architecture L1/L2)</li>
                  </ul>
                </div>
                <div className="content-block">
                  <h3>Software Engineers</h3>
                  <ul className="feature-list">
                    <li><span className="bullet">🛠️</span> Build or evolve applications with clear interfaces and flows</li>
                    <li><span className="bullet">📐</span> Use contracts, sequences, templates, golden paths (Solution L2 / Deployment L2/L3)</li>
                  </ul>
                </div>
                <div className="content-block">
                  <h3>Operations Engineers</h3>
                  <ul className="feature-list">
                    <li><span className="bullet">⚙️</span> Understand runtime topology to diagnose and resolve issues</li>
                    <li><span className="bullet">📊</span> Use environments, SLOs, telemetry, networking, runbooks (Deployment L2/L3)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="business-architecture" className="solutions-section">
          <div className="section-card business-card">
            <div className="section-header">
              <div className="section-icon">🏢</div>
              <h2>Business Architecture</h2>
            </div>
            <div className="section-content">
              <p className="section-description">
                Focuses on intent and outcomes, not technical implementation. It clarifies the value a
                platform must deliver and aligns technical decisions with business goals.
              </p>
              
              <div className="content-grid">
                <div className="content-block">
                  <h3>Key Elements</h3>
                  <ul className="feature-list">
                    <li><span className="bullet">🎯</span> Goals and KPIs (time‑to‑market, customer experience, compliance)</li>
                    <li><span className="bullet">👥</span> Stakeholders and user groups</li>
                    <li><span className="bullet">⚡</span> Capabilities and journeys that create value</li>
                    <li><span className="bullet">🔧</span> Existing systems and constraints</li>
                    <li><span className="bullet">🛡️</span> Non‑functional drivers (regulatory, privacy, SLAs)</li>
                  </ul>
                </div>
                
                <div className="content-block">
                  <h3>Example Progression</h3>
                  <div className="progression-steps">
                    <div className="step-item">
                      <div className="step-number">L0</div>
                      <div className="step-content">
                        <strong>Conceptual Level</strong>
                        <p>High‑level business units, interactions, goals (no technology references)</p>
                      </div>
                    </div>
                    <div className="step-item">
                      <div className="step-number">L1</div>
                      <div className="step-content">
                        <strong>High-Level Physical</strong>
                        <p>Introduce core systems (CRM, ERP, IdP) and high‑level interactions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solution-architecture" className="solutions-section">
          <div className="section-card solution-card">
            <div className="section-header">
              <div className="section-icon">🔧</div>
              <h2>Solution Architecture</h2>
            </div>
            <div className="section-content">
              <p className="section-description">
                Bridges business intent with technical design—showing how applications, services, and
                integrations come together to solve business problems.
              </p>
              
              <div className="content-grid">
                <div className="content-block">
                  <h3>Key Elements</h3>
                  <ul className="feature-list">
                    <li><span className="bullet">👥</span> Major business entities (customers, orders, payments)</li>
                    <li><span className="bullet">⚙️</span> Core solution components (API gateway, identity, integration layer)</li>
                    <li><span className="bullet">🔄</span> Integration patterns (REST vs. events, sync vs. async)</li>
                    <li><span className="bullet">📋</span> Standards and protocols (HTTP, OAuth2, OIDC, SAML)</li>
                    <li><span className="bullet">🛡️</span> Cross‑cutting concerns (security, governance, observability)</li>
                    <li><span className="bullet">☁️</span> Runtime choices (cloud, on‑premises, hybrid)</li>
                  </ul>
                </div>
                
                <div className="content-block">
                  <h3>Architecture Layers</h3>
                  <div className="layer-diagram">
                    <div className="layer">
                      <div className="layer-name">Presentation</div>
                      <div className="layer-desc">APIs, Web Apps, Mobile Apps</div>
                    </div>
                    <div className="layer">
                      <div className="layer-name">Application</div>
                      <div className="layer-desc">Microservices, Business Logic</div>
                    </div>
                    <div className="layer">
                      <div className="layer-name">Data</div>
                      <div className="layer-desc">Databases, Caches, Event Stores</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="security-architecture" className="solutions-section">
          <div className="section-card security-card">
            <div className="section-header">
              <div className="section-icon">🔐</div>
              <h2>Security Architecture</h2>
            </div>
            <div className="section-content">
              <p className="section-description">
                Comprehensive security framework that protects applications, data, and infrastructure
                across all layers of the platform.
              </p>
              
              <div className="content-grid">
                <div className="content-block">
                  <h3>Security Layers</h3>
                  <ul className="feature-list">
                    <li><span className="bullet">👤</span> Identity & Access Management (OAuth2, OIDC, SAML)</li>
                    <li><span className="bullet">🛡️</span> Threat Protection (WAF, rate limiting, DDoS)</li>
                    <li><span className="bullet">🔒</span> Data Encryption (at rest, in transit, in use)</li>
                    <li><span className="bullet">📊</span> Security Monitoring & Logging</li>
                    <li><span className="bullet">🚫</span> Zero-Trust Architecture</li>
                    <li><span className="bullet">📋</span> Compliance & Governance</li>
                  </ul>
                </div>
                
                <div className="content-block">
                  <h3>Security Patterns</h3>
                  <div className="security-patterns">
                    <div className="security-pattern">
                      <div className="pattern-name">Defense in Depth</div>
                      <div className="pattern-desc">Multiple security layers working together</div>
                    </div>
                    <div className="security-pattern">
                      <div className="pattern-name">Least Privilege</div>
                      <div className="pattern-desc">Minimum access required for tasks</div>
                    </div>
                    <div className="security-pattern">
                      <div className="pattern-name">Fail-Safe Defaults</div>
                      <div className="pattern-desc">Secure by default, explicit allow</div>
                    </div>
                    <div className="security-pattern">
                      <div className="pattern-name">Secure by Design</div>
                      <div className="pattern-desc">Security built into architecture</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="security-framework">
                <h3>Security Framework Components</h3>
                <div className="framework-grid">
                  <div className="framework-item">
                    <div className="framework-icon">🔐</div>
                    <h4>Authentication</h4>
                    <p>Verify user identities and manage sessions</p>
                  </div>
                  <div className="framework-item">
                    <div className="framework-icon">🛡️</div>
                    <h4>Authorization</h4>
                    <p>Control access to resources and operations</p>
                  </div>
                  <div className="framework-item">
                    <div className="framework-icon">🔒</div>
                    <h4>Confidentiality</h4>
                    <p>Protect sensitive data from unauthorized access</p>
                  </div>
                  <div className="framework-item">
                    <div className="framework-icon">✅</div>
                    <h4>Integrity</h4>
                    <p>Ensure data accuracy and prevent tampering</p>
                  </div>
                  <div className="framework-item">
                    <div className="framework-icon">📊</div>
                    <h4>Auditability</h4>
                    <p>Track and log security-relevant events</p>
                  </div>
                  <div className="framework-item">
                    <div className="framework-icon">🚨</div>
                    <h4>Incident Response</h4>
                    <p>Detect, respond to, and recover from breaches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="deployment-architecture" className="solutions-section">
          <div className="section-card deployment-card">
            <div className="section-header">
              <div className="section-icon">🚀</div>
              <h2>Deployment Architecture</h2>
            </div>
            <div className="section-content">
              <p className="section-description">
                Describes operational reality—how the platform is hosted, scaled, and secured in different
                environments. Essential for DevOps and operations teams.
              </p>
              
              <div className="content-grid">
                <div className="content-block">
                  <h3>Infrastructure Elements</h3>
                  <ul className="feature-list">
                    <li><span className="bullet">🌐</span> Environments (dev, test, stage, prod)</li>
                    <li><span className="bullet">🏗️</span> Topology (clusters, nodes, namespaces)</li>
                    <li><span className="bullet">🔒</span> Network zones (DMZ, private subnets, VPNs)</li>
                    <li><span className="bullet">⚙️</span> Platform services (ingress, service mesh, secrets)</li>
                    <li><span className="bullet">🔄</span> HA/DR (replicas, failover, backups)</li>
                    <li><span className="bullet">🛡️</span> Security controls (WAF, mTLS, firewalls)</li>
                  </ul>
                </div>
                
                <div className="content-block">
                  <h3>Operational Excellence</h3>
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <div className="metric-value">99.9%</div>
                      <div className="metric-label">Uptime SLA</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value">&lt;200ms</div>
                      <div className="metric-label">Response Time</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value">24/7</div>
                      <div className="metric-label">Monitoring</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="other-considerations" className="solutions-section">
          <div className="section-card considerations-card">
            <div className="section-header">
              <div className="section-icon">🔍</div>
              <h2>Other Architectural Considerations</h2>
            </div>
            <div className="section-content">
              <div className="considerations-grid">
                <div className="consideration-item">
                  <div className="consideration-icon">🔄</div>
                  <h3>CI/CD Flow</h3>
                  <p>Define how code moves from commit to production with tools, stages, and automations.</p>
                  <ul className="consideration-details">
                    <li><strong>Tools:</strong> GitHub, GitLab, Jenkins, Azure DevOps</li>
                    <li><strong>Stages:</strong> Build, test, deploy</li>
                    <li><strong>Automations:</strong> Quality checks, container builds, rollbacks</li>
                  </ul>
                </div>
                
                <div className="consideration-item">
                  <div className="consideration-icon">�</div>
                  <h3>Observability & Monitoring</h3>
                  <p>Comprehensive visibility into system health, performance, and behavior.</p>
                  <ul className="consideration-details">
                    <li><strong>Metrics:</strong> Application and infrastructure monitoring</li>
                    <li><strong>Logging:</strong> Centralized log aggregation and analysis</li>
                    <li><strong>Tracing:</strong> Distributed request tracking</li>
                    <li><strong>Alerting:</strong> Proactive issue detection and notification</li>
                  </ul>
                </div>
                
                <div className="consideration-item">
                  <div className="consideration-icon">🏥</div>
                  <h3>Domain-Specific Views</h3>
                  <p>Industry-specific diagrams and considerations for specialized domains.</p>
                  <div className="domain-examples">
                    <span className="domain-tag">Healthcare</span>
                    <span className="domain-tag">Banking</span>
                    <span className="domain-tag">Telecom</span>
                    <span className="domain-tag">Retail</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-connects" className="solutions-section">
          <div className="connection-flow">
            <h2>How It All Connects</h2>
            <div className="flow-diagram">
              <div className="flow-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Start with Business (L0/L1)</h3>
                  <p>Define goals, value, capabilities, and stakeholder needs</p>
                </div>
              </div>
              
              <div className="flow-arrow">→</div>
              
              <div className="flow-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Move to Solution (L1/L2)</h3>
                  <p>Show how patterns and building blocks create the solution</p>
                </div>
              </div>
              
              <div className="flow-arrow">→</div>
              
              <div className="flow-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Refine with Details (L2)</h3>
                  <p>Add standards, security, and integration specifics</p>
                </div>
              </div>
              
              <div className="flow-arrow">→</div>
              
              <div className="flow-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Finalize Deployment (L2/L3)</h3>
                  <p>Document operations, scaling, and security measures</p>
                </div>
              </div>
            </div>
            
            <div className="connection-insight">
              <p>Each step builds on the last, ensuring traceability from business value to technical execution.</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
