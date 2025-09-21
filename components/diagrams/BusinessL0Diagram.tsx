"use client";

import type { FC } from "react";

type GlossaryItem = { term: string; description: string };

type LegendProps = { x: number; y: number };
type GlossaryProps = { x: number; y: number; items: GlossaryItem[] };

const baseStyles = `
  text { font-family: 'system-ui', sans-serif; }
  .title { font: 700 28px system-ui; fill: #0f172a; }
  .scope { font: 500 12px system-ui; fill: #475569; }
  .mission-card { fill: #f8fafc; stroke: #0f172a; stroke-width: 2; rx: 20; }
  .mission-title { font: 700 13px system-ui; fill: #0f172a; text-transform: uppercase; letter-spacing: .04em; }
  .goal-item { font: 500 12px system-ui; fill: #1e293b; }
  .stakeholder-pill { fill: #fef3c7; stroke: #d97706; stroke-width: 2; rx: 22; }
  .stakeholder-text { font: 600 12px system-ui; fill: #92400e; }
  .unit-lane { fill: #e0f2fe; stroke: #0284c7; stroke-width: 2; rx: 16; }
  .unit-name { font: 700 12px system-ui; fill: #0f172a; letter-spacing: .04em; text-transform: uppercase; }
  .unit-desc { font: 500 11px system-ui; fill: #475569; }
  .stream-band { fill: #06b6d4; opacity: .88; }
  .stream-band.alt { fill: #22d3ee; opacity: .88; }
  .stream-label { font: 700 13px system-ui; fill: #0f172a; }
  .stream-sub { font: 500 11px system-ui; fill: #334155; }
  .kpi-card { fill: #eef2ff; stroke: #6366f1; stroke-width: 2; rx: 12; }
  .kpi-text { font: 600 12px system-ui; fill: #312e81; }
  .enablement { fill: #ecfdf5; stroke: #047857; stroke-width: 2; rx: 14; }
  .enablement-label { font: 600 12px system-ui; fill: #065f46; }
  .legend-card { fill: rgba(255,255,255,0.96); stroke: #c7d2fe; stroke-width: 1.5; rx: 12; }
  .legend-title { font: 700 12px system-ui; fill: #0f172a; letter-spacing: .04em; text-transform: uppercase; }
  .legend-label { font: 500 11px system-ui; fill: #334155; }
`;

const Legend: FC<LegendProps> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`} aria-label="Legend">
    <rect className="legend-card" x={0} y={0} width={300} height={190} rx={12} />
    <text className="legend-title" x={20} y={28}>Notation</text>

    <path className="stream-band" d="M20 56 H150 L170 76 L150 96 H20 Z" />
    <text className="legend-label" x={190} y={80}>Value stream arrow</text>

    <rect className="unit-lane" x={20} y={112} width={120} height={34} />
    <text className="legend-label" x={190} y={134}>Business unit lane</text>

    <rect className="stakeholder-pill" x={20} y={150} width={120} height={30} />
    <text className="legend-label" x={190} y={170}>Stakeholder group</text>
  </g>
);

const GlossaryCard: FC<GlossaryProps> = ({ x, y, items }) => {
  const height = 60 + items.length * 22;
  return (
    <g transform={`translate(${x}, ${y})`} aria-label="Glossary">
      <rect className="legend-card" x={0} y={0} width={320} height={height} rx={12} />
      <text className="legend-title" x={20} y={30}>Glossary</text>
      {items.map((item, index) => (
        <text key={item.term} className="legend-label" x={20} y={58 + index * 22}>
          <tspan className="legend-title">{item.term}</tspan>
          <tspan className="legend-label" dx={8}>{item.description}</tspan>
        </text>
      ))}
    </g>
  );
};

export const BusinessL0Diagram: FC = () => {
  const glossary: GlossaryItem[] = [
    { term: "Value Stream", description: "End-to-end sequence that delivers customer value" },
    { term: "Stakeholder", description: "External or internal party impacted by outcomes" },
    { term: "Enablement", description: "Shared capability supporting every stream" },
  ];

  return (
    <svg
      viewBox="0 0 1100 820"
      role="img"
      aria-label="Unified Commerce — Business Overview (L0)"
      style={{ width: "100%", height: "auto" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <style>{baseStyles}</style>

      <text className="title" x={550} y={52} textAnchor="middle">Unified Commerce — Business Overview (L0)</text>
      <text className="scope" x={550} y={70} textAnchor="middle">Scope: enterprise commerce | Version 2024.07</text>

      {/* Mission */}
      <g transform="translate(80, 100)" aria-label="Mission">
        <rect className="mission-card" x={0} y={0} width={420} height={160} />
        <text className="mission-title" x={24} y={38}>Mission</text>
        <text className="goal-item" x={24} y={64}>Deliver trusted, unified buying experiences that grow lifetime value.</text>
        <text className="mission-title" x={24} y={100}>2024 focus outcomes</text>
        <text className="goal-item" x={24} y={124}>
          <tspan x={24} y={124}>- Digital revenue +15%</tspan>
          <tspan x={24} y={144}>- NPS >= 65 across channels</tspan>
          <tspan x={24} y={164}>- Order-to-ship &lt; 18 hours</tspan>
        </text>
      </g>

      {/* Stakeholders */}
      <g transform="translate(760, 100)" aria-label="Stakeholders">
        <text className="mission-title" x={110} y={28} textAnchor="middle">Stakeholders</text>
        {[
          "Customers & members",
          "Partners & suppliers",
          "Regulators & compliance",
          "Store & care teams",
        ].map((label, idx) => (
          <g key={label} transform={`translate(0, ${48 + idx * 52})`}>
            <rect className="stakeholder-pill" x={0} y={0} width={220} height={38} />
            <text className="stakeholder-text" x={110} y={24} textAnchor="middle">{label}</text>
          </g>
        ))}
      </g>

      {/* Business unit lanes */}
      <g aria-label="Business units">
        {[
          { x: 140, title: "Marketing & growth", desc: "Brand · Demand · Loyalty" },
          { x: 380, title: "Product & experience", desc: "Journeys · Offers · Pricing" },
          { x: 620, title: "Operations & service", desc: "Fulfilment · Care · Retention" },
          { x: 860, title: "Finance", desc: "Billing · Risk" },
        ].map(({ x, title, desc }) => (
          <g key={title} transform={`translate(${x}, 310)`}>
            <rect className="unit-lane" x={0} y={0} width={title === "Finance" ? 140 : 220} height={200} />
            <text className="unit-name" x={(title === "Finance" ? 70 : 110)} y={32} textAnchor="middle">{title}</text>
            <text className="unit-desc" x={(title === "Finance" ? 70 : 110)} y={56} textAnchor="middle">{desc}</text>
          </g>
        ))}
      </g>

      {/* Value streams */}
      {[
        {
          d: "M140 350 H840 L880 380 L840 410 H140 Z",
          label: "Attract & Engage",
          sub: "Insights · Storytelling · Omnichannel reach",
          alt: false,
        },
        {
          d: "M160 410 H840 L880 440 L840 470 H160 Z",
          label: "Commit & Fulfil",
          sub: "Assisted selling · Checkout · Delivery promise",
          alt: true,
        },
        {
          d: "M180 470 H840 L880 500 L840 530 H180 Z",
          label: "Support & Grow",
          sub: "Care journeys · Feedback · Loyalty",
          alt: false,
        },
      ].map(({ d, label, sub, alt }) => (
        <g key={label}>
          <path className={`stream-band${alt ? " alt" : ""}`} d={d} />
          <text className="stream-label" x={540} y={alt ? 438 : label === "Attract & Engage" ? 378 : 498} textAnchor="middle">{label}</text>
          <text className="stream-sub" x={540} y={alt ? 456 : label === "Attract & Engage" ? 394 : 516} textAnchor="middle">{sub}</text>
        </g>
      ))}

      {/* KPIs */}
      {[
        { x: 140, title: "Customer", text: "NPS >= 65 · Repeat purchase >= 75%" },
        { x: 440, title: "Operational", text: "Order-to-ship < 18h · Return cycle <= 5d" },
        { x: 740, title: "Commercial", text: "GMV +15% · Margin guardrails met" },
      ].map(({ x, title, text }) => (
        <g key={title} transform={`translate(${x}, 540)`}>
          <rect className="kpi-card" x={0} y={0} width={title === "Commercial" ? 260 : 280} height={60} />
          <text className="mission-title" x={16} y={28}>{title}</text>
          <text className="kpi-text" x={16} y={46}>{text}</text>
        </g>
      ))}

      {/* Enablement */}
      {[
        { x: 180, label: "Platform & API management" },
        { x: 440, label: "Data & insight foundation" },
        { x: 700, label: "Risk, trust & governance" },
      ].map(({ x, label }) => (
        <g key={label} transform={`translate(${x}, 620)`}>
          <rect className="enablement" x={0} y={0} width={220} height={52} />
          <text className="enablement-label" x={110} y={32} textAnchor="middle">{label}</text>
        </g>
      ))}

      <Legend x={160} y={700} />
      <GlossaryCard x={620} y={690} items={glossary} />
    </svg>
  );
};
