import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import FeaturedProject from "@/components/FeaturedProject";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav, { type NavLink } from "@/components/Nav";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Writing from "@/components/Writing";
import { getProfile, hasResume } from "@/lib/profile";

export default function Home() {
  const profile = getProfile();
  const resumeAvailable = hasResume(profile.hero.resumePath);

  const featured = profile.projects.find(
    (project) => project.slug === profile.featuredProject
  );
  const listedProjects = featured
    ? profile.projects.filter((project) => project.slug !== featured.slug)
    : profile.projects;
  const numberOffset = featured
    ? profile.projects.findIndex((project) => project.slug === featured.slug)
    : 0;

  const links: NavLink[] = [
    ...(featured ? [{ label: "Work", href: "#work" }] : []),
    { label: "About", href: "#about" },
    ...(profile.stack.length > 0 ? [{ label: "Stack", href: "#stack" }] : []),
    ...(listedProjects.length > 0
      ? [{ label: "Projects", href: "#projects" }]
      : []),
    ...(profile.experience.length > 0
      ? [{ label: "Experience", href: "#experience" }]
      : []),
    ...(profile.writing.length > 0
      ? [{ label: "Writing", href: "#writing" }]
      : []),
    { label: "Contact", href: "#contact" },
  ];

  let sectionNumber = 0;
  const nextSection = () => String(++sectionNumber).padStart(2, "0");

  return (
    <div id="top" className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <Nav name={profile.identity.name} links={links} />

      <main id="main">
        <Hero profile={profile} resumeAvailable={resumeAvailable} />

        {featured && (
          <FeaturedProject project={featured} index={nextSection()} />
        )}

        {profile.about.paragraphs.length > 0 && (
          <About about={profile.about} index={nextSection()} />
        )}

        {profile.stack.length > 0 && (
          <Stack stack={profile.stack} index={nextSection()} />
        )}

        {listedProjects.length > 0 && (
          <Projects
            projects={listedProjects}
            index={nextSection()}
            numberOffset={numberOffset}
          />
        )}

        {profile.experience.length > 0 && (
          <Experience entries={profile.experience} index={nextSection()} />
        )}

        {profile.writing.length > 0 && (
          <Writing entries={profile.writing} index={nextSection()} />
        )}

        <Contact profile={profile} index={nextSection()} />
      </main>

      <Footer name={profile.identity.name} />
    </div>
  );
}
