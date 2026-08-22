import type { StackCategory } from "@/lib/profile";
import { isPlaceholder } from "@/lib/profile";
import FadeIn from "./FadeIn";
import Section from "./Section";

export default function Stack({
  stack,
  index,
}: {
  stack: StackCategory[];
  index: string;
}) {
  if (stack.length === 0) return null;

  return (
    <Section id="stack" index={index} title="Stack">
      <dl>
        {stack.map((group, i) => (
          <FadeIn key={group.category} delay={0.04 * i}>
            <div
              className={`grid gap-2 py-5 md:grid-cols-[220px_1fr] md:gap-8 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <dt className="pt-0.5 text-sm font-medium">{group.category}</dt>
              <dd
                className={`leading-loose ${
                  group.items.some((item) => isPlaceholder(item))
                    ? "italic text-muted"
                    : "text-muted"
                }`}
              >
                {group.items.join("   ·   ")}
              </dd>
            </div>
          </FadeIn>
        ))}
      </dl>
    </Section>
  );
}
