---
title: Normalizer
type: Enterprise Integration Pattern
keywords: message normalization, format conversion, data standardization, message transformation, format translation
---

# Normalizer

## Overview
The Normalizer pattern processes messages that are semantically equivalent but arrive in different formats by converting them into a common internal format. It enables a single processing component to handle functionally similar messages regardless of their original format.

## Problem
Different systems may send semantically equivalent messages in different formats. Processing each format separately creates duplication and maintenance overhead. How can you process messages that are semantically equivalent but arrive in different formats?

## Solution
Use a Normalizer to route each message type through a custom translator that converts it into a common format. The normalizer receives messages in various formats, determines the message type, invokes the appropriate translator, and forwards the transformed message in the normalized format to downstream processors. This allows subsequent components to process all messages uniformly.

## Key Characteristics
- Accepts messages in multiple different formats
- Translates all formats to single canonical format
- Routes by format type to appropriate translator
- Centralizes format handling logic
- Simplifies downstream processing
- Supports adding new input formats without changing consumers
- Preserves semantic meaning during translation
- Can handle both structural and data format differences

## When to Use
- Receiving semantically similar data in different formats
- Multiple sources send equivalent information differently
- Want to standardize processing logic
- Need to integrate systems with different data representations
- Same business entity represented in various formats
- Reducing complexity of downstream components
- Isolating format changes from processing logic
- Converting between different protocol message formats
- Handling legacy and modern format variations

## Related Patterns
- Message Translator: Individual format translator used by normalizer
- Canonical Data Model: Defines the common normalized format
- Content-Based Router: Routes messages to format-specific translators
- Adapter: Converts between different interfaces
- Envelope Wrapper: Adds common wrapper to different formats
- Pipes and Filters: Normalizer can be filter in pipeline
- Format Indicator: Identifies message format for routing
