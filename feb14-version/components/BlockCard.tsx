import Link from "next/link";
import type { Block } from "@/lib/blocks";

type Props = { block: Block };

export function BlockCard({ block }: Props) {
  return (
    <Link href={`/blocks/${block.slug}`} className="card block-card">
      <div className="stack gap-sm">
        <h2>{block.title}</h2>
        <p>{block.summary}</p>
        <div className="badges">
          {block.keywords.slice(0, 4).map((kw) => (
            <span key={kw} className="badge">
              {kw}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

