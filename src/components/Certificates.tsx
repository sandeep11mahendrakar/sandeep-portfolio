import type { Profile } from "@/lib/profile";
import { isPlaceholder } from "@/lib/profile";
import Reveal from "./Reveal";

export default function Certificates({
  entries,
}: {
  entries: Profile["certificates"];
}) {
  if (entries.length === 0) return null;

  return (
    <section id="certificates" className="relative py-12 md:py-16 px-6 md:px-12">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-6 md:mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-foreground/90 border-b-2 border-foreground/30 pb-3 w-fit">
            Certificates
          </h2>
          <p className="text-xl md:text-2xl font-light text-foreground/90 md:text-right">
            always{" "}
            <span className="font-editorial italic text-clay">learning.</span>
          </p>
        </div>
      </Reveal>

      <ul className="flex flex-col border-t border-foreground/15">
        {entries.map((entry, i) => {
          const linked = !!entry.url && !isPlaceholder(entry.url);
          return (
            <Reveal key={`${entry.title}-${i}`} delay={0.05 * i}>
              <li className="border-b border-foreground/15">
                {linked ? (
                  <a
                    href={entry.url as string}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="view"
                    className="group inline-flex items-baseline gap-3 py-2.5 text-foreground/90 hover:text-matcha transition-colors duration-300"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground w-7 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-base md:text-lg font-light tracking-tight underline decoration-foreground/25 decoration-dotted underline-offset-4 group-hover:decoration-matcha transition-colors">
                      {entry.title}
                    </span>
                    {entry.issuer && (
                      <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                        · {entry.issuer}
                      </span>
                    )}
                    <svg
                      aria-hidden
                      className="w-3.5 h-3.5 self-center opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-matcha"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-baseline gap-3 py-2.5 text-foreground/90">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground w-7 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-base md:text-lg font-light tracking-tight">
                      {entry.title}
                    </span>
                  </span>
                )}
              </li>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
