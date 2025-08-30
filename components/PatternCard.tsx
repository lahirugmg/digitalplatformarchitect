import Link from "next/link";
import type { Pattern } from "@/lib/patterns";

type Props = { pattern: Pattern };

function PatternDiagramPreview({ slug }: { slug: string }) {
  // Simple SVG icons/previews for each pattern
  const diagramPreviews: Record<string, React.ReactNode> = {
    "layered-architecture": (
      <svg viewBox="0 0 200 120" className="pattern-preview-diagram">
        <rect x="20" y="10" width="160" height="20" fill="var(--primary-light)" stroke="var(--border)" rx="4" />
        <rect x="20" y="35" width="160" height="20" fill="var(--orange-light)" stroke="var(--border)" rx="4" />
        <rect x="20" y="60" width="160" height="20" fill="var(--purple-light)" stroke="var(--border)" rx="4" />
        <rect x="20" y="85" width="160" height="20" fill="var(--green-light)" stroke="var(--border)" rx="4" />
      </svg>
    ),
    "microservice-architecture": (
      <svg viewBox="0 0 200 120" className="pattern-preview-diagram">
        <rect x="10" y="20" width="35" height="25" fill="var(--primary-light)" stroke="var(--border)" rx="4" />
        <rect x="55" y="20" width="35" height="25" fill="var(--primary-light)" stroke="var(--border)" rx="4" />
        <rect x="100" y="20" width="35" height="25" fill="var(--primary-light)" stroke="var(--border)" rx="4" />
        <rect x="145" y="20" width="35" height="25" fill="var(--primary-light)" stroke="var(--border)" rx="4" />
        <rect x="50" y="70" width="100" height="12" fill="var(--orange-light)" stroke="var(--border)" rx="4" />
        <line x1="27" y1="45" x2="100" y2="70" stroke="var(--text-secondary)" strokeWidth="1" />
        <line x1="72" y1="45" x2="100" y2="70" stroke="var(--text-secondary)" strokeWidth="1" />
        <line x1="117" y1="45" x2="100" y2="70" stroke="var(--text-secondary)" strokeWidth="1" />
        <line x1="162" y1="45" x2="100" y2="70" stroke="var(--text-secondary)" strokeWidth="1" />
      </svg>
    ),
    "event-driven-architecture": (
      <svg viewBox="0 0 200 120" className="pattern-preview-diagram">
        <rect x="10" y="30" width="30" height="20" fill="var(--primary-light)" stroke="var(--border)" rx="4" />
        <rect x="10" y="70" width="30" height="20" fill="var(--primary-light)" stroke="var(--border)" rx="4" />
        <rect x="85" y="50" width="30" height="20" fill="var(--orange-light)" stroke="var(--border)" rx="4" />
        <rect x="160" y="30" width="30" height="20" fill="var(--green-light)" stroke="var(--border)" rx="4" />
        <rect x="160" y="70" width="30" height="20" fill="var(--green-light)" stroke="var(--border)" rx="4" />
        <line x1="40" y1="40" x2="85" y2="60" stroke="var(--text-secondary)" strokeWidth="1.5" />
        <line x1="40" y1="80" x2="85" y2="60" stroke="var(--text-secondary)" strokeWidth="1.5" />
        <line x1="115" y1="60" x2="160" y2="40" stroke="var(--text-secondary)" strokeWidth="1.5" />
        <line x1="115" y1="60" x2="160" y2="80" stroke="var(--text-secondary)" strokeWidth="1.5" />
      </svg>
    ),
    "hexagonal-architecture": (
      <svg viewBox="0 0 200 120" className="pattern-preview-diagram">
        <polygon points="100,15 130,35 130,65 100,85 70,65 70,35" fill="var(--primary-light)" stroke="var(--border)" strokeWidth="2" />
        <rect x="20" y="25" width="25" height="15" fill="var(--orange-light)" stroke="var(--border)" rx="3" />
        <rect x="20" y="60" width="25" height="15" fill="var(--orange-light)" stroke="var(--border)" rx="3" />
        <rect x="155" y="25" width="25" height="15" fill="var(--purple-light)" stroke="var(--border)" rx="3" />
        <rect x="155" y="60" width="25" height="15" fill="var(--purple-light)" stroke="var(--border)" rx="3" />
        <line x1="45" y1="32" x2="70" y2="40" stroke="var(--text-secondary)" strokeWidth="1" />
        <line x1="45" y1="67" x2="70" y2="60" stroke="var(--text-secondary)" strokeWidth="1" />
        <line x1="130" y1="40" x2="155" y2="32" stroke="var(--text-secondary)" strokeWidth="1" />
        <line x1="130" y1="60" x2="155" y2="67" stroke="var(--text-secondary)" strokeWidth="1" />
      </svg>
    ),
    "monolithic": (
      <svg viewBox="0 0 200 120" className="pattern-preview-diagram">
        <rect x="40" y="20" width="120" height="80" fill="var(--primary-light)" stroke="var(--border)" strokeWidth="2" rx="8" />
        <rect x="55" y="35" width="25" height="20" fill="var(--orange-light)" stroke="var(--border)" rx="3" />
        <rect x="90" y="35" width="25" height="20" fill="var(--orange-light)" stroke="var(--border)" rx="3" />
        <rect x="125" y="35" width="25" height="20" fill="var(--orange-light)" stroke="var(--border)" rx="3" />
        <rect x="70" y="65" width="60" height="15" fill="var(--green-light)" stroke="var(--border)" rx="3" />
      </svg>
    ),
    "zero-trust-security": (
      <svg viewBox="0 0 200 120" className="pattern-preview-diagram">
        <rect x="10" y="10" width="180" height="20" fill="#ff6b6b" fillOpacity="0.3" stroke="#ff6b6b" rx="4" />
        <rect x="30" y="40" width="40" height="15" fill="var(--primary-light)" stroke="var(--border)" rx="3" />
        <rect x="80" y="40" width="40" height="15" fill="var(--primary-light)" stroke="var(--border)" rx="3" />
        <rect x="130" y="40" width="40" height="15" fill="var(--primary-light)" stroke="var(--border)" rx="3" />
        <rect x="50" y="70" width="100" height="20" fill="var(--green-light)" stroke="var(--border)" rx="4" />
        <text x="100" y="25" textAnchor="middle" className="text-xs font-bold" fill="#ff6b6b">Never Trust</text>
        <text x="100" y="105" textAnchor="middle" className="text-xs" fill="var(--text-secondary)">Always Verify</text>
      </svg>
    ),
    "oauth2-patterns": (
      <svg viewBox="0 0 200 120" className="pattern-preview-diagram">
        <rect x="10" y="20" width="30" height="20" fill="var(--primary-light)" stroke="var(--border)" rx="4" />
        <rect x="85" y="10" width="30" height="15" fill="var(--orange-light)" stroke="var(--border)" rx="3" />
        <rect x="85" y="30" width="30" height="15" fill="var(--orange-light)" stroke="var(--border)" rx="3" />
        <rect x="160" y="20" width="30" height="20" fill="var(--green-light)" stroke="var(--border)" rx="4" />
        <line x1="40" y1="30" x2="85" y2="20" stroke="var(--text-secondary)" strokeWidth="1.5" />
        <line x1="40" y1="30" x2="85" y2="35" stroke="var(--text-secondary)" strokeWidth="1.5" />
        <line x1="115" y1="30" x2="160" y2="30" stroke="var(--text-secondary)" strokeWidth="1.5" />
        <text x="100" y="65" textAnchor="middle" className="text-xs font-bold" fill="var(--primary)">OAuth2</text>
        <text x="100" y="78" textAnchor="middle" className="text-xs" fill="var(--text-secondary)">+ OIDC</text>
      </svg>
    ),
    "api-security-gateway": (
      <svg viewBox="0 0 200 120" className="pattern-preview-diagram">
        <rect x="10" y="30" width="20" height="15" fill="var(--primary-light)" stroke="var(--border)" rx="3" />
        <rect x="10" y="50" width="20" height="15" fill="var(--primary-light)" stroke="var(--border)" rx="3" />
        <rect x="10" y="70" width="20" height="15" fill="#ff6b6b" stroke="var(--border)" rx="3" />
        <rect x="70" y="40" width="60" height="40" fill="var(--orange-light)" stroke="var(--border)" strokeWidth="2" rx="4" />
        <rect x="160" y="35" width="25" height="15" fill="var(--green-light)" stroke="var(--border)" rx="3" />
        <rect x="160" y="55" width="25" height="15" fill="var(--green-light)" stroke="var(--border)" rx="3" />
        <rect x="160" y="75" width="25" height="15" fill="var(--green-light)" stroke="var(--border)" rx="3" />
        <line x1="30" y1="37" x2="70" y2="55" stroke="var(--text-secondary)" strokeWidth="1" />
        <line x1="30" y1="57" x2="70" y2="60" stroke="var(--text-secondary)" strokeWidth="1" />
        <line x1="30" y1="77" x2="50" y2="70" stroke="#ff6b6b" strokeWidth="2" />
        <line x1="130" y1="60" x2="160" y2="50" stroke="var(--text-secondary)" strokeWidth="1" />
        <text x="100" y="105" textAnchor="middle" className="text-xs font-bold" fill="var(--orange)">API Gateway</text>
      </svg>
    ),
    "data-encryption-patterns": (
      <svg viewBox="0 0 200 120" className="pattern-preview-diagram">
        <rect x="20" y="20" width="40" height="25" fill="var(--primary-light)" stroke="var(--border)" rx="4" />
        <rect x="80" y="20" width="40" height="25" fill="var(--orange-light)" stroke="var(--border)" rx="4" />
        <rect x="140" y="20" width="40" height="25" fill="var(--green-light)" stroke="var(--border)" rx="4" />
        <line x1="40" y1="45" x2="40" y2="65" stroke="var(--text-secondary)" strokeWidth="2" />
        <line x1="100" y1="45" x2="100" y2="65" stroke="var(--text-secondary)" strokeWidth="2" />
        <line x1="160" y1="45" x2="160" y2="65" stroke="var(--text-secondary)" strokeWidth="2" />
        <rect x="20" y="70" width="40" height="25" fill="var(--purple-light)" stroke="var(--border)" rx="4" />
        <rect x="80" y="70" width="40" height="25" fill="var(--purple-light)" stroke="var(--border)" rx="4" />
        <rect x="140" y="70" width="40" height="25" fill="var(--purple-light)" stroke="var(--border)" rx="4" />
        <text x="40" y="35" textAnchor="middle" className="text-xs" fill="var(--text)">Transit</text>
        <text x="100" y="35" textAnchor="middle" className="text-xs" fill="var(--text)">Rest</text>
        <text x="160" y="35" textAnchor="middle" className="text-xs" fill="var(--text)">Use</text>
        <text x="100" y="110" textAnchor="middle" className="text-xs font-bold" fill="var(--purple)">🔐 Encrypted</text>
      </svg>
    )
  };

  return diagramPreviews[slug] || null;
}

export function PatternCard({ pattern }: Props) {
  return (
    <Link href={`/patterns/${pattern.slug}`} className="card pattern-card">
      <div className="pattern-card-content">
        <div className="pattern-diagram-preview">
          <PatternDiagramPreview slug={pattern.slug} />
        </div>
        <div className="pattern-info">
          <h2>{pattern.title}</h2>
          <p>{pattern.summary}</p>
          {pattern.aka && pattern.aka.length > 0 ? (
            <div className="badges">
              {pattern.aka.slice(0, 2).map((name) => (
                <span key={name} className="badge">{name}</span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

