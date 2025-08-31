import Link from "next/link";

export const metadata = {
  title: "Solutions",
  description: "From patterns to platforms: business, solution, and deployment views with the right level of detail (L0–L3)."
};

export default function SolutionsPage() {
  return (
    <section className="prose stack gap-lg">
      <header className="stack gap-sm">
        <h1>Solutions: From Patterns to Platforms</h1>
        <p>
          Turning architecture patterns into real-world digital platforms requires more than just
          building blocks. It needs the right views—business, solution, and deployment—presented at
          the right level of detail (L0–L3) for each audience. This section shows how these
          perspectives connect so stakeholders, architects, and engineers collaborate effectively.
        </p>
        <nav className="story-toc" aria-label="Solutions navigation">
          <a href="#overview" className="toc-link">Overview</a>
          <a href="#business-architecture" className="toc-link">Business Architecture</a>
          <a href="#solution-architecture" className="toc-link">Solution Architecture</a>
          <a href="#deployment-architecture" className="toc-link">Deployment Architecture</a>
          <a href="#other-considerations" className="toc-link">Other Considerations</a>
          <a href="#how-it-connects" className="toc-link">How It Connects</a>
          <a href="#conclusion" className="toc-link">Conclusion</a>
        </nav>
      </header>

      <section id="overview" className="stack gap-md">
        <h2>General Overview</h2>
        <h3>Three Complementary Views</h3>
        <ul>
          <li><strong>Business Architecture</strong> – Why the platform exists: value, stakeholders, capabilities, goals.</li>
          <li><strong>Solution Architecture</strong> – How it works: key components, flows, integration styles.</li>
          <li><strong>Deployment Architecture</strong> – Where it runs: runtime infrastructure, environments, operations.</li>
        </ul>
        <h3>Levels of Detail (L0–L3)</h3>
        <ul>
          <li><strong>L0 (Conceptual)</strong>: Big picture; no technologies or protocols.</li>
          <li><strong>L1 (Logical/High‑Level Physical)</strong>: Introduces platforms and key flows.</li>
          <li><strong>L2 (Detailed Logical/Physical)</strong>: Protocols, security flows, integration specifics.</li>
          <li><strong>L3 (Deep Dive)</strong>: Specialized details (CI/CD, compliance, runbooks).</li>
        </ul>
      </section>

      <section id="business-architecture" className="stack gap-md">
        <h2>Business Architecture</h2>
        <p>
          Focuses on intent and outcomes, not technical implementation. It clarifies the value a
          platform must deliver and aligns technical decisions with business goals.
        </p>
        <h3>Key Elements</h3>
        <ul>
          <li>Goals and KPIs (time‑to‑market, customer experience, compliance)</li>
          <li>Stakeholders and user groups</li>
          <li>Capabilities and journeys that create value</li>
          <li>Existing systems and constraints</li>
          <li>Non‑functional drivers (regulatory, privacy, SLAs)</li>
        </ul>
        <h3>Example Progression</h3>
        <ul>
          <li><strong>L0</strong>: High‑level business units, interactions, goals (no technology references).</li>
          <li><strong>L1</strong>: Introduce core systems (CRM, ERP, IdP) and high‑level interactions.</li>
        </ul>
      </section>

      <section id="solution-architecture" className="stack gap-md">
        <h2>Solution Architecture</h2>
        <p>
          Bridges business intent with technical design—showing how applications, services, and
          integrations come together to solve business problems.
        </p>
        <h3>Key Elements</h3>
        <ul>
          <li>Major business entities (customers, orders, payments)</li>
          <li>Core solution components (API gateway, identity, integration layer, microservices, data stores, event bus)</li>
          <li>Integration and architectural patterns (REST vs. events, synchronous vs. asynchronous)</li>
          <li>Standards and protocols (HTTP, JMS, OAuth2, OIDC, SAML, JSON, XML, gRPC)</li>
          <li>Cross‑cutting concerns (security, governance, observability)</li>
          <li>High‑level runtime choices (cloud, on‑premises, hybrid)</li>
        </ul>
      </section>

      <section id="deployment-architecture" className="stack gap-md">
        <h2>Deployment Architecture</h2>
        <p>
          Describes operational reality—how the platform is hosted, scaled, and secured in different
          environments. Essential for DevOps and operations teams.
        </p>
        <h3>Key Elements</h3>
        <ul>
          <li>Environments (dev, test, stage, prod)</li>
          <li>Topology (clusters, nodes, namespaces, scaling policies)</li>
          <li>Network zones (DMZ, private subnets, VPNs, peering)</li>
          <li>Platform services (ingress/LB, service mesh, secrets, registries)</li>
          <li>HA/DR (replicas, failover, backups, RPO/RTO)</li>
          <li>Security controls (WAF, mTLS, firewall rules, key vaults)</li>
          <li>Color‑coded lines for clarity (e.g., blue for HTTP, brown for DBs)</li>
        </ul>
      </section>

      <section id="other-considerations" className="stack gap-md">
        <h2>Other Architectural Considerations</h2>
        <h3>CI/CD Flow</h3>
        <p>Define how code moves from commit to production with tools, stages, and automations.</p>
        <ul>
          <li>Tools (GitHub, GitLab, Jenkins, Azure DevOps)</li>
          <li>Stages (build, test, deploy)</li>
          <li>Automations (quality checks, container builds, rollbacks)</li>
        </ul>
        <h3>Security Architecture</h3>
        <ul>
          <li>Identity & access management (OAuth2, OIDC, SAML)</li>
          <li>Threat protection (WAF, rate limiting, schema enforcement)</li>
          <li>Compliance mapping (GDPR, HIPAA, PCI)</li>
          <li>Zero‑trust across users, devices, workloads, data</li>
        </ul>
        <h3>Domain‑Specific Views</h3>
        <p>
          Industry diagrams can zoom into healthcare, banking, or telecom—providing detailed process
          and integration flows that extend the solution view.
        </p>
      </section>

      <section id="how-it-connects" className="stack gap-md">
        <h2>How It All Connects</h2>
        <ol>
          <li><strong>Start with Business (L0/L1)</strong>: Define goals, value, capabilities.</li>
          <li><strong>Move to Solution (L1/L2)</strong>: Show how patterns and building blocks create the solution.</li>
          <li><strong>Refine with protocols & flows (L2)</strong>: Add standards, security, integration details.</li>
          <li><strong>Finalize with Deployment (L2/L3)</strong>: Document how it’s operated, scaled, and secured.</li>
        </ol>
        <p>Each step builds on the last, ensuring traceability from business value to technical execution.</p>
      </section>

      <section id="conclusion" className="stack gap-md">
        <h2>Conclusion</h2>
        <p>
          Great architecture speaks to the right audience at the right level. By combining patterns
          with building blocks, and progressing from Business L0 through Deployment L3, organizations
          create platforms that are understandable, secure, operable—and deliver measurable value.
        </p>
        <div>
          <Link href="/patterns" className="button accent" aria-label="Explore patterns">Explore Patterns</Link>
          <span style={{ marginInline: '.5rem' }} />
          <Link href="/blocks" className="button" aria-label="Browse building blocks">Browse Building Blocks</Link>
        </div>
      </section>
    </section>
  );
}

