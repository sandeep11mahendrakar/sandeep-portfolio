import type { Profile } from "@/lib/profile";
import { isPlaceholder } from "@/lib/profile";
import ArrowLink from "./ArrowLink";
import FadeIn from "./FadeIn";
import Section from "./Section";

export default function Contact({
  profile,
  index,
}: {
  profile: Profile;
  index: string;
}) {
  const { identity, hero } = profile;
  const emailPlaceholder = !identity.email || isPlaceholder(identity.email);

  return (
    <Section id="contact" index={index} title="Contact">
      <FadeIn>
        <p className="font-serif text-4xl tracking-tight md:text-5xl">
          Let&rsquo;s talk.
        </p>

        <div className="mt-8 space-y-3 text-lg">
          {identity.email &&
            (emailPlaceholder ? (
              <p className="italic text-muted">{identity.email}</p>
            ) : (
              <ArrowLink href={`mailto:${identity.email}`} className="font-medium">
                {identity.email}
              </ArrowLink>
            ))}

          <div className="flex flex-wrap gap-x-8 gap-y-2 pt-2 text-base">
            {hero.github && !isPlaceholder(hero.github) && (
              <ArrowLink href={hero.github}>GitHub</ArrowLink>
            )}
            {hero.linkedin && !isPlaceholder(hero.linkedin) && (
              <ArrowLink href={hero.linkedin}>LinkedIn</ArrowLink>
            )}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
