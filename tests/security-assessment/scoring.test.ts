import assert from 'node:assert/strict'
import test from 'node:test'
import {
  SECURITY_CONTROLS,
  calculateSecurityScore,
  getSecurityScoreBand,
  type SecurityControlScore,
} from '@/lib/security-assessment'

function withUniformScore(score: number): SecurityControlScore[] {
  return SECURITY_CONTROLS.map((control) => ({ controlId: control.id, score }))
}

test('all 5 scores produce 100 and strong security posture band', () => {
  const result = calculateSecurityScore(withUniformScore(5))

  assert.equal(result.percentage, 100)
  assert.equal(result.band.label, 'Strong Security Posture')
})

test('all 0 scores produce 0 and critical risk band', () => {
  const result = calculateSecurityScore(withUniformScore(0))

  assert.equal(result.percentage, 0)
  assert.equal(result.band.label, 'Critical risk')
})

test('score band boundaries match expected ranges', () => {
  assert.equal(getSecurityScoreBand(49).label, 'Critical risk')
  assert.equal(getSecurityScoreBand(50).label, 'Significant vulnerabilities present')
  assert.equal(getSecurityScoreBand(74).label, 'Significant vulnerabilities present')
  assert.equal(getSecurityScoreBand(75).label, 'Adequate, with known gaps')
  assert.equal(getSecurityScoreBand(89).label, 'Adequate, with known gaps')
  assert.equal(getSecurityScoreBand(90).label, 'Strong Security Posture')
})

test('weighted math maps a full score in each control to its configured weight', () => {
  for (const control of SECURITY_CONTROLS) {
    const scores = SECURITY_CONTROLS.map((candidate) => ({
      controlId: candidate.id,
      score: candidate.id === control.id ? 5 : 0,
    }))

    const result = calculateSecurityScore(scores)
    assert.equal(result.totalScore, control.weight, `Expected ${control.id} to contribute ${control.weight}`)
  }
})

test('control weights sum to 100', () => {
  const totalWeight = SECURITY_CONTROLS.reduce((sum, control) => sum + control.weight, 0)
  assert.equal(totalWeight, 100)
})

test('score clamping applies for invalid inputs', () => {
  const result = calculateSecurityScore([
    { controlId: 'identity-access', score: 6 },
    { controlId: 'data-encryption', score: -1 },
  ])

  assert.equal(result.totalScore, 15)
  assert.equal(result.topRisks[0].controlId, 'data-encryption')
})

test('top risks sorted by weighted gap descending', () => {
  const scores = withUniformScore(3)
  const result = calculateSecurityScore(scores)

  for (let i = 1; i < result.topRisks.length; i++) {
    assert.ok(
      result.topRisks[i - 1].weightedGap >= result.topRisks[i].weightedGap,
      'topRisks should be sorted by weightedGap descending',
    )
  }
})
