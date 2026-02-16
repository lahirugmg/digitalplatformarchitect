# IMP-025: Solution Architecture L1 — High-Level Technologies for Order Processing

**Status:** Completed
**Priority:** High
**Category:** Architecture Playground / Solution Architecture
**Effort:** Medium
**Created:** 2026-02-16
**Completed:** 2026-02-16
**Depends On:** IMP-023, IMP-024
**File Reference:** image_88cb6a.png

---

## Overview

Implement the **Solution Architecture L1 (High-Level Technologies)** diagram for the Order Processing System example in the interactive architecture playground. This diagram maps the logical blocks from L0 to specific technology choices (products/platforms) and adds necessary operational components like analytics. It represents the physical/component view of the same system.

---

## Specific Technology Mapping (L0 → L1)

### Inbound Enhancements

| L0 (Abstract) | L1 (Technology) |
|---|---|
| Files | **EDI Files** (Electronic Data Interchange) — structured B2B standard |
| Email | Email (unchanged) |
| Website | Website (unchanged) |

### Middleware Stack (Integration Layer)

#### WSO2 API Manager
- Replaces the generic "API Manager" from L0
- Reveals internal sub-components:
  - **Gateway** — traffic handling, rate limiting, routing
  - **Control Plane** — policy management, subscription handling, developer portal

#### WSO2 Integrator
- Replaces the generic "Integrator" from L0
- Handles mediation between:
  - EDI files (B2B wholesale)
  - API Gateway (retail traffic)
  - Backend ERP system

### Core System

#### SAP ERP
- Replaces the generic "ERP / Internal Systems" black box from L0
- L0 black box is opened to reveal specific SAP modules:
  - **Sales** — order management, pricing, customer accounts
  - **Purchasing** — procurement, supplier management
  - **Manufacturing** — production planning, inventory

### Observability (New at L1)

#### ELK Analytics
- **New component** added at this level (not present in L0)
- Receives logs and metrics from:
  - WSO2 API Manager
  - WSO2 Integrator
- Purpose: monitoring system health and transaction tracing

### Partner Specifics

| L0 (Abstract) | L1 (Technology) |
|---|---|
| Delivery Partners | **DHL**, **FedEx**, **UPS** — specific vendors identified |
| Suppliers | Suppliers (further detail at L2) |

---

## Implementation Tasks

- [ ] Update component nodes with technology-specific names
  - [ ] Files → EDI Files
  - [ ] API Manager → WSO2 API Manager (with Gateway + Control Plane sub-nodes)
  - [ ] Integrator → WSO2 Integrator
  - [ ] ERP → SAP ERP (with Sales, Purchasing, Manufacturing sub-nodes)
  - [ ] Delivery Partners → DHL, FedEx, UPS
- [ ] Add new L1-only components
  - [ ] ELK Analytics node
  - [ ] Log/metrics flow lines from WSO2 API Manager → ELK
  - [ ] Log/metrics flow lines from WSO2 Integrator → ELK
- [ ] Implement sub-component expansion
  - [ ] WSO2 API Manager expands to show Gateway + Control Plane
  - [ ] SAP ERP expands to show Sales, Purchasing, Manufacturing modules
- [ ] Update data flow connections
  - [ ] EDI Files → WSO2 Integrator
  - [ ] Website → WSO2 API Manager (Gateway) → WSO2 Integrator
  - [ ] WSO2 Integrator → SAP ERP
  - [ ] SAP ERP → DHL / FedEx / UPS
  - [ ] WSO2 API Manager → ELK Analytics (observability)
  - [ ] WSO2 Integrator → ELK Analytics (observability)
- [ ] Add vertical-specific content in ecommerce or order-processing dataset
  - [ ] Solution vertical L1 names and descriptions per component
- [ ] Ensure smooth transition animation from L0 → L1

---

## Acceptance Criteria

- [x] All technology-specific nodes render correctly at L1
- [x] L0 → L1 transition clearly shows the mapping from abstract to concrete
- [x] WSO2 API Manager shows Gateway and Control Plane sub-components
- [x] SAP ERP reveals Sales, Purchasing, and Manufacturing modules
- [x] ELK Analytics appears only at L1+ (not visible at L0)
- [x] Delivery Partners resolve to DHL, FedEx, UPS
- [x] EDI Files replace generic Files for wholesale channel
- [x] Observability flow lines are visually distinct (dashed or different color)
- [x] Cross-reference link to L0 (IMP-024) and L2 are available
- [x] Enterprise Architect and Implementation Lead personas see this as appropriate detail level

## Implementation Summary

Successfully implemented the **L1 High-Level Technologies Architecture** for the Order Processing System in [order-processing.json](../../../lib/architecture-playground/data/order-processing.json). This level maps L0 abstractions to concrete technology choices.

### L0 → L1 Technology Mappings

| L0 Abstract | L1 Technology | Notes |
|-------------|---------------|-------|
| **Files** | **EDI Files (X12/EDIFACT)** | Specific B2B standard introduced |
| **Email** | **Email** | Unchanged (already concrete) |
| **Website** | **Web Application** | More specific terminology |
| **API Manager** | **WSO2 API Manager** | Product name + sub-components |
| **Integrator** | **WSO2 Integrator (Micro Integrator)** | Product name introduced |
| **ERP / Internal Systems** | **SAP ERP** | Black box opened with modules |
| **Suppliers** | **Suppliers** | Unchanged at L1 |
| **Delivery Partners** | **DHL, FedEx, UPS** | Specific vendors named |
| N/A | **ELK Analytics** | NEW - emerges at L1 for observability |

### Sub-Component Expansions at L1

**1. WSO2 API Manager → Gateway + Control Plane**
- **Gateway**: Traffic handling, rate limiting, routing
- **Control Plane**: Policy management, subscriptions, developer portal

**2. SAP ERP → Sales + Purchasing + Manufacturing**
- **Sales Module**: Order management, pricing, customer accounts
- **Purchasing Module**: Procurement, supplier management
- **Manufacturing Module**: Production planning, inventory

### New Components at L1

**ELK Analytics Stack**
- **Purpose**: Observability platform for logs, metrics, and transaction tracing
- **Components**: Elasticsearch 8.11, Logstash 8.11, Kibana 8.11
- **Integrations**:
  - Receives logs from WSO2 API Manager
  - Receives logs from WSO2 Integrator
- **Visibility**: `minLevel: "L1"` (not visible at L0)
- **Rationale**: Operational visibility is an L1 concern, not present in abstract L0

### Technology-Specific Details Added

**Middleware Stack:**
- WSO2 API Manager 4.2
- WSO2 Micro Integrator 4.2
- PostgreSQL 15 (API Manager database)
- RabbitMQ 3.12 (Integrator message queue)

**ERP System:**
- SAP ERP 6.0 EHP8
- SAP HANA 2.0 database
- Modules: SD (Sales), MM (Purchasing), PP (Manufacturing)

**Communication Protocols (L1 labels):**
- SMTP Email Orders
- EDI X12/EDIFACT Files
- HTTPS Web Traffic
- REST API / JSON (API Manager → Integrator)
- SAP BAPI / IDoc (Integrator → ERP)
- Carrier API / EDI (ERP → Delivery Partners)

### Observability Flow Lines

Added distinct observability connections (dashed, gray color):
- **API Manager → ELK Analytics**: Logs & Metrics
- **Integrator → ELK Analytics**: Logs & Metrics

These connections are only visible at L1+ to maintain L0 simplicity.

### Progressive Disclosure Features

✅ **Technology Emergence**: Product names first appear at L1
✅ **Black Box Opening**: ERP expands to show internal SAP modules
✅ **Sub-Component Detail**: WSO2 API Manager shows Gateway + Control Plane
✅ **Observability Visibility**: ELK Analytics emerges at L1
✅ **Vendor Specificity**: Delivery partners resolve to DHL, FedEx, UPS
✅ **Protocol Details**: Connection labels show specific protocols (BAPI, IDoc, EDI)

## Design Principles

1. **Technology introduction:** L1 is where product/vendor names first appear
2. **Black box opening:** L0 abstractions expand to show internal structure
3. **Observability emergence:** Monitoring and analytics appear at L1, not L0
4. **Traceability:** Every L1 component maps back to an L0 abstract block
5. **New components justified:** ELK appears because operational visibility is a L1 concern
