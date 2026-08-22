import type { Profile } from "@/lib/profile";
import { hasResume, isPlaceholder } from "@/lib/profile";
import Accent from "./Accent";
import Reveal from "./Reveal";

export default function Hero({ profile }: { profile: Profile }) {
  const { identity, hero } = profile;
  const resumeAvailable = hasResume(hero.resumePath);

  const universityParts = (identity.university ?? "").split("·").map((s) => s.trim());
  const firstName = identity.name.split(" ")[0];

  return (
    <section
      id="top"
      className="relative flex min-h-[86svh] flex-col justify-end px-6 pb-14 pt-32 md:px-12 md:pb-20"
    >
      <div>
        <Reveal variant="mask">
          <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:text-xs">
            <div>
              <p className="flex items-center gap-2.5">
                <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-clay" />
                {identity.location}
              </p>
              <p className="mt-2.5">~ {identity.roles.join(", ")}</p>
            </div>
            <div className="text-right leading-relaxed">
              <p className="text-ink/80">{identity.name}</p>
              {universityParts.map((part) => (
                <p key={part}>{part}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <h1 className="mt-8 font-display text-[clamp(4rem,14vw,11.5rem)] font-light leading-[0.92] tracking-[-0.045em]">
          {firstName}
        </h1>

        {(hero.headline || hero.subline) && (
          <Reveal delay={0.15}>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-ink/85 md:text-xl">
              {hero.headline && <Accent text={hero.headline} />}{" "}
              {hero.subline && <Accent text={hero.subline} />}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.22}>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {profile.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.type === "external" ? "_blank" : undefined}
                rel={social.type === "external" ? "noreferrer noopener" : undefined}
                data-cursor={social.type === "email" ? "EMAIL" : "LINK"}
                className="font-mono text-xs uppercase tracking-[0.18em] text-ink/80 transition-colors hover:text-moss-deep"
              >
                {social.label}
              </a>
            ))}
          </div>
        </Reveal>

        {resumeAvailable && (
          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-wrap items-center gap-3 pb-2">
              <a
                href={hero.resumePath}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="OPEN"
                className="rounded-full bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-transform duration-200 hover:-translate-y-0.5"
              >
                View Résumé
              </a>
              <a
                href={hero.resumePath}
                download
                data-cursor="DOWNLOAD"
                className="rounded-full border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/80 transition-colors duration-200 hover:border-moss hover:text-moss-deep"
              >
                Download
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
