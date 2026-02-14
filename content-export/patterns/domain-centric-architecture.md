---
title: Domain-Centric Architecture
slug: domain-centric-architecture
type: architecture-pattern
aka: onion/hexagonal/clean family, DDD-aligned, domain-centric layering
keywords: domain, boundaries, ports, dependency rule, DDD
---

# Domain-Centric Architecture

## Summary
A family of styles that place the domain model and use cases at the center, enforcing boundaries and dependency inversion.

## What it is

Unifies Hexagonal (ports & adapters), Onion, and Clean Architecture. Each expresses the same core ideas with different emphasis and diagrams.

## Common principles

- Explicit boundaries between domain and infrastructure
- Dependency rule: point inwards toward higher-level policies
- Ports (interfaces) decouple core from adapters (I/O)
- Testability via domain isolation and replaceable adapters

## Benefits

- Long-term maintainability and flexibility
- Framework-agnostic domain core
- Facilitates microservices and modular monoliths

## Trade-offs

- More abstractions and boilerplate
- Requires discipline and shared understanding

## When to use

- Evolving domains with complex business rules
- Need to swap infrastructures (DBs, brokers, UI)
- Desire for high testability and clear boundaries


