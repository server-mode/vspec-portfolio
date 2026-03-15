type SkillCategory = {
  category: string;
  skills: string[];
};

type SkillsGridProps = {
  groups: SkillCategory[];
};

export function SkillsGrid({ groups }: SkillsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {groups.map((group) => (
        <article key={group.category} className="rounded-2xl border border-border p-6">
          <h3 className="mb-4 text-sm font-semibold tracking-[0.16em] uppercase">{group.category}</h3>
          <ul className="flex flex-wrap gap-2.5">
            {group.skills.map((skill) => (
              <li key={skill} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted">
                {skill}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
