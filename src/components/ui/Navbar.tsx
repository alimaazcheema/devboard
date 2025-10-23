"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Login", href: "/auth/login" },
    { name: "Signup", href: "/auth/signup" },
  ];

  return (
    <nav className="w-full border-b bg-background/60 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <Link href="/" className="font-semibold text-xl">
          DevBoard
        </Link>
        <div className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="default">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
