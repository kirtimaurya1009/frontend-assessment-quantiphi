"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/themeStore";

const links = [
  { href: "/", label: "Home" },
  { href: "/calculator", label: "Calculator" },
  { href: "/cars", label: "Cars" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-semibold">
          Frontend Assessment - Kirti Maurya
        </Link>

        <ul className="flex gap-1 sm:gap-2">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm",
                    active
                      ? "bg-cyan-500/20 font-medium text-cyan-800 dark:text-cyan-200"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg border border-[var(--border)] px-2 py-1 text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>
    </header>
  );
}
