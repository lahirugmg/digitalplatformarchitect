---
title: Canonical Data Model
type: Enterprise Integration Pattern
keywords: common data model, standard format, data standardization, shared model, integration model
---

# Canonical Data Model

## Overview
The Canonical Data Model pattern defines a common, shared data model that is independent of any specific application. All applications translate their data to and from this canonical format when exchanging information, minimizing the number of translations required in an integrated system.

## Problem
When integrating multiple applications, each pair of communicating applications may require a custom translator. With N applications, this can result in N*(N-1) translators. Each application change may require updates to multiple translators. How can you minimize dependencies when integrating applications that use different data formats?

## Solution
Define a Canonical Data Model that is independent of any specific application. Each application translates its internal data format to the canonical model when sending messages and from the canonical model when receiving messages. This reduces the number of required translators from N*(N-1) to 2*N and creates a stable integration layer.

## Key Characteristics
- Single shared data model for all integrations
- Application-independent format definition
- Reduces number of required translations
- Provides stable integration contract
- Supports semantic consistency across applications
- Can be version-controlled independently
- Includes common business entities and relationships
- May include extensibility mechanisms for application-specific needs

## When to Use
- Integrating multiple applications with different formats
- Want to minimize translation maintenance overhead
- Need consistent data representation across systems
- Building enterprise service bus or integration platform
- Applications frequently change their internal formats
- Need to add new applications to integration landscape
- Standardizing enterprise-wide data definitions
- Reducing coupling between integrated applications
- Building reusable integration components

## Related Patterns
- Message Translator: Implements translation to/from canonical model
- Normalizer: Converts multiple formats to canonical format
- Shared Database: Alternative integration approach with shared schema
- Published Language: Canonical model as published contract
- Anti-Corruption Layer: Protects applications from canonical model changes
- Schema Registry: Manages canonical model definitions
- Adapter Pattern: Translates between canonical and application formats
