# FEAT-010: Operational sympathy checklist and scoring engine

**Status:** Proposed
**Priority:** High
**Category:** Interactive Tooling
**Effort:** Small
**Created:** 2026-02-14

## Description

Implement the checklist UI and scoring model for operational sympathy. Users score each element 0-5, see weighted totals, and get a clear interpretation.

## Checklist Data (weights and guidance)

| Element | Weight | Guidance |
|---|---:|---|
| Production-Aware Design | 10 | Is production environment, deployment, rollback, and runtime behavior clearly understood and designed for? |
| Load and Scale Consciousness | 15 | Does the design explicitly handle peak load, burst traffic, limits, and back-pressure? |
| Failure-Aware Architecture | 15 | Are failure modes identified and handled with graceful degradation instead of catastrophic failure? |
| Built-In Observability | 15 | Are meaningful metrics, logs, traces, and actionable alerts designed into the system? |
| Operability and Recovery | 15 | Can operators mitigate, rollback, and recover quickly without code changes? |
| Security as a Runtime Concern | 10 | Are security failures detectable, credentials rotatable, and blast radius controlled at runtime? |
| Cost Awareness by Design | 10 | Is cost behavior under scale understood, bounded, and monitored? |
| Runbook-Driven Thinking | 5 | Are known failure scenarios documented with clear diagnosis and remediation steps? |
| Shared Ownership of Outcomes | 5 | Do architects and developers share accountability for production incidents and outcomes? |

## Proposed UI

- Checklist grid with 9 rows, each showing:
  - Element name
  - Weight
  - Guidance tooltip
  - Score input (0-5)
  - Weighted score
- Live summary card with total score and interpretation
- Reset button to clear all inputs

## Scoring Logic

$$
\text{Weighted Score} = \text{Weight} \times \text{Score}
$$

- Total score is the sum of weighted scores
- Total range: 0-100

## Acceptance Criteria

- Each checklist item accepts a score from 0 to 5
- Weighted score updates on change
- Total score updates live
- Interpretation text matches the score bands
- Reset restores all scores to zero

## Files to Create/Modify

- components/operational-sympathy/Checklist.tsx
- components/operational-sympathy/ScoreSummary.tsx
- lib/operational-sympathy.ts (data + scoring helpers)

## Estimated Effort

- Small (6-10 hours)

## Related Issues

- Enables FEAT-009
