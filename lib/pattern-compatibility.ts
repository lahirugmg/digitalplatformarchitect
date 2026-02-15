/**
 * Pattern Compatibility Engine
 * Defines compatibility rules, conflicts, and synergies between architectural patterns
 */

export interface PatternNode {
  id: string
  title: string
  category: string
  description: string
  icon: string
  tags: string[]
  characteristics: {
    consistency?: 'strong' | 'eventual' | 'weak'
    coupling?: 'tight' | 'loose'
    complexity?: 'low' | 'medium' | 'high'
    scalability?: 'low' | 'medium' | 'high'
    latency?: 'low' | 'medium' | 'high'
  }
}

export type CompatibilityLevel = 'compatible' | 'synergy' | 'warning' | 'conflict'

export interface CompatibilityRule {
  pattern1: string
  pattern2: string
  level: CompatibilityLevel
  reason: string
  recommendation?: string
}

export interface CompositionValidation {
  isValid: boolean
  conflicts: CompatibilityRule[]
  warnings: CompatibilityRule[]
  synergies: CompatibilityRule[]
  recommendations: string[]
}

/**
 * Core architectural patterns for the composer
 */
export const architecturalPatterns: PatternNode[] = [
  // Event-Driven Patterns
  {
    id: 'event-sourcing',
    title: 'Event Sourcing',
    category: 'Event-Driven',
    description: 'Store all changes as a sequence of events',
    icon: '📜',
    tags: ['data', 'audit', 'temporal'],
    characteristics: {
      consistency: 'eventual',
      coupling: 'loose',
      complexity: 'high',
      scalability: 'high',
    }
  },
  {
    id: 'cqrs',
    title: 'CQRS',
    category: 'Event-Driven',
    description: 'Separate read and write models',
    icon: '🔀',
    tags: ['data', 'performance', 'scalability'],
    characteristics: {
      consistency: 'eventual',
      coupling: 'loose',
      complexity: 'medium',
      scalability: 'high',
    }
  },
  {
    id: 'saga',
    title: 'Saga Pattern',
    category: 'Event-Driven',
    description: 'Distributed transaction management',
    icon: '🔄',
    tags: ['transactions', 'orchestration'],
    characteristics: {
      consistency: 'eventual',
      coupling: 'loose',
      complexity: 'high',
      scalability: 'medium',
    }
  },
  {
    id: 'event-notification',
    title: 'Event Notification',
    category: 'Event-Driven',
    description: 'Notify interested parties of state changes',
    icon: '📢',
    tags: ['decoupling', 'reactive'],
    characteristics: {
      coupling: 'loose',
      complexity: 'low',
      scalability: 'high',
    }
  },

  // Integration Patterns
  {
    id: 'api-gateway',
    title: 'API Gateway',
    category: 'Integration',
    description: 'Single entry point for client requests',
    icon: '🚪',
    tags: ['routing', 'security', 'aggregation'],
    characteristics: {
      coupling: 'loose',
      complexity: 'medium',
      scalability: 'medium',
      latency: 'low',
    }
  },
  {
    id: 'message-router',
    title: 'Message Router',
    category: 'Integration',
    description: 'Route messages based on content',
    icon: '🔀',
    tags: ['routing', 'filtering'],
    characteristics: {
      coupling: 'loose',
      complexity: 'medium',
      scalability: 'high',
    }
  },
  {
    id: 'aggregator',
    title: 'Aggregator',
    category: 'Integration',
    description: 'Combine multiple messages into one',
    icon: '🎯',
    tags: ['transformation', 'batching'],
    characteristics: {
      coupling: 'loose',
      complexity: 'medium',
      latency: 'medium',
    }
  },
  {
    id: 'content-enricher',
    title: 'Content Enricher',
    category: 'Integration',
    description: 'Add missing data to messages',
    icon: '➕',
    tags: ['transformation', 'enhancement'],
    characteristics: {
      coupling: 'loose',
      complexity: 'low',
      latency: 'medium',
    }
  },

  // Data Patterns
  {
    id: 'data-mesh',
    title: 'Data Mesh',
    category: 'Data Architecture',
    description: 'Decentralized domain-oriented data ownership',
    icon: '🕸️',
    tags: ['governance', 'decentralization'],
    characteristics: {
      coupling: 'loose',
      complexity: 'high',
      scalability: 'high',
    }
  },
  {
    id: 'data-lake',
    title: 'Data Lake',
    category: 'Data Architecture',
    description: 'Centralized repository for raw data',
    icon: '🏞️',
    tags: ['storage', 'analytics'],
    characteristics: {
      consistency: 'eventual',
      complexity: 'medium',
      scalability: 'high',
    }
  },
  {
    id: 'cdc',
    title: 'Change Data Capture',
    category: 'Data Architecture',
    description: 'Track and propagate database changes',
    icon: '📸',
    tags: ['replication', 'streaming'],
    characteristics: {
      consistency: 'eventual',
      coupling: 'loose',
      complexity: 'medium',
      latency: 'low',
    }
  },

  // Structural Patterns
  {
    id: 'microservices',
    title: 'Microservices',
    category: 'Structural',
    description: 'Independent deployable services',
    icon: '🧩',
    tags: ['architecture', 'scalability'],
    characteristics: {
      coupling: 'loose',
      complexity: 'high',
      scalability: 'high',
    }
  },
  {
    id: 'layered',
    title: 'Layered Architecture',
    category: 'Structural',
    description: 'Organize code into horizontal layers',
    icon: '🎂',
    tags: ['architecture', 'separation'],
    characteristics: {
      coupling: 'tight',
      complexity: 'low',
      scalability: 'low',
    }
  },
  {
    id: 'hexagonal',
    title: 'Hexagonal Architecture',
    category: 'Structural',
    description: 'Ports and adapters for external dependencies',
    icon: '⬡',
    tags: ['architecture', 'testability'],
    characteristics: {
      coupling: 'loose',
      complexity: 'medium',
      scalability: 'medium',
    }
  },

  // Resilience Patterns
  {
    id: 'circuit-breaker',
    title: 'Circuit Breaker',
    category: 'Resilience',
    description: 'Prevent cascading failures',
    icon: '⚡',
    tags: ['reliability', 'fault-tolerance'],
    characteristics: {
      complexity: 'low',
      scalability: 'high',
    }
  },
  {
    id: 'bulkhead',
    title: 'Bulkhead',
    category: 'Resilience',
    description: 'Isolate resources to prevent total failure',
    icon: '🚢',
    tags: ['isolation', 'fault-tolerance'],
    characteristics: {
      complexity: 'medium',
      scalability: 'high',
    }
  },
  {
    id: 'retry',
    title: 'Retry Pattern',
    category: 'Resilience',
    description: 'Automatically retry failed operations',
    icon: '🔁',
    tags: ['reliability', 'transient-faults'],
    characteristics: {
      complexity: 'low',
      latency: 'medium',
    }
  },

  // Security Patterns
  {
    id: 'zero-trust',
    title: 'Zero Trust',
    category: 'Security',
    description: 'Never trust, always verify',
    icon: '🔒',
    tags: ['security', 'verification'],
    characteristics: {
      complexity: 'high',
      latency: 'medium',
    }
  },
  {
    id: 'oauth2',
    title: 'OAuth 2.0',
    category: 'Security',
    description: 'Delegated authorization framework',
    icon: '🔑',
    tags: ['authorization', 'tokens'],
    characteristics: {
      complexity: 'medium',
      latency: 'low',
    }
  },
]

/**
 * Compatibility rules between patterns
 */
export const compatibilityRules: CompatibilityRule[] = [
  // SYNERGIES - Patterns that work exceptionally well together
  {
    pattern1: 'event-sourcing',
    pattern2: 'cqrs',
    level: 'synergy',
    reason: 'Event Sourcing provides perfect audit trail for CQRS command side',
    recommendation: 'Use Event Sourcing for writes, CQRS for optimized reads'
  },
  {
    pattern1: 'saga',
    pattern2: 'event-sourcing',
    level: 'synergy',
    reason: 'Saga state transitions can be tracked as events',
    recommendation: 'Store saga state as events for full auditability'
  },
  {
    pattern1: 'microservices',
    pattern2: 'api-gateway',
    level: 'synergy',
    reason: 'API Gateway manages microservices routing and cross-cutting concerns',
    recommendation: 'Use API Gateway as single entry point for microservices'
  },
  {
    pattern1: 'microservices',
    pattern2: 'circuit-breaker',
    level: 'synergy',
    reason: 'Circuit Breaker prevents cascading failures in microservices',
    recommendation: 'Apply Circuit Breaker to all inter-service calls'
  },
  {
    pattern1: 'data-mesh',
    pattern2: 'event-sourcing',
    level: 'synergy',
    reason: 'Event Sourcing enables domain ownership of data in Data Mesh',
    recommendation: 'Each domain publishes events as data products'
  },
  {
    pattern1: 'cdc',
    pattern2: 'event-notification',
    level: 'synergy',
    reason: 'CDC captures database changes as events for notification',
    recommendation: 'Use CDC to publish database changes as domain events'
  },
  {
    pattern1: 'hexagonal',
    pattern2: 'microservices',
    level: 'synergy',
    reason: 'Hexagonal architecture provides clean boundaries within microservices',
    recommendation: 'Use hexagonal architecture within each microservice'
  },
  {
    pattern1: 'zero-trust',
    pattern2: 'api-gateway',
    level: 'synergy',
    reason: 'API Gateway enforces zero-trust security policies',
    recommendation: 'Implement zero-trust verification at API Gateway'
  },
  {
    pattern1: 'bulkhead',
    pattern2: 'circuit-breaker',
    level: 'synergy',
    reason: 'Bulkhead isolates failures, Circuit Breaker prevents cascading',
    recommendation: 'Use together for defense in depth'
  },

  // CONFLICTS - Patterns that contradict each other
  {
    pattern1: 'event-sourcing',
    pattern2: 'layered',
    level: 'conflict',
    reason: 'Event Sourcing requires event-first thinking, Layered promotes data-centric CRUD',
    recommendation: 'Choose event-driven or traditional layered, mixing causes confusion'
  },
  {
    pattern1: 'microservices',
    pattern2: 'layered',
    level: 'conflict',
    reason: 'Microservices favor vertical slicing, Layered uses horizontal layers',
    recommendation: 'Microservices work better with hexagonal or clean architecture'
  },
  {
    pattern1: 'data-mesh',
    pattern2: 'data-lake',
    level: 'warning',
    reason: 'Data Mesh decentralizes, Data Lake centralizes - philosophical tension',
    recommendation: 'Data Lake can exist within Data Mesh as domain-specific storage'
  },

  // WARNINGS - Patterns that can work together but need careful consideration
  {
    pattern1: 'cqrs',
    pattern2: 'microservices',
    level: 'warning',
    reason: 'CQRS adds complexity; consider if read/write separation is worth it per service',
    recommendation: 'Only apply CQRS to services with distinct read/write patterns'
  },
  {
    pattern1: 'saga',
    pattern2: 'microservices',
    level: 'warning',
    reason: 'Saga orchestration can become complex across many microservices',
    recommendation: 'Consider choreography-based sagas or keep transaction boundaries small'
  },
  {
    pattern1: 'retry',
    pattern2: 'circuit-breaker',
    level: 'warning',
    reason: 'Retry can interfere with Circuit Breaker trip detection',
    recommendation: 'Configure retry limits before circuit breaker threshold'
  },
  {
    pattern1: 'oauth2',
    pattern2: 'zero-trust',
    level: 'compatible',
    reason: 'OAuth 2.0 handles authorization, Zero Trust verifies every request',
    recommendation: 'Use OAuth 2.0 tokens with Zero Trust verification at each service'
  },
]

/**
 * Check compatibility between two patterns
 */
export function checkCompatibility(pattern1Id: string, pattern2Id: string): CompatibilityRule | null {
  const rule = compatibilityRules.find(
    rule =>
      (rule.pattern1 === pattern1Id && rule.pattern2 === pattern2Id) ||
      (rule.pattern1 === pattern2Id && rule.pattern2 === pattern1Id)
  )
  return rule || null
}

/**
 * Validate a composition of patterns
 */
export function validateComposition(patternIds: string[]): CompositionValidation {
  const conflicts: CompatibilityRule[] = []
  const warnings: CompatibilityRule[] = []
  const synergies: CompatibilityRule[] = []
  const recommendations: string[] = []

  // Check all pairs of patterns
  for (let i = 0; i < patternIds.length; i++) {
    for (let j = i + 1; j < patternIds.length; j++) {
      const rule = checkCompatibility(patternIds[i], patternIds[j])
      if (rule) {
        switch (rule.level) {
          case 'conflict':
            conflicts.push(rule)
            break
          case 'warning':
            warnings.push(rule)
            break
          case 'synergy':
            synergies.push(rule)
            break
        }
      }
    }
  }

  // Generate recommendations based on patterns
  const patterns = patternIds.map(id => architecturalPatterns.find(p => p.id === id)).filter(Boolean) as PatternNode[]

  // Check for consistency model mismatches
  const consistencyModels = patterns
    .map(p => p.characteristics.consistency)
    .filter(Boolean)
  const hasStrongConsistency = consistencyModels.includes('strong')
  const hasEventualConsistency = consistencyModels.includes('eventual')

  if (hasStrongConsistency && hasEventualConsistency) {
    recommendations.push('⚠️ Mix of strong and eventual consistency - define clear boundaries')
  }

  // Check for coupling patterns
  const hasTightCoupling = patterns.some(p => p.characteristics.coupling === 'tight')
  const hasLooseCoupling = patterns.some(p => p.characteristics.coupling === 'loose')

  if (hasTightCoupling && hasLooseCoupling) {
    recommendations.push('💡 Consider how tightly and loosely coupled components interact')
  }

  // Suggest missing resilience patterns
  const hasDistributed = patterns.some(p => ['microservices', 'data-mesh', 'cqrs'].includes(p.id))
  const hasResilience = patterns.some(p => p.category === 'Resilience')

  if (hasDistributed && !hasResilience) {
    recommendations.push('🛡️ Distributed systems detected - consider adding resilience patterns (Circuit Breaker, Bulkhead)')
  }

  // Suggest API Gateway for microservices
  const hasMicroservices = patterns.some(p => p.id === 'microservices')
  const hasGateway = patterns.some(p => p.id === 'api-gateway')

  if (hasMicroservices && !hasGateway) {
    recommendations.push('🚪 Microservices detected - consider API Gateway for routing and security')
  }

  // Suggest security patterns
  const hasSecurity = patterns.some(p => p.category === 'Security')

  if (patterns.length > 2 && !hasSecurity) {
    recommendations.push('🔒 Consider adding security patterns (Zero Trust, OAuth 2.0)')
  }

  return {
    isValid: conflicts.length === 0,
    conflicts,
    warnings,
    synergies,
    recommendations
  }
}

/**
 * Get pattern by ID
 */
export function getPatternById(id: string): PatternNode | undefined {
  return architecturalPatterns.find(p => p.id === id)
}

/**
 * Get patterns by category
 */
export function getPatternsByCategory(category: string): PatternNode[] {
  return architecturalPatterns.filter(p => p.category === category)
}

/**
 * Get all pattern categories
 */
export function getPatternCategories(): string[] {
  const categories = new Set(architecturalPatterns.map(p => p.category))
  return Array.from(categories).sort()
}
