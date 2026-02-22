export type Persona = 'api-developer' | 'api-product-manager' | 'api-consumer';
export type Plane = 'control' | 'data' | 'support';
export type EdgeKind = 'control' | 'data' | 'observability' | 'security' | 'ci-cd';

export interface Feature {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  personas?: Persona[];
}

export interface NodeSpec {
  id: string;
  title: string;
  plane: Plane;
  group?: string;
  icon?: string;
  description?: string;
  features?: Feature[];
  personas?: Persona[];
  links?: { label: string; href: string }[];
  position?: { x: number; y: number };
}

export interface EdgeSpec {
  id: string;
  source: string;
  target: string;
  label?: string;
  kind: EdgeKind;
  personas?: Persona[];
  dashed?: boolean;
}

export interface FlowStep { highlightNodes: string[]; highlightEdges: string[]; narration: string }

export interface ArchSpec {
  nodes: NodeSpec[];
  edges: EdgeSpec[];
  flows: { id: string; title: string; persona: Persona; steps: FlowStep[] }[];
}

