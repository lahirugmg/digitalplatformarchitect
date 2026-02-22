import Link from "next/link";

export function CTA() {
  return (
    <div className="cta">
      <Link href="/patterns" className="button primary">Explore Patterns</Link>
      <Link href="/about" className="button">What is this?</Link>
    </div>
  );
}

