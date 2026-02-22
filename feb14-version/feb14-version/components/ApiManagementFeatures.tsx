"use client";

import { apiManagementFeatures, type ApiFeatureCategory } from "@/lib/api-management-features";

interface ApiManagementFeaturesProps {
  className?: string;
}

export function ApiManagementFeatures({ className = "" }: ApiManagementFeaturesProps) {
  return (
    <section className={`api-management-features ${className}`}>
      <div className="features-header">
        <h2 className="section-title centered">API Management Features</h2>
        <p className="section-description">
          Comprehensive API lifecycle management capabilities designed for enterprise-scale digital transformation
        </p>
      </div>
      
      <div className="features-grid">
        {apiManagementFeatures.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: ApiFeatureCategory;
}

function FeatureCard({ feature }: FeatureCardProps) {
  const colorClasses = {
    primary: 'feature-card-primary',
    blue: 'feature-card-blue',
    green: 'feature-card-green',
    orange: 'feature-card-orange',
    purple: 'feature-card-purple',
    teal: 'feature-card-teal',
    gray: 'feature-card-gray'
  };

  const cardClass = colorClasses[feature.color as keyof typeof colorClasses] || 'feature-card-primary';

  return (
    <div className={`feature-card ${cardClass}`}>
      <div className="feature-card-header">
        <div className="feature-icon">
          {feature.icon}
        </div>
        <div className="feature-card-title-section">
          <h3 className="feature-card-title">{feature.title}</h3>
          <p className="feature-card-description">{feature.description}</p>
        </div>
      </div>
      
      <div className="feature-list-container">
        <ul className="feature-capabilities-list">
          {feature.features.map((capability, index) => (
            <li key={index} className="feature-capability-item">
              <span className="capability-bullet">✓</span>
              <span className="capability-text">{capability}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="feature-card-footer">
        <div className="feature-count">
          {feature.features.length} capabilities
        </div>
      </div>
    </div>
  );
}