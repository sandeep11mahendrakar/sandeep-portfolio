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

export type MediaKind = "image" | "gif" | "video";

export interface ProjectMedia {
  type: MediaKind;
  src: string;
  alt?: string;
  poster?: string;
  controls: boolean;
  autoplay: boolean;
  muted: boolean;
  loop: boolean;
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
  media?: ProjectMedia;
}

export interface SocialLink {
  name: string;
  label: string;
  url: string;
  type: "external" | "email";
}

export interface NavigationItem {
  label: string;
  target: string;
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
  socials: SocialLink[];
  navigation?: NavigationItem[];
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
  socials: [],
};

const MEDIA_TYPES: MediaKind[] = ["image", "gif", "video"];

function parseMedia(p: Dict, slug: string): ProjectMedia | undefined {
  const legacy = str(p.image);
  const raw = (typeof p.media === "object" && p.media !== null ? p.media : null) as Dict | null;

  if (!raw && !legacy) return undefined;
  if (!raw) {
    return {
      type: "image",
      src: legacy as string,
      alt: undefined,
      controls: false,
      autoplay: false,
      muted: true,
      loop: false,
    };
  }

  const src = str(raw.src);
  const type = str(raw.type)?.toLowerCase();
  if (!src || !type) {
    console.warn(`[profile] project "${slug}": media requires "type" and "src" — ignored.`);
    return undefined;
  }
  if (!MEDIA_TYPES.includes(type as MediaKind)) {
    console.warn(
      `[profile] project "${slug}": unknown media type "${type}" (expected image|gif|video) — ignored.`
    );
    return undefined;
  }
  if (isPlaceholder(src)) return undefined;

  return {
    type: type as MediaKind,
    src,
    alt: str(raw.alt),
    poster: str(raw.poster),
    controls: raw.controls === true,
    autoplay: raw.autoplay !== false,
    muted: raw.muted !== false,
    loop: raw.loop !== false,
  };
}

function parseSocials(d: Dict, hero: Hero, email?: string): SocialLink[] {
  const socials = dictArr(d.socials)
    .map((s, i) => {
      const url = str(s.url);
      const name = str(s.name);
      if (!url || !name || isPlaceholder(url)) {
        if (name || url) {
          console.warn(`[profile] socials[${i}]: missing ${!url ? "url" : "name"} — ignored.`);
        }
        return undefined;
      }
      return {
        name,
        label: str(s.label) ?? name.toUpperCase(),
        url,
        type: str(s.type)?.toLowerCase() === "email" ? ("email" as const) : ("external" as const),
      };
    })
    .filter((s): s is SocialLink => s !== undefined);

  if (socials.length > 0) return socials;

  const fallback: SocialLink[] = [];
  if (hero.github && !isPlaceholder(hero.github)) {
    fallback.push({ name: "GitHub", label: "GITHUB", url: hero.github, type: "external" });
  }
  if (hero.linkedin && !isPlaceholder(hero.linkedin)) {
    fallback.push({ name: "LinkedIn", label: "LINKEDIN", url: hero.linkedin, type: "external" });
  }
  if (email && !isPlaceholder(email)) {
    fallback.push({ name: "Email", label: "EMAIL", url: `mailto:${email}`, type: "email" });
  }
  return fallback;
}

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

  const parsedIdentity: Identity = {
    name: str(identity.name) ?? "Portfolio",
    roles: strArr(identity.roles),
    location: str(identity.location),
    university: str(identity.university),
    email: str(identity.email),
  };
  const parsedHero: Hero = {
    headline: str(hero.headline),
    subline: str(hero.subline),
    github: str(hero.github),
    linkedin: str(hero.linkedin),
    resumePath: str(hero.resumePath) ?? "/resume.pdf",
  };

  return {
    identity: parsedIdentity,
    hero: parsedHero,
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
        media: parseMedia(p, str(p.slug) ?? `project-${i + 1}`),
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
    socials: parseSocials(d, parsedHero, parsedIdentity.email),
    navigation: dictArr(d.navigation)
      .map((n) => ({
        label: str(n.label) ?? "",
        target: str(n.target) ?? "",
      }))
      .filter((n) => n.label.length > 0 && n.target.length > 0),
  };
}

export function hasPublicFile(publicPath?: string): boolean {
  if (!publicPath || isPlaceholder(publicPath)) return false;
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public", publicPath.replace(/^\//, ""))
    );
  } catch {
    return false;
  }
}

export function hasResume(resumePath = "/resume.pdf"): boolean {
  return hasPublicFile(resumePath);
}

export function projectNumber(project: Project, fallbackIndex: number): string {
  return String(project.number ?? fallbackIndex + 1).padStart(2, "0");
}
