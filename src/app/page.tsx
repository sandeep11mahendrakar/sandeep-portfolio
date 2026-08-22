import About from "@/components/About";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import FeaturedBand from "@/components/FeaturedBand";
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
            label: item.label,
            href: item.target === "home" ? "#top" : `#${item.target}`,
          }))
      : fallbackLinks;

  const dotIds = Object.keys(sectionExists).filter(
    (id) => !["home", "featured"].includes(id) && sectionExists[id]
  );

  return (
    <div className="relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <Nav name={profile.identity.name} links={links} />
      <SectionDots ids={dotIds} />
      <Cursor />

      <main id="main">
        <Hero profile={profile} />

        {featured && <FeaturedBand project={featured} />}

        <About profile={profile} />

        {profile.stack.length > 0 && <Stack stack={profile.stack} />}

        <Projects projects={profile.projects} />

        <Writing entries={profile.writing} />

        <Contact profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
