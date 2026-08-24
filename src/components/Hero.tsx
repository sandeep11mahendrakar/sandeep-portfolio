import type { Profile, Project } from "@/lib/profile";
import { hasResume, isPlaceholder } from "@/lib/profile";
import Accent from "./Accent";
import MediaRenderer from "./MediaRenderer";
import { FadeUp, Words } from "./Enter";

function FeaturedCard({ project }: { project: Project }) {
  const linked = !!project.link && !isPlaceholder(project.link);
  return (
    <FadeUp
      delay={0.9}
      className="hidden lg:flex flex-col items-end justify-end absolute right-8 xl:right-16 bottom-16 w-[50%] xl:w-[45%] z-10"
    >
      <a
        href={linked ? project.link : undefined}
        target={linked ? "_blank" : undefined}
        rel={linked ? "noreferrer noopener" : undefined}
        data-cursor="view"
        aria-label={`View ${project.title}`}
        className="group block w-full text-left p-6 md:p-8 rounded-3xl border border-foreground/10 bg-background/75 backdrop-blur-sm hover:bg-background/90 transition-all duration-500 overflow-hidden relative"
      >
        <span
          aria-hidden
          className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-matcha"
        />
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-10">
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-matcha font-bold mb-4 block">
                Featured Project
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground/90 group-hover:text-foreground transition-colors mb-4">
                {project.title}
              </h3>
              {project.summary && (
                <p className="text-base text-foreground/70 leading-relaxed mb-6 max-w-sm">
                  {project.summary}
                </p>
              )}
              {project.stack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8 xl:mb-12">
                  {project.stack.slice(0, 6).map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-[10px] font-mono rounded-full border border-foreground/10 text-foreground/70 bg-background/50 whitespace-nowrap"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-foreground">
              View Project
              <svg
                className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </div>
          </div>
          <div className="w-full xl:w-[260px] h-[220px] flex-shrink-0 bg-muted-foreground/10 rounded-2xl overflow-hidden shadow-2xl relative translate-y-2 group-hover:-translate-y-2 transition-transform duration-700 ease-out border border-foreground/10">
            <MediaRenderer media={project.media} priority />
          </div>
        </div>
      </a>
    </FadeUp>
  );
}

export default function Hero({
  profile,
  featured,
}: {
  profile: Profile;
  featured?: Project;
}) {
  const { identity, hero } = profile;
  const resumeAvailable = hasResume(hero.resumePath);

  const universityParts = (identity.university ?? "")
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);
  const firstName = identity.name.split(" ")[0];
  const lastName = identity.name.split(" ").slice(1).join(" ");
  const longName = lastName.length > 7 || firstName.length > 9;

  return (
    <section
      id="top"
      className="relative min-h-[60svh] flex flex-col justify-end pt-32 pb-8 md:pb-10 px-6 md:px-12"
    >
      <FadeUp
        delay={0.1}
        className="absolute top-28 md:top-32 left-6 md:left-12 right-6 md:right-12 flex justify-between text-sm md:text-base font-mono uppercase tracking-[0.15em] text-muted-foreground"
      >
        <div>
          <p className="mt-1 flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-clay" />
            {identity.location}
          </p>
        </div>
        <div className="text-right leading-relaxed">
          <p>{universityParts.join(" · ")}</p>
        </div>
      </FadeUp>

      <div className="mt-20 md:mt-16 origin-bottom relative">
        <div className="font-mono text-sm md:text-base uppercase tracking-[0.2em] text-muted-foreground mb-6 md:mb-8">
          <Words text={`— ${identity.roles.join(", ")}`} delay={0.25} />
        </div>

        <h1
          className={`font-display ${
            longName
              ? "text-[11.5vw] md:text-[7vw]"
              : "text-[13.5vw] md:text-[9.5vw]"
          } leading-[0.92] tracking-[-0.04em] font-light`}
        >
          <Words text={firstName} delay={0.35} />
          <span
            className={`block font-editorial italic font-normal text-matcha ${
              longName ? "pl-[4vw] md:pl-[8vw]" : "pl-[7.2vw] md:pl-[12.6vw]"
            }`}
          >
            <Words text={lastName ? `${lastName}.` : ""} delay={0.5} />
          </span>
        </h1>

        <FeaturedCard project={featured as Project} />

        <div className="mt-10 md:mt-12 w-full md:w-[45%] flex flex-col gap-10 md:gap-12">
          {(hero.headline || hero.subline) && (
            <FadeUp delay={0.7}>
              <p className="text-xl md:text-2xl leading-relaxed text-foreground/85">
                {hero.headline && <Accent text={hero.headline} />}{" "}
                {hero.subline && <Accent text={hero.subline} />}
              </p>
            </FadeUp>
          )}

          <FadeUp delay={0.8}>
            <div className="flex flex-col gap-8">
              <div className="inline-flex flex-wrap items-center gap-6 md:gap-12 text-base md:text-lg font-medium uppercase tracking-[0.15em] text-foreground/80">
                {profile.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.type === "external" ? "_blank" : undefined}
                    rel={social.type === "external" ? "noreferrer noopener" : undefined}
                    data-cursor="hover"
                    className="hover:text-foreground transition-colors py-2"
                  >
                    {social.name}
                  </a>
                ))}
              </div>

              {resumeAvailable && (
                <div className="inline-flex flex-wrap items-center gap-4">
                  <a
                    href={hero.resumePath}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="hover"
                    className="px-6 py-3 rounded-full bg-foreground text-background font-mono text-xs md:text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors"
                  >
                    View Resume
                  </a>
                  <a
                    href={hero.resumePath}
                    download
                    data-cursor="hover"
                    className="px-6 py-3 rounded-full border border-foreground/20 text-foreground font-mono text-xs md:text-sm uppercase tracking-widest hover:bg-foreground/5 transition-colors"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
