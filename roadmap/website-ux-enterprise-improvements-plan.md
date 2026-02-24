# Website UX and Enterprise Feature Improvement Plan

Date: February 21, 2026
Prepared for: Digital Platform Architect website review
Scope: Planning only. No implementation changes performed.
Reference lens: Concepts from the books *System Design Interview* (requirements first, back-of-the-envelope estimation, scalability trade-offs, reliability, and observability).

## 1) Review Findings (ordered by severity)

### F1. Primary navigation is not mobile-friendly
- Evidence: `components/Header.tsx:30`
- Observation: Header renders all links in a single horizontal row with no mobile menu or overflow handling.
- User impact: Mobile users can lose access to key routes, which blocks discovery and onboarding.
- Priority: Critical

### F2. Onboarding modal misses core accessibility behaviors
- Evidence: `components/onboarding/OnboardingModal.tsx:52`, `components/onboarding/OnboardingModal.tsx:60`, `components/onboarding/OnboardingModal.tsx:97`
- Observation: Modal lacks `role="dialog"`, `aria-modal`, focus trapping, and Escape-to-close handling.
- User impact: Keyboard and assistive technology users can get stuck or lose context.
- Priority: Critical

### F3. Architecture playground page is desktop-biased
- Evidence: `app/architecture-playground/page.tsx:45`, `app/architecture-playground/page.tsx:80`
- Observation: Left and right sidebars are fixed-width and always visible; no responsive hide/collapse behavior.
- User impact: Poor usability on small screens and reduced readability.
- Priority: High

### F4. Journey recommendations link to unsupported filtered routes
- Evidence: `lib/onboarding/journey-engine.ts:28`, `lib/onboarding/journey-engine.ts:212`, `lib/onboarding/journey-engine.ts:248`, `app/patterns/page.tsx:15`
- Observation: Links use query params (`?filter=cost`, `?category=security`, `?category=data`) but the patterns page does not consume query params.
- User impact: Users expect pre-filtered results and instead land on an unfiltered catalog.
- Priority: High

### F5. Discovery is weak in large content sections
- Evidence: `app/patterns/page.tsx:57`, `app/articles/page.tsx:18`
- Observation: Patterns and articles are displayed as full lists grouped by category but without search, sort, or active filtering.
- User impact: High cognitive load and slower time to find relevant content.
- Priority: High

### F6. Progress is local-device only, limiting enterprise workflows
- Evidence: `lib/onboarding/store.ts:30`, `components/production-readiness/ProductionReadinessHub.tsx:16`, `lib/unlock-system.ts:205`
- Observation: Key user state is stored in local storage with no account/workspace layer.
- User impact: No cross-device continuity, no team sharing, no governance history.
- Priority: High

### F7. Dynamic Tailwind class construction creates styling risk
- Evidence: `components/onboarding/GoalSelector.tsx:93`, `components/onboarding/GoalSelector.tsx:131`, `components/onboarding/JourneyView.tsx:198`
- Observation: Runtime-generated class names can be missed by Tailwind static extraction; this is already visible for some violet variants.
- User impact: Inconsistent visual feedback in onboarding categories and recommendation tags.
- Priority: Medium

### F8. Markdown rendering path does not include sanitization
- Evidence: `app/about/page.tsx:12`, `app/about/page.tsx:20`, `app/patterns/[slug]/page.tsx:164`, `app/articles/[slug]/page.tsx:37`, `app/blocks/[slug]/page.tsx:31`
- Observation: Raw markdown is converted and injected with `dangerouslySetInnerHTML`.
- User impact: Elevated XSS risk if content source ever becomes user-generated or externally synced without strict sanitization.
- Priority: Medium

### F9. Quality gates are minimal for regression prevention
- Evidence: `package.json:5`
- Observation: Scripts include build and type-check only; no automated unit/integration/e2e suite.
- User impact: UX regressions and broken flows are more likely to reach production.
- Priority: Medium

## 2) Improvement Goals

1. Make core navigation and onboarding reliably usable on all devices.
2. Reduce user effort to find relevant patterns, playgrounds, and next steps.
3. Introduce enterprise-ready collaboration and decision traceability.
4. Add advanced learning features aligned with *System Design Interview* thinking.
5. Build observability and quality feedback loops for continuous UX improvement.

## 3) Product Principles (System Design Interview inspired)

1. Requirements before solution: ask persona, business constraints, scale, and non-functional targets first.
2. Estimate before architecture: expose traffic, storage, and latency assumptions explicitly.
3. Design with trade-offs: present consistency, availability, latency, and cost decisions side by side.
4. Plan for failure: include retries, queues, fallback paths, and multi-region reliability options.
5. Measure outcomes: track completion, time-to-first-value, and journey quality.

## 4) Roadmap Plan

## Phase 1 (0-4 weeks): UX Foundation

| ID | Initiative | Why it matters | Acceptance target |
| --- | --- | --- | --- |
| P1-1 | Responsive header with mobile menu | Prevents route lockout on phones | 100% primary routes reachable on mobile without horizontal scrolling |
| P1-2 | Accessible onboarding modal | Removes keyboard/screen-reader blockers | Dialog semantics, focus trap, Escape close, and tab order verified |
| P1-3 | Consistent navigation primitives | Avoids full page reload behavior and state loss | Internal links use unified navigation pattern and preserve app state |
| P1-4 | Search and filter for patterns/articles | Cuts discovery time | Median time-to-find-content reduced by at least 30% |
| P1-5 | Recommendation link integrity | Prevents dead-intent journeys | 0 broken or non-functional recommendation filters |

## Phase 2 (4-8 weeks): Guided Learning and Personalization

| ID | Initiative | System Design Interview concept | Enterprise architecture concept |
| --- | --- | --- | --- |
| P2-1 | Requirements Clarifier wizard | Functional vs non-functional requirement framing | Business capability mapping and stakeholder alignment |
| P2-2 | Architecture Path recommender | High-level design before deep dive | Role-based architecture viewpoints (business, solution, security, operations) |
| P2-3 | Back-of-the-envelope estimator | QPS, storage, and bandwidth estimation | Capacity planning and cost governance |
| P2-4 | Trade-off matrix cards | CAP, latency vs consistency, sync vs async | Architecture decision transparency |
| P2-5 | Scenario-based onboarding tracks | Requirement-driven solution shaping | Domain- and role-specific blueprint selection |

## Phase 3 (8-12 weeks): Enterprise Collaboration Features

| ID | Feature | Problem solved | MVP scope |
| --- | --- | --- | --- |
| P3-1 | Team workspaces and identity | Progress and artifacts are isolated per browser | Auth, user profiles, workspace-level saved journeys |
| P3-2 | ADR workspace | Decisions are implicit and not auditable | Create, review, and export architecture decision records |
| P3-3 | Architecture Review Board flow | No approval workflow for major design choices | Submit/review/approve with rationale and owner |
| P3-4 | NFR scorecards | Reliability/security/performance goals are ad hoc | Define SLO/SLA targets and score design readiness |
| P3-5 | Traceability graph | Business goals are disconnected from technical decisions | Link capability -> decision -> pattern -> playground artifact |

## Phase 4 (12+ weeks): Advanced System Design Labs

| ID | Lab | System Design Interview concept | Expected learning outcome |
| --- | --- | --- | --- |
| P4-1 | Rate Limiter Lab | Token bucket, leaky bucket, fixed/sliding window | Choose a limiter strategy by traffic shape and fairness goals |
| P4-2 | Caching and CDN Lab | Cache hierarchy, invalidation, read/write path design | Model latency and cache hit-rate trade-offs |
| P4-3 | Data Partitioning Lab | Sharding, consistent hashing, hot partition mitigation | Design scalable data layout with failure handling |
| P4-4 | Queue and Async Workflow Lab | Message queues, retries, dead-letter queues, idempotency | Build resilient event-driven flows |
| P4-5 | Multi-region Reliability Lab | Replication, failover, quorum, disaster recovery | Design for high availability and recovery objectives |

## 5) Suggested Target Architecture for New Features

1. Frontend: Keep Next.js app router, introduce server actions/APIs for authenticated state and shared artifacts.
2. Identity: Add SSO-compatible auth provider and workspace membership model.
3. Data layer: Move from local storage persistence to a managed relational store for journeys, ADRs, and scorecards.
4. Search: Add indexed search service for patterns, blocks, and articles.
5. Analytics: Capture journey funnel events and feature usage telemetry.
6. Governance: Add audit logging for approvals, exports, and decision changes.

## 6) KPI Framework

| KPI | Current state | Phase target |
| --- | --- | --- |
| Onboarding completion rate | Not instrumented | >= 75% |
| Time to first useful recommendation | Not instrumented | <= 90 seconds |
| Pattern/content find time | Manual browsing | <= 30 seconds median |
| Cross-session resume success | Local browser only | >= 95% account-based resume |
| Decision traceability coverage | Not tracked | >= 80% of generated plans linked to ADRs |

## 7) Delivery Sequence (recommended)

1. Ship Phase 1 first to remove immediate usability barriers.
2. Start Phase 2 immediately after instrumentation is in place.
3. Build Phase 3 only after identity and data persistence foundations are ready.
4. Roll out Phase 4 labs incrementally, one lab per release cycle.

## 8) Immediate Backlog Candidates

1. Create UX tickets for `F1`, `F2`, and `F3` with mobile and accessibility acceptance tests.
2. Add story to implement filter-aware routes before keeping filtered recommendation links.
3. Add quality baseline: unit tests for journey mapping and e2e smoke tests for onboarding.
4. Add architecture spike: workspace data model for journeys, ADRs, and review approvals.

## 9) Implementation Update (February 23, 2026)

### Completed in this pass

1. **Design token foundation** implemented in `app/globals.css` and `tailwind.config.ts` with neutral surfaces, one accent family, and semantic status colors.
2. **Typography contract** implemented in `app/layout.tsx` using `next/font`:
   - Headings: `Manrope`
   - Body/UI: `Source Sans 3`
3. **Shared component primitives** added:
   - `.surface-base`, `.surface-elevated`, `.surface-muted`
   - `.text-strong`, `.text-muted`
   - `.btn-primary`, `.btn-secondary`, `.btn-ghost`
   - `.card-standard`, `.card-interactive`
4. **Homepage UX simplification** completed in `app/page.tsx`:
   - Removed rainbow-heavy treatment in favor of neutral-first hierarchy.
   - Reduced emoji emphasis and moved to icon-first card language.
   - Enforced clearer CTA hierarchy (primary + optional secondary).
5. **Playgrounds index harmonization** completed in `app/playgrounds/components/PlaygroundsClient.tsx`:
   - Unified card hierarchy and metadata treatment.
   - Muted chip language with accent used only for recommendation emphasis.
6. **Onboarding visual cleanup** completed in:
   - `components/onboarding/OnboardingModal.tsx`
   - `components/onboarding/RoleSelector.tsx`
   - `components/onboarding/GoalSelector.tsx`
   - `components/onboarding/JourneyView.tsx`
7. **Discovery page visual consistency** completed in:
   - `app/patterns/PatternsClient.tsx`
   - `app/articles/ArticlesClient.tsx`
8. **Telemetry interface extension** completed in `lib/personalization/telemetry.ts`:
   - Added `ux_theme_applied`
   - Added `ux_compact_mode_toggled`
   - Added `ux_home_cta_click`
   - Added optional payload field `ux_variant`

### Remaining items (next incremental pass)

1. Add explicit compact-mode toggle UI to emit `ux_compact_mode_toggled`.
2. Add automated browser-level smoke tests for homepage, onboarding, and playground navigation.
3. Run formal visual QA rubric for color-clutter reduction and capture before/after screenshots.
4. Add analytics dashboards for UX event trend monitoring (theme/CTA/context usage).
