# FEAT-009: Operational sympathy interactive guide

**Status:** Proposed
**Priority:** High
**Category:** Learning Experience
**Effort:** Medium
**Created:** 2026-02-14

## Overview

Create an interactive webpage that teaches operational sympathy and lets architects score a design using a weighted checklist. The experience blends a concise narrative, the nine key elements, and a scoring engine with clear interpretations.

## User Story

**As an** architect or developer
**I want** a guided operational sympathy checklist with scoring
**So that** I can evaluate designs and identify operational risk before implementation

## Content Sources

- Article: "Operational Sympathy" by Afkham Azeez
- Checklist: Operational sympathy scorecard (weights, scoring guidance)

## Experience Goals

- Present the concept and motivation in a short, structured flow
- Make the checklist actionable with weighted scoring and clear guidance
- Provide a final score and interpretation with recommended next steps

## Information Architecture

1. Hero and summary
2. Key elements (nine cards)
3. Interactive checklist and scoring
4. Score interpretation and recommendations
5. Optional export/share

## Scoring Model

Each element is scored 0-5 and multiplied by its weight. The final score is the sum of weighted scores.

$$
\text{Operational Sympathy Score} = \sum_{i=1}^{9} (\text{weight}_i \times \text{score}_i)
$$

Score interpretation:
- 85-100: Strong operational sympathy
- 70-84: Acceptable, but risks exist
- 50-69: Incidents likely
- 0-49: High risk

## Key Elements (from checklist)

1. Production-Aware Design (10%)
2. Load and Scale Consciousness (15%)
3. Failure-Aware Architecture (15%)
4. Built-In Observability (15%)
5. Operability and Recovery (15%)
6. Security as a Runtime Concern (10%)
7. Cost Awareness by Design (10%)
8. Runbook-Driven Thinking (5%)
9. Shared Ownership of Outcomes (5%)

## Proposed Solution

Build a dedicated page that includes:
- A structured summary of the article content
- A checklist panel with scores and guidance per element
- A live score summary with interpretation
- A call-to-action to improve low-scoring areas

## Acceptance Criteria

- The page explains operational sympathy in a concise, skimmable format
- The checklist allows scoring each of the nine elements (0-5)
- The final score updates live and displays interpretation text
- The experience is usable on desktop and mobile
- Score can be reset and optionally exported

## Files to Create/Modify

- app/operational-sympathy/page.tsx
- components/operational-sympathy/*
- lib/operational-sympathy.ts

## Dependencies

- None (uses existing UI stack)

## Related Features

- FEAT-010: Operational sympathy checklist and scoring engine
- FEAT-011: Operational sympathy article experience
- FEAT-012: Operational sympathy report export
