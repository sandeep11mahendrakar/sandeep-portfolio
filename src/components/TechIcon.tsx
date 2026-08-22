import {
  SiC,
  SiDocker,
  SiGithub,
  SiGit,
  SiGoogle,
  SiJavascript,
  SiLinux,
  SiPython,
  SiScikitlearn,
  SiStreamlit,
} from "react-icons/si";
import type { IconType } from "react-icons";

const ICONS: Record<string, IconType> = {
  python: SiPython,
  c: SiC,
  javascript: SiJavascript,
  "scikit-learn": SiScikitlearn,
  streamlit: SiStreamlit,
  "gemini api": SiGoogle,
  git: SiGit,
  github: SiGithub,
  linux: SiLinux,
  docker: SiDocker,
};

export function getTechIcon(name: string): IconType | null {
  return ICONS[name.toLowerCase()] ?? null;
}
