---
title: Microkernel / Plugin Architecture
slug: plugin-based
type: architecture-pattern
aka: microkernel, plug-in, modular architecture
keywords: extensibility, plugins, modules, extensions
---

# Microkernel / Plugin Architecture

## Summary
Core system exposes extension points; features are delivered as plugins loaded at runtime or build time.

## What it is

A modular approach where the host provides contracts and lifecycle hooks, and plugins implement optional features independently. Resonates with OSGi/Eclipse RCP and modern modular frameworks.

## Benefits

- Extensible and customizable platforms
- Isolated failure and independent delivery
- Encourages inner-source and community

## Trade-offs

- Versioning and compatibility management
- Security and sandboxing of plugins
- Discovery and dependency management


