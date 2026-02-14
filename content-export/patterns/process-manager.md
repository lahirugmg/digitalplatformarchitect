---
title: Process Manager
type: Enterprise Integration Pattern
keywords: workflow orchestration, stateful routing, business process, dynamic routing, orchestration
---

# Process Manager

## Overview
The Process Manager pattern routes messages through multiple processing steps where the required steps may not be known at design time and may not be sequential. It maintains the state of the sequence and determines the next processing step based on intermediate results and business rules.

## Problem
Complex business processes involve multiple steps with conditional logic, parallel paths, and decision points based on intermediate results. The processing sequence cannot be predetermined and requires maintaining state across multiple message exchanges. How can we route a message through multiple processing steps when the required steps may not be known at design-time and may not be sequential?

## Solution
Use a Process Manager to maintain the state of the message processing sequence and determine the next processing step based on intermediate results, business rules, and process state. The Process Manager acts as a central coordinator, receiving messages, evaluating the current process state, making routing decisions, and sending messages to appropriate processing components.

## Key Characteristics
- Maintains stateful process execution context
- Makes dynamic routing decisions based on process state
- Supports conditional and parallel processing paths
- Handles complex business workflows
- Manages long-running transactions
- Coordinates multiple message exchanges
- Can implement compensation logic for failures
- Supports both synchronous and asynchronous interactions

## When to Use
- Complex business processes with multiple decision points
- Processing steps depend on previous step outcomes
- Need to maintain state across multiple message exchanges
- Implementing long-running business transactions
- Conditional logic determines processing flow
- Multiple parallel processing paths must be coordinated
- Process requires human intervention or external events
- Need to implement compensation or rollback logic
- Workflow changes based on business rules

## Related Patterns
- Routing Slip: Simpler pattern with predetermined sequence
- Saga: Manages distributed transactions with compensation
- Content-Based Router: Routes without maintaining state
- Process Orchestration: General term for coordinated workflows
- Message Broker: Can implement process manager functionality
- Correlation Identifier: Tracks related messages in process
- Aggregator: May collect results during process execution
- Event-Driven Architecture: Alternative to centralized orchestration
