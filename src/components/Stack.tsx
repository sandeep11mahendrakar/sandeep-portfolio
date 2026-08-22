import type { StackCategory } from "@/lib/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Stack({
  stack,
}: {
  stack: StackCategory[];
}) {
  if (stack.length === 0) return null;

  return (
    <Section id="skills" eyebrow="Toolbox" title="What I *work* with">
      <div className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 xl:grid-cols-4">
        {stack.map((group, i) => (
          <Reveal key={group.category} delay={0.05 * i} className="h-full">
            <div className="-ml-px -mt-px h-full border-b border-r border-line p-6 transition-colors duration-300 hover:bg-white/35 md:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-moss-deep">
                {group.category}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-muted transition-colors duration-200 hover:border-moss hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
