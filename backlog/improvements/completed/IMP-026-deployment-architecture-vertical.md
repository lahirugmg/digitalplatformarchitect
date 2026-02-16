# IMP-026: Deployment Architecture Vertical — L0 to Ln Interactive Playground

**Status:** Completed
**Priority:** High
**Category:** Architecture Playground / Deployment Architecture
**Effort:** Large
**Created:** 2026-02-16
**Completed:** 2026-02-16
**Depends On:** IMP-023

---

## Overview

Implement the **Deployment Architecture** vertical in the interactive architecture playground. This vertical defines *where the solution runs*, focusing on infrastructure, physical/virtual resources, networking, and operational configurations. Each level progressively reveals more about the hosting strategy, infrastructure inventory, network topology, and operational tuning.

---

## Level Breakdown

### L0: Basic Platform & Components

**Concept:** High-level hosting strategy.

**Content:**
- Cloud provider selection (AWS / Azure / GCP)
- Hybrid vs. on-premise decisions
- Region selection

**Implementation Tasks:**
- [ ] Design cloud/platform provider nodes with provider logos or icons
- [ ] Add region/availability zone indicators
- [ ] Show hybrid vs. cloud-only vs. on-premise topology at a glance
- [ ] Add high-level connectivity lines between regions
- [ ] Ensure the diagram answers: "Where does this system live?"

---

### L1: High-Level Technologies in the Platform

**Concept:** Infrastructure inventory.

**Content:**
- Specific services used (e.g., Kubernetes Clusters, S3 Buckets, Load Balancers, RDS instances)

**Implementation Tasks:**
- [ ] Add infrastructure service nodes (EKS, S3, ALB, RDS, ElastiCache, etc.)
- [ ] Group services by function (compute, storage, networking, database)
- [ ] Show service-to-service dependencies
- [ ] Connect L0 platform regions to their L1 service inventory
- [ ] Add cost tier indicators where applicable

---

### L2: Network & Connections

**Concept:** Connectivity and security boundaries.

**Content:**
- VPCs
- Subnets
- Firewalls
- Security groups
- VPNs
- Peering connections

**Implementation Tasks:**
- [ ] Implement VPC boundary visualizations with CIDR annotations
- [ ] Add subnet nodes (public, private, isolated) within VPC boundaries
- [ ] Show security group and firewall rules as connection annotations
- [ ] Add VPN tunnel and peering connection lines
- [ ] Visualize ingress/egress traffic flow paths
- [ ] Add network ACL indicators

---

### L3: Detailed Ops & Scaling

**Concept:** Operational reliability configurations.

**Content:**
- Auto-scaling policies
- Redundancy setups (Multi-AZ)
- Backup schedules
- Monitoring agent placement

**Implementation Tasks:**
- [ ] Add auto-scaling group indicators with min/max/desired counts
- [ ] Show Multi-AZ redundancy visually (replicas across zones)
- [ ] Add backup schedule annotations (RPO/RTO targets)
- [ ] Place monitoring agent nodes (CloudWatch, Prometheus, Datadog)
- [ ] Show health check endpoints and failure detection paths
- [ ] Add disaster recovery flow indicators

---

### Ln: Deep Dived Diagram

**Concept:** Niche configuration details.

**Content:**
- Specific pod configurations
- Kernel tuning
- Storage volume IOPS settings
- Specific hardware wiring

**Implementation Tasks:**
- [ ] Support pod-level configuration views (resource limits, affinities, tolerations)
- [ ] Add kernel/OS tuning parameter annotations
- [ ] Show storage volume configurations (IOPS, throughput, encryption)
- [ ] Support hardware-level detail for on-premise diagrams
- [ ] Include Terraform/IaC snippet references for each configuration

---

## Acceptance Criteria

- [x] All 5 levels (L0, L1, L2, L3, Ln) render correctly in the playground
- [x] Progressive disclosure works — each level adds meaningful infrastructure detail
- [x] Breadcrumb navigation shows current level within Deployment vertical
- [x] Cross-reference links to Business and Solution verticals are functional
- [x] Implementation Lead / QA personas see L1-L2 as default views
- [x] L0 contains no specific service names — only "Cloud Provider", "Region", "Platform"
- [x] L1 introduces concrete infrastructure service names for the first time
- [x] Network topology at L2 shows clear security boundaries

## Implementation Summary

Successfully implemented comprehensive Deployment Architecture vertical content across all detail levels (L0-Ln) for the ecommerce platform architecture. The implementation provides clear infrastructure visibility from abstract hosting strategy to pod-level configuration.

### Completed Components

1. **CDN (Edge Network Infrastructure)**
   - L0: Abstract "Multi-region edge network" (no AWS/CloudFront)
   - L1: "AWS CloudFront Distribution" with 150+ edge locations
   - L2: VPC edge network, WAF, Shield, ACM certificates, subnets, security groups
   - L3: Lambda@Edge functions, WAF ACLs, SSL certificates, monitoring metrics

2. **Load Balancer (Load Balancer Infrastructure)**
   - L0: Abstract "Multi-zone traffic distribution"
   - L1: "AWS Application Load Balancer" with VPC, Target Groups, Security Groups
   - L2: Multi-AZ subnets, security group rules, target group configs, connection draining
   - L3: Terraform ALB module, health check configs, access logs, deletion protection

3. **API Gateway (API Gateway Cluster)**
   - L0: Abstract "Highly available API gateway" (no Kong/EKS)
   - L1: "Kong Gateway Cluster on EKS" with RDS, ElastiCache, NLB
   - L2: EKS in private subnets, RDS Multi-AZ, ElastiCache cluster mode, IRSA, security groups
   - L3: Pod disruption budgets, anti-affinity rules, resource limits, backup schedules, monitoring

4. **Order Service (Order Service Deployment)**
   - L0: Abstract "Scalable order processing infrastructure"
   - L1: "Kubernetes Deployment on EKS" with RDS, ElastiCache, MSK
   - L2: EKS private subnets, RDS Multi-AZ, ElastiCache, MSK, EBS gp3, service discovery
   - L3: Helm values, resource requests/limits, HPA config, PDB, anti-affinity, JAVA_OPTS, probes

### Key Features Implemented

**L0 (Basic Platform & Components)**
- Abstract hosting strategy descriptions
- No specific cloud service names
- High-level topology (multi-region, multi-zone)
- Platform-level values

**L1 (High-Level Technologies in the Platform)**
- First introduction of concrete AWS services
- Infrastructure inventory (EKS, RDS, ElastiCache, MSK, ALB, NLB)
- Service grouping by function (compute, storage, networking, database)
- SLA commitments (uptime, latency)

**L2 (Network & Connections)**
- VPC boundaries and subnet layouts (public, private, isolated)
- Security groups and firewall rules
- Multi-AZ deployment patterns
- Auto-scaling configurations
- CIDR blocks and network segmentation

**L3/Ln (Detailed Ops & Scaling)**
- Pod-level configurations (replicas, resources, affinity rules)
- Kubernetes deployment strategies (RollingUpdate, maxSurge, maxUnavailable)
- Health check configurations (readiness, liveness probes)
- Auto-scaling policies (HPA with CPU/memory targets)
- Pod disruption budgets (minAvailable: 2)
- Backup and maintenance windows
- Monitoring metrics and alerts
- Infrastructure as Code (Terraform modules)

### Technical Implementation

- Extended `verticals.deployment` field in `ecommerce-platform.json`
- Ensured L0 uses only abstract platform descriptions
- L1 introduces concrete AWS service names (EKS, RDS, ALB, etc.)
- L2 provides network topology and security boundaries
- L3 includes pod specs, Terraform variables, monitoring configs
- Comprehensive resource allocation (CPU, memory requests/limits)
- Operational configurations (probes, PDBs, anti-affinity)
- Disaster recovery and scaling policies

## Design Principles

1. **Infrastructure as layers:** Visualize compute, storage, networking as distinct layers
2. **No service names at L0:** Use "Cloud Platform" not "AWS us-east-1"
3. **Security boundaries at L2:** Network segmentation details appear only at L2 and deeper
4. **Operational detail at L3:** Scaling, monitoring, and DR appear at L3
5. **Cross-referencing:** Each deployment target should link back to its solution component and business capability
