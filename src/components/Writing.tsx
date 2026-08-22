import type { Profile } from "@/lib/profile";
import { isPlaceholder } from "@/lib/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Writing({ entries }: { entries: Profile["writing"] }) {
  if (entries.length === 0) return null;

  return (
    <Section id="writing" eyebrow="Notes" title="*Writing*">
      <ol>
        {entries.map((entry, i) => {
          const linked = !!entry.url && !isPlaceholder(entry.url);
          return (
            <Reveal key={`${entry.title}-${i}`} delay={0.04 * i}>
              <li className="group/row border-t border-line last:border-b">
                <div className="grid items-baseline gap-2 py-7 transition-all duration-300 group-hover/row:translate-x-2 md:grid-cols-[minmax(0,1fr)_200px]">
                  {linked ? (
                    <a
                      href={entry.url as string}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="OPEN"
                      className="font-display text-xl font-light tracking-tight transition-colors hover:text-moss-deep md:text-2xl"
                    >
                      {entry.title}
                    </a>
                  ) : (
                    <span className="font-display text-xl font-light tracking-tight md:text-2xl">
                      {entry.title}
                    </span>
                  )}
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted md:text-right">
                    {[entry.venue, entry.year].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
