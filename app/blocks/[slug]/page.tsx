import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blocks } from "@/lib/blocks";
import { connections } from "@/lib/connections";
import { patterns } from "@/lib/patterns";
import { EnhancedBlockDiagram } from "@/components/EnhancedBlockDiagram";
import { ApiManagementFeatures } from "@/components/ApiManagementFeatures";
import dynamic from "next/dynamic";
const ApimExplorer = dynamic(() => import("@/components/apim/ApimExplorer"), { ssr: false });

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(blocks).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const block = blocks[params.slug];
  if (!block) return {};
  return {
    title: block.title,
    description: block.summary
  };
}

export default function BlockPage({ params }: Props) {
  const block = blocks[params.slug];
  if (!block) return notFound();

  const isApiManagement = block.slug === 'api-management';

  return (
    <div className="container">
      <article className="prose stack gap-lg" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Only show header for non-API Management blocks */}
        {!isApiManagement && (
          <header className="block-header">
            <h1 className="page-title">{block.title}</h1>
            <p className="lede">{block.summary}</p>
          </header>
        )}

        {/* Enhanced Block Diagram (general) — hide for API Management */}
        {!isApiManagement && (
          <section className="block-diagram-section">
            <EnhancedBlockDiagram slug={block.slug} title={block.title} interactive={true} />
          </section>
        )}

        {/* API Management: deep interactive diagram */}
        {isApiManagement && <ApimExplorer />}

        {/* API Management Features Cards - Only for API Management block */}
        {isApiManagement && (
          <ApiManagementFeatures />
        )}

        {/* Cross-link: which architectural patterns this block enables */}
        {(() => {
          const c = connections.find((c) => c.block.slug === block.slug);
          if (!c) return null;
          const related = c.patternSlugs
            .map((slug) => patterns[slug])
            .filter(Boolean);
          if (!related.length) return null;
          return (
            <section className="stack gap-sm patterns-section">
              <h2>Enables Architectural Patterns</h2>
              <div className="patterns-grid-compact">
                {related.map((p) => (
                  <a 
                    key={p.slug} 
                    href={`/patterns/${p.slug}`}
                    className="pattern-link-card"
                  >
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                  </a>
                ))}
              </div>
            </section>
          );
        })()}

        {block.sections.map((s, idx) => (
          <section key={idx} className="block-content-section">
            <h2>{s.title}</h2>
            {s.kind === "text" ? (
              <p>{s.body}</p>
            ) : (
              <ul className="capability-list">
                {s.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}
