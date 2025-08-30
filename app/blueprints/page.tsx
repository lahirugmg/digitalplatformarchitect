import Link from "next/link";
import { blueprintList } from "@/lib/blueprints";

export const metadata = {
  title: "Blueprints",
  description: "End-to-end architecture blueprints from business goals to deployment."
};

export default function BlueprintsIndexPage() {
  return (
    <section className="stack gap-lg">
      <h1 className="title">Architecture Blueprints</h1>
      <p className="lede">
        End-to-end implementation guides that take you from business goals to production deployment. 
        Each blueprint provides vendor-neutral patterns you can adapt to your technology choices.
      </p>

      <div className="card-grid">
        {blueprintList.map((blueprint) => (
          <Link key={blueprint.slug} href={`/blueprints/${blueprint.slug}`} className="card">
            <h2>{blueprint.title}</h2>
            <p>{blueprint.summary}</p>
            <div className="badges">
              {blueprint.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <section className="stack gap-md" style={{ marginTop: '3rem' }}>
        <h2>What You'll Find in Each Blueprint</h2>
        <div className="card-grid">
          <div className="card">
            <h3>🎯 Business Goals</h3>
            <p>Clear articulation of business drivers, success metrics, and strategic objectives that guide architectural decisions.</p>
          </div>
          <div className="card">
            <h3>🗺️ Capability Map</h3>
            <p>Visual mapping of required platform capabilities and how they connect to deliver business value.</p>
          </div>
          <div className="card">
            <h3>🏗️ Logical Architecture</h3>
            <p>Component relationships, data flows, and integration patterns independent of specific technology choices.</p>
          </div>
          <div className="card">
            <h3>🚀 Deployment Architecture</h3>
            <p>Infrastructure topology, deployment patterns, and operational considerations for production environments.</p>
          </div>
        </div>
      </section>
    </section>
  );
}

