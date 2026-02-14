---
title: CQRS
slug: cqrs
type: architecture-pattern
aka: Command Query Responsibility Segregation
keywords: reads, writes, event sourcing, materialized views
---

# CQRS

## Summary
Separate write and read models to optimize for different workloads; often paired with events.

## What it is

Commands mutate write models; queries read denormalized projections. Enables scaling and performance tuning per side.

## Trade-offs

- Eventual consistency
- More moving parts and governance


