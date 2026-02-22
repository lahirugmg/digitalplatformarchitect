import { notFound } from "next/navigation";
import { platformBlueprints } from "@/lib/blueprints";
import Link from "next/link";

export const metadata = {
  title: "Small Enterprise HA Platform Blueprint",
  description: "High-availability platform blueprint for API Management, Integration, and Identity services."
};

export default function SmallHABlueprintPage() {
  const blueprint = platformBlueprints["small-ha"];
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
          <Link key={view.slug} href={`/blueprints/small-ha/${view.slug}`} className="card">
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

      <section className="stack gap-md" style={{ marginTop: '3rem' }}>
        <h2>Blueprint Overview</h2>
        <div className="card">
          <h3>Target Scenarios</h3>
          <ul>
            <li>Small to medium enterprises (100-1000 developers)</li>
            <li>Single-region deployment with high availability requirements</li>
            <li>API-first digital transformation initiatives</li>
            <li>Integration-heavy architectures with multiple systems</li>
            <li>Organizations requiring centralized identity management</li>
          </ul>
        </div>
        <div className="card">
          <h3>Key Characteristics</h3>
          <ul>
            <li>99.9%+ availability target with automated failover</li>
            <li>Horizontal scaling for all platform components</li>
            <li>Separation of concerns across API, integration, and identity layers</li>
            <li>Shared observability and operational tooling</li>
            <li>Kubernetes-native deployment with GitOps workflows</li>
          </ul>
        </div>
      </section>
    </section>
  );
}

