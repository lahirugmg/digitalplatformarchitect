---
title: Adapter Pattern
slug: adapter-pattern
type: architecture-pattern
keywords: ports, adapters, legacy, translation, anti-corruption
---

# Adapter Pattern

## Summary
Introduce an adapter that translates between incompatible interfaces, enabling legacy integration and boundary isolation.

## What it is

An integration and boundary pattern that wraps a foreign or legacy interface with an adapter matching your internal port, isolating change and translating contracts.

## Benefits

- Decouples domain from vendor protocols
- Enables incremental modernization
- Improves testability via substitution

## Related

- Hexagonal Architecture (ports and adapters)
- Anti-corruption layer (DDD)

## When to use

- Legacy system integration
- Third-party APIs with poor fit
- Protocol translation and boundary protection


