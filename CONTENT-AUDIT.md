# Content Audit & Theory ↔ Practice Mapping

## Overview

**Total Pages**: 22
**Goal**: Categorize all pages as THEORY or PRACTICE and create bidirectional links

---

## Current Pages Categorized

### 🎯 ENTRY POINTS

| Page | Type | Status | Action Needed |
|------|------|--------|---------------|
| `/` (Home) | Entry | ✅ Exists | Add Theory/Practice navigation |

### 📚 THEORY (Learning & Reference)

| Page | Category | Current Links | Needs Links To |
|------|----------|---------------|----------------|
| `/blocks` | Components | None | `/playgrounds/messaging`, `/playgrounds/pattern-composer` |
| `/blocks/[slug]` | Components | None | Relevant playgrounds per block |
| `/patterns` | Patterns | None | `/playgrounds/messaging/*`, `/playgrounds/pattern-composer` |
| `/patterns/[slug]` | Patterns | None | Specific playground implementations |
| `/articles` | Articles | None | Related playgrounds |
| `/articles/[slug]` | Articles | None | Related playgrounds |
| `/about` | Meta | None | None needed |
| `/architecture-map` | Navigation | Links to docs | Good as-is, add playground links |
| `/solution` | Case Study | None | Related playgrounds |

**Theory Summary**: 9 pages need playground links

### 🎮 PRACTICE (Interactive & Hands-On)

| Page | Category | Current Links | Needs Links To |
|------|----------|---------------|----------------|
| `/playgrounds` | Hub | Lists playgrounds | Add theory intro links |
| `/playgrounds/data-pipeline` | Messaging | None | Patterns: Pipes & Filters, Message Channel |
| `/playgrounds/message-flow` | Messaging | None | Patterns: Event Message, Pub/Sub, Router |
| `/playgrounds/pattern-composer` | Architecture | None | Patterns library, All patterns |
| `/playgrounds/enterprise-integration` | Integration | None | Patterns: Enterprise Integration Patterns |
| `/playgrounds/production-readiness` | Operations | ✅ Links added | Good - model for others |
| `/operational-sympathy` | Assessment | ✅ Links added | Good - model for others |
| `/capacity-planning` | Calculator | ✅ Links added | Good - model for others |
| `/skill-tree` | Gamification | None | Patterns, Blocks for skill progression |
| `/service-mesh` | Visualizer | None | Blocks: Observability, Patterns: Service Mesh |
| `/ai-capability-matrix` | Strategy | None | Blocks: AI/ML, Articles |
| `/readiness` | Operations | Redirect needed | → `/playgrounds/production-readiness` |

**Practice Summary**: 9 pages need theory links (3 already done ✅)

---

## Implementation Priority

### Phase 1: Core Infrastructure (Today) ⚡

**Create category landing pages:**
1. `/playgrounds/messaging` - Hub for data-pipeline, message-flow
2. `/playgrounds/architecture` - Hub for pattern-composer
3. Theory section organization (prepare for migration)

**Add cross-links to high-traffic pages:**
4. `/patterns` → Add playground links to overview
5. `/blocks` → Add playground links to overview
6. `/playgrounds` → Add theory intro sections

### Phase 2: Pattern Library Integration (2-3 hours)

**For each pattern in `/patterns/[slug]`:**
- Add `<PlaygroundLink />` to relevant playground
- Add "Try This Pattern" section
- Map patterns to playgrounds

**Pattern → Playground Mapping:**
```
Messaging Patterns (40+) → /playgrounds/messaging/*
Architecture Patterns (15+) → /playgrounds/pattern-composer
Integration Patterns (10+) → /playgrounds/enterprise-integration
```

### Phase 3: Block Integration (1-2 hours)

**For each block in `/blocks/[slug]`:**
- Add `<PlaygroundLink />` components
- Add "See It In Action" section

**Block → Playground Mapping:**
```
Messaging & Streaming → data-pipeline, message-flow
API Management → pattern-composer
Observability → capacity-planning, production-readiness
Identity & Access → security (future)
```

### Phase 4: Playground Enhancement (2 hours)

**For each playground:**
- Add `<TheoryLink />` components
- Add "Learn the Concepts First" section
- Add "Related Patterns" sidebar

### Phase 5: Home Page Redesign (1 hour)

**Update `/` (home page):**
- Clear THEORY vs PRACTICE sections
- Visual differentiation (icons, colors)
- Direct navigation to hubs

---

## Pattern → Playground Detailed Mapping

### Messaging Patterns → Message Flow Playground

| Pattern | Playground Feature | Link Text |
|---------|-------------------|-----------|
| Event Message | Message types | "Design Event Messages" |
| Document Message | Message types | "Create Document Messages" |
| Command Message | Message types | "Build Command Messages" |
| Point-to-Point Channel | Channels | "Create P2P Channels" |
| Publish-Subscribe Channel | Channels | "Design Pub/Sub" |
| Message Router | Routing | "Route Messages" |
| Content-Based Router | Routing | "Add Content Routing" |
| Message Filter | Filtering | "Filter Messages" |
| Message Translator | Transformation | "Transform Messages" |
| Message Endpoint | Endpoints | "Create Endpoints" |

### Data Processing → Data Pipeline Playground

| Pattern | Playground Feature | Link Text |
|---------|-------------------|-----------|
| Pipes and Filters | Pipeline stages | "Build Pipelines" |
| Message Channel | Channels | "Connect Channels" |
| Splitter | Processing | "Split Messages" |
| Aggregator | Processing | "Aggregate Data" |
| Resequencer | Processing | "Resequence Flow" |
| Content Enricher | Transformation | "Enrich Content" |

### Architecture Patterns → Pattern Composer

| Pattern | Playground Feature | Link Text |
|---------|-------------------|-----------|
| Microservices | Service composition | "Compose Microservices" |
| Event-Driven | Event flows | "Design Event Architecture" |
| CQRS | Command/Query separation | "Apply CQRS Pattern" |
| Event Sourcing | Event streams | "Model Event Sourcing" |
| API Gateway | Gateway layer | "Design API Gateway" |
| Service Mesh | Mesh topology | "Configure Service Mesh" |

---

## Block → Playground Detailed Mapping

### Messaging & Streaming Platform

**Playgrounds:**
- `/playgrounds/messaging/data-pipeline` - Build streaming pipelines
- `/playgrounds/messaging/message-flow` - Design message flows
- `/playgrounds/pattern-composer` - Compose messaging architecture

**Link Sections:**
```tsx
<Section title="Interactive Experiences">
  <PlaygroundLink
    href="/playgrounds/messaging/data-pipeline"
    title="Data Pipeline Builder"
    description="Build real-time streaming data pipelines"
  />
  <PlaygroundLink
    href="/playgrounds/messaging/message-flow"
    title="Message Flow Designer"
    description="Design message flows with EIP patterns"
  />
</Section>
```

### API Management

**Playgrounds:**
- `/playgrounds/pattern-composer` - Design API layer
- `/playgrounds/architecture/api-gateway` (future)

### Observability & Operations

**Playgrounds:**
- `/playgrounds/production-readiness/operational-sympathy`
- `/playgrounds/production-readiness/capacity-planning`
- `/playgrounds/production-readiness` (hub)

### Identity & Access Management

**Playgrounds:**
- `/playgrounds/production-readiness/security-assessment` (future)
- `/playgrounds/security/oauth-flow` (future)

---

## Visual Design System

### Theory Pages (📚)

**Visual Indicators:**
- Icon: 📚 (book)
- Color: Blue theme
- Badge: "Learning Resource"
- CTA: "Try in Playground →"

**Layout Pattern:**
```tsx
<TheoryPage>
  <Hero color="blue" icon="📚" badge="Pattern Reference" />
  <Content /> {/* Main theory content */}
  <PlaygroundLinks title="Try This Pattern" />
  <RelatedTheory />
</TheoryPage>
```

### Practice Pages (🎮)

**Visual Indicators:**
- Icon: 🎮 (game controller)
- Color: Purple/Green theme
- Badge: "Interactive Tool"
- CTA: "← Learn Concepts First"

**Layout Pattern:**
```tsx
<PracticePage>
  <Hero color="purple" icon="🎮" badge="Interactive Playground" />
  <TheoryLinks title="Understand the Concepts" />
  <InteractiveTool /> {/* Main playground */}
  <NextSteps />
</PracticePage>
```

---

## Success Metrics

After full implementation:

✅ **Every pattern page** has at least one playground link
✅ **Every block page** has at least one playground link
✅ **Every playground** has at least 2-3 theory links
✅ **Home page** clearly shows Theory vs Practice
✅ **Navigation** separates learning from doing
✅ **User can navigate** theory → practice → theory in <3 clicks

---

## Quick Wins (Implement First)

### 1. Messaging Hub (`/playgrounds/messaging/page.tsx`)
- Groups data-pipeline + message-flow
- Links to 40+ messaging patterns
- Clear learning path

### 2. Pattern Library Enhancement (`/patterns/page.tsx`)
- Add playground quick links
- Categorize by playground
- Visual indicators for interactive content

### 3. Blocks Enhancement (`/blocks/page.tsx`)
- Add "See It In Action" cards
- Link to relevant playgrounds
- Show completion status

### 4. Home Page Sections
- **Learn Section**: Blocks, Patterns, Articles
- **Practice Section**: Playgrounds by category
- **Tools Section**: Quick access to calculators

---

## Implementation Order

**Today (4-6 hours):**
1. ✅ Create `/playgrounds/messaging/page.tsx` hub
2. ✅ Update `/patterns/page.tsx` with playground links
3. ✅ Update `/blocks/page.tsx` with playground links
4. ✅ Add cross-links to top 5 pattern pages
5. ✅ Update home page with Theory/Practice sections

**This Week:**
6. Add cross-links to all 65+ pattern pages (bulk operation)
7. Add cross-links to all 9 block pages
8. Add theory links to remaining playgrounds
9. Create breadcrumb component
10. Add visual indicators throughout

---

## Next Step

**Start with**: Create Messaging Hub - groups data-pipeline and message-flow with links to theory.

This will serve as the template for other playground category pages.

Ready to proceed?
