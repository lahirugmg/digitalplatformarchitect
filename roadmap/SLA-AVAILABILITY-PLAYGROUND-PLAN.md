# SLA & Availability Targets Playground Plan

Date: February 22, 2026
Status: Planning only (no implementation changes)
Related step: `sla-design` in `lib/production-readiness.ts`

## 1) Card Definition (Target Experience)

- Icon: `🎯`
- Title: `SLA & Availability Targets`
- Description: `Define SLOs, SLIs, and error budgets for your services`
- Duration: `15 min`
- Category: `operations`
- Status: `Not Started`
- CTA 1: `📚 Learn Theory`
- CTA 2: `🎮 Start Assessment`

## 2) Goal

Build an interactive playground where users can define availability and reliability targets, calculate error budgets, and assess whether their service design can meet those targets under real incident conditions.

## 3) Why This Playground

This fills an explicit gap in the Production Readiness flow:

- Route is referenced but not implemented: `/playgrounds/production-readiness/sla-calculator`
- Theory route is referenced but not implemented: `/articles/sla-design`
- The readiness program already promises SLA planning, but users currently cannot run the assessment end-to-end.

## 4) System Design Interview Concepts To Embed

| Concept | How it appears in playground |
| --- | --- |
| Clarify requirements first | Force explicit input for latency, availability, traffic profile, and user-facing critical paths |
| Back-of-the-envelope estimation | Instant downtime budget and error budget calculations |
| Trade-offs | Compare strict vs practical SLO targets with cost/complexity impact |
| Reliability planning | Multi-window burn-rate checks and alert policy suggestions |
| Operability | SLI/SLO dashboard preview and incident-response guidance |

## 5) User Flow (15-minute session)

1. Choose service profile (API, async worker, event stream, internal platform).
2. Select critical user journeys and define SLIs.
3. Set SLO target (e.g., 99.9%) and measurement window.
4. See allowed downtime and error budget in real-time.
5. Run incident simulation (latency spike, dependency outage, deploy regression).
6. Review burn-rate risk and recommended alert thresholds.
7. Export assessment summary and recommended SLO policy.

## 6) Functional Scope (MVP)

| ID | Feature | Description | Priority |
| --- | --- | --- | --- |
| FR-1 | SLI Definition Panel | Define availability and latency indicators by endpoint/journey | Must |
| FR-2 | SLO Target Builder | Choose target % and period (7d/28d/30d) | Must |
| FR-3 | Error Budget Calculator | Calculate budget in requests and downtime minutes | Must |
| FR-4 | Burn-Rate Simulator | Show budget consumption under selected incident scenarios | Must |
| FR-5 | Alert Policy Recommendations | Suggest warning/critical thresholds by burn-rate | Should |
| FR-6 | Assessment Score | Output readiness score and action list | Should |
| FR-7 | Export Report | Download markdown summary for review boards | Should |

## 7) Non-Functional Requirements

| Area | Target |
| --- | --- |
| Performance | Recalculation response under 100ms for interactive input changes |
| Accessibility | Full keyboard use, proper labels, focus states, and readable contrast |
| Reliability | No data loss during session; autosave to local storage for MVP |
| Explainability | Every metric includes “how calculated” explanation |
| Security | No external API calls in MVP; client-side only calculations |

## 8) Core Formulas (MVP Calculation Engine)

| Metric | Formula |
| --- | --- |
| Error budget ratio | `1 - SLO` |
| Error budget (requests) | `total_requests * (1 - SLO)` |
| Observed error ratio | `failed_requests / total_requests` |
| Burn rate | `observed_error_ratio / (1 - SLO)` |
| Allowed downtime | `period_minutes * (1 - SLO)` |

Reference downtime examples for 30 days (43,200 minutes):

| SLO | Allowed downtime |
| --- | --- |
| 99% | 432 min (7h 12m) |
| 99.9% | 43.2 min |
| 99.95% | 21.6 min |
| 99.99% | 4.32 min |

## 9) UX Layout Plan

| Panel | Purpose |
| --- | --- |
| Left panel | Inputs: service type, traffic volume, SLI definitions, SLO target |
| Center panel | Live charts: budget remaining, burn-rate over time, incident impact |
| Right panel | Decisions: recommended alerts, risk level, required mitigations |

Supporting UI behaviors:

1. Starter templates (`Public API`, `Internal API`, `Batch Worker`, `Streaming Service`).
2. Preset incidents (`5xx spike`, `latency degradation`, `dependency timeout`).
3. “Explain this metric” help popovers in plain language.
4. One-click reset and one-click export.

## 10) File/Component Plan

| Type | Planned path |
| --- | --- |
| Route page | `app/playgrounds/production-readiness/sla-calculator/page.tsx` |
| Main component | `components/sla-availability/SLAAvailabilityPlayground.tsx` |
| Inputs panel | `components/sla-availability/SLOInputPanel.tsx` |
| Budget panel | `components/sla-availability/ErrorBudgetPanel.tsx` |
| Simulator panel | `components/sla-availability/BurnRateSimulator.tsx` |
| Results panel | `components/sla-availability/AssessmentSummary.tsx` |
| Types | `lib/sla-availability/types.ts` |
| Math engine | `lib/sla-availability/calculations.ts` |
| Scenario templates | `lib/sla-availability/scenarios.ts` |
| Theory article | `content-export/articles/sla-design.md` |

## 11) Story Breakdown

| Story | Description | Acceptance criteria |
| --- | --- | --- |
| S1 | Create route and playground shell | Route loads with layout and default template |
| S2 | Build SLI/SLO input model | User can define at least availability + latency SLIs and save session |
| S3 | Implement budget calculations | Inputs update downtime and error budget values correctly |
| S4 | Build incident simulator | User can run at least 3 incident presets and see burn-rate impact |
| S5 | Add recommendations engine | User gets warning/critical recommendations from burn-rate results |
| S6 | Add export + readiness integration | User can export report and step can be marked completed in hub |
| S7 | Add theory path | `Learn Theory` opens `/articles/sla-design` with SLI/SLO explanations |

## 12) Definition of Done

1. Playground route is accessible from Production Readiness workflow.
2. 15-minute guided flow is completable without docs.
3. Calculations are validated against test vectors.
4. Accessibility checks pass for keyboard and semantic landmarks.
5. Export output includes SLIs, SLOs, budget, incidents, and recommendations.

## 13) Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| SLI/SLO confusion | Users set incorrect goals | Add inline definitions and examples before input |
| Overly complex first version | Lower completion rate | Keep MVP to 2 core SLIs and 3 preset incidents |
| Wrong math assumptions | Trust loss | Add deterministic test fixtures for all formulas |
| No historical data in MVP | Limited realism | Use scenario presets + clearly mark synthetic simulation |

## 14) Suggested Metrics After Release

| KPI | Target |
| --- | --- |
| Playground completion rate | >= 70% |
| Median completion time | <= 15 minutes |
| Export usage rate | >= 40% of completed sessions |
| Theory-to-assessment conversion | >= 35% |
| Revisit rate (7-day) | >= 25% |

## 15) Immediate Next Actions

1. Approve this scope and file plan.
2. Decide whether MVP should include only availability SLI or availability + latency SLI.
3. Confirm alert recommendation model (simple burn-rate thresholds vs multi-window policy).
4. Start implementation with S1 and S2.

