import type { Profile } from "@/lib/profile";

export default function Footer({ profile }: { profile: Profile }) {
  const { identity, socials } = profile;

  return (
    <footer className="border-t border-foreground/10 pt-8 md:pt-10 pb-8 px-6 md:px-12 w-full">
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Elsewhere
          </p>
          <ul className="mt-4 space-y-2">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target={social.type === "external" ? "_blank" : undefined}
                  rel={social.type === "external" ? "noreferrer noopener" : undefined}
                  data-cursor="hover"
                  className="text-sm font-medium text-foreground/90 transition-colors hover:text-matcha"
                >
                  {social.name} {social.type === "external" ? "↗" : ""}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:text-right">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Based in
          </p>
          <p className="mt-4 text-sm font-medium">{identity.location}</p>
        </div>
      </div>

      <p className="mt-12 text-right font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} {identity.name}. All rights reserved.
      </p>
    </footer>
  );
}
