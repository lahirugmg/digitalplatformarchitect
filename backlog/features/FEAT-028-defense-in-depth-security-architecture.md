# FEAT-028: Defense-in-depth security architecture explainer

**Status:** Proposed
**Priority:** High
**Category:** Security Architecture
**Effort:** Medium
**Created:** 2026-02-15

## Overview

Create a comprehensive, interactive explainer for a unified security architecture that combines DMZ, Zero Trust, Vault-based secrets, and SIEM monitoring. The experience should show how layers work together and include tool mappings.

## User Story

**As an** architect
**I want** a clear, layered security architecture walkthrough
**So that** I can explain defense-in-depth to teams and stakeholders

## Content Structure

1. Layered overview (DMZ, Zero Trust + Vault, SIEM)
2. Component matrix and tool mapping
3. Attack scenario walkthrough
4. Key takeaways and design principles

## Interactive Behavior

- Toggle layer visibility (DMZ, Zero Trust, Vault, SIEM)
- Hover states to reveal component roles
- Step-by-step attack scenario playback
- Tool mapping chips per layer

## Security Component Matrix

| Component | Strategic Goal | Primary Function |
|---|---|---|
| DMZ | Isolation | Buffer internal network from public exposure |
| Zero Trust | Verification | Never trust, always verify every request |
| Vault | Credential Safety | Dynamic, short-lived secrets instead of static credentials |
| SIEM | Visibility | Real-time log correlation and threat detection |

## Tool Mapping (examples)

| Layer | Tools | Role |
|---|---|---|
| DMZ | Palo Alto, Fortinet, AWS WAF | Perimeter filtering and segmentation |
| Zero Trust | Istio, OPA, Zscaler | Identity-aware routing and policy enforcement |
| Vault | HashiCorp Vault, Azure Key Vault, AWS Secrets Manager | Secret issuance and rotation |
| SIEM | Splunk, ELK, Rapid7 InsightIDR | Log aggregation, correlation, and alerting |

## Attack Scenario (Walkthrough)

1. Attacker targets a public-facing DMZ service.
2. Zero Trust blocks lateral movement without identity proof.
3. Vault prevents credential theft via dynamic secrets.
4. SIEM detects anomalies and triggers incident response.

## Acceptance Criteria

- Explainer covers all four layers with clear roles
- Tool mapping is visible per layer
- Attack scenario can be replayed step-by-step
- Clear takeaways are presented at the end

## Files to Create/Modify

- app/security-architecture/page.tsx
- components/security-architecture/*
- lib/security-architecture.ts

## Estimated Effort

- Medium (2-3 weeks)

## Success Metrics

- Increased engagement with security content
- Higher completion rate for the security walkthrough
