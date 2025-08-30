import Link from "next/link";
import { wso2List } from "@/lib/blueprints";

export const metadata = {
  title: "WSO2 Blueprints",
  description: "Essential architecture diagrams for WSO2 implementations."
};

export default function WSO2IndexPage() {
  return (
    <section className="stack gap-lg">
      <h1 className="title">WSO2 Architecture Blueprints</h1>
      <p className="lede">
        From business goals to capability maps, logical architecture, security and deployment blueprints.
      </p>
      <div className="card-grid">
        {wso2List.map((bp) => (
          <Link key={bp.slug} href={`/blueprints/wso2/${bp.slug}`} className="card">
            <h2>{bp.title}</h2>
            <p>{bp.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

