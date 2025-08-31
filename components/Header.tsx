"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/blocks", label: "Blocks" },
  { href: "/patterns", label: "Patterns" },
  { href: "/solutions", label: "Solutions" },
  { href: "/story", label: "Story" },
  { href: "/explore", label: "Explore" },
  { href: "/learn", label: "Learn" },
  { href: "/resources", label: "Resources" },
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
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
