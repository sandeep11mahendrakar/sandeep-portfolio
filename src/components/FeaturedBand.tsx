import type { Project } from "@/lib/profile";
import { isPlaceholder, projectNumber } from "@/lib/profile";
import MediaRenderer from "./MediaRenderer";
import Reveal from "./Reveal";

export default function FeaturedBand({ project }: { project: Project }) {
  const linked = !!project.link && !isPlaceholder(project.link);

  return (
    <section id="featured" aria-label="Featured project" className="px-6 pb-6 md:px-12">
      <Reveal>
        <div className="group/card relative rounded-2xl border border-line bg-white/25 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/40 md:p-9">
          <span
            aria-hidden
            className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-clay"
          />

          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-12">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-moss-deep">
                Featured Project
              </p>

              <h2 className="mt-4 font-display text-3xl font-light leading-tight tracking-[-0.03em] md:text-[2.6rem]">
                {linked ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="VIEW"
                    className="transition-colors hover:text-moss-deep"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h2>

              {project.summary && (
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/75">
                  {project.summary}
                </p>
              )}

              {project.stack.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {linked && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="VIEW"
                  className="group mt-7 inline-flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-moss-deep"
                >
                  View Project
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              )}
            </div>

            <div className="relative overflow-hidden rounded-xl border border-line shadow-[0_0_70px_rgba(133,152,181,0.16)] transition-transform duration-300 group-hover/card:scale-[1.01]">
              <div className="transition-transform duration-500 group-hover/card:scale-[1.02] group-hover/card:brightness-[1.03]">
                <MediaRenderer media={project.media} priority />
              </div>
            </div>
          </div>

          <span className="absolute bottom-5 right-7 hidden font-mono text-[10px] text-muted/60 md:block">
            {projectNumber(project, -1)}
          </span>
        </div>
      </Reveal>
    </section>
  );
}
