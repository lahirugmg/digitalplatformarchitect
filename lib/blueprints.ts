export type BlueprintView = {
  slug: string;
  title: string;
  summary: string;
  diagram?: "wso2-small-ha-logical" | "wso2-small-ha-deployment";
};

export type Blueprint = {
  slug: string;
  vendor: "WSO2" | "Vendor-neutral";
  title: string;
  summary: string;
  tags: string[];
  views: BlueprintView[];
};

export const wso2Blueprints: Record<string, Blueprint> = {
  "small-ha": {
    slug: "small-ha",
    vendor: "WSO2",
    title: "WSO2 Small HA",
    summary:
      "Single-region highly available deployment for API Management, Integration, and IAM with shared observability.",
    tags: ["WSO2", "HA", "API-M", "IS", "Integration", "Kubernetes"],
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
          "WSO2 API Manager gateway + publisher/portal, Micro Integrator, and Identity Server, integrated with observability and data stores.",
        diagram: "wso2-small-ha-logical"
      },
      {
        slug: "deployment-blueprint",
        title: "Deployment Blueprint",
        summary:
          "Kubernetes with ingress/WAF, separate node pools per workload, data services, and shared observability.",
        diagram: "wso2-small-ha-deployment"
      }
    ]
  }
};

export const wso2List = Object.values(wso2Blueprints);

