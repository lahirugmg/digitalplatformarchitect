import Link from "next/link";

export function CTA() {
  return (
    <div className="cta">
      <Link href="/learn" className="button primary">Start Learning</Link>
      <Link href="/about" className="button">What is this?</Link>
    </div>
  );
}

