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
      className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3.5 xl:flex"
    >
      {ids.map((id) => (
        <a key={id} href={`#${id}`} aria-label={`Go to ${id}`}>
          <span
            aria-hidden
            className={`block rounded-full border border-ink transition-all duration-300 ${
              active === id ? "h-2 w-2 bg-ink" : "h-[7px] w-[7px] bg-transparent"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
