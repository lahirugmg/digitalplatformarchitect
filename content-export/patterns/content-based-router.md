---
title: Content-Based Router
type: Enterprise Integration Pattern
keywords: routing, message routing, conditional routing, dynamic routing, content inspection
---

# Content-Based Router

## Overview
The Content-Based Router pattern examines the content of a message and routes it to a different channel based on data contained in the message. This enables intelligent message distribution based on the actual payload or header information.

## Problem
Different messages arriving on the same channel may need to be processed in different ways. A single destination cannot handle all message types effectively, and the sender should not need to know about all possible destinations. How can we route messages to the correct destination based on their content?

## Solution
Use a Content-Based Router to route each message to the correct recipient based on message content. The router inspects the message payload, headers, or properties and applies routing logic to determine the appropriate destination channel. The routing criteria can be based on field values, data types, message patterns, or any other message characteristic.

## Key Characteristics
- Examines message content to determine routing destination
- Supports multiple routing criteria and conditions
- Decouples message sender from knowledge of recipients
- Enables dynamic routing decisions at runtime
- Can route to one or multiple destinations based on content
- Maintains message integrity during routing
- Does not modify message content during routing process

## When to Use
- Messages of different types need different processing
- Routing decisions depend on message data values
- You need to decouple senders from specific receivers
- Business rules determine message destinations
- Different message priorities require different processing paths
- You need to route messages based on complex conditions
- Message types or routing rules change frequently

## Related Patterns
- Message Filter: Removes unwanted messages rather than routing them
- Recipient List: Routes to multiple recipients without content inspection
- Dynamic Router: More general routing pattern
- Message Translator: May need to transform messages for different destinations
- Pipes and Filters: Can include content-based routers in processing pipeline
