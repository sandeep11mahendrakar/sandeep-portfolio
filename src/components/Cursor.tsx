"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "hover" | "label";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 25, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 1600, damping: 80, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1600, damping: 80, mass: 0.2 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      if (target?.dataset.cursor === "none") {
        setVisible(false);
        setMode("default");
        setLabel(null);
        return;
      }
      setVisible(true);
      if (!target) {
        setMode("default");
        setLabel(null);
        return;
      }
      const value = target.dataset.cursor ?? "";
      const text = value.toUpperCase();
      const isLabel = text.length > 0 && text !== "HOVER" && text !== "GO";
      setMode(isLabel ? "label" : "hover");
      setLabel(isLabel ? text : null);
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

  const ringSize = mode === "label" ? 96 : mode === "hover" ? 56 : 36;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[199] flex items-center justify-center rounded-full overflow-hidden border border-foreground/50 transition-colors duration-300"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          backgroundColor:
            mode === "label" ? "color-mix(in oklch, var(--foreground) 75%, transparent)" : "transparent",
          borderColor:
            mode === "default" ? "color-mix(in oklch, var(--foreground) 50%, transparent)" : "var(--foreground)",
        }}
        transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <motion.span
          aria-hidden
          className="select-none font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-background"
          animate={{ opacity: mode === "label" && label ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {mode === "label" ? label : ""}
        </motion.span>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[199] rounded-full bg-foreground"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          mixBlendMode: "difference",
        }}
        animate={{ opacity: visible && mode === "default" ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
