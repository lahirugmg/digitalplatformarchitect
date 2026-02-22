import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { platformBlueprints } from "@/lib/blueprints";
import Link from "next/link";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(platformBlueprints).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const bp = platformBlueprints[params.slug];
  if (!bp) return {};
  return { title: bp.title, description: bp.summary };
}

export default function BlueprintOverviewPage({ params }: Props) {
  const blueprint = platformBlueprints[params.slug];
  if (!blueprint) return notFound();

  return (
    <section className="stack gap-lg">
      <div className="stack gap-sm">
        <Link href="/blueprints" className="text-link">← All Blueprints</Link>
        <h1 className="title">{blueprint.title}</h1>
        <p className="lede">{blueprint.summary}</p>
        <div className="badges">
          {blueprint.tags.map((tag) => (
            <span key={tag} className="badge">{tag}</span>
          ))}
        </div>
      </div>

      <div className="card-grid">
        {blueprint.views.map((view) => (
          <Link key={view.slug} href={`/blueprints/${params.slug}/${view.slug}`} className="card">
            <h2>{view.title}</h2>
            <p>{view.summary}</p>
            {view.diagram && (
              <div className="view-indicator">
                <span className="badge">Includes Diagram</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}