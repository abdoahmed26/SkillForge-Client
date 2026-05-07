import type { SkillSort } from "../types/skill.types";

type SortSelectorProps = {
  value: SkillSort;
  onChange: (value: SkillSort) => void;
};

export function SortSelector({ value, onChange }: SortSelectorProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as SkillSort)}
      className="rounded-xl border border-slate-700/50 bg-slate-800/80 px-3 py-2 text-sm font-semibold text-slate-200 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      aria-label="Sort skills"
    >
      <option value="popularity">Most Popular</option>
      <option value="newest">Newest</option>
    </select>
  );
}
