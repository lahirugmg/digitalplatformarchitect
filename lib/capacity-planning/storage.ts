import type {
  CapacityPlanningSession,
  CapacityScenarioInput,
  CapacityTemplateId,
} from '@/lib/capacity-planning/types'

export const CAPACITY_PLANNING_STORAGE_KEY = 'capacity-planning.session.v1'

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

function isScenarioInput(value: unknown): value is CapacityScenarioInput {
  if (!value || typeof value !== 'object') {
    return false
  }

  const record = value as Record<string, unknown>
  return (
    (record.id === 'baseline' || record.id === 'optimized') &&
    typeof record.name === 'string' &&
    typeof record.templateId === 'string' &&
    (record.providerMode === 'neutral' || record.providerMode === 'aws-equivalent') &&
    typeof record.workload === 'object' &&
    record.workload !== null
  )
}

export function parseCapacityPlanningSession(raw: string): CapacityPlanningSession | null {
  try {
    const parsed = JSON.parse(raw) as CapacityPlanningSession
    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    if (parsed.version !== 1) {
      return null
    }

    if (!isScenarioInput(parsed.baseline) || !isScenarioInput(parsed.optimized)) {
      return null
    }

    if (typeof parsed.activeTemplateId !== 'string' || typeof parsed.updatedAt !== 'string') {
      return null
    }

    return {
      version: 1,
      baseline: parsed.baseline,
      optimized: parsed.optimized,
      activeTemplateId: parsed.activeTemplateId as CapacityTemplateId,
      updatedAt: parsed.updatedAt,
    }
  } catch {
    return null
  }
}

export function loadCapacityPlanningSession(
  storage?: Pick<Storage, 'getItem'>,
): CapacityPlanningSession | null {
  const source = storage ?? (canUseStorage() ? localStorage : null)
  if (!source) {
    return null
  }

  const raw = source.getItem(CAPACITY_PLANNING_STORAGE_KEY)
  if (!raw) {
    return null
  }

  return parseCapacityPlanningSession(raw)
}

export function saveCapacityPlanningSession(
  session: Omit<CapacityPlanningSession, 'version' | 'updatedAt'>,
  storage?: Pick<Storage, 'setItem'>,
  now = new Date(),
): CapacityPlanningSession | null {
  const source = storage ?? (canUseStorage() ? localStorage : null)
  if (!source) {
    return null
  }

  const payload: CapacityPlanningSession = {
    version: 1,
    baseline: session.baseline,
    optimized: session.optimized,
    activeTemplateId: session.activeTemplateId,
    updatedAt: now.toISOString(),
  }

  source.setItem(CAPACITY_PLANNING_STORAGE_KEY, JSON.stringify(payload))
  return payload
}

export function clearCapacityPlanningSession(
  storage?: Pick<Storage, 'removeItem'>,
): void {
  const source = storage ?? (canUseStorage() ? localStorage : null)
  if (!source) {
    return
  }

  source.removeItem(CAPACITY_PLANNING_STORAGE_KEY)
}

