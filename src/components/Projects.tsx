import type { Project } from "@/lib/profile";
import { isPlaceholder, projectNumber } from "@/lib/profile";
import Reveal from "./Reveal";

function WorkRow({ project, fallbackIndex }: { project: Project; fallbackIndex: number }) {
  const linked = !!project.link && !isPlaceholder(project.link);

  return (
    <Reveal>
      <li
        data-cursor={linked ? "view" : "hover"}
        className="group relative border-b border-foreground/15 py-4 md:py-5 grid grid-cols-12 gap-6 items-center hover:bg-foreground/5 transition-colors duration-500 px-4 md:px-6"
      >
        {linked && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`View ${project.title}`}
            className="absolute inset-0 z-10"
          />
        )}
        <div className="col-span-2 md:col-span-1 font-mono text-sm md:text-base uppercase tracking-[0.15em] text-muted-foreground">
          {projectNumber(project, fallbackIndex)}
        </div>

        <div className="col-span-10 md:col-span-5 min-w-0">
          <span className="inline-block mb-1.5 px-2.5 py-0.5 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.15em] rounded-full border border-matcha/50 bg-matcha/10 text-moss-deep whitespace-nowrap">
            {project.type ?? "Project"}
          </span>
          <h3 className="font-display text-lg md:text-xl lg:text-2xl font-light tracking-tight leading-snug text-foreground transition-transform duration-500 group-hover:translate-x-2">
            {project.title}
          </h3>
        </div>

        <div className="col-span-12 md:col-span-5 flex flex-col justify-center md:pl-6 min-w-0">
          {project.summary && (
            <p className="text-sm md:text-[15px] text-foreground/75 leading-relaxed mb-3 pr-4">
              {project.summary}
            </p>
          )}
          {project.stack.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {project.stack.slice(0, 3).map((item) => (
                <li
                  key={item}
                  className="px-3 py-1.5 text-[10px] font-mono rounded-full border border-foreground/15 bg-background/60 text-muted-foreground whitespace-nowrap"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-span-2 md:col-span-1 font-mono text-sm md:text-base text-right text-muted-foreground">
          <span className="text-xs md:text-sm">{project.year}</span>
        </div>
      </li>
    </Reveal>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="relative py-14 md:py-20 px-6 md:px-12">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-foreground/90 border-b-2 border-foreground/30 pb-4 w-fit">
            Some of My <span className="font-editorial italic font-normal text-clay">Work</span>
          </h2>
          <p className="font-editorial italic font-normal text-2xl md:text-3xl text-clay md:text-right">
            things I&rsquo;ve made.
          </p>
        </div>
      </Reveal>

      <ol className="border-t border-foreground/15">
        {projects.map((project, i) => (
          <WorkRow key={project.slug} project={project} fallbackIndex={i} />
        ))}
      </ol>
    </section>
  );
}
