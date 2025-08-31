"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { blockList } from "@/lib/blocks";
import { patternList } from "@/lib/patterns";
import { connections } from "@/lib/connections";
import { EventDrivenDiagram } from "@/components/diagrams/EventDrivenDiagram";
import { MicroserviceDiagram } from "@/components/diagrams/MicroserviceDiagram";
import { LayeredArchitectureDiagram } from "@/components/diagrams/LayeredArchitectureDiagram";
import { HexagonalDiagram } from "@/components/diagrams/HexagonalDiagram";
import { APIDiagram } from "@/components/diagrams/blocks/APIDiagram";
import { IAMDiagram } from "@/components/diagrams/blocks/IAMDiagram";
import { ObservabilityDiagram } from "@/components/diagrams/blocks/ObservabilityDiagram";
import { DataPlatformDiagram } from "@/components/diagrams/blocks/DataPlatformDiagram";

/* Lightweight interactive explorer: filter blocks & patterns and view relationships */
export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState<"blocks"|"patterns"|"relationships">("relationships");
  const [relMode, setRelMode] = useState<"list"|"matrix">("list");
  const [patternCats, setPatternCats] = useState<string[]>([]);
  const [blockFamilies, setBlockFamilies] = useState<string[]>([]);

  const q = query.toLowerCase().trim();

  const PATTERN_CATS: Record<string, string> = {
    "layered-architecture": "Structural",
    "hexagonal-architecture": "Structural",
    "clean-architecture": "Structural",
    "onion-architecture": "Structural",
    "plugin-based": "Structural",
    "microservice-architecture": "Distribution",
    "service-oriented-architecture": "Distribution",
    "event-driven-architecture": "Distribution",
    "space-based-architecture": "Distribution",
    "cqrs": "Data",
    "data-mesh": "Data",
    "pipes-and-filters": "Data",
    "broker-architecture": "Data",
    "blackboard-architecture": "Data",
  };

  const BLOCK_FAMILIES: Record<string, string> = {
    "api-management": "API",
    "identity-access-management": "Security",
    "security-services": "Security",
    "observability-operations": "Observability",
    "cloud-native-platform-services": "Platform",
    "data-platform": "Data",
    "internal-developer-platform": "Platform",
    "enterprise-integration": "Integration",
    "event-driven-architecture": "Integration",
    "collaboration-knowledge-platforms": "Collaboration",
  };

  const filteredBlocks = useMemo(() => blockList.filter(b => {
    const text = [b.title, b.summary, ...(b.keywords||[])].some(t => t.toLowerCase().includes(q));
    const fam = BLOCK_FAMILIES[b.slug] || "Other";
    const famOk = blockFamilies.length === 0 || blockFamilies.includes(fam);
    return text && famOk;
  }), [q, blockFamilies]);

  const filteredPatterns = useMemo(() => patternList.filter(p => {
    const text = [p.title, p.summary, ...(p.keywords||[])].some(t => t.toLowerCase().includes(q));
    const cat = PATTERN_CATS[p.slug] || "Other";
    const catOk = patternCats.length === 0 || patternCats.includes(cat);
    return text && catOk;
  }), [q, patternCats]);

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
      <header className="page-hero stack gap-sm">
        <h1 className="page-title">Architecture Explorer</h1>
        <p className="lede">Discover how platform building blocks and architectural patterns work together to create resilient, scalable digital platforms.</p>
      </header>
        
      {/* Overview Stats */}
      <div className="explorer-stats">
          <div className="stat-card">
            <div className="stat-number">{patternList.length}</div>
            <div className="stat-label">Architecture Patterns</div>
            <div className="stat-desc">Proven approaches for system design</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{blockList.length}</div>
            <div className="stat-label">Platform Components</div>
            <div className="stat-desc">Core building blocks for digital platforms</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{connections.length}</div>
            <div className="stat-label">Relationships</div>
            <div className="stat-desc">Connections between patterns and blocks</div>
          </div>
        </div>
        {/* Filters */}
        <div className="chips" aria-label="Pattern categories">
          {["Structural","Distribution","Data"].map(cat => (
            <button key={cat} className={`chip ${patternCats.includes(cat)?'active':''}`} onClick={() => setPatternCats(prev => prev.includes(cat)? prev.filter(c=>c!==cat):[...prev, cat])}>{cat}</button>
          ))}
        </div>
        <div className="chips" aria-label="Block families">
          {["API","Security","Observability","Platform","Data","Integration","Collaboration"].map(fam => (
            <button key={fam} className={`chip ${blockFamilies.includes(fam)?'active':''}`} onClick={() => setBlockFamilies(prev => prev.includes(fam)? prev.filter(f=>f!==fam):[...prev, fam])}>{fam}</button>
          ))}
        </div>

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

      {show === "relationships" && (
        <div className="stack gap-md">
          <h2 className="section-title centered blue">Relationships</h2>
          <div className="subtoggle-group" role="tablist" aria-label="Relationship view">
            {(["list","matrix"] as const).map(mode => (
              <button key={mode} role="tab" aria-selected={relMode===mode} className={relMode===mode?"active":undefined} onClick={()=>setRelMode(mode)}>
                {mode === "list" ? "List" : "Matrix"}
              </button>
            ))}
          </div>
          {relMode === "list" ? (
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
          ) : (
            <div className="matrix-scroll">
              <div style={{display:'flex', justifyContent:'flex-end', padding:'.5rem'}}>
                <button className="button" onClick={() => {
                  const header = ["Block/Pattern", ...patternList.map(p=>p.title)];
                  const rows = blockList.map(b => {
                    const conn = connections.find(c => c.block.slug === b.slug);
                    const set = new Set(conn?.patternSlugs ?? []);
                    const fam = BLOCK_FAMILIES[b.slug] || 'Other';
                    if (blockFamilies.length>0 && !blockFamilies.includes(fam)) return null;
                    const cells = patternList.map(p => {
                      const cat = PATTERN_CATS[p.slug] || 'Other';
                      if (patternCats.length>0 && !patternCats.includes(cat)) return 0;
                      return set.has(p.slug)?1:0;
                    });
                    return [b.title, ...cells];
                  }).filter(Boolean) as (string|number)[][];
                  const csv = [header, ...rows].map(r => r.map(x => typeof x === 'string' && (x as string).includes(',')? `"${x}"` : String(x)).join(',')).join('\n');
                  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a'); a.href = url; a.download = 'relationships-matrix.csv'; a.click(); URL.revokeObjectURL(url);
                }}>Export CSV</button>
              </div>
              <table className="matrix-table" role="grid" aria-label="Blocks by Patterns matrix">
                <thead>
                  <tr>
                    <th>Block ↓ / Pattern →</th>
                    {patternList.map(p => {
                      const cat = PATTERN_CATS[p.slug] || 'Other';
                      if (patternCats.length>0 && !patternCats.includes(cat)) return null;
                      return (<th key={p.slug}><Link href={`/patterns/${p.slug}`}>{p.title}</Link></th>);
                    })}
                  </tr>
                </thead>
                <tbody>
                  {blockList.map(b => {
                    const conn = connections.find(c => c.block.slug === b.slug);
                    const set = new Set(conn?.patternSlugs ?? []);
                    const fam = BLOCK_FAMILIES[b.slug] || 'Other';
                    const visible = (blockFamilies.length===0 || blockFamilies.includes(fam)) && (!q || b.title.toLowerCase().includes(q));
                    if (!visible) return null;
                    return (
                      <tr key={b.slug}>
                        <th scope="row"><Link href={`/blocks/${b.slug}`}>{b.title}</Link></th>
                        {patternList.map(p => {
                          const cat = PATTERN_CATS[p.slug] || 'Other';
                          if (patternCats.length>0 && !patternCats.includes(cat)) return null;
                          return (<td key={p.slug} className={set.has(p.slug)?'hit':''}>{set.has(p.slug)?'●':''}</td>);
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {show === "blocks" && (
        <div className="stack gap-md">
          <div className="section-intro">
            <h2 className="section-title centered blue">Platform Building Blocks</h2>
            <p>Core infrastructure components that provide essential capabilities for modern digital platforms. Each block represents a foundational service that supports specific architectural patterns and business requirements.</p>
          </div>
          
          <div className="card-grid">
            {filteredBlocks.map(b => (
              <Link key={b.slug} href={`/blocks/${b.slug}`} className="card enhanced-card">
                <div className="card-header">
                  <h3>{b.title}</h3>
                  <div className="card-keywords">
                    {b.keywords.slice(0, 3).map(k => (
                      <span key={k} className="keyword-tag">{k}</span>
                    ))}
                  </div>
                </div>
                <p>{b.summary}</p>
                <div className="card-footer">
                  <span className="card-link-text">Explore capabilities →</span>
                </div>
              </Link>
            ))}
            {filteredBlocks.length === 0 && (
              <div className="empty-state">
                <p>No building blocks match your search.</p>
                <p>Try searching for: messaging, API, identity, data, security</p>
              </div>
            )}
          </div>
        </div>
      )}

      {show === "patterns" && (
        <div className="stack gap-md">
          <div className="section-intro">
            <h2 className="section-title centered blue">Architecture Patterns</h2>
            <p>Proven architectural approaches that solve recurring design problems. Each pattern provides a structured way to organize systems, defining how components interact, communicate, and evolve over time.</p>
            
            <div className="pattern-categories">
              <div className="category-group">
                <h3>Structural Patterns</h3>
                <p>How to organize code and components: layered, modular, domain-driven approaches</p>
              </div>
              <div className="category-group">
                <h3>Distribution Patterns</h3>
                <p>How to split systems: microservices, service-oriented, event-driven architectures</p>
              </div>
              <div className="category-group">
                <h3>Data Patterns</h3>
                <p>How to handle information: event sourcing, CQRS, data mesh approaches</p>
              </div>
            </div>
          </div>
          
          <div className="card-grid">
            {filteredPatterns.map(p => (
              <Link key={p.slug} href={`/patterns/${p.slug}`} className="card enhanced-card pattern-card">
                <div className="card-header">
                  <h3>{p.title}</h3>
                  {p.aka && p.aka.length > 0 && (
                    <div className="aka-tags">
                      {p.aka.map(alias => (
                        <span key={alias} className="aka-tag">aka {alias}</span>
                      ))}
                    </div>
                  )}
                </div>
                <p>{p.summary}</p>
                <div className="card-keywords">
                  {p.keywords.slice(0, 4).map(k => (
                    <span key={k} className="keyword-tag">{k}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <span className="card-link-text">See implementation details →</span>
                </div>
              </Link>
            ))}
            {filteredPatterns.length === 0 && (
              <div className="empty-state">
                <p>No architecture patterns match your search.</p>
                <p>Try searching for: microservices, layered, event-driven, hexagonal</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="explorer-guide stack gap-md" style={{marginTop:'2rem'}}>
        <h2 className="section-title centered blue">Understanding Platform Architecture</h2>
        
        <div className="guide-grid">
          <div className="guide-card">
            <h3>🏗️ Building Blocks</h3>
            <p>Infrastructure components that provide specific capabilities like messaging, identity management, or data processing. Think of these as the foundation services your applications depend on.</p>
            <ul>
              <li>Each block solves specific technical challenges</li>
              <li>Blocks can be combined to create comprehensive platforms</li>
              <li>Modern blocks emphasize security and observability</li>
            </ul>
          </div>
          
          <div className="guide-card">
            <h3>📐 Architecture Patterns</h3>
            <p>Proven approaches for organizing systems and code. These patterns define how components should interact and help solve recurring design problems at scale.</p>
            <ul>
              <li>Patterns provide structure and predictability</li>
              <li>Different patterns suit different business contexts</li>
              <li>Modern patterns emphasize resilience and adaptability</li>
            </ul>
          </div>
          
          <div className="guide-card">
            <h3>🔗 Relationships</h3>
            <p>How building blocks enable and enhance specific architectural patterns. Understanding these connections helps you make informed technology choices.</p>
            <ul>
              <li>Some blocks are essential for certain patterns</li>
              <li>Blocks can support multiple architectural approaches</li>
              <li>Strong relationships indicate proven combinations</li>
            </ul>
          </div>
        </div>
        
        <div className="exploration-tips">
          <h3>Exploration Tips</h3>
          <div className="tips-grid">
            <div className="tip">
              <strong>Start with Patterns:</strong> If you're designing a new system, explore patterns first to understand different architectural approaches.
            </div>
            <div className="tip">
              <strong>Then Choose Blocks:</strong> Once you've selected patterns, use the relationships view to identify which building blocks you'll need.
            </div>
            <div className="tip">
              <strong>Search & Filter:</strong> Use the search box to quickly find specific capabilities or architectural concepts you're interested in.
            </div>
            <div className="tip">
              <strong>Deep Dive:</strong> Click through to detailed pages for implementation guidance, trade-offs, and real-world examples.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
