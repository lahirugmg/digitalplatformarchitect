import { Persona } from '../architecture-playground/types';
import { GoalId, Journey, Recommendation } from './types';

/**
 * Generate personalized journey recommendations based on role and goal
 */
export function generateJourney(role: Persona, goal: GoalId): Journey {
  const recommendations: Recommendation[] = [];
  const nextSteps: string[] = [];

  // Map role + goal combinations to specific recommendations
  const journeyMap: Record<string, { recs: Recommendation[]; steps: string[] }> = {
    // Business Stakeholder journeys
    'business-learn-patterns': {
      recs: [
        {
          type: 'pattern',
          title: 'Architecture Patterns Overview',
          description: 'High-level overview of common architecture patterns and their business impact',
          url: '/patterns',
          priority: 'primary',
          estimatedTime: '30 min',
        },
        {
          type: 'article',
          title: 'Cost vs Complexity Trade-offs',
          description: 'Understanding the financial implications of architecture decisions',
          url: '/patterns?filter=cost',
          priority: 'secondary',
        },
      ],
      steps: [
        'Review pattern catalog focusing on business value',
        'Identify patterns that align with your business goals',
        'Discuss ROI implications with your architecture team',
      ],
    },
    'business-build-roadmap': {
      recs: [
        {
          type: 'skill-tree',
          title: 'Architecture Roadmap Skills',
          description: 'Learn how to plan and prioritize architecture initiatives',
          url: '/skill-tree',
          priority: 'primary',
          estimatedTime: '45 min',
        },
        {
          type: 'building-block',
          title: 'Building Blocks Overview',
          description: 'Understand foundational architecture components',
          url: '/blocks',
          priority: 'secondary',
        },
      ],
      steps: [
        'Identify current architecture gaps and opportunities',
        'Prioritize initiatives based on business value and risk',
        'Create phased implementation plan',
        'Align with product roadmap and budget cycles',
      ],
    },

    // Product Manager journeys
    'product-learn-patterns': {
      recs: [
        {
          type: 'playground',
          title: 'Architecture Playground',
          description: 'Interactive exploration of how architecture impacts features',
          url: '/',
          priority: 'primary',
          estimatedTime: '45 min',
        },
        {
          type: 'pattern',
          title: 'Patterns by Time-to-Market',
          description: 'Patterns that accelerate or slow down feature delivery',
          url: '/patterns',
          priority: 'secondary',
        },
      ],
      steps: [
        'Explore architecture playground with product lens',
        'Understand how patterns affect feature velocity',
        'Learn to ask better questions in architecture reviews',
      ],
    },

    // Enterprise Architect journeys
    'ea-design-system': {
      recs: [
        {
          type: 'playground',
          title: 'Architecture Playground',
          description: 'Start with blank canvas and build your architecture',
          url: '/architecture-playground',
          priority: 'primary',
          estimatedTime: '2 hours',
        },
        {
          type: 'pattern',
          title: 'Design Patterns Catalog',
          description: 'Browse proven patterns for your design',
          url: '/patterns',
          priority: 'primary',
          estimatedTime: '1 hour',
        },
        {
          type: 'playground',
          title: 'Capacity Planning Calculator',
          description: 'Size your infrastructure correctly from the start',
          url: '/playgrounds/capacity-planning',
          priority: 'secondary',
          estimatedTime: '15 min',
        },
        {
          type: 'playground',
          title: 'Business Architecture',
          description: 'Start with business architecture view',
          url: '/architecture-playground/business',
          priority: 'secondary',
        },
      ],
      steps: [
        'Define business capabilities and value streams',
        'Map functional requirements to architecture components',
        'Select appropriate patterns for your constraints',
        'Design integration points and data flows',
        'Calculate capacity requirements for your workload',
        'Document decisions and trade-offs',
      ],
    },
    'ea-evaluate-architecture': {
      recs: [
        {
          type: 'building-block',
          title: 'Production Readiness Checklist',
          description: 'Comprehensive evaluation framework',
          url: '/playgrounds/operational-sympathy',
          priority: 'primary',
          estimatedTime: '2 hours',
        },
        {
          type: 'playground',
          title: 'Architecture Map',
          description: 'Visualize and analyze your current architecture',
          url: '/architecture-map',
          priority: 'secondary',
        },
      ],
      steps: [
        'Map current architecture components and dependencies',
        'Run production readiness assessment',
        'Identify scalability and reliability gaps',
        'Prioritize improvements by risk and impact',
      ],
    },

    // Implementation Lead journeys
    'implementation-hands-on-practice': {
      recs: [
        {
          type: 'playground',
          title: 'Message Flow Playground',
          description: 'Build and test messaging patterns',
          url: '/playgrounds/message-flow',
          priority: 'primary',
          estimatedTime: '1 hour',
        },
        {
          type: 'playground',
          title: 'Data Pipeline Choreography',
          description: 'Design and simulate data pipelines',
          url: '/playgrounds/data-pipeline',
          priority: 'primary',
          estimatedTime: '1.5 hours',
        },
        {
          type: 'playground',
          title: 'Capacity Planning Calculator',
          description: 'Calculate infrastructure requirements',
          url: '/playgrounds/capacity-planning',
          priority: 'secondary',
          estimatedTime: '15 min',
        },
        {
          type: 'playground',
          title: 'Enterprise Integration',
          description: 'Practice integration patterns',
          url: '/playgrounds/enterprise-integration',
          priority: 'secondary',
        },
      ],
      steps: [
        'Start with Message Flow playground',
        'Build a simple pub-sub pattern',
        'Add error handling and retry logic',
        'Test with different failure scenarios',
        'Calculate capacity needs for your expected load',
        'Move to Data Pipeline for more complex flows',
      ],
    },

    // Security Architect journeys
    'security-security-review': {
      recs: [
        {
          type: 'pattern',
          title: 'Security Patterns',
          description: 'Authentication, authorization, and encryption patterns',
          url: '/patterns?category=security',
          priority: 'primary',
          estimatedTime: '2 hours',
        },
        {
          type: 'building-block',
          title: 'Service Mesh Security',
          description: 'Zero-trust networking and service-to-service security',
          url: '/service-mesh',
          priority: 'secondary',
        },
      ],
      steps: [
        'Review security patterns catalog',
        'Map threats to your architecture',
        'Identify security gaps and vulnerabilities',
        'Prioritize security controls by risk',
        'Document security decisions and assumptions',
      ],
    },

    // Data Architect journeys
    'data-data-strategy': {
      recs: [
        {
          type: 'playground',
          title: 'Data Pipeline Choreography',
          description: 'Design data flows and transformations',
          url: '/playgrounds/data-pipeline',
          priority: 'primary',
          estimatedTime: '2 hours',
        },
        {
          type: 'pattern',
          title: 'Data Architecture Patterns',
          description: 'Storage, processing, and governance patterns',
          url: '/patterns?category=data',
          priority: 'secondary',
        },
      ],
      steps: [
        'Map data sources and consumers',
        'Design data flow and transformation pipeline',
        'Select storage patterns for different use cases',
        'Plan data governance and quality controls',
        'Document data lineage and dependencies',
      ],
    },

    // Documentation journeys
    'ea-create-documentation': {
      recs: [
        {
          type: 'playground',
          title: 'Architecture Documentation Explorer',
          description: 'Learn how to structure documentation across Business, Solution, and Deployment layers',
          url: '/playgrounds/architecture-docs',
          priority: 'primary',
          estimatedTime: '15 min',
        },
        {
          type: 'playground',
          title: 'Architecture Playground',
          description: 'Create visual architecture diagrams',
          url: '/architecture-playground',
          priority: 'secondary',
        },
      ],
      steps: [
        'Understand the C4 model (Context, Containers, Components, Code)',
        'Explore how different roles need different views',
        'Create Business Architecture view (L0-L1)',
        'Design Solution Architecture view (L1-L2)',
        'Document Deployment Architecture (L1-L2)',
        'Maintain consistency across all documentation',
      ],
    },
    'ba-create-documentation': {
      recs: [
        {
          type: 'playground',
          title: 'Architecture Documentation Explorer',
          description: 'Structure documentation for business and technical audiences',
          url: '/playgrounds/architecture-docs',
          priority: 'primary',
          estimatedTime: '15 min',
        },
      ],
      steps: [
        'Start with business architecture view',
        'Map capabilities to processes',
        'Document integrations and dependencies',
        'Keep documentation updated as architecture evolves',
      ],
    },
    'implementation-create-documentation': {
      recs: [
        {
          type: 'playground',
          title: 'Architecture Documentation Explorer',
          description: 'Create technical documentation for implementation teams',
          url: '/playgrounds/architecture-docs',
          priority: 'primary',
          estimatedTime: '15 min',
        },
      ],
      steps: [
        'Focus on Solution and Deployment architecture layers',
        'Document component interfaces and contracts',
        'Include deployment and operational details',
        'Link documentation to code repositories',
      ],
    },

    // QA Engineer journeys
    'qa-assess-readiness': {
      recs: [
        {
          type: 'building-block',
          title: 'Production Readiness',
          description: 'Comprehensive testing and quality checklist',
          url: '/playgrounds/operational-sympathy',
          priority: 'primary',
          estimatedTime: '1.5 hours',
        },
        {
          type: 'playground',
          title: 'Message Flow Testing',
          description: 'Test integration patterns and failure scenarios',
          url: '/playgrounds/message-flow',
          priority: 'secondary',
        },
      ],
      steps: [
        'Review production readiness checklist',
        'Identify testing gaps and coverage issues',
        'Create test strategy for integration points',
        'Design chaos and failure scenario tests',
        'Set up monitoring and alerting validation',
      ],
    },
  };

  // Generate key for lookup
  const key = `${role}-${goal}`;
  const journeyData = journeyMap[key];

  if (journeyData) {
    recommendations.push(...journeyData.recs);
    nextSteps.push(...journeyData.steps);
  } else {
    // Fallback recommendations if no specific journey exists
    recommendations.push(
      {
        type: 'pattern',
        title: 'Architecture Patterns',
        description: 'Explore our comprehensive pattern catalog',
        url: '/patterns',
        priority: 'primary',
      },
      {
        type: 'playground',
        title: 'Interactive Playgrounds',
        description: 'Learn by building with hands-on playgrounds',
        url: '/playgrounds',
        priority: 'secondary',
      },
      {
        type: 'skill-tree',
        title: 'Skill Tree',
        description: 'Map your architecture learning journey',
        url: '/skill-tree',
        priority: 'secondary',
      }
    );

    nextSteps.push(
      'Explore the pattern catalog',
      'Try interactive playgrounds',
      'Review building blocks and foundations',
      'Connect with the architecture community'
    );
  }

  return {
    role,
    goal,
    recommendations,
    nextSteps,
  };
}
