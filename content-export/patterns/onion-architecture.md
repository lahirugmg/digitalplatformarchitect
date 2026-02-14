---
title: Onion Architecture
slug: onion-architecture
type: architecture-pattern
aka: domain-centric layering
keywords: onion, layers, dependency rule, domain
---

# Onion Architecture

## Summary
Domain-centric layering with the domain model at the center; infrastructure concerns form outer rings; enforces dependency rule inward.

## What it is

A domain-first style with concentric layers: domain model at the core, then application services, then infrastructure. Dependencies point inward to protect the domain.

## Benefits

- Strong separation of concerns and testability
- Easier to replace infrastructure and frameworks
- Aligns well with DDD and modularization

## Trade-offs

- More indirection/boilerplate (mappers, interfaces)
- Requires discipline to maintain boundaries

## Related

- Hexagonal (Ports & Adapters)
- Clean Architecture
- Domain-Centric Architecture


