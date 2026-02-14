export interface SkillNode {
  id: string
  title: string
  description: string
  category: 'Integration' | 'Data' | 'Cloud' | 'Security' | 'Resilience' | 'Observability'
  prerequisites: string[] // IDs of required nodes
  unlocked: boolean
  completed: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  playgroundId?: string // Link to playground
  patternId?: string // Link to pattern
  estimatedTime: number // minutes
  xp: number // Experience points awarded
}

export interface SkillBranch {
  id: string
  name: string
  icon: string
  color: string
  description: string
  nodes: SkillNode[]
}

// Skill Tree Data Structure
export const skillTreeData: SkillBranch[] = [
  {
    id: 'integration',
    name: 'Integration Patterns',
    icon: '🔗',
    color: 'blue',
    description: 'Master enterprise integration patterns and messaging systems',
    nodes: [
      {
        id: 'int-001',
        title: 'Message Channel Basics',
        description: 'Learn how applications communicate through message channels',
        category: 'Integration',
        prerequisites: [],
        unlocked: true,
        completed: false,
        difficulty: 'beginner',
        patternId: 'message-channel',
        estimatedTime: 15,
        xp: 100,
      },
      {
        id: 'int-002',
        title: 'Point-to-Point Messaging',
        description: 'Understand direct message delivery between sender and receiver',
        category: 'Integration',
        prerequisites: ['int-001'],
        unlocked: false,
        completed: false,
        difficulty: 'beginner',
        patternId: 'point-to-point-channel',
        estimatedTime: 20,
        xp: 150,
      },
      {
        id: 'int-003',
        title: 'Publish-Subscribe Pattern',
        description: 'Broadcast messages to multiple interested consumers',
        category: 'Integration',
        prerequisites: ['int-001'],
        unlocked: false,
        completed: false,
        difficulty: 'beginner',
        patternId: 'publish-subscribe-channel',
        estimatedTime: 25,
        xp: 150,
      },
      {
        id: 'int-004',
        title: 'Message Router',
        description: 'Route messages dynamically based on content and rules',
        category: 'Integration',
        prerequisites: ['int-002', 'int-003'],
        unlocked: false,
        completed: false,
        difficulty: 'intermediate',
        patternId: 'content-based-router',
        estimatedTime: 30,
        xp: 200,
      },
      {
        id: 'int-005',
        title: 'Message Flow Playground',
        description: 'Build and visualize message flows between services',
        category: 'Integration',
        prerequisites: ['int-004'],
        unlocked: false,
        completed: false,
        difficulty: 'intermediate',
        playgroundId: 'message-flow',
        estimatedTime: 45,
        xp: 300,
      },
      {
        id: 'int-006',
        title: 'Message Transformation',
        description: 'Transform messages between different formats',
        category: 'Integration',
        prerequisites: ['int-005'],
        unlocked: false,
        completed: false,
        difficulty: 'advanced',
        patternId: 'message-translator',
        estimatedTime: 40,
        xp: 250,
      },
      {
        id: 'int-007',
        title: 'Enterprise Integration Mastery',
        description: 'Complex integration scenarios with transformations and routing',
        category: 'Integration',
        prerequisites: ['int-006'],
        unlocked: false,
        completed: false,
        difficulty: 'expert',
        playgroundId: 'enterprise-integration',
        estimatedTime: 60,
        xp: 500,
      },
    ],
  },
  {
    id: 'data',
    name: 'Data Architecture',
    icon: '🗄️',
    color: 'purple',
    description: 'Design scalable data pipelines and streaming architectures',
    nodes: [
      {
        id: 'data-001',
        title: 'Data Pipeline Fundamentals',
        description: 'Understanding data flow from source to destination',
        category: 'Data',
        prerequisites: [],
        unlocked: true,
        completed: false,
        difficulty: 'beginner',
        estimatedTime: 20,
        xp: 100,
      },
      {
        id: 'data-002',
        title: 'Stream Processing Basics',
        description: 'Process data in real-time as it flows',
        category: 'Data',
        prerequisites: ['data-001'],
        unlocked: false,
        completed: false,
        difficulty: 'beginner',
        estimatedTime: 30,
        xp: 150,
      },
      {
        id: 'data-003',
        title: 'Data Pipeline Playground',
        description: 'Build interactive data pipelines with validation',
        category: 'Data',
        prerequisites: ['data-002'],
        unlocked: false,
        completed: false,
        difficulty: 'intermediate',
        playgroundId: 'data-pipeline',
        estimatedTime: 50,
        xp: 300,
      },
      {
        id: 'data-004',
        title: 'Event Sourcing',
        description: 'Store state as a sequence of events',
        category: 'Data',
        prerequisites: ['data-003'],
        unlocked: false,
        completed: false,
        difficulty: 'advanced',
        patternId: 'event-driven-architecture',
        estimatedTime: 45,
        xp: 400,
      },
      {
        id: 'data-005',
        title: 'Data Mesh Architecture',
        description: 'Decentralized data ownership and architecture',
        category: 'Data',
        prerequisites: ['data-004'],
        unlocked: false,
        completed: false,
        difficulty: 'expert',
        estimatedTime: 60,
        xp: 500,
      },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud Native',
    icon: '☁️',
    color: 'cyan',
    description: 'Build cloud-native applications with containers and orchestration',
    nodes: [
      {
        id: 'cloud-001',
        title: 'Microservices Architecture',
        description: 'Break monoliths into independent services',
        category: 'Cloud',
        prerequisites: [],
        unlocked: true,
        completed: false,
        difficulty: 'beginner',
        patternId: 'microservice-architecture',
        estimatedTime: 25,
        xp: 100,
      },
      {
        id: 'cloud-002',
        title: 'API Gateway Pattern',
        description: 'Single entry point for microservices',
        category: 'Cloud',
        prerequisites: ['cloud-001'],
        unlocked: false,
        completed: false,
        difficulty: 'intermediate',
        patternId: 'api-gateway',
        estimatedTime: 30,
        xp: 200,
      },
      {
        id: 'cloud-003',
        title: 'Service Mesh',
        description: 'Infrastructure layer for service-to-service communication',
        category: 'Cloud',
        prerequisites: ['cloud-002'],
        unlocked: false,
        completed: false,
        difficulty: 'advanced',
        estimatedTime: 45,
        xp: 350,
      },
      {
        id: 'cloud-004',
        title: 'Serverless Architecture',
        description: 'Event-driven computing without server management',
        category: 'Cloud',
        prerequisites: ['cloud-001'],
        unlocked: false,
        completed: false,
        difficulty: 'intermediate',
        estimatedTime: 35,
        xp: 250,
      },
    ],
  },
  {
    id: 'security',
    name: 'Security Patterns',
    icon: '🔒',
    color: 'red',
    description: 'Implement security best practices and zero-trust architecture',
    nodes: [
      {
        id: 'sec-001',
        title: 'Authentication Basics',
        description: 'Verify user identity in distributed systems',
        category: 'Security',
        prerequisites: [],
        unlocked: true,
        completed: false,
        difficulty: 'beginner',
        estimatedTime: 20,
        xp: 100,
      },
      {
        id: 'sec-002',
        title: 'OAuth2 & OpenID Connect',
        description: 'Modern authentication and authorization protocols',
        category: 'Security',
        prerequisites: ['sec-001'],
        unlocked: false,
        completed: false,
        difficulty: 'intermediate',
        patternId: 'oauth2-pattern',
        estimatedTime: 40,
        xp: 250,
      },
      {
        id: 'sec-003',
        title: 'API Security',
        description: 'Secure APIs with rate limiting, validation, and encryption',
        category: 'Security',
        prerequisites: ['sec-002'],
        unlocked: false,
        completed: false,
        difficulty: 'intermediate',
        patternId: 'api-security-gateway',
        estimatedTime: 35,
        xp: 300,
      },
      {
        id: 'sec-004',
        title: 'Zero Trust Architecture',
        description: 'Never trust, always verify security model',
        category: 'Security',
        prerequisites: ['sec-003'],
        unlocked: false,
        completed: false,
        difficulty: 'advanced',
        patternId: 'zero-trust-architecture',
        estimatedTime: 50,
        xp: 400,
      },
    ],
  },
  {
    id: 'resilience',
    name: 'Resilience Engineering',
    icon: '🛡️',
    color: 'green',
    description: 'Build fault-tolerant systems that gracefully handle failures',
    nodes: [
      {
        id: 'res-001',
        title: 'Circuit Breaker Pattern',
        description: 'Prevent cascading failures in distributed systems',
        category: 'Resilience',
        prerequisites: [],
        unlocked: true,
        completed: false,
        difficulty: 'beginner',
        patternId: 'circuit-breaker',
        estimatedTime: 25,
        xp: 150,
      },
      {
        id: 'res-002',
        title: 'Retry & Timeout Strategies',
        description: 'Handle transient failures gracefully',
        category: 'Resilience',
        prerequisites: ['res-001'],
        unlocked: false,
        completed: false,
        difficulty: 'beginner',
        estimatedTime: 20,
        xp: 100,
      },
      {
        id: 'res-003',
        title: 'Bulkhead Pattern',
        description: 'Isolate resources to prevent total system failure',
        category: 'Resilience',
        prerequisites: ['res-001'],
        unlocked: false,
        completed: false,
        difficulty: 'intermediate',
        estimatedTime: 30,
        xp: 200,
      },
      {
        id: 'res-004',
        title: 'Chaos Engineering',
        description: 'Deliberately inject failures to test resilience',
        category: 'Resilience',
        prerequisites: ['res-002', 'res-003'],
        unlocked: false,
        completed: false,
        difficulty: 'advanced',
        estimatedTime: 45,
        xp: 400,
      },
    ],
  },
  {
    id: 'observability',
    name: 'Observability',
    icon: '📊',
    color: 'orange',
    description: 'Monitor, trace, and debug distributed systems effectively',
    nodes: [
      {
        id: 'obs-001',
        title: 'Logging Fundamentals',
        description: 'Structured logging in distributed systems',
        category: 'Observability',
        prerequisites: [],
        unlocked: true,
        completed: false,
        difficulty: 'beginner',
        estimatedTime: 15,
        xp: 100,
      },
      {
        id: 'obs-002',
        title: 'Metrics & Monitoring',
        description: 'Collect and visualize system metrics',
        category: 'Observability',
        prerequisites: ['obs-001'],
        unlocked: false,
        completed: false,
        difficulty: 'beginner',
        estimatedTime: 25,
        xp: 150,
      },
      {
        id: 'obs-003',
        title: 'Distributed Tracing',
        description: 'Track requests across microservices',
        category: 'Observability',
        prerequisites: ['obs-002'],
        unlocked: false,
        completed: false,
        difficulty: 'intermediate',
        estimatedTime: 35,
        xp: 250,
      },
      {
        id: 'obs-004',
        title: 'Observability Mastery',
        description: 'Combine logs, metrics, and traces for full visibility',
        category: 'Observability',
        prerequisites: ['obs-003'],
        unlocked: false,
        completed: false,
        difficulty: 'advanced',
        estimatedTime: 50,
        xp: 400,
      },
    ],
  },
]

// Helper functions
export function getAllNodes(): SkillNode[] {
  return skillTreeData.flatMap(branch => branch.nodes)
}

export function getNodeById(nodeId: string): SkillNode | undefined {
  return getAllNodes().find(node => node.id === nodeId)
}

export function getBranchById(branchId: string): SkillBranch | undefined {
  return skillTreeData.find(branch => branch.id === branchId)
}

export function canUnlockNode(nodeId: string, completedNodes: string[]): boolean {
  const node = getNodeById(nodeId)
  if (!node) return false

  // Check if all prerequisites are completed
  return node.prerequisites.every(prereqId => completedNodes.includes(prereqId))
}

export function getAvailableNodes(completedNodes: string[]): SkillNode[] {
  return getAllNodes().filter(node =>
    !node.unlocked &&
    !completedNodes.includes(node.id) &&
    canUnlockNode(node.id, completedNodes)
  )
}

export function calculateProgress(completedNodes: string[]): {
  totalNodes: number
  completedCount: number
  percentage: number
  xpEarned: number
} {
  const allNodes = getAllNodes()
  const totalNodes = allNodes.length
  const completedCount = completedNodes.length
  const percentage = Math.round((completedCount / totalNodes) * 100)
  const xpEarned = allNodes
    .filter(node => completedNodes.includes(node.id))
    .reduce((sum, node) => sum + node.xp, 0)

  return { totalNodes, completedCount, percentage, xpEarned }
}
