---
title: Routing Slip
type: Enterprise Integration Pattern
keywords: sequential routing, processing steps, pipeline, itinerary, multi-step processing
---

# Routing Slip

## Overview
The Routing Slip pattern routes a message consecutively through a series of processing steps, where the sequence of steps is determined at message creation time. The message carries with it the list of processing components it should visit.

## Problem
Messages may need to pass through multiple processing steps in a specific sequence, but the exact sequence may vary for different messages. Hard-coding the sequence in each processing component creates tight coupling. How can we route a message through a series of processing steps when the sequence of steps is not known at design-time and may vary for each message?

## Solution
Attach a Routing Slip to each message, specifying the sequence of processing steps. Each processing component reads the routing slip, performs its processing, and then forwards the message to the next component specified in the slip. The routing slip can be modified during processing to add, remove, or alter subsequent steps.

## Key Characteristics
- Message carries its own routing information
- Processing sequence determined at message creation or runtime
- Each processor consults the slip for next destination
- Supports dynamic modification of remaining route
- Processors are decoupled from routing logic
- Can include conditional or optional steps
- Supports both linear and complex routing paths
- Enables audit trail of message processing path

## When to Use
- Processing sequence varies by message type or content
- Routing logic should be externalized from processors
- Need to specify multi-step workflows at runtime
- Processing steps must occur in specific order
- Different messages require different processing sequences
- Want to change routing without modifying components
- Need to track which steps a message has completed
- Implementing configurable processing pipelines

## Related Patterns
- Process Manager: More complex orchestration with conditional logic
- Pipes and Filters: Fixed processing pipeline
- Content-Based Router: Routes based on content but not sequential
- Itinerary-Based Router: Alternative name for routing slip
- Message History: Records actual path taken by message
- Control Bus: Can modify routing slips dynamically
- Message Store: May persist routing slip state
