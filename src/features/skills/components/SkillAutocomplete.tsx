import { Loader2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { autocompleteSkills } from "../api/skillsApi";
import type { Skill } from "../types/skill.types";

type SkillAutocompleteProps = {
  onSelect: (skill: Skill) => void;
  onNoResults?: (query: string) => void;
};

export function SkillAutocomplete({ onSelect, onNoResults }: SkillAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const latestQuery = useRef("");

  useEffect(() => {
    const loadSkills = async () => {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);
        return;
      }

      latestQuery.current = debouncedQuery;
      setIsLoading(true);
      try {
        const skills = await autocompleteSkills(debouncedQuery);
        if (latestQuery.current === debouncedQuery) {
          setResults(skills);
          setIsOpen(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadSkills();
  }, [debouncedQuery]);

  const hasNoResults = debouncedQuery.trim().length >= 2 && !isLoading && results.length === 0;

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Search catalog skills..."
        className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 py-3 pl-12 pr-11 text-sm font-medium text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
      {isLoading && (
        <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-indigo-300" />
      )}

      {isOpen && (results.length > 0 || hasNoResults) && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-2xl">
          {results.map((skill) => (
            <button
              type="button"
              key={skill.id}
              onClick={() => {
                onSelect(skill);
                setQuery(skill.name);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition hover:bg-slate-800"
            >
              <span className="font-bold text-white">{skill.name}</span>
              <span className="text-xs font-semibold text-slate-400">
                {skill.category.replace("_", " ")}
              </span>
            </button>
          ))}
          {hasNoResults && (
            <button
              type="button"
              onClick={() => onNoResults?.(debouncedQuery.trim())}
              className="w-full px-4 py-3 text-left text-sm font-semibold text-indigo-200 transition hover:bg-slate-800"
            >
              Can't find your skill? Suggest it
            </button>
          )}
        </div>
      )}
    </div>
  );
}
