---
title: OAuth2 & OIDC Patterns
slug: oauth2-patterns
type: architecture-pattern
keywords: oauth2, oidc, authorization, authentication, tokens, federation
---

# OAuth2 & OIDC Patterns

## Summary
Secure authorization and authentication patterns using OAuth2 flows and OpenID Connect for identity federation.

## What it is

OAuth2 provides secure authorization flows, while OpenID Connect adds authentication. Together they enable identity federation and API access control.

## Common Flows

- Authorization Code Flow: Server-side apps with confidential clients
- PKCE Flow: Mobile and SPA apps requiring additional security
- Client Credentials Flow: Service-to-service authentication
- Device Flow: Input-constrained devices (IoT, smart TV)

## Token Types

- Access Token: Bearer token for API authorization (JWT or opaque)
- Refresh Token: Long-lived token for obtaining new access tokens
- ID Token: JWT containing user identity information (OIDC)
- Token introspection for real-time validation

## Security Considerations

- Token storage and transmission security
- Proper scope management and least privilege
- Token lifetime and refresh strategies
- PKCE for public clients and CSRF protection

## When to use

- API access control and resource protection
- Single sign-on across multiple applications
- Third-party integrations and partner access
- Modern web and mobile application authentication


