import type { Profile } from "@/lib/profile";
import { isPlaceholder } from "@/lib/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Contact({ profile }: { profile: Profile }) {
  const { identity, socials } = profile;
  const emailPlaceholder = !identity.email || isPlaceholder(identity.email);

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      heading={<span className="font-serif italic font-normal">Contact me</span>}
    >
      <Reveal variant="blur">
        <p className="max-w-3xl font-display text-[clamp(2rem,5vw,3.75rem)] font-light leading-[1.15] tracking-[-0.03em] text-ink/90">
          Have an idea worth building?
          <span className="font-serif italic text-moss"> Let&rsquo;s</span> talk.
        </p>
      </Reveal>

      <div className="mt-10 space-y-3">
        {!emailPlaceholder && identity.email && (
          <Reveal delay={0.08}>
            <a
              href={`mailto:${identity.email}`}
              data-cursor="EMAIL"
              className="group inline-flex items-baseline gap-2.5 text-lg text-ink transition-colors hover:text-moss-deep md:text-xl"
            >
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-clay"
              />
              <span className="underline decoration-line decoration-dotted underline-offset-8 transition-colors group-hover:decoration-moss-deep">
                {identity.email}
              </span>
            </a>
          </Reveal>
        )}

        {socials.filter((s) => s.type === "external").length > 0 && (
          <Reveal delay={0.14}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4">
              {socials
                .filter((s) => s.type === "external")
                .map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="LINK"
                    className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-moss-deep"
                  >
                    {social.label} ↗
                  </a>
                ))}
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
