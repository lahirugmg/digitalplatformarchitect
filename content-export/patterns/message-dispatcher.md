---
title: Message Dispatcher
type: Enterprise Integration Pattern
keywords: concurrency, threading, message processing, workload distribution
---

# Message Dispatcher

## Overview

Message Dispatcher coordinates multiple message processors to handle messages concurrently from a single channel, improving throughput and system responsiveness.

## Problem

How can you distribute message processing across multiple threads or processes? A single-threaded message consumer may not provide adequate throughput for high-volume channels. You need to process messages concurrently while maintaining control over the number of concurrent processors.

## Solution

Use a Message Dispatcher that receives messages from a channel and distributes them to multiple performer threads or processes for concurrent processing. The dispatcher manages the pool of performers, assigns messages to available performers, and coordinates their work.

## Key Characteristics

- **Concurrent Processing**: Multiple messages processed simultaneously
- **Workload Distribution**: Distributes messages to performers
- **Thread Pool Management**: Controls number of concurrent processors
- **Load Balancing**: Assigns work to available performers
- **Throughput Improvement**: Increases message processing rate
- **Resource Management**: Limits concurrent resource usage

## When to Use

- High message volumes require concurrent processing
- Message processing is CPU or I/O intensive
- Need to improve system throughput
- Messages can be processed independently
- Want to control concurrency levels
- Scaling message processing within a single instance
- Implementing parallel processing patterns

## Implementation Considerations

- **Thread Safety**: Ensure thread-safe message processing
- **Pool Size**: Determine optimal number of performers
- **Message Ordering**: Concurrent processing may affect order
- **Error Handling**: Handle failures in performer threads
- **Backpressure**: Manage when performers are all busy
- **Resource Limits**: Prevent resource exhaustion
- **Graceful Shutdown**: Stop processing cleanly

## Related Patterns

- Competing Consumers
- Message Channel
- Transactional Client
- Thread Pool (general pattern)
