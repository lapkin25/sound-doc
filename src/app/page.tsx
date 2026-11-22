import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-2xl space-y-6 text-center">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Проект Sound
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Документация Sound
          </h1>
          <p className="text-lg text-muted-foreground">
            Декларативная система вычислений, где ответ воспроизводится бит в
            бит на любой платформе. Обзор, язык, ядро, мост данных и дорожная
            карта — в одном месте.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link href="/docs">Открыть документацию</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mb-4 flex items-center justify-center">
        <div className="flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-neutral-100">
          <Logo className="h-5 w-auto" />
        </div>
      </footer>
    </div>
  );
}
