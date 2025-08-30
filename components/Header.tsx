"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/blocks", label: "Blocks" },
  { href: "/learn", label: "Learn" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" }
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Digital Platform Architect home">
          <Image src="/favicon.svg" alt="logo" width={22} height={22} />
          <span>digitalplatformarchitect.com</span>
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
