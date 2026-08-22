import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

export interface Identity {
  name: string;
  roles: string[];
  location?: string;
  university?: string;
  email?: string;
}

export interface Hero {
  headline?: string;
  subline?: string;
  github?: string;
  linkedin?: string;
  resumePath: string;
}

export interface StackCategory {
  category: string;
  items: string[];
}

export interface Project {
  slug: string;
  number?: number;
  title: string;
  year?: string;
  summary?: string;
  details?: string;
  stack: string[];
  link?: string;
}

export interface ExperienceEntry {
  org: string;
  role: string;
  period?: string;
  points: string[];
}

export interface WritingEntry {
  title: string;
  venue?: string;
  year?: string;
  url?: string;
}

export interface Profile {
  identity: Identity;
  hero: Hero;
  about: { paragraphs: string[] };
  stack: StackCategory[];
  featuredProject?: string;
  projects: Project[];
  experience: ExperienceEntry[];
  writing: WritingEntry[];
}

type Dict = Record<string, unknown>;

const str = (v: unknown): string | undefined =>
  typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;

const strArr = (v: unknown): string[] =>
  Array.isArray(v)
    ? v
        .map((x) =>
          typeof x === "string" ? x.trim() : typeof x === "number" ? String(x) : ""
        )
        .filter(Boolean)
    : [];

const dictArr = (v: unknown): Dict[] =>
  Array.isArray(v)
    ? v.filter(
        (x): x is Dict => typeof x === "object" && x !== null && !Array.isArray(x)
      )
    : [];

export function isPlaceholder(value?: string): boolean {
  return !!value && /^\[ADD/i.test(value.trim());
}

const EMPTY_PROFILE: Profile = {
  identity: { name: "Portfolio", roles: [] },
  hero: { resumePath: "/resume.pdf" },
  about: { paragraphs: [] },
  stack: [],
  projects: [],
  experience: [],
  writing: [],
};

export function getProfile(): Profile {
  const file = path.join(process.cwd(), "data", "profile.yaml");
  let doc: Dict | null;
  try {
    doc = yaml.load(fs.readFileSync(file, "utf8")) as Dict | null;
  } catch (error) {
    console.warn(
      `[profile] Could not parse ${file}: ${error instanceof Error ? error.message : String(error)}`
    );
    return EMPTY_PROFILE;
  }
  const d = doc ?? {};

  const identity = (d.identity ?? {}) as Dict;
  const hero = (d.hero ?? {}) as Dict;
  const about = (d.about ?? {}) as Dict;

  return {
    identity: {
      name: str(identity.name) ?? "Portfolio",
      roles: strArr(identity.roles),
      location: str(identity.location),
      university: str(identity.university),
      email: str(identity.email),
    },
    hero: {
      headline: str(hero.headline),
      subline: str(hero.subline),
      github: str(hero.github),
      linkedin: str(hero.linkedin),
      resumePath: str(hero.resumePath) ?? "/resume.pdf",
    },
    about: { paragraphs: strArr(about.paragraphs) },
    stack: dictArr(d.stack)
      .map((c) => ({
        category: str(c.category) ?? "",
        items: strArr(c.items),
      }))
      .filter((c) => c.category.length > 0 && c.items.length > 0),
    featuredProject: str(d.featuredProject),
    projects: dictArr(d.projects)
      .map((p, i) => ({
        slug: str(p.slug) ?? `project-${i + 1}`,
        number: typeof p.number === "number" ? p.number : undefined,
        title: str(p.title) ?? "",
        year: typeof p.year === "number" ? String(p.year) : str(p.year),
        summary: str(p.summary),
        details: str(p.details),
        stack: strArr(p.stack),
        link: str(p.link),
      }))
      .filter((p) => p.title.length > 0 && !isPlaceholder(p.title)),
    experience: dictArr(d.experience)
      .map((e) => ({
        org: str(e.org) ?? "",
        role: str(e.role) ?? "",
        period: str(e.period),
        points: strArr(e.points),
      }))
      .filter((e) => e.org.length > 0 || e.role.length > 0),
    writing: dictArr(d.writing)
      .map((w) => ({
        title: str(w.title) ?? "",
        venue: str(w.venue),
        year: typeof w.year === "number" ? String(w.year) : str(w.year),
        url: str(w.url),
      }))
      .filter((w) => w.title.length > 0),
  };
}

export function hasResume(resumePath = "/resume.pdf"): boolean {
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public", resumePath.replace(/^\//, ""))
    );
  } catch {
    return false;
  }
}

export function projectNumber(project: Project, fallbackIndex: number): string {
  return String(project.number ?? fallbackIndex + 1).padStart(2, "0");
}
