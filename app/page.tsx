import Link from "next/link";
import { CTA } from "@/components/CTA";
import { blockList } from "@/lib/blocks";
import { patternList } from "@/lib/patterns";
import { PatternCard } from "@/components/PatternCard";
import { ConnectionsExplorer } from "@/components/ConnectionsExplorer";
import { DigitalPlatformDiagram } from "@/components/diagrams/DigitalPlatformDiagram";

function ArchitectureJourneyStep({ 
  stepNumber, 
  title, 
  description, 
  keyPoints, 
  ctaText, 
  ctaLink,
  phase 
}: {
  stepNumber: number;
  title: string;
  description: string;
  keyPoints: string[];
  ctaText: string;
  ctaLink: string;
  phase: string;
}) {
  return (
    <div className="journey-step-sleek">
      <div className="step-indicator">
        <div className="step-number-sleek">{stepNumber}</div>
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
  return (
    <div className="stack gap-2xl">
      <section className="hero stack gap-lg">
        <h1 className="title">Master Digital Platform Architecture</h1>
        <p className="lede">Platform architecture from patterns to production — visual guides and blueprints.</p>
      </section>

      <section className="stack gap-lg">
        <div className="stack gap-sm">
          <h2 className="section-title">Digital Platform Architecture</h2>
          <p className="lede" style={{ marginTop: '0' }}>
            Visual overview of the core building blocks that form a modern digital platform.
          </p>
        </div>
        <div className="diagram-container">
          <DigitalPlatformDiagram />
        </div>
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
            description="Understand organizational requirements, map business capabilities, and define strategic principles that guide all architectural decisions."
            keyPoints={["Capability Mapping", "Value Streams", "Business Alignment", "Strategic Goals"]}
            ctaText="Explore Business Context"
            ctaLink="/story#business-architecture"
          />

          <ArchitectureJourneyStep
            stepNumber={2}
            title="Solution Architecture"
            phase="Design"
            description="Select and combine architecture patterns to create cohesive solutions that meet business requirements and technical constraints."
            keyPoints={["Pattern Selection", "System Boundaries", "Integration Design", "Quality Attributes"]}
            ctaText="Discover Patterns"
            ctaLink="/patterns"
          />

          <ArchitectureJourneyStep
            stepNumber={3}
            title="Security Architecture"
            phase="Security"
            description="Design comprehensive security controls covering access management, threat protection, data encryption, and regulatory compliance requirements."
            keyPoints={["Identity Management", "OAuth2/SAML/JWT", "Threat Protection", "GDPR/HIPAA Compliance"]}
            ctaText="Security Patterns"
            ctaLink="/patterns#security"
          />

          <ArchitectureJourneyStep
            stepNumber={4}
            title="Platform Building Blocks"
            phase="Implementation"
            description="Implement patterns using concrete technologies and platform capabilities that provide the foundation for scalable systems."
            keyPoints={["Messaging Platforms", "API Management", "Identity Systems", "Observability"]}
            ctaText="Explore Building Blocks"
            ctaLink="/blocks"
          />

          <ArchitectureJourneyStep
            stepNumber={5}
            title="Deployment Architecture"
            phase="Operations"
            description="Define deployment strategies, infrastructure requirements, and operational models for production-ready platforms."
            keyPoints={["Infrastructure as Code", "Container Orchestration", "CI/CD Pipelines", "Monitoring"]}
            ctaText="View Blueprints"
            ctaLink="/blueprints"
          />
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

      <CTA />
    </div>
  );
}
