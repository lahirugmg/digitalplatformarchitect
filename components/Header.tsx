"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/blocks", label: "Blocks" },
  { href: "/patterns", label: "Patterns" },
  { href: "/solution", label: "Solutions" },
  { href: "/tools/apim-capacity-planner", label: "Tools" },
  { href: "/ai", label: "AI" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" }
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Digital Platform Architect home">
          <Image src="/favicon.svg" alt="logo" width={28} height={28} />
          <span>Digital Platform Architect</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {links.map((l) => {
            // For tools, check if pathname starts with /tools
            const isActive = l.href === "/tools/apim-capacity-planner" 
              ? pathname.startsWith("/tools")
              : pathname === l.href;
            
            return (
              <Link
                key={l.href}
                href={l.href}
                className={isActive ? "active" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
