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
};

const COLORS: Record<NodeType, string> = {
  concept: "#374151",
  business: "#2563EB",
  solution: "#059669",
  deployment: "#7C3AED"
};

const LEVEL_LABELS = ["L0", "L1", "L2", "L3"];

const SAMPLE: ArchNode = {
  name: "Digital Platform",
  level: 0,
  type: "concept",
  children: [
    {
      name: "Business Architecture (L0→L1)",
      level: 0,
      type: "business",
      children: [
        {
          name: "Goals & KPIs (L1)",
          level: 1,
          type: "business",
          children: [
            { name: "Time‑to‑Market (L2)", level: 2, type: "business" },
            { name: "NPS/Experience (L2)", level: 2, type: "business" },
            { name: "Compliance (L2)", level: 2, type: "business" }
          ]
        },
        {
          name: "Capabilities & Journeys (L1)",
          level: 1,
          type: "business",
          children: [
            { name: "Onboarding (L2)", level: 2, type: "business" },
            { name: "Billing (L2)", level: 2, type: "business" }
          ]
        }
      ]
    },
    {
      name: "Solution Architecture (L0→L2)",
      level: 0,
      type: "solution",
      children: [
        {
          name: "API Gateway / BFF (L2)",
          level: 2,
          type: "solution",
          children: [
            { name: "REST/GraphQL (L3)", level: 3, type: "solution" },
            { name: "Rate Limit / Caching (L3)", level: 3, type: "solution" }
          ]
        },
        {
          name: "Integration Layer (L2)",
          level: 2,
          type: "solution",
          children: [
            { name: "Sync/Async (L3)", level: 3, type: "solution" },
            { name: "Event Bus (L3)", level: 3, type: "solution" }
          ]
        },
        {
          name: "Identity & Access (L2)",
          level: 2,
          type: "solution",
          children: [
            { name: "OAuth2/OIDC (L3)", level: 3, type: "solution" },
            { name: "SAML/JWT (L3)", level: 3, type: "solution" }
          ]
        }
      ]
    },
    {
      name: "Deployment Architecture (L2→L3)",
      level: 2,
      type: "deployment",
      children: [
        {
          name: "Environments (dev/test/stage/prod) (L2)",
          level: 2,
          type: "deployment",
          children: [
            { name: "Blue‑Green/Canary (L3)", level: 3, type: "deployment" }
          ]
        },
        {
          name: "Networking & Security (L2)",
          level: 2,
          type: "deployment",
          children: [
            { name: "WAF/mTLS/SG (L3)", level: 3, type: "deployment" },
            { name: "Zero‑Trust Touchpoints (L3)", level: 3, type: "deployment" }
          ]
        },
        {
          name: "Observability & DR (L2)",
          level: 2,
          type: "deployment",
          children: [
            { name: "Metrics/Logs/Traces (L3)", level: 3, type: "deployment" },
            { name: "Backups & RPO/RTO (L3)", level: 3, type: "deployment" }
          ]
        }
      ]
    }
  ]
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

export function ArchitectureExplorer({ data = SAMPLE }: { data?: ArchNode }) {
  const [maxLevel, setMaxLevel] = useState<number>(1);
  const [rolePreset, setRolePreset] = useState<"business" | "architect" | "engineer" | "all">("business");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const prepared = useMemo(() => { const seed = cloneDeep(data); collapseToLevel(seed, maxLevel); return seed; }, [data, maxLevel]);

  useEffect(() => {
    if (rolePreset === "business") setMaxLevel(1);
    if (rolePreset === "architect") setMaxLevel(2);
    if (rolePreset === "engineer") setMaxLevel(3);
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
          {[{ key: "business", label: "Business" }, { key: "architect", label: "Architects" }, { key: "engineer", label: "Engineers" }, { key: "all", label: "All" }].map((p) => (
            <button key={p.key} onClick={() => setRolePreset(p.key as any)} className="button sm" style={{ background: rolePreset === p.key ? "var(--primary)" : "var(--surface)", color: rolePreset === p.key ? "#fff" : "var(--text)" }}>{p.label}</button>
          ))}
          <span style={{ marginInlineStart: 8, color: "var(--text-secondary)", fontSize: 12 }}>Max Level</span>
          {LEVEL_LABELS.map((lab, i) => (
            <button key={lab} onClick={() => setMaxLevel(i)} className="button sm" style={{ background: maxLevel === i ? "var(--primary)" : "var(--surface)", color: maxLevel === i ? "#fff" : "var(--text)" }}>{lab}</button>
          ))}
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
