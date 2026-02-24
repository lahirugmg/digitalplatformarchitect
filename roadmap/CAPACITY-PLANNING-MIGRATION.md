# Capacity Planning Calculator - Generalization Update (2026-02-24)

## Summary

The capacity planning playground has been upgraded from a single-scenario, AWS-centric calculator to a provider-neutral, template-driven workbench designed for common industry workloads.

Canonical route is now:
- `/playgrounds/capacity-planning`

Legacy route is preserved as redirect compatibility:
- `/capacity-planning` -> `/playgrounds/capacity-planning`

This release is positioned as directional planning support, not procurement-grade financial modeling.

## What Changed

### 1. Generalized Capacity Domain

A new modular domain was added under `lib/capacity-planning/`:

- `types.ts`
- `templates.ts`
- `pricing.ts`
- `model.ts`
- `compare.ts`
- `storage.ts`
- `index.ts`

Core upgrades:
- Provider mode support: `neutral` and `aws-equivalent`
- Two-scenario model: `baseline` and `optimized`
- Deterministic CU formulas with explicit clamps and assumptions
- Month-12 projection via annual growth
- Scenario comparison deltas and summary statements
- Versioned static pricing metadata with `lastUpdated`

### 2. Backward Compatibility Adapter

`lib/capacity-planning.ts` remains available for existing imports.

- `calculateCapacity(inputs)` is preserved
- legacy model now adapts into the generalized scenario engine using:
  - `templateId: 'custom'`
  - `providerMode: 'aws-equivalent'`
- `getInstanceTypes()` is still exposed via AWS-equivalent tiers

This keeps legacy callers functional while new UI uses the generalized contract.

### 3. Core Template Pack

Implemented application templates:

1. `ecommerce-api`
2. `social-feed-api`
3. `video-streaming-api`
4. `fintech-payments-api`
5. `b2b-saas-backend`
6. `custom` fallback

Each template defines workload defaults and advanced tuning defaults for fast scenario bootstrapping.

### 4. New Workbench UX

The playground now uses a two-panel scenario workbench:

- `TemplateSelector`
- `ScenarioForm` (simple-first, advanced toggle)
- `ProjectionSummary` (now vs month-12)
- `ResultsSummary` (per-scenario outputs)
- `ScenarioComparison` (optimized minus baseline deltas)

Container:
- `components/capacity-planning/CapacityWorkbench.tsx`

Compatibility entry:
- `CapacityCalculator.tsx` now wraps `CapacityWorkbench`

### 5. Session Persistence

Local session persistence is implemented with:
- key: `capacity-planning.session.v1`

Stored shape:
- baseline scenario
- optimized scenario
- active template id
- update timestamp

Supports:
- hydrate on load
- save on updates
- reset/clear workflow

### 6. Telemetry Extensions

Added personalization telemetry events:

- `capacity_template_selected`
- `capacity_scenario_compared`
- `capacity_projection_viewed`
- `capacity_results_copied`

Payload supports:
- `template_id`
- `scenario_mode`
- `provider_mode`

## Route and Integration Updates

### Routes

- `app/playgrounds/capacity-planning/page.tsx`: canonical page and workbench shell
- `app/capacity-planning/page.tsx`: `permanentRedirect('/playgrounds/capacity-planning')`

### Linked surfaces

Updated to canonical route:

- `lib/production-readiness.ts`
- `lib/personalization/catalog.ts`
- `app/playgrounds/components/PlaygroundsClient.tsx`

Progress compatibility remains intact:

- `lib/progress/catalog.ts` keeps `/capacity-planning` in related paths for historical tracking continuity.

## Test Coverage Added

New test suite:

- `tests/capacity-planning/model.test.ts`
- `tests/capacity-planning/templates.test.ts`
- `tests/capacity-planning/compare.test.ts`
- `tests/capacity-planning/pricing.test.ts`
- `tests/capacity-planning/storage.test.ts`

Updated coverage:

- `tests/ui/navigation-smoke.test.ts` for route redirect assertion
- `tests/personalization/engine.test.ts` for canonical href assertion
- `tests/personalization/telemetry.test.ts` for capacity telemetry payload support

## Current Behavior Contract

### Positioning

- Directional architecture and scaling guidance
- Not a live-pricing or procurement calculator

### Workflow

1. Pick template (or custom)
2. Configure baseline and optimized scenarios
3. Optionally tune advanced controls
4. Review now and month-12 outputs
5. Evaluate delta summary
6. Copy scenario report (markdown text)

### Output Focus

- required CU
- node count
- monthly and annual cost
- throughput
- p95/p99 latency
- warnings and recommendations
- assumptions and pricing table metadata

## Notes for Future Enhancements

Potential v2 directions:

1. Live provider pricing feeds
2. Deeper multi-cloud SKU equivalence beyond AWS
3. Team/session sharing via backend persistence
4. Additional template packs by vertical and scale tier
