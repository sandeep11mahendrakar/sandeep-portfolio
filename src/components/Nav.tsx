"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { NavLink } from "./types";

export default function Nav({ name, links }: { name: string; links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ");
  const logoFirst = (lastName.length > 0 ? lastName : firstName.slice(1)).toLowerCase();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-6 md:px-12 py-5 md:py-6 flex items-center justify-between pointer-events-none"
    >
      <div className="pointer-events-auto">
        <a
          href="#top"
          data-cursor="home"
          className="font-display text-2xl md:text-3xl tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          <span className="font-editorial italic text-matcha">
            {firstName.charAt(0).toLowerCase()}.
          </span>
          {logoFirst}
        </a>
      </div>

      <nav
        aria-label="Primary"
        className="pointer-events-auto hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-[0.12em] bg-matcha/15 backdrop-blur-xl border-2 border-matcha/30 px-9 py-4 rounded-full shadow-lg shadow-matcha/10"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-cursor="go"
            className="text-foreground hover:text-matcha transition-colors"
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
        className="pointer-events-auto flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border-2 border-matcha/30 bg-matcha/15 backdrop-blur-xl md:hidden"
      >
        <span
          className={`h-px w-5 bg-foreground transition-transform duration-300 ${
            open ? "translate-y-[3.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-px w-5 bg-foreground transition-transform duration-300 ${
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
            className="fixed inset-0 -z-10 bg-background md:hidden"
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
    </motion.header>
  );
}
