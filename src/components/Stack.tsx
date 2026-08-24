"use client";

import { useMemo, useState } from "react";
import type { StackCategory } from "@/lib/profile";
import Reveal from "./Reveal";
import TechIcon from "./TechIcon";

const CATEGORY_GLYPHS: Record<string, string> = {
  all: "∗",
  languages: "{ }",
  "ai / ml": "◈",
  "automation / web": "▣",
  "tools / systems": "⚙",
};

function glyphFor(category: string): string {
  return CATEGORY_GLYPHS[category.toLowerCase()] ?? "◆";
}

export default function Stack({
  stack,
  intro,
  aside,
}: {
  stack: StackCategory[];
  intro?: string;
  aside?: string;
}) {
  const [active, setActive] = useState("All");

  const total = useMemo(
    () => stack.reduce((n, group) => n + group.items.length, 0),
    [stack]
  );
  const mostUsed = useMemo(
    () =>
      stack.flatMap((group) => group.items.filter((item) => item.mostUsed)).slice(0, 10),
    [stack]
  );
  const visibleItems = useMemo(
    () =>
      active === "All"
        ? stack.flatMap((group) => group.items)
        : (stack.find((group) => group.category === active)?.items ?? []),
    [active, stack]
  );

  if (stack.length === 0) return null;

  const tabs = [
    { label: "All", count: total },
    ...stack.map((group) => ({ label: group.category, count: group.items.length })),
  ];

  return (
    <section id="skills" className="relative py-14 md:py-20 px-6 md:px-12">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-8 md:mb-10">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground/90 border-b-2 border-foreground/30 pb-4">
            The tools <span className="font-editorial italic font-normal text-clay">I build</span> with
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex flex-wrap gap-2 lg:justify-end max-w-xl" role="tablist" aria-label="Skill categories">
            {tabs.map((tab) => {
              const isActive = active === tab.label;
              return (
                <button
                  key={tab.label}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-cursor="hover"
                  onClick={() => setActive(tab.label)}
                  className={`flex items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.12em] transition-colors duration-200 ${
                    isActive
                      ? "border-ink bg-ink text-background"
                      : "border-foreground/15 bg-background/50 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  <span aria-hidden className="text-sm leading-none">
                    {glyphFor(tab.label)}
                  </span>
                  {tab.label}
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[9px] tabular-nums ${
                      isActive ? "bg-background/20 text-background/80" : "bg-foreground/5 text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <div className="grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
        <aside>
          <Reveal>
            <div className="max-w-xs">
              {intro && (
                <p className="text-base leading-relaxed text-foreground/75">{intro}</p>
              )}
              {mostUsed.length > 0 && (
                <>
                  <hr className="my-10 border-t border-foreground/15" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    Most Used Tech Stack
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {mostUsed.map((item) => (
                      <li
                        key={item.name}
                        className="rounded-full border border-foreground/15 bg-background/60 px-3 py-1 font-mono text-[11px] text-foreground/80"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Reveal>
        </aside>

        <div className="min-w-0">
          <Reveal delay={0.06}>
            <div className="flex items-center justify-between mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span>All Technologies</span>
              <span>{visibleItems.length} Items</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 border-t border-l border-foreground/20">
            {visibleItems.map((item, i) => (
              <Reveal
                key={`${active}-${item.name}`}
                delay={Math.min(i * 0.03, 0.3)}
                className="border-r border-b border-foreground/20"
              >
                <div
                  data-cursor="hover"
                  className="flex items-center gap-3 md:gap-4 p-4 h-full transition-colors duration-300 hover:bg-foreground/5"
                >
                  <TechIcon item={item} />
                  <span className="text-sm md:text-[15px] text-foreground/90 truncate">
                    {item.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {aside && (
            <Reveal delay={0.1}>
              <p className="mt-8 text-sm text-muted-foreground">{aside}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
