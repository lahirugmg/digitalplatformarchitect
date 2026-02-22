export const metadata = {
  title: "Resources"
};

export default function ResourcesPage() {
  return (
    <section className="prose stack gap-md">
      <h1>Resources</h1>
      <p>Reference materials planned for upcoming releases:</p>
      <ul>
        <li>Platform capability model and maturity map</li>
        <li>Reference integration patterns and decision guides</li>
        <li>Templates: platform service catalog, scorecards, and guardrails</li>
        <li>Checklists: security, reliability, and cost controls</li>
      </ul>
      <p>
        If you have suggestions or want to contribute, check the roadmap
        in the repository and open an issue.
      </p>
    </section>
  );
}

