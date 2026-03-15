"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { NeuralNetworkScene } from "../three/NeuralNetworkScene";
import { Reveal } from "./Reveal";
import { ScrollSection } from "./ScrollSection";
import { TypewriterText } from "./TypewriterText";

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Zalo", href: "https://zalo.me", icon: MessageCircle },
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
];

export function Hero() {
  return (
    <ScrollSection
      id="home"
      className="section-surface container-shell relative min-h-screen overflow-hidden bg-white/88 pt-20 pb-16"
    >
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="h-screen opacity-95">
          <NeuralNetworkScene />
        </div>
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="grid w-full max-w-5xl items-center justify-center gap-10 md:grid-cols-[320px_620px]">
          <Reveal className="space-y-6 justify-self-center md:justify-self-end md:text-left">
            <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border border-border md:mx-0 md:h-48 md:w-48">
              <Image
                src="/src/ava.png"
                alt="Nguyen Huu Huy avatar"
                fill
                sizes="(max-width: 768px) 176px, 192px"
                className="object-cover"
              />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-semibold md:text-5xl">Nguyen Huu Huy</h1>
              <p className="text-lg text-muted md:text-xl">Data Science Student • AI/ML Specialist</p>
            </div>

            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-lg text-muted md:justify-start">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 hover:underline"
                    >
                      <Icon size={18} />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal className="space-y-6 text-center md:justify-self-start md:text-left">
            <TypewriterText
              text="Hi! I'm Nguyen Huu Huy A Data Science Student from Vietnam Building AI & ML systems from real‑world data"
              speed={94}
              startDelay={250}
              highlightPhrase="Data Science Student"
              highlightClassName="typewriter-highlight"
              className="mx-auto max-w-[38ch] text-[1.75rem] leading-tight font-semibold md:mx-0 md:max-w-[40ch] md:text-[2.95rem]"
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="mx-auto max-w-3xl text-lg leading-relaxed text-muted md:mx-0 md:text-xl"
            >
              I design and deploy machine learning workflows for prediction, automation, and decision support,
              with a focus on reliable data pipelines, model quality, and practical business impact.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
              href="#projects"
              className="inline-flex items-center bg-black px-8 py-4 text-lg text-white transition-opacity hover:opacity-85"
            >
              See Selected Work
            </motion.a>
          </Reveal>
        </div>
      </div>
    </ScrollSection>
  );
}
