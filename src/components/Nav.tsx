"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { NavLink } from "./types";

export default function Nav({ name, links }: { name: string; links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 md:py-6 ${
        scrolled ? "backdrop-blur-md" : ""
      }`}
    >
      <a
        href="#top"
        onClick={() => setOpen(false)}
        className="font-display text-xl font-light tracking-tight"
      >
        <span className="text-moss-deep">{firstName.charAt(0).toLowerCase()}.</span>
        {lastName.length > 0 ? lastName : firstName.slice(1)}
      </a>

      <nav
        aria-label="Primary"
        className="hidden items-center gap-1 rounded-full border border-line bg-paper-tint px-2 py-1.5 backdrop-blur-md md:flex"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-cursor-lens
            className="rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/80 transition-colors duration-200 hover:text-moss-deep md:px-4"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border border-line bg-paper-tint backdrop-blur-md md:hidden"
      >
        <span
          className={`h-px w-5 bg-ink transition-transform duration-300 ${
            open ? "translate-y-[3.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-px w-5 bg-ink transition-transform duration-300 ${
            open ? "-translate-y-[3.5px] -rotate-45" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 -z-10 bg-paper md:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-display text-4xl font-light tracking-tight"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
