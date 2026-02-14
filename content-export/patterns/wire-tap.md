---
title: Wire Tap
type: Enterprise Integration Pattern
keywords: monitoring, inspection, debugging, observability
---

# Wire Tap

## Overview

The Wire Tap pattern allows you to inspect messages that travel through a message channel without interfering with the main message flow. It publishes a copy of each message to a secondary channel for monitoring, logging, or debugging purposes.

## Problem

How can you inspect messages that travel on a point-to-point channel without disrupting the primary message flow? You need to monitor, log, or analyze messages for debugging, auditing, or business intelligence purposes, but don't want to impact the performance or reliability of the main processing pipeline.

## Solution

Insert a Wire Tap into the message channel that creates a copy of each message and sends it to a secondary monitoring or logging channel. The original message continues to its intended destination unmodified, while the copy is available for inspection, analysis, or archival.

## Key Characteristics

- **Non-intrusive**: Does not modify or delay the primary message flow
- **Passive Monitoring**: Observes messages without affecting processing
- **Message Duplication**: Creates copies for inspection purposes
- **Decoupled Analysis**: Monitoring logic is separate from business logic
- **Selective Tapping**: Can filter which messages to tap
- **Asynchronous**: Inspection typically happens asynchronously

## When to Use

- Debugging integration flows
- Auditing message traffic
- Business activity monitoring
- Compliance and regulatory requirements
- Performance analysis and metrics collection
- Message replay capabilities
- Testing and validation in production

## Implementation Considerations

- **Performance Impact**: Message copying adds overhead
- **Storage**: Tapped messages may require significant storage
- **Privacy**: Ensure sensitive data is handled appropriately
- **Retention**: Define how long to keep tapped messages
- **Volume**: High-traffic channels generate many copies

## Related Patterns

- Message Channel
- Message Endpoint
- Message Store
- Message History
