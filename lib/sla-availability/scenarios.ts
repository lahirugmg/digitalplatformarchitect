/**
 * SLA & Availability Targets - Scenario Templates
 */

import { ServiceTemplate, IncidentScenario } from './types'

export const SERVICE_TEMPLATES: ServiceTemplate[] = [
  {
    type: 'public-api',
    name: 'Public API',
    icon: '🌐',
    description: 'User-facing REST or GraphQL API with strict availability requirements',
    defaultSLIs: [
      {
        name: 'API Availability',
        type: 'availability',
        description: 'Percentage of requests that return non-5xx responses',
        threshold: 99.9,
        enabled: true,
      },
      {
        name: 'API Latency (p95)',
        type: 'latency',
        description: '95th percentile response time under 200ms',
        threshold: 200,
        enabled: true,
      },
    ],
    defaultSLO: {
      percentage: 99.9,
      period: '30d',
    },
    defaultTraffic: {
      requestsPerDay: 10_000_000,
      peakMultiplier: 3.0,
    },
  },
  {
    type: 'internal-api',
    name: 'Internal API',
    icon: '🔧',
    description: 'Backend service consumed by other internal services',
    defaultSLIs: [
      {
        name: 'Service Availability',
        type: 'availability',
        description: 'Percentage of requests that succeed',
        threshold: 99.5,
        enabled: true,
      },
      {
        name: 'Response Latency (p99)',
        type: 'latency',
        description: '99th percentile response time under 500ms',
        threshold: 500,
        enabled: true,
      },
    ],
    defaultSLO: {
      percentage: 99.5,
      period: '28d',
    },
    defaultTraffic: {
      requestsPerDay: 5_000_000,
      peakMultiplier: 2.0,
    },
  },
  {
    type: 'batch-worker',
    name: 'Batch Worker',
    icon: '⚙️',
    description: 'Asynchronous job processor with eventual consistency',
    defaultSLIs: [
      {
        name: 'Job Success Rate',
        type: 'availability',
        description: 'Percentage of jobs that complete successfully',
        threshold: 99.0,
        enabled: true,
      },
      {
        name: 'Processing Time (p95)',
        type: 'latency',
        description: '95th percentile job completion time',
        threshold: 3600000, // 1 hour in ms
        enabled: false,
      },
    ],
    defaultSLO: {
      percentage: 99.0,
      period: '30d',
    },
    defaultTraffic: {
      requestsPerDay: 1_000_000,
      peakMultiplier: 1.5,
    },
  },
  {
    type: 'streaming-service',
    name: 'Streaming Service',
    icon: '📡',
    description: 'Real-time event stream or messaging service',
    defaultSLIs: [
      {
        name: 'Message Delivery',
        type: 'availability',
        description: 'Percentage of messages delivered successfully',
        threshold: 99.95,
        enabled: true,
      },
      {
        name: 'End-to-End Latency (p99)',
        type: 'latency',
        description: '99th percentile message delivery latency',
        threshold: 1000, // 1 second
        enabled: true,
      },
    ],
    defaultSLO: {
      percentage: 99.95,
      period: '7d',
    },
    defaultTraffic: {
      requestsPerDay: 50_000_000,
      peakMultiplier: 5.0,
    },
  },
]

export const INCIDENT_SCENARIOS: IncidentScenario[] = [
  {
    id: '5xx-spike',
    type: '5xx-spike',
    name: '5xx Error Spike',
    description: 'Database connection pool exhaustion causes 5% error rate for 15 minutes',
    durationMinutes: 15,
    errorRate: 0.05, // 5% errors
    latencyMultiplier: 1.0,
  },
  {
    id: 'latency-degradation',
    type: 'latency-degradation',
    name: 'Latency Degradation',
    description: 'Downstream API slowdown increases p95 latency by 3x for 30 minutes',
    durationMinutes: 30,
    errorRate: 0.02, // 2% timeouts
    latencyMultiplier: 3.0,
  },
  {
    id: 'dependency-timeout',
    type: 'dependency-timeout',
    name: 'Dependency Timeout',
    description: 'Payment gateway becomes unavailable, causing 20% error rate for 10 minutes',
    durationMinutes: 10,
    errorRate: 0.20, // 20% errors
    latencyMultiplier: 1.5,
  },
  {
    id: 'deploy-regression',
    type: 'deploy-regression',
    name: 'Deploy Regression',
    description: 'Bad deployment introduces 1% error rate for 5 minutes before rollback',
    durationMinutes: 5,
    errorRate: 0.01, // 1% errors
    latencyMultiplier: 1.0,
  },
  {
    id: 'database-failover',
    type: 'dependency-timeout',
    name: 'Database Failover',
    description: 'Primary database fails, causing 10% errors during 3-minute failover',
    durationMinutes: 3,
    errorRate: 0.10, // 10% errors
    latencyMultiplier: 2.0,
  },
  {
    id: 'cache-stampede',
    type: 'latency-degradation',
    name: 'Cache Stampede',
    description: 'Cache invalidation causes 5x latency spike for 8 minutes',
    durationMinutes: 8,
    errorRate: 0.03, // 3% timeouts
    latencyMultiplier: 5.0,
  },
  {
    id: 'network-partition',
    type: 'dependency-timeout',
    name: 'Network Partition',
    description: 'Availability zone network issue causes 50% error rate for 2 minutes',
    durationMinutes: 2,
    errorRate: 0.50, // 50% errors
    latencyMultiplier: 1.0,
  },
  {
    id: 'memory-leak',
    type: '5xx-spike',
    name: 'Memory Leak',
    description: 'Memory leak causes gradual 8% error rate over 20 minutes until restart',
    durationMinutes: 20,
    errorRate: 0.08, // 8% errors
    latencyMultiplier: 2.5,
  },
]

export function getServiceTemplate(type: string): ServiceTemplate | undefined {
  return SERVICE_TEMPLATES.find((t) => t.type === type)
}

export function getIncidentScenario(id: string): IncidentScenario | undefined {
  return INCIDENT_SCENARIOS.find((s) => s.id === id)
}
