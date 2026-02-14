---
title: Small Enterprise HA Platform
slug: small-ha
type: deployment-blueprint
tags: HA, API Management, Integration, Identity, Kubernetes
---

# Small Enterprise HA Platform

## Summary
Single-region highly available deployment for API Management, Integration, and IAM with shared observability.

## Views

### Business Goals

Improve developer productivity and partner onboarding while meeting security and availability targets (99.9%+).

### Capability Map

API Management, Enterprise Integration, Identity & Access Management, Observability, and Platform Runtime.

### Logical Architecture

API gateway with developer portal, integration runtime, and identity services, integrated with observability and data stores.

**Diagram:** platform-ha-logical

### Deployment Blueprint

Kubernetes with ingress/WAF, separate node pools per workload, data services, and shared observability.

**Diagram:** platform-ha-deployment

