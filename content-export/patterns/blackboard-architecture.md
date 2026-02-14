---
title: Blackboard
slug: blackboard-architecture
type: architecture-pattern
keywords: ai, knowledge source, collaboration, control
---

# Blackboard

## Summary
Multiple specialized components collaborate by reading/writing to a shared knowledge source (the blackboard) until a solution emerges.

## What it is

A problem-solving style where independent knowledge sources incrementally contribute partial solutions to a shared blackboard, guided by a control component.

## Benefits

- Flexible problem decomposition and collaboration
- Supports heuristic or uncertain domains
- Extensible with new knowledge sources

## Trade-offs

- Designing the control strategy is complex
- Performance tuning can be difficult
- Shared state contention without careful design

## When to use

- Complex problem domains (e.g., recognition, planning)
- When multiple heuristics contribute to solutions
- Research/AI or analytics-heavy systems


