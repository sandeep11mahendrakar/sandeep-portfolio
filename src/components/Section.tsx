import type { ReactNode } from "react";
import Accent from "./Accent";
import Reveal from "./Reveal";

export default function Section({
  id,
  eyebrow,
  title,
  heading,
  description,
  children,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  heading?: ReactNode;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-6 py-14 md:px-12 md:py-20">
      {(eyebrow || title || heading) && (
        <div className="mb-8 md:mb-12">
          {eyebrow && (
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-moss-deep md:text-xs">
                {eyebrow}
              </p>
            </Reveal>
          )}
          {(title || heading) && (
            <Reveal delay={0.06}>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-light leading-[1.05] tracking-[-0.03em] text-ink">
                {heading ?? (title ? <Accent text={title} /> : null)}
              </h2>
              {description && (
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
                  {description}
                </p>
              )}
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <hr className="mt-8 border-t border-line" />
          </Reveal>
        </div>
      )}
      {children}
    </section>
  );
}
