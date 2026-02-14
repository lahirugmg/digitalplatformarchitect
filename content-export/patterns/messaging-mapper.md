---
title: Messaging Mapper
type: Enterprise Integration Pattern
keywords: transformation, mapping, domain objects, data translation
---

# Messaging Mapper

## Overview

Messaging Mapper translates between messaging infrastructure messages and domain objects in the application layer, decoupling domain logic from messaging concerns.

## Problem

How do you move data between domain objects and messaging infrastructure without coupling them? Applications work with domain-specific objects while messaging systems use message formats. Direct coupling between these creates maintenance issues and prevents independent evolution.

## Solution

Create a Messaging Mapper layer that translates between domain objects and messaging infrastructure messages. The mapper handles serialization, deserialization, and any necessary data transformation, keeping domain objects free from messaging concerns.

## Key Characteristics

- **Bidirectional Translation**: Domain objects ↔ Messages
- **Decoupling**: Separates domain from messaging concerns
- **Format Handling**: Manages message serialization
- **Type Safety**: Preserves domain object types
- **Encapsulation**: Hides messaging details from domain
- **Evolution Support**: Domain and message formats evolve independently

## When to Use

- Separating domain logic from infrastructure
- Multiple message formats for same domain objects
- Domain-driven design architectures
- Need to evolve domain and messaging independently
- Complex domain objects with simple messages
- Testing domain logic without messaging infrastructure
- Hexagonal or clean architecture implementations

## Implementation Considerations

- **Mapping Strategy**: Automatic vs manual mapping
- **Performance**: Mapping adds overhead
- **Null Handling**: Decide how to handle missing values
- **Nested Objects**: Map complex object graphs
- **Collections**: Handle lists and arrays appropriately
- **Validation**: Where to validate data
- **Version Compatibility**: Handle message format changes

## Related Patterns

- Message Translator
- Canonical Data Model
- Domain Model (DDD pattern)
- Data Transfer Object
