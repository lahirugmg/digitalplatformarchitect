export const metadata = {
  title: "Platform Architecture Tools",
  description: "Interactive tools for exploring, planning and selecting enterprise platform architecture patterns and components.",
};

const tools = [
  {
    slug: "architecture-pattern-selector",
    title: "Architecture Pattern Selector",
    description: "Get personalized architecture pattern recommendations based on your system requirements across six key platform pillars.",
    icon: "🎯",
    featured: true
  },
  {
    slug: "architecture-explorer", 
    title: "Architecture Explorer",
    description: "Interactive exploration of architecture layers across Business, Solution, and Deployment views with role-based perspectives.",
    icon: "🏗️",
    featured: false
  },
  {
    slug: "capacity-planner",
    title: "Capacity Planner", 
    description: "Plan and size your platform infrastructure components based on expected load and performance requirements.",
    icon: "📊",
    featured: false
  }
];

export default function ToolsPage() {
  return (
    <div className="container">
      <div className="page-hero">
        <h1 className="page-title">Platform Architecture Tools</h1>
        <p className="lede">
          Interactive tools to help you explore, plan, and select the right architectural patterns 
          and components for your enterprise platform.
        </p>
      </div>

      <section className="stack gap-lg">
        <div className="card-grid">
          {tools.map(tool => (
            <article key={tool.slug} className={`card ${tool.featured ? 'featured' : ''}`}>
              <div className="card-content">
                <div className="card-header">
                  <span className="tool-icon">{tool.icon}</span>
                  <h2 className="card-title">
                    <a href={`/tools/${tool.slug}`}>{tool.title}</a>
                  </h2>
                </div>
                <p className="card-summary">{tool.description}</p>
                <div className="card-footer">
                  <a href={`/tools/${tool.slug}`} className="button">
                    Launch Tool →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="content-section">
          <h2>Why Use Platform Architecture Tools?</h2>
          <div className="prose">
            <p>
              Enterprise platform architecture involves complex decisions about patterns, technologies, 
              and trade-offs. These interactive tools help you:
            </p>
            <ul>
              <li><strong>Make informed decisions:</strong> Get data-driven recommendations based on your specific requirements</li>
              <li><strong>Explore systematically:</strong> Understand how different architectural layers and components interact</li>
              <li><strong>Plan effectively:</strong> Size and scope your platform components appropriately</li>
              <li><strong>Learn by doing:</strong> Gain insights through interactive exploration and guided assessment</li>
            </ul>
            <p>
              Each tool is designed to complement the comprehensive architectural guidance available 
              throughout the site, providing hands-on ways to apply the concepts to your specific context.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}