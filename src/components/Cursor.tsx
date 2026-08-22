"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "lens" | "label";

const SIZES: Record<CursorMode, number> = {
  default: 32,
  lens: 42,
  label: 60,
};

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], [data-cursor-lens]"
      );
      if (!target) {
        setMode("default");
        setLabel(null);
        return;
      }
      if (target.hasAttribute("data-cursor")) {
        setMode("label");
        setLabel(target.dataset.cursor ?? null);
        return;
      }
      setMode("lens");
      setLabel(null);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        animate={{
          width: SIZES[mode],
          height: SIZES[mode],
          opacity: visible ? 1 : 0,
          backgroundColor:
            mode === "default" ? "rgba(248,245,236,0)" : "rgba(248,245,236,0.32)",
          backdropFilter:
            mode === "default" ? "blur(0px)" : `blur(${mode === "lens" ? 3 : 4}px)`,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ border: "1px solid rgba(59,56,49,0.45)" }}
      >
        <motion.span
          aria-hidden
          className="select-none font-mono text-[8px] uppercase tracking-[0.14em] text-ink"
          animate={{
            opacity: mode === "label" && label ? 1 : 0,
            scale: mode === "label" && label ? 1 : 0.85,
          }}
          transition={{ duration: 0.2 }}
        >
          {mode === "label" ? label : ""}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
