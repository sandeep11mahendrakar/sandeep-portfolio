import type { ReactNode } from "react";

export default function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={`group inline-flex items-baseline gap-1.5 transition-colors hover:text-accent ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="inline-block text-[0.85em] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  );
}
