import Link from "next/link";
import { CTA } from "@/components/CTA";
import { blockList } from "@/lib/blocks";
import { BlockCard } from "@/components/BlockCard";
import { patternList } from "@/lib/patterns";
import { PatternCard } from "@/components/PatternCard";

export default function HomePage() {
  return (
    <div className="stack gap-lg">
      <section className="hero stack gap-md">
        <h1 className="title">Master Digital Platform Architecture</h1>
        <p className="lede">
          Explore the essential building blocks of modern enterprise platforms —
          from reliable messaging and high‑throughput streaming to API
          management, IAM and developer platforms, plus data platforms,
          observability, security services, and cloud‑native platform
          capabilities.
        </p>
        <div className="cta">
          <Link href="/blocks" className="button primary">Dive into Building Blocks</Link>
          <Link href="/learn" className="button">Start Learning</Link>
        </div>
      </section>

      <section className="stack gap-md">
        <h2 className="section-title">Building Blocks</h2>
        <p className="lede" style={{ marginTop: '-0.5rem' }}>
          The foundational technologies powering scalable, resilient enterprise systems.
        </p>
        <div className="card-grid featured">
          {blockList.map((b) => (
            <BlockCard key={b.slug} block={b} />
          ))}
        </div>
      </section>

      <section className="stack gap-md">
        <h2 className="section-title">Architectural Patterns</h2>
        <div className="card-grid">
          {patternList.slice(0, 4).map((p) => (
            <PatternCard key={p.slug} pattern={p} />
          ))}
        </div>
        <div>
          <Link href="/patterns" className="button" aria-label="View all patterns">Explore All Patterns</Link>
        </div>
      </section>

      <section className="stack gap-md">
        <h2 className="section-title">Learn & Resources</h2>
        <div className="card-grid">
          <Link href="/learn" className="card">
            <h2>Learning Paths</h2>
            <p>Structured guides to master platform architecture concepts and practices.</p>
          </Link>
          <Link href="/resources" className="card">
            <h2>Reference Materials</h2>
            <p>Capability maps, patterns, and decision guides for platform design.</p>
          </Link>
          <Link href="/about" className="card">
            <h2>About This Site</h2>
            <p>Purpose, scope, and how to contribute to the platform architecture knowledge base.</p>
          </Link>
        </div>
      </section>

      <CTA />
    </div>
  );
}
