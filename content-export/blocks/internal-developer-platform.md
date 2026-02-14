---
title: Internal Developer Platform
slug: internal-developer-platform
type: building-block
keywords: idp, platform engineering, golden paths, backstage
---

# Internal Developer Platform

## Summary
Golden paths, paved roads, and self-service capabilities for teams to ship reliably.

## What it is

An IDP productizes the platform: templates, automation, and curated experiences that reduce cognitive load and speed delivery.

## Responsibilities

- Service templates and scaffolding
- Standardized CI/CD and environments
- Catalog and discoverability
- Guardrails, policies, and cost controls

## Core capabilities

- Self-service provisioning and lifecycle ops
- Golden paths and docs in-context
- Scorecards and reliability baselines
- Feedback loops and platform telemetry

## Delivery: DevOps & CI/CD

- Standard CI pipelines with unit/integration tests and artifacts
- Security & quality gates (SAST/DAST, dependency scan, coverage)
- Automated CD with promotion/approvals/rollback
- Progressive delivery: blue/green, canary, feature flags
- GitOps controllers and declarative environments
- Ephemeral preview environments and env config management

## Runtime: Cloud Infrastructure & Orchestration

- Cluster lifecycle and capacity management
- Scheduling, autoscaling (HPA/VPA), and health management
- Service discovery, routing, ingress/egress and policies
- Storage classes/volumes and data durability
- Network policy, load balancing, multi-AZ/region topologies
- Service mesh integration and runtime policy control

## Architecture patterns

- Backstage or custom portal
- Templates + workflows as code
- Platform APIs and API-first integration
- Inner-source and contribution model

## Tech examples

- WSO2 Choreo
- Backstage
- Humanitec
- Port
- Internal
- Harness IDP

## KPIs/SLIs

- Lead time for change (DORA)
- Deployment frequency and change failure rate (DORA)
- MTTR for incidents and rollbacks
- Pipeline success rate and duration
- Time to onboard and time-to-first PR
- Developer satisfaction (DevEx surveys)


