---
title: Polling Consumer
type: Enterprise Integration Pattern
keywords: message consumption, pull model, flow control
---

# Polling Consumer

## Overview

Polling Consumer enables an application to consume messages from a channel when the application is ready, giving the receiver explicit control over when messages are processed.

## Problem

How can an application consume messages at its own pace? Sometimes the message receiver needs to control when it receives messages rather than having messages pushed to it. The receiver may need to process messages only when resources are available or at specific times.

## Solution

Implement a Polling Consumer that explicitly requests messages from a channel when ready to process them. Instead of passively receiving messages as they arrive, the consumer actively polls the channel, pulling messages only when it chooses to.

## Key Characteristics

- **Pull-Based**: Consumer requests messages
- **Flow Control**: Receiver controls consumption rate
- **Resource Management**: Process when resources available
- **Explicit Control**: Programmatic message retrieval
- **Throttling**: Natural rate limiting
- **Batch Processing**: Can retrieve multiple messages

## When to Use

- Receiver needs to control processing rate
- Resource-intensive message processing
- Scheduled or batch processing scenarios
- Need to throttle message consumption
- Processing requires specific conditions to be met
- Load management and backpressure handling
- Integration with legacy pull-based systems

## Implementation Considerations

- **Polling Frequency**: Balance responsiveness vs overhead
- **Empty Polls**: Handle channels with no messages
- **Blocking vs Non-blocking**: Choose polling strategy
- **Performance**: Polling can be less efficient than push
- **Scalability**: Multiple pollers need coordination
- **Message Ordering**: Consider order with concurrent pollers

## Related Patterns

- Durable Subscriber
- Message
- Message Channel
- Competing Consumers
- Event-Driven Consumer (opposite pattern)
