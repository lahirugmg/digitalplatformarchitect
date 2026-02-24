# UX Style Governance

Date: February 23, 2026  
Status: Active

## Purpose

Keep the website visually consistent, readable, and low-noise as new features ship.  
This document defines non-negotiable UI rules for color, typography, spacing, CTA hierarchy, and motion.

## Core Principles

1. Color communicates meaning, not decoration.
2. One primary accent family per surface (blue).
3. Semantic colors are reserved for status and risk signals.
4. Motion should support understanding, never distract.
5. Every section must have a clear primary decision path.

## Token Policy

Source of truth: `app/globals.css`

- Surfaces:
  - `--surface-0`: app background
  - `--surface-1`: elevated card/panel background
  - `--surface-2`: subtle container background and borders
- Text:
  - `--text-strong`: primary content
  - `--text-muted`: secondary content
- Accent:
  - `--accent`: primary action
  - `--accent-soft`: highlighted but non-primary emphasis
- Semantics:
  - `--success`, `--warning`, `--danger`: status states only

Do not add new ad-hoc palette colors in component files.

## Typography Rules

Source of truth: `app/layout.tsx`

- Heading font: `Manrope`
- Body/UI font: `Source Sans 3`

Rules:
- Use heading font only for headings and major labels.
- Use body font for control labels, descriptive text, and metadata.
- Avoid decorative capitalization and aggressive letter spacing in body content.

## Component Primitives

Use shared classes instead of per-component style inventions:

- Surfaces: `.surface-base`, `.surface-elevated`, `.surface-muted`
- Text: `.text-strong`, `.text-muted`
- Buttons: `.btn-primary`, `.btn-secondary`, `.btn-ghost`
- Cards: `.card-standard`, `.card-interactive`

If a component requires a new primitive, add it to `app/globals.css` first and document why.

## CTA Hierarchy

Per section:
1. One primary CTA maximum.
2. One secondary CTA optional.
3. Additional actions should be tertiary (ghost/link).

Do not place multiple primary-colored buttons in the same visual group.

## Motion Policy

Duration standard: `150-220ms`.

Allowed:
- enter/exit fades
- subtle hover/focus transitions
- state change transitions that improve comprehension

Avoid:
- looping decorative animation
- large transform-based hover jumps
- competing simultaneous motion in the same section

Respect `prefers-reduced-motion` globally.

## Accessibility Baseline

All UI updates must preserve:

1. Keyboard navigability.
2. Visible focus states.
3. WCAG AA text contrast.
4. Semantic labeling for dialogs, forms, and nav controls.

## QA Checklist (PR Gate)

1. No new non-semantic accent colors introduced.
2. CTA hierarchy respected per section.
3. Motion is within policy and reduced-motion safe.
4. Mobile (320px/375px) has no horizontal overflow.
5. `npm test`, `npm run type-check`, and `npm run build` pass.
