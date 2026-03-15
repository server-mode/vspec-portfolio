import { SkillsGrid } from "../components/SkillsGrid";
import { ScrollSection } from "../components/ScrollSection";

const skillGroups = [
  {
    category: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Prisma", "PostgreSQL", "REST API"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Figma", "Postman", "VS Code"],
  },
  {
    category: "DevOps",
    skills: ["Docker", "Nginx", "Vercel", "CI/CD", "Linux"],
  },
];

export default function Skills() {
  return (
    <ScrollSection id="skills" className="container-shell border-t border-border py-24">
      <div className="mb-10 space-y-4">
        <p className="text-xs tracking-[0.2em] uppercase text-muted">Technical Skills</p>
        <h2 className="text-3xl font-semibold md:text-4xl">Stack and tooling</h2>
      </div>

      <SkillsGrid groups={skillGroups} />
    </ScrollSection>
  );
}
