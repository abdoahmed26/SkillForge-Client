import { BookOpen, Clock, Percent, Video } from "lucide-react";
import type { AnalyticsStats } from "../types/analytics.types";

interface SessionStatsCardsProps {
  stats: AnalyticsStats;
}

export function SessionStatsCards({ stats }: SessionStatsCardsProps) {
  const items = [
    { label: "Sessions", value: stats.totalSessions, icon: Video },
    { label: "Teaching Hours", value: stats.totalTeachingHours, icon: Clock },
    { label: "Learning Hours", value: stats.totalLearningHours, icon: BookOpen },
    { label: "Completion", value: `${Math.round(stats.completionRate * 100)}%`, icon: Percent },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="glass-dark rounded-lg p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-slate-400">{item.label}</p>
                <p className="mt-2 font-heading text-3xl font-black text-white">{item.value}</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-tr from-indigo-500 to-teal-400 text-white shadow-glow">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
