"use client";

import { JourneyTimeline } from "../components/JourneyTimeline";
import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { ScrollSection } from "../components/ScrollSection";

const journey = [
  {
    year: "2021",
    title: "Started Learning Python and Game Development",
    description: "I began self-learning Python and explored how to build games with game engines.",
  },
  {
    year: "2023",
    title: "Web Projects and Real-World Work",
    description: "I started website projects and gained practical experience in real working environments.",
  },
  {
    year: "2025",
    title: "Data Science Student at Electric Power University",
    description: "I studied core data science subjects and strengthened machine learning foundations.",
  },
  {
    year: "2026–Now",
    title: "Building First Quant and LLM Projects",
    description: "I am building early quant model and LLM-focused projects to deepen AI engineering skills.",
  },
];

export default function Journey() {
  return (
    <ScrollSection
      id="journey"
      className="section-surface container-shell flex min-h-[90vh] items-center bg-transparent py-8 text-white"
    >
      <Reveal className="mb-6 w-full space-y-6">
        <p className="text-xs tracking-[0.2em] uppercase text-white/70">Journey</p>
        <h2 className="text-3xl font-semibold md:text-4xl">AI/ML timeline</h2>
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <JourneyTimeline items={journey} inverted orientation="horizontal" />
        </motion.div>
      </Reveal>
    </ScrollSection>
  );
}
