import Link from "next/link";

export const metadata = {
  title: "Blueprints",
  description: "End-to-end architecture blueprints from goals to deployment."
};

export default function BlueprintsIndexPage() {
  return (
    <section className="stack gap-lg">
      <h1 className="title">Architecture Blueprints</h1>
      <p className="lede">From business goals to deployment topologies, curated by platform capability.</p>

      <div className="card-grid">
        <Link href="/blueprints/wso2" className="card">
          <h2>WSO2 Guides</h2>
          <p>API Management, Integration, and IAM blueprints with HA topologies.</p>
        </Link>
        <div className="card" aria-disabled>
          <h2>Vendor-neutral (Coming soon)</h2>
          <p>Generalized patterns and diagrams you can apply anywhere.</p>
        </div>
      </div>
    </section>
  );
}

