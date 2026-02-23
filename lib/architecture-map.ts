// Architecture Navigation Map Data and Logic

export type Persona = 'business' | 'architect' | 'engineer'
export type DetailLevel = 'L0' | 'L1' | 'L2' | 'L3'

export interface ArchitectureNode {
  id: string
  title: string
  description: string
  level: DetailLevel
  personas: Persona[]
  category: 'solution' | 'deployment' | 'data' | 'security' | 'integration'
  children?: ArchitectureNode[]
  docLink?: string
  diagramLink?: string
}

export const ARCHITECTURE_TREE: ArchitectureNode = {
  id: 'root',
  title: 'Enterprise Architecture',
  description: 'Complete architectural documentation organized by detail level and persona',
  level: 'L0',
  personas: ['business', 'architect', 'engineer'],
  category: 'solution',
  children: [
    {
      id: 'solution-architecture',
      title: 'Solution Architecture',
      description: 'Business capabilities and logical architecture',
      level: 'L0',
      personas: ['business', 'architect', 'engineer'],
      category: 'solution',
      docLink: '/solution',
      children: [
        {
          id: 'business-capabilities',
          title: 'Business Capabilities',
          description: 'High-level business functions and value streams',
          level: 'L1',
          personas: ['business', 'architect'],
          category: 'solution',
          children: [
            {
              id: 'customer-facing',
              title: 'Customer-Facing Capabilities',
              description: 'User registration, authentication, transactions',
              level: 'L2',
              personas: ['business', 'architect', 'engineer'],
              category: 'solution'
            },
            {
              id: 'operational',
              title: 'Operational Capabilities',
              description: 'Monitoring, analytics, reporting, compliance',
              level: 'L2',
              personas: ['architect', 'engineer'],
              category: 'solution'
            }
          ]
        },
        {
          id: 'logical-components',
          title: 'Logical Components',
          description: 'System building blocks and their relationships',
          level: 'L1',
          personas: ['architect', 'engineer'],
          category: 'solution',
          children: [
            {
              id: 'application-services',
              title: 'Application Services',
              description: 'Microservices, APIs, business logic layers',
              level: 'L2',
              personas: ['architect', 'engineer'],
              category: 'solution',
              docLink: '/blocks'
            },
            {
              id: 'data-services',
              title: 'Data Services',
              description: 'Databases, caches, data pipelines, ETL',
              level: 'L2',
              personas: ['architect', 'engineer'],
              category: 'data',
              docLink: '/playgrounds/data-pipeline'
            },
            {
              id: 'integration-layer',
              title: 'Integration Layer',
              description: 'Message brokers, event streams, API gateways',
              level: 'L2',
              personas: ['architect', 'engineer'],
              category: 'integration',
              docLink: '/patterns'
            }
          ]
        }
      ]
    },
    {
      id: 'deployment-architecture',
      title: 'Deployment Architecture',
      description: 'Infrastructure, hosting, and runtime environments',
      level: 'L0',
      personas: ['architect', 'engineer'],
      category: 'deployment',
      children: [
        {
          id: 'infrastructure',
          title: 'Infrastructure Architecture',
          description: 'Cloud resources, networking, compute, storage',
          level: 'L1',
          personas: ['architect', 'engineer'],
          category: 'deployment',
          children: [
            {
              id: 'compute',
              title: 'Compute Resources',
              description: 'Kubernetes clusters, VMs, serverless functions',
              level: 'L2',
              personas: ['engineer'],
              category: 'deployment',
              children: [
                {
                  id: 'k8s-cluster',
                  title: 'Kubernetes Cluster Configuration',
                  description: 'Node pools, pod specs, HPA, resource limits',
                  level: 'L3',
                  personas: ['engineer'],
                  category: 'deployment'
                }
              ]
            },
            {
              id: 'networking',
              title: 'Network Architecture',
              description: 'VPCs, subnets, load balancers, service mesh',
              level: 'L2',
              personas: ['engineer'],
              category: 'deployment',
              children: [
                {
                  id: 'service-mesh',
                  title: 'Service Mesh Configuration',
                  description: 'Istio/Linkerd setup, mTLS, traffic policies',
                  level: 'L3',
                  personas: ['engineer'],
                  category: 'deployment'
                }
              ]
            },
            {
              id: 'storage',
              title: 'Storage Architecture',
              description: 'Block storage, object storage, persistent volumes',
              level: 'L2',
              personas: ['engineer'],
              category: 'deployment'
            }
          ]
        },
        {
          id: 'observability',
          title: 'Observability Stack',
          description: 'Monitoring, logging, tracing, alerting',
          level: 'L1',
          personas: ['architect', 'engineer'],
          category: 'deployment',
          docLink: '/playgrounds/operational-sympathy',
          children: [
            {
              id: 'metrics',
              title: 'Metrics Collection',
              description: 'Prometheus, Grafana, custom dashboards',
              level: 'L2',
              personas: ['engineer'],
              category: 'deployment'
            },
            {
              id: 'distributed-tracing',
              title: 'Distributed Tracing',
              description: 'Jaeger, OpenTelemetry, trace context',
              level: 'L2',
              personas: ['engineer'],
              category: 'deployment'
            }
          ]
        }
      ]
    },
    {
      id: 'security-architecture',
      title: 'Security Architecture',
      description: 'Authentication, authorization, encryption, compliance',
      level: 'L0',
      personas: ['architect', 'engineer'],
      category: 'security',
      children: [
        {
          id: 'identity-access',
          title: 'Identity & Access Management',
          description: 'OAuth2, OIDC, RBAC, service accounts',
          level: 'L1',
          personas: ['architect', 'engineer'],
          category: 'security'
        },
        {
          id: 'data-protection',
          title: 'Data Protection',
          description: 'Encryption at rest/transit, key management, PII handling',
          level: 'L1',
          personas: ['architect', 'engineer'],
          category: 'security'
        },
        {
          id: 'network-security',
          title: 'Network Security',
          description: 'Firewalls, security groups, zero-trust networking',
          level: 'L1',
          personas: ['engineer'],
          category: 'security'
        }
      ]
    }
  ]
}

/**
 * Filter nodes by persona and detail level
 */
export function filterNodes(
  node: ArchitectureNode,
  personas: Persona[],
  maxLevel: DetailLevel
): ArchitectureNode | null {
  // Check if node matches persona filter
  const matchesPersona = personas.length === 0 || node.personas.some(p => personas.includes(p))

  // Check if node matches level filter
  const levelOrder: DetailLevel[] = ['L0', 'L1', 'L2', 'L3']
  const nodeLevel = levelOrder.indexOf(node.level)
  const maxLevelIndex = levelOrder.indexOf(maxLevel)
  const matchesLevel = nodeLevel <= maxLevelIndex

  if (!matchesPersona || !matchesLevel) {
    return null
  }

  // Recursively filter children
  const filteredChildren = node.children
    ?.map(child => filterNodes(child, personas, maxLevel))
    .filter((child): child is ArchitectureNode => child !== null)

  return {
    ...node,
    children: filteredChildren && filteredChildren.length > 0 ? filteredChildren : undefined
  }
}

/**
 * Count total nodes in tree
 */
export function countNodes(node: ArchitectureNode): number {
  let count = 1
  if (node.children) {
    count += node.children.reduce((sum, child) => sum + countNodes(child), 0)
  }
  return count
}

/**
 * Get all nodes as a flat list
 */
export function flattenNodes(node: ArchitectureNode): ArchitectureNode[] {
  const nodes: ArchitectureNode[] = [node]
  if (node.children) {
    node.children.forEach(child => {
      nodes.push(...flattenNodes(child))
    })
  }
  return nodes
}

/**
 * Get category color
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    solution: 'blue',
    deployment: 'purple',
    data: 'green',
    security: 'red',
    integration: 'orange'
  }
  return colors[category] || 'slate'
}
