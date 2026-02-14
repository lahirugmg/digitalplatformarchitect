---
title: Message History
type: Enterprise Integration Pattern
keywords: debugging, tracing, audit, monitoring
---

# Message History

## Overview

Message History tracks the path a message has traveled through a messaging system by maintaining a list of all components and channels the message has passed through.

## Problem

How can you analyze and debug the flow of messages in a loosely coupled system? When messages pass through multiple components and channels, it becomes difficult to understand the message's journey, troubleshoot issues, or analyze system behavior.

## Solution

Attach a Message History to each message as it travels through the system. Each component or channel that handles the message adds an entry to the history, recording when and where the message was processed. This creates an audit trail that can be analyzed for debugging, monitoring, or compliance purposes.

## Key Characteristics

- **Audit Trail**: Complete record of message processing path
- **Timestamped**: Each entry includes processing time
- **Component Tracking**: Records which components handled the message
- **Transformation Tracking**: Can record message modifications
- **Performance Analysis**: Identifies bottlenecks and delays
- **Debugging Aid**: Helps trace message flow issues

## When to Use

- Complex integration flows with many processing steps
- Need to debug message routing issues
- Performance analysis and optimization
- Compliance and audit requirements
- Understanding system behavior
- Identifying processing bottlenecks
- Message replay and recovery scenarios

## Implementation Considerations

- **Message Size**: History adds to message payload
- **Performance**: Recording history has overhead
- **Privacy**: Sensitive data in history must be protected
- **Storage**: History data requires retention strategy
- **Standardization**: Consistent format across components

## Related Patterns

- Message Store
- Wire Tap
- Message Router
- Message Channel
