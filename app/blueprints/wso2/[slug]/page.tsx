import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { wso2Blueprints } from "@/lib/blueprints";
import { SmallHALogical } from "@/components/diagrams/wso2/SmallHALogical";
import { SmallHADeployment } from "@/components/diagrams/wso2/SmallHADeployment";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(wso2Blueprints).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const bp = wso2Blueprints[params.slug];
  if (!bp) return {};
  return { title: bp.title, description: bp.summary };
}

export default function BlueprintPage({ params }: Props) {
  const bp = wso2Blueprints[params.slug];
  if (!bp) return notFound();

  const renderDiagram = (id?: string) => {
    switch (id) {
      case "wso2-small-ha-logical":
        return <SmallHALogical />;
      case "wso2-small-ha-deployment":
        return <SmallHADeployment />;
      default:
        return null;
    }
  };

  return (
    <article className="prose stack gap-lg">
      <header className="stack gap-sm">
        <h1>{bp.title}</h1>
        <p>{bp.summary}</p>
      </header>

      {bp.views.map((v) => (
        <section key={v.slug} id={v.slug} className="stack gap-sm">
          <h2>{v.title}</h2>
          <p>{v.summary}</p>
          {v.diagram && (
            <div className="diagram">
              {renderDiagram(v.diagram)}
            </div>
          )}
        </section>
      ))}
    </article>
  );
}

