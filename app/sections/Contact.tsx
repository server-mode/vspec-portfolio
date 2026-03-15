import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "../components/ContactForm";
import { Reveal } from "../components/Reveal";
import { ScrollSection } from "../components/ScrollSection";

export default function Contact() {
  return (
    <ScrollSection
      id="contact"
      className="section-surface container-shell flex min-h-[calc(100vh-4rem)] items-center border-t border-black/10 bg-white/92 py-24 text-black"
    >
      <Reveal className="mb-10 w-full space-y-4">
        <p className="text-xs tracking-[0.2em] uppercase text-muted">Contact Me</p>
        <h2 className="text-3xl font-semibold md:text-4xl">Let&apos;s work together</h2>

        <div className="grid gap-8 md:grid-cols-[minmax(240px,320px)_1fr]">
          <div className="space-y-4 text-sm text-muted">
            <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 text-black hover:underline">
              <Mail size={16} />
              hello@example.com
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-black hover:underline">
              <Github size={16} />
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-black hover:underline">
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>

          <ContactForm />
        </div>
      </Reveal>
    </ScrollSection>
  );
}
