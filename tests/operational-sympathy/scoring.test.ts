import assert from 'node:assert/strict'
import test from 'node:test'
import {
  CHECKLIST_ITEMS,
  calculateChecklistScore,
  getScoreBand,
  type ChecklistScore,
} from '@/lib/operational-sympathy'

function withUniformScore(score: number): ChecklistScore[] {
  return CHECKLIST_ITEMS.map((item) => ({ itemId: item.id, score }))
}

test('all 5 scores produce 100 and strong operational sympathy band', () => {
  const result = calculateChecklistScore(withUniformScore(5))

  assert.equal(result.percentage, 100)
  assert.equal(result.band.label, 'Strong Operational Sympathy')
})

test('all 0 scores produce 0 and high risk band', () => {
  const result = calculateChecklistScore(withUniformScore(0))

  assert.equal(result.percentage, 0)
  assert.equal(result.band.label, 'High risk')
})

test('score band boundaries match expected ranges', () => {
  assert.equal(getScoreBand(49).label, 'High risk')
  assert.equal(getScoreBand(50).label, 'Incidents likely')
  assert.equal(getScoreBand(69).label, 'Incidents likely')
  assert.equal(getScoreBand(70).label, 'Acceptable, but risks exist')
  assert.equal(getScoreBand(84).label, 'Acceptable, but risks exist')
  assert.equal(getScoreBand(85).label, 'Strong Operational Sympathy')
})

test('weighted math maps a full score in each item to its configured weight', () => {
  for (const item of CHECKLIST_ITEMS) {
    const scores = CHECKLIST_ITEMS.map((candidate) => ({
      itemId: candidate.id,
      score: candidate.id === item.id ? 5 : 0,
    }))

    const result = calculateChecklistScore(scores)
    assert.equal(result.totalScore, item.weight, `Expected ${item.id} to contribute ${item.weight}`)
  }
})

test('score clamping applies for invalid inputs', () => {
  const result = calculateChecklistScore([
    { itemId: 'production-aware', score: 6 },
    { itemId: 'load-scale', score: -1 },
  ])

  assert.equal(result.totalScore, 10)
  assert.equal(result.topRisks[0].itemId, 'load-scale')
})
