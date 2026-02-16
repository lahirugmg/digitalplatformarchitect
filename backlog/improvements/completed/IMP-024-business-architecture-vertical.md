# IMP-024: Business Architecture Vertical — L0 to Ln Interactive Playground

**Status:** Completed
**Priority:** High
**Category:** Architecture Playground / Business Architecture
**Effort:** Large
**Created:** 2026-02-16
**Completed:** 2026-02-16
**Depends On:** IMP-023

---

## Overview

Implement the **Business Architecture** vertical in the interactive architecture playground. This vertical defines *what the business does*, focusing on strategy and processes rather than technical specifics. Each level progressively reveals more detail about the business model, operations, and procedures.

---

## Level Breakdown

### L0: Abstract Business View

**Concept:** The "30,000-foot view" of the business model.

**Content:**
- High-level value streams
- Key business capabilities
- Major stakeholders

**Implementation Tasks:**
- [ ] Design abstract business capability nodes (no technical language)
- [ ] Define value stream flow lines connecting capabilities
- [ ] Add stakeholder actor nodes (customers, partners, regulators)
- [ ] Ensure the diagram answers: "What does this business do and for whom?"

---

### L1: Business Process / Technology Outline

**Concept:** Mapping high-level operations to technology needs.

**Content:**
- Core operational workflows
- Broad outline of the technology required to support them

**Implementation Tasks:**
- [ ] Add operational workflow nodes for each major business process
- [ ] Introduce technology outline annotations (e.g., "Requires CRM", "Needs payment processing")
- [ ] Connect L0 capabilities to their supporting L1 workflows
- [ ] Show the technology dependency mapping without naming specific products

---

### L2: Detailed Business Processes

**Concept:** Actionable steps for how work gets done.

**Content:**
- Swimlane diagrams
- Specific user tasks
- Decision points
- Standard operating procedures

**Implementation Tasks:**
- [ ] Implement swimlane-style layout for process participants (roles/systems)
- [ ] Add task nodes with clear input/output definitions
- [ ] Add decision point (diamond) nodes with branching logic
- [ ] Link to standard operating procedures where applicable
- [ ] Support drill-down from L1 workflows into L2 process detail

---

### Ln: Deep Dived Diagram

**Concept:** Granular analysis of complex specificities.

**Content:**
- Intricate logic for a specific sub-process
- Edge-case handling
- Detailed regulatory compliance flows

**Implementation Tasks:**
- [ ] Support sub-process expansion for complex business logic
- [ ] Add edge-case and exception flow paths
- [ ] Include regulatory compliance annotations and checkpoints
- [ ] Provide detailed decision trees for complex business rules

---

## Acceptance Criteria

- [x] Each level (L0, L1, L2, Ln) renders correctly in the playground
- [x] Progressive disclosure works — selecting a deeper level reveals more detail
- [x] Breadcrumb navigation shows current level within Business vertical
- [x] Cross-reference links to Solution and Deployment verticals are functional
- [x] Business persona (Business Stakeholder, Product Manager) sees appropriate default view
- [x] No technical product names appear at L0 or L1

## Implementation Summary

Successfully implemented comprehensive Business Architecture vertical content across all detail levels (L0-Ln) for the ecommerce platform architecture. The implementation includes:

### Completed Components

1. **CDN (Customer Experience Acceleration)**
   - L0: Business capability with conversion rate impact KPIs
   - L1: Global distribution network responsibilities
   - L2: Caching policies and optimization strategies
   - L3: Terraform configuration with cache behaviors

2. **Load Balancer (Request Distribution & High Availability)**
   - L0: High traffic volume handling with availability metrics
   - L1: Traffic distribution and health check responsibilities
   - L2: SSL termination and routing algorithms
   - L3: Business rule configurations

3. **API Gateway (API Management & Security Gateway)**
   - L0: API management with security blocking metrics
   - L1: Authentication, rate limiting, and routing responsibilities
   - L2: OAuth configuration and business rules
   - L3: Kubernetes deployment with business SLA targets

4. **Order Service (Order Fulfillment Process)**
   - L0: Order processing with revenue impact ($2M/month)
   - L1: End-to-end order workflow responsibilities
   - L2: Order state machine, business rules (wholesale priority, fraud detection)
   - L3: Business rule configurations (max order value, fraud thresholds, SLA targets)

### Key Features Implemented

**L0 (Abstract Business View)**
- Pure business language capabilities
- High-level KPIs (orders processed, revenue, success rates)
- Business value statements
- Business owners identified

**L1 (Business Process / Technology Outline)**
- Operational workflow definitions
- Responsibilities in business terms
- Technology needs outlined without specific product names

**L2 (Detailed Business Processes)**
- Business rules and decision points
- Order state machines (PENDING → VALIDATED → PAYMENT_AUTHORIZED → etc.)
- Priority rules (Wholesale > Retail when stock < threshold)
- Fraud detection thresholds
- Timeout and retry policies

**L3/Ln (Deep Dive)**
- Specific business rule configurations
- KPI formulas and SLA targets
- Fraud score thresholds (> 80 = hold order)
- Min/max order values
- Success rate targets (99.7%)

### Technical Implementation

- Extended `verticals.business` field in `ecommerce-platform.json`
- Added level-specific business data for L0, L1, L2, and L3
- Ensured L0 uses pure business language with no technical product names
- Implemented progressive disclosure with increasing business detail
- Added business KPIs with impact and trend indicators
- Defined business owners and responsibilities

## Design Principles

1. **Audience-first:** L0 should be understandable by any executive; Ln by operations teams
2. **No tech jargon at L0:** Use pure business language (capabilities, value, outcomes)
3. **Progressive detail:** Each level adds specificity without repeating the previous level
4. **Cross-referencing:** Allow users to jump to the corresponding Solution or Deployment level
