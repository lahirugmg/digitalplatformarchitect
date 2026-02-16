# IMP-023: L0-to-Ln Architecture Playground Enhancements

**Status:** Proposed  
**Priority:** High  
**Category:** Architecture Playground / Learning Experience  
**Effort:** Large (multi-sprint)  
**Created:** 2026-02-15  
**Reference:** [WSO2 Blog — Architecture Diagramming: From L0 to Ln](https://wso2.com/library/blogs/architecture-diagramming-from-lo-to-ln)

---

## Source Material Summary

The WSO2 blog by Erandi Ganepola describes a **human-centered L0-to-Ln architecture diagramming methodology** used at WSO2. The core principles are:

1. **Audience-first clarity** — each diagram level answers only what that audience needs; noise is deferred to deeper levels.
2. **L0-Ln applies within each architecture vertical independently** (Business, Solution, Deployment) — NOT across them.
3. **Cross-referencing between verticals** is allowed based on audience understanding.
4. **Progressive disclosure** — start abstract (L0), add detail step-by-step (L1, L2, L3…Ln) only when the conversation and decisions require it.
5. **Notation-agnostic** — the methodology doesn't mandate UML, C4, or any specific notation.

### Key Images from the Blog (Described in Text)

#### Image 1: Da Vinci Flying Machine Sketch
A reproduction of Leonardo da Vinci's 15th-century flying machine sketch. Used as an analogy — architecture diagrams, like da Vinci's sketches, use visual abstraction to simplify complex systems into clear, timeless representations that remain understandable across centuries.

#### Image 2: L0-to-Ln Matrix Across Verticals
A matrix/grid diagram showing how L0-to-Ln levels apply independently to three architecture verticals:

```
                Business Architecture    Solution Architecture    Deployment Architecture
                ─────────────────────    ─────────────────────    ───────────────────────
L0 (Abstract)   Business capabilities    Abstract components      Abstract deployment view
                & value flows            & interactions           & cloud regions
                                         (no product names)

L1 (High)       Business processes &     Concrete technologies    Cloud providers, VPCs,
                outcomes                 (API GW, IDP, Integration networking topology
                                         Runtime), integration flow

L2 (Detailed)   Detailed processes,      Communication patterns   Container orchestration,
                decision trees,          (REST, async), micro-    scaling config, load
                rules & exceptions       services, data paths     balancing rules

L3–Ln (Deep)    KPI formulas,           Per-component deep dive, Pod specs, Terraform,
                operational metrics      code-level details       CI/CD pipelines
```

**Key insight from image:** Each vertical has its OWN L0-to-Ln ladder. You don't merge Business L0 → Solution L1 → Deployment L2. They are parallel ladders that can be cross-referenced.

#### Image 3: Solution Architecture Diagram — L0
An abstract, high-level solution diagram for an apparel manufacturer/distributor use case showing:
- **Left side:** Two customer segments — "Retail Customers" (via e-commerce website) and "Wholesale Customers" (via email/file uploads)
- **Center:** Three horizontal layers stacked vertically:
  - Top: "API Management Layer" (secure external interface)
  - Middle: "Integration Layer" (data transformation, routing, interoperability)
  - Bottom: "Core ERP / Internal Systems" (business logic, storage, coordination)
- **Right side:** Two external entities — "Suppliers" (raw materials) and "Delivery Partners" (dispatch)
- **Connections:** Simple arrows showing order flow from customers → through layers → to suppliers/delivery
- **Style:** NO product names, NO protocols, NO technology specifics. Pure abstract boxes with business-language labels.

#### Image 4: Solution Architecture Diagram — L1
Same use case but now with concrete technology names and integration details:
- Customer channels now labeled with specific entry points (e.g., "REST API", "SFTP/Email Adapter")
- API Management layer now shows "API Gateway" with specific capabilities (rate limiting, auth)
- Integration layer shows specific products (e.g., "WSO2 Micro Integrator", message broker)
- Named integration patterns visible (content-based routing, data transformation)
- ERP system named with specific database technology
- Connections now show protocol types (HTTP/REST, AMQP, JDBC)

#### Image 5: Business Architecture Diagram — L0
A high-level business process view showing:
- **Top:** Business triggers (Retail order placed, Wholesale order received)
- **Center:** Core business process as a simplified flow: Order Intake → Validation → Fulfillment → Delivery
- **Bottom:** Business outcomes (Order fulfilled, Customer notified, Revenue recognized)
- **Style:** Pure business language, no technical terms, swimlane-style layout with business roles/departments

#### Image 6: Business Architecture Diagram — L1
Detailed business process breakdown:
- Each high-level step from L0 expanded into sub-steps
- Decision diamonds (e.g., "Is inventory sufficient?" → Yes/No paths)
- Business rules visible (e.g., "Priority: Wholesale > Retail when stock < threshold")
- Department swimlanes (Sales, Warehouse, Finance, Logistics)
- KPIs attached to process steps (e.g., "Order processing SLA: 4 hours")
- Exception handling paths shown

#### Image 7: Deployment Architecture Diagram — L0
Abstract deployment view showing:
- Cloud region boxes (e.g., "Primary Region", "DR Region")
- Major deployment zones: "Public-facing", "Application Tier", "Data Tier"
- Simple arrows showing traffic flow direction
- Availability zones indicated
- No specific cloud services, instance types, or port numbers

#### Image 8: Deployment Architecture Diagram — L1
Concrete deployment details:
- Specific cloud provider (e.g., AWS with service names)
- VPC boundaries, subnet layouts, security groups
- Named services: ALB, ECS/EKS clusters, RDS instances, ElastiCache
- Networking: CIDR blocks, port numbers, protocols
- Auto-scaling indicators
- DR replication arrows with RPO/RTO targets

---

## Gap Analysis: Current Playground vs. WSO2 L0-to-Ln Model

| WSO2 Blog Concept | Current Playground State | Gap |
|---|---|---|
| 3 independent verticals (Business/Solution/Deployment) | No verticals at all — single unified view | **Critical**: No way to show Business vs. Solution vs. Deployment independently |
| L0 = fully abstract, NO product names | L0 shows "Business View - Capabilities & KPIs" but still renders all nodes in one diagram | **Major**: L0 isn't truly abstract enough; mixes concerns |
| Cross-referencing between verticals | Not applicable — only one view exists | **Major**: No mechanism to navigate between vertical perspectives |
| Audience-first grouping (Business leaders / Architects / DevOps / Developers) | 9 individual personas without grouping | **Minor**: Personas exist but aren't grouped by audience type |
| Per-vertical L0-Ln content | Node data has L0-L3 fields but only for one view | **Major**: Need separate L0-L3 content per vertical |
| Progressive disclosure within a vertical | Zoom-driven level transitions work within single view | **Partial**: Mechanism exists but not vertical-aware |
| Notation-agnostic diagram styles | Single ReactFlow node style per level | **Medium**: Could offer different visual styles |

---

## Improvement Tasks

### Task Group A: Architecture Verticals System (Foundation)

#### A1: Add Architecture Vertical Type to Store and Types
**Effort:** Small (2-3h)  
**Description:** Add a `vertical` state field to the Zustand store with values `'solution' | 'business' | 'deployment'`. Add corresponding TypeScript types. Default to `'solution'` (closest to current behavior).

**Acceptance Criteria:**
- New `ArchitectureVertical` type: `'solution' | 'business' | 'deployment'`
- Store has `vertical` state with `setVertical()` action
- Store defaults to `vertical: 'solution'`

---

#### A2: Add Vertical Selector UI to Homepage Sidebar
**Effort:** Small (2-3h)  
**Description:** Create a `VerticalSelector` component that shows 3 tab-like buttons (Business / Solution / Deployment) in the left sidebar, above the PersonaSelector. Each tab should have an icon and short description.

**Acceptance Criteria:**
- 3 clearly labeled tabs with icons: 📊 Business, 🏗️ Solution, ☁️ Deployment
- Active tab visually highlighted
- Changing vertical updates the store
- Component placed above PersonaSelector in the homepage sidebar

---

#### A3: Extend Architecture Data Model with Per-Vertical Content
**Effort:** Medium (4-6h)  
**Description:** Extend the `ArchitectureComponent` type and `ecommerce-platform.json` to include per-vertical data. Each component should have vertical-specific descriptions, labels, and visibility rules.

Add to each component in the JSON:
```typescript
verticals: {
  business: {
    name: string          // e.g., "Order Processing"
    description: string   // Business-oriented description
    visible: boolean      // Whether to show in this vertical
    levels: { L0?, L1?, L2?, L3? }  // Vertical-specific level details
  },
  solution: { ... },
  deployment: { ... }
}
```

**Acceptance Criteria:**
- TypeScript types extended with `verticals` field
- All 8 ecommerce-platform components updated with data for all 3 verticals
- Backward-compatible with existing data (vertical data optional, falls back to current)

---

#### A4: Wire Vertical Filter into PersonaFilter and ReactFlow Adapter
**Effort:** Medium (3-4h)  
**Description:** Update `PersonaFilter.filterGraph()` and `toReactFlow()` to respect the selected vertical. Components marked `visible: false` for a vertical should be hidden. Component names and descriptions should change based on vertical.

**Acceptance Criteria:**
- Selecting "Business" vertical filters and relabels nodes to business perspective
- Selecting "Deployment" shows deployment-oriented nodes/labels
- Connections filtered by vertical relevance
- Smooth transition when switching verticals

---

#### A5: Update ContextPanel to Show Vertical-Specific Details
**Effort:** Small (2-3h)  
**Description:** When a node is clicked, the ContextPanel should show details specific to the active vertical. E.g., in Business vertical, show business capabilities and KPIs; in Deployment vertical, show infrastructure details.

**Acceptance Criteria:**
- ContextPanel Overview tab adapts to selected vertical
- Theory/Practice tabs show vertical-relevant links
- Labels and descriptions match vertical perspective

---

### Task Group B: Improved L0 Experience (Abstract View)

#### B1: Create Truly Abstract L0 Nodes (No Product Names)
**Effort:** Medium (4-5h)  
**Description:** Per the WSO2 blog, L0 should show NO product names, NO protocols — only abstract boxes with business-language labels. Update L0 node rendering (`BusinessNode`) to:
- Show only the `names.business` field (e.g., "API Management Platform" not "Kong API Gateway")
- Use larger, simpler node shapes (rounded rectangles with solid fills)
- Remove tech-specific icons at L0; use abstract capability icons instead
- Simplify connection labels to business-language (e.g., "Sends Orders" not "REST /api/orders")

**Acceptance Criteria:**
- L0 nodes display only business names and capability descriptions
- No technology product names visible at L0
- Connection labels use business language
- Visual style is clean, simple, executive-presentation ready

---

#### B2: Add L0 Grouped Layout (Layered Architecture Zones)
**Effort:** Medium (4-6h)  
**Description:** Inspired by the blog's Solution Architecture L0 image, implement grouped/zoned layout at L0 level. Instead of individual scattered nodes, group them into clear horizontal layers:
- "Customer-Facing" zone (top)
- "API & Integration" zone (middle)
- "Core Services" zone
- "Data & Storage" zone (bottom)

Use subtle background rectangles to visually group related nodes.

**Acceptance Criteria:**
- L0 shows nodes organized in clear horizontal zones
- Zone backgrounds with labels visible
- Clean visual hierarchy from top (external) to bottom (data)
- Zones defined in architecture data, not hardcoded

---

#### B3: Add External Actors at L0 Level
**Effort:** Small (2-3h)  
**Description:** The blog's L0 diagrams show external entities (customers, suppliers, partners) outside the system boundary. Add support for "external actor" nodes that appear at L0/L1 to show who interacts with the system.

**Acceptance Criteria:**
- New node type `external` for actors outside the system boundary
- External actors rendered with distinct style (e.g., person icon, dashed border)
- Ecommerce example adds: "Retail Customers", "Wholesale Customers", "Suppliers", "Payment Providers"
- External actors visible at L0 and L1, hidden at L2+

---

### Task Group C: Enhanced Level Transitions and Content

#### C1: Add Level Transition Animations
**Effort:** Medium (3-4h)  
**Description:** When switching levels (L0→L1, L1→L2, etc.), animate the transition to show progressive disclosure. Nodes should smoothly:
- Move to new positions
- New nodes fade in
- Removed nodes fade out
- Node sizes adjust smoothly
- Connection paths morph

**Acceptance Criteria:**
- Smooth CSS/spring animation when level changes
- New nodes entering the view have a fade-in/scale-up animation
- Nodes exiting have a fade-out animation
- Total transition duration < 500ms

---

#### C2: Add L1 Technology Labels and Integration Flow
**Effort:** Small (2-3h)  
**Description:** Per the blog, L1 introduces concrete technology names and high-level integration flow. Ensure L1 nodes clearly show:
- Product/technology name (e.g., "Kong API Gateway")
- Integration pattern name (e.g., "Content-Based Routing")
- Connection labels show protocol category (REST, Async, JDBC)

The current L1 `SystemNode` partially does this. Enhance it to always display the technology name prominently.

**Acceptance Criteria:**
- L1 nodes show both business name AND technology name
- Integration pattern badges visible on relevant nodes
- Connection labels show communication protocol category
- Clear visual distinction from L0 (more detailed) and L2 (less detailed)

---

#### C3: Add L2 Communication Pattern Annotations
**Effort:** Medium (3-4h)  
**Description:** Per the blog, L2 shows communication patterns (REST, async), microservices structure, and data paths. Add annotation overlays at L2 showing:
- Request/response patterns on sync connections
- Pub/sub patterns on event connections
- Data flow direction and type indicators
- Error handling paths (e.g., DLQ connections)

**Acceptance Criteria:**
- L2 connections show pattern annotations (sync/async/pub-sub icons)
- Data type indicators on connections (JSON, Protobuf, etc.)
- Error/retry paths visible as dashed/red connections
- Annotation overlay toggle in controls

---

#### C4: Enrich L3 Content with Code, Config, and CI/CD
**Effort:** Medium (4-6h)  
**Description:** Currently only 3 of 8 components have L3 data. Per the blog, L3-Ln should include deep dives with code snippets, deployment configs, and CI/CD pipelines. Flesh out L3 data for all components.

**Acceptance Criteria:**
- All 8 components have L3 data
- Each L3 includes: repository URL, at least 1 code snippet, deployment config sample
- ContextPanel Practice tab shows meaningful content at L3
- Code snippets have syntax highlighting

---

### Task Group D: Cross-Referencing and Navigation

#### D1: Add Cross-Reference Links Between Verticals
**Effort:** Medium (3-4h)  
**Description:** The blog emphasizes that separate per-vertical ladders should be cross-referenced, not merged. Add a "See in other verticals" section to the ContextPanel that links to the same component viewed from Business/Solution/Deployment perspectives.

**Acceptance Criteria:**
- ContextPanel shows "View in other verticals" links for the focused node
- Clicking a cross-reference link switches the vertical and focuses the same logical component
- Visual indicator showing which verticals a component appears in

---

#### D2: Add Breadcrumb Navigation for Depth Context
**Effort:** Small (2-3h)  
**Description:** Add a breadcrumb bar above the canvas showing the current navigation path, e.g., `Solution Architecture > L1 > API Gateway`. This gives users context about where they are in the L0-Ln hierarchy.

**Acceptance Criteria:**
- Breadcrumb shows: `[Vertical] > [Level] > [Focused Node]`
- Each breadcrumb segment is clickable (click vertical → go to L0, click level → deselect node)
- Updates reactively when vertical, level, or focused node changes
- Compact design, doesn't steal canvas space

---

#### D3: Add "Go Deeper" / "Go Broader" Navigation Cues
**Effort:** Small (2h)  
**Description:** On the ContextPanel, add clear CTAs suggesting the user can drill down or zoom out:
- "Go Deeper →" button that advances to the next level (L0→L1)
- "Go Broader ←" button that returns to the previous level
- Contextual text explaining what they'll see at the next level

**Acceptance Criteria:**
- "Go Deeper" button visible when deeper levels exist
- "Go Broader" button visible when at L1+
- Button click changes the level in the store
- Brief description of what the next level shows

---

### Task Group E: Persona-Audience Alignment

#### E1: Group Personas by Audience Type
**Effort:** Small (1-2h)  
**Description:** The blog groups audiences into 4 categories. Group the 9 personas in the PersonaSelector with section headers:

- **Business & Strategy**: Business Stakeholder, Product Manager, UX/UI Designer
- **Architecture & Analysis**: Business Analyst, Enterprise Architect, Security Architect, Data Architect
- **Engineering & Operations**: Implementation Lead, QA Engineer

**Acceptance Criteria:**
- PersonaSelector shows persona groups with section labels
- Grouping visually separates the categories
- Selecting any persona still works the same as today

---

#### E2: Auto-Suggest Vertical Based on Persona Selection
**Effort:** Small (1-2h)  
**Description:** When a user selects a persona, auto-suggest (but don't force) the most relevant vertical:
- Business Stakeholder / Product Manager → suggest Business vertical
- Enterprise Architect / Business Analyst / Security / Data → suggest Solution vertical
- Implementation Lead / QA → suggest Deployment vertical

**Acceptance Criteria:**
- Selecting a persona shows a subtle suggestion: "Recommended view: [Vertical]"
- One-click to accept the suggestion
- Does NOT auto-switch — user stays in control
- Recommendation logic defined in persona profiles

---

#### E3: Add Persona-Specific Welcome Tooltip
**Effort:** Small (1-2h)  
**Description:** When a persona is first selected, show a brief tooltip/banner on the canvas explaining what they'll see. E.g., for Business Stakeholder: "You're seeing the high-level business capabilities view. Click any block to understand its business value. Use L0 for executive summaries."

**Acceptance Criteria:**
- Short welcome text appears (toast or inline banner) when persona changes
- Text is specific to the persona's perspective and recommended level
- Dismissible, doesn't appear again for the same persona in the session
- Stored in session/local state to avoid repeat showing

---

### Task Group F: Real-World Use Case Enhancements

#### F1: Add Business Architecture Diagrams to Ecommerce Example
**Effort:** Medium (4-6h)  
**Description:** Inspired by the blog's Business Architecture diagrams (Images 5-6), add business-vertical specific content to the ecommerce-platform data:

**L0 Business View should show:**
- Business triggers: "Retail order placed", "Wholesale order received"
- Core process flow: Order Intake → Validation → Fulfillment → Delivery
- Business outcomes: "Order fulfilled", "Customer notified", "Revenue recognized"
- All in pure business language, no technical terms

**L1 Business View should show:**
- Expanded sub-processes for each L0 step
- Decision points: "Is inventory sufficient?" with Yes/No paths
- Business rules: "Priority: Wholesale > Retail when stock < threshold"
- Department swimlanes (Sales, Warehouse, Finance, Logistics)
- KPIs attached to process steps

**Acceptance Criteria:**
- Business vertical shows meaningful business process diagrams
- L0 is executive-presentation ready (pure business language)
- L1 shows detailed processes with decision points
- Visually distinct from Solution and Deployment views

---

#### F2: Add Deployment Architecture Diagrams to Ecommerce Example
**Effort:** Medium (4-6h)  
**Description:** Inspired by the blog's Deployment Architecture diagrams (Images 7-8), add deployment-vertical specific content:

**L0 Deployment View should show:**
- Cloud region boxes (Primary Region, DR Region)
- Deployment zones: "Public-Facing", "Application Tier", "Data Tier"
- Simple traffic flow arrows
- Availability zone indicators

**L1 Deployment View should show:**
- Specific cloud services (ALB, EKS, RDS, ElastiCache)
- VPC boundaries and subnet layouts
- Auto-scaling indicators
- DR replication with RPO/RTO targets
- Port numbers and protocols on connections

**Acceptance Criteria:**
- Deployment vertical shows infrastructure-focused diagrams
- L0 is abstract (no specific cloud service names)
- L1 introduces concrete cloud services and networking details
- L2 shows container configs, scaling rules, resource specs

---

#### F3: Add Second Architecture Example (Manufacturing/Distribution Use Case)
**Effort:** Large (8-12h)  
**Description:** The blog uses an "Apparel Manufacturer & Distributor (B2B & B2C)" use case. Add this as a second architecture that users can switch to, demonstrating:
- Multi-channel order intake (website, email, EDI)
- API Management layer as external interface
- Integration layer for transformation and routing
- Core ERP system
- External partners: Suppliers & Delivery Partners

**Acceptance Criteria:**
- New `manufacturing-distributor.json` architecture data file
- All 3 verticals populated (Business, Solution, Deployment)
- L0-L2 content for all verticals
- Architecture selector dropdown to switch between examples

---

### Task Group G: Visual and Documentation Improvements

#### G1: Add Architecture Vertical Description Panel
**Effort:** Small (1-2h)  
**Description:** When a vertical is selected, show a brief description explaining what this vertical represents:
- **Business:** "Processes, capabilities, KPIs, and business outcomes — how the business operates"
- **Solution:** "Systems, services, integration patterns, and technology — how the solution works"
- **Deployment:** "Infrastructure, networking, scaling, and operations — where and how it runs"

**Acceptance Criteria:**
- Brief description text below the vertical selector
- Changes dynamically when vertical changes
- Helps users understand the purpose of each vertical view

---

#### G2: Add Level Description Tooltips with "What You'll See" Content
**Effort:** Small (1-2h)  
**Description:** Enhance the LevelControls to show richer descriptions per the blog's definitions:

| Level | Current Description | Enhanced Description |
|-------|--------------------|--------------------|
| L0 | "Business View - Capabilities & KPIs" | "Abstract overview — major components and interactions. No product names or protocols." |
| L1 | "System View - Services & Integration" | "Introduces concrete technologies, products, and high-level integration flows." |
| L2 | "Component View - Tech Stack & APIs" | "Communication patterns, microservices structure, data paths, and error handling." |
| L3 | "Detail View - Code & Deployment" | "Deep dives — code snippets, deployment configs, CI/CD pipelines, and monitoring." |

**Acceptance Criteria:**
- Hover or expandable tooltip on each level button shows the enhanced description
- Descriptions align with the WSO2 blog's L0-Ln definitions
- Consistent with the mental model across all verticals

---

#### G3: Add Print/Export View for Architecture Diagrams
**Effort:** Medium (3-4h)  
**Description:** The blog mentions that architecture diagrams serve as "structured documentation and contractual references." Add an export option that generates a clean, printable view of the current diagram without UI chrome, suitable for documentation or presentations.

**Acceptance Criteria:**
- "Export as Image" button in the toolbar
- Exports current canvas view as PNG or SVG
- Includes diagram title, vertical name, level, and persona label
- Clean white background without UI controls

---

## Priority Order (Recommended Implementation Sequence)

### Sprint 1 — Foundation (Verticals + L0 Improvements)
1. **A1** — Add vertical type to store (2-3h)
2. **A2** — Vertical selector UI (2-3h)
3. **A3** — Extend data model with per-vertical content (4-6h)
4. **A4** — Wire vertical filter into rendering (3-4h)
5. **B1** — Abstract L0 nodes, no product names (4-5h)

### Sprint 2 — Content & Navigation
6. **A5** — ContextPanel vertical-specific details (2-3h)
7. **B2** — Grouped/zoned L0 layout (4-6h)
8. **B3** — External actors at L0 (2-3h)
9. **D2** — Breadcrumb navigation (2-3h)
10. **G2** — Enhanced level descriptions (1-2h)

### Sprint 3 — Cross-References & Persona Polish
11. **D1** — Cross-reference links between verticals (3-4h)
12. **D3** — Go Deeper / Go Broader CTAs (2h)
13. **E1** — Group personas by audience type (1-2h)
14. **E2** — Auto-suggest vertical based on persona (1-2h)
15. **E3** — Persona welcome tooltip (1-2h)

### Sprint 4 — Rich Content & Transitions
16. **C1** — Level transition animations (3-4h)
17. **C2** — L1 technology labels (2-3h)
18. **C3** — L2 communication pattern annotations (3-4h)
19. **C4** — Enrich L3 content for all components (4-6h)
20. **G1** — Vertical description panel (1-2h)

### Sprint 5 — Use Cases & Export
21. **F1** — Business architecture diagrams for ecommerce (4-6h)
22. **F2** — Deployment architecture diagrams for ecommerce (4-6h)
23. **F3** — Second architecture example (8-12h)
24. **G3** — Print/export view (3-4h)

---

## Total Estimated Effort

| Task Group | Tasks | Estimated Hours |
|-----------|-------|----------------|
| A: Verticals System | 5 tasks | 14-19h |
| B: L0 Experience | 3 tasks | 10-14h |
| C: Level Transitions & Content | 4 tasks | 12-17h |
| D: Cross-Referencing & Navigation | 3 tasks | 7-9h |
| E: Persona Alignment | 3 tasks | 3-6h |
| F: Real-World Use Cases | 3 tasks | 16-24h |
| G: Visual & Documentation | 3 tasks | 5-8h |
| **Total** | **24 tasks** | **67-97h (~2-3 weeks full-time)** |
