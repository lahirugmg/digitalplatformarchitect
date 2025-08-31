"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

type NodeType = "business" | "solution" | "deployment" | "concept";
type ArchNode = {
  name: string;
  level: number; // 0..3
  type: NodeType;
  children?: ArchNode[];
  _children?: ArchNode[];
  info?: string; // optional tooltip/description
};

const COLORS: Record<NodeType, string> = {
  concept: "#374151",
  business: "#2563EB",
  solution: "#059669",
  deployment: "#7C3AED"
};

const LEVEL_LABELS = ["L0", "L1", "L2", "L3"];

type RolePreset = "business" | "architect" | "engineer" | "all";

// Small helpers to build nodes succinctly
const N = (name: string, level: number, type: NodeType, info?: string, children?: ArchNode[]): ArchNode => ({ name, level, type, info, children });

// Per-role trees reflecting requested connections and depth per layer
const DATA_BY_ROLE: Record<RolePreset, ArchNode> = {
  business: N("Digital Platform", 0, "concept", undefined, [
    N("Business Architecture", 0, "business", "L0–L2: value streams → capabilities → key processes & KPIs.", [
      N("Value Streams", 1, "business", undefined, [
        N("Capabilities", 2, "business", "Key processes & KPIs", [
          N("Key Processes", 3, "business"),
          N("KPIs", 3, "business")
        ])
      ])
    ]),
    N("Solution Architecture", 0, "solution", "L0–L1: solution areas, buy‑vs‑build, major integrations, cost & risk.", [
      N("Solution Areas", 1, "solution"),
      N("Buy vs Build", 1, "solution"),
      N("Major Integrations", 1, "solution"),
      N("Cost & Risk", 1, "solution")
    ]),
    N("Deployment Architecture", 0, "deployment", "L0: deployment options (cloud/provider), resilience posture, compliance notes.")
  ]),

  architect: N("Digital Platform", 0, "concept", undefined, [
    N("Business Architecture", 0, "business", "L0–L1: capability map, information domains, traceability to OKRs.", [
      N("Capability Map", 1, "business"),
      N("Information Domains", 1, "business"),
      N("Traceability to OKRs", 1, "business")
    ]),
    N("Solution Architecture", 0, "solution", "L0–L2: context + container + component views, interfaces, patterns, trade‑offs.", [
      N("Context", 1, "solution", undefined, [
        N("Systems & Actors", 2, "solution"),
        N("External Dependencies", 2, "solution")
      ]),
      N("Containers", 1, "solution", undefined, [
        N("APIs & Interfaces", 2, "solution"),
        N("Patterns & Trade‑offs", 2, "solution")
      ]),
      N("Components", 1, "solution", undefined, [
        N("Modules/Services", 2, "solution"),
        N("Contracts", 2, "solution")
      ])
    ]),
    N("Deployment Architecture", 0, "deployment", "L0–L1: high‑level topology, environments, runtime concerns (HA/DR, scaling).", [
      N("High‑level Topology", 1, "deployment"),
      N("Environments", 1, "deployment"),
      N("Runtime Concerns (HA/DR/Scaling)", 1, "deployment")
    ])
  ]),

  engineer: N("Digital Platform", 0, "concept", undefined, [
    N("Business Architecture", 0, "business", "L0–L1: enough domain context to understand why.", [
      N("Domain Context (Why)", 1, "business")
    ]),
    N("Solution Architecture", 0, "solution", "L0–L2: components, APIs, schemas, contracts, sequence & event flows.", [
      N("Components", 1, "solution", undefined, [
        N("Modules/Services", 2, "solution"),
        N("Data Schemas", 2, "solution"),
        N("API Contracts", 2, "solution")
      ]),
      N("Interactions", 1, "solution", undefined, [
        N("Sequence Flows", 2, "solution"),
        N("Event Flows", 2, "solution")
      ])
    ]),
    N("Deployment Architecture", 0, "deployment", "L0–L2: clusters/nodes, CI/CD, networking, secrets, SLOs/observability.", [
      N("Platform", 1, "deployment", undefined, [
        N("Clusters & Nodes", 2, "deployment"),
        N("Networking", 2, "deployment")
      ]),
      N("Operations", 1, "deployment", undefined, [
        N("CI/CD", 2, "deployment"),
        N("Secrets", 2, "deployment"),
        N("SLOs & Observability", 2, "deployment")
      ])
    ])
  ]),

  // Richest combined view (acts as a superset preview)
  all: N("Digital Platform", 0, "concept", undefined, [
    N("Business Architecture", 0, "business", "Value streams → capabilities → key processes & KPIs.", [
      N("Value Streams", 1, "business", undefined, [
        N("Capabilities", 2, "business", undefined, [
          N("Key Processes", 3, "business"),
          N("KPIs", 3, "business")
        ])
      ])
    ]),
    N("Solution Architecture", 0, "solution", "Context → containers → components; interfaces, patterns, trade‑offs.", [
      N("Context", 1, "solution", undefined, [
        N("Systems & Actors", 2, "solution"),
        N("External Dependencies", 2, "solution")
      ]),
      N("Containers", 1, "solution", undefined, [
        N("APIs & Interfaces", 2, "solution"),
        N("Patterns & Trade‑offs", 2, "solution")
      ]),
      N("Components", 1, "solution", undefined, [
        N("Modules/Services", 2, "solution"),
        N("Contracts", 2, "solution")
      ])
    ]),
    N("Deployment Architecture", 0, "deployment", "Topology → envs → runtime: HA/DR, scaling; SLOs & observability.", [
      N("Topology", 1, "deployment", undefined, [
        N("Cloud/Provider Options", 2, "deployment"),
        N("Resilience Posture", 2, "deployment")
      ]),
      N("Environments", 1, "deployment", undefined, [
        N("Dev/Test/Stage/Prod", 2, "deployment")
      ]),
      N("Runtime Concerns", 1, "deployment", undefined, [
        N("HA/DR & Scaling", 2, "deployment"),
        N("Compliance Notes", 2, "deployment"),
        N("SLOs & Observability", 2, "deployment")
      ])
    ])
  ])
};

function cloneDeep<T>(obj: T): T { return JSON.parse(JSON.stringify(obj)); }
function collapseToLevel(root: ArchNode, maxLevel: number) {
  const recur = (n: ArchNode) => {
    if (!n.children) return;
    if (n.level >= maxLevel) { n._children = n.children; n.children = undefined; }
    else { n._children = undefined; n.children?.forEach(recur); }
  };
  recur(root);
}
function toggleNode(n: any) { if (n.children) { n._children = n.children; n.children = null; } else { n.children = n._children; n._children = null; } }

export function ArchitectureExplorer({ data }: { data?: ArchNode }) {
  const [rolePreset, setRolePreset] = useState<RolePreset>("business");
  const [maxLevel, setMaxLevel] = useState<number>(2);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const roleData = useMemo(() => cloneDeep(data ?? DATA_BY_ROLE[rolePreset]), [data, rolePreset]);
  const prepared = useMemo(() => { const seed = cloneDeep(roleData); collapseToLevel(seed, maxLevel); return seed; }, [roleData, maxLevel]);

  useEffect(() => {
    // Sensible defaults per role, can be overridden using L0-L3 buttons
    if (rolePreset === "business") setMaxLevel(2);
    if (rolePreset === "architect") setMaxLevel(2);
    if (rolePreset === "engineer") setMaxLevel(2);
    if (rolePreset === "all") setMaxLevel(3);
  }, [rolePreset]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
    const width = svgRef.current?.clientWidth ?? 900;
    const height = svgRef.current?.clientHeight ?? 600;
    g.selectAll("*").remove();

    const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.4, 2.5]).on("zoom", (event: any) => {
      g.attr("transform", event.transform.toString());
    });
    svg.call(zoom as any);

    const root = d3.hierarchy(prepared);
    const tree = d3.tree<ArchNode>().size([height - 40, width - 220]);
    const rootPoint = tree(root) as d3.HierarchyPointNode<ArchNode>;

    g.selectAll("path.link")
      .data(rootPoint.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#D1D5DB")
      .attr("stroke-width", 2)
      .attr("d", d3.linkHorizontal<any, [number, number]>().x((d: any) => d.y).y((d: any) => d.x));

    const node = g.selectAll("g.node")
      .data(rootPoint.descendants())
      .enter()
      .append("g")
      .attr("class", "node cursor-pointer")
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`)
      .on("click", (_: any, d: any) => { toggleNode(d.data); setMaxLevel((m) => m + 0); });

    node.append("circle").attr("r", 16).attr("fill", (d: any) => COLORS[d.data.type]).attr("stroke", "white").attr("stroke-width", 2).attr("opacity", (d: any) => (d.data.level <= maxLevel ? 1 : 0.6));
    node
      .append("text")
      .attr("dy", 5)
      .attr("x", 24)
      .attr("font-size", 15)
      .attr("font-family", "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial")
      .text((d: any) => d.data.name)
      .attr("fill", "#111827")
      .attr("opacity", (d: any) => (d.data.level <= maxLevel ? 1 : 0.85));

    // Native tooltip with role-specific info when available
    node.append("title").text((d: any) => d.data.info ? `${d.data.name}: ${d.data.info}` : d.data.name);

    // Fit-to-view: compute bounding box of rendered content and center it with margin
    try {
      const margin = 40;
      const gNode = gRef.current as SVGGElement | null;
      if (gNode) {
        const bbox = gNode.getBBox();
        const scale = Math.min(
          2.5,
          Math.max(
            0.4,
            Math.min(
              (width - margin * 2) / Math.max(1, bbox.width),
              (height - margin * 2) / Math.max(1, bbox.height)
            )
          )
        );
        const tx = (width - scale * bbox.width) / 2 - scale * bbox.x;
        const ty = margin - scale * bbox.y; // bias slightly to top for better visibility
        const fitted = d3.zoomIdentity.translate(tx, ty).scale(scale);
        svg.transition().duration(300).call(zoom.transform as any, fitted);
        svg.on("dblclick.zoom", null);
        svg.on("dblclick", () => { svg.transition().duration(300).call(zoom.transform as any, fitted); });
      }
    } catch {}
  }, [prepared, maxLevel]);

  return (
    <div className="stack gap-sm" style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 12, background: "var(--surface)" }}>
      <div className="stack gap-sm" style={{ alignItems: "center" }}>
        <div>
          <strong>Explore Architecture Layers</strong>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[{ key: "business", label: "Business" }, { key: "architect", label: "Architect" }, { key: "engineer", label: "Engineer" }, { key: "all", label: "All" }].map((p) => (
            <button key={p.key} onClick={() => setRolePreset(p.key as any)} className="button sm" style={{ background: rolePreset === p.key ? "var(--primary)" : "var(--surface)", color: rolePreset === p.key ? "#fff" : "var(--text)" }}>{p.label}</button>
          ))}
          <span style={{ marginInlineStart: 8, color: "var(--text-secondary)", fontSize: 12 }}>Max Level</span>
          {LEVEL_LABELS.map((lab, i) => (
            <button key={lab} onClick={() => setMaxLevel(i)} className="button sm" style={{ background: maxLevel === i ? "var(--primary)" : "var(--surface)", color: maxLevel === i ? "#fff" : "var(--text)" }}>{lab}</button>
          ))}
        </div>
        {/* Role mapping hint */}
        <div style={{ fontSize: 12, color: "var(--text-secondary)", textAlign: "center" }}>
          {rolePreset === "business" && (
            <span>
              Business: Business L0–L2 (value streams → capabilities → processes/KPIs), Solution L0–L1, Deployment L0
            </span>
          )}
          {rolePreset === "architect" && (
            <span>
              Architect: Business L0–L1 (capability map, info domains, OKR traceability), Solution L0–L2, Deployment L0–L1
            </span>
          )}
          {rolePreset === "engineer" && (
            <span>
              Engineer: Business L0–L1 (domain context), Solution L0–L2 (components/APIs/flows), Deployment L0–L2 (platform, ops)
            </span>
          )}
          {rolePreset === "all" && (
            <span>
              All: Combined view across layers with deepest available detail
            </span>
          )}
        </div>
      </div>
      <div style={{ height: 520, borderRadius: 12, overflow: "hidden", background: "#fff" }}>
        <svg ref={svgRef} style={{ width: "100%", height: "100%" }}>
          <g ref={gRef} />
        </svg>
      </div>
    </div>
  );
}
