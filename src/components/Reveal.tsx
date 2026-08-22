"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Variant = "rise" | "blur" | "mask";

const initial: Record<Variant, { opacity: number; y?: number; filter?: string }> = {
  rise: { opacity: 0, y: 28 },
  blur: { opacity: 0, y: 12, filter: "blur(14px)" },
  mask: { opacity: 0, y: 40 },
};

const visible: Record<Variant, { opacity: number; y: number; filter?: string }> = {
  rise: { opacity: 1, y: 0 },
  blur: { opacity: 1, y: 0, filter: "blur(0px)" },
  mask: { opacity: 1, y: 0 },
};

export default function Reveal({
  children,
  delay = 0,
  variant = "rise",
  once = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  once?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { rootMargin: "-40px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, reduceMotion]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : initial[variant]}
      animate={
        reduceMotion
          ? undefined
          : shown
            ? visible[variant]
            : initial[variant]
      }
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
