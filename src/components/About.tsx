import type { Profile } from "@/lib/profile";
import { isPlaceholder } from "@/lib/profile";
import FadeIn from "./FadeIn";
import Section from "./Section";

export default function About({
  about,
  index,
}: {
  about: Profile["about"];
  index: string;
}) {
  if (about.paragraphs.length === 0) return null;

  return (
    <Section id="about" index={index} title="About">
      <div className="max-w-2xl space-y-6">
        {about.paragraphs.map((paragraph, i) => (
          <FadeIn key={i} delay={0.05 * i}>
            <p
              className={`leading-relaxed ${
                isPlaceholder(paragraph) ? "italic text-muted" : "text-lg"
              }`}
            >
              {paragraph}
            </p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
