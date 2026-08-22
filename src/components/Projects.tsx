import type { Project } from "@/lib/profile";
import { isPlaceholder, projectNumber } from "@/lib/profile";
import FadeIn from "./FadeIn";
import Section from "./Section";

function ProjectRow({ project, fallbackIndex }: { project: Project; fallbackIndex: number }) {
  const linked = !!project.link && !isPlaceholder(project.link);

  const body = (
    <div className="grid gap-3 py-10 transition-transform duration-300 group-hover:translate-x-2 md:grid-cols-[72px_1fr_100px] md:gap-8 md:py-12">
      <span className="pt-1.5 font-mono text-sm text-muted">
        {projectNumber(project, fallbackIndex)}
      </span>

      <div>
        <h3 className="font-serif text-2xl leading-snug tracking-tight md:text-3xl">
          {project.title}
        </h3>

        {project.summary && (
          <p
            className={`mt-3 max-w-2xl leading-relaxed ${
              isPlaceholder(project.summary) ? "italic text-muted" : "text-ink/80"
            }`}
          >
            {project.summary}
          </p>
        )}

        {project.details && (
          <p
            className={`mt-2 max-w-2xl text-sm leading-relaxed ${
              isPlaceholder(project.details)
                ? "italic text-muted/80"
                : "text-muted"
            }`}
          >
            {project.details}
          </p>
        )}

        {project.stack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className={`rounded-full border border-line px-3 py-1 text-xs ${
                  isPlaceholder(item) ? "italic text-muted" : "text-muted"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-baseline justify-start gap-2 md:justify-end">
        {project.year && (
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            {project.year}
          </span>
        )}
        {linked && (
          <span
            aria-hidden
            className="inline-block text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            ↗
          </span>
        )}
      </div>
    </div>
  );

  if (!linked) {
    return <div className="group border-t border-line last:border-b">{body}</div>;
  }

  return (
    <div className="group border-t border-line last:border-b">
      <a href={project.link} target="_blank" rel="noreferrer noopener" className="block">
        {body}
      </a>
    </div>
  );
}

export default function Projects({
  projects,
  index,
  numberOffset = 0,
}: {
  projects: Project[];
  index: string;
  numberOffset?: number;
}) {
  if (projects.length === 0) return null;

  return (
    <Section id="projects" index={index} title="Projects">
      <FadeIn>
        <div>
          {projects.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              fallbackIndex={numberOffset + i}
            />
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
