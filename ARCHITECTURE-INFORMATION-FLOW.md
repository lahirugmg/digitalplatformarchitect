# Website Information Architecture & Flow

## Executive Summary

This document defines the information architecture for Digital Platform Architect, separating content into **THEORY** (learning/reference) and **PRACTICAL** (interactive/hands-on) with strong bidirectional cross-linking.

---

## 🎯 Core Principle: Learn → Practice → Apply

```
THEORY (Understand) ←→ PRACTICAL (Experience) ←→ REAL-WORLD (Apply)
```

---

## 📚 THEORY Section: Knowledge & Reference

### Purpose
Provide comprehensive, searchable reference material for learning concepts, patterns, and best practices.

### Structure

```
/theory/
├── /components (Platform Building Blocks)
│   ├── Overview page
│   └── Individual blocks (API Management, IAM, Observability, etc.)
│
├── /patterns (Architecture Patterns)
│   ├── Overview page
│   ├── /messaging (65+ EIP patterns)
│   ├── /architecture (Microservices, Event-Driven, etc.)
│   └── /security (Zero Trust, OAuth2, etc.)
│
├── /articles (Deep Dives & Guides)
│   ├── How AI Transforms Platform Architecture
│   ├── Operational Sympathy Explained
│   ├── Capacity Planning Best Practices
│   └── Defense-in-Depth Security
│
└── /blueprints (Reference Architectures)
    ├── Microservices Platform
    ├── High-Availability Small Setup
    └── Event-Driven E-Commerce
```

### Current Pages → THEORY Mapping

| Current Page | Proposed Location | Type |
|--------------|------------------|------|
| `/blocks` | `/theory/components` | Building Blocks |
| `/patterns` | `/theory/patterns` | Patterns Library |
| `/articles` | `/theory/articles` | Long-form Content |
| `/solution` | `/theory/blueprints/solution-story` | Case Study |
| `/architecture-map` | `/theory/navigation` | Meta-Navigation |

---

## 🛠️ PRACTICAL Section: Interactive & Hands-On

### Purpose
Provide interactive playgrounds, calculators, and tools where users can experiment, test, and validate concepts.

### Structure

```
/playgrounds/
├── Overview & Index
│
├── /messaging (Messaging Patterns)
│   ├── /data-pipeline (Current)
│   ├── /message-flow (Current)
│   └── /pattern-composer (Current)
│
├── /integration (Enterprise Integration)
│   ├── /enterprise-integration (Current)
│   └── /service-mesh (Future)
│
├── /production-readiness (Operational Excellence)
│   ├── /operational-sympathy (Interactive Checklist)
│   ├── /capacity-planning (Infrastructure Calculator)
│   ├── /cost-estimation (Future)
│   └── /sla-calculator (Future)
│
├── /architecture (Architecture Design)
│   ├── /pattern-composer (Current - maybe move here?)
│   └── /ai-capability-matrix (Future)
│
└── /skill-development (Learning Path)
    └── /skill-tree (Current)
```

### Current Pages → PRACTICAL Mapping

| Current Page | Proposed Location | Type |
|--------------|------------------|------|
| `/playgrounds/data-pipeline` | `/playgrounds/messaging/data-pipeline` | Interactive |
| `/playgrounds/message-flow` | `/playgrounds/messaging/message-flow` | Interactive |
| `/playgrounds/pattern-composer` | `/playgrounds/architecture/pattern-composer` | Interactive |
| `/operational-sympathy` | `/playgrounds/production-readiness/operational-sympathy` | Checklist |
| `/capacity-planning` | `/playgrounds/production-readiness/capacity-planning` | Calculator |
| `/readiness` | `/playgrounds/production-readiness` | Landing Page |
| `/skill-tree` | `/playgrounds/skill-development/skill-tree` | Gamification |
| `/service-mesh` | `/playgrounds/integration/service-mesh` | Visualizer |
| `/ai-capability-matrix` | `/playgrounds/architecture/ai-capability-matrix` | Matrix |

---

## 🔗 Cross-Linking Strategy: Theory ↔ Practical

### Principle: Every Theory Has Practice, Every Practice Has Theory

### 1. Pattern-to-Playground Links

**Theory Side (Pattern Pages):**
```tsx
// In /theory/patterns/event-message
<PlaygroundLink
  href="/playgrounds/messaging/message-flow"
  label="Try Event Messages in Message Flow Playground"
  icon="🎮"
/>
```

**Practical Side (Playground Pages):**
```tsx
// In /playgrounds/messaging/message-flow
<TheoryLink
  href="/theory/patterns/event-message"
  label="Learn about Event Message Pattern"
  icon="📚"
/>
```

### 2. Component-to-Implementation Links

**Theory Side (Building Blocks):**
```tsx
// In /theory/components/messaging-streaming-platform
<Section>
  <h3>See It In Action</h3>
  <PlaygroundCard
    title="Data Pipeline Builder"
    href="/playgrounds/messaging/data-pipeline"
    description="Build and visualize streaming data pipelines"
  />
  <PlaygroundCard
    title="Message Flow Designer"
    href="/playgrounds/messaging/message-flow"
    description="Design message flows with EIP patterns"
  />
</Section>
```

**Practical Side (Playgrounds):**
```tsx
// In /playgrounds/messaging/data-pipeline
<RelatedTheory>
  <TheoryCard
    title="Messaging & Streaming Platform"
    href="/theory/components/messaging-streaming"
    description="Understand the platform architecture"
  />
  <TheoryCard
    title="Pipes & Filters Pattern"
    href="/theory/patterns/pipes-and-filters"
    description="Core pattern for data pipelines"
  />
</RelatedTheory>
```

### 3. Production Readiness Flow

This is the key integration you identified:

```
Theory: Operational Sympathy Article
  ↓ (Learn the concepts)
Interactive: Operational Sympathy Checklist
  ↓ (Score your architecture)
Interactive: Capacity Planning Calculator
  ↓ (Size infrastructure)
Theory: Best Practices Guide
  ↓ (Reference implementation)
Interactive: Production Readiness Dashboard
  ✓ (Complete assessment)
```

**Implementation:**

```tsx
// /theory/articles/operational-sympathy
<ArticleCTA>
  <h3>Ready to Evaluate Your Architecture?</h3>
  <Button href="/playgrounds/production-readiness/operational-sympathy">
    Take the Interactive Checklist
  </Button>
</ArticleCTA>

// /playgrounds/production-readiness/operational-sympathy
<NextSteps>
  <h3>After Scoring, Plan Your Infrastructure</h3>
  <Card href="/playgrounds/production-readiness/capacity-planning">
    Use Capacity Planning Calculator →
  </Card>
</NextSteps>

// /playgrounds/production-readiness/capacity-planning
<RelatedTools>
  <Card href="/playgrounds/production-readiness/operational-sympathy">
    ← First: Score Operational Sympathy
  </Card>
  <Card href="/theory/articles/capacity-planning-best-practices">
    Learn Best Practices →
  </Card>
</RelatedTools>
```

---

## 🗺️ Proposed Navigation Structure

### Primary Navigation (Header)

```tsx
const primaryNav = [
  {
    label: 'Learn',
    dropdown: [
      { href: '/theory/components', label: 'Building Blocks' },
      { href: '/theory/patterns', label: 'Patterns Library' },
      { href: '/theory/articles', label: 'Articles & Guides' },
      { href: '/theory/blueprints', label: 'Reference Architectures' },
    ]
  },
  {
    label: 'Practice',
    dropdown: [
      { href: '/playgrounds/messaging', label: 'Messaging & Integration' },
      { href: '/playgrounds/production-readiness', label: 'Production Readiness', badge: 'NEW' },
      { href: '/playgrounds/architecture', label: 'Architecture Design' },
      { href: '/playgrounds/skill-development', label: 'Skill Development' },
    ]
  },
  {
    label: 'Tools',
    dropdown: [
      { href: '/playgrounds/production-readiness/capacity-planning', label: 'Capacity Calculator' },
      { href: '/playgrounds/production-readiness/operational-sympathy', label: 'OpSymp Checklist' },
      { href: '/playgrounds/architecture/pattern-composer', label: 'Pattern Composer' },
      { href: '/theory/navigation', label: 'Architecture Navigator' },
    ]
  },
  { href: '/about', label: 'About' }
]
```

### Secondary Navigation (Contextual)

Each page should have:
- **Breadcrumbs**: Show location in hierarchy
- **Related Theory/Practice**: Show complementary content
- **Next Steps**: Guide progression through learning path

---

## 📊 Content Mapping Matrix

### Production Readiness Content Cluster

| Theory | Interactive Playground | Output/Artifact |
|--------|----------------------|-----------------|
| Operational Sympathy Article | OpSymp Checklist | Scored Assessment Report |
| Capacity Planning Guide | Capacity Calculator | Infrastructure Sizing Doc |
| SLA & Availability Theory | SLA Calculator | SLO/SLI Definitions |
| Cost Optimization Article | Cost Estimator | Budget Forecast |
| Security Best Practices | Security Checklist | Security Scorecard |
| Monitoring & Observability | Dashboard Designer | Monitoring Strategy |

### Messaging & Integration Content Cluster

| Theory | Interactive Playground | Output/Artifact |
|--------|----------------------|-----------------|
| Event Message Pattern | Message Flow Designer | Flow Diagram |
| Pipes & Filters Pattern | Data Pipeline Builder | Pipeline Definition |
| 65+ EIP Patterns | Pattern Composer | Architecture Diagram |
| Service Mesh Architecture | Service Mesh Visualizer | Service Topology Map |

### Architecture Design Content Cluster

| Theory | Interactive Playground | Output/Artifact |
|--------|----------------------|-----------------|
| Microservices Pattern | Pattern Composer | Service Architecture |
| Event-Driven Pattern | Message Flow Designer | Event Flow Diagram |
| CQRS Pattern | Data Pipeline Builder | CQRS Pipeline |
| Zero Trust Security | Security Overlay Tool | Security Architecture |

---

## 🎯 User Journeys

### Journey 1: New Architect Learning EDA

1. **Entry**: `/theory/patterns/event-driven-architecture`
2. **Learn**: Read pattern, see diagrams
3. **Practice**: Click "Try in Message Flow Playground" →
4. **Experiment**: `/playgrounds/messaging/message-flow`
5. **Apply**: Build event flow, export diagram
6. **Reference**: Save to skill tree, bookmark theory
7. **Next**: Suggested next pattern (Event Sourcing)

### Journey 2: Production Readiness Assessment

1. **Entry**: `/theory/articles/operational-sympathy`
2. **Learn**: Understand the 9 elements
3. **Practice**: Click "Take the Checklist" →
4. **Assess**: `/playgrounds/production-readiness/operational-sympathy`
5. **Score**: Get operational sympathy score
6. **Plan**: Click "Plan Capacity" →
7. **Calculate**: `/playgrounds/production-readiness/capacity-planning`
8. **Size**: Get infrastructure recommendations
9. **Export**: Download assessment + capacity plan
10. **Reference**: Return to theory for low-scoring areas

### Journey 3: Platform Design

1. **Entry**: `/theory/components/messaging-streaming-platform`
2. **Learn**: Understand platform building block
3. **Explore**: See related patterns (Pub/Sub, Event Sourcing)
4. **Practice**: Click "Build Data Pipeline" →
5. **Design**: `/playgrounds/messaging/data-pipeline`
6. **Compose**: Click "Add to Pattern Composer" →
7. **Architect**: `/playgrounds/architecture/pattern-composer`
8. **Validate**: Use operational sympathy checklist
9. **Export**: Download full architecture

---

## 🔧 Implementation Plan

### Phase 1: Reorganize Routes (1-2 days)

1. Create `/theory` route structure
2. Create `/playgrounds` category pages
3. Migrate existing pages to new structure
4. Set up redirects from old URLs

### Phase 2: Build Cross-Link Components (1 day)

Create reusable components:
- `<PlaygroundLink />` - Theory → Practice
- `<TheoryLink />` - Practice → Theory
- `<RelatedContent />` - Contextual suggestions
- `<NextSteps />` - Guided progression
- `<ContentCluster />` - Group related theory + practice

### Phase 3: Update Navigation (1 day)

1. Implement new header with dropdowns
2. Add breadcrumbs to all pages
3. Add contextual navigation panels

### Phase 4: Add Content Mappings (2-3 days)

1. Map all 65+ patterns to playgrounds
2. Add playground links to all component pages
3. Add theory links to all playground pages
4. Create "Production Readiness" cluster integration

### Phase 5: Create Landing Pages (1-2 days)

- `/theory` - Overview of all learning content
- `/playgrounds` - Overview of all interactive tools
- `/playgrounds/production-readiness` - Production readiness hub

---

## 📝 Component Specifications

### PlaygroundLink Component

```tsx
interface PlaygroundLinkProps {
  href: string
  title: string
  description: string
  category: 'messaging' | 'production' | 'architecture' | 'skill'
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
}

// Usage in theory pages:
<PlaygroundLink
  href="/playgrounds/messaging/data-pipeline"
  title="Data Pipeline Builder"
  description="Build and visualize streaming data pipelines with drag-and-drop"
  category="messaging"
  difficulty="intermediate"
/>
```

### TheoryLink Component

```tsx
interface TheoryLinkProps {
  href: string
  title: string
  description: string
  type: 'pattern' | 'component' | 'article' | 'blueprint'
  readTime?: string
}

// Usage in playground pages:
<TheoryLink
  href="/theory/patterns/pipes-and-filters"
  title="Pipes & Filters Pattern"
  description="Understand the foundational pattern for data pipelines"
  type="pattern"
  readTime="5 min"
/>
```

### ContentCluster Component

```tsx
interface ContentClusterProps {
  title: string
  theory: Array<{ title: string; href: string; type: string }>
  practice: Array<{ title: string; href: string; category: string }>
  description: string
}

// Usage:
<ContentCluster
  title="Production Readiness"
  description="Assess and plan for production deployment"
  theory={[
    { title: 'Operational Sympathy', href: '/theory/articles/op-sympathy', type: 'article' },
    { title: 'Capacity Planning', href: '/theory/articles/capacity-planning', type: 'article' }
  ]}
  practice={[
    { title: 'OpSymp Checklist', href: '/playgrounds/production-readiness/op-sympathy', category: 'assessment' },
    { title: 'Capacity Calculator', href: '/playgrounds/production-readiness/capacity-planning', category: 'calculator' }
  ]}
/>
```

---

## 🎨 Visual Design Patterns

### Theory Pages
- 📚 Book icon
- Blue color scheme
- "Learn more" CTAs
- Reading time estimates
- Related patterns sidebar
- "Try this in playground" prominent CTA

### Practical Pages
- 🎮 Game controller icon
- Purple/green color scheme
- "Start building" CTAs
- Difficulty indicators
- "Learn the theory first" link
- Export/save functionality

### Production Readiness Hub
- ✅ Checklist icon
- Green color scheme
- Progress tracking
- Sequential workflow (Assess → Plan → Implement)
- Completion percentage

---

## 🚀 Quick Win: Production Readiness Integration

Since you mentioned this specifically, here's the immediate implementation:

### Create `/playgrounds/production-readiness/page.tsx`

```tsx
export default function ProductionReadinessHub() {
  return (
    <div>
      <h1>Production Readiness</h1>
      <p>Assess, plan, and prepare for production deployment</p>

      {/* Workflow Steps */}
      <WorkflowSteps>
        <Step number={1} title="Assess Operational Sympathy">
          <TheoryLink href="/theory/articles/operational-sympathy" />
          <PlaygroundLink href="/playgrounds/production-readiness/operational-sympathy" />
        </Step>

        <Step number={2} title="Plan Infrastructure Capacity">
          <TheoryLink href="/theory/articles/capacity-planning" />
          <PlaygroundLink href="/playgrounds/production-readiness/capacity-planning" />
        </Step>

        <Step number={3} title="Estimate Costs">
          <TheoryLink href="/theory/articles/cost-optimization" />
          <PlaygroundLink href="/playgrounds/production-readiness/cost-estimator" />
        </Step>

        <Step number={4} title="Define SLAs">
          <TheoryLink href="/theory/articles/sla-design" />
          <PlaygroundLink href="/playgrounds/production-readiness/sla-calculator" />
        </Step>
      </WorkflowSteps>

      {/* Export All */}
      <ExportButton>
        Export Complete Production Readiness Report
      </ExportButton>
    </div>
  )
}
```

---

## 📋 Next Actions

1. **Review this architecture** - Does it match your vision?
2. **Prioritize implementation** - Which phase should we tackle first?
3. **Create prototype** - Build one complete theory ↔ practice cluster
4. **Test user flow** - Validate the Production Readiness journey
5. **Scale to all content** - Apply pattern to remaining 65+ patterns

---

**Would you like me to:**
- A) Implement the Production Readiness hub immediately
- B) Restructure the navigation first
- C) Create the cross-linking components
- D) Build the complete `/playgrounds/production-readiness` cluster

Let me know which direction to take!
