"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { connections } from "@/lib/connections";
import { patterns } from "@/lib/patterns";

export function ConnectionsExplorer() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return connections;
    return connections.filter((c) => {
      const block = c.block.name.toLowerCase();
      const desc = c.description.toLowerCase();
      const pats = c.patternSlugs
        .map((s) => patterns[s]?.title.toLowerCase())
        .filter(Boolean)
        .join(" ");
      return block.includes(q) || desc.includes(q) || pats.includes(q);
    });
  }, [query]);

  return (
    <div className="stack gap-md">
      <div className="explorer-bar">
        <input
          type="search"
          placeholder="Filter by block, pattern, or keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter connections"
        />
      </div>

      <div className="connections-table">
        <div className="table-header">
          <div>Building Block</div>
          <div>Enables Patterns</div>
          <div>How it Helps</div>
        </div>
        {filtered.map((c) => (
          <div key={c.block.name} className="table-row">
            <div>
              <div style={{display:'flex', alignItems:'center', gap:'.5rem', flexWrap:'wrap'}}>
                <Link href={`/blocks/${c.block.slug}`}>{c.block.name}</Link>
                {c.subtopics?.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:'.375rem'}}>
              {c.patternSlugs.map((slug) => (
                <Link key={slug} href={`/patterns/${slug}`} className="badge" style={{textDecoration:'none'}}>
                  {patterns[slug]?.title ?? slug}
                </Link>
              ))}
            </div>
            <div>{c.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

