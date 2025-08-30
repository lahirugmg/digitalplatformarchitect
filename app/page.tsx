import Link from "next/link";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <section className="stack gap-lg">
      <h1 className="title">Digital Platform Architect</h1>
      <p className="lede">
        A learning hub for enterprise digital platform architecture — from
        strategy and operating models to platform capabilities, integration
        patterns, and governance.
      </p>

      <div className="card-grid">
        <Link href="/blocks" className="card">
          <h2>Building Blocks</h2>
          <p>Core capabilities for enterprise platforms.</p>
        </Link>
        <Link href="/learn" className="card">
          <h2>Learn</h2>
          <p>Curated learning paths and foundations.</p>
        </Link>
        <Link href="/resources" className="card">
          <h2>Resources</h2>
          <p>Reference models, templates, and checklists.</p>
        </Link>
        <Link href="/about" className="card">
          <h2>About</h2>
          <p>What this is and how to contribute.</p>
        </Link>
      </div>

      <CTA />
    </section>
  );
}
