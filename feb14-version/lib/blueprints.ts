export type BlueprintView = {
  slug: string;
  title: string;
  summary: string;
  diagram?: "platform-ha-logical" | "platform-ha-deployment";
};

export type Blueprint = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  views: BlueprintView[];
};

export const platformBlueprints: Record<string, Blueprint> = {
  "small-ha": {
    slug: "small-ha",
    title: "Small Enterprise HA Platform",
    summary:
      "Single-region highly available deployment for API Management, Integration, and IAM with shared observability.",
    tags: ["HA", "API Management", "Integration", "Identity", "Kubernetes"],
    views: [
      {
        slug: "business-goals",
        title: "Business Goals",
        summary:
          "Improve developer productivity and partner onboarding while meeting security and availability targets (99.9%+)."
      },
      {
        slug: "capability-map",
        title: "Capability Map",
        summary:
          "API Management, Enterprise Integration, Identity & Access Management, Observability, and Platform Runtime."
      },
      {
        slug: "logical-architecture",
        title: "Logical Architecture",
        summary:
          "API gateway with developer portal, integration runtime, and identity services, integrated with observability and data stores.",
        diagram: "platform-ha-logical"
      },
      {
        slug: "deployment-blueprint",
        title: "Deployment Blueprint",
        summary:
          "Kubernetes with ingress/WAF, separate node pools per workload, data services, and shared observability.",
        diagram: "platform-ha-deployment"
      }
    ]
  },
  "microservices-platform": {
    slug: "microservices-platform",
    title: "Microservices Platform Blueprint",
    summary:
      "Cloud-native microservices platform with service mesh, observability, and developer experience tools.",
    tags: ["Microservices", "Service Mesh", "Cloud-native", "DevEx", "Observability"],
    views: [
      {
        slug: "business-goals",
        title: "Business Goals",
        summary:
          "Enable rapid feature delivery, team autonomy, and scalable system architecture for growing organizations."
      },
      {
        slug: "capability-map",
        title: "Capability Map",
        summary:
          "Container Orchestration, Service Mesh, API Gateway, Identity Management, CI/CD, and Observability."
      },
      {
        slug: "logical-architecture",
        title: "Logical Architecture",
        summary:
          "Containerized microservices with service mesh, centralized logging, distributed tracing, and automated deployment pipelines."
      },
      {
        slug: "deployment-blueprint",
        title: "Deployment Blueprint",
        summary:
          "Multi-zone Kubernetes clusters with service mesh, GitOps workflows, and comprehensive monitoring stack."
      }
    ]
  }
};

export const blueprintList = Object.values(platformBlueprints);

