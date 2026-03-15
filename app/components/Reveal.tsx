"use client";

import { motion, type Transition } from "framer-motion";
import { type PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

const transition: Transition = {
  duration: 0.7,
  ease: "easeOut",
};

export function Reveal({ className, delay = 0, children }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: [36, -8, 0] }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  );
}
