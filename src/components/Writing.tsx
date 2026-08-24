import type { Profile } from "@/lib/profile";
import { isPlaceholder } from "@/lib/profile";
import Reveal from "./Reveal";

export default function Writing({ entries }: { entries: Profile["writing"] }) {
  if (entries.length === 0) return null;

  return (
    <section id="writing" className="relative py-14 md:py-20 px-6 md:px-12">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-8 md:mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-foreground/90 border-b-2 border-foreground/30 pb-4 w-fit">
            Articles
          </h2>
          <p className="text-2xl md:text-3xl font-light text-foreground/90 md:text-right">
            small essays,{" "}
            <span className="font-editorial italic text-clay">occasionally</span>.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {entries.map((entry, i) => {
          const linked = !!entry.url && !isPlaceholder(entry.url);
          return (
            <Reveal key={`${entry.title}-${i}`} delay={0.06 * i}>
              {linked ? (
                <a
                  href={entry.url as string}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="view"
                  className="group flex flex-col h-full p-6 md:p-8 rounded-3xl border border-foreground/10 bg-background/50 hover:bg-foreground/5 transition-colors duration-500"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-6">
                    {[entry.venue, entry.year].filter(Boolean).join(" · ")}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-light tracking-tight leading-snug text-foreground mb-4">
                    {entry.title}.
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-foreground transition-colors">
                    Read Essay
                    <svg
                      aria-hidden
                      className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                  </span>
                </a>
              ) : (
                <div className="flex flex-col h-full p-6 md:p-8 rounded-3xl border border-foreground/10 bg-background/50">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-6">
                    {[entry.venue, entry.year].filter(Boolean).join(" · ")}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-light tracking-tight leading-snug text-foreground">
                    {entry.title}.
                  </h3>
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
