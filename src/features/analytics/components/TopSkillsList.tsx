import type { TopSkill } from "../types/analytics.types";

interface TopSkillsListProps {
  title: string;
  skills: TopSkill[];
}

export function TopSkillsList({ title, skills }: TopSkillsListProps) {
  return (
    <div className="glass-dark rounded-lg p-5 shadow-soft">
      <h2 className="font-heading text-lg font-bold text-white">{title}</h2>
      <div className="mt-4 space-y-3">
        {skills.length ? (
          skills.map((skill, index) => (
            <div key={skill.skillName} className="flex items-center justify-between gap-4 rounded-lg bg-slate-800/60 px-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-500/20 text-xs font-black text-indigo-200">
                  {index + 1}
                </span>
                <span className="truncate text-sm font-bold text-white">{skill.skillName}</span>
              </div>
              <span className="shrink-0 text-sm font-black text-teal-300">{skill.sessionCount}</span>
            </div>
          ))
        ) : (
          <p className="rounded-lg bg-slate-800/60 p-4 text-sm font-semibold text-slate-400">No session data yet.</p>
        )}
      </div>
    </div>
  );
}
