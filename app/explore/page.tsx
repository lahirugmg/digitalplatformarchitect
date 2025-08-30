"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { blockList } from "@/lib/blocks";
import { patternList } from "@/lib/patterns";
import { connections } from "@/lib/connections";

/* Lightweight interactive explorer: filter blocks & patterns and view relationships */
export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState<"blocks"|"patterns"|"relationships">("relationships");

  const q = query.toLowerCase().trim();

  const filteredBlocks = useMemo(() => blockList.filter(b =>
    [b.title, b.summary, ...(b.keywords||[])].some(t => t.toLowerCase().includes(q))
  ), [q]);
  const filteredPatterns = useMemo(() => patternList.filter(p =>
    [p.title, p.summary, ...(p.keywords||[])].some(t => t.toLowerCase().includes(q))
  ), [q]);

  const filteredConnections = useMemo(() => connections.filter(c => {
    if (!q) return true;
    return (
      c.block.name.toLowerCase().includes(q) ||
      c.patterns.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }), [q]);

  return (
    <section className="stack gap-lg">
      <div className="stack gap-sm">
        <h1 className="title">Interactive Explorer</h1>
        <p className="lede">Search, filter, and connect platform building blocks with architectural patterns.</p>
        <div className="explorer-bar">
          <input
            aria-label="Search"
            placeholder="Search blocks, patterns, capabilities..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="toggle-group" role="tablist" aria-label="View mode">
            {(["relationships","blocks","patterns"] as const).map(mode => (
              <button
                key={mode}
                role="tab"
                aria-selected={show===mode}
                className={show===mode?"active":undefined}
                onClick={()=>setShow(mode)}
              >{mode.charAt(0).toUpperCase()+mode.slice(1)}</button>
            ))}
          </div>
        </div>
      </div>

      {show === "relationships" && (
        <div className="connections-table compact">
          <div className="table-header">
            <div>Building Block</div>
            <div>Patterns</div>
            <div>How it Helps</div>
          </div>
          {filteredConnections.map(c => (
            <div key={c.block.slug} className="table-row">
              <div><Link href={`/blocks/${c.block.slug}`}>{c.block.name}</Link></div>
              <div>{c.patternSlugs.map(ps => {
                const p = patternList.find(pp => pp.slug === ps);
                if (!p) return null;
                return <Link key={p.slug} href={`/patterns/${p.slug}`}>{p.title}</Link>;
              }).reduce<(JSX.Element|string)[]>((acc, el, i, arr)=>{acc.push(el!); if(i<arr.length-1) acc.push(', '); return acc;}, [])}</div>
              <div>{c.description}</div>
            </div>
          ))}
          {filteredConnections.length === 0 && (
            <div className="table-row"><div>No matches</div><div></div><div></div></div>
          )}
        </div>
      )}

      {show === "blocks" && (
        <div className="card-grid">
          {filteredBlocks.map(b => (
            <Link key={b.slug} href={`/blocks/${b.slug}`} className="card">
              <h2>{b.title}</h2>
              <p>{b.summary}</p>
            </Link>
          ))}
          {filteredBlocks.length === 0 && <p>No building blocks match.</p>}
        </div>
      )}

      {show === "patterns" && (
        <div className="card-grid">
          {filteredPatterns.map(p => (
            <Link key={p.slug} href={`/patterns/${p.slug}`} className="card">
              <h2>{p.title}</h2>
              <p>{p.summary}</p>
            </Link>
          ))}
          {filteredPatterns.length === 0 && <p>No patterns match.</p>}
        </div>
      )}

      <div className="prose" style={{marginTop:'2rem'}}>
        <h2>How to Use This Explorer</h2>
        <p>Switch views to explore capabilities (building blocks), architectural styles (patterns), or see how they reinforce each other (relationships). Use the search box for fast narrowing. Click through to deep‑dive pages.</p>
      </div>
    </section>
  );
}
