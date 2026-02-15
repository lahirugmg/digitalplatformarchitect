# Interactive Architecture Playground - Technical Plan

## Executive Summary

This document outlines the comprehensive technical architecture, UI/UX design, and implementation strategy for the **Digital Platform Architecture Landing Page** featuring an **Interactive Architecture Playground** that bridges theoretical concepts with practical implementation through a Zoomable User Interface (ZUI).

---

## 1. Core Architecture Model

### 1.1 Dual-Track Navigation System

The platform implements a **Theory ↔ Practice** bidirectional linking system:

```
Theory Track                Practice Track
    ↓                            ↓
Concepts  ←─────────────→  Implementation
Patterns  ←─────────────→  Code Examples
Why       ←─────────────→  How
```

**Key Features:**
- Every theoretical concept has a "Go to Practice" toggle
- Every practical example links back to theoretical foundation
- Contextual switching maintains user position in the learning journey
- Breadcrumb navigation shows Theory/Practice path

### 1.2 Component Relationship Model

```typescript
interface ComponentRelationship {
  theory: {
    concept: string;
    pattern: string;
    principles: string[];
    tradeoffs: string[];
  };
  practice: {
    implementation: string;
    techStack: string[];
    codeSnippets: CodeReference[];
    iacTemplates: IaCReference[];
  };
  linkage: {
    bidirectional: true;
    contextPreserving: boolean;
  };
}
```

---

## 2. Interactive Playground - Zoomable Depth Architecture

### 2.1 ZUI Abstraction Levels

The playground implements a **hierarchical zoom interface** with distinct abstraction levels:

| Level | Name | Audience | Focus | Examples |
|-------|------|----------|-------|----------|
| **L0** | Global/Business | Executive, Product | High-level flows, business capabilities | CDN, Traffic Routing, Regional Deployment |
| **L1** | System/Enterprise | EA, Solution Architect | Service boundaries, integration patterns | Microservices, Event Bus, API Gateway |
| **L2** | Component/Technical | Tech Lead, Senior Dev | Technology choices, APIs | Spring Boot, Kafka, PostgreSQL |
| **L3+** | Implementation/Detail | Developer | Code, configs, schemas | Helm charts, API specs, DB schemas |

### 2.2 Visual Zoom Mechanics

```typescript
interface ZoomLevel {
  level: 'L0' | 'L1' | 'L2' | 'L3';
  scale: number;          // Canvas scale factor
  visibleNodes: string[]; // Node IDs visible at this level
  detailDensity: number;  // Information density (0-1)
  transitions: {
    zoomIn: ZoomLevel;
    zoomOut: ZoomLevel;
  };
}

// Example zoom mapping
const ZOOM_LEVELS = {
  L0: { scale: 0.25, detailDensity: 0.2 },  // 25% zoom, minimal detail
  L1: { scale: 0.5,  detailDensity: 0.5 },  // 50% zoom, medium detail
  L2: { scale: 1.0,  detailDensity: 0.8 },  // 100% zoom, high detail
  L3: { scale: 2.0,  detailDensity: 1.0 },  // 200% zoom, full detail
};
```

### 2.3 Node Rendering Strategy

**Progressive Disclosure:**
- L0: Show only high-level blocks with single-word labels
- L1: Reveal service names and key relationships
- L2: Display technology stacks and API endpoints
- L3: Show detailed configurations and code snippets

```typescript
interface NodeDetail {
  baseInfo: { id: string; title: string; icon: string };
  l0Details?: { businessValue: string; kpi: string };
  l1Details?: { serviceType: string; integrations: string[] };
  l2Details?: { techStack: string[]; apiEndpoints: string[] };
  l3Details?: { configs: object; codeRefs: CodeReference[] };
}
```

---

## 3. Persona-Based Dynamic Rendering

### 3.1 Persona Configuration

```typescript
type Persona = 'business' | 'ba' | 'ea' | 'techlead' | 'developer';

interface PersonaProfile {
  id: Persona;
  name: string;
  defaultLevel: DetailLevel;
  preferredViews: ViewType[];
  interests: string[];
  hideComplexity: boolean;
}

const PERSONAS: Record<Persona, PersonaProfile> = {
  business: {
    id: 'business',
    name: 'Business Stakeholder',
    defaultLevel: 'L0',
    preferredViews: ['flowchart', 'capability-map'],
    interests: ['roi', 'time-to-market', 'scalability'],
    hideComplexity: true
  },
  ba: {
    id: 'ba',
    name: 'Business Analyst',
    defaultLevel: 'L0',
    preferredViews: ['flowchart', 'data-flow', 'journey-map'],
    interests: ['business-rules', 'data-flow', 'integration-points'],
    hideComplexity: true
  },
  ea: {
    id: 'ea',
    name: 'Enterprise Architect',
    defaultLevel: 'L1',
    preferredViews: ['system-landscape', 'integration-patterns'],
    interests: ['patterns', 'standards', 'governance', 'scalability'],
    hideComplexity: false
  },
  techlead: {
    id: 'techlead',
    name: 'Technical Lead',
    defaultLevel: 'L2',
    preferredViews: ['component-diagram', 'deployment-view'],
    interests: ['tech-stack', 'performance', 'reliability', 'security'],
    hideComplexity: false
  },
  developer: {
    id: 'developer',
    name: 'Developer',
    defaultLevel: 'L3',
    preferredViews: ['code-view', 'api-specs', 'deployment-configs'],
    interests: ['implementation', 'apis', 'libraries', 'deployment'],
    hideComplexity: false
  }
};
```

### 3.2 Dynamic Content Adaptation

```typescript
interface PersonaFilter {
  persona: Persona;
  applyFilters(node: ArchitectureNode): ArchitectureNode;
  getRelevantMetrics(node: ArchitectureNode): Metric[];
  getRecommendedDepth(): DetailLevel;
}

// Example: Business persona sees ROI/KPI impacts
function applyBusinessFilter(node: ArchitectureNode): ArchitectureNode {
  return {
    ...node,
    displayName: node.businessName || node.technicalName,
    metrics: [
      { label: 'Cost Impact', value: node.metrics.costImpact },
      { label: 'Time to Market', value: node.metrics.ttm },
      { label: 'ROI', value: node.metrics.roi }
    ],
    technicalDetails: null, // Hidden for business persona
    visualStyle: 'flowchart'
  };
}
```

### 3.3 Persona Switching UX

- **Persona Selector:** Dropdown in header with avatars/icons
- **Instant Re-render:** Canvas re-renders with persona-specific view
- **Preserved Context:** Current node/zoom level maintained when switching
- **Transition Animation:** Smooth morph between views (300ms duration)

---

## 4. Technical Implementation Plan

### 4.1 Technology Stack Recommendation

| Layer | Technology | Justification |
|-------|------------|---------------|
| **Frontend Framework** | Next.js 14 (App Router) | Already in use, SSR/SSG support, excellent DX |
| **Canvas Library** | React Flow 11.x | Already integrated, powerful graph visualization, extensible |
| **Zoom/Pan** | D3.js v7 (d3-zoom) | Already available, smooth zoom/pan, event handling |
| **State Management** | Zustand 5.x | Already in use, lightweight, perfect for canvas state |
| **Animations** | Framer Motion 12.x | Already integrated, declarative animations |
| **Styling** | Tailwind CSS | Already configured, utility-first, rapid development |
| **Icons** | Lucide React | Already in use, consistent icon set |

**Why React Flow + D3 Zoom Hybrid?**
- React Flow: Node/edge management, layout algorithms, interactivity
- D3 Zoom: Smooth zoom/pan with semantic zoom levels
- Combination: Best of both worlds for complex ZUI

### 4.2 Alternative Considerations

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **Pure D3.js Canvas** | Ultimate control, performance | Steep learning curve, more code | ❌ Not recommended |
| **Cytoscape.js** | Great for graph viz | Less React-friendly | ❌ Adds complexity |
| **Mermaid.js** | Simple diagrams | Limited interactivity | ❌ Too limited |
| **React Flow + D3** | Leverage existing stack | Moderate complexity | ✅ **Recommended** |

### 4.3 File Structure

```
app/
├── architecture-playground/
│   ├── page.tsx                          # Main playground page
│   ├── components/
│   │   ├── ZoomableCanvas.tsx            # Core ZUI component
│   │   ├── PersonaSelector.tsx           # Persona switcher
│   │   ├── TheoryPracticeToggle.tsx      # Theory/Practice switcher
│   │   ├── LevelIndicator.tsx            # L0-L3 visual indicator
│   │   ├── ArchitectureNode.tsx          # Custom node component
│   │   ├── ContextPanel.tsx              # Side panel with details
│   │   ├── MiniMap.tsx                   # Navigation mini-map
│   │   └── ExportToolbar.tsx             # Export options
│   └── lib/
│       ├── architecture-data.ts          # Architecture graph data
│       ├── zoom-controller.ts            # Zoom level management
│       ├── persona-filters.ts            # Persona-based filtering
│       └── layout-engine.ts              # Layout algorithms

lib/
├── architecture-playground/
│   ├── types.ts                          # TypeScript interfaces
│   ├── constants.ts                      # Zoom levels, personas
│   ├── data-loader.ts                    # Load architecture JSON
│   └── export-generators.ts              # IaC/diagram export

components/
├── architecture-playground/
│   ├── nodes/
│   │   ├── BusinessNode.tsx              # L0 node rendering
│   │   ├── SystemNode.tsx                # L1 node rendering
│   │   ├── ComponentNode.tsx             # L2 node rendering
│   │   └── DetailNode.tsx                # L3 node rendering
│   └── overlays/
│       ├── SecurityOverlay.tsx           # Security highlights
│       ├── DataFlowOverlay.tsx           # Data flow animations
│       └── CostOverlay.tsx               # Cost/resource overlay
```

---

## 5. Data Model & JSON Schema

### 5.1 Core Architecture Graph Schema

```typescript
// lib/architecture-playground/types.ts

export type DetailLevel = 'L0' | 'L1' | 'L2' | 'L3';
export type Persona = 'business' | 'ba' | 'ea' | 'techlead' | 'developer';
export type NodeCategory = 'infrastructure' | 'service' | 'data' | 'integration' | 'security';

export interface ArchitectureComponent {
  // Identity
  id: string;
  type: NodeCategory;

  // Multi-level naming
  names: {
    business: string;      // "Customer Order Processing"
    technical: string;     // "order-service"
    display: string;       // Auto-selected based on persona
  };

  // Level-specific details
  levels: {
    L0?: {
      businessCapability: string;
      kpis: { name: string; value: string; impact: 'high' | 'medium' | 'low' }[];
      icon: string;
      color: string;
    };
    L1?: {
      systemType: string;           // "Microservice", "Event Bus", etc.
      integrations: string[];       // Connected system IDs
      pattern: string;              // "CQRS", "Event Sourcing", etc.
      sla: { uptime: string; latency: string };
    };
    L2?: {
      techStack: {
        runtime: string;            // "Spring Boot 3.2"
        language: string;           // "Java 21"
        database: string;           // "PostgreSQL 16"
        cache: string;              // "Redis 7"
      };
      apis: {
        rest?: { path: string; methods: string[] }[];
        graphql?: { schema: string };
        grpc?: { services: string[] };
      };
      dependencies: string[];       // npm/maven dependencies
    };
    L3?: {
      repositoryUrl: string;
      deploymentConfigs: {
        kubernetes?: { helmChart: string; values: object };
        terraform?: { module: string };
        docker?: { image: string; tag: string };
      };
      codeSnippets: {
        language: string;
        file: string;
        lineRange: [number, number];
        url: string;
      }[];
      configuration: object;
    };
  };

  // Theory ↔ Practice linkage
  linkage: {
    theoryPage?: string;            // "/patterns/microservices"
    practicePlayground?: string;    // "/playgrounds/microservices-demo"
    relatedConcepts: string[];      // ["bounded-context", "service-mesh"]
    implementationGuides: string[]; // ["/guides/deploy-microservice"]
  };

  // Persona visibility
  visibility: {
    personas: Persona[];            // Which personas should see this
    minLevel: DetailLevel;          // Minimum zoom level to appear
    hideComplexity: boolean;        // Hide for complexity-averse personas
  };

  // Visual positioning
  position: {
    x: number;
    y: number;
    layer?: number;                 // Z-index for layered views
  };

  // Metrics & annotations
  metrics?: {
    cost?: { monthly: number; currency: string };
    performance?: { rps: number; p99Latency: number };
    reliability?: { uptime: number; errorRate: number };
  };

  // Tags for filtering
  tags: string[];
}

export interface ArchitectureConnection {
  id: string;
  source: string;
  target: string;

  // Connection type
  type: 'sync' | 'async' | 'data-flow' | 'dependency' | 'deployment';

  // Level-specific labels
  labels: {
    L0?: string;  // "Processes Orders"
    L1?: string;  // "REST API / Kafka Events"
    L2?: string;  // "POST /api/orders, order.created topic"
    L3?: string;  // "OpenAPI spec, Avro schema"
  };

  // Visual styling
  style: {
    animated?: boolean;
    dashed?: boolean;
    color?: string;
    width?: number;
  };

  // Theory concepts
  pattern?: string;  // "Request-Reply", "Pub-Sub", "SAGA"

  visibility: {
    personas: Persona[];
    minLevel: DetailLevel;
  };
}

export interface ArchitectureGraph {
  metadata: {
    id: string;
    title: string;
    description: string;
    version: string;
    author: string;
    created: string;
    updated: string;
  };

  components: ArchitectureComponent[];
  connections: ArchitectureConnection[];

  // Layout hints
  layouts: {
    L0: { algorithm: 'hierarchical' | 'force' | 'manual'; config: object };
    L1: { algorithm: 'hierarchical' | 'force' | 'manual'; config: object };
    L2: { algorithm: 'hierarchical' | 'force' | 'manual'; config: object };
    L3: { algorithm: 'hierarchical' | 'force' | 'manual'; config: object };
  };

  // Presets for common views
  presets: {
    id: string;
    name: string;
    persona: Persona;
    level: DetailLevel;
    focusNodes?: string[];
    highlightPaths?: string[][];
  }[];
}
```

### 5.2 Example JSON Data

```json
{
  "metadata": {
    "id": "ecommerce-platform",
    "title": "E-Commerce Platform Architecture",
    "description": "Full-stack e-commerce platform with microservices",
    "version": "2.1.0",
    "author": "Architecture Team",
    "created": "2024-01-15",
    "updated": "2024-12-01"
  },
  "components": [
    {
      "id": "order-service",
      "type": "service",
      "names": {
        "business": "Order Processing System",
        "technical": "order-service",
        "display": "Order Processing System"
      },
      "levels": {
        "L0": {
          "businessCapability": "Process customer orders",
          "kpis": [
            { "name": "Orders/day", "value": "50K", "impact": "high" },
            { "name": "Revenue impact", "value": "$2M/month", "impact": "high" }
          ],
          "icon": "ShoppingCart",
          "color": "#3b82f6"
        },
        "L1": {
          "systemType": "Microservice",
          "integrations": ["payment-service", "inventory-service", "event-bus"],
          "pattern": "CQRS + Event Sourcing",
          "sla": { "uptime": "99.95%", "latency": "200ms p99" }
        },
        "L2": {
          "techStack": {
            "runtime": "Spring Boot 3.2",
            "language": "Java 21",
            "database": "PostgreSQL 16",
            "cache": "Redis 7"
          },
          "apis": {
            "rest": [
              { "path": "/api/orders", "methods": ["GET", "POST"] },
              { "path": "/api/orders/{id}", "methods": ["GET", "PUT", "DELETE"] }
            ]
          },
          "dependencies": ["spring-boot-starter-web", "spring-data-jpa", "kafka-clients"]
        },
        "L3": {
          "repositoryUrl": "https://github.com/company/order-service",
          "deploymentConfigs": {
            "kubernetes": {
              "helmChart": "charts/order-service",
              "values": {
                "replicas": 3,
                "resources": { "requests": { "cpu": "500m", "memory": "1Gi" } }
              }
            }
          },
          "codeSnippets": [
            {
              "language": "java",
              "file": "OrderController.java",
              "lineRange": [45, 67],
              "url": "https://github.com/company/order-service/blob/main/src/main/java/com/example/OrderController.java#L45-L67"
            }
          ],
          "configuration": {
            "spring.datasource.url": "jdbc:postgresql://postgres:5432/orders",
            "kafka.bootstrap-servers": "kafka:9092"
          }
        }
      },
      "linkage": {
        "theoryPage": "/patterns/cqrs",
        "practicePlayground": "/playgrounds/microservices-demo",
        "relatedConcepts": ["event-sourcing", "microservices", "bounded-context"],
        "implementationGuides": ["/guides/spring-boot-microservice"]
      },
      "visibility": {
        "personas": ["business", "ba", "ea", "techlead", "developer"],
        "minLevel": "L0",
        "hideComplexity": false
      },
      "position": { "x": 200, "y": 150 },
      "metrics": {
        "cost": { "monthly": 1200, "currency": "USD" },
        "performance": { "rps": 500, "p99Latency": 180 }
      },
      "tags": ["microservice", "core-domain", "critical"]
    }
  ],
  "connections": [
    {
      "id": "order-to-payment",
      "source": "order-service",
      "target": "payment-service",
      "type": "sync",
      "labels": {
        "L0": "Processes Payment",
        "L1": "REST API Call",
        "L2": "POST /api/payments",
        "L3": "OpenAPI 3.0, JWT auth"
      },
      "pattern": "Request-Reply",
      "style": { "animated": true, "color": "#10b981" },
      "visibility": {
        "personas": ["business", "ba", "ea", "techlead", "developer"],
        "minLevel": "L0"
      }
    }
  ],
  "layouts": {
    "L0": { "algorithm": "hierarchical", "config": { "direction": "TB" } },
    "L1": { "algorithm": "force", "config": { "strength": -500 } },
    "L2": { "algorithm": "manual", "config": {} },
    "L3": { "algorithm": "manual", "config": {} }
  },
  "presets": [
    {
      "id": "business-overview",
      "name": "Business Overview",
      "persona": "business",
      "level": "L0",
      "highlightPaths": [["order-service", "payment-service", "fulfillment-service"]]
    }
  ]
}
```

---

## 6. UX Flow & User Journey

### 6.1 Entry Point: Landing Page

```
┌─────────────────────────────────────────────────────────────┐
│                    Digital Platform Architect                │
│                                                               │
│  [Theory]                                      [Practice]    │
│  └─ Patterns                                   └─ Playgrounds│
│  └─ Principles                                 └─ Examples   │
│                                                               │
│           [Interactive Architecture Playground]              │
│              "Explore how theory meets practice"             │
│                                                               │
│  Recent: [Microservices] [Event-Driven] [Data Mesh]         │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Playground Entry Flow

**Scenario 1: From Theory → Practice**

1. User reads article: `/patterns/microservices`
2. Clicks "See this in practice" button (floating action button)
3. Redirected to: `/architecture-playground?preset=microservices&mode=practice&level=L1`
4. Playground loads with:
   - Microservices highlighted
   - Practice mode active (showing implementation details)
   - L1 zoom level (system view)
   - Context panel shows: "You're viewing the practical implementation of Microservices pattern"

**Scenario 2: From Practice → Theory**

1. User explores playground: `/architecture-playground`
2. Clicks on "Order Service" node
3. Context panel shows node details + "Learn the theory" link
4. Clicks link → opens split view or navigates to `/patterns/microservices`
5. Can return to exact playground state via browser back button

**Scenario 3: Direct Playground Exploration**

1. User navigates to: `/architecture-playground`
2. Greeted with persona selector: "Who are you?"
3. Selects "Enterprise Architect"
4. Canvas loads at L1 with EA-relevant view
5. Can zoom/pan, click nodes, switch personas

### 6.3 Interaction Flow

```typescript
// User interaction state machine
type PlaygroundMode = 'explore' | 'theory' | 'practice';
type ViewState = {
  mode: PlaygroundMode;
  persona: Persona;
  level: DetailLevel;
  focusNode: string | null;
  selectedNodes: string[];
  zoom: number;
  pan: { x: number; y: number };
};

// Example transitions
const transitions = {
  'explore → theory': {
    trigger: 'click "Learn Why"',
    action: 'Show theory panel',
    preserve: ['persona', 'level', 'focusNode']
  },
  'theory → practice': {
    trigger: 'click "See How"',
    action: 'Show code panel',
    preserve: ['persona', 'level', 'focusNode']
  },
  'explore → zoom': {
    trigger: 'scroll wheel / pinch',
    action: 'Transition to new detail level',
    preserve: ['persona', 'mode', 'focusNode']
  }
};
```

### 6.4 Contextual Panel Layout

```
┌───────────────────────────────────────────────────────────┐
│ Header: [Persona Selector] [Level Indicator] [Mode Toggle]│
├─────────────────────┬─────────────────────────────────────┤
│                     │                                     │
│  Zoomable Canvas    │   Context Panel                     │
│                     │   ┌───────────────────────────────┐ │
│  [Architecture      │   │ Order Service                 │ │
│   Nodes & Edges]    │   │                               │ │
│                     │   │ [Theory] [Practice]           │ │
│                     │   │                               │ │
│                     │   │ Theory:                       │ │
│                     │   │ - Bounded Context             │ │
│                     │   │ - CQRS Pattern                │ │
│                     │   │ - Event Sourcing              │ │
│                     │   │ → Learn more                  │ │
│                     │   │                               │ │
│                     │   │ Practice:                     │ │
│                     │   │ - Spring Boot 3.2             │ │
│                     │   │ - PostgreSQL 16               │ │
│                     │   │ - Kafka 3.6                   │ │
│                     │   │ → View code                   │ │
│                     │   │ → Deploy guide                │ │
│                     │   └───────────────────────────────┘ │
│                     │                                     │
├─────────────────────┴─────────────────────────────────────┤
│ Mini-map          [Export] [Share] [Save]                 │
└───────────────────────────────────────────────────────────┘
```

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1-2)

**Goals:**
- Set up basic ZUI canvas with React Flow + D3 Zoom
- Implement L0-L3 data structure
- Create sample architecture JSON

**Deliverables:**
- [ ] `ZoomableCanvas.tsx` component
- [ ] Basic zoom/pan controls
- [ ] Simple node rendering at different levels
- [ ] Sample architecture data (5-10 components)

**Code Example:**
```typescript
// components/architecture-playground/ZoomableCanvas.tsx
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
import { zoom } from 'd3-zoom';
import { select } from 'd3-selection';

export function ZoomableCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [currentLevel, setCurrentLevel] = useState<DetailLevel>('L1');

  // D3 zoom behavior
  useEffect(() => {
    const svg = select('.react-flow__viewport');
    const zoomBehavior = zoom()
      .scaleExtent([0.25, 2])
      .on('zoom', (event) => {
        const scale = event.transform.k;
        const newLevel = getDetailLevel(scale);
        if (newLevel !== currentLevel) {
          setCurrentLevel(newLevel);
          updateNodesForLevel(newLevel);
        }
      });

    svg.call(zoomBehavior);
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={NODE_TYPES}
      fitView
    />
  );
}
```

### Phase 2: Persona System (Week 3)

**Goals:**
- Implement persona selector
- Add persona-based filtering
- Create persona-specific node templates

**Deliverables:**
- [ ] `PersonaSelector.tsx` component
- [ ] Persona filtering logic
- [ ] 5 persona profiles configured
- [ ] Dynamic node rendering based on persona

### Phase 3: Theory ↔ Practice Linkage (Week 4)

**Goals:**
- Build bidirectional navigation
- Create context-preserving state management
- Integrate with existing `/patterns` pages

**Deliverables:**
- [ ] `TheoryPracticeToggle.tsx` component
- [ ] URL state management (query params)
- [ ] Deep linking from pattern pages
- [ ] Back-navigation preservation

### Phase 4: Advanced Interactions (Week 5-6)

**Goals:**
- Add overlays (security, data flow, cost)
- Implement export functionality
- Polish animations and transitions

**Deliverables:**
- [ ] Overlay system
- [ ] Export to PNG/SVG/IaC
- [ ] Smooth zoom transitions
- [ ] Keyboard shortcuts

### Phase 5: Content Population (Week 7-8)

**Goals:**
- Create 20+ architecture components
- Document 10+ common patterns
- Write implementation guides

**Deliverables:**
- [ ] Complete architecture JSON files
- [ ] Pattern → Playground mappings
- [ ] Code snippet integrations
- [ ] IaC template library

---

## 8. Component Specifications

### 8.1 ZoomableCanvas Component

**Props:**
```typescript
interface ZoomableCanvasProps {
  architectureId: string;
  initialPersona?: Persona;
  initialLevel?: DetailLevel;
  focusNode?: string;
  mode?: 'explore' | 'theory' | 'practice';
  onNodeClick?: (node: ArchitectureComponent) => void;
  onLevelChange?: (level: DetailLevel) => void;
}
```

**State:**
```typescript
interface CanvasState {
  nodes: Node[];
  edges: Edge[];
  currentLevel: DetailLevel;
  currentPersona: Persona;
  viewport: { x: number; y: number; zoom: number };
  selectedNodeId: string | null;
}
```

**Key Features:**
- Auto-layout based on detail level
- Smooth zoom transitions (300ms ease-in-out)
- Semantic zoom (content changes, not just scale)
- Mini-map for navigation
- Touch-friendly on mobile

### 8.2 ArchitectureNode Component

**Dynamic Rendering:**
```typescript
function ArchitectureNode({ data, level, persona }: NodeProps) {
  const details = data.levels[level];
  const personaFilter = PERSONAS[persona];

  return (
    <div className={`node-${level}`}>
      {level === 'L0' && <BusinessNode data={details.L0} />}
      {level === 'L1' && <SystemNode data={details.L1} />}
      {level === 'L2' && <ComponentNode data={details.L2} />}
      {level === 'L3' && <DetailNode data={details.L3} />}
    </div>
  );
}
```

### 8.3 PersonaSelector Component

**UI Design:**
```
┌─────────────────────────────────────────────────┐
│  Who are you?                                   │
│                                                 │
│  [👔 Business]  [📊 BA]  [🏛️ EA]  [⚙️ TL]  [💻 Dev] │
│                                                 │
│  Selected: Enterprise Architect                │
│  View: System landscape (L1)                   │
└─────────────────────────────────────────────────┘
```

**Behavior:**
- Instant re-render on selection
- Persist in URL query param
- Show persona description tooltip
- Animate transition between personas

### 8.4 Context Panel Component

**Layout:**
```typescript
<ContextPanel>
  <Header>
    <NodeTitle />
    <TheoryPracticeToggle />
  </Header>

  <TabGroup>
    <Tab name="Overview">
      <LevelBasedContent level={currentLevel} />
    </Tab>
    <Tab name="Theory">
      <ConceptLinks concepts={node.linkage.relatedConcepts} />
      <PatternLink pattern={node.linkage.theoryPage} />
    </Tab>
    <Tab name="Practice">
      <TechStack stack={node.levels.L2?.techStack} />
      <CodeSnippets snippets={node.levels.L3?.codeSnippets} />
      <DeploymentGuide config={node.levels.L3?.deploymentConfigs} />
    </Tab>
    <Tab name="Metrics">
      <MetricsDisplay metrics={node.metrics} />
    </Tab>
  </TabGroup>

  <Footer>
    <ActionButtons>
      <Button>View Full Docs</Button>
      <Button>Open in Playground</Button>
    </ActionButtons>
  </Footer>
</ContextPanel>
```

---

## 9. Wireframes

### 9.1 Desktop Layout (1920x1080)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Header                                                                      │
│ Digital Platform Architect                    [Persona: EA ▼] [Share] [?] │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ ┌──────────────────────────────────────────────┬─────────────────────────┐ │
│ │                                               │ Context Panel           │ │
│ │  ╔════════════════════════════════════╗      │                         │ │
│ │  ║                                    ║      │ Order Service           │ │
│ │  ║   [CDN]──────┐                    ║      │                         │ │
│ │  ║              │                     ║      │ [Theory] [Practice]     │ │
│ │  ║              ▼                     ║      │                         │ │
│ │  ║        [Load Balancer]             ║      │ System Type:            │ │
│ │  ║              │                     ║      │ Microservice            │ │
│ │  ║        ┌─────┴─────┐               ║      │                         │ │
│ │  ║        │           │               ║      │ Pattern:                │ │
│ │  ║    [Order]    [Payment]            ║      │ CQRS + Event Sourcing   │ │
│ │  ║        │           │               ║      │                         │ │
│ │  ║        └───┬───┬───┘               ║      │ Integrations:           │ │
│ │  ║            │   │                   ║      │ • Payment Service       │ │
│ │  ║      [DB] [Cache]                  ║      │ • Inventory Service     │ │
│ │  ║                                    ║      │ • Event Bus             │ │
│ │  ╚════════════════════════════════════╝      │                         │ │
│ │                                               │ [→ View Theory]         │ │
│ │  Zoom: [────●────────] L1: System View       │ [→ View Code]           │ │
│ │                                               │                         │ │
│ └──────────────────────────────────────────────┴─────────────────────────┘ │
│                                                                             │
│ ┌──────────────┐  [Theory ↔ Practice]  [Export ▼]  [Overlays ▼]          │
│ │ Mini-map     │                                                           │
│ │  ┌────────┐  │                                                           │
│ │  │ ▪▪     │  │  L0: Business | L1: System | L2: Component | L3: Detail  │
│ │  │   ▪    │  │                                                           │
│ │  └────────┘  │                                                           │
│ └──────────────┘                                                           │
└────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Mobile Layout (375x812)

```
┌─────────────────────────┐
│ ☰  Arch Playground  [?] │
├─────────────────────────┤
│ Persona: EA ▼           │
│ Level: L1 (System)      │
├─────────────────────────┤
│                         │
│   ┌─────────────────┐   │
│   │                 │   │
│   │  [Load Balancer]│   │
│   │       │         │   │
│   │   ┌───┴───┐     │   │
│   │  [Order][Pay]   │   │
│   │                 │   │
│   └─────────────────┘   │
│                         │
│ [Zoom -]  [Zoom +]      │
│                         │
├─────────────────────────┤
│ Order Service           │
│                         │
│ [Theory] [Practice]     │
│                         │
│ Microservice with CQRS  │
│                         │
│ [▼ View Details]        │
└─────────────────────────┘
```

---

## 10. URL Structure & Deep Linking

### 10.1 URL Schema

```
Base: /architecture-playground

Query Parameters:
  - arch={architectureId}       // Which architecture to load
  - persona={persona}            // business|ba|ea|techlead|developer
  - level={detailLevel}          // L0|L1|L2|L3
  - node={nodeId}                // Focus on specific node
  - mode={mode}                  // explore|theory|practice
  - preset={presetId}            // Load predefined view
  - x={number}&y={number}&z={number}  // Viewport state

Examples:
  /architecture-playground
    → Default view (EA persona, L1)

  /architecture-playground?arch=ecommerce&persona=business&level=L0
    → E-commerce arch, business view, high-level

  /architecture-playground?preset=microservices-demo
    → Load "microservices-demo" preset

  /architecture-playground?node=order-service&mode=practice
    → Focus on order-service, show practice details
```

### 10.2 Deep Linking from Pattern Pages

**Pattern Page Structure:**
```typescript
// app/patterns/[slug]/page.tsx

export default function PatternPage({ params }) {
  const pattern = getPattern(params.slug);

  return (
    <article>
      <h1>{pattern.title}</h1>
      <p>{pattern.description}</p>

      {/* Floating Action Button */}
      <FloatingActionButton
        href={`/architecture-playground?preset=${pattern.playgroundPreset}`}
        label="See this in practice"
        icon="Playground"
      />

      {/* Inline link */}
      <p>
        Explore the <TheoryLink href={`/architecture-playground?node=${pattern.exampleNode}&mode=theory`}>
        interactive example</TheoryLink>.
      </p>
    </article>
  );
}
```

---

## 11. Export Functionality

### 11.1 Export Formats

| Format | Use Case | Implementation |
|--------|----------|----------------|
| **PNG** | Presentations, documentation | `html-to-image` library |
| **SVG** | Scalable diagrams | React Flow built-in |
| **PDF** | Reports, printing | SVG → PDF conversion |
| **JSON** | Backup, version control | Native architecture data |
| **Markdown** | Documentation | Template-based generator |
| **Terraform** | IaC deployment | Component → HCL mapping |
| **Kubernetes** | K8s deployment | Component → YAML manifests |
| **Mermaid** | Diagram-as-code | Graph → Mermaid syntax |

### 11.2 Export Modal UI

```
┌─────────────────────────────────────────────────────────┐
│ Export Architecture                                 [✕] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Format:                                                 │
│ ○ Image (PNG/SVG)    ● Diagram Code       ○ IaC       │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Select Export Format:                               │ │
│ │                                                     │ │
│ │ [Mermaid] Generate Mermaid.js diagram code         │ │
│ │ [PlantUML] Generate PlantUML code                  │ │
│ │ [Markdown] Generate markdown documentation         │ │
│ │                                                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Options:                                                │
│ ☑ Include current persona view (Enterprise Architect)  │
│ ☑ Include detail level (L1: System)                    │
│ ☑ Include selected nodes only (3 nodes)                │
│ ☐ Include theory links                                 │
│                                                         │
│              [Cancel]  [Export & Download]              │
└─────────────────────────────────────────────────────────┘
```

### 11.3 Mermaid Export Example

```typescript
// lib/architecture-playground/export-generators.ts

export function exportToMermaid(
  graph: ArchitectureGraph,
  options: { persona: Persona; level: DetailLevel }
): string {
  const { components, connections } = filterByPersona(graph, options);

  let mermaid = 'graph TD\n';

  // Add nodes
  components.forEach(comp => {
    const label = comp.names[options.persona === 'business' ? 'business' : 'technical'];
    mermaid += `  ${comp.id}[${label}]\n`;
  });

  // Add edges
  connections.forEach(conn => {
    const label = conn.labels[options.level] || '';
    mermaid += `  ${conn.source} -->|${label}| ${conn.target}\n`;
  });

  return mermaid;
}

// Usage:
const mermaidCode = exportToMermaid(architecture, {
  persona: 'ea',
  level: 'L1'
});

/*
Output:
graph TD
  order-service[Order Service]
  payment-service[Payment Service]
  event-bus[Event Bus]
  order-service -->|REST API Call| payment-service
  order-service -->|Publish Events| event-bus
*/
```

---

## 12. Performance Considerations

### 12.1 Optimization Strategies

| Concern | Strategy | Implementation |
|---------|----------|----------------|
| **Large Graphs (100+ nodes)** | Virtualization | Only render visible nodes in viewport |
| **Zoom Performance** | Debounced re-rendering | 100ms debounce on zoom events |
| **Initial Load** | Lazy loading | Load L0 first, progressive enhancement |
| **State Management** | Zustand + Immer | Efficient immutable updates |
| **Layout Calculation** | Web Workers | Offload layout algorithms |
| **Data Size** | Code splitting | Dynamic imports for detail levels |

### 12.2 Code Splitting Strategy

```typescript
// Lazy load detail levels
const L2Details = lazy(() => import('./components/nodes/ComponentNode'));
const L3Details = lazy(() => import('./components/nodes/DetailNode'));

// Lazy load overlays
const SecurityOverlay = lazy(() => import('./components/overlays/SecurityOverlay'));
const CostOverlay = lazy(() => import('./components/overlays/CostOverlay'));

// Only load when zooming to L2+
useEffect(() => {
  if (currentLevel === 'L2' || currentLevel === 'L3') {
    import('./lib/layout-engine-advanced').then(module => {
      setLayoutEngine(module.default);
    });
  }
}, [currentLevel]);
```

### 12.3 Rendering Budget

```
Target Performance:
- Time to Interactive (TTI): < 3s
- First Contentful Paint (FCP): < 1s
- Zoom transition: < 300ms (60fps)
- Node click response: < 100ms
- Layout recalculation: < 500ms

Budget:
- Initial bundle: < 200KB (gzipped)
- L0 data: < 50KB
- L1 data: < 100KB
- L2 data: < 200KB
- L3 data: < 500KB (lazy loaded)
```

---

## 13. Accessibility

### 13.1 WCAG 2.1 Compliance

| Criterion | Implementation |
|-----------|----------------|
| **Keyboard Navigation** | Tab through nodes, arrow keys to pan, +/- to zoom |
| **Screen Reader** | ARIA labels on all nodes, live regions for updates |
| **Color Contrast** | 4.5:1 minimum for text, 3:1 for graphics |
| **Focus Indicators** | Visible outline (2px blue) on focused nodes |
| **Reduced Motion** | Respect `prefers-reduced-motion` media query |

### 13.2 Keyboard Shortcuts

```typescript
const KEYBOARD_SHORTCUTS = {
  'Tab': 'Navigate to next node',
  'Shift+Tab': 'Navigate to previous node',
  'Enter': 'Select/open node details',
  'Escape': 'Close panels/deselect',
  '+': 'Zoom in (increase detail level)',
  '-': 'Zoom out (decrease detail level)',
  '0': 'Reset zoom to L1',
  'Arrow Keys': 'Pan canvas',
  'Space': 'Toggle Theory/Practice mode',
  'T': 'Open Theory panel',
  'P': 'Open Practice panel',
  'E': 'Export dialog',
  '1-4': 'Jump to L0-L3',
  'H': 'Show help/shortcuts'
};
```

---

## 14. Migration from Existing Features

### 14.1 Integration with Current Playgrounds

**Existing Playgrounds:**
- Pattern Composer
- Data Pipeline
- Message Flow
- Enterprise Integration

**Migration Strategy:**
1. Keep existing playgrounds as-is (don't break)
2. Add "Explore in Architecture Playground" link to each
3. Create architecture JSON for each playground's domain
4. Gradually enhance with ZUI capabilities

**Example Link:**
```typescript
// In app/playgrounds/pattern-composer/page.tsx

<Link href="/architecture-playground?preset=pattern-composer-demo">
  <Button>
    Explore in Architecture Playground →
  </Button>
</Link>
```

### 14.2 Reusing Existing Components

**Reusable Components:**
- `TheoryLink` component → Use in context panel
- `PlaygroundLink` component → Link to other playgrounds
- `ArchitectureOverlays` → Integrate overlay system
- Pattern data from `lib/patterns.ts` → Map to architecture components

### 14.3 Data Migration

**Current Pattern Data:**
```typescript
// lib/patterns.ts
export const architecturalPatterns = [
  { id: 'microservices', name: 'Microservices', ... }
];
```

**New Architecture Data:**
```typescript
// lib/architecture-playground/data/microservices-arch.json
{
  "components": [
    {
      "id": "microservice-example",
      "linkage": {
        "theoryPage": "/patterns/microservices",  // Links to existing pattern
        ...
      }
    }
  ]
}
```

---

## 15. Testing Strategy

### 15.1 Unit Tests

```typescript
// __tests__/zoom-controller.test.ts

describe('ZoomController', () => {
  it('should map zoom scale to correct detail level', () => {
    expect(getDetailLevel(0.3)).toBe('L0');
    expect(getDetailLevel(0.6)).toBe('L1');
    expect(getDetailLevel(1.2)).toBe('L2');
    expect(getDetailLevel(2.0)).toBe('L3');
  });

  it('should filter nodes by persona', () => {
    const filtered = filterByPersona(mockGraph, 'business');
    expect(filtered.components.every(c =>
      c.visibility.personas.includes('business')
    )).toBe(true);
  });
});
```

### 15.2 Integration Tests

```typescript
// __tests__/playground-flow.test.tsx

describe('Playground User Flow', () => {
  it('should navigate from theory to practice', async () => {
    render(<ArchitecturePlayground />);

    // Click on a node
    await userEvent.click(screen.getByText('Order Service'));

    // Switch to practice mode
    await userEvent.click(screen.getByRole('button', { name: 'Practice' }));

    // Should show tech stack
    expect(screen.getByText('Spring Boot 3.2')).toBeInTheDocument();
  });
});
```

### 15.3 E2E Tests (Playwright)

```typescript
// e2e/architecture-playground.spec.ts

test('persona switching updates view', async ({ page }) => {
  await page.goto('/architecture-playground');

  // Select business persona
  await page.click('[data-testid="persona-selector"]');
  await page.click('text=Business Stakeholder');

  // Should show business-friendly labels
  await expect(page.locator('text=Order Processing System')).toBeVisible();

  // Should hide technical details
  await expect(page.locator('text=Spring Boot')).not.toBeVisible();
});
```

---

## 16. Analytics & Metrics

### 16.1 Tracking Events

```typescript
// Track user interactions
analytics.track('playground_persona_selected', {
  persona: 'ea',
  previousPersona: 'business'
});

analytics.track('playground_zoom_level_changed', {
  fromLevel: 'L1',
  toLevel: 'L2',
  method: 'scroll'  // 'scroll' | 'button' | 'keyboard'
});

analytics.track('playground_node_clicked', {
  nodeId: 'order-service',
  nodeType: 'service',
  currentPersona: 'developer',
  currentLevel: 'L2'
});

analytics.track('playground_mode_switched', {
  from: 'theory',
  to: 'practice',
  node: 'order-service'
});

analytics.track('playground_export', {
  format: 'mermaid',
  nodeCount: 8,
  persona: 'ea',
  level: 'L1'
});
```

### 16.2 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Engagement Rate** | > 40% | % visitors who interact with playground |
| **Avg. Session Duration** | > 5 min | Time spent in playground |
| **Theory ↔ Practice Switches** | > 2 per session | Bidirectional navigation usage |
| **Export Rate** | > 10% | % sessions that end with export |
| **Mobile Usage** | > 20% | % sessions on mobile devices |
| **Return Rate** | > 30% | % users returning within 7 days |

---

## 17. Future Enhancements

### 17.1 Phase 2 Features (3-6 months)

- **Collaborative Editing:** Multi-user canvas with real-time sync
- **AI-Powered Recommendations:** Suggest patterns based on current composition
- **Custom Architecture Builder:** Drag-and-drop architecture creator
- **Version History:** Time-travel through architecture changes
- **Commenting System:** Annotate nodes with discussions

### 17.2 Advanced Capabilities

- **3D Visualization:** Three.js-based 3D architecture view
- **AR/VR Mode:** Explore architecture in immersive environments
- **Live System Integration:** Connect to real infrastructure (Kubernetes API, AWS)
- **Cost Simulation:** Real-time cost calculator based on node configuration
- **Performance Simulation:** Predict latency/throughput based on architecture

### 17.3 Ecosystem Integration

- **VS Code Extension:** Sync playground with codebase
- **Figma Plugin:** Export architecture to design tool
- **Confluence/Notion:** Embed interactive playground
- **GitHub Actions:** Auto-generate architecture diagrams from code

---

## 18. Success Criteria & Launch Checklist

### 18.1 MVP Launch Criteria

- [ ] Canvas supports L0-L2 zoom levels (L3 can be added post-launch)
- [ ] 5 personas implemented with distinct views
- [ ] At least 1 complete architecture (15+ components)
- [ ] Theory ↔ Practice navigation works
- [ ] Export to Mermaid/PNG functional
- [ ] Mobile-responsive (basic functionality)
- [ ] Accessibility: keyboard navigation + screen reader
- [ ] Page load time < 3s (Lighthouse score > 90)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)

### 18.2 Documentation Requirements

- [ ] User guide: "How to use the playground"
- [ ] Architecture guide: "Understanding the data model"
- [ ] Contribution guide: "How to add new architectures"
- [ ] API reference: "Component schema documentation"

### 18.3 Pre-Launch Testing

- [ ] 10 user testing sessions (5 technical, 5 non-technical)
- [ ] Load testing: 1000 concurrent users
- [ ] Security audit: OWASP top 10 check
- [ ] Legal review: License compliance for libraries

---

## Appendix A: Technology Comparison Matrix

| Library | Stars | Bundle Size | Learning Curve | React Integration | Verdict |
|---------|-------|-------------|----------------|-------------------|---------|
| **React Flow** | 18K+ | 350KB | Low | Excellent | ✅ **Selected** |
| **D3.js** | 107K+ | 200KB | High | Manual | ✅ **For zoom only** |
| **Cytoscape.js** | 9K+ | 500KB | Medium | Fair | ❌ |
| **Vis.js** | 10K+ | 600KB | Medium | Poor | ❌ |
| **Sigma.js** | 10K+ | 300KB | Medium | Fair | ❌ |

---

## Appendix B: Sample Architecture JSON (Complete Example)

See [Section 5.2](#52-example-json-data) for a complete JSON example.

---

## Appendix C: Visual Design System

### Color Palette

```css
/* Node Categories */
--color-infrastructure: #3b82f6;  /* Blue */
--color-service: #8b5cf6;         /* Purple */
--color-data: #10b981;            /* Green */
--color-integration: #f59e0b;     /* Amber */
--color-security: #ef4444;        /* Red */

/* Detail Levels */
--color-l0: #cbd5e1;  /* Light gray */
--color-l1: #64748b;  /* Gray */
--color-l2: #334155;  /* Dark gray */
--color-l3: #0f172a;  /* Very dark */

/* Personas */
--color-business: #ec4899;   /* Pink */
--color-ba: #06b6d4;         /* Cyan */
--color-ea: #8b5cf6;         /* Purple */
--color-techlead: #f59e0b;   /* Amber */
--color-developer: #10b981;  /* Green */
```

### Typography

```css
/* Headings */
--font-heading: 'Inter', system-ui, sans-serif;
--font-mono: 'Fira Code', 'Courier New', monospace;

/* Sizes */
--text-xs: 0.75rem;    /* 12px - L0 labels */
--text-sm: 0.875rem;   /* 14px - L1 labels */
--text-base: 1rem;     /* 16px - L2 labels */
--text-lg: 1.125rem;   /* 18px - L3 headings */
--text-xl: 1.25rem;    /* 20px - Panel titles */
--text-2xl: 1.5rem;    /* 24px - Page titles */
```

---

## Appendix D: Code Examples

### D.1 Zoom Level Controller

```typescript
// lib/architecture-playground/zoom-controller.ts

export class ZoomController {
  private static LEVEL_THRESHOLDS = {
    L0: { min: 0.1, max: 0.4 },
    L1: { min: 0.4, max: 0.8 },
    L2: { min: 0.8, max: 1.5 },
    L3: { min: 1.5, max: 3.0 }
  };

  static getDetailLevel(zoomScale: number): DetailLevel {
    if (zoomScale < this.LEVEL_THRESHOLDS.L0.max) return 'L0';
    if (zoomScale < this.LEVEL_THRESHOLDS.L1.max) return 'L1';
    if (zoomScale < this.LEVEL_THRESHOLDS.L2.max) return 'L2';
    return 'L3';
  }

  static getScaleForLevel(level: DetailLevel): number {
    const thresholds = this.LEVEL_THRESHOLDS[level];
    return (thresholds.min + thresholds.max) / 2; // Return midpoint
  }

  static transitionToLevel(
    currentScale: number,
    targetLevel: DetailLevel,
    duration: number = 300
  ): Animation {
    const targetScale = this.getScaleForLevel(targetLevel);
    return animate(currentScale, targetScale, {
      duration,
      ease: 'easeInOut'
    });
  }
}
```

### D.2 Persona Filter

```typescript
// lib/architecture-playground/persona-filters.ts

export class PersonaFilter {
  static applyFilter(
    graph: ArchitectureGraph,
    persona: Persona,
    maxLevel: DetailLevel
  ): ArchitectureGraph {
    const profile = PERSONAS[persona];

    return {
      ...graph,
      components: graph.components.filter(component => {
        // Check visibility
        if (!component.visibility.personas.includes(persona)) {
          return false;
        }

        // Check complexity hiding
        if (profile.hideComplexity && component.visibility.hideComplexity) {
          return false;
        }

        // Check detail level
        const levelNum = parseInt(component.visibility.minLevel[1]);
        const maxLevelNum = parseInt(maxLevel[1]);
        if (levelNum > maxLevelNum) {
          return false;
        }

        return true;
      }),
      connections: graph.connections.filter(connection =>
        connection.visibility.personas.includes(persona)
      )
    };
  }

  static transformNodeForPersona(
    node: ArchitectureComponent,
    persona: Persona
  ): ArchitectureComponent {
    const profile = PERSONAS[persona];

    return {
      ...node,
      displayName: persona === 'business' || persona === 'ba'
        ? node.names.business
        : node.names.technical,
      highlightedMetrics: this.getRelevantMetrics(node, profile.interests)
    };
  }

  private static getRelevantMetrics(
    node: ArchitectureComponent,
    interests: string[]
  ): Metric[] {
    // Map interests to metrics
    const metricMap: Record<string, keyof ArchitectureComponent['metrics']> = {
      'roi': 'cost',
      'scalability': 'performance',
      'reliability': 'reliability'
    };

    return interests
      .map(interest => node.metrics?.[metricMap[interest]])
      .filter(Boolean);
  }
}
```

---

## Conclusion

This comprehensive plan outlines a robust, scalable, and user-centric **Interactive Architecture Playground** that bridges the gap between theoretical concepts and practical implementation. The dual-track navigation system, persona-based rendering, and zoomable interface create a unique learning experience for stakeholders at all levels.

**Key Differentiators:**
1. **Theory ↔ Practice Bidirectional Navigation** - Unique in the architecture learning space
2. **Persona-Driven Views** - Tailored content for Business, BA, EA, TechLead, Developer
3. **Semantic Zoom (L0-L3)** - Progressive disclosure from business to code level
4. **Export-First Design** - Practical outputs (IaC, diagrams, docs)
5. **Existing Stack Leverage** - Builds on React Flow, D3, Next.js already in use

**Next Steps:**
1. Review and approve this plan
2. Set up project board with Phase 1 tasks
3. Create initial architecture JSON schema
4. Build ZoomableCanvas MVP (Week 1)
5. Iterate with user feedback

**Estimated Timeline:** 8 weeks to MVP, 16 weeks to full feature set

---

*Document Version: 1.0*
*Last Updated: 2026-02-15*
*Author: Senior Full-Stack Architect & UX Designer*
