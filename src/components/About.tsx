import type { Profile } from "@/lib/profile";
import Accent from "./Accent";
import Reveal from "./Reveal";
import Section from "./Section";
import Squiggle from "./Squiggle";

export default function About({ profile }: { profile: Profile }) {
  const { about, identity } = profile;
  if (about.paragraphs.length === 0) return null;

  const tableRows: [string, string][] = [];
  if (identity.location) tableRows.push(["Based", identity.location]);
  if (identity.university) {
    const [university, major] = identity.university.split("·").map((s) => s.trim());
    if (major) tableRows.push(["Major", major]);
    if (university) tableRows.push(["University", university]);
  }
  if (identity.roles.length > 0) {
    tableRows.push(["Focus", identity.roles.join(" · ")]);
  }

  return (
    <Section
      id="about"
      eyebrow="About"
      heading={
        <>
          Beyond the{" "}
          <span className="relative inline-block font-serif italic font-normal">
            résumé.
            <Squiggle className="text-moss" />
          </span>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16">
        <div className="max-w-xl space-y-6">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <p className="text-lg leading-[1.75] text-ink/80 md:text-xl">
                <Accent text={paragraph} />
              </p>
            </Reveal>
          ))}
        </div>

        {tableRows.length > 0 && (
          <Reveal delay={0.12}>
            <dl className="border border-line bg-paper/60 backdrop-blur-[1px]">
              {tableRows.map(([key, value], i) => (
                <div
                  key={key}
                  className={`grid grid-cols-[110px_minmax(0,1fr)] gap-4 px-5 py-4 ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted pt-0.5">
                    {key}
                  </dt>
                  <dd className="text-sm leading-relaxed text-ink/85">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
