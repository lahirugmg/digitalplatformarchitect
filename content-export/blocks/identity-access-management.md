---
title: Identity & Access Management
slug: identity-access-management
type: building-block
keywords: iam, oidc, saml, rbac, pki
---

# Identity & Access Management

## Summary
Centralized identity, authentication, authorization, and federation for users and services.

## What it is

IAM provides digital identity lifecycle, authn/z, federation, and policy enforcement for humans and workloads across the estate.

## Responsibilities

- Identity lifecycle (provisioning, deprovisioning)
- Authentication (MFA, risk-based)
- Authorization (RBAC, ABAC, PBAC)
- Federation (OIDC/SAML) and secrets/PKI

## Core capabilities

- Policy as code and centralized auditing
- Service-to-service identity (mTLS, SPIFFE/SPIRE)
- Just-in-time and just-enough access
- Zero trust posture and session management

## Architecture patterns

- Token-based auth (JWT, OAuth2)
- Attribute and policy-based access control
- Federated identity across SaaS and on-prem
- Workload identity with short-lived creds

## Tech examples

- WSO2 Identity Server
- WSO2 IAM SaaS solution Asgardeo
- Keycloak
- Auth0
- Azure AD
- Okta
- SPIRE

## KPIs/SLIs

- Auth success rate and latency
- Policy evaluation latency
- Credential compromise and rotation compliance
- Access request lead time


