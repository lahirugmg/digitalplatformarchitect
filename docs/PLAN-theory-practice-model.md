# Implementation Plan: Theory & Practice Architecture Knowledge Model

**Date:** February 14, 2026
**Status:** Draft
**Origin:** Whiteboard sketch + user vision

---

## 1. Vision Summary

Transform the Digital Platform Architect site into a **dual-axis knowledge platform** organized around two fundamental dimensions:

1. **Theory <-> Practice** - Every concept has a theoretical explanation AND a practical, interactive experience. They cross-link.
2. **High Level <-> Detail** (L0 -> L1 -> L2 -> Ln) - Users can zoom from a 10,000-foot overview down to implementation specifics.

The **landing page** is a single, large **interactive playground** (the "Architecture Explorer") where users begin their journey by exploring all aspects visually.

### From the Whiteboard

```
Theory <-------> Practice
High Level (L0) <-------> Details (L1, L2, ... Ln)

Personas:                   Architecture Types:
- Business Team             - Business Architecture
- Business Analyst          - Solution Architecture
- Enterprise Architect      - Deployment Architecture
- Technical Lead
- Developer
```

---

## 2. Information Architecture

### 2.1 Dual Category Model

```
/                               ← Landing: Interactive L0 Playground (Architecture Explorer)
├── /theory/                    ← Theory hub: concepts, patterns, principles
│   ├── /theory/patterns/       ← Pattern theory (what, why, when, trade-offs)
│   ├── /theory/building-blocks/← Building block theory (capabilities, purpose)
│   ├── /theory/principles/     ← Architecture principles (CAP, SOLID, etc.)
│   └── /theory/[slug]          ← Individual theory article
├── /practice/                  ← Practice hub: playgrounds, examples, how-tos
│   ├── /practice/playgrounds/  ← Interactive playgrounds (existing 3 + new)
│   ├── /practice/blueprints/   ← Reference architectures with code
│   ├── /practice/case-studies/ ← Real-world examples
│   └── /practice/[slug]        ← Individual practice guide
├── /explore/                   ← The L0 interactive explorer (full-page)
│   ├── /explore/business       ← L1: Business Architecture view
│   ├── /explore/solution       ← L1: Solution Architecture view
│   └── /explore/deployment     ← L1: Deployment Architecture view
└── /progress/                  ← Learning Progress Hub (natural milestone tracking)
```

### 2.2 Depth Levels (L0 -> Ln)

| Level | Name | What It Shows | Example |
|-------|------|---------------|---------|
| **L0** | Architecture Overview | All 9 building blocks + their relationships in one interactive diagram | Landing page playground |
| **L1** | Architecture Type | Business / Solution / Deployment view of the platform | Click a block → see its role in each architecture type |
| **L2** | Building Block Detail | Deep-dive into one block (e.g., "Enterprise Integration") | Components, patterns used, technology options |
| **L3** | Pattern/Component | Individual pattern or component within a block | Event-Driven Architecture: theory + playground |
| **Ln** | Implementation | Code, config, IaC, vendor-specific details | Kafka setup, Terraform modules |

### 2.3 Theory <-> Practice Cross-Linking

Every content item has BOTH a theory and practice dimension:

| Theory Side | Practice Side | Link Type |
|-------------|--------------|-----------|
| Pattern explanation (what/why/when) | Interactive playground | "Try this pattern" CTA |
| Building block capabilities | Blueprint with real stack | "See it in action" CTA |
| Architecture principle | Case study showing principle | "Real-world example" link |
| Trade-off analysis | Side-by-side comparison playground | "Compare hands-on" CTA |

### 2.4 Persona Routing

Different entry points and recommended paths based on role:

| Persona | Starting View | Recommended Depth | Key Content |
|---------|--------------|-------------------|-------------|
| **Business Team** | L0 overview → Business Architecture (L1) | L0-L1 | Capabilities, value propositions |
| **Business Analyst** | L0 → Business Architecture → Solution (L1-L2) | L0-L2 | Requirements mapping, capability models |
| **Enterprise Architect** | L0 → All architecture types (L1-L2) | L0-L3 | Patterns, trade-offs, blueprints |
| **Technical Lead** | L0 → Solution/Deployment (L2-L3) | L1-L3 | Patterns, technology choices, playgrounds |
| **Developer** | Practice hub → Playgrounds (L3-Ln) | L2-Ln | Implementation, code, IaC, hands-on |

---

## 3. Landing Page: The Architecture Explorer (L0 Playground)

The landing page becomes **one large interactive diagram** replacing the current hero + cards layout.

### 3.1 Design Concept

```
┌─────────────────────────────────────────────────────────────────┐
│  Digital Platform Architect                    [Theory] [Practice] [Progress] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─ "I am a..." persona selector (optional, top-right) ─┐     │
│                                                                 │
│           ┌────────────────────────────────────┐               │
│           │                                    │               │
│           │   INTERACTIVE L0 DIAGRAM           │               │
│           │                                    │               │
│           │   9 Building Blocks as nodes       │               │
│           │   Connections showing relationships │               │
│           │   Click any block → L1 detail      │               │
│           │   Hover → tooltip with summary     │               │
│           │   Animated data flows when active   │               │
│           │                                    │               │
│           └────────────────────────────────────┘               │
│                                                                 │
│  ┌── Architecture Type Tabs ──┐                                │
│  │ Business │ Solution │ Deployment │                          │
│  └─ (toggle diagram view) ────┘                                │
│                                                                 │
│  ┌── Quick Stats ─────────────────┐                            │
│  │ 9 Blocks │ 65 Patterns │ 3 Playgrounds │ 2 Blueprints │   │
│  └────────────────────────────────┘                            │
│                                                                 │
│  ┌── "Start Your Journey" ────────┐                            │
│  │ Theory Path → Learn concepts   │                            │
│  │ Practice Path → Build hands-on │                            │
│  └────────────────────────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 L0 Diagram Interactions

- **Click a building block** → navigates to L1 (block detail within chosen architecture type)
- **Hover a block** → shows tooltip with: name, 1-line description, pattern count, link to theory + practice
- **Architecture Type tabs** → re-renders the diagram with different emphasis:
  - Business: highlights business capabilities and value flows
  - Solution: highlights integration patterns and data flows
  - Deployment: highlights infrastructure, scaling, and operations
- **Animated connections** → show data/message flows between blocks
- **Persona selector** → adjusts recommended depth and highlights relevant blocks

### 3.3 Technology for L0 Playground

- **ReactFlow** (already in project) for the interactive node-based diagram
- Each building block = a custom node with icon, name, and status indicators
- Connections = edges with animated flow (reuse AnimatedEdge from data-pipeline)
- Zoom, pan, minimap for navigation

---

## 4. Content Model Changes

### 4.1 Enhanced Frontmatter Schema

Every content file gets additional metadata:

```yaml
---
title: "Event-Driven Architecture"
slug: event-driven-architecture
type: pattern                           # pattern | block | principle | blueprint
category: theory                        # theory | practice | both
depth_level: L3                         # L0 | L1 | L2 | L3 | Ln
architecture_types:                     # which architecture views it appears in
  - solution
  - deployment
personas:                               # relevant personas
  - enterprise-architect
  - technical-lead
  - developer
related_theory: /theory/patterns/event-driven-architecture
related_practice: /practice/playgrounds/message-flow
parent_block: messaging-streaming-platform    # which L2 block this belongs to
prerequisites:
  - messaging-patterns
  - async-communication
---
```

### 4.2 New Content Needed

| Content | Type | Depth | Priority |
|---------|------|-------|----------|
| Architecture Overview (L0 diagram data) | data/JSON | L0 | P0 - Required |
| Business Architecture view descriptions | theory | L1 | P1 |
| Solution Architecture view descriptions | theory | L1 | P1 |
| Deployment Architecture view descriptions | theory | L1 | P1 |
| Block-level L2 pages (9 blocks) | both | L2 | P1 |
| Persona landing pages | guide | L0 | P2 |
| Architecture principles articles | theory | L2 | P2 |
| Case studies | practice | L2-L3 | P3 |

---

## 5. Implementation Phases

### Phase 1: Content Restructure + L0 Explorer (2 weeks)

**Goal:** New landing page with interactive L0 playground, restructured navigation.

**Tasks:**
1. Create the L0 architecture diagram data model (`lib/architecture-model.ts`)
   - 9 building blocks as nodes with positions, descriptions, relationships
   - 3 architecture type view configurations (Business/Solution/Deployment)
   - Connection definitions between blocks

2. Build the Architecture Explorer component (`app/components/ArchitectureExplorer.tsx`)
   - ReactFlow-based full-screen interactive diagram
   - Custom block nodes with hover tooltips
   - Animated connections between blocks
   - Architecture type tab switching
   - Click-through navigation to L1/L2 pages

3. Redesign landing page (`app/page.tsx`)
   - Replace current hero + cards with the Architecture Explorer
   - Add architecture type tabs below the diagram
   - Add quick stats bar
   - Add "Start Your Journey" section with Theory/Practice paths
   - Keep responsive: on mobile, show a simplified list view with expand/collapse

4. Restructure navigation (`app/layout.tsx`)
   - Update nav: Home | Theory | Practice | Progress
   - Add breadcrumb component for depth navigation (L0 > L1 > L2...)

5. Migrate existing content into dual taxonomy
   - Add enhanced frontmatter to all 65 pattern files
   - Add enhanced frontmatter to all 9 block files
   - Map each content item to theory, practice, or both

### Phase 2: Theory & Practice Hubs (1 week)

**Goal:** Two dedicated hub pages with cross-linking.

**Tasks:**
1. Create Theory hub (`app/theory/page.tsx`)
   - Category sections: Patterns, Building Blocks, Principles
   - Filter by architecture type and depth level
   - Each card shows: title, category, depth level, "Practice" link

2. Create Practice hub (`app/practice/page.tsx`)
   - Category sections: Playgrounds, Blueprints, Case Studies
   - Each card shows: title, type, difficulty, "Theory" link

3. Build Theory <-> Practice linking system
   - Auto-resolve `related_theory` and `related_practice` from frontmatter
   - "Try this in Practice" CTA on every theory page
   - "Learn the Theory" CTA on every practice page
   - Sidebar widget showing the counterpart

4. Move existing pages into new structure
   - `/patterns/*` → `/theory/patterns/*` (with redirects)
   - `/playgrounds/*` → `/practice/playgrounds/*` (with redirects)

### Phase 3: Depth Navigation + Architecture Types (1 week)

**Goal:** L0 -> L1 -> L2 -> L3 drill-down with architecture type views.

**Tasks:**
1. Create L1 architecture type pages
   - `/explore/business` - Business Architecture view
   - `/explore/solution` - Solution Architecture view
   - `/explore/deployment` - Deployment Architecture view
   - Each shows the 9 blocks through that architecture lens

2. Create L2 building block detail pages
   - `/explore/[block-slug]` - Deep-dive into one building block
   - Shows: description, patterns used, related playgrounds, technology options
   - Sub-sections for each architecture type perspective

3. Build breadcrumb/depth navigation component
   - Shows current level: L0 > Enterprise Integration > Event-Driven Architecture
   - Can jump to any ancestor level
   - Indicates current depth level visually

4. Implement depth-aware content filtering
   - L0 content for landing page
   - L1 content for architecture type views
   - L2+ content filtered by building block and architecture type

### Phase 4: Persona System + Polish (1 week)

**Goal:** Role-based entry points and recommended paths.

**Tasks:**
1. Add persona selector to landing page
   - "I am a..." dropdown or pill selector
   - Adjusts: highlighted blocks, recommended depth, suggested path
   - Saved to localStorage for return visits

2. Create persona-specific recommended paths
   - After persona selection, show a guided path through content
   - Highlight most relevant theory and practice content
   - Adjust progress hub milestone emphasis based on persona

3. Polish cross-linking
   - Ensure every theory page links to related practice
   - Ensure every practice page links to related theory
   - Add "Related at this depth level" suggestions
   - Add "Go deeper" and "Go broader" navigation

4. Mobile optimization for new pages
   - L0 explorer: simplified list view on mobile
   - Theory/Practice hubs: responsive grids
   - Depth navigation: collapsible breadcrumbs

---

## 6. Data Model

### 6.1 Architecture Model (`lib/architecture-model.ts`)

```typescript
interface BuildingBlock {
  id: string                    // e.g., 'enterprise-integration'
  name: string                  // e.g., 'Enterprise Integration'
  icon: string                  // emoji or icon name
  description: string           // 1-line summary
  detailDescription: string     // full description
  category: string              // grouping
  patterns: string[]            // related pattern slugs
  connections: Connection[]     // links to other blocks
  views: {
    business: ViewConfig        // how this block appears in business view
    solution: ViewConfig        // how it appears in solution view
    deployment: ViewConfig      // how it appears in deployment view
  }
}

interface Connection {
  targetBlock: string           // target block id
  type: 'data-flow' | 'integration' | 'dependency' | 'management'
  label: string                 // e.g., 'Event Bus', 'API Gateway'
  bidirectional: boolean
}

interface ViewConfig {
  emphasis: 'primary' | 'secondary' | 'supporting'
  label: string                 // role in this view
  position: { x: number; y: number }
}

interface Persona {
  id: string
  name: string
  icon: string
  defaultView: 'business' | 'solution' | 'deployment'
  depthRange: [string, string]  // e.g., ['L0', 'L2']
  highlightBlocks: string[]     // block ids to emphasize
}
```

### 6.2 Content Taxonomy

```
Content Type        Theory Side              Practice Side
─────────────────────────────────────────────────────────────
Pattern             What/Why/When/Tradeoffs  Playground + Code Examples
Building Block      Capabilities/Purpose     Blueprint + Vendor Options
Principle           Definition/Rationale     Case Study + Assessment
Architecture Type   Framework/Methodology    Reference Architecture
```

---

## 7. Migration Strategy

### Existing Content Mapping

| Current Location | New Theory Location | New Practice Location |
|-----------------|--------------------|-----------------------|
| `content-export/patterns/*.md` | `/theory/patterns/[slug]` | Link to existing playgrounds |
| `content-export/blocks/*.md` | `/theory/building-blocks/[slug]` | `/practice/blueprints/[slug]` |
| `content-export/blueprints/*.md` | (reference from theory) | `/practice/blueprints/[slug]` |
| `app/playgrounds/*` | (link from theory pages) | `/practice/playgrounds/*` |
| `app/progress/page.tsx` | (links from theory/practice) | Progress milestone hub |

### URL Redirects Required

```
/patterns/*          → /theory/patterns/*
/playgrounds/*       → /practice/playgrounds/*
```

---

## 8. Risk Assessment

| Risk | Mitigation |
|------|-----------|
| L0 diagram complexity on mobile | Provide simplified list-based fallback |
| Content restructure breaks existing links | Implement Next.js redirects for all old URLs |
| Too many depth levels confuse users | Start with L0-L2 only, add deeper levels when content exists |
| Persona system adds complexity without value | Make persona optional, default to "Explorer" |
| Large scope delays delivery | Phase 1 (L0 explorer) is the MVP - ships independently |

---

## 9. Success Criteria

- [ ] Landing page is a single interactive playground showing all 9 building blocks
- [ ] Users can switch between Business/Solution/Deployment architecture views
- [ ] Every content page has a Theory and Practice counterpart (or "Coming Soon")
- [ ] Users can drill from L0 overview → L1 type → L2 block → L3 pattern
- [ ] Breadcrumb navigation shows current depth level
- [ ] Cross-links between theory and practice pages work in both directions
- [ ] Mobile users get a functional (if simplified) experience
- [ ] Existing playgrounds still work at new URLs with redirects from old URLs
