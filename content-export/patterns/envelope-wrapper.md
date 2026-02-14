---
title: Envelope Wrapper
type: Enterprise Integration Pattern
keywords: message format, header, metadata, compatibility
---

# Envelope Wrapper

## Overview

Envelope Wrapper encapsulates application data inside a messaging infrastructure envelope, allowing incompatible data formats to be transmitted through the messaging system.

## Problem

How can existing systems participate in a messaging exchange that requires specific message formats? Applications may generate data in formats incompatible with the messaging infrastructure's requirements. Modifying the application to produce compliant messages may not be feasible.

## Solution

Wrap the application data inside an envelope that complies with messaging infrastructure requirements. The envelope contains headers, routing information, and metadata required by the messaging system, while preserving the original application data as the payload.

## Key Characteristics

- **Format Compatibility**: Makes data compatible with messaging system
- **Metadata Container**: Carries routing and processing information
- **Payload Preservation**: Original data remains unchanged
- **Non-intrusive**: No application modification required
- **Standard Compliance**: Meets messaging infrastructure requirements
- **Reversible**: Envelope can be unwrapped at destination

## When to Use

- Legacy systems with incompatible message formats
- Messaging infrastructure has strict format requirements
- Need to add metadata without changing application
- Multiple applications with different formats
- Compliance with messaging standards
- Adding routing or security information to messages
- Bridging different messaging systems

## Implementation Considerations

- **Envelope Format**: Choose appropriate envelope structure
- **Payload Encoding**: How to encode original data
- **Overhead**: Envelope adds to message size
- **Unwrapping**: Ensure receivers can extract payload
- **Standards**: Use standard envelope formats when possible
- **Versioning**: Handle envelope format changes

## Related Patterns

- Message Translator
- Content Enricher
- Canonical Data Model
- Messaging Bridge
- Channel Adapter
