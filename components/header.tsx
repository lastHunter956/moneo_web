"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import MobileMenu from "@/components/mobile-menu";

export default function Header() {
  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#app-description", label: "App" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#preregister", label: "Waitlist" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Image
          src="/icono.png"
          alt="Moneo Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <span className="text-xl font-bold">Moneo</span>
      </div>
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
        <div className="hidden md:block">
          <Button>Get Started</Button>
        </div>
        <MobileMenu items={navItems} />
      </div>
    </header>
  );
}
