# Business Architecture - L1: Interactive Business Process/Technology Outline

## Status
Not Started

## Priority
High

## Type
Feature Enhancement

## Description
Implement interactive visualization for Business Architecture L1 (Business Process/Technology Outline) in the landing page architecture playground. This represents the Functional Decomposition view that opens the "Black Box" from L0 to reveal the internal value streams.

## Learning Objective
Users should understand:
- Which internal business functions are required to fulfill a customer order
- How business processes are organized and interconnected
- The role of Order Management as the central orchestration point
- How retail and wholesale streams differ yet converge
- Downstream operational dependencies (inventory, support, procurement, logistics)

## Visual Component Requirements

### Core Elements to Display
1. **Distinct Channels**:
   - Retail Stream: E-commerce → Customer Experience
   - Wholesale Stream: Dedicated Wholesale Operations
   
2. **Unified Orchestration**:
   - Order Management: Central hub receiving both B2B and B2C orders
   
3. **Downstream Operations**:
   - Inventory & Fulfillment: Physical picking/packing operations
   - Customer Support: Inquiry and exception handling
   - Procurement: Restocking orders to Suppliers
   - Logistics & Delivery: Hand-off to external Delivery Partners

### Process Flows
- [ ] Retail customer order flow (E-commerce → Order Mgmt → Fulfillment → Logistics)
- [ ] Wholesale customer order flow (Wholesale Ops → Order Mgmt → Fulfillment → Logistics)
- [ ] Procurement trigger flow (Inventory levels → Procurement → Suppliers)
- [ ] Support exception flow (Customer inquiries → Customer Support → Order Mgmt)

### Interaction Features
- [ ] Highlight retail vs. wholesale streams with visual differentiation
- [ ] Show process flow animation when clicking on stream
- [ ] Magnification on critical nodes (Order Management, Fulfillment, Logistics)
- [ ] Tooltip explanations for each business function
- [ ] Expandable sections showing operation details
- [ ] Connection visualization showing dependencies between functions

## Technical Implementation Notes
- File reference: `image_8af244.png`
- Build upon L0 component architecture
- Use layered visualization (channels, orchestration, operations)
- Consider animation performance for multi-step flows
- Implement color coding for stream differentiation

## Dependencies
- [ ] L0 Business Architecture component completed
- [ ] Visual design specifications finalized
- [ ] Flow animation framework established

## Acceptance Criteria
- [ ] L1 diagram renders with all business functions visible
- [ ] Retail and wholesale streams clearly differentiated
- [ ] Order Management shown as central orchestration point
- [ ] All downstream operations properly connected
- [ ] Process flows animate smoothly without performance degradation
- [ ] Responsive on mobile and desktop views
- [ ] Accessible with proper ARIA labels and descriptions
- [ ] Integrates with playground navigation controls

## Relationship to L0
- L0 shows "Black Box" organization with external context
- L1 opens the box to reveal internal functional decomposition
- Consider visual continuity and transition between levels

## Related Tasks
- FEAT-001-BUSINESS-ARCHITECTURE-L0-INTERACTIVE-VIEW.md
- FEAT-003-BUSINESS-ARCHITECTURE-PLAYGROUND-INTEGRATION.md

## Notes
- This is the critical middle level showing business process alignment
- Demonstrates the role of Order Management as system of record
- Essential for understanding why specific technology decisions are made
- Provides context for deeper technical architecture levels (L2+)
