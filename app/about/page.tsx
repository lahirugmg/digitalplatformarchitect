export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <div className="container">
      <article className="article">
        <header className="page-hero stack gap-sm">
          <h1 className="page-title">About</h1>
          <p className="lede">Learn about the mission and vision behind this comprehensive guide to digital platform architecture.</p>
        </header>

        <div className="content-section">
          <div className="prose">
            <p>
              digitalplatformarchitect.com is a learning hub focused on the
              architecture of enterprise digital platforms. It aims to present
              pragmatic, vendor-neutral guidance across strategy, operating models,
              product thinking, platform capabilities, integration patterns, data,
              and governance.
            </p>
            <p>
              The site starts simple and grows over time. Expect iterative content
              releases, reference models, and practical templates.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

