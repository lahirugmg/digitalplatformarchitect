import Link from "next/link";
import { blockList } from "@/lib/blocks";
import { BlockDiagram } from "@/components/BlockDiagram";

export const metadata = {
  title: "Building Blocks",
  description:
    "Enterprise platform building blocks: message broker, streaming, integration, API management, IAM, and IDP."
};

export default function BlocksIndexPage() {
  return (
    <div className="container">
      <article className="blocks-article">
        <header className="blocks-header">
          <h1>Platform Building Blocks</h1>
          <p className="blocks-subtitle">
            Core capabilities every enterprise platform considers. Each page covers responsibilities,
            capabilities, patterns, KPIs, and reference tech.
          </p>
        </header>

        <section className="blocks-section">
          <div className="blocks-grid-with-diagrams">
            {blockList.map((b) => (
              <Link key={b.slug} href={`/blocks/${b.slug}`} className="block-card-with-diagram">
                <div className="block-diagram-container">
                  <BlockDiagram slug={b.slug} />
                </div>
                <div className="block-content">
                  <h2>{b.title}</h2>
                  <p>{b.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
