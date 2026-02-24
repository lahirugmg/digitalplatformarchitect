import {
  SECURITY_CONTROLS,
  clampSecurityScore,
  createDefaultSecurityScores,
  toSecurityScoreMap,
  type SecurityControlScore,
} from '@/lib/security-assessment'

export const SECURITY_ASSESSMENT_SESSION_VERSION = 1
export const SECURITY_ASSESSMENT_STORAGE_KEY = 'security-assessment.session.v1'

export interface SecurityAssessmentSessionV1 {
  version: typeof SECURITY_ASSESSMENT_SESSION_VERSION
  scores: Record<string, number>
  updatedAt: string
}

export function createDefaultSecurityScoreRecord(): Record<string, number> {
  return toSecurityScoreMap(createDefaultSecurityScores())
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

export function normalizeSecurityScoreRecord(value: unknown): Record<string, number> {
  const normalized = createDefaultSecurityScoreRecord()
  if (!isRecord(value)) {
    return normalized
  }

  for (const control of SECURITY_CONTROLS) {
    normalized[control.id] = clampSecurityScore(Number(value[control.id] ?? 0))
  }

  return normalized
}

export function parseSecurityAssessmentSession(raw: string): SecurityAssessmentSessionV1 | null {
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!isRecord(parsed)) {
      return null
    }

    if (parsed.version !== SECURITY_ASSESSMENT_SESSION_VERSION) {
      return null
    }

    if (typeof parsed.updatedAt !== 'string' || Number.isNaN(Date.parse(parsed.updatedAt))) {
      return null
    }

    return {
      version: SECURITY_ASSESSMENT_SESSION_VERSION,
      scores: normalizeSecurityScoreRecord(parsed.scores),
      updatedAt: parsed.updatedAt,
    }
  } catch {
    return null
  }
}

export function loadSecurityAssessmentSession(storage?: Storage | null): SecurityAssessmentSessionV1 | null {
  const activeStorage = getStorage(storage)
  if (!activeStorage) {
    return null
  }

  try {
    const raw = activeStorage.getItem(SECURITY_ASSESSMENT_STORAGE_KEY)
    if (!raw) {
      return null
    }

    return parseSecurityAssessmentSession(raw)
  } catch {
    return null
  }
}

export function saveSecurityAssessmentSession(
  scores: Record<string, number> | SecurityControlScore[],
  storage?: Storage | null,
  now: Date = new Date(),
): SecurityAssessmentSessionV1 | null {
  const activeStorage = getStorage(storage)
  if (!activeStorage) {
    return null
  }

  const normalizedScores = Array.isArray(scores)
    ? toSecurityScoreMap(scores)
    : normalizeSecurityScoreRecord(scores)

  const session: SecurityAssessmentSessionV1 = {
    version: SECURITY_ASSESSMENT_SESSION_VERSION,
    scores: normalizedScores,
    updatedAt: now.toISOString(),
  }

  try {
    activeStorage.setItem(SECURITY_ASSESSMENT_STORAGE_KEY, JSON.stringify(session))
    return session
  } catch {
    return null
  }
}

export function clearSecurityAssessmentSession(storage?: Storage | null): void {
  const activeStorage = getStorage(storage)
  if (!activeStorage) {
    return
  }

  try {
    activeStorage.removeItem(SECURITY_ASSESSMENT_STORAGE_KEY)
  } catch {
    // ignore storage cleanup failures
  }
}
