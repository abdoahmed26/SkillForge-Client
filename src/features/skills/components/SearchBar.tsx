import { Loader2, Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
};

export function SearchBar({ value, onChange, isLoading }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search skills..."
        className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 py-3 pl-12 pr-12 text-sm font-medium text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-indigo-300" />
        ) : value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-700 hover:text-white"
            aria-label="Clear search"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
