# FEAT-027: OAuth2 and JWT handshake sequence

**Status:** Proposed
**Priority:** High
**Category:** Security Learning
**Effort:** Medium
**Created:** 2026-02-15

## Overview

Interactive swimlane sequence diagram for OAuth2 and JWT handshake flows.

## User Story

**As an** architect
**I want** to step through the auth handshake
**So that** I can validate trust boundaries and token usage

## Interactive Behavior

- Step through the sequence events
- Highlight actor roles (Client, IdP, Resource Server)
- Toggle flows for auth code vs client credentials

## Acceptance Criteria

- Each step is explained in plain language
- Users can switch flow types
- Diagram resets cleanly

## Files to Create/Modify

- app/learning/oauth2-jwt/page.tsx
- components/learning/oauth2-jwt/*

## Estimated Effort

- Medium (2-3 weeks)
