import type { Profile } from "@/lib/profile";
import Accent from "./Accent";
import Reveal from "./Reveal";
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
    <section id="about" className="relative py-14 md:py-20 px-6 md:px-12">
      <Reveal>
        <div className="relative inline-block mb-8 md:mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-foreground/90">
            Beyond the{" "}
            <span className="font-editorial italic font-normal text-clay">résumé.</span>
          </h2>
          <div
            aria-hidden
            className="absolute -bottom-4 md:-bottom-6 left-0 right-0 pointer-events-none text-clay opacity-80"
          >
            <Squiggle />
          </div>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-6 lg:col-span-5">
          <Reveal>
            <div className="text-xl md:text-[22px] leading-[1.8] text-foreground/85 font-light space-y-6">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i}>
                  <Accent text={paragraph} />
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {tableRows.length > 0 && (
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.12}>
              <dl className="border border-foreground/10 bg-background/40 backdrop-blur-sm">
                {tableRows.map(([key, value], i) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between gap-6 px-6 py-4 ${
                      i > 0 ? "border-t border-foreground/10" : ""
                    }`}
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {key}
                    </dt>
                    <dd className="text-sm md:text-base font-medium text-foreground/90 text-right">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
