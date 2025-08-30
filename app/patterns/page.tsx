import Link from "next/link";
import { patternList } from "@/lib/patterns";

export const metadata = {
  title: "Architectural Patterns",
  description:
    "Software architectural patterns: layered, microservices, event-driven, client-server, plugin-based, hexagonal, and more."
};

export default function PatternsIndexPage() {
  return (
    <section className="stack gap-lg">
      <h1 className="title">Software Architectural Patterns</h1>
      <p className="lede">
        Explore common software architecture styles, their trade-offs, and when
        to use them.
      </p>
      <div className="card-grid">
        {patternList.map((p) => (
          <Link key={p.slug} href={`/patterns/${p.slug}`} className="card">
            <h2>{p.title}</h2>
            <p>{p.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

