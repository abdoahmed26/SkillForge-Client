import type { SkillOverlapItem } from "../types/matching.types";

type SkillOverlapDisplayProps = {
  canTeachMe: SkillOverlapItem[];
  canLearnFromMe: SkillOverlapItem[];
  compact?: boolean;
};

function SkillPills({ items, tone }: { items: SkillOverlapItem[]; tone: "teal" | "indigo" }) {
  const classes =
    tone === "teal"
      ? "border-teal-400/30 bg-teal-400/10 text-teal-100"
      : "border-indigo-400/30 bg-indigo-500/10 text-indigo-100";

  if (items.length === 0) {
    return <p className="text-sm text-slate-500">No direct overlap yet</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={`${item.skillName}-${item.proficiency}-${tone}`} className={`rounded-full border px-3 py-1 text-xs font-bold ${classes}`}>
          {item.skillName} · {item.proficiency.toLowerCase()}
        </span>
      ))}
    </div>
  );
}

export function SkillOverlapDisplay({ canTeachMe, canLearnFromMe, compact = false }: SkillOverlapDisplayProps) {
  return (
    <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
      <section>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-300">Can teach you</h3>
        <SkillPills items={canTeachMe} tone="teal" />
      </section>
      <section>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-300">You can teach</h3>
        <SkillPills items={canLearnFromMe} tone="indigo" />
      </section>
    </div>
  );
}
