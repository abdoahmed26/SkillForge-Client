import type { ActivityHeatmapDay } from "../types/analytics.types";

interface ActivityHeatmapProps {
  data: ActivityHeatmapDay[];
}

const intensityClass = (count: number) => {
  if (count >= 4) return "bg-teal-300";
  if (count >= 2) return "bg-teal-500/80";
  if (count >= 1) return "bg-indigo-500/70";
  return "bg-slate-800";
};

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const activityByDate = new Map(data.map((day) => [day.date, day.activityCount]));
  const today = new Date();
  const days = Array.from({ length: 365 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (364 - index));
    const key = date.toISOString().slice(0, 10);
    return { date: key, count: activityByDate.get(key) ?? 0 };
  });

  return (
    <div className="glass-dark rounded-lg p-5 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading text-lg font-bold text-white">Activity</h2>
        <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
          <span>Less</span>
          {[0, 1, 2, 4].map((value) => (
            <span key={value} className={`h-3 w-3 rounded-sm ${intensityClass(value)}`} />
          ))}
          <span>More</span>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto pb-2">
        <div className="grid min-w-[760px] grid-flow-col grid-rows-7 gap-1">
          {days.map((day) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.count} activities`}
              className={`h-3 w-3 rounded-sm ${intensityClass(day.count)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
