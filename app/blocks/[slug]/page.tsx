import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blocks } from "@/lib/blocks";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(blocks).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const block = blocks[params.slug];
  if (!block) return {};
  return {
    title: block.title,
    description: block.summary
  };
}

export default function BlockPage({ params }: Props) {
  const block = blocks[params.slug];
  if (!block) return notFound();

  return (
    <article className="prose stack gap-md">
      <h1>{block.title}</h1>
      <p>{block.summary}</p>

      {block.sections.map((s, idx) => (
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

