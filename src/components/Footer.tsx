import type { Profile } from "@/lib/profile";

export default function Footer({ profile }: { profile: Profile }) {
  const { identity, socials } = profile;

  return (
    <footer className="mt-10 border-t border-line px-6 pb-8 pt-10 md:px-12 md:pt-12">
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Elsewhere
          </p>
          <ul className="mt-4 space-y-2">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target={social.type === "external" ? "_blank" : undefined}
                  rel={social.type === "external" ? "noreferrer noopener" : undefined}
                  data-cursor={social.type === "email" ? "EMAIL" : "LINK"}
                  className="text-sm transition-colors hover:text-moss-deep"
                >
                  {social.name} {social.type === "external" ? "↗" : ""}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:text-right">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Based in
          </p>
          <p className="mt-4 text-sm">{identity.location}</p>
          {identity.university && (
            <p className="text-sm text-muted">{identity.university.replace(" · ", ", ")}</p>
          )}
        </div>
      </div>

      <p className="mt-12 border-t border-line pt-6 font-mono text-[11px] tracking-[0.06em] text-muted">
        © {new Date().getFullYear()} {identity.name}. All rights reserved.
      </p>
    </footer>
  );
}
