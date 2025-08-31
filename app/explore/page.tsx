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
        <h1 className="title">Architecture Explorer</h1>
        <p className="lede">Discover how platform building blocks and architectural patterns work together to create resilient, scalable digital platforms.</p>
        
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
        <div className="stack gap-md">
          <div className="section-intro">
            <h2>Platform Building Blocks</h2>
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
            <h2>Architecture Patterns</h2>
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
        <h2>Understanding Platform Architecture</h2>
        
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
