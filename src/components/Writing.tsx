import type { Profile } from "@/lib/profile";
import { isPlaceholder } from "@/lib/profile";
import ArrowLink from "./ArrowLink";
import FadeIn from "./FadeIn";
import Section from "./Section";

export default function Writing({
  entries,
  index,
}: {
  entries: Profile["writing"];
  index: string;
}) {
  if (entries.length === 0) return null;

  return (
    <Section id="writing" index={index} title="Writing">
      <ol>
        {entries.map((entry, i) => {
          const linked = !!entry.url && !isPlaceholder(entry.url);
          return (
            <FadeIn key={`${entry.title}-${i}`} delay={0.04 * i}>
              <li
                className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                {linked ? (
                  <ArrowLink href={entry.url as string} className="font-serif text-xl tracking-tight">
                    {entry.title}
                  </ArrowLink>
                ) : (
                  <span className="font-serif text-xl tracking-tight">{entry.title}</span>
                )}
                <span className="text-xs uppercase tracking-[0.2em] text-muted">
                  {[entry.venue, entry.year].filter(Boolean).join(" · ")}
                </span>
              </li>
            </FadeIn>
          );
        })}
      </ol>
    </Section>
  );
}
