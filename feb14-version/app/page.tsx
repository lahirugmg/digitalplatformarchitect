import Link from "next/link";
import { CTA } from "@/components/CTA";
import { blockList } from "@/lib/blocks";
import { patternList } from "@/lib/patterns";
import { PatternCard } from "@/components/PatternCard";
import { ConnectionsExplorer } from "@/components/ConnectionsExplorer";
import { DigitalPlatformDiagram } from "@/components/diagrams/DigitalPlatformDiagram";
import { DiagramZoom } from "@/components/DiagramZoom";
import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";
import { getFeaturedArticles } from "@/lib/articles";

function ArchitectureJourneyStep({ 
  stepNumber, 
  title, 
  description, 
  keyPoints, 
  ctaText, 
  ctaLink,
  phase,
  icon 
}: {
  stepNumber: number;
  title: string;
  description: string;
  keyPoints: string[];
  ctaText: string;
  ctaLink: string;
  phase: string;
  icon?: string;
}) {
  return (
    <div className="journey-step-sleek">
      <div className="step-indicator">
        <div className="step-number-sleek">{stepNumber}</div>
        {icon && <div className="step-icon-sleek">{icon}</div>}
        <div className="step-phase">{phase}</div>
      </div>
      <div className="step-content-sleek">
        <h3 className="step-title-sleek">{title}</h3>
        <p className="step-description-sleek">{description}</p>
        <div className="step-keypoints">
          {keyPoints.map((point, idx) => (
            <span key={idx} className="keypoint-tag">{point}</span>
          ))}
        </div>
        <Link href={ctaLink} className="step-cta-sleek">{ctaText}</Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();
  
  return (
    <div className="home-layout">
      <aside className="left-rail">
        <div className="tools-rail">
          <div className="tools-rail-header">
            <div className="tools-rail-title">Tools</div>
            <div className="tools-rail-subtitle">Plan, size, and design</div>
          </div>
          <nav className="tools-rail-list">
            <Link href="/tools/capacity-planner" className="tools-rail-item">
              <span className="tools-rail-icon">📊</span>
              <span className="tools-rail-text">
                <span className="tools-rail-item-title">Capacity Planning Calculator</span>
                <span className="tools-rail-item-desc">Estimate nodes and throughput</span>
              </span>
              <span className="tools-rail-arrow">→</span>
            </Link>
            <Link href="/tools/architecture-documentation" className="tools-rail-item">
              <span className="tools-rail-icon">🧭</span>
              <span className="tools-rail-text">
                <span className="tools-rail-item-title">Architecture Documentation</span>
                <span className="tools-rail-item-desc">Interactive Architecture Docs</span>
              </span>
              <span className="tools-rail-arrow">→</span>
            </Link>
            {/* Removed Architecture Pattern Selector and Architecture Builder from tools rail */}
          </nav>
        </div>
      </aside>

      <div className="home-main stack gap-2xl">
      <section className="hero stack gap-lg">
        <h1 className="title">Master Digital Platform Architecture</h1>
        <p className="lede">Digital platform architects identify the essential technical <Link href="/blocks" className="hl hl-blocks">building blocks</Link> and align them with the right <Link href="/patterns" className="hl hl-patterns">architectural patterns</Link> — creating robust, scalable, future‑ready platforms. The ultimate outcome is delivering <Link href="/solution" className="hl hl-solutions">solutions</Link> that tackle real business challenges and generate measurable value.</p>
      </section>

      <section className="stack gap-lg">
        <div className="stack gap-sm">
          <h2 className="section-title">Digital Platform Building Blocks</h2>
        </div>
        <DiagramZoom title="Digital Platform Building Blocks">
          <DigitalPlatformDiagram />
        </DiagramZoom>
      </section>

      <section className="patterns-showcase">
        <div className="stack gap-sm" style={{marginBottom: '1rem'}}>
          <h2 className="section-title centered blue">Explore Architecture Documentation Layers</h2>
          <p className="section-description">Start at L0 conceptual view, then zoom into L1/L2/L3 to reveal products, protocols, and deployments.</p>
        </div>
        <ArchitectureExplorer />
      </section>

      <section className="patterns-showcase">
        <div className="patterns-header">
          <h2 className="section-title centered">Architecture Patterns</h2>
          <p className="section-description">
            Visual guides to proven architectural approaches. Each pattern includes interactive 
            diagrams showing structure, components, and key relationships.
          </p>
        </div>
        <div className="patterns-grid">
          {patternList.slice(0, 6).map((p) => (
            <PatternCard key={p.slug} pattern={p} />
          ))}
        </div>
        <div className="patterns-cta">
          <Link href="/patterns" className="button accent">View All Patterns</Link>
        </div>
      </section>

      <section className="architecture-journey-sleek">
        <div className="journey-header-sleek">
          <h2 className="section-title centered">Architecture Journey</h2>
          <p className="section-description">
            Transform business requirements into secure, production-ready platforms through a structured, 
            proven methodology. Each phase builds upon the previous: Business Architecture → Solution Architecture → Security Architecture → Platform Building Blocks → Deployment Architecture.
          </p>
        </div>

        <div className="journey-flow-sleek">
          <ArchitectureJourneyStep
            stepNumber={1}
            title="Business Architecture"
            phase="Foundation"
            icon="🏢"
            description="Understand organizational requirements, map business capabilities, and define strategic principles that guide all architectural decisions."
            keyPoints={["Capability Mapping", "Value Streams", "Business Alignment", "Strategic Goals"]}
            ctaText="Explore Business Context"
            ctaLink="/story#business-architecture"
          />

          <ArchitectureJourneyStep
            stepNumber={2}
            title="Solution Architecture"
            phase="Design"
            icon="🎯"
            description="Select and combine architecture patterns to create cohesive solutions that meet business requirements and technical constraints."
            keyPoints={["Pattern Selection", "System Boundaries", "Integration Design", "Quality Attributes"]}
            ctaText="Discover Patterns"
            ctaLink="/patterns"
          />

          <ArchitectureJourneyStep
            stepNumber={3}
            title="Security Architecture"
            phase="Security"
            icon="🔒"
            description="Design comprehensive security controls covering access management, threat protection, data encryption, and regulatory compliance requirements."
            keyPoints={["Identity Management", "OAuth2/SAML/JWT", "Threat Protection", "GDPR/HIPAA Compliance"]}
            ctaText="Security Patterns"
            ctaLink="/patterns#security"
          />

          <ArchitectureJourneyStep
            stepNumber={4}
            title="Platform Building Blocks"
            phase="Implementation"
            icon="🧱"
            description="Implement patterns using concrete technologies and platform capabilities that provide the foundation for scalable systems."
            keyPoints={["Messaging Platforms", "API Management", "Identity Systems", "Observability"]}
            ctaText="Explore Building Blocks"
            ctaLink="/blocks"
          />

          <ArchitectureJourneyStep
            stepNumber={5}
            title="Deployment Architecture"
            phase="Operations"
            icon="🚀"
            description="Define deployment strategies, infrastructure requirements, and operational models for production-ready platforms."
            keyPoints={["Infrastructure as Code", "Container Orchestration", "CI/CD Pipelines", "Monitoring"]}
            ctaText="View Blueprints"
            ctaLink="/blueprints"
          />
        </div>
      </section>

      <section className="tools-showcase">
        <div className="tools-header">
          <h2 className="section-title">Platform Tools</h2>
          <p className="section-description">
            Interactive calculators and planning tools to size, design, and optimize your digital platform architecture.
          </p>
        </div>
        
        <div className="tools-grid">
          <Link href="/tools/capacity-planner" className="tool-card featured">
            <div className="tool-header">
              <div className="tool-icon">📊</div>
              <div className="tool-meta">
                <h3 className="tool-title">Capacity Planning Calculator</h3>
                <div className="tool-badges">
                  <span className="tool-badge new">New</span>
                  <span className="tool-badge popular">Popular</span>
                </div>
              </div>
            </div>
            
            <p className="tool-description">
              Calculate infrastructure requirements, performance characteristics, and scaling needs for your API management platform.
            </p>
            
            <div className="tool-features">
              <div className="tool-feature">
                <span className="feature-icon">⚡</span>
                <span>Performance Sizing</span>
              </div>
              <div className="tool-feature">
                <span className="feature-icon">📈</span>
                <span>Traffic Modeling</span>
              </div>
              <div className="tool-feature">
                <span className="feature-icon">💰</span>
                <span>Cost Estimation</span>
              </div>
            </div>
            
            <div className="tool-cta">
              <span className="cta-text">Start Planning</span>
              <span className="cta-arrow">→</span>
            </div>
          </Link>
          
          <Link href="/tools/architecture-documentation" className="tool-card">
            <div className="tool-header">
              <div className="tool-icon">🧭</div>
              <div className="tool-meta">
                <h3 className="tool-title">Architecture Documentation</h3>
                <div className="tool-badges">
                  <span className="tool-badge new">New</span>
                </div>
              </div>
            </div>
            <p className="tool-description">
              Browse documentation across Business, Solution, and Deployment views. Toggle roles and levels.
            </p>
            <div className="tool-features">
              <div className="tool-feature"><span className="feature-icon">📐</span><span>Layered Views (L0–L3)</span></div>
              <div className="tool-feature"><span className="feature-icon">🧩</span><span>Role Presets</span></div>
              <div className="tool-feature"><span className="feature-icon">🗺️</span><span>Zoom & Pan</span></div>
            </div>
            <div className="tool-cta">
              <span className="cta-text">Open Documentation</span>
              <span className="cta-arrow">→</span>
            </div>
          </Link>
          
          {/* Removed Architecture Builder card from tools grid */}
          
          <div className="tool-card coming-soon">
            <div className="tool-header">
              <div className="tool-icon">🔐</div>
              <div className="tool-meta">
                <h3 className="tool-title">Security Assessment Matrix</h3>
                <div className="tool-badges">
                  <span className="tool-badge coming-soon">Coming Soon</span>
                </div>
              </div>
            </div>
            
            <p className="tool-description">
              Evaluate security requirements and generate compliance checklists for enterprise platforms.
            </p>
            
            <div className="tool-features">
              <div className="tool-feature">
                <span className="feature-icon">🛡️</span>
                <span>Security Audit</span>
              </div>
              <div className="tool-feature">
                <span className="feature-icon">📋</span>
                <span>Compliance Check</span>
              </div>
              <div className="tool-feature">
                <span className="feature-icon">🎯</span>
                <span>Risk Assessment</span>
              </div>
            </div>
            
            <div className="tool-cta disabled">
              <span className="cta-text">Coming Soon</span>
            </div>
          </div>
          
          {/* Removed Architecture Pattern Selector card from tools grid */}
        </div>
      </section>

      <section className="stack gap-lg">
        <div className="stack gap-sm">
          <h2 className="section-title">Explore by Focus Area</h2>
          <p className="lede" style={{ marginTop: '0' }}>
            Dive deeper into specific aspects of platform architecture based on your current needs.
          </p>
        </div>
        
        <div className="focus-areas">
          <div className="focus-area-grid">
            <Link href="/patterns" className="focus-area-card patterns-focus">
              <div className="focus-icon">📐</div>
              <h3>Architecture Patterns</h3>
              <p>Proven approaches for structuring systems: microservices, event-driven, layered, and more.</p>
              <div className="focus-preview">
                <div className="pattern-mini-grid">
                  {patternList.slice(0, 3).map((p) => (
                    <div key={p.slug} className="pattern-mini-card">
                      <span>{p.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>

            <Link href="/blocks" className="focus-area-card blocks-focus">
              <div className="focus-icon">🔧</div>
              <h3>Platform Building Blocks</h3>
              <p>Core technologies and capabilities that power modern enterprise platforms.</p>
              <div className="focus-preview">
                <div className="block-mini-list">
                  {blockList.slice(0, 3).map((b) => (
                    <div key={b.slug} className="block-mini-item">• {b.title}</div>
                  ))}
                </div>
              </div>
            </Link>

            <Link href="/story" className="focus-area-card story-focus">
              <div className="focus-icon">📖</div>
              <h3>Real-World Story</h3>
              <p>Follow a complete journey from business challenge to platform implementation.</p>
              <div className="focus-preview">
                <div className="story-mini-timeline">
                  <div className="story-mini-step">Business Challenge</div>
                  <div className="story-mini-arrow">→</div>
                  <div className="story-mini-step">Architecture Solution</div>
                  <div className="story-mini-arrow">→</div>
                  <div className="story-mini-step">Results</div>
                </div>
              </div>
            </Link>

            <Link href="/blueprints" className="focus-area-card blueprints-focus">
              <div className="focus-icon">🏗️</div>
              <h3>Deployment Blueprints</h3>
              <p>Concrete implementation guides from business goals to production deployment.</p>
              <div className="focus-preview">
                <div className="blueprint-mini-stack">
                  <div className="blueprint-layer">Business Goals</div>
                  <div className="blueprint-layer">Logical Architecture</div>
                  <div className="blueprint-layer">Deployment Architecture</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="stack gap-lg">
        <ConnectionsExplorer />
      </section>

      {featuredArticles.length > 0 && (
        <section className="articles-teaser">
          <div className="articles-header">
            <h2 className="section-title centered">Latest Articles</h2>
            <p className="section-description">
              In-depth articles on platform architecture, best practices, and real-world case studies.
            </p>
          </div>
          <div className="articles-preview-grid">
            {featuredArticles.map((article) => (
              <article key={article.slug} className="article-preview-card">
                <div className="article-meta">
                  <time dateTime={article.publishedAt} className="article-date">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="article-reading-time">{article.readingTime} min read</span>
                </div>
                
                <header>
                  <h3 className="article-title">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="article-summary">{article.summary}</p>
                </header>
                
                <footer className="article-footer">
                  <div className="article-author">
                    <span className="author-name">{article.author.name}</span>
                  </div>
                  <div className="article-tags">
                    {article.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="article-tag-preview">
                        {tag}
                      </span>
                    ))}
                  </div>
                </footer>
              </article>
            ))}
          </div>
          <div className="articles-cta">
            <Link href="/articles" className="button accent">View All Articles</Link>
          </div>
        </section>
      )}

      <CTA />
      </div>
    </div>
  );
}
