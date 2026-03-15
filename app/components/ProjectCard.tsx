"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

type ProjectCardProps = {
  name: string;
  description: string;
  stack: string[];
  github: string;
  demo: string;
  inverted?: boolean;
  compact?: boolean;
};

export function ProjectCard({ name, description, stack, github, demo, inverted = false, compact = false }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: [34, -8, 0] }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.997 }}
      className={`flex h-full flex-col gap-4 rounded-2xl border ${compact ? "p-5" : "p-6"} ${
        inverted ? "border-white/20 bg-white/[0.03] text-white" : "border-border bg-white text-black"
      }`}
    >
      <div className="space-y-2">
        <h3 className={`${compact ? "text-base" : "text-lg"} font-semibold`}>{name}</h3>
        <p className={`text-sm leading-relaxed ${inverted ? "text-white/70" : "text-muted"}`}>{description}</p>
      </div>

      <ul className="mt-auto flex flex-wrap gap-2">
        {stack.map((item) => (
          <li
            key={item}
            className={`rounded-full border px-3 py-1 text-xs ${
              inverted ? "border-white/20 text-white/70" : "border-border text-muted"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 pt-1 text-sm">
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
            inverted ? "border border-white/25 hover:opacity-85" : "border border-border hover:opacity-85"
          }`}
        >
          <Github size={14} />
          GitHub
        </a>
        <a
          href={demo}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
            inverted ? "bg-white text-black hover:opacity-85" : "bg-black text-white hover:opacity-85"
          }`}
        >
          <ExternalLink size={14} />
          Live Demo
        </a>
      </div>
    </motion.article>
  );
}
