import type { Profile } from "@/lib/profile";
import { isPlaceholder } from "@/lib/profile";
import Reveal from "./Reveal";

export default function Contact({ profile }: { profile: Profile }) {
  const { identity, socials } = profile;
  const emailPlaceholder = !identity.email || isPlaceholder(identity.email);

  return (
    <section id="contact" className="relative pt-20 md:pt-32 px-6 md:px-12">
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground/90 border-b-2 border-foreground/30 pb-4 mb-12 md:mb-16 w-full">
          Contact Me
        </h2>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-end pb-20 md:pb-28">
        <Reveal delay={0.08}>
          <div className="relative">
            <p className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-foreground/90">
              Have an idea
              <br />
              worth{" "}
              <span className="relative inline-block">
                building?
                <svg
                  aria-hidden
                  viewBox="0 0 1000 300"
                  className="absolute -inset-x-6 -inset-y-3 w-[calc(100%+3rem)] h-[calc(100%+1.5rem)] text-matcha opacity-80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 30 70 C 10 60, 0 20, 50 10 C 120 0, 230 5, 250 30 C 270 55, 220 90, 120 95 C 30 100, 10 70, 25 40 C 35 25, 100 15, 180 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <br />
              <span className="font-editorial italic font-normal text-matcha">Let&rsquo;s</span>{" "}
              talk.
              <svg
                aria-hidden
                viewBox="0 0 400 200"
                className="hidden lg:block absolute -right-56 top-2 w-72 text-matcha opacity-80"
                fill="none"
              >
                <path
                  d="M 10 30 C 150 10, 300 60, 360 160 M 360 160 L 330 140 M 360 160 L 352 126"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="flex flex-col items-start lg:items-end gap-6">
            {!emailPlaceholder && identity.email && (
              <a
                href={`mailto:${identity.email}`}
                data-cursor="email"
                className="text-xl md:text-2xl lg:text-3xl font-light text-foreground underline decoration-foreground/25 decoration-dotted underline-offset-8 hover:text-matcha hover:decoration-matcha transition-colors"
              >
                {identity.email}
              </a>
            )}
            {socials.filter((s) => s.type === "external").length > 0 && (
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {socials
                  .filter((s) => s.type === "external")
                  .map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="hover"
                      className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {social.label} ↗
                    </a>
                  ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
