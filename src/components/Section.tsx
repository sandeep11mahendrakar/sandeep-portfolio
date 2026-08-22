import type { ReactNode } from "react";
import FadeIn from "./FadeIn";

export default function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <FadeIn>
          <p className="mb-12 text-xs uppercase tracking-[0.25em] text-muted">
            <span>{index}</span>
            <span aria-hidden className="mx-2">
              —
            </span>
            {title}
          </p>
        </FadeIn>
        {children}
      </div>
    </section>
  );
}
