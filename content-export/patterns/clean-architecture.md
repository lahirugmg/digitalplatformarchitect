---
title: Clean Architecture
slug: clean-architecture
type: architecture-pattern
aka: uncle bob, screaming architecture
keywords: use cases, entities, dependency rule
---

# Clean Architecture

## Summary
Domain‑centric, dependency‑inversion style family emphasizing concentric layers (entities, use cases, interfaces) and the Dependency Rule.

## What it is

Best viewed as a family of domain‑centered, dependency‑inversion styles (closely related to Hexagonal and Onion). Many teams use it as a style; others apply its principles (boundaries, Dependency Rule, use‑case orientation) within other patterns.

## Benefits

- Framework-agnostic domain core
- Improved testability and maintainability

## Distinctions vs. Hexagonal

- Clean organizes the code into rings (entities, use cases, interfaces)
- Hexagonal organizes around ports/adapters for I/O
- Teams often combine both; treat them as a family of domain‑centric styles


