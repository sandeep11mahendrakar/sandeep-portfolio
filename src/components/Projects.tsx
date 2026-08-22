import type { Project } from "@/lib/profile";
import { isPlaceholder, projectNumber } from "@/lib/profile";
import MediaRenderer from "./MediaRenderer";
import Reveal from "./Reveal";
import Section from "./Section";

function WorkRow({ project, fallbackIndex }: { project: Project; fallbackIndex: number }) {
  const linked = !!project.link && !isPlaceholder(project.link);
  const hasMedia = !!project.media;

  const inner = (
    <div className="grid items-start gap-6 py-12 transition-transform duration-300 group-hover/row:translate-x-2 md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.15fr)_72px] md:gap-10 md:py-16">
      <span className="font-mono text-xs text-muted md:pt-2.5">
        {projectNumber(project, fallbackIndex)}
      </span>

      <div className="relative min-w-0">
        <h3 className="relative inline-block font-display text-4xl font-light leading-tight tracking-[-0.03em] text-ink/90 md:text-5xl">
          {project.title}
          {linked && (
            <span
              aria-hidden
              className="pointer-events-none absolute -right-3 top-1/2 hidden h-20 w-20 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-moss-deep/95 font-mono text-[9px] uppercase tracking-[0.16em] text-paper opacity-0 shadow-[0_10px_40px_rgba(100,124,87,0.35)] transition-all duration-300 group-hover/row:scale-100 group-hover/row:opacity-100 lg:-right-24 md:flex"
            >
              Open
            </span>
          )}
        </h3>
      </div>

      <div>
        {hasMedia && (
          <div className="mb-5 overflow-hidden rounded-xl border border-line md:hidden">
            <MediaRenderer media={project.media} showPlaceholder={false} />
          </div>
        )}

        {project.summary && (
          <p className="text-[15px] leading-relaxed text-ink/75">{project.summary}</p>
        )}
        {project.details && !isPlaceholder(project.details) && (
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.details}</p>
        )}

        {project.stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((item) => (
              <li
                key={item}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="font-mono text-xs text-muted md:pt-2.5 md:text-right">{project.year}</p>
    </div>
  );

  return (
    <Reveal>
      <div className="group/row border-t border-line last:border-b">
        {linked ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="block"
          >
            {inner}
          </a>
        ) : (
          inner
        )}
      </div>
    </Reveal>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <Section id="work" eyebrow="Selected Projects" title="Some of My *Work*">
      <div>
        {projects.map((project, i) => (
          <WorkRow key={project.slug} project={project} fallbackIndex={i} />
        ))}
      </div>
    </Section>
  );
}
