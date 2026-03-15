"use client";

import { type MotionStyle, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.35, 1, 1, 0.55]);
  const y = useTransform(scrollYProgress, [0, 0.2, 1], [20, 0, -6]);

  const style: MotionStyle = { opacity, y };

  return { ref, style };
}
