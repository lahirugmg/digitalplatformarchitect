import Link from "next/link";
import { CTA } from "@/components/CTA";
import { blockList } from "@/lib/blocks";
import { BlockCard } from "@/components/BlockCard";
import { patternList } from "@/lib/patterns";
import { PatternCard } from "@/components/PatternCard";
import { connections } from "@/lib/connections";
import { patterns } from "@/lib/patterns";

export default function HomePage() {
  return (
    <div className="stack gap-2xl">
      <section className="hero stack gap-lg">
        <h1 className="title">Master Digital Platform Architecture</h1>
        <p className="lede">
          Explore the essential building blocks of modern enterprise platforms —
          from reliable messaging and high‑throughput streaming to API
          management, IAM and developer platforms, plus data platforms,
          observability, security services, and cloud‑native platform
          capabilities.
        </p>
        <div className="cta">
          <Link href="/blocks" className="button accent sm">Dive into Building Blocks</Link>
          <Link href="/learn" className="button ghost sm">Start Learning</Link>
        </div>
      </section>

      <section className="stack gap-lg">
        <div className="stack gap-sm">
          <h2 className="section-title">Building Blocks</h2>
          <p className="lede" style={{ marginTop: '0' }}>
            The foundational technologies powering scalable, resilient enterprise systems.
          </p>
        </div>
        <div className="card-grid featured">
          {blockList.map((b) => (
            <BlockCard key={b.slug} block={b} />
          ))}
        </div>
      </section>

      <section className="stack gap-lg">
        <div className="stack gap-sm">
          <h2 className="section-title">From Building Blocks to Architecture Patterns</h2>
          <p className="lede" style={{ marginTop: '0' }}>
            Modern enterprises succeed when capabilities (building blocks) and design choices (architectural patterns) reinforce each other. Building blocks provide the platform foundation, while architectural patterns provide the organizational blueprint. Together, they enable scalable, secure, and adaptive systems.
          </p>
        </div>
        <div className="connections-table">
          <div className="table-header">
            <div>Building Block</div>
            <div>Enables Patterns</div>
            <div>How it Helps</div>
          </div>
          {connections.map((c) => {
            const patternLinks = c.patternSlugs
              .map((slug) => patterns[slug])
              .filter(Boolean)
              .map((p) => (
                <Link key={p.slug} href={`/patterns/${p.slug}`}>{p.title}</Link>
              ))
              .reduce<(JSX.Element | string)[]>((acc, el, idx, arr) => {
                acc.push(el);
                if (idx < arr.length - 1) acc.push(', ');
                return acc;
              }, []);
            return (
              <div key={c.block.name} className="table-row">
                <div><Link href={`/blocks/${c.block.slug}`}>{c.block.name}</Link></div>
                <div>{patternLinks}</div>
                <div>{c.description}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="stack gap-lg">
        <div className="stack gap-sm">
          <h2 className="section-title">Architectural Patterns</h2>
          <p className="lede" style={{ marginTop: '0' }}>
            Common software architecture styles, their trade-offs, and when to use them.
          </p>
        </div>
        <div className="card-grid">
          {patternList.slice(0, 4).map((p) => (
            <PatternCard key={p.slug} pattern={p} />
          ))}
        </div>
        <div>
          <Link href="/patterns" className="button" aria-label="View all patterns">Explore All Patterns</Link>
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
