export const metadata = {
  title: "Learn"
};

export default function LearnPage() {
  return (
    <section className="prose stack gap-md">
      <h1>Learn</h1>
      <p>
        Start with the foundations of enterprise platform architecture:
      </p>
      <ul>
        <li>Platform strategy and product operating model</li>
        <li>
          Building blocks:
          <a href="/blocks"> message broker, streaming, integration, API mgmt, IAM, IDP</a>
        </li>
        <li>Architecture patterns: event-driven, APIs, zero trust, multi-cloud</li>
        <li>Governance: platform taxonomy, guardrails, and dev experience</li>
      </ul>
      <p>
        Coming soon: structured learning paths and reference architectures.
      </p>
    </section>
  );
}
