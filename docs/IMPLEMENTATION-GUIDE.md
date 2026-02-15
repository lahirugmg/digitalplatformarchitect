# Interactive Architecture Playground - Implementation Guide

## Quick Start

This guide walks you through implementing the Interactive Architecture Playground from scratch, using your existing Next.js + React Flow + D3 stack.

---

## Phase 1: Foundation (Week 1-2)

### Step 1: Set Up File Structure

```bash
# Create directory structure
mkdir -p app/architecture-playground
mkdir -p app/architecture-playground/components
mkdir -p lib/architecture-playground
mkdir -p lib/architecture-playground/data
mkdir -p components/architecture-playground
mkdir -p components/architecture-playground/nodes
mkdir -p components/architecture-playground/overlays
```

### Step 2: Install Additional Dependencies (if needed)

Your existing `package.json` already has everything needed:
- ✅ `reactflow@11.11.4` - Already installed
- ✅ `d3@7.9.0` - Already installed
- ✅ `zustand@5.0.8` - Already installed
- ✅ `framer-motion@12.23.12` - Already installed

No additional packages required!

### Step 3: Create Type Definitions

Copy the types file already created:
```bash
# Already created:
# lib/architecture-playground/types.ts
```

### Step 4: Create Constants File

```typescript
// lib/architecture-playground/constants.ts

import { DetailLevel, Persona, ZoomThreshold, PersonaProfile } from './types';

export const ZOOM_THRESHOLDS: Record<DetailLevel, ZoomThreshold> = {
  L0: { min: 0.1, max: 0.4 },
  L1: { min: 0.4, max: 0.8 },
  L2: { min: 0.8, max: 1.5 },
  L3: { min: 1.5, max: 3.0 }
};

export const DEFAULT_ZOOM_SCALES: Record<DetailLevel, number> = {
  L0: 0.3,
  L1: 0.6,
  L2: 1.0,
  L3: 2.0
};

export const PERSONA_PROFILES: Record<Persona, PersonaProfile> = {
  business: {
    id: 'business',
    name: 'Business Stakeholder',
    description: 'Executive or product owner focused on business value and ROI',
    defaultLevel: 'L0',
    preferredViews: ['flowchart', 'capability-map'],
    interests: ['roi', 'time-to-market', 'scalability', 'cost'],
    hideComplexity: true,
    icon: 'Briefcase',
    color: '#ec4899'
  },
  ba: {
    id: 'ba',
    name: 'Business Analyst',
    description: 'Analyst bridging business and technical domains',
    defaultLevel: 'L0',
    preferredViews: ['flowchart', 'data-flow', 'journey-map'],
    interests: ['business-rules', 'data-flow', 'integration-points'],
    hideComplexity: true,
    icon: 'BarChart',
    color: '#06b6d4'
  },
  ea: {
    id: 'ea',
    name: 'Enterprise Architect',
    description: 'Architect responsible for system design and patterns',
    defaultLevel: 'L1',
    preferredViews: ['system-landscape', 'integration-patterns'],
    interests: ['patterns', 'standards', 'governance', 'scalability'],
    hideComplexity: false,
    icon: 'Building',
    color: '#8b5cf6'
  },
  techlead: {
    id: 'techlead',
    name: 'Technical Lead',
    description: 'Technical leader overseeing implementation and architecture',
    defaultLevel: 'L2',
    preferredViews: ['component-diagram', 'deployment-view'],
    interests: ['tech-stack', 'performance', 'reliability', 'security'],
    hideComplexity: false,
    icon: 'Settings',
    color: '#f59e0b'
  },
  developer: {
    id: 'developer',
    name: 'Developer',
    description: 'Software engineer implementing and deploying services',
    defaultLevel: 'L3',
    preferredViews: ['code-view', 'api-specs', 'deployment-configs'],
    interests: ['implementation', 'apis', 'libraries', 'deployment'],
    hideComplexity: false,
    icon: 'Code',
    color: '#10b981'
  }
};

export const LEVEL_DESCRIPTIONS: Record<DetailLevel, string> = {
  L0: 'Business View - Capabilities & KPIs',
  L1: 'System View - Services & Integration',
  L2: 'Component View - Tech Stack & APIs',
  L3: 'Detail View - Code & Deployment'
};

export const NODE_CATEGORY_COLORS: Record<string, string> = {
  infrastructure: '#3b82f6',  // Blue
  service: '#8b5cf6',          // Purple
  data: '#10b981',             // Green
  integration: '#f59e0b',      // Amber
  security: '#ef4444',         // Red
  frontend: '#06b6d4',         // Cyan
  platform: '#64748b'          // Slate
};

export const CONNECTION_TYPE_STYLES: Record<string, { dashed: boolean; color: string; animated: boolean }> = {
  sync: { dashed: false, color: '#10b981', animated: true },
  async: { dashed: true, color: '#f59e0b', animated: true },
  'data-flow': { dashed: false, color: '#64748b', animated: false },
  dependency: { dashed: true, color: '#94a3b8', animated: false },
  deployment: { dashed: true, color: '#cbd5e1', animated: false }
};
```

### Step 5: Create Zoom Controller

```typescript
// lib/architecture-playground/zoom-controller.ts

import { DetailLevel } from './types';
import { ZOOM_THRESHOLDS, DEFAULT_ZOOM_SCALES } from './constants';

export class ZoomController {
  /**
   * Get the appropriate detail level for a given zoom scale
   */
  static getDetailLevel(zoomScale: number): DetailLevel {
    if (zoomScale < ZOOM_THRESHOLDS.L0.max) return 'L0';
    if (zoomScale < ZOOM_THRESHOLDS.L1.max) return 'L1';
    if (zoomScale < ZOOM_THRESHOLDS.L2.max) return 'L2';
    return 'L3';
  }

  /**
   * Get the recommended zoom scale for a detail level
   */
  static getScaleForLevel(level: DetailLevel): number {
    return DEFAULT_ZOOM_SCALES[level];
  }

  /**
   * Get the next higher detail level
   */
  static getNextLevel(currentLevel: DetailLevel): DetailLevel | null {
    const levels: DetailLevel[] = ['L0', 'L1', 'L2', 'L3'];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  }

  /**
   * Get the next lower detail level
   */
  static getPreviousLevel(currentLevel: DetailLevel): DetailLevel | null {
    const levels: DetailLevel[] = ['L0', 'L1', 'L2', 'L3'];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex > 0 ? levels[currentIndex - 1] : null;
  }

  /**
   * Check if we should transition to a new level based on zoom
   */
  static shouldTransition(
    currentLevel: DetailLevel,
    newZoom: number
  ): { transition: boolean; newLevel?: DetailLevel } {
    const newLevel = this.getDetailLevel(newZoom);
    if (newLevel !== currentLevel) {
      return { transition: true, newLevel };
    }
    return { transition: false };
  }
}
```

### Step 6: Create Persona Filter

```typescript
// lib/architecture-playground/persona-filter.ts

import { ArchitectureGraph, ArchitectureComponent, Persona, DetailLevel } from './types';
import { PERSONA_PROFILES } from './constants';

export class PersonaFilter {
  /**
   * Filter architecture graph based on persona and detail level
   */
  static filterGraph(
    graph: ArchitectureGraph,
    persona: Persona,
    maxLevel: DetailLevel
  ): ArchitectureGraph {
    const profile = PERSONA_PROFILES[persona];
    const maxLevelNum = parseInt(maxLevel[1]);

    const filteredComponents = graph.components.filter(component => {
      // Check persona visibility
      if (!component.visibility.personas.includes(persona)) {
        return false;
      }

      // Check complexity hiding
      if (profile.hideComplexity && component.visibility.hideComplexity) {
        return false;
      }

      // Check detail level
      const minLevelNum = parseInt(component.visibility.minLevel[1]);
      if (minLevelNum > maxLevelNum) {
        return false;
      }

      return true;
    });

    const visibleComponentIds = new Set(filteredComponents.map(c => c.id));

    const filteredConnections = graph.connections.filter(connection => {
      // Only show connections between visible components
      if (!visibleComponentIds.has(connection.source) || !visibleComponentIds.has(connection.target)) {
        return false;
      }

      // Check persona visibility
      if (!connection.visibility.personas.includes(persona)) {
        return false;
      }

      // Check detail level
      const minLevelNum = parseInt(connection.visibility.minLevel[1]);
      if (minLevelNum > maxLevelNum) {
        return false;
      }

      return true;
    });

    return {
      ...graph,
      components: filteredComponents,
      connections: filteredConnections
    };
  }

  /**
   * Transform component display based on persona
   */
  static transformComponent(
    component: ArchitectureComponent,
    persona: Persona
  ): ArchitectureComponent {
    const useBusinessName = persona === 'business' || persona === 'ba';

    return {
      ...component,
      names: {
        ...component.names,
        display: useBusinessName ? component.names.business : component.names.technical
      }
    };
  }

  /**
   * Get relevant metrics for a persona
   */
  static getRelevantMetrics(component: ArchitectureComponent, persona: Persona): any[] {
    const profile = PERSONA_PROFILES[persona];
    const metrics: any[] = [];

    profile.interests.forEach(interest => {
      if (interest === 'cost' && component.metrics?.cost) {
        metrics.push({
          label: 'Monthly Cost',
          value: `$${component.metrics.cost.monthly}`,
          icon: 'DollarSign'
        });
      }
      if (interest === 'performance' && component.metrics?.performance) {
        metrics.push({
          label: 'Performance',
          value: `${component.metrics.performance.rps} req/s`,
          icon: 'Zap'
        });
      }
      if (interest === 'reliability' && component.metrics?.reliability) {
        metrics.push({
          label: 'Uptime',
          value: `${component.metrics.reliability.uptime}%`,
          icon: 'Shield'
        });
      }
    });

    return metrics;
  }
}
```

### Step 7: Create Data Loader

```typescript
// lib/architecture-playground/data-loader.ts

import { ArchitectureGraph } from './types';

/**
 * Load architecture data from JSON file
 */
export async function loadArchitecture(architectureId: string): Promise<ArchitectureGraph> {
  try {
    const data = await import(`./data/${architectureId}.json`);
    return data.default as ArchitectureGraph;
  } catch (error) {
    console.error(`Failed to load architecture: ${architectureId}`, error);
    throw new Error(`Architecture "${architectureId}" not found`);
  }
}

/**
 * Get list of available architectures
 */
export async function getAvailableArchitectures(): Promise<{ id: string; title: string }[]> {
  // In a real implementation, this could scan the data directory
  // For now, return hardcoded list
  return [
    { id: 'ecommerce-platform', title: 'E-Commerce Platform' }
  ];
}

/**
 * Validate architecture graph structure
 */
export function validateArchitecture(graph: ArchitectureGraph): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required metadata
  if (!graph.metadata?.id) errors.push('Missing metadata.id');
  if (!graph.metadata?.title) errors.push('Missing metadata.title');

  // Check components
  if (!Array.isArray(graph.components) || graph.components.length === 0) {
    errors.push('No components defined');
  }

  // Check for duplicate component IDs
  const componentIds = new Set<string>();
  graph.components?.forEach(comp => {
    if (componentIds.has(comp.id)) {
      errors.push(`Duplicate component ID: ${comp.id}`);
    }
    componentIds.add(comp.id);
  });

  // Check connections reference valid components
  graph.connections?.forEach(conn => {
    if (!componentIds.has(conn.source)) {
      errors.push(`Connection references unknown source: ${conn.source}`);
    }
    if (!componentIds.has(conn.target)) {
      errors.push(`Connection references unknown target: ${conn.target}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}
```

### Step 8: Create React Flow Adapter

```typescript
// lib/architecture-playground/reactflow-adapter.ts

import { Node, Edge } from 'reactflow';
import { ArchitectureComponent, ArchitectureConnection, DetailLevel, Persona } from './types';
import { NODE_CATEGORY_COLORS, CONNECTION_TYPE_STYLES } from './constants';
import { PersonaFilter } from './persona-filter';

/**
 * Convert ArchitectureComponent to React Flow Node
 */
export function toReactFlowNode(
  component: ArchitectureComponent,
  level: DetailLevel,
  persona: Persona
): Node {
  const transformed = PersonaFilter.transformComponent(component, persona);
  const levelData = component.levels[level];

  return {
    id: component.id,
    type: `custom-${level.toLowerCase()}`, // custom-l0, custom-l1, etc.
    position: component.position,
    data: {
      label: transformed.names.display || transformed.names.technical,
      component: transformed,
      level,
      persona,
      levelData,
      color: NODE_CATEGORY_COLORS[component.type] || '#64748b'
    }
  };
}

/**
 * Convert ArchitectureConnection to React Flow Edge
 */
export function toReactFlowEdge(
  connection: ArchitectureConnection,
  level: DetailLevel
): Edge {
  const style = CONNECTION_TYPE_STYLES[connection.type] || CONNECTION_TYPE_STYLES.sync;
  const label = connection.labels?.[level] || '';

  return {
    id: connection.id,
    source: connection.source,
    target: connection.target,
    type: connection.style?.animated ? 'smoothstep' : 'default',
    animated: connection.style?.animated ?? style.animated,
    style: {
      strokeDasharray: style.dashed ? '5,5' : undefined,
      stroke: connection.style?.color || style.color,
      strokeWidth: connection.style?.width || 2
    },
    label,
    labelStyle: {
      fill: connection.style?.labelColor || '#64748b',
      fontSize: 12
    },
    labelBgStyle: {
      fill: connection.style?.labelBgColor || '#ffffff'
    }
  };
}

/**
 * Convert full architecture graph to React Flow nodes and edges
 */
export function toReactFlow(
  components: ArchitectureComponent[],
  connections: ArchitectureConnection[],
  level: DetailLevel,
  persona: Persona
): { nodes: Node[]; edges: Edge[] } {
  const nodes = components.map(comp => toReactFlowNode(comp, level, persona));
  const edges = connections.map(conn => toReactFlowEdge(conn, level));

  return { nodes, edges };
}
```

### Step 9: Create Zustand Store

```typescript
// lib/architecture-playground/store.ts

import { create } from 'zustand';
import { PlaygroundState, Persona, DetailLevel, PlaygroundMode, ArchitectureGraph } from './types';

interface PlaygroundStore extends PlaygroundState {
  // Architecture data
  architecture: ArchitectureGraph | null;
  setArchitecture: (arch: ArchitectureGraph) => void;

  // Persona
  setPersona: (persona: Persona) => void;

  // Detail level
  setLevel: (level: DetailLevel) => void;

  // Mode
  setMode: (mode: PlaygroundMode) => void;

  // Focus node
  setFocusNode: (nodeId: string | null) => void;

  // Selected nodes
  toggleNodeSelection: (nodeId: string) => void;
  clearSelection: () => void;

  // Viewport
  setViewport: (viewport: { x: number; y: number; zoom: number }) => void;

  // Overlays
  toggleOverlay: (overlayId: string) => void;

  // UI state
  setShowMinimap: (show: boolean) => void;
  setShowGrid: (show: boolean) => void;
}

export const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  // Initial state
  architecture: null,
  mode: 'explore',
  persona: 'ea',
  level: 'L1',
  focusNode: null,
  selectedNodes: [],
  viewport: { x: 0, y: 0, zoom: 1 },
  activeOverlays: [],
  showMinimap: true,
  showGrid: false,

  // Actions
  setArchitecture: (arch) => set({ architecture: arch }),

  setPersona: (persona) => set({ persona }),

  setLevel: (level) => set({ level }),

  setMode: (mode) => set({ mode }),

  setFocusNode: (nodeId) => set({ focusNode: nodeId }),

  toggleNodeSelection: (nodeId) =>
    set((state) => ({
      selectedNodes: state.selectedNodes.includes(nodeId)
        ? state.selectedNodes.filter((id) => id !== nodeId)
        : [...state.selectedNodes, nodeId]
    })),

  clearSelection: () => set({ selectedNodes: [] }),

  setViewport: (viewport) => set({ viewport }),

  toggleOverlay: (overlayId) =>
    set((state) => ({
      activeOverlays: state.activeOverlays.includes(overlayId)
        ? state.activeOverlays.filter((id) => id !== overlayId)
        : [...state.activeOverlays, overlayId]
    })),

  setShowMinimap: (show) => set({ showMinimap: show }),

  setShowGrid: (show) => set({ showGrid: show })
}));
```

### Step 10: Create Basic Page

```typescript
// app/architecture-playground/page.tsx

import { Metadata } from 'next';
import PlaygroundCanvas from './components/PlaygroundCanvas';

export const metadata: Metadata = {
  title: 'Interactive Architecture Playground | Digital Platform Architect',
  description: 'Explore enterprise architecture with our interactive, persona-driven playground. Bridge theory and practice with zoomable architecture diagrams.',
};

export default function ArchitecturePlaygroundPage() {
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">🏛️ Interactive Architecture Playground</h1>
            <p className="text-purple-100">
              Explore how theory meets practice with persona-driven views
            </p>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <PlaygroundCanvas architectureId="ecommerce-platform" />
    </div>
  );
}
```

### Step 11: Create Canvas Component

```typescript
// app/architecture-playground/components/PlaygroundCanvas.tsx

'use client';

import { useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

import { loadArchitecture } from '@/lib/architecture-playground/data-loader';
import { PersonaFilter } from '@/lib/architecture-playground/persona-filter';
import { toReactFlow } from '@/lib/architecture-playground/reactflow-adapter';
import { usePlaygroundStore } from '@/lib/architecture-playground/store';

interface PlaygroundCanvasProps {
  architectureId: string;
}

export default function PlaygroundCanvas({ architectureId }: PlaygroundCanvasProps) {
  const { persona, level, architecture, setArchitecture } = usePlaygroundStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);

  // Load architecture data
  useEffect(() => {
    loadArchitecture(architectureId)
      .then(arch => {
        setArchitecture(arch);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load architecture:', err);
        setLoading(false);
      });
  }, [architectureId, setArchitecture]);

  // Update nodes/edges when persona or level changes
  useEffect(() => {
    if (!architecture) return;

    const filtered = PersonaFilter.filterGraph(architecture, persona, level);
    const { nodes: flowNodes, edges: flowEdges } = toReactFlow(
      filtered.components,
      filtered.connections,
      level,
      persona
    );

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [architecture, persona, level, setNodes, setEdges]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading architecture...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap />

        <Panel position="top-left">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <p className="text-sm text-slate-600">
              Level: <span className="font-bold">{level}</span>
            </p>
            <p className="text-sm text-slate-600">
              Persona: <span className="font-bold">{persona}</span>
            </p>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
```

---

## Testing Your Implementation

### Run the Development Server

```bash
npm run dev
```

Navigate to: `http://localhost:3000/architecture-playground`

You should see:
- ✅ Canvas with nodes and edges
- ✅ React Flow controls (zoom, pan)
- ✅ Mini-map
- ✅ Level and persona indicators

---

## Phase 2: Enhanced Features (Week 3-4)

### Next Steps:

1. **Add Persona Selector** - Create dropdown component
2. **Add Level Switcher** - Create L0-L3 buttons
3. **Add Context Panel** - Display node details
4. **Implement Zoom Semantics** - Trigger level changes on zoom
5. **Add Theory/Practice Toggle** - Switch between modes
6. **Create Custom Node Components** - L0, L1, L2, L3 node types
7. **Add Animations** - Smooth transitions between levels

### Example: Persona Selector Component

```typescript
// app/architecture-playground/components/PersonaSelector.tsx

'use client';

import { PERSONA_PROFILES } from '@/lib/architecture-playground/constants';
import { usePlaygroundStore } from '@/lib/architecture-playground/store';
import { Persona } from '@/lib/architecture-playground/types';

export function PersonaSelector() {
  const { persona, setPersona } = usePlaygroundStore();
  const currentProfile = PERSONA_PROFILES[persona];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <label className="text-sm font-bold text-slate-700 mb-2 block">
        Who are you?
      </label>

      <div className="grid grid-cols-5 gap-2">
        {Object.values(PERSONA_PROFILES).map((profile) => (
          <button
            key={profile.id}
            onClick={() => setPersona(profile.id)}
            className={`p-3 rounded-lg border-2 transition text-center ${
              persona === profile.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-2xl mb-1">{profile.icon}</div>
            <div className="text-xs font-medium">{profile.name.split(' ')[0]}</div>
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-600 mt-2">
        {currentProfile.description}
      </p>
    </div>
  );
}
```

---

## Migration Strategy

### Integrating with Existing Playgrounds

Your existing playgrounds can link to the architecture playground:

```typescript
// In app/playgrounds/pattern-composer/page.tsx

import Link from 'next/link';

// Add this button somewhere in your UI
<Link
  href="/architecture-playground?preset=pattern-composer-demo"
  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
>
  Explore in Architecture Playground →
</Link>
```

### Reusing Existing Components

```typescript
// You can reuse these from your codebase:
import { TheoryLink } from '@/components/shared/TheoryLink';
import { PlaygroundLink } from '@/components/shared/PlaygroundLink';
import { ArchitectureOverlays } from '@/components/playgrounds/ArchitectureOverlays';
```

---

## Deployment Checklist

- [ ] All TypeScript types defined
- [ ] Constants file created
- [ ] Zoom controller implemented
- [ ] Persona filter working
- [ ] Data loader functional
- [ ] React Flow adapter tested
- [ ] Zustand store configured
- [ ] Basic canvas rendering
- [ ] Sample architecture loaded
- [ ] Responsive layout tested
- [ ] Accessibility features added
- [ ] Performance optimized
- [ ] Documentation updated

---

## Troubleshooting

### Issue: Nodes not rendering

**Solution:** Check that:
1. Architecture JSON is valid
2. All component IDs are unique
3. Position data is present
4. Persona/level filters aren't hiding everything

### Issue: Zoom not working

**Solution:** Verify:
1. React Flow zoom controls enabled
2. D3 zoom behavior not conflicting
3. Viewport state updating correctly

### Issue: Performance slow with large graphs

**Solution:** Implement:
1. Virtualization (only render visible nodes)
2. Debounce zoom events
3. Lazy load detail levels
4. Use React.memo for node components

---

## Resources

- [React Flow Documentation](https://reactflow.dev/)
- [D3 Zoom Documentation](https://d3js.org/d3-zoom)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Next.js App Router](https://nextjs.org/docs/app)

---

## Support

For questions or issues:
1. Check this documentation first
2. Review the TypeScript types in `lib/architecture-playground/types.ts`
3. Examine the sample data in `lib/architecture-playground/data/ecommerce-platform.json`
4. Refer to the main technical plan: `docs/INTERACTIVE-ARCHITECTURE-PLAYGROUND-PLAN.md`

---

*Implementation Guide Version: 1.0*
*Last Updated: 2026-02-15*
