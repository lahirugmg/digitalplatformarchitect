---
title: Claim Check
type: Enterprise Integration Pattern
keywords: data reference, message size reduction, external storage, data claim, baggage claim
---

# Claim Check

## Overview
The Claim Check pattern reduces message size by storing the entire message or parts of it in external storage and passing only a reference (claim check) through the messaging system. The reference can later be used to retrieve the original data.

## Problem
Messages may contain large payloads such as documents, images, or extensive data sets. Transmitting large messages through messaging infrastructure is inefficient, may exceed size limits, and can impact system performance. How can we reduce the data volume of messages without sacrificing information content?

## Solution
Store the complete message or its large data portions in a persistent store accessible by all components, and send a small claim check (reference) through the messaging system. The receiving component uses the claim check to retrieve the full data from the store when needed. This approach is analogous to checking luggage at an airport and receiving a claim ticket.

## Key Characteristics
- Stores large message payloads externally
- Passes lightweight reference through messaging system
- Retrieves full data on demand using claim check
- Reduces load on messaging infrastructure
- Supports multiple access patterns to stored data
- Handles data lifecycle and cleanup
- Can store partial or complete message content
- Maintains data consistency between store and references

## When to Use
- Messages contain large binary data or documents
- Message size exceeds messaging system limits
- Need to optimize messaging system performance
- Multiple consumers may access the same large data
- Large data is optional for some processing steps
- Want to reduce network bandwidth usage
- Messaging costs are based on data volume
- Data needs different retention than messages
- Some recipients need metadata only, not full content

## Related Patterns
- Content Enricher: Retrieves stored data using claim check
- Message Store: Provides storage for claimed data
- Reference Data Pattern: Similar concept for shared data
- Return Address: Specifies where to return results
- Normalizer: May use claim check for varying large payloads
- Datatype Channel: Messages with consistent data patterns
- Message Expiration: Coordinates with data cleanup
