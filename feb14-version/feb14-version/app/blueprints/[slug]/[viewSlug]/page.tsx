import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { platformBlueprints } from "@/lib/blueprints";
import { PlatformHALogical } from "@/components/diagrams/platform/PlatformHALogical";
import { PlatformHADeployment } from "@/components/diagrams/platform/PlatformHADeployment";
import Link from "next/link";

type Props = { params: { slug: string; viewSlug: string } };

export function generateStaticParams() {
  const params: { slug: string; viewSlug: string }[] = [];
  Object.entries(platformBlueprints).forEach(([blueprintSlug, blueprint]) => {
    blueprint.views.forEach((view) => {
      params.push({ slug: blueprintSlug, viewSlug: view.slug });
    });
  });
  return params;
}

export function generateMetadata({ params }: Props): Metadata {
  const bp = platformBlueprints[params.slug];
  if (!bp) return {};
  const view = bp.views.find(v => v.slug === params.viewSlug);
  if (!view) return {};
  return { 
    title: `${view.title} - ${bp.title}`,
    description: view.summary 
  };
}

export default function BlueprintViewPage({ params }: Props) {
  const blueprint = platformBlueprints[params.slug];
  if (!blueprint) return notFound();
  
  const view = blueprint.views.find(v => v.slug === params.viewSlug);
  if (!view) return notFound();

  const renderDiagram = (id?: string) => {
    switch (id) {
      case "platform-ha-logical":
        return <PlatformHALogical />;
      case "platform-ha-deployment":
        return <PlatformHADeployment />;
      default:
        return null;
    }
  };

  // Generate content based on view type
  const getViewContent = () => {
    switch (view.slug) {
      case "business-goals":
        return {
          sections: [
            {
              title: "Strategic Objectives",
              content: [
                "Accelerate digital transformation initiatives",
                "Improve developer productivity and time-to-market",
                "Enhance partner and customer onboarding experiences",
                "Achieve enterprise-grade security and compliance",
                "Establish scalable platform foundation for growth"
              ]
            },
            {
              title: "Success Metrics",
              content: [
                "99.9%+ platform availability and reliability",
                "50% reduction in integration delivery time",
                "90% developer satisfaction with platform tools",
                "Zero security incidents related to platform vulnerabilities",
                "Support for 10x growth in API traffic and user base"
              ]
            }
          ]
        };
      case "capability-map":
        return {
          sections: [
            {
              title: "Core Platform Capabilities",
              content: [
                "API Gateway & Management: Traffic routing, policy enforcement, developer portal",
                "Integration Runtime: Message transformation, protocol mediation, connector management",
                "Identity & Access Management: Authentication, authorization, user lifecycle",
                "Observability Stack: Metrics, logging, distributed tracing, alerting",
                "Platform Runtime: Container orchestration, service mesh, configuration management"
              ]
            },
            {
              title: "Supporting Capabilities",
              content: [
                "CI/CD Pipelines: Automated testing, deployment, and rollback procedures",
                "Security Services: Certificate management, secrets handling, vulnerability scanning",
                "Data Management: Persistent storage, backup/recovery, data governance",
                "Developer Experience: Documentation, SDKs, CLI tools, local development"
              ]
            }
          ]
        };
      case "logical-architecture":
        return {
          sections: [
            {
              title: "Architecture Overview",
              content: [
                "API Management Layer: Centralized gateway for all external and internal API traffic",
                "Integration Layer: Message routing, transformation, and protocol mediation services",
                "Identity Layer: Unified authentication and authorization across all platform services",
                "Data Layer: Persistent storage with high availability and backup strategies",
                "Observability Layer: Comprehensive monitoring, logging, and distributed tracing"
              ]
            },
            {
              title: "Key Design Principles",
              content: [
                "Separation of Concerns: Clear boundaries between API, integration, and identity functions",
                "High Availability: No single points of failure, automated failover capabilities",
                "Scalability: Horizontal scaling support for all critical components",
                "Security by Design: Zero-trust architecture with comprehensive audit trails",
                "Operational Excellence: Automated deployment, monitoring, and maintenance procedures"
              ]
            }
          ]
        };
      case "deployment-blueprint":
        return {
          sections: [
            {
              title: "Infrastructure Architecture",
              content: [
                "Kubernetes Multi-Zone Deployment: Worker nodes distributed across availability zones",
                "Ingress & Load Balancing: High-availability ingress controllers with WAF integration",
                "Node Pool Separation: Dedicated node pools for different workload types and resource requirements",
                "Persistent Storage: High-performance, replicated storage for data persistence",
                "Network Architecture: Private networking with controlled ingress/egress and service mesh"
              ]
            },
            {
              title: "Operational Considerations",
              content: [
                "GitOps Deployment: All infrastructure and application deployments managed through Git workflows",
                "Auto-scaling: Horizontal and vertical pod auto-scaling based on metrics and schedules",
                "Backup & Recovery: Automated backup procedures with tested recovery processes",
                "Security Hardening: Pod security policies, network policies, and runtime security",
                "Monitoring & Alerting: Comprehensive observability stack with proactive alerting"
              ]
            }
          ]
        };
      default:
        return { sections: [] };
    }
  };

  const content = getViewContent();

  return (
    <article className="prose stack gap-lg">
      <header className="stack gap-sm">
        <Link href={`/blueprints/${params.slug}`} className="text-link">← {blueprint.title}</Link>
        <h1>{view.title}</h1>
        <p className="lede">{view.summary}</p>
      </header>

      {view.diagram && (
        <section className="stack gap-sm">
          <h2>Architecture Diagram</h2>
          <div className="diagram">
            {renderDiagram(view.diagram)}
          </div>
        </section>
      )}

      {content.sections.map((section, idx) => (
        <section key={idx} className="stack gap-sm">
          <h2>{section.title}</h2>
          <ul>
            {section.content.map((item, itemIdx) => (
              <li key={itemIdx}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      <section className="stack gap-sm">
        <h2>Implementation Notes</h2>
        <div className="card">
          <p>
            This blueprint provides vendor-neutral guidance that can be adapted to various technology stacks. 
            The patterns and principles shown here apply whether you're using cloud-native solutions, 
            enterprise platforms, or open-source alternatives.
          </p>
          <p>
            <strong>Technology Flexibility:</strong> While the logical architecture remains consistent, 
            you can implement these patterns using different technologies based on your organization's 
            requirements, existing investments, and operational preferences.
          </p>
        </div>
      </section>

      <nav className="blueprint-nav">
        <div className="nav-grid">
          {blueprint.views.map((v) => (
            <Link 
              key={v.slug} 
              href={`/blueprints/${params.slug}/${v.slug}`}
              className={`nav-item ${v.slug === params.viewSlug ? 'active' : ''}`}
            >
              <span className="nav-title">{v.title}</span>
              {v.diagram && <span className="nav-indicator">📊</span>}
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}