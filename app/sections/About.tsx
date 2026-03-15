import { ScrollSection } from "../components/ScrollSection";
import { Reveal } from "../components/Reveal";

export default function About() {
  return (
    <ScrollSection
      id="about"
      className="section-surface about-fade-surface container-shell flex min-h-[40vh] items-start pt-12 pb-6 text-white"
    >
      <Reveal className="mx-auto w-full max-w-5xl space-y-3">
        <p className="text-xs tracking-[0.2em] uppercase text-white/70">About</p>
        <h2 className="text-3xl font-semibold md:text-5xl">I build practical AI/ML solutions from data.</h2>
        <div className="max-w-4xl text-sm leading-relaxed text-white/75 md:text-base">
          <p>
            I am a Data Science student focused on AI/ML, building end-to-end pipelines from data preparation
            and feature engineering to model deployment for real business use cases.
          </p>
        </div>
      </Reveal>
    </ScrollSection>
  );
}
