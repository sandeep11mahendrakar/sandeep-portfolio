import Image from "next/image";
import type { Project } from "@/lib/profile";
import { hasPublicFile, isPlaceholder, projectNumber } from "@/lib/profile";
import ArrowLink from "./ArrowLink";
import FadeIn from "./FadeIn";
import Section from "./Section";

export default function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: string;
}) {
  const linked = !!project.link && !isPlaceholder(project.link);
  const imageAvailable = hasPublicFile(project.image);

  return (
    <Section id="work" index={index} title="Featured Project">
      <FadeIn>
        <div className="grid gap-6 md:grid-cols-[72px_1fr] md:gap-10">
          <span className="pt-2 font-mono text-sm text-muted md:pt-3">
            {projectNumber(project, -1)}
          </span>

          <div>
            {imageAvailable && project.image && (
              <div className="mb-10 overflow-hidden rounded-lg border border-line">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  width={1280}
                  height={720}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
              {linked ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-accent"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h2>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-4 text-xs uppercase tracking-[0.2em] text-muted">
              {project.year && <span>{project.year}</span>}
              {linked && (
                <ArrowLink href={project.link as string} className="normal-case tracking-normal">
                  View project
                </ArrowLink>
              )}
            </p>

            {project.summary && (
              <p
                className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                  isPlaceholder(project.summary) ? "italic text-muted" : "text-ink/85"
                }`}
              >
                {project.summary}
              </p>
            )}

            {project.details && (
              <p
                className={`mt-4 max-w-2xl leading-relaxed ${
                  isPlaceholder(project.details)
                    ? "italic text-muted/80"
                    : "text-muted"
                }`}
              >
                {project.details}
              </p>
            )}

            {project.stack.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
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
        </div>
      </FadeIn>
    </Section>
  );
}
