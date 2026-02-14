---
title: Message Channel
type: Enterprise Integration Pattern
keywords: messaging, integration, communication
---

# Message Channel

## Overview

A Message Channel connects one application to another, enabling asynchronous communication between distributed systems. It acts as a logical pathway through which messages flow from sender to receiver.

## Problem

How can one application communicate with another using messaging? Applications need a way to send and receive data without being directly connected or aware of each other's implementation details.

## Solution

Connect the applications using a Message Channel. The sending application writes messages to the channel, and the receiving application reads messages from it. The channel handles message transmission, buffering, and delivery.

## Key Characteristics

- **Decoupling**: Sender and receiver don't need to know about each other
- **Asynchronous**: Sender can continue processing without waiting for receiver
- **Buffering**: Channel can store messages temporarily if receiver is busy
- **Reliability**: Channel can ensure message delivery even if receiver is temporarily unavailable

## When to Use

- Connecting distributed applications
- Decoupling sender and receiver components
- Implementing asynchronous communication
- Building scalable systems with independent components

## Related Patterns

- Point-to-Point Channel
- Publish-Subscribe Channel
- Message
- Message Endpoint
