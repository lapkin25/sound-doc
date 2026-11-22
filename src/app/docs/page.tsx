import type { Metadata } from "next";

import { DocNav, type NavGroup } from "@/components/sound/doc-nav";
import { DocSectionView } from "@/components/sound/doc-blocks";
import { SiteHeader } from "@/components/sound/site-header";
import { groups, sections } from "@/components/sound/doc-data";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Sound — документация",
  description:
    "Подробная документация проекта Sound: язык Piano, ядро SCore, мост TRIOMAT, гарантии завершимости и воспроизводимости.",
};

const navGroups: NavGroup[] = groups.map((group) => ({
  title: group.title,
  items: group.sections.map((section) => ({
    id: section.id,
    index: String(sections.indexOf(section) + 1).padStart(2, "0"),
    title: section.title,
  })),
}));

export default function DocsPage() {
  let counter = 0;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
          <aside className="lg:border-r lg:border-border/60">
            <div className="py-6 lg:sticky lg:top-14 lg:max-h-[calc(100vh-3.5rem)] lg:overflow-y-auto lg:py-10 lg:pr-6">
              <DocNav groups={navGroups} />
            </div>
          </aside>

          <main className="min-w-0 pb-24">
            <div className="border-b border-border/60 py-10">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Документация проекта</Badge>
                <Badge variant="outline">sound-0.5.1</Badge>
                <Badge variant="outline">Piano · SCore · Trio</Badge>
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Sound
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
                Декларативная система программирования: программа описывает,{" "}
                <em>что</em> истинно, а компилятор строит из этого граф
                вычислений. Функциональное ядро считает чистые узлы, слой SCore
                превращает их в линейный журнал, а слой Trio гарантирует
                побайтовое воспроизведение на любом бэкенде. Здесь собрана
                исчерпывающая карта проекта — от языка до дорожной карты.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                {[
                  ["Слои", "4 + мост"],
                  ["Словарь", "core/2"],
                  ["Спецификация", "sound-0.5.1"],
                  ["Прогон корпуса", "15 / 15"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-1 font-mono text-lg font-semibold text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {groups.map((group) => (
              <div key={group.title} className="pt-10">
                <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {group.title}
                </h2>
                {group.sections.map((section) => {
                  counter += 1;
                  const index = String(counter).padStart(2, "0");
                  return (
                    <DocSectionView
                      key={section.id}
                      section={section}
                      index={index}
                    />
                  );
                })}
              </div>
            ))}

            <footer className="mt-16 border-t border-border/60 pt-8 text-sm text-muted-foreground">
              Источник — открытый репозиторий проекта Sound. Страница собрана из
              канонических спецификаций, рефератов слоёв и отчёта о полном
              прогоне корпуса.
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
