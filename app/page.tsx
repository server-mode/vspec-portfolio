import dynamic from "next/dynamic";
import { Hero } from "./components/Hero";

const About = dynamic(() => import("./sections/About"));
const Journey = dynamic(() => import("./sections/Journey"));
const Projects = dynamic(() => import("./sections/Projects"));
const Contact = dynamic(() => import("./sections/Contact"));

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="about-project-glow gac-stack bg-black text-white">
        <section className="gac-layer gac-about">
          <About />
        </section>
        <section className="gac-layer gac-journey">
          <Journey />
        </section>
        <section className="gac-layer gac-projects">
          <Projects />
        </section>
      </div>
      <Contact />
    </main>
  );
}
