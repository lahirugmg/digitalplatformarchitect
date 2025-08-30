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
  "message-broker": {
    slug: "message-broker",
    title: "Message Broker",
    summary:
      "Reliable message delivery and decoupling via queues, topics, and pub/sub.",
    keywords: ["async", "pub/sub", "queues", "decoupling", "routing"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "A message broker routes and stores messages between producers and consumers, enabling asynchronous communication, decoupling, and back-pressure handling."
      },
      {
        kind: "list",
        title: "Responsibilities",
        items: [
          "Durable queues and topics with ordered delivery where needed",
          "Routing (direct, fanout, topic, headers)",
          "Dead-letter, retry, and back-off policies",
          "Observability: tracing, metrics, DLQ visibility"
        ]
      },
      {
        kind: "list",
        title: "Core capabilities",
        items: [
          "At-least-once and exactly-once semantics (where supported)",
          "Consumer groups and competing consumers",
          "Security: TLS, mTLS, authz per vhost/exchange/queue",
          "Multi-tenant isolation and quotas"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Pub/sub with topic routing",
          "Competing consumers for throughput scaling",
          "Transactional outbox for reliable emission",
          "Saga orchestration with compensations"
        ]
      },
      {
        kind: "list",
        title: "Tech examples",
        items: ["RabbitMQ", "ActiveMQ Artemis", "Azure Service Bus", "AWS SQS"]
      },
      {
        kind: "list",
        title: "KPIs/SLIs",
        items: [
          "Publish/consume latency p95/p99",
          "Redelivery and DLQ rate",
          "Consumer lag/backlog size",
          "Availability and partition tolerance events"
        ]
      }
    ]
  },
  "streaming-platform": {
    slug: "streaming-platform",
    title: "Streaming Platform",
    summary:
      "High-throughput event streaming, retention, and stateful processing at scale.",
    keywords: ["kafka", "event streams", "cdc", "flink", "ksqldb"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "A log-based distributed system for append-only event streams with retention, replay, and stream processing for real-time and near-real-time workloads."
      },
      {
        kind: "list",
        title: "Responsibilities",
        items: [
          "Durable partitioned logs with retention policies",
          "Consumer group coordination and offset management",
          "Schema governance and compatibility",
          "Stream processing runtime and connectors"
        ]
      },
      {
        kind: "list",
        title: "Core capabilities",
        items: [
          "Exactly-once processing (EOS) in pipelines",
          "Change Data Capture (CDC) ingestion",
          "Schema registry with compatibility checks",
          "Tiered storage and multi-region replication"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Event sourcing and CQRS",
          "Log compaction for state streams",
          "Streaming ETL and materialized views",
          "Data mesh domain event contracts"
        ]
      },
      {
        kind: "list",
        title: "Tech examples",
        items: ["Apache Kafka", "Redpanda", "Pulsar", "Flink", "ksqlDB"]
      },
      {
        kind: "list",
        title: "KPIs/SLIs",
        items: [
          "Producer/consumer throughput",
          "End-to-end event latency",
          "Consumer lag and rebalance stability",
          "Schema evolution failures"
        ]
      }
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
        items: ["MuleSoft", "Boomi", "Camel", "WSO2", "Azure Integration Services"]
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
      "Design, publish, secure, and observe APIs as products across the enterprise.",
    keywords: ["api gateway", "policies", "rate limiting", "portal"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "API management provides the control plane and runtime for exposing services with policies for security, reliability, and consumption management."
      },
      {
        kind: "list",
        title: "Responsibilities",
        items: [
          "Gateway runtime and policy enforcement",
          "Developer portal and access workflows",
          "Versioning, lifecycle, and monetization (if needed)",
          "Analytics and consumer insights"
        ]
      },
      {
        kind: "list",
        title: "Core capabilities",
        items: [
          "Authentication and authorization policies",
          "Rate limiting, quotas, and caching",
          "Schema/contract governance and testing",
          "Multi-environment publishing and CI/CD"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Gateway per domain vs. centralized",
          "Backend-for-frontend (BFF)",
          "Zero-trust with service mesh",
          "Event-driven APIs (Webhooks, AsyncAPI)"
        ]
      },
      {
        kind: "list",
        title: "Tech examples",
        items: ["Kong", "Apigee", "WSO2", "Azure API Management", "Tyk"]
      },
      {
        kind: "list",
        title: "KPIs/SLIs",
        items: [
          "API latency and error rate",
          "Consumer growth and retention",
          "Policy violations and blocked calls",
          "Time-to-first-call"
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
        items: ["Keycloak", "Auth0", "Azure AD", "Okta", "SPIRE"]
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
        items: ["Backstage", "Humanitec", "Port", "Internal", "Harness IDP"]
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
};

export const blockList = Object.values(blocks);

