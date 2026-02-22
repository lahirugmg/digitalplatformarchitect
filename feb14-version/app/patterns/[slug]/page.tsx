import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { patterns } from "@/lib/patterns";
import { EventDrivenDiagram } from "@/components/diagrams/EventDrivenDiagram";
import { LayeredArchitectureDiagram } from "@/components/diagrams/LayeredArchitectureDiagram";
import { MicroserviceDiagram } from "@/components/diagrams/MicroserviceDiagram";
import { HexagonalDiagram } from "@/components/diagrams/HexagonalDiagram";
import { MonolithicDiagram } from "@/components/diagrams/MonolithicDiagram";
import { SecurityDiagram } from "@/components/diagrams/blocks/SecurityDiagram";
import { OAuth2Diagram } from "@/components/diagrams/OAuth2Diagram";
import { APISecurityDiagram } from "@/components/diagrams/APISecurityDiagram";
import { CellBasedDiagram } from "@/components/diagrams/CellBasedDiagram";
import { connections } from "@/lib/connections";
import { blocks } from "@/lib/blocks";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(patterns).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const pattern = patterns[params.slug];
  if (!pattern) return {};
  return {
    title: pattern.title,
    description: pattern.summary
  };
}

export default function PatternPage({ params }: Props) {
  const pattern = patterns[params.slug];
  if (!pattern) return notFound();

  return (
    <article className="prose stack gap-md">
      <h1>{pattern.title}</h1>
      <p>{pattern.summary}</p>

      {(() => {
        const renderDiagram = () => {
          switch (params.slug) {
            case "event-driven-architecture":
              return <EventDrivenDiagram />;
            case "layered-architecture":
              return <LayeredArchitectureDiagram />;
            case "microservice-architecture":
              return <MicroserviceDiagram />;
            case "cell-based-architecture":
              return <CellBasedDiagram />;
            case "hexagonal-architecture":
              return <HexagonalDiagram />;
            case "monolithic":
              return <MonolithicDiagram />;
            case "zero-trust-security":
              return <SecurityDiagram />;
            case "oauth2-patterns":
              return <OAuth2Diagram />;
            case "api-security-gateway":
              return <APISecurityDiagram />;
            default:
              return null;
          }
        };

        const diagram = renderDiagram();
        if (!diagram) return null;

        return (
          <section className="stack gap-sm">
            <h2>Architecture Diagram</h2>
            <div className="diagram">
              {diagram}
            </div>
          </section>
        );
      })()}

      {/* Cross-link: which building blocks typically enable this pattern */}
      {(() => {
        // Find all connections referencing this pattern slug
        const enablingConnections = connections.filter((c) =>
          c.patternSlugs.includes(pattern.slug)
        );
        if (!enablingConnections.length) return null;
        return (
          <section className="stack gap-sm">
            <h2>Enabled By Platform Building Blocks</h2>
            <ul>
              {enablingConnections.map((c) => {
                const b = blocks[c.block.slug];
                return (
                  <li key={c.block.slug}>
                    <a href={`/blocks/${c.block.slug}`}>{c.block.name || b?.title}</a>: {c.description}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })()}

      {pattern.sections.map((s, idx) => (
        <section key={idx} className="stack gap-sm">
          <h2>{s.title}</h2>
          {s.kind === "text" ? (
            <p>{s.body}</p>
          ) : (
            <ul>
              {s.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
