import { notFound } from "next/navigation";
import { platformBlueprints } from "@/lib/blueprints";
import Link from "next/link";

export const metadata = {
  title: "Microservices Platform Blueprint",
  description: "Cloud-native microservices platform with service mesh, observability, and developer experience tools."
};

export default function MicroservicesPlatformBlueprintPage() {
  const blueprint = platformBlueprints["microservices-platform"];
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
          <Link key={view.slug} href={`/blueprints/microservices-platform/${view.slug}`} className="card">
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
            <li>Organizations transitioning to microservices architecture</li>
            <li>Cloud-native application development at scale</li>
            <li>Teams requiring service-to-service communication governance</li>
            <li>Platforms needing comprehensive observability and debugging</li>
            <li>Development organizations prioritizing developer experience</li>
          </ul>
        </div>
        <div className="card">
          <h3>Key Characteristics</h3>
          <ul>
            <li>Service mesh for secure service-to-service communication</li>
            <li>Container-first deployment with Kubernetes orchestration</li>
            <li>GitOps-driven deployment and configuration management</li>
            <li>Comprehensive observability with distributed tracing</li>
            <li>Developer-friendly tooling and self-service capabilities</li>
          </ul>
        </div>
      </section>
    </section>
  );
}