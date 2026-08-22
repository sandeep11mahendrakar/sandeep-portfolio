"use client";

import { useMemo, useState } from "react";
import type { StackCategory } from "@/lib/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Stack({ stack }: { stack: StackCategory[] }) {
  const [active, setActive] = useState("All");

  const categories = useMemo(() => stack.map((group) => group.category), [stack]);
  const visible =
    active === "All" ? stack : stack.filter((group) => group.category === active);

  if (stack.length === 0) return null;

  return (
    <Section id="skills" eyebrow="Toolbox" title="What I *work* with">
      {categories.length > 1 && (
        <div className="-mt-6 mb-10 flex flex-wrap gap-2 md:-mt-12 md:mb-14">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              onClick={() => setActive(category)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                active === category
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-muted hover:border-moss hover:text-ink"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 xl:grid-cols-4">
        {visible.map((group, i) => (
          <Reveal key={group.category} delay={0.05 * i} className="h-full">
            <div className="-ml-px -mt-px h-full border-b border-r border-line p-6 transition-colors duration-300 hover:bg-white/35 md:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-moss-deep">
                {group.category}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-muted transition-colors duration-200 hover:border-moss hover:text-ink"
                  >
                    {item.icon && (
                      <span aria-hidden className="text-[11px] leading-none">
                        {item.icon}
                      </span>
                    )}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
