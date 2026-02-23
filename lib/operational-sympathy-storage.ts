import {
  CHECKLIST_ITEMS,
  clampChecklistScore,
  createDefaultChecklistScores,
  toChecklistScoreMap,
  type ChecklistScore,
} from '@/lib/operational-sympathy'

export const OPERATIONAL_SYMPATHY_SESSION_VERSION = 1
export const OPERATIONAL_SYMPATHY_STORAGE_KEY = 'operational-sympathy.session.v1'

export interface OperationalSympathySessionV1 {
  version: typeof OPERATIONAL_SYMPATHY_SESSION_VERSION
  scores: Record<string, number>
  updatedAt: string
}

export function createDefaultScoreRecord(): Record<string, number> {
  return toChecklistScoreMap(createDefaultChecklistScores())
}

function getStorage(storage?: Storage | null): Storage | null {
  if (typeof storage !== 'undefined') {
    return storage
  }

  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function normalizeScoreRecord(value: unknown): Record<string, number> {
  const normalized = createDefaultScoreRecord()
  if (!isRecord(value)) {
    return normalized
  }

  for (const item of CHECKLIST_ITEMS) {
    normalized[item.id] = clampChecklistScore(Number(value[item.id] ?? 0))
  }

  return normalized
}

export function parseOperationalSympathySession(raw: string): OperationalSympathySessionV1 | null {
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!isRecord(parsed)) {
      return null
    }

    if (parsed.version !== OPERATIONAL_SYMPATHY_SESSION_VERSION) {
      return null
    }

    if (typeof parsed.updatedAt !== 'string' || Number.isNaN(Date.parse(parsed.updatedAt))) {
      return null
    }

    return {
      version: OPERATIONAL_SYMPATHY_SESSION_VERSION,
      scores: normalizeScoreRecord(parsed.scores),
      updatedAt: parsed.updatedAt,
    }
  } catch {
    return null
  }
}

export function loadOperationalSympathySession(storage?: Storage | null): OperationalSympathySessionV1 | null {
  const activeStorage = getStorage(storage)
  if (!activeStorage) {
    return null
  }

  try {
    const raw = activeStorage.getItem(OPERATIONAL_SYMPATHY_STORAGE_KEY)
    if (!raw) {
      return null
    }

    return parseOperationalSympathySession(raw)
  } catch {
    return null
  }
}

export function saveOperationalSympathySession(
  scores: Record<string, number> | ChecklistScore[],
  storage?: Storage | null,
  now: Date = new Date(),
): OperationalSympathySessionV1 | null {
  const activeStorage = getStorage(storage)
  if (!activeStorage) {
    return null
  }

  const normalizedScores = Array.isArray(scores)
    ? toChecklistScoreMap(scores)
    : normalizeScoreRecord(scores)

  const session: OperationalSympathySessionV1 = {
    version: OPERATIONAL_SYMPATHY_SESSION_VERSION,
    scores: normalizedScores,
    updatedAt: now.toISOString(),
  }

  try {
    activeStorage.setItem(OPERATIONAL_SYMPATHY_STORAGE_KEY, JSON.stringify(session))
    return session
  } catch {
    return null
  }
}

export function clearOperationalSympathySession(storage?: Storage | null): void {
  const activeStorage = getStorage(storage)
  if (!activeStorage) {
    return
  }

  try {
    activeStorage.removeItem(OPERATIONAL_SYMPATHY_STORAGE_KEY)
  } catch {
    // ignore storage cleanup failures
  }
}
