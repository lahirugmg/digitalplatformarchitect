---
title: Test Message
type: Enterprise Integration Pattern
keywords: testing, monitoring, health check, diagnostics
---

# Test Message

## Overview

Test Message validates the health and functionality of messaging components by sending diagnostic messages through the system and verifying they are processed correctly.

## Problem

How can you verify that messaging components are functioning correctly? In production environments, you need to ensure the messaging infrastructure is healthy, messages are being routed correctly, and consumers are processing messages. But you can't use real business messages for testing.

## Solution

Send specially crafted Test Messages through the messaging system to verify component health and functionality. Test messages follow the same path as regular messages but are identified as test data and handled appropriately without affecting business operations.

## Key Characteristics

- **Health Verification**: Confirms system is operational
- **End-to-End Testing**: Validates complete message flow
- **Non-intrusive**: Doesn't affect business operations
- **Identifiable**: Marked as test messages
- **Automated**: Can run on schedules
- **Monitoring Integration**: Alerts on test failures

## When to Use

- Production health monitoring
- Validating system deployments
- Continuous integration/deployment pipelines
- SLA compliance verification
- Proactive issue detection
- Performance baseline measurements
- After configuration changes

## Implementation Considerations

- **Test Data**: Use realistic but fake data
- **Identification**: Clear marking as test messages
- **Cleanup**: Remove test messages from stores
- **Frequency**: Balance monitoring vs overhead
- **Coverage**: Test critical paths and scenarios
- **Alerts**: Notify on test failures
- **Isolation**: Prevent test messages from triggering real actions

## Related Patterns

- Message Filter
- Wire Tap
- Message Channel
- Selective Consumer
