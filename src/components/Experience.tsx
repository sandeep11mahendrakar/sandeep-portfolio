import type { Profile } from "@/lib/profile";
import Reveal from "./Reveal";
import Squiggle from "./Squiggle";

export default function Experience({
  entries,
}: {
  entries: Profile["experience"];
}) {
  if (entries.length === 0) return null;

  return (
    <section id="experience" className="relative py-14 md:py-20 px-6 md:px-12">
      <Reveal>
        <div className="relative inline-block mb-8 md:mb-10">
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-foreground/90">
            Where I&rsquo;ve{" "}
            <span className="font-editorial italic font-normal text-clay">been.</span>
          </h2>
          <div
            aria-hidden
            className="absolute -bottom-4 md:-bottom-6 left-0 right-0 pointer-events-none text-clay opacity-80"
          >
            <Squiggle />
          </div>
        </div>
      </Reveal>

      <ol className="border-t border-foreground/15">
        {entries.map((entry, i) => (
          <Reveal key={`${entry.org}-${i}`} delay={0.04 * i}>
            <li className="relative border-b border-foreground/15 py-8 md:py-10 grid grid-cols-12 gap-4 md:gap-6 items-baseline px-4 md:px-6">
              <div className="col-span-12 md:col-span-3 font-mono text-xs md:text-sm uppercase tracking-[0.15em] text-muted-foreground">
                {entry.period}
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-6">
                <h3 className="font-display text-2xl md:text-3xl font-light tracking-tight leading-tight text-foreground">
                  {entry.role}
                </h3>
                <p className="mt-1 font-mono text-xs md:text-sm uppercase tracking-[0.12em] text-clay">
                  {entry.org}
                </p>
                {entry.points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {entry.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-sm md:text-base text-foreground/80 leading-relaxed"
                      >
                        <span aria-hidden className="mt-[0.6em] h-1 w-1 flex-shrink-0 rounded-full bg-matcha" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
