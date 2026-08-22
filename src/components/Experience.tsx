import type { ExperienceEntry } from "@/lib/profile";
import FadeIn from "./FadeIn";
import Section from "./Section";

export default function Experience({
  entries,
  index,
}: {
  entries: ExperienceEntry[];
  index: string;
}) {
  if (entries.length === 0) return null;

  return (
    <Section id="experience" index={index} title="Experience">
      <ol>
        {entries.map((entry, i) => (
          <FadeIn key={`${entry.org}-${i}`} delay={0.04 * i}>
            <li
              className={`grid gap-2 py-8 md:grid-cols-[1fr_160px] md:gap-8 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <div>
                <h3 className="font-serif text-xl tracking-tight md:text-2xl">
                  {entry.role}
                  {entry.org && (
                    <span className="text-muted"> — {entry.org}</span>
                  )}
                </h3>
                {entry.points.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-muted">
                    {entry.points.map((point, j) => (
                      <li key={j} className="flex gap-3">
                        <span aria-hidden className="mt-[0.65em] h-px w-3 shrink-0 bg-line" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {entry.period && (
                <p className="text-xs uppercase tracking-[0.2em] text-muted md:pt-2 md:text-right">
                  {entry.period}
                </p>
              )}
            </li>
          </FadeIn>
        ))}
      </ol>
    </Section>
  );
}
