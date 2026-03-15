"use client";

import { ProjectCard } from "../components/ProjectCard";
import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { ScrollSection } from "../components/ScrollSection";

const projects = [
  {
    name: "Customer Churn Prediction",
    description: "Classification pipeline predicting churn risk with feature importance and threshold tuning.",
    stack: ["Python", "Scikit-learn", "Pandas", "FastAPI"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    name: "Demand Forecasting Engine",
    description: "Time-series forecasting service for inventory planning with automated retraining workflow.",
    stack: ["Python", "XGBoost", "Prophet", "Docker"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    name: "Vietnamese NLP Assistant",
    description: "Domain-specific NLP assistant for support automation and intent classification.",
    stack: ["PyTorch", "Transformers", "LangChain", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    name: "MLOps Monitoring Dashboard",
    description: "Dashboard for tracking model drift, prediction quality, and deployment health metrics.",
    stack: ["Next.js", "TypeScript", "Prometheus", "Grafana"],
    github: "https://github.com",
    demo: "https://example.com",
  },
];

export default function Projects() {
  const [featured, ...others] = projects;

  return (
    <ScrollSection
      id="projects"
      className="section-surface container-shell -mt-16 flex min-h-[calc(100vh-4rem)] items-center rounded-t-[2rem] bg-black/96 pt-20 pb-20 text-white shadow-[0_-24px_60px_rgba(0,0,0,0.48)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.62 }}
        transition={{ duration: 0.72, ease: "easeOut" }}
        className="mb-10 w-full space-y-6"
      >
        <p className="text-xs tracking-[0.2em] uppercase text-white/70">Projects</p>
        <h2 className="text-3xl font-semibold md:text-4xl">Selected work</h2>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
          <article className="rounded-3xl border border-white/20 bg-white/[0.03] p-7">
            <p className="mb-4 text-xs tracking-[0.18em] uppercase text-white/60">Featured Project</p>
            <h3 className="text-2xl font-semibold">{featured.name}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">{featured.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {featured.stack.map((item) => (
                <li key={item} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/75">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
              <a
                href={featured.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/25 px-4 py-2 text-white transition-opacity hover:opacity-80"
              >
                GitHub
              </a>
              <a
                href={featured.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-black transition-opacity hover:opacity-85"
              >
                Live Demo
              </a>
            </div>
          </article>

          <div className="grid gap-4">
            {others.map((project) => (
              <ProjectCard key={project.name} {...project} inverted compact />
            ))}
          </div>
        </div>
      </motion.div>
    </ScrollSection>
  );
}
