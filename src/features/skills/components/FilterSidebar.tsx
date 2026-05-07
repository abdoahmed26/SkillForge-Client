import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import {
  ProficiencyLevel,
  SkillType,
  type CategoryInfo,
  type SkillFilters,
} from "../types/skill.types";

type FilterSidebarProps = {
  filters: SkillFilters;
  categories: CategoryInfo[];
  onFilterChange: (filters: Partial<SkillFilters>) => void;
};

const proficiencyOptions = Object.values(ProficiencyLevel);

export function FilterSidebar({
  filters,
  categories,
  onFilterChange,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const content = (
    <div className="space-y-7">
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-300">
          Category
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.name}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-slate-300 transition hover:bg-slate-800/60"
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={filters.category === category.name}
                  onChange={() =>
                    onFilterChange({
                      category:
                        filters.category === category.name ? null : category.name,
                    })
                  }
                  className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
                />
                {category.label}
              </span>
              <span className="text-xs text-slate-500">{category.skillCount}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-300">
          Type
        </h3>
        <div className="space-y-2 text-sm text-slate-300">
          {[null, SkillType.TEACH, SkillType.LEARN].map((type) => (
            <label key={type ?? "ALL"} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-800/60">
              <input
                type="radio"
                name="skill-type-filter"
                checked={filters.type === type}
                onChange={() => onFilterChange({ type })}
                className="h-4 w-4 border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
              />
              {type ?? "ALL"}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-300">
          Proficiency
        </h3>
        <div className="space-y-2">
          {proficiencyOptions.map((proficiency) => (
            <label key={proficiency} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-300 transition hover:bg-slate-800/60">
              <input
                type="checkbox"
                checked={filters.proficiency === proficiency}
                onChange={() =>
                  onFilterChange({
                    proficiency:
                      filters.proficiency === proficiency ? null : proficiency,
                  })
                }
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
              />
              {proficiency}
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          onFilterChange({
            search: "",
            category: null,
            type: null,
            proficiency: null,
            sort: filters.sort,
          })
        }
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-indigo-400 hover:text-white"
      >
        <X className="h-4 w-4" />
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="mb-4 inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-2 text-sm font-bold text-slate-200 lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>
      <aside className={`${isOpen ? "block" : "hidden"} glass-dark rounded-lg p-5 lg:block`}>
        {content}
      </aside>
    </>
  );
}
