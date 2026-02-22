// ArchitectureExplorer.tsx — drop this into /app/components/ArchitectureExplorer.tsx or use in a page directly
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

/**
 * Zoomable Architecture Levels (L0→L3) — Next.js + D3
 *
 * Features
 * - Zoom & pan (wheel to zoom, drag to pan, double‑click to re‑center)
 * - Collapsible nodes (click a node to expand/collapse children)
 * - Level filter chips (show L0/L1/L2/L3)
 * - Role presets (Business / Architects / Engineers)
 * - Responsive SVG
 * - Download as PNG
 *
 * Tailwind recommended for styling.
 */

// --- Sample hierarchical data --- //
// You can load this from CMS/MD/JSON instead.
const sampleData: ArchNode = {
  name: "Digital Platform",
  level: 0,
  type: "concept",
  children: [
    {
      name: "Business Architecture (L0→L3)",
      level: 0,
      type: "business",
      children: [
        {
          name: "Goals & KPIs (L1)",
          level: 1,
          type: "business",
          children: [
            { name: "Time‑to‑Market (L2)", level: 2, type: "business",
              children: [
                { name: "Lead Time for Change (L3)", level: 3, type: "business" },
                { name: "Deployment Frequency (L3)", level: 3, type: "business" }
              ]
            },
            { name: "NPS/Experience (L2)", level: 2, type: "business",
              children: [
                { name: "Customer Effort Score (L3)", level: 3, type: "business" },
                { name: "Task Success (L3)", level: 3, type: "business" }
              ]
            },
            { name: "Compliance (L2)", level: 2, type: "business",
              children: [
                { name: "GDPR/HIPAA (L3)", level: 3, type: "business" },
                { name: "SOX/PCI (L3)", level: 3, type: "business" }
              ]
            }
          ]
        },
        {
          name: "Capabilities & Journeys (L1)",
          level: 1,
          type: "business",
          children: [
            { name: "Onboarding (L2)", level: 2, type: "business",
              children: [
                { name: "Self‑Service (L3)", level: 3, type: "business" },
                { name: "KYC/Verification (L3)", level: 3, type: "business" }
              ]
            },
            { name: "Billing (L2)", level: 2, type: "business",
              children: [
                { name: "Invoices (L3)", level: 3, type: "business" },
                { name: "Payments (L3)", level: 3, type: "business" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Solution Architecture (L0→L3)",
      level: 0,
      type: "solution",
      children: [
        {
          name: "API & Edge (L1)", level: 1, type: "solution",
          children: [
            { name: "API Gateway / BFF (L2)", level: 2, type: "solution",
              children: [
                { name: "REST/GraphQL (L3)", level: 3, type: "solution" },
                { name: "Rate Limit / Caching (L3)", level: 3, type: "solution" }
              ]
            }
          ]
        },
        {
          name: "Integration (L1)", level: 1, type: "solution",
          children: [
            { name: "Integration Layer (L2)", level: 2, type: "solution",
              children: [
                { name: "Sync/Async (L3)", level: 3, type: "solution" },
                { name: "Event Bus (L3)", level: 3, type: "solution" }
              ]
            }
          ]
        },
        {
          name: "Identity & Access (L1)", level: 1, type: "solution",
          children: [
            { name: "Identity & Access (L2)", level: 2, type: "solution",
              children: [
                { name: "OAuth2/OIDC (L3)", level: 3, type: "solution" },
                { name: "SAML/JWT (L3)", level: 3, type: "solution" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Deployment Architecture (L0→L3)",
      level: 0,
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

// --- Types --- //
type NodeType = "business" | "solution" | "deployment" | "concept";

type ArchNode = {
  name: string;
  level: number; // 0..3
  type: NodeType;
  children?: ArchNode[];
  _children?: ArchNode[]; // collapsed children
};

// --- Helpers --- //
const COLORS: Record<NodeType, string> = {
  concept: "#374151", // slate‑700
  business: "#2563EB", // blue‑600
  solution: "#059669", // emerald‑600
  deployment: "#7C3AED" // violet‑600
};

const LEVEL_LABELS = ["L0", "L1", "L2", "L3"];

function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function collapseToLevel(root: ArchNode, maxLevel: number) {
  const recur = (n: ArchNode) => {
    if (!n.children) return;
    if (n.level >= maxLevel) {
      n._children = n.children;
      n.children = undefined;
    } else {
      n._children = undefined;
      n.children?.forEach(recur);
    }
  };
  recur(root);
}

function toggleNode(n: any) {
  if (n.children) {
    n._children = n.children;
    n.children = null;
  } else {
    n.children = n._children;
    n._children = null;
  }
}

// --- Main Component --- //
export default function ArchitectureExplorer({
  data = sampleData
}: {
  data?: ArchNode;
}) {
  const [maxLevel, setMaxLevel] = useState<number>(1); // default show L0‑L1
  const [rolePreset, setRolePreset] = useState<"business" | "architect" | "engineer" | "all">("business");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const [rootState, setRootState] = useState<d3.HierarchyPointNode<ArchNode> | null>(null);

  const prepared = useMemo(() => {
    const seed = cloneDeep(data);
    collapseToLevel(seed, maxLevel);
    return seed;
  }, [data, maxLevel]);

  // role presets adjust maxLevel + filters
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

    // Clear previous
    g.selectAll("*").remove();

    // Setup zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 2.5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform.toString());
      });
    svg.call(zoom as any);

    // Tree layout
    const root = d3.hierarchy(prepared);
    const tree = d3.tree<ArchNode>().size([height - 40, width - 220]);
    const rootPoint = tree(root) as d3.HierarchyPointNode<ArchNode>;
    setRootState(rootPoint);

    const link = g
      .selectAll("path.link")
      .data(rootPoint.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#D1D5DB")
      .attr("stroke-width", 2)
      .attr("d", d3.linkHorizontal<d3.HierarchyPointLink<ArchNode>, [number, number]>()
        .x((d: any) => d.y)
        .y((d: any) => d.x)
      );

    const node = g
      .selectAll("g.node")
      .data(rootPoint.descendants())
      .enter()
      .append("g")
      .attr("class", "node cursor-pointer")
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`)
      .on("click", (_, d: any) => {
        toggleNode(d.data);
        // re-render by bumping state level (cheap way)
        setMaxLevel((m) => m + 0); // trigger memo
      });

    node
      .append("circle")
      .attr("r", 16)
      .attr("fill", (d: any) => COLORS[d.data.type])
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("opacity", (d: any) => (d.data.level <= maxLevel ? 1 : 0.6));

    node
      .append("text")
      .attr("dy", 5)
      .attr("x", 24)
      .attr("font-size", 15)
      .attr("font-family", "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial")
      .text((d: any) => d.data.name)
      .attr("fill", "#111827")
      .attr("opacity", (d: any) => (d.data.level <= maxLevel ? 1 : 0.85));

    // Fit-to-view
    try {
      const margin = 40;
      const gNode = gRef.current;
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
        const ty = margin - scale * bbox.y;
        const fitted = d3.zoomIdentity.translate(tx, ty).scale(scale);
        svg.transition().duration(300).call(zoom.transform, fitted);
        svg.on("dblclick.zoom", null);
        svg.on("dblclick", () => { svg.transition().duration(300).call(zoom.transform, fitted); });
      }
    } catch {}
  }, [prepared, maxLevel]);

  function downloadPNG() {
    const svg = svgRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const bbox = svg.getBoundingClientRect();
    canvas.width = Math.max(1200, bbox.width * 2);
    canvas.height = Math.max(800, bbox.height * 2);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const a = document.createElement("a");
      a.download = `architecture-explorer-${Date.now()}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
  }

  return (
    <div className="w-full space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Architecture Explorer</h2>
          <p className="text-sm text-gray-600">Zoom from L0 to L3. Click nodes to expand/collapse. Wheel to zoom, drag to pan. Double‑click to reset.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={downloadPNG} className="px-3 py-2 rounded-xl shadow text-sm border bg-white hover:bg-gray-50">Download PNG</button>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wide text-gray-500">Role presets</span>
        {[
          { key: "business", label: "Business" },
          { key: "architect", label: "Architects" },
          { key: "engineer", label: "Engineers" },
          { key: "all", label: "All" }
        ].map((p: any) => (
          <button
            key={p.key}
            onClick={() => setRolePreset(p.key)}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              rolePreset === p.key ? "bg-black text-white" : "bg-white hover:bg-gray-50"
            }`}
          >
            {p.label}
          </button>
        ))}

        <span className="ml-4 text-xs uppercase tracking-wide text-gray-500">Max Level</span>
        {LEVEL_LABELS.map((lab, i) => (
          <button
            key={lab}
            onClick={() => setMaxLevel(i)}
            className={`px-2.5 py-1.5 rounded text-sm border ${
              maxLevel === i ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"
            }`}
          >
            {lab}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border bg-white shadow overflow-hidden" style={{ height: 560 }}>
        <svg ref={svgRef} className="w-full h-full">
          <g ref={gRef} />
        </svg>
      </div>

      <Legend />
    </div>
  );
}

function Legend() {
  const items: { label: string; color: string }[] = [
    { label: "Concept / Root", color: COLORS.concept },
    { label: "Business", color: COLORS.business },
    { label: "Solution", color: COLORS.solution },
    { label: "Deployment", color: COLORS.deployment }
  ];
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="text-xs uppercase tracking-wide text-gray-500">Legend</span>
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-2">
          <span className="inline-block w-3.5 h-3.5 rounded-full" style={{ backgroundColor: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

// --- Example usage page (Next.js app router) --- //
// Create /app/solutions/explorer/page.tsx and paste below. Or keep a single file in /app/page.tsx for demo.
export function ExamplePage() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Solutions: Interactive Architecture Explorer</h1>
      <p className="text-gray-600 mb-6">Explore Business → Solution → Deployment, and zoom from L0 to L3.</p>
      <ArchitectureExplorer />
    </main>
  );
}
