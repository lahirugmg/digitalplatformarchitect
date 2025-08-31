import Link from "next/link";

export const metadata = {
  title: "Solutions",
  description: "From patterns to platforms: business, solution, and deployment views with the right level of detail (L0–L3)."
};

export default function SolutionsPage() {
  return (
    <div className="container">
      <article className="solutions-article">
        <header className="solutions-header">
          <h1>Solutions: From Patterns to Platforms</h1>
          <p className="solutions-subtitle">
            Turning architecture patterns into real-world digital platforms requires more than just
            building blocks. It needs the right views—business, solution, and deployment—presented at
            the right level of detail (L0–L3) for each audience. This section shows how these
            perspectives connect so stakeholders, architects, and engineers collaborate effectively.
          </p>
          <nav className="solutions-toc" aria-label="Solutions navigation">
            <a href="#business-architecture" className="toc-link">Business Architecture</a>
            <a href="#solution-architecture" className="toc-link">Solution Architecture</a>
            <a href="#security-architecture" className="toc-link">Security Architecture</a>
            <a href="#deployment-architecture" className="toc-link">Deployment Architecture</a>
            <a href="#other-considerations" className="toc-link">Other Considerations</a>
            <a href="#how-it-connects" className="toc-link">How It Connects</a>
          </nav>
        </header>

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
                  <div className="consideration-icon">🛡️</div>
                  <h3>Security Architecture</h3>
                  <p>Comprehensive security across all layers and components.</p>
                  <ul className="consideration-details">
                    <li><strong>Identity:</strong> OAuth2, OIDC, SAML</li>
                    <li><strong>Protection:</strong> WAF, rate limiting, schema enforcement</li>
                    <li><strong>Compliance:</strong> GDPR, HIPAA, PCI</li>
                    <li><strong>Zero-trust:</strong> Across users, devices, workloads, data</li>
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

        <section id="conclusion" className="solutions-section">
          <div className="conclusion-card">
            <div className="conclusion-content">
              <h2>Conclusion</h2>
              <p>
                Great architecture speaks to the right audience at the right level. By combining patterns
                with building blocks, and progressing from Business L0 through Deployment L3, organizations
                create platforms that are understandable, secure, operable—and deliver measurable value.
              </p>
              
              <div className="conclusion-actions">
                <Link href="/patterns" className="button primary">Explore Patterns</Link>
                <Link href="/blocks" className="button secondary">Browse Building Blocks</Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
