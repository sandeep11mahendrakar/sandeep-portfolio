import type { Profile } from "@/lib/profile";
import { isPlaceholder } from "@/lib/profile";
import ArrowLink from "./ArrowLink";
import FadeIn from "./FadeIn";

export default function Hero({
  profile,
  resumeAvailable,
}: {
  profile: Profile;
  resumeAvailable: boolean;
}) {
  const { identity, hero } = profile;

  const metaParts = [
    identity.location,
    identity.university,
    identity.roles.join(" / "),
  ].filter(Boolean);

  return (
    <header className="relative">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-36 md:pb-32 md:pt-48">
        {metaParts.length > 0 && (
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-muted md:text-sm">
              {metaParts.map((part, i) => (
                <span key={part}>
                  {i > 0 && (
                    <span aria-hidden className="mx-3 text-line">
                      ·
                    </span>
                  )}
                  {part}
                </span>
              ))}
            </p>
          </FadeIn>
        )}

        <FadeIn delay={0.06}>
          <h1 className="mt-8 font-serif text-[clamp(2.75rem,9vw,6.5rem)] leading-[1.02] tracking-tight">
            {identity.name}
          </h1>
        </FadeIn>

        {hero.headline && (
          <FadeIn delay={0.12}>
            <p className="mt-6 max-w-2xl font-serif text-2xl italic leading-snug text-ink/85 md:text-3xl">
              {hero.headline}
            </p>
          </FadeIn>
        )}

        {hero.subline && (
          <FadeIn delay={0.18}>
            <p
              className={`mt-6 max-w-xl leading-relaxed text-muted ${
                hero.headline ? "text-base" : "text-lg"
              }`}
            >
              {hero.subline}
            </p>
          </FadeIn>
        )}

        <FadeIn delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium">
            {hero.github && !isPlaceholder(hero.github) && (
              <ArrowLink href={hero.github}>GitHub</ArrowLink>
            )}
            {hero.linkedin && !isPlaceholder(hero.linkedin) && (
              <ArrowLink href={hero.linkedin}>LinkedIn</ArrowLink>
            )}
            {resumeAvailable && (
              <a
                href={hero.resumePath}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-baseline gap-1.5 transition-colors hover:text-accent"
              >
                Résumé
                <span
                  aria-hidden
                  className="inline-block text-[0.85em] transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            )}
          </div>
        </FadeIn>
      </div>
    </header>
  );
}
