import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex items-center rounded-lg bg-neutral-900 px-2 py-1 text-neutral-100">
            <Logo className="h-4 w-auto" />
          </span>
          <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
            Документация Sound
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground sm:inline">
            sound-0.5.1
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
