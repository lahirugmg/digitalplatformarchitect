import { Node, Edge } from 'reactflow'
import { NodeData } from '../components/CustomNode'

export type ValidationResult = {
  isValid: boolean
  message?: string
}

// Define valid connection rules
const CONNECTION_RULES: Record<string, string[]> = {
  source: ['streaming', 'processing'],
  streaming: ['processing', 'storage', 'analytics'],
  processing: ['storage', 'analytics', 'streaming'],
  storage: ['analytics', 'processing'],
  analytics: [], // Terminal nodes
}

export function validateConnection(
  sourceNode: Node<NodeData>,
  targetNode: Node<NodeData>
): ValidationResult {
  const sourceType = sourceNode.data.type
  const targetType = targetNode.data.type

  // Check if connection type is allowed
  const allowedTargets = CONNECTION_RULES[sourceType] || []

  if (!allowedTargets.includes(targetType)) {
    return {
      isValid: false,
      message: `Cannot connect ${sourceType} directly to ${targetType}`,
    }
  }

  // Specific validation rules
  if (sourceType === 'source' && targetType === 'storage') {
    return {
      isValid: false,
      message: 'Data sources should go through streaming platform first',
    }
  }

  if (sourceType === 'storage' && targetType === 'streaming') {
    return {
      isValid: false,
      message: 'Avoid circular data flow - storage should not feed back to streaming',
    }
  }

  return { isValid: true }
}

export function validatePipeline(nodes: Node<NodeData>[], edges: Edge[]): {
  isComplete: boolean
  hasSource: boolean
  hasStreaming: boolean
  hasTransformation: boolean
  hasStorage: boolean
  hasAnalytics: boolean
  issues: string[]
} {
  const issues: string[] = []

  const hasSource = nodes.some(n => n.data.type === 'source')
  const hasStreaming = nodes.some(n => n.data.type === 'streaming')
  const hasTransformation = nodes.some(n => n.data.type === 'processing')
  const hasStorage = nodes.some(n => n.data.type === 'storage')
  const hasAnalytics = nodes.some(n => n.data.type === 'analytics')

  if (!hasSource) issues.push('Add at least one data source')
  if (!hasStreaming) issues.push('Add streaming platform (Kafka)')
  if (!hasTransformation) issues.push('Add transformation step')
  if (!hasStorage) issues.push('Add storage layer (Data Lake)')
  if (!hasAnalytics) issues.push('Add analytics endpoint')

  // Check if components are connected
  const connectedNodes = new Set<string>()
  edges.forEach(edge => {
    connectedNodes.add(edge.source)
    connectedNodes.add(edge.target)
  })

  const disconnectedNodes = nodes.filter(n => !connectedNodes.has(n.id))
  if (disconnectedNodes.length > 0) {
    issues.push(`${disconnectedNodes.length} component(s) not connected`)
  }

  // Check for data flow continuity (source -> analytics path exists)
  if (hasSource && hasAnalytics) {
    const hasPath = checkPathExists(nodes, edges, 'source', 'analytics')
    if (!hasPath) {
      issues.push('No complete path from source to analytics')
    }
  }

  const isComplete = hasSource && hasStreaming && hasTransformation && hasStorage && hasAnalytics && issues.length === 0

  return {
    isComplete,
    hasSource,
    hasStreaming,
    hasTransformation,
    hasStorage,
    hasAnalytics,
    issues,
  }
}

function checkPathExists(
  nodes: Node<NodeData>[],
  edges: Edge[],
  fromType: string,
  toType: string
): boolean {
  const sourceNodes = nodes.filter(n => n.data.type === fromType)
  const targetNodes = nodes.filter(n => n.data.type === toType)

  if (sourceNodes.length === 0 || targetNodes.length === 0) return false

  // Simple BFS to check if path exists
  const visited = new Set<string>()
  const queue = sourceNodes.map(n => n.id)

  while (queue.length > 0) {
    const current = queue.shift()!
    if (visited.has(current)) continue
    visited.add(current)

    const currentNode = nodes.find(n => n.id === current)
    if (currentNode?.data.type === toType) return true

    const outgoingEdges = edges.filter(e => e.source === current)
    outgoingEdges.forEach(e => queue.push(e.target))
  }

  return false
}

export function calculateMetrics(nodes: Node<NodeData>[], edges: Edge[]) {
  // Simulate realistic metrics based on pipeline composition
  const nodeCount = nodes.length
  const edgeCount = edges.length

  // Base throughput affected by number of processing steps
  const processingNodes = nodes.filter(n => n.data.type === 'processing' || n.data.type === 'streaming').length
  const baseThroughput = 100000 // 100K events/sec
  const throughputPenalty = Math.pow(0.8, processingNodes - 1) // Each additional step reduces by 20%
  const throughput = Math.round(baseThroughput * throughputPenalty)

  // Latency increases with pipeline depth
  const pipelineDepth = Math.max(...nodes.map(n => getNodeDepth(n.id, edges))) || 0
  const latency = 10 + (pipelineDepth * 15) // 10ms base + 15ms per hop

  // Data quality affected by transformations
  const transformationNodes = nodes.filter(n => n.data.type === 'processing').length
  const quality = Math.max(70, 100 - (transformationNodes * 5)) // Each transformation can reduce quality slightly

  // Cost estimation
  const storageCost = nodes.filter(n => n.data.type === 'storage').length * 500
  const streamingCost = nodes.filter(n => n.data.type === 'streaming').length * 800
  const analyticsCost = nodes.filter(n => n.data.type === 'analytics').length * 300
  const monthlyCost = storageCost + streamingCost + analyticsCost

  return {
    throughput,
    latency,
    quality,
    monthlyCost,
    nodeCount,
    edgeCount,
  }
}

function getNodeDepth(nodeId: string, edges: Edge[], visited = new Set<string>()): number {
  if (visited.has(nodeId)) return 0
  visited.add(nodeId)

  const incomingEdges = edges.filter(e => e.target === nodeId)
  if (incomingEdges.length === 0) return 0

  const depths = incomingEdges.map(e => getNodeDepth(e.source, edges, visited))
  return 1 + Math.max(...depths, 0)
}
