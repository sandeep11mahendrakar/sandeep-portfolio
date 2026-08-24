"use client";

import { useEffect, useState } from "react";

export default function SectionDots({ ids }: { ids: string[] }) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.2, 0.6] }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  if (ids.length === 0) return null;

  return (
    <nav
      aria-label="Sections"
      className="fixed right-1.5 md:right-2 lg:right-3 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col gap-4"
    >
      {ids.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={`Go to ${id}`}
          data-cursor="hover"
          className="group relative flex items-center justify-center p-1.5"
        >
          <span className="absolute right-8 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 font-mono text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap pointer-events-none">
            {id === "top" ? "Hero" : id}
          </span>
          <span
            aria-hidden
            className={`block w-2.5 h-2.5 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
              active === id
                ? "border-ink bg-ink scale-110"
                : "border-foreground/40 bg-transparent group-hover:border-foreground/80 group-hover:scale-110"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
