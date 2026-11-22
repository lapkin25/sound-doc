import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

import { cn } from "@/lib/utils";
import type { DocBlock, DocSection } from "./doc-data";

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;

function inline(text: string): ReactNode[] {
  return text.split(TOKEN).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

const noteStyles = {
  info: {
    icon: Info,
    box: "border-sky-500/30 bg-sky-500/5",
    badge: "text-sky-600 dark:text-sky-400",
  },
  success: {
    icon: CheckCircle2,
    box: "border-emerald-500/30 bg-emerald-500/5",
    badge: "text-emerald-600 dark:text-emerald-400",
  },
  warn: {
    icon: AlertTriangle,
    box: "border-amber-500/40 bg-amber-500/5",
    badge: "text-amber-600 dark:text-amber-400",
  },
} as const;

function Block({ block }: { block: DocBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="text-[15px] leading-7 text-muted-foreground">
          {inline(block.text)}
        </p>
      );
    case "h3":
      return (
        <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">
          {inline(block.text)}
        </h3>
      );
    case "ul":
      return (
        <ul className="space-y-2">
          {block.items.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-[15px] leading-7 text-muted-foreground"
            >
              <span
                aria-hidden
                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
              />
              <span>{inline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2">
          {block.items.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-[15px] leading-7 text-muted-foreground"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-[11px] font-medium text-foreground">
                {index + 1}
              </span>
              <span>{inline(item)}</span>
            </li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-4 font-mono text-[12.5px] leading-relaxed text-foreground">
          <code>{block.code}</code>
        </pre>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse text-left text-[14px]">
            <thead>
              <tr className="bg-muted/50">
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    className="border-b px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-foreground"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="even:bg-muted/20">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "border-b px-4 py-2.5 align-top text-muted-foreground last:border-r-0",
                        cellIndex === 0 && "font-medium text-foreground"
                      )}
                    >
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note": {
      const style = noteStyles[block.tone];
      const Icon = style.icon;
      return (
        <div className={cn("rounded-lg border p-4", style.box)}>
          <div
            className={cn(
              "flex items-center gap-2 text-sm font-semibold",
              style.badge
            )}
          >
            <Icon className="h-4 w-4" />
            {block.title}
          </div>
          <p className="mt-2 text-[14px] leading-6 text-muted-foreground">
            {inline(block.text)}
          </p>
        </div>
      );
    }
    default:
      return null;
  }
}

export function DocSectionView({
  section,
  index,
}: {
  section: DocSection;
  index: string;
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 border-t border-border/60 py-10 first:border-t-0 first:pt-0"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-primary/70">{index}</span>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {section.title}
        </h2>
      </div>
      <p className="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
        {inline(section.lede)}
      </p>
      <div className="mt-6 space-y-4">
        {section.blocks.map((block, blockIndex) => (
          <Block key={blockIndex} block={block} />
        ))}
      </div>
    </section>
  );
}
