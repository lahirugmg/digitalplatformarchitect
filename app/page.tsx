import Link from "next/link";
import { CTA } from "@/components/CTA";
import { blockList } from "@/lib/blocks";
import { BlockCard } from "@/components/BlockCard";
import { patternList } from "@/lib/patterns";
import { PatternCard } from "@/components/PatternCard";
import { ConnectionsExplorer } from "@/components/ConnectionsExplorer";

export default function HomePage() {
  return (
    <div className="stack gap-2xl">
      <section className="hero stack gap-lg">
        <h1 className="title">Master Digital Platform Architecture</h1>
        <p className="lede">
          Explore proven architectural patterns and the platform building blocks that enable them. 
          Learn when and how to apply microservices, event-driven, layered, and other patterns 
          in your enterprise systems.
        </p>
        <div className="cta">
          <Link href="/patterns" className="button accent sm">Explore Patterns</Link>
          <Link href="/blocks" className="button ghost sm">Platform Building Blocks</Link>
        </div>
      </section>

      <section className="stack gap-lg">
        <div className="stack gap-sm">
          <h2 className="section-title">Architecture Patterns</h2>
          <p className="lede" style={{ marginTop: '0' }}>
            Proven architectural approaches with visual diagrams showing their structure, 
            components, and interactions. Understand the trade-offs and when to apply each pattern.
          </p>
        </div>
        <div className="card-grid featured">
          {patternList.slice(0, 6).map((p) => (
            <PatternCard key={p.slug} pattern={p} />
          ))}
        </div>
        <div>
          <Link href="/patterns" className="button accent" aria-label="View all patterns">View All Patterns</Link>
        </div>
      </section>

      <section className="stack gap-lg">
        <div className="stack gap-sm">
          <h2 className="section-title">From Patterns to Platform Building Blocks</h2>
          <p className="lede" style={{ marginTop: '0' }}>
            Architecture patterns describe how to structure systems, while platform building blocks 
            provide the concrete technologies and capabilities that enable these patterns. 
            Explore the connections between them.
          </p>
        </div>
        <ConnectionsExplorer />
      </section>

      <section className="stack gap-lg">
        <div className="stack gap-sm">
          <h2 className="section-title">Platform Building Blocks</h2>
          <p className="lede" style={{ marginTop: '0' }}>
            The foundational platform capabilities that power modern enterprise systems.
          </p>
        </div>
        <div className="card-grid">
          {blockList.slice(0, 6).map((b) => (
            <BlockCard key={b.slug} block={b} />
          ))}
        </div>
        <div>
          <Link href="/blocks" className="button" aria-label="View all building blocks">View All Building Blocks</Link>
        </div>
      </section>

      <section className="stack gap-lg">
        <div className="stack gap-sm">
          <h2 className="section-title">Learn & Resources</h2>
          <p className="lede" style={{ marginTop: '0' }}>
            Structured guides and reference materials for platform architecture.
          </p>
        </div>
        <div className="card-grid">
          <Link href="/story" className="card">
            <h2>Architecture Story</h2>
            <p>Follow a real-world journey from business challenge to platform implementation.</p>
          </Link>
          <Link href="/blueprints" className="card">
            <h2>Blueprints</h2>
            <p>From business goals to deployment. Start with WSO2.</p>
          </Link>
          <Link href="/learn" className="card">
            <h2>Learning Paths</h2>
            <p>Structured guides to master platform architecture concepts and practices.</p>
          </Link>
          <Link href="/resources" className="card">
            <h2>Reference Materials</h2>
            <p>Capability maps, patterns, and decision guides for platform design.</p>
          </Link>
        </div>
      </section>

      <CTA />
    </div>
  );
}
