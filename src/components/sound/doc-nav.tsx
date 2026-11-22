"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type NavGroup = {
  title: string;
  items: { id: string; index: string; title: string }[];
};

export function DocNav({ groups }: { groups: NavGroup[] }) {
  const [active, setActive] = useState<string | null>(
    groups[0]?.items[0]?.id ?? null
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = groups.flatMap((group) => group.items.map((item) => item.id));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groups]);

  const list = (
    <ul className="space-y-6">
      {groups.map((group) => (
        <li key={group.title}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {group.title}
          </p>
          <ul className="space-y-0.5 border-l border-border/70">
            {group.items.map((item) => {
              const isActive = item.id === active;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "-ml-px flex items-baseline gap-2 border-l-2 py-1 pl-3 text-sm transition-colors",
                      isActive
                        ? "border-primary font-medium text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    )}
                  >
                    <span className="font-mono text-[11px] text-primary/60">
                      {item.index}
                    </span>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );

  return (
    <nav aria-label="Содержание документации">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm font-medium text-foreground lg:hidden"
      >
        Содержание
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      <div className={cn("mt-4 lg:mt-0 lg:block", open ? "block" : "hidden")}>
        {list}
      </div>
    </nav>
  );
}
