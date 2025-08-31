import Link from "next/link";

export default function ArchitectureStoryPage() {
  return (
    <div className="container">
      <article className="prose story-article">
        <header className="story-header">
          <h1>From Patterns to Platform: An Architecture Journey</h1>
          <p className="story-subtitle">
            How business architecture, solution architecture, and technical architecture 
            collaborate to transform patterns into real-world digital platforms
          </p>
          <nav className="story-toc" aria-label="Story navigation">
            <a href="#business-challenge" className="toc-link">Challenge</a>
            <a href="#act-i" className="toc-link">Act I — Business</a>
            <a href="#act-ii" className="toc-link">Act II — Solution</a>
            <a href="#act-iii" className="toc-link">Act III — Technical</a>
            <a href="#transformation" className="toc-link">Transformation</a>
            <a href="#results" className="toc-link">Results</a>
            <a href="#insights" className="toc-link">Insights</a>
          </nav>
        </header>

        <section className="story-section" id="business-challenge">
          <div className="story-scenario">
            <h2>The Business Challenge</h2>
            <div className="scenario-card">
              <div className="company-info">
                <h3>RetailTech Solutions</h3>
                <p><strong>Business:</strong> Mid-size retail company expanding globally</p>
                <p><strong>Challenge:</strong> Legacy monolithic e-commerce platform can't scale</p>
                <p><strong>Goal:</strong> Build a modern digital platform for 10x growth</p>
              </div>
              
              <div className="pain-points">
                <h4>Current Pain Points:</h4>
                <ul>
                  <li>🐌 Slow feature delivery (6-month releases)</li>
                  <li>💔 System crashes during peak sales</li>
                  <li>🔄 Inventory sync issues across channels</li>
                  <li>👥 Teams blocked waiting for deployments</li>
                  <li>🌍 Can't support new regional requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section" id="act-i">
          <h2>Act I: Business Architecture Sets the Vision</h2>
          
          <div className="architecture-role business-arch">
            <div className="role-header">
              <h3>👔 Sarah - Business Architect</h3>
              <p className="role-description">Translates business strategy into architectural principles</p>
            </div>
            
            <div className="role-activities">
              <h4>What Sarah Does:</h4>
              <div className="activity-grid">
                <div className="activity">
                  <h5>📊 Capability Mapping</h5>
                  <p>Maps business capabilities: Customer Management, Order Processing, Inventory Management, Payment Processing</p>
                </div>
                <div className="activity">
                  <h5>🎯 Business Principles</h5>
                  <p>Defines: "Customer data is single source of truth", "Real-time inventory across channels", "Sub-second response times"</p>
                </div>
                <div className="activity">
                  <h5>🚀 Value Streams</h5>
                  <p>Identifies: Customer Onboarding, Order-to-Fulfillment, Product Discovery, Customer Service</p>
                </div>
              </div>
              
              <div className="sarah-insight">
                <p><em>"We need independent teams owning customer journey segments, with real-time data flow between them. 
                This points us toward <Link href="/patterns/microservice-architecture">microservices</Link> and 
                <Link href="/patterns/event-driven-architecture">event-driven patterns</Link>."</em></p>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section" id="act-ii">
          <h2>Act II: Solution Architecture Designs the Experience</h2>
          
          <div className="architecture-role solution-arch">
            <div className="role-header">
              <h3>🏗️ Marcus - Solution Architect</h3>
              <p className="role-description">Designs end-to-end solutions connecting business and technical domains</p>
            </div>
            
            <div className="role-activities">
              <h4>How Marcus Translates Vision to Solution:</h4>
              
              <div className="solution-design">
                <div className="pattern-selection">
                  <h5>🎨 Pattern Selection</h5>
                  <div className="pattern-choices">
                    <div className="pattern-choice">
                      <strong><Link href="/patterns/microservice-architecture">Microservice Architecture</Link></strong>
                      <p>✅ Independent team ownership of customer segments<br/>
                      ✅ Independent scaling and deployment<br/>
                      ✅ Technology diversity per domain</p>
                    </div>
                    <div className="pattern-choice">
                      <strong><Link href="/patterns/event-driven-architecture">Event-Driven Architecture</Link></strong>
                      <p>✅ Real-time inventory updates<br/>
                      ✅ Decoupled customer journey steps<br/>
                      ✅ Audit trail for compliance</p>
                    </div>
                    <div className="pattern-choice">
                      <strong><Link href="/patterns/hexagonal-architecture">Hexagonal Architecture</Link></strong>
                      <p>✅ Clean domain boundaries<br/>
                      ✅ Easy testing and maintenance<br/>
                      ✅ Legacy system integration</p>
                    </div>
                  </div>
                </div>

                <div className="solution-map">
                  <h5>🗺️ Solution Landscape</h5>
                  <div className="solution-services">
                    <div className="service-domain">
                      <h6>Customer Domain</h6>
                      <ul>
                        <li>User Service (authentication)</li>
                        <li>Profile Service (preferences)</li>
                        <li>Recommendation Service (personalization)</li>
                      </ul>
                    </div>
                    <div className="service-domain">
                      <h6>Commerce Domain</h6>
                      <ul>
                        <li>Catalog Service (products)</li>
                        <li>Cart Service (shopping session)</li>
                        <li>Order Service (order processing)</li>
                      </ul>
                    </div>
                    <div className="service-domain">
                      <h6>Fulfillment Domain</h6>
                      <ul>
                        <li>Inventory Service (stock management)</li>
                        <li>Payment Service (transactions)</li>
                        <li>Shipping Service (logistics)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="marcus-insight">
                <p><em>"Each service uses hexagonal architecture internally, they communicate via events, 
                and we'll need <Link href="/blocks/messaging-streaming-platform">messaging infrastructure</Link>, 
                <Link href="/blocks/api-management">API management</Link>, and 
                <Link href="/blocks/observability-operations">observability</Link> to make this work."</em></p>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section" id="act-iii">
          <h2>Act III: Technical Architecture Builds the Platform</h2>
          
          <div className="architecture-role technical-arch">
            <div className="role-header">
              <h3>⚙️ Alex - Technical Architect</h3>
              <p className="role-description">Implements patterns using concrete technologies and platform building blocks</p>
            </div>
            
            <div className="role-activities">
              <h4>How Alex Brings Patterns to Life:</h4>
              
              <div className="platform-implementation">
                <div className="building-blocks">
                  <h5>🧱 Platform Building Blocks Selection</h5>
                  <div className="blocks-grid">
                    <div className="block-selection">
                      <Link href="/blocks/messaging-streaming-platform"><strong>Messaging & Streaming</strong></Link>
                      <p>Apache Kafka for event streaming<br/>
                      Event sourcing for audit trails<br/>
                      Saga pattern for distributed transactions</p>
                    </div>
                    <div className="block-selection">
                      <Link href="/blocks/api-management"><strong>API Management</strong></Link>
                      <p>Kong Gateway for service mesh<br/>
                      Rate limiting and circuit breakers<br/>
                      Developer portal for internal APIs</p>
                    </div>
                    <div className="block-selection">
                      <Link href="/blocks/cloud-native-platform-services"><strong>Cloud-Native Platform</strong></Link>
                      <p>Kubernetes for container orchestration<br/>
                      Istio service mesh for security<br/>
                      GitOps with ArgoCD for deployments</p>
                    </div>
                    <div className="block-selection">
                      <Link href="/blocks/observability-operations"><strong>Observability</strong></Link>
                      <p>OpenTelemetry for distributed tracing<br/>
                      Prometheus + Grafana for metrics<br/>
                      ELK stack for centralized logging</p>
                    </div>
                  </div>
                </div>

                <div className="implementation-details">
                  <h5>🔧 Implementation Architecture</h5>
                  <div className="arch-layers">
                    <div className="arch-layer">
                      <h6>Edge Layer</h6>
                      <p>CDN + Load Balancer + API Gateway</p>
                    </div>
                    <div className="arch-layer">
                      <h6>Service Layer</h6>
                      <p>Microservices in containers with service mesh</p>
                    </div>
                    <div className="arch-layer">
                      <h6>Data Layer</h6>
                      <p>PostgreSQL + Redis + Event Store</p>
                    </div>
                    <div className="arch-layer">
                      <h6>Platform Layer</h6>
                      <p>K8s + Kafka + Monitoring + CI/CD</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="alex-insight">
                <p><em>"The patterns guide our structure, but the building blocks are what make it real. 
                Each service follows hexagonal architecture, Kafka handles our events, 
                and the platform provides the reliability and observability we need."</em></p>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section" id="transformation">
          <h2>The Transformation Journey</h2>
          
          <div className="journey-timeline">
            <div className="journey-phase">
              <h3>📋 Phase 1: Foundation (Months 1-3)</h3>
              <div className="phase-content">
                <p><strong>Focus:</strong> Platform building blocks and core services</p>
                <ul>
                  <li>Set up Kubernetes clusters and CI/CD pipelines</li>
                  <li>Deploy Kafka and establish event schemas</li>
                  <li>Build User Service and Auth Service (hexagonal architecture)</li>
                  <li>Implement API gateway and basic observability</li>
                </ul>
                <p className="pattern-connection">
                  <strong>Patterns in Action:</strong> <Link href="/patterns/hexagonal-architecture">Hexagonal architecture</Link> 
                  ensures clean service boundaries, while <Link href="/patterns/layered-architecture">layered architecture</Link> 
                  organizes the platform infrastructure.
                </p>
              </div>
            </div>

            <div className="journey-phase">
              <h3>🛒 Phase 2: Commerce Core (Months 4-6)</h3>
              <div className="phase-content">
                <p><strong>Focus:</strong> Event-driven commerce services</p>
                <ul>
                  <li>Deploy Catalog, Cart, and Order services</li>
                  <li>Implement event-driven inventory updates</li>
                  <li>Add payment processing with saga patterns</li>
                  <li>Real-time recommendation engine</li>
                </ul>
                <p className="pattern-connection">
                  <strong>Patterns in Action:</strong> <Link href="/patterns/event-driven-architecture">Event-driven architecture</Link> 
                  enables real-time inventory sync, while <Link href="/patterns/microservice-architecture">microservices</Link> 
                  allow independent team ownership.
                </p>
              </div>
            </div>

            <div className="journey-phase">
              <h3>🌍 Phase 3: Scale & Global (Months 7-12)</h3>
              <div className="phase-content">
                <p><strong>Focus:</strong> Global scaling and regional customization</p>
                <ul>
                  <li>Multi-region deployments with data locality</li>
                  <li>Advanced observability and chaos engineering</li>
                  <li>Regional customization services</li>
                  <li>Machine learning recommendation pipelines</li>
                </ul>
                <p className="pattern-connection">
                  <strong>Patterns in Action:</strong> <Link href="/patterns/pipes-and-filters">Pipes and filters</Link> 
                  power ML pipelines, while <Link href="/patterns/cqrs">CQRS</Link> optimizes read/write workloads 
                  across regions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section success-metrics" id="results">
          <h2>🎉 The Results</h2>
          
          <div className="results-grid">
            <div className="result-metric">
              <h3>🚀 Delivery Velocity</h3>
              <p className="metric">6 months → 2 weeks</p>
              <p>Feature delivery time reduced by 12x</p>
            </div>
            <div className="result-metric">
              <h3>📈 System Reliability</h3>
              <p className="metric">95% → 99.9%</p>
              <p>Uptime improved, no more peak crashes</p>
            </div>
            <div className="result-metric">
              <h3>⚡ Performance</h3>
              <p className="metric">3s → 200ms</p>
              <p>Page load times 15x faster</p>
            </div>
            <div className="result-metric">
              <h3>👥 Team Autonomy</h3>
              <p className="metric">1 team → 8 teams</p>
              <p>Independent deployment capability</p>
            </div>
          </div>

          <div className="architecture-value">
            <h3>The Architecture Value Chain</h3>
            <div className="value-flow">
              <div className="value-step">
                <strong>Business Architecture</strong>
                <p>Identified capability gaps and defined principles</p>
              </div>
              <div className="value-arrow">→</div>
              <div className="value-step">
                <strong>Solution Architecture</strong>
                <p>Selected patterns that align with business needs</p>
              </div>
              <div className="value-arrow">→</div>
              <div className="value-step">
                <strong>Technical Architecture</strong>
                <p>Implemented patterns using platform building blocks</p>
              </div>
              <div className="value-arrow">→</div>
              <div className="value-step">
                <strong>Business Outcomes</strong>
                <p>Achieved 10x growth capability and market expansion</p>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section key-insights" id="insights">
          <h2>🔍 Key Insights: Patterns to Platform</h2>
          
          <div className="insights-list">
            <div className="insight">
              <h4>1. Architecture Patterns Are Decision Frameworks</h4>
              <p>Patterns don't dictate technology choices—they provide structure for making decisions. 
              <Link href="/patterns/microservice-architecture">Microservices</Link> guided service boundaries, 
              but the team chose specific technologies based on their context.</p>
            </div>

            <div className="insight">
              <h4>2. Building Blocks Enable Patterns</h4>
              <p>You can't just "do microservices"—you need <Link href="/blocks/messaging-streaming-platform">messaging infrastructure</Link>, 
              <Link href="/blocks/api-management">API management</Link>, and 
              <Link href="/blocks/observability-operations">observability</Link> to make patterns work in production.</p>
            </div>

            <div className="insight">
              <h4>3. Patterns Work Together</h4>
              <p>Real systems combine multiple patterns. <Link href="/patterns/hexagonal-architecture">Hexagonal architecture</Link> 
              within services + <Link href="/patterns/event-driven-architecture">event-driven communication</Link> between services + 
              <Link href="/patterns/layered-architecture">layered platform infrastructure</Link> = success.</p>
            </div>

            <div className="insight">
              <h4>4. Architecture Roles Are Complementary</h4>
              <p>Business architects define the "what and why," solution architects design the "how," 
              and technical architects implement the "with what." Each perspective is essential.</p>
            </div>
          </div>
        </section>

        <section className="story-cta">
          <h2>Start Your Architecture Journey</h2>
          <p>Every successful digital platform starts with understanding patterns and building blocks. 
          Whether you're a business architect defining capabilities, a solution architect designing systems, 
          or a technical architect implementing platforms—the journey begins here.</p>
          
          <div className="story-nav">
            <Link href="/patterns" className="button accent">Explore Architecture Patterns</Link>
            <Link href="/blocks" className="button">Discover Building Blocks</Link>
            <Link href="/blueprints" className="button ghost">View Implementation Blueprints</Link>
          </div>
        </section>
      </article>
    </div>
  );
}
