import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function EmptyState({ title, description, icon: Icon }: EmptyStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-slate-700/50 bg-slate-900/40 px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-gradient-to-br from-indigo-500/20 to-teal-400/20 p-4 text-slate-400">
        <Icon className="h-10 w-10" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
    </div>
  );
}
