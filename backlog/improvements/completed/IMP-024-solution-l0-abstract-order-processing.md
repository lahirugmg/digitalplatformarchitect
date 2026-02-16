# IMP-024: Solution Architecture L0 — Abstract Order Processing System

**Status:** Completed
**Priority:** High
**Category:** Architecture Playground / Solution Architecture
**Effort:** Medium
**Created:** 2026-02-16
**Completed:** 2026-02-16
**Depends On:** IMP-023
**File Reference:** image_88cb47.png

---

## Overview

Implement the **Solution Architecture L0 (Abstract Solution)** diagram for the Order Processing System example in the interactive architecture playground. This diagram represents the logical view of the system, focusing on data flow and actor interaction without specifying the underlying technology stack. It answers the question: *"How does the business functionally handle orders from different sources?"*

---

## Core Components & Flows

### Inbound Channels (Sources)

#### Wholesale Customers
- Interact via asynchronous, legacy channels
- Channels: **Email** and logical **Files**
- Represents B2B order intake

#### Retail Customers
- Interact via real-time digital channels
- Channel: **Website**
- Represents B2C order intake

### Integration Layer

#### API Manager
- Governs traffic from the Website (Retail)
- Acts as the front door for real-time digital requests
- No product name at L0 — shown as a generic capability

#### Integrator
- The central orchestration point
- Unifies traffic by receiving data from both:
  - **Wholesale** channels (directly via Email/Files)
  - **Retail** channels (via the API Manager)
- Responsible for routing, transformation, and mediation

### Core Processing

#### ERP / Internal Systems
- The system of record
- Responsible for **Order Collection & Processing**
- Shown as a black box at L0 (internal modules hidden)

### Outbound Fulfillment

- Once processed, the ERP triggers external actions:
  - **Suppliers** — for restocking / dropshipping
  - **Delivery Partners** — for logistics and shipping

---

## Implementation Tasks

- [ ] Create abstract nodes for all components (no product names)
  - [ ] Wholesale Customers (external actor)
  - [ ] Retail Customers (external actor)
  - [ ] Email channel node
  - [ ] Files channel node
  - [ ] Website channel node
  - [ ] API Manager (generic)
  - [ ] Integrator (generic)
  - [ ] ERP / Internal Systems (black box)
  - [ ] Suppliers (external actor)
  - [ ] Delivery Partners (external actor)
- [ ] Define data flow connections
  - [ ] Wholesale → Email → Integrator
  - [ ] Wholesale → Files → Integrator
  - [ ] Retail → Website → API Manager → Integrator
  - [ ] Integrator → ERP
  - [ ] ERP → Suppliers
  - [ ] ERP → Delivery Partners
- [ ] Group nodes into logical zones
  - [ ] Inbound Channels zone (left)
  - [ ] Integration Layer zone (center-left)
  - [ ] Core Processing zone (center)
  - [ ] Outbound Fulfillment zone (right)
- [ ] Add to ecommerce-platform.json or create new order-processing.json dataset
- [ ] Ensure Business persona sees capability names only
- [ ] Verify no technology/product names appear at L0

---

## Acceptance Criteria

- [x] All 10 nodes render correctly in the playground at L0
- [x] Data flows clearly show the order journey from inbound to outbound
- [x] External actors (Wholesale, Retail, Suppliers, Delivery Partners) are visually distinct
- [x] Integration Layer appears as a generic orchestration capability
- [x] ERP is a black box — no internal modules visible
- [x] Diagram is understandable by non-technical stakeholders
- [x] Cross-reference link to L1 (IMP-025) is available

## Implementation Summary

Successfully implemented the **L0 Abstract Solution Architecture** for the Order Processing System in [order-processing.json](../../../lib/architecture-playground/data/order-processing.json).

### Components Implemented (11 total)

**External Actors (4):**
1. **Wholesale Customers** - B2B customers using asynchronous channels
2. **Retail Customers** - B2C customers using real-time digital channels
3. **Suppliers** - External suppliers for inventory fulfillment
4. **Delivery Partners** - Logistics partners for shipping

**Inbound Channels (3):**
5. **Email Orders** - Asynchronous email-based order intake
6. **File Orders** - Asynchronous file-based order intake (generic at L0, EDI at L1)
7. **Website** - Real-time web storefront

**Integration Layer (2):**
8. **API Manager** - Generic API governance platform (no "WSO2" at L0)
9. **Integrator** - Generic central orchestration point (no "WSO2" at L0)

**Core Processing (1):**
10. **ERP / Internal Systems** - Black box system of record (no "SAP" at L0, no module details)

**Observability (1):**
11. **ELK Analytics** - Hidden at L0, only visible at L1+ (observability emergence)

### Data Flows Implemented (12 connections)

**Inbound Flows:**
- Wholesale → Email → Integrator
- Wholesale → Files → Integrator
- Retail → Website → API Manager → Integrator

**Core Processing:**
- Integrator → ERP (unified order stream)

**Outbound Flows:**
- ERP → Suppliers (restock requests)
- ERP → Delivery Partners (shipping requests)

**Observability (L1+ only):**
- API Manager → ELK Analytics (logs/metrics)
- Integrator → ELK Analytics (logs/metrics)

### Zones Implemented (5 logical zones)

1. **Inbound Channels** - Customer-facing order intake
2. **Integration Layer** - API management and orchestration
3. **Core Processing** - ERP system of record
4. **Outbound Fulfillment** - Supply chain and delivery partners
5. **Observability** - Monitoring and analytics (L1+ only)

### Key L0 Principles Maintained

✅ **Zero Technology Names**: "API Manager" not "WSO2", "Integrator" not "WSO2", "ERP" not "SAP"
✅ **Black Box ERP**: No internal modules visible (Sales, Purchasing, Manufacturing hidden until L1)
✅ **Generic Channels**: "Files" not "EDI", simple capability descriptions
✅ **Flow-Centric Design**: Clear data flow from inbound → integration → processing → outbound
✅ **Actor Clarity**: External actors (customers, suppliers, delivery) clearly distinguished
✅ **Observability Hidden**: ELK Analytics visibility starts at L1 (minLevel: "L1")

## Design Principles

1. **Technology-agnostic:** No product names, protocols, or vendor references
2. **Flow-centric:** Emphasis on how data moves from source to fulfillment
3. **Actor clarity:** Clear distinction between internal systems and external actors
4. **Black-box ERP:** Internal structure deferred to deeper levels
