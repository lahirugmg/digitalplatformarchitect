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
  infrastructure: '#3b82f6',
  service: '#8b5cf6',
  data: '#10b981',
  integration: '#f59e0b',
  security: '#ef4444',
  frontend: '#06b6d4',
  platform: '#64748b'
};

export const CONNECTION_TYPE_STYLES: Record<string, { dashed: boolean; color: string; animated: boolean }> = {
  sync: { dashed: false, color: '#10b981', animated: true },
  async: { dashed: true, color: '#f59e0b', animated: true },
  'data-flow': { dashed: false, color: '#64748b', animated: false },
  dependency: { dashed: true, color: '#94a3b8', animated: false },
  deployment: { dashed: true, color: '#cbd5e1', animated: false }
};
