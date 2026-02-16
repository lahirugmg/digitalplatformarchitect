/**
 * Pipeline Storage - Save/Load architectures to/from localStorage
 */

import { Node, Edge } from 'reactflow'

const STORAGE_KEY = 'dpa-saved-pipelines'
const MAX_SAVES = 10

export interface SavedPipeline {
  id: string
  name: string
  nodes: Node[]
  edges: Edge[]
  createdAt: string
  updatedAt: string
}

function generateId(): string {
  return `pipeline-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
}

/**
 * Get all saved pipelines from localStorage
 */
export function listPipelines(): SavedPipeline[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    const pipelines: SavedPipeline[] = JSON.parse(data)
    return pipelines.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  } catch {
    return []
  }
}

/**
 * Save a pipeline to localStorage
 */
export function savePipeline(
  name: string,
  nodes: Node[],
  edges: Edge[],
  existingId?: string
): SavedPipeline {
  const pipelines = listPipelines()
  const now = new Date().toISOString()

  // Strip runtime-only data from nodes (like running state, metrics)
  const cleanNodes = nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: {
      label: node.data?.label,
      icon: node.data?.icon,
      componentType: node.data?.componentType,
      name: node.data?.name,
    },
  })) as Node[]

  const cleanEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
  })) as Edge[]

  if (existingId) {
    // Update existing
    const idx = pipelines.findIndex((p) => p.id === existingId)
    if (idx !== -1) {
      pipelines[idx] = {
        ...pipelines[idx],
        name,
        nodes: cleanNodes,
        edges: cleanEdges,
        updatedAt: now,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pipelines))
      return pipelines[idx]
    }
  }

  // Create new
  const pipeline: SavedPipeline = {
    id: generateId(),
    name,
    nodes: cleanNodes,
    edges: cleanEdges,
    createdAt: now,
    updatedAt: now,
  }

  // Enforce max saves limit
  const updated = [pipeline, ...pipelines].slice(0, MAX_SAVES)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return pipeline
}

/**
 * Load a specific pipeline by ID
 */
export function loadPipeline(id: string): SavedPipeline | null {
  const pipelines = listPipelines()
  return pipelines.find((p) => p.id === id) || null
}

/**
 * Delete a saved pipeline
 */
export function deletePipeline(id: string): void {
  const pipelines = listPipelines().filter((p) => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pipelines))
}
