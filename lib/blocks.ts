export type Block = {
  slug: string;
  title: string;
  summary: string;
  sections: Array<
    | { kind: "text"; title: string; body: string }
    | { kind: "list"; title: string; items: string[] }
  >;
  keywords: string[];
};

export const blocks: Record<string, Block> = {
  "messaging-streaming-platform": {
    slug: "messaging-streaming-platform",
    title: "Messaging & Streaming Platform",
    summary:
      "Asynchronous messaging and streaming infrastructure for decoupled, reactive systems — from simple queues/topics to log-based streams and processing, with comprehensive security and observability.",
    keywords: ["messaging", "pub/sub", "streams", "cdc", "eda", "security", "observability"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A comprehensive platform capability that provides messaging and streaming infrastructure to enable event-driven architectures. It spans simple messaging (queues/topics) and streaming (partitioned logs) with retention and replay, integrated with enterprise-grade security and observability." },
      { kind: "list", title: "Modes", items: [
        "Simple messaging: queues & topics for work dispatch, decoupling, and back-pressure (e.g., RabbitMQ, SQS)",
        "Streaming: append-only, partitioned logs for high-throughput events, replay, and stateful processing (e.g., Kafka, Pulsar)",
        "Hybrid: combining messaging reliability with streaming scale and retention"
      ]},
      { kind: "list", title: "Core Responsibilities", items: [
        "Durable delivery, ordering where required, and intelligent routing",
        "Consumer groups, auto-scaling, circuit breakers, and dead letter queues",
        "Schema governance, compatibility, and event catalog management",
        "End-to-end observability with distributed tracing and metrics",
        "Security: encryption, authentication, authorization, and audit trails",
        "Compliance: data retention policies, GDPR/privacy, and regulatory requirements"
      ]},
      { kind: "list", title: "Security & Compliance Capabilities", items: [
        "End-to-end encryption (TLS 1.3, mTLS) and data-at-rest encryption",
        "Fine-grained access control (RBAC, ABAC) with service identities",
        "Audit logging and compliance reporting for regulated industries",
        "Data sovereignty and residency controls",
        "Vulnerability scanning and security patching automation",
        "Zero-trust networking with service mesh integration"
      ]},
      { kind: "list", title: "Observability & Monitoring", items: [
        "Distributed tracing with OpenTelemetry integration",
        "Real-time metrics: throughput, latency, consumer lag, error rates",
        "Automated alerting on SLA breaches and system anomalies",
        "Log aggregation and correlation across event streams",
        "Performance profiling and bottleneck detection",
        "Business metrics: event volume, processing success rates, data quality"
      ]},
      { kind: "list", title: "Architecture Patterns", items: [
        "Pub/sub topics with competing consumers and load balancing",
        "Transactional outbox and saga orchestration patterns",
        "Event sourcing + CQRS with snapshotting and replay",
        "Streaming ETL with windowing and stateful processing",
        "Event-driven microservices with circuit breakers",
        "Change Data Capture (CDC) with exactly-once processing"
      ]},
      { kind: "list", title: "Performance & Reliability Patterns", items: [
        "Partitioning strategies for horizontal scaling",
        "Backpressure handling and flow control mechanisms",
        "Idempotent processing and duplicate detection",
        "Graceful degradation and chaos engineering readiness",
        "Multi-region replication and disaster recovery",
        "Auto-healing and self-balancing consumer groups"
      ]},
      { kind: "list", title: "Tech Examples", items: [
        "Apache Kafka (with Kafka Streams, ksqlDB, Schema Registry)",
        "Redpanda (high-performance Kafka-compatible)",
        "RabbitMQ (with clustering and federation)",
        "AWS MSK, EventBridge, SQS/SNS",
        "Azure Event Hubs, Service Bus",
        "Google Pub/Sub, Cloud Tasks"
      ]},
      { kind: "list", title: "KPIs/SLIs/SLOs", items: [
        "End-to-end latency (P50, P95, P99) and throughput",
        "Message delivery success rate and duplicate rates",
        "Consumer lag/backlog and processing time",
        "System availability and MTTR for incidents",
        "Security: unauthorized access attempts and compliance violations",
        "Cost efficiency: resource utilization and scaling events"
      ]}
    ]
  },
  "enterprise-integration": {
    slug: "enterprise-integration",
    title: "Enterprise Integration",
    summary:
      "Patterns and tooling to connect heterogeneous systems reliably and securely.",
    keywords: ["eip", "etl", "connectors", "edi", "soi"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "Integration services enable interoperability across SaaS, legacy, and bespoke systems using a mix of synchronous and asynchronous patterns."
      },
      {
        kind: "list",
        title: "Responsibilities",
        items: [
          "Connectivity (REST, SOAP, JDBC, SFTP, EDI)",
          "Mediation (mapping, transformation, enrichment)",
          "Orchestration and routing",
          "Operational visibility and error handling"
        ]
      },
      {
        kind: "list",
        title: "Core capabilities",
        items: [
          "Connector catalog and lifecycle",
          "Contract-first transformations and testing",
          "Secrets management and policy enforcement",
          "Self-service integration pipelines"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Canonical data models",
          "Event-driven integration",
          "File-based and batch with idempotency",
          "Edge adapters and strangler patterns"
        ]
      },
      {
        kind: "list",
        title: "Tech examples",
        items: ["WSO2 Integrator: Ballerina Integrator", "WSO2 IPaaS solution: Devant", "MuleSoft", "Boomi", "Apache Camel", "Spring Integration", "Azure Integration Services"]
      },
      {
        kind: "list",
        title: "KPIs/SLIs",
        items: [
          "Success rate and MTTR for integrations",
          "Throughput and latency per flow",
          "Change lead time and failure rate",
          "Partner SLA adherence"
        ]
      }
    ]
  },
  "api-management": {
    slug: "api-management",
    title: "API Management",
    summary:
      "Complete API lifecycle management platform enabling secure exposure, governance, and monetization of digital services across the enterprise.",
    keywords: ["api gateway", "developer portal", "policies", "rate limiting", "monetization", "analytics"],
    sections: [
      {
        kind: "text",
        title: "What it delivers",
        body:
          "A comprehensive platform that transforms your services into managed API products. From design to retirement, every API gets professional-grade security, monitoring, and developer experience - enabling innovation while maintaining control."
      },
      {
        kind: "list",
        title: "API Design & Lifecycle Management",
        items: [
          "Graphical and declarative API design with OpenAPI/AsyncAPI support",
          "Version management with backward compatibility validation",
          "Lifecycle states: draft → published → deprecated → retired",
          "Contract-first development with mock servers and testing",
          "Automated CI/CD integration with quality gates"
        ]
      },
      {
        kind: "list",
        title: "Gateway & Traffic Management",
        items: [
          "High-performance request routing and intelligent load balancing",
          "Dynamic rate limiting and throttling with burst protection",
          "Response caching and compression for optimal performance",
          "Circuit breakers and failover for resilience",
          "Multi-region deployment with global traffic management"
        ]
      },
      {
        kind: "list",
        title: "Security & Policy Enforcement",
        items: [
          "OAuth2, JWT, API keys, and mutual TLS authentication",
          "Fine-grained RBAC and scope-based access control",
          "Request/response transformation and validation",
          "Threat protection: SQL injection, XXE, DDoS mitigation",
          "Compliance frameworks: PCI-DSS, GDPR, SOX support"
        ]
      },
      {
        kind: "list",
        title: "Developer Experience & Discovery",
        items: [
          "Self-service developer portals with interactive documentation",
          "API catalog with search, filtering, and recommendations",
          "Sandbox environments and try-it-now capabilities",
          "SDK generation and code samples in multiple languages",
          "Subscription workflows with automated approval processes"
        ]
      },
      {
        kind: "list",
        title: "Monetization & Business Models",
        items: [
          "Flexible subscription tiers and usage-based pricing",
          "Pay-per-call, freemium, and enterprise licensing options",
          "Billing integration with Stripe, PayPal, and enterprise systems",
          "Usage analytics and revenue optimization insights",
          "Partner marketplace and revenue sharing capabilities"
        ]
      },
      {
        kind: "list",
        title: "Analytics & Business Intelligence",
        items: [
          "Real-time dashboards with API performance metrics",
          "Consumer behavior analytics and adoption tracking",
          "Error analysis with root cause identification",
          "Predictive analytics for capacity planning",
          "Custom reports and automated alerting",
          "AI-powered insights for API optimization"
        ]
      },
      {
        kind: "list",
        title: "Governance & Enterprise Scale",
        items: [
          "Multi-tenant architecture with organizational isolation",
          "Centralized governance with delegated workspace management",
          "Policy templates and standardization frameworks",
          "Audit trails and compliance reporting",
          "Role-based administration and approval workflows",
          "Enterprise SSO and directory integration"
        ]
      },
      {
        kind: "list",
        title: "MCP Hub & Server Management",
        items: [
          "Model Context Protocol (MCP) server registry and discovery",
          "MCP hub for centralized protocol server management",
          "Dynamic MCP server routing and load balancing",
          "Protocol version negotiation and compatibility management",
          "MCP server health monitoring and automatic failover",
          "Resource and tool exposure management across MCP servers",
          "Context sharing and state management between MCP sessions",
          "MCP server authentication and authorization policies"
        ]
      },
      {
        kind: "list",
        title: "AI & Advanced Integration",
        items: [
          "AI gateway for LLM API management and cost control",
          "Intelligent request routing and performance optimization",
          "Automated API documentation generation",
          "Anomaly detection and predictive maintenance",
          "Event streaming integration for real-time APIs",
          "Kubernetes operators and cloud-native deployment"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Microgateway and distributed deployment models",
          "Backend-for-frontend (BFF) and API aggregation",
          "Zero-trust architecture with service mesh integration",
          "Event-driven APIs with webhooks and streaming",
          "Multi-cloud and hybrid deployment strategies"
        ]
      },
      {
        kind: "list",
        title: "Technology stack",
        items: [
          "WSO2 API Manager (comprehensive open-source platform)",
          "WSO2 Choreo (cloud-native API management)",
          "Kong Gateway (high-performance runtime)",
          "Google Apigee (enterprise-grade with AI)",
          "Azure API Management (cloud-integrated)",
          "Tyk (developer-focused with GraphQL support)"
        ]
      },
      {
        kind: "list",
        title: "Success metrics",
        items: [
          "Developer adoption: time-to-first-successful-call < 15 minutes",
          "API performance: P99 latency targets and 99.9% uptime",
          "Business impact: revenue per API and partner onboarding velocity",
          "Security posture: zero security incidents and policy compliance",
          "Developer satisfaction: NPS scores and portal engagement",
          "Operational efficiency: deployment frequency and change success rate"
        ]
      }
    ]
  },
  "identity-access-management": {
    slug: "identity-access-management",
    title: "Identity & Access Management",
    summary:
      "Centralized identity, authentication, authorization, and federation for users and services.",
    keywords: ["iam", "oidc", "saml", "rbac", "pki"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "IAM provides digital identity lifecycle, authn/z, federation, and policy enforcement for humans and workloads across the estate."
      },
      {
        kind: "list",
        title: "Responsibilities",
        items: [
          "Identity lifecycle (provisioning, deprovisioning)",
          "Authentication (MFA, risk-based)",
          "Authorization (RBAC, ABAC, PBAC)",
          "Federation (OIDC/SAML) and secrets/PKI"
        ]
      },
      {
        kind: "list",
        title: "Core capabilities",
        items: [
          "Policy as code and centralized auditing",
          "Service-to-service identity (mTLS, SPIFFE/SPIRE)",
          "Just-in-time and just-enough access",
          "Zero trust posture and session management"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Token-based auth (JWT, OAuth2)",
          "Attribute and policy-based access control",
          "Federated identity across SaaS and on-prem",
          "Workload identity with short-lived creds"
        ]
      },
      {
        kind: "list",
        title: "Tech examples",
        items: ["WSO2 Identity Server", "WSO2 IAM SaaS solution Asgardeo", "Keycloak", "Auth0", "Azure AD", "Okta", "SPIRE"]
      },
      {
        kind: "list",
        title: "KPIs/SLIs",
        items: [
          "Auth success rate and latency",
          "Policy evaluation latency",
          "Credential compromise and rotation compliance",
          "Access request lead time"
        ]
      }
    ]
  },
  "internal-developer-platform": {
    slug: "internal-developer-platform",
    title: "Internal Developer Platform",
    summary:
      "Golden paths, paved roads, and self-service capabilities for teams to ship reliably.",
    keywords: ["idp", "platform engineering", "golden paths", "backstage"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "An IDP productizes the platform: templates, automation, and curated experiences that reduce cognitive load and speed delivery."
      },
      {
        kind: "list",
        title: "Responsibilities",
        items: [
          "Service templates and scaffolding",
          "Standardized CI/CD and environments",
          "Catalog and discoverability",
          "Guardrails, policies, and cost controls"
        ]
      },
      {
        kind: "list",
        title: "Core capabilities",
        items: [
          "Self-service provisioning and lifecycle ops",
          "Golden paths and docs in-context",
          "Scorecards and reliability baselines",
          "Feedback loops and platform telemetry"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Backstage or custom portal",
          "Templates + workflows as code",
          "Platform APIs and API-first integration",
          "Inner-source and contribution model"
        ]
      },
      {
        kind: "list",
        title: "Tech examples",
        items: ["WSO2 Choreo", "Backstage", "Humanitec", "Port", "Internal", "Harness IDP"]
      },
      {
        kind: "list",
        title: "KPIs/SLIs",
        items: [
          "Lead time for change",
          "Deployment frequency and change failure rate",
          "Time to onboard and time-to-first PR",
          "Developer satisfaction (DevEx surveys)"
        ]
      }
    ]
  }
  ,
  "data-platform": {
    slug: "data-platform",
    title: "Data Platform",
    summary:
      "Lakehouse, BI/analytics, and ML pipelines with governance, quality, and lineage.",
    keywords: [
      "delta lake",
      "ETL/ELT",
      "BI",
      "ML pipelines",
      "catalog"
    ],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "An enterprise data platform that ingests, stores, models, and serves analytical and operational data — enabling BI and ML with strong governance and observability."
      },
      {
        kind: "list",
        title: "Related patterns",
        items: [
          "Data Mesh (decentralized ownership, federated governance)",
          "Pipes and Filters (pipelines composition)",
          "Event-Driven Architecture (streaming ingestion)"
        ]
      },
      {
        kind: "list",
        title: "Responsibilities",
        items: [
          "Batch and streaming ingestion (CDC, connectors)",
          "Curated storage (lakehouse/warehouse) and modeling",
          "Metadata, catalog, lineage, and governance",
          "Pipelines orchestration and quality monitoring",
          "Serving: BI, ML features, and APIs"
        ]
      },
      {
        kind: "list",
        title: "Core capabilities",
        items: [
          "Medallion/layered data architecture",
          "Transformations (dbt/Spark/Flink) and orchestration",
          "Lineage, data contracts, and quality checks",
          "Feature store and reproducible ML pipelines"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Lambda/Kappa processing",
          "Data mesh with domain ownership",
          "CDC into lakes and warehouses",
          "Materialized views and serving layers"
        ]
      },
      {
        kind: "list",
        title: "Tech examples",
        items: [
          "Databricks/Delta Lake",
          "Snowflake",
          "BigQuery",
          "Apache Hudi/Iceberg",
          "dbt",
          "Airflow/Prefect"
        ]
      },
      {
        kind: "list",
        title: "KPIs/SLIs",
        items: [
          "Data freshness and completeness",
          "Pipeline success rate and duration",
          "Quality rule violations",
          "Lineage coverage"
        ]
      }
    ]
  },
  "observability-operations": {
    slug: "observability-operations",
    title: "Observability & Operations",
    summary:
      "Digital platform observability and monitoring with comprehensive telemetry, distributed tracing, and multi-layer visibility for reliable operations.",
    keywords: [
      "opentelemetry",
      "ebpf",
      "datadog",
      "distributed tracing",
      "slos",
      "metrics",
      "logging"
    ],
    sections: [
      { kind: "text", title: "What it is", body:
        "Comprehensive observability platform providing end-to-end visibility across network, application, service, and infrastructure layers. Combines signals collection, intelligent correlation, and operational guardrails to ensure reliable platform operations." },
      { kind: "list", title: "Observability Signals", items: [
        "Metrics: Time-series data for KPIs, performance, and resource utilization",
        "Logs: Structured application and system events with correlation",
        "Traces: Distributed request flow across microservices",
        "Profiles: Application performance profiling and resource analysis",
        "Events: Business and system events for correlation and alerting"
      ]},
      { kind: "list", title: "Data Collection Architecture", items: [
        "eBPF agents on nodes for network-level TCP Layer 4 observability",
        "OpenTelemetry (OTel) SDK/auto-instrumentation in applications",
        "OTel Collector or DataDog Agent on each node/sidecar",
        "Custom collectors for legacy systems and specialized protocols",
        "Synthetic monitoring and real user monitoring (RUM)"
      ]},
      { kind: "list", title: "Backend & Analytics", items: [
        "DataDog Metrics, APM, RUM, Synthetics, Security monitoring",
        "ELK Stack for log aggregation and search",
        "Prometheus/Grafana for metrics and alerting",
        "Jaeger/Tempo for distributed tracing storage",
        "Time-series databases with retention policies"
      ]},
      { kind: "list", title: "Network-Level Observability", items: [
        "TCP Layer 4 monitoring using eBPF technology",
        "Network traffic analysis across Identity Server, Gateway, and microservices",
        "Connection tracking, bandwidth utilization, and latency monitoring",
        "Network security monitoring and anomaly detection",
        "CNI health monitoring and kube-proxy error tracking"
      ]},
      { kind: "list", title: "Application-Level Observability", items: [
        "API statistics: error rates, HTTP response codes, latency",
        "Gateway and Identity Provider metrics publishing",
        "Application performance monitoring (APM)",
        "Business metrics and user journey tracking",
        "Code-level insights and performance bottleneck identification"
      ]},
      { kind: "list", title: "Service-Level Observability", items: [
        "Distributed tracing: Gateway → Identity Server → Microservice → DB",
        "W3C traceparent/tracestate propagation with B3 fallback",
        "Span attributes: api.name, api.operation, tenant, auth.method, user.flow",
        "Tail-based and dynamic sampling for performance optimization",
        "Trace-log correlation with trace_id/span_id injection"
      ]},
      { kind: "list", title: "Runtime & Infrastructure Observability", items: [
        "Kubernetes: Node pressure, pod restarts, OOMKilled, HPA/VPA behavior",
        "JVM monitoring: Heap usage, GC pause time, thread pools, JIT stats",
        "Database connections, slow queries, and performance metrics",
        "Cache hit/miss ratios, evictions, and memory utilization",
        "Message queue lag, requeue rates, and broker health"
      ]},
      { kind: "list", title: "Correlation & Context", items: [
        "Service, environment, version, region, and tenant correlation",
        "API name, user flow, and release tag tracking",
        "Cross-layer correlation between network, application, and infrastructure",
        "Business context integration with technical metrics",
        "Anomaly detection with contextual analysis"
      ]},
      { kind: "list", title: "Operational Guardrails", items: [
        "PII scrubbing and data privacy protection",
        "Intelligent sampling strategies and cost optimization",
        "Multi-tier data retention policies",
        "SLOs and error budget management",
        "Alert fatigue reduction and noise filtering"
      ]},
      { kind: "list", title: "Architecture patterns", items: [
        "RED metrics (Rate, Errors, Duration) and USE metrics (Utilization, Saturation, Errors)",
        "Centralized vs. federated observability models",
        "Event-driven alerting and correlation engines",
        "Chaos engineering and resilience testing",
        "Service mesh observability with sidecar telemetry"
      ]},
      { kind: "list", title: "Tech examples", items: [
        "DataDog (APM, Infrastructure, Logs, RUM, Synthetics)",
        "OpenTelemetry ecosystem (Collectors, SDKs, Auto-instrumentation)",
        "eBPF tools (Cilium, Falco, Pixie)",
        "ELK Stack (Elasticsearch, Logstash, Kibana)",
        "Prometheus, Grafana, Tempo, Loki",
        "Jaeger, Zipkin for distributed tracing"
      ]},
      { kind: "list", title: "KPIs/SLIs", items: [
        "MTTD (Mean Time to Detection) and MTTR (Mean Time to Recovery)",
        "SLO compliance and error budget consumption",
        "Alert precision: signal-to-noise ratio",
        "Observability coverage: trace, log, and metric completeness",
        "Platform reliability: uptime, availability, and performance SLAs"
      ]}
    ]
  },
  "security-services": {
    slug: "security-services",
    title: "Security Services",
    summary:
      "Secrets, encryption, policy, and threat detection beyond IAM — enabling zero trust.",
    keywords: ["vault", "KMS", "DLP", "threat detection", "policy"],
    sections: [
      { kind: "text", title: "What it is", body:
        "Platform security capabilities including secrets and key management, encryption, scanning, and policy enforcement across the stack." },
      { kind: "list", title: "Responsibilities", items: [
        "Secrets lifecycle and dynamic credentials",
        "Encryption (at-rest/in-transit) and key rotation",
        "Policy-as-code and admission control",
        "Vuln scanning and compliance reporting"
      ]},
      { kind: "list", title: "Core capabilities", items: [
        "Vault/KMS/HSM integration",
        "OPA/Kyverno policies",
        "SAST/DAST/dependency scanning",
        "Tokenization and data protection"
      ]},
      { kind: "list", title: "Architecture patterns", items: [
        "Zero trust and short-lived credentials",
        "Envelope encryption",
        "Shift-left security with CI/CD gates",
        "Runtime policy enforcement"
      ]},
      { kind: "list", title: "Tech examples", items: [
        "HashiCorp Vault",
        "AWS KMS/Azure Key Vault/GCP KMS",
        "OPA/Kyverno",
        "Trivy/Grype"
      ]},
      { kind: "list", title: "KPIs/SLIs", items: [
        "Rotation compliance",
        "Vulnerability MTTR",
        "Policy violation rate",
        "Secrets exposure incidents"
      ]}
    ]
  }
};

export const blockList = [
  blocks["messaging-streaming-platform"],
  blocks["enterprise-integration"],
  blocks["api-management"],
  blocks["identity-access-management"],
  blocks["internal-developer-platform"],
  blocks["data-platform"],
  blocks["observability-operations"],
  blocks["security-services"]
];
