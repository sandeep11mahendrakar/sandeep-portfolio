import About from "@/components/About";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import SectionDots from "@/components/SectionDots";
import Stack from "@/components/Stack";
import type { NavLink } from "@/components/types";
import Writing from "@/components/Writing";
import { getProfile } from "@/lib/profile";

export default function Home() {
  const profile = getProfile();

  const featured = profile.projects.find(
    (project) => project.slug === profile.featuredProject
  );

  const sectionExists: Record<string, boolean> = {
    top: true,
    home: true,
    about: profile.about.paragraphs.length > 0,
    skills: profile.stack.length > 0,
    work: profile.projects.length > 0,
    writing: profile.writing.length > 0,
    featured: !!featured,
    contact: true,
  };

  const fallbackLinks: NavLink[] = [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    ...(profile.stack.length > 0 ? [{ label: "Skills", href: "#skills" }] : []),
    ...(profile.projects.length > 0 ? [{ label: "Work", href: "#work" }] : []),
    ...(profile.writing.length > 0 ? [{ label: "Writing", href: "#writing" }] : []),
    { label: "Contact", href: "#contact" },
  ];

  const links: NavLink[] =
    profile.navigation && profile.navigation.length > 0
      ? profile.navigation
          .filter((item) => sectionExists[item.target] !== false)
          .map((item) => ({
            label:
              item.label.charAt(0).toUpperCase() + item.label.slice(1).toLowerCase(),
            href: item.target === "home" ? "#top" : `#${item.target}`,
          }))
      : fallbackLinks;

  const dotIds = Object.keys(sectionExists).filter(
    (id) => !["home", "featured"].includes(id) && sectionExists[id]
  );

  return (
    <main className="grain relative min-h-screen text-foreground overflow-x-clip">
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute -top-20 -left-10 w-[45vw] h-[45vw] rounded-full opacity-35 blur-3xl">
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, var(--matcha) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="absolute top-1/4 right-0 w-[45vw] h-[45vw] rounded-full opacity-25 blur-3xl">
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, var(--clay) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-1/4 w-[60vw] h-[60vw] rounded-full opacity-30 blur-3xl">
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, oklch(0.82 0.05 250) 0%, transparent 70%)",
            }}
          />
        </div>
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.05] text-foreground"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <Nav name={profile.identity.name} links={links} />
      <SectionDots ids={dotIds} />
      <Cursor />

      <div id="main">
        <Hero profile={profile} featured={featured} />

        <About profile={profile} />

        {profile.stack.length > 0 && (
          <Stack
            stack={profile.stack}
            intro={profile.stackIntro}
            aside={profile.stackAside}
          />
        )}

        <Projects projects={profile.projects} />

        <Writing entries={profile.writing} />

        <Contact profile={profile} />
      </div>

      <Footer profile={profile} />
    </main>
  );
}
