import Link from "next/link";
import { patternList } from "@/lib/patterns";
import { EventDrivenDiagram } from "@/components/diagrams/EventDrivenDiagram";
import { LayeredArchitectureDiagram } from "@/components/diagrams/LayeredArchitectureDiagram";
import { MicroserviceDiagram } from "@/components/diagrams/MicroserviceDiagram";
import { HexagonalDiagram } from "@/components/diagrams/HexagonalDiagram";
import { MonolithicDiagram } from "@/components/diagrams/MonolithicDiagram";
import { ZeroTrustDiagram } from "@/components/diagrams/ZeroTrustDiagram";
import { OAuth2Diagram } from "@/components/diagrams/OAuth2Diagram";
import { APISecurityDiagram } from "@/components/diagrams/APISecurityDiagram";
import { DataEncryptionDiagram } from "@/components/diagrams/DataEncryptionDiagram";

export const metadata = {
  title: "Architecture Styles & Patterns",
  description:
    "Architecture styles and patterns: layered, microservices, event-driven, client-server, plugin-based, hexagonal, and more."
};

// Map pattern slugs to their corresponding diagrams
const patternDiagrams: Record<string, React.ComponentType> = {
  "event-driven-architecture": EventDrivenDiagram,
  "layered-architecture": LayeredArchitectureDiagram,
  "microservice-architecture": MicroserviceDiagram,
  "hexagonal-architecture": HexagonalDiagram,
  "monolithic": MonolithicDiagram,
  "zero-trust-security": ZeroTrustDiagram,
  "oauth2-patterns": OAuth2Diagram,
  "api-security-gateway": APISecurityDiagram,
  "data-encryption-patterns": DataEncryptionDiagram,
};

export default function PatternsIndexPage() {
  // Separate patterns with and without diagrams
  const patternsWithDiagrams = patternList.filter(p => patternDiagrams[p.slug]);
  const patternsWithoutDiagrams = patternList.filter(p => !patternDiagrams[p.slug]);

  return (
    <div className="container">
      <article className="patterns-article">
        <header className="patterns-header">
          <h1>Architecture Styles & Patterns</h1>
          <p className="patterns-subtitle">
            Explore common architecture styles and patterns, their trade-offs, and when to use them.
            Visual diagrams help you understand structure and relationships.
          </p>
        </header>

        {/* Featured Patterns with Diagrams */}
        <section className="patterns-section">
          <div className="section-header">
            <div className="section-icon">📐</div>
            <h2>Featured Patterns with Visual Diagrams</h2>
          </div>
          <div className="patterns-with-diagrams">
            {patternsWithDiagrams.map((p) => {
            const DiagramComponent = patternDiagrams[p.slug];
            return (
              <div key={p.slug} className="pattern-with-diagram">
                <div className="pattern-info">
                  <Link href={`/patterns/${p.slug}`} className="pattern-link">
                    <h3>{p.title}</h3>
                    {p.aka && p.aka.length > 0 && (
                      <div className="aka-tags">
                        {p.aka.map(alias => (
                          <span key={alias} className="aka-tag">aka {alias}</span>
                        ))}
                      </div>
                    )}
                  </Link>
                  <p>{p.summary}</p>
                  <div className="pattern-keywords">
                    {p.keywords.slice(0, 4).map(k => (
                      <span key={k} className="keyword-tag">{k}</span>
                    ))}
                  </div>
                  <Link href={`/patterns/${p.slug}`} className="pattern-cta">
                    Explore Pattern Details →
                  </Link>
                </div>
                <div className="pattern-diagram">
                  <DiagramComponent />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Other Patterns */}
      {patternsWithoutDiagrams.length > 0 && (
        <section className="stack gap-md">
          <h2 className="section-title centered blue">Additional Architecture Patterns</h2>
          <div className="card-grid">
            {patternsWithoutDiagrams.map((p) => (
              <Link key={p.slug} href={`/patterns/${p.slug}`} className="card enhanced-card">
                <div className="card-header">
                  <h3>{p.title}</h3>
                  {p.aka && p.aka.length > 0 && (
                    <div className="aka-tags">
                      {p.aka.map(alias => (
                        <span key={alias} className="aka-tag">aka {alias}</span>
                      ))}
                    </div>
                  )}
                </div>
                <p>{p.summary}</p>
                <div className="card-keywords">
                  {p.keywords.slice(0, 4).map(k => (
                    <span key={k} className="keyword-tag">{k}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <span className="card-link-text">See implementation details →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Learning Guide */}
      <section className="stack gap-md" style={{marginTop: '2rem'}}>
        <h2 className="section-title centered blue">Understanding Architectural Patterns</h2>
        <div className="guide-grid">
          <div className="guide-card">
            <h3>🏗️ Structural Patterns</h3>
            <p>Focus on how components are organized and layered. Examples: Layered, Hexagonal, Clean Architecture.</p>
          </div>
          <div className="guide-card">
            <h3>🚀 Distribution Patterns</h3>
            <p>Address how to split systems across services and processes. Examples: Microservices, SOA, Event-Driven.</p>
          </div>
          <div className="guide-card">
            <h3>🔐 Security Patterns</h3>
            <p>Provide proven approaches for securing systems and data. Examples: Zero-Trust, OAuth2, API Security.</p>
          </div>
          <div className="guide-card">
            <h3>📊 Data Patterns</h3>
            <p>Handle information flow and storage strategies. Examples: CQRS, Event Sourcing, Data Mesh.</p>
          </div>
        </div>
        
        <div className="pattern-selection-tips">
          <h3>Choosing the Right Pattern</h3>
          <ul>
            <li><strong>Consider your context:</strong> Team size, domain complexity, and organizational constraints</li>
            <li><strong>Understand trade-offs:</strong> Every pattern comes with benefits and costs</li>
            <li><strong>Start simple:</strong> Begin with proven patterns and evolve as needed</li>
            <li><strong>Combine patterns:</strong> Most real systems use multiple patterns together</li>
          </ul>
        </div>
      </section>
    </article>
    </div>
  );
}
