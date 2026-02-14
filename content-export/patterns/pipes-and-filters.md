---
title: Pipes and Filters
type: Enterprise Integration Pattern
keywords: processing, transformation, architecture
---

# Pipes and Filters

## Overview

Pipes and Filters is an architectural pattern that divides a complex processing task into a sequence of smaller, independent processing steps (filters) connected by channels (pipes).

## Problem

How can you perform complex processing on a message while maintaining independence and flexibility? Monolithic processing makes it difficult to reuse components, test individual steps, or modify the processing flow.

## Solution

Divide the processing task into a sequence of independent processing steps (filters) connected by channels (pipes). Each filter processes the message and passes it to the next filter through a pipe. This creates a processing pipeline where each step is:

- **Self-contained**: Each filter is an independent component
- **Reusable**: Filters can be used in different pipelines
- **Composable**: Filters can be rearranged to create different processing flows

## Key Characteristics

- **Modularity**: Each filter handles one specific transformation
- **Flexibility**: Easy to add, remove, or reorder filters
- **Testability**: Each filter can be tested independently
- **Maintainability**: Changes to one filter don't affect others

## When to Use

- Complex message processing that can be broken into steps
- Need for reusable processing components
- Processing flow that may change over time
- Systems requiring independent scaling of processing steps

## Related Patterns

- Message Filter
- Message Router
- Message Translator
- Content Enricher
