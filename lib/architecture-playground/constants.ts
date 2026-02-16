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
    description: 'Executive focused on funding, ROI, and business value',
    defaultLevel: 'L0',
    preferredViews: ['flowchart', 'capability-map'],
    interests: ['roi', 'cost', 'time-to-market', 'business-value'],
    hideComplexity: true,
    icon: 'Briefcase',
    color: '#ec4899'
  },
  product: {
    id: 'product',
    name: 'Product Manager',
    description: 'Product lead focused on roadmap, features, and user value',
    defaultLevel: 'L0',
    preferredViews: ['journey-map', 'capability-map', 'flowchart'],
    interests: ['features', 'user-value', 'roadmap', 'time-to-market'],
    hideComplexity: true,
    icon: 'Map',
    color: '#f97316'
  },
  ba: {
    id: 'ba',
    name: 'Business Analyst',
    description: 'Analyst gathering requirements and bridging business-technical domains',
    defaultLevel: 'L0',
    preferredViews: ['flowchart', 'data-flow', 'journey-map'],
    interests: ['requirements', 'business-rules', 'data-flow', 'integration-points'],
    hideComplexity: true,
    icon: 'FileText',
    color: '#06b6d4'
  },
  uxdesigner: {
    id: 'uxdesigner',
    name: 'UX/UI Designer',
    description: 'Designer focused on user experience, flows, and interface design',
    defaultLevel: 'L0',
    preferredViews: ['journey-map', 'flowchart', 'api-specs'],
    interests: ['user-experience', 'user-flows', 'api-response-times', 'frontend'],
    hideComplexity: true,
    icon: 'Palette',
    color: '#a855f7'
  },
  ea: {
    id: 'ea',
    name: 'Enterprise Architect',
    description: 'Architect responsible for system design, patterns, and standards',
    defaultLevel: 'L1',
    preferredViews: ['system-landscape', 'integration-patterns'],
    interests: ['patterns', 'standards', 'governance', 'scalability'],
    hideComplexity: false,
    icon: 'Building2',
    color: '#8b5cf6'
  },
  security: {
    id: 'security',
    name: 'Security Architect',
    description: 'Security expert focused on risk, compliance, and threat mitigation',
    defaultLevel: 'L1',
    preferredViews: ['system-landscape', 'integration-patterns', 'deployment-view'],
    interests: ['security', 'compliance', 'risk', 'encryption', 'authentication'],
    hideComplexity: false,
    icon: 'Shield',
    color: '#ef4444'
  },
  data: {
    id: 'data',
    name: 'Data Architect',
    description: 'Data specialist focused on information flow, storage, and governance',
    defaultLevel: 'L1',
    preferredViews: ['data-flow', 'system-landscape', 'component-diagram'],
    interests: ['data-flow', 'storage', 'data-governance', 'analytics'],
    hideComplexity: false,
    icon: 'Database',
    color: '#14b8a6'
  },
  implementation: {
    id: 'implementation',
    name: 'Implementation Lead',
    description: 'Developer/SRE responsible for building and running systems',
    defaultLevel: 'L2',
    preferredViews: ['deployment-view', 'component-diagram', 'code-view'],
    interests: ['implementation', 'deployment', 'reliability', 'performance', 'monitoring'],
    hideComplexity: false,
    icon: 'Hammer',
    color: '#f59e0b'
  },
  qa: {
    id: 'qa',
    name: 'QA Engineer',
    description: 'Quality engineer focused on testing, stability, and quality assurance',
    defaultLevel: 'L2',
    preferredViews: ['component-diagram', 'api-specs', 'integration-patterns'],
    interests: ['quality', 'testing', 'stability', 'error-handling', 'monitoring'],
    hideComplexity: false,
    icon: 'CheckCircle',
    color: '#10b981'
  }
};

export const LEVEL_DESCRIPTIONS: Record<DetailLevel, string> = {
  L0: 'Abstract overview — major components and interactions. No product names or protocols.',
  L1: 'Introduces concrete technologies, products, and high-level integration flows.',
  L2: 'Communication patterns, microservices structure, data paths, and error handling.',
  L3: 'Deep dives — code snippets, deployment configs, CI/CD pipelines, and monitoring.'
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
