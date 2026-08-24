import Image from "next/image";
import type { SkillItem } from "@/lib/profile";
import { TECH_ICON_FILES } from "@/lib/icons.generated";

const FILES = new Set<string>(TECH_ICON_FILES);

const SUFFIXES = [
  "-original",
  "-plain",
  "-line",
  "-original-wordmark",
  "-plain-wordmark",
  "-line-wordmark",
];

const ALIASES: Record<string, string[]> = {
  html: ["html5"],
  css: ["css3"],
  reactjs: ["react"],
  nextjs: ["nextjs"],
  vuejs: ["vuejs"],
  postgres: ["postgresql"],
  psql: ["postgresql"],
  k8s: ["kubernetes"],
  aws: ["amazonwebservices"],
  gcp: ["googlecloud"],
  js: ["javascript"],
  ts: ["typescript"],
  py: ["python"],
  node: ["nodejs"],
  nodejs: ["nodejs"],
  tailwind: ["tailwindcss"],
  sklearn: ["scikitlearn"],
  opencv: ["opencv"],
  tf: ["tensorflow"],
  mongo: ["mongodb"],
  expressjs: ["express"],
  springboot: ["springboot"],
  vs: ["vscode"],
  vscode: ["vscode"],
  windows: ["windows8"],
  macos: ["apple"],
  ios: ["apple"],
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function resolveFile(query?: string): string | null {
  if (!query) return null;
  const q = normalize(query);
  if (!q) return null;
  const candidates = [q, ...(ALIASES[q] ?? [])];
  for (const candidate of candidates) {
    if (FILES.has(`${candidate}.svg`)) return `${candidate}.svg`;
    for (const suffix of SUFFIXES) {
      const file = `${candidate}${suffix}.svg`;
      if (FILES.has(file)) return file;
    }
  }
  return null;
}

export function resolveTechIconFile(item: SkillItem): string | null {
  return resolveFile(item.icon) ?? resolveFile(item.name);
}

export default function TechIcon({ item }: { item: SkillItem }) {
  const file = resolveTechIconFile(item);
  return (
    <span
      aria-hidden
      data-cursor="hover"
      className="w-10 h-10 md:w-11 md:h-11 rounded-[4px] border border-foreground/25 flex flex-shrink-0 items-center justify-center bg-background/60 text-lg md:text-xl font-mono font-medium text-foreground/80 overflow-hidden"
    >
      {file ? (
        <Image
          src={`/icons/tech/${file}`}
          alt=""
          width={26}
          height={26}
          className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] object-contain"
        />
      ) : (
        item.name.charAt(0).toUpperCase()
      )}
    </span>
  );
}
