import Link from "next/link";
import type { Pattern } from "@/lib/patterns";

type Props = { pattern: Pattern };

export function PatternCard({ pattern }: Props) {
  return (
    <Link href={`/patterns/${pattern.slug}`} className="card block-card">
      <div className="stack gap-sm">
        <h2>{pattern.title}</h2>
        <p>{pattern.summary}</p>
        {pattern.aka && pattern.aka.length > 0 ? (
          <div className="badges">
            {pattern.aka.slice(0, 3).map((name) => (
              <span key={name} className="badge">{name}</span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

