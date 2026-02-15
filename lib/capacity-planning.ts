// Capacity Planning Calculator Logic

export interface CapacityInputs {
  messageSizeKB: number
  targetTPS: number
  concurrentUsers: number
  peakMultiplier: number // e.g., 2 for 2x peak traffic
  availabilityTarget: number // e.g., 99.9
  readWriteRatio: number // 0-100, percentage of reads
}

export interface CapacityResults {
  nodeCount: number
  instanceType: string
  totalCPUCores: number
  totalMemoryGB: number
  networkBandwidthGbps: number
  annualCostUSD: number
  latencyP50Ms: number
  latencyP95Ms: number
  latencyP99Ms: number
  throughputMBps: number
  warnings: string[]
  recommendations: string[]
}

// Instance type definitions with specs and costs
interface InstanceSpec {
  name: string
  cpuCores: number
  memoryGB: number
  networkGbps: number
  monthlyCostUSD: number
  maxTPSPerInstance: number
}

const INSTANCE_TYPES: InstanceSpec[] = [
  { name: 't3.medium', cpuCores: 2, memoryGB: 4, networkGbps: 5, monthlyCostUSD: 30, maxTPSPerInstance: 500 },
  { name: 't3.large', cpuCores: 2, memoryGB: 8, networkGbps: 5, monthlyCostUSD: 60, maxTPSPerInstance: 800 },
  { name: 'c5.large', cpuCores: 2, memoryGB: 4, networkGbps: 10, monthlyCostUSD: 72, maxTPSPerInstance: 1200 },
  { name: 'c5.xlarge', cpuCores: 4, memoryGB: 8, networkGbps: 10, monthlyCostUSD: 144, maxTPSPerInstance: 2500 },
  { name: 'c5.2xlarge', cpuCores: 8, memoryGB: 16, networkGbps: 10, monthlyCostUSD: 288, maxTPSPerInstance: 5000 },
  { name: 'c5.4xlarge', cpuCores: 16, memoryGB: 32, networkGbps: 10, monthlyCostUSD: 576, maxTPSPerInstance: 10000 },
  { name: 'm5.large', cpuCores: 2, memoryGB: 8, networkGbps: 10, monthlyCostUSD: 77, maxTPSPerInstance: 1000 },
  { name: 'm5.xlarge', cpuCores: 4, memoryGB: 16, networkGbps: 10, monthlyCostUSD: 154, maxTPSPerInstance: 2000 },
  { name: 'm5.2xlarge', cpuCores: 8, memoryGB: 32, networkGbps: 10, monthlyCostUSD: 308, maxTPSPerInstance: 4000 },
]

/**
 * Calculate infrastructure capacity requirements
 */
export function calculateCapacity(inputs: CapacityInputs): CapacityResults {
  const warnings: string[] = []
  const recommendations: string[] = []

  // Calculate peak TPS accounting for burst traffic
  const peakTPS = inputs.targetTPS * inputs.peakMultiplier

  // Calculate required throughput
  const throughputMBps = (peakTPS * inputs.messageSizeKB) / 1024

  // Select instance type based on TPS requirements
  const selectedInstance = selectInstanceType(peakTPS, throughputMBps, inputs.concurrentUsers)

  // Calculate number of nodes needed
  const baseNodeCount = Math.ceil(peakTPS / selectedInstance.maxTPSPerInstance)

  // Add redundancy based on availability target
  let nodeCount = baseNodeCount
  if (inputs.availabilityTarget >= 99.99) {
    nodeCount = Math.max(baseNodeCount * 2, 3) // Active-active with at least 3 nodes
    recommendations.push('High availability (99.99%+) requires active-active setup across multiple AZs')
  } else if (inputs.availabilityTarget >= 99.9) {
    nodeCount = Math.max(baseNodeCount + 1, 2) // N+1 redundancy
    recommendations.push('For 99.9% availability, deploy across at least 2 availability zones')
  }

  // Calculate total resources
  const totalCPUCores = nodeCount * selectedInstance.cpuCores
  const totalMemoryGB = nodeCount * selectedInstance.memoryGB
  const networkBandwidthGbps = selectedInstance.networkGbps

  // Calculate costs
  const annualCostUSD = nodeCount * selectedInstance.monthlyCostUSD * 12

  // Estimate latency based on load and instance size
  const cpuUtilization = (peakTPS / (nodeCount * selectedInstance.maxTPSPerInstance)) * 100
  const baseLatency = estimateLatency(selectedInstance, cpuUtilization, inputs.messageSizeKB)

  const latencyP50Ms = Math.round(baseLatency)
  const latencyP95Ms = Math.round(baseLatency * 1.8)
  const latencyP99Ms = Math.round(baseLatency * 2.5)

  // Generate warnings
  if (cpuUtilization > 70) {
    warnings.push(`High CPU utilization (${Math.round(cpuUtilization)}%). Consider scaling up instance type or adding nodes.`)
  }

  if (throughputMBps > networkBandwidthGbps * 1000 * 0.7) {
    warnings.push('Network bandwidth may become a bottleneck at peak load. Consider instances with higher network capacity.')
  }

  if (inputs.messageSizeKB > 1024) {
    warnings.push('Large message sizes (>1MB) may require streaming or chunking strategies.')
    recommendations.push('Consider implementing message compression or splitting large payloads.')
  }

  if (inputs.peakMultiplier > 3) {
    warnings.push('High peak multiplier detected. Implement auto-scaling and rate limiting.')
    recommendations.push('Use horizontal pod autoscaling (HPA) or similar to handle burst traffic.')
  }

  if (inputs.concurrentUsers > 10000) {
    recommendations.push('High concurrency requires connection pooling and efficient session management.')
  }

  // Cost optimization recommendations
  if (annualCostUSD > 50000) {
    recommendations.push('Consider reserved instances or savings plans for 30-50% cost reduction.')
  }

  if (inputs.readWriteRatio > 80) {
    recommendations.push('High read ratio suggests caching (Redis/Memcached) could significantly reduce load.')
  }

  return {
    nodeCount,
    instanceType: selectedInstance.name,
    totalCPUCores,
    totalMemoryGB,
    networkBandwidthGbps,
    annualCostUSD,
    latencyP50Ms,
    latencyP95Ms,
    latencyP99Ms,
    throughputMBps: Math.round(throughputMBps * 10) / 10,
    warnings,
    recommendations
  }
}

/**
 * Select optimal instance type based on requirements
 */
function selectInstanceType(peakTPS: number, throughputMBps: number, concurrentUsers: number): InstanceSpec {
  // Start with smallest instance that can handle the load
  for (const instance of INSTANCE_TYPES) {
    const canHandleTPS = instance.maxTPSPerInstance >= peakTPS * 0.7 // Leave 30% headroom
    const canHandleMemory = instance.memoryGB >= Math.max(4, concurrentUsers / 1000) // Rough estimate

    if (canHandleTPS && canHandleMemory) {
      return instance
    }
  }

  // If nothing fits, return the largest
  return INSTANCE_TYPES[INSTANCE_TYPES.length - 1]
}

/**
 * Estimate latency based on instance characteristics and load
 */
function estimateLatency(instance: InstanceSpec, cpuUtilization: number, messageSizeKB: number): number {
  // Base latency starts at 5ms for small instances, 3ms for larger
  let baseLatency = instance.cpuCores >= 8 ? 3 : instance.cpuCores >= 4 ? 4 : 5

  // Add latency for CPU utilization (queueing theory)
  const utilizationPenalty = cpuUtilization > 70 ? (cpuUtilization - 70) * 0.5 : 0
  baseLatency += utilizationPenalty

  // Add latency for message size (serialization/deserialization)
  const messagePenalty = messageSizeKB > 100 ? (messageSizeKB / 100) * 2 : 0
  baseLatency += messagePenalty

  return baseLatency
}

/**
 * Get instance type options for UI
 */
export function getInstanceTypes(): InstanceSpec[] {
  return INSTANCE_TYPES
}
