"use client";

import { motion } from "framer-motion";
import { type PropsWithChildren } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

type ScrollSectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
}>;

export function ScrollSection({ id, className, children }: ScrollSectionProps) {
  const { ref, style } = useScrollAnimation<HTMLElement>();

  return (
    <motion.section id={id} ref={ref} style={style} className={className}>
      {children}
    </motion.section>
  );
}
