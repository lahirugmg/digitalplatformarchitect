---
title: Hexagonal Architecture
slug: hexagonal-architecture
type: architecture-pattern
aka: ports and adapters
keywords: ports, adapters, domain, testing, isolation
---

# Hexagonal Architecture

## Summary
Domain-centric design separating core logic from external concerns via ports (interfaces) and adapters.

## What it is

Core business logic depends only on abstractions (ports); adapters implement I/O concerns like databases, brokers, and HTTP.

## Benefits

- High testability and substitution of infrastructures
- Clear boundaries and dependency inversion
- Supports both monoliths and services

## Distinctions vs. Clean Architecture

- Hexagonal emphasizes external I/O at the boundary via ports/adapters
- Clean emphasizes concentric layers and the dependency rule
- Both are domain‑centric; naming and diagrams differ more than intent

## Trade-offs

- More boilerplate (ports, adapters, mappers)
- Requires discipline in large teams


