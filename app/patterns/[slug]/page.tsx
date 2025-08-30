import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { patterns } from "@/lib/patterns";

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

