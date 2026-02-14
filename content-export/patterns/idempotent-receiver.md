---
title: Idempotent Receiver
type: Enterprise Integration Pattern
keywords: reliability, deduplication, exactly-once, message handling
---

# Idempotent Receiver

## Overview

The Idempotent Receiver ensures that duplicate messages are detected and processed only once, even if received multiple times, making message processing safe and predictable.

## Problem

How can a message receiver safely handle duplicate messages? In distributed systems, messages may be delivered more than once due to retries, network issues, or system failures. Processing the same message multiple times can lead to incorrect results, duplicate records, or inconsistent state.

## Solution

Design the message receiver to be idempotent - capable of safely processing the same message multiple times with the same result as processing it once. Track which messages have been processed using unique message identifiers, and skip processing for duplicate messages.

## Key Characteristics

- **Duplicate Detection**: Identifies messages already processed
- **Unique Identification**: Uses message IDs or business keys
- **Safe Reprocessing**: Multiple processing produces same result
- **State Tracking**: Maintains record of processed messages
- **Reliability**: Enables safe retry mechanisms
- **Exactly-Once Semantics**: Achieves exactly-once processing

## When to Use

- Messages may be delivered multiple times
- Processing must produce consistent results
- Financial transactions or critical operations
- Systems with at-least-once delivery guarantees
- Network retry scenarios
- Distributed systems with possible failures
- Event sourcing architectures

## Implementation Considerations

- **Message ID Strategy**: Choose appropriate unique identifier
- **Storage**: Where to persist processed message IDs
- **Cleanup**: Remove old processed message records
- **Performance**: ID lookup must be fast
- **Distributed Systems**: Synchronize across instances
- **Business vs Technical IDs**: Use appropriate identifier type

## Related Patterns

- Message
- Message Channel
- Selective Consumer
- Message Filter
