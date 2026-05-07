import { Flame } from "lucide-react";

interface StreakCounterProps {
  currentStreak: number;
}

export function StreakCounter({ currentStreak }: StreakCounterProps) {
  return (
    <div className="glass-dark inline-flex h-10 items-center gap-2 rounded-lg px-3 shadow-soft">
      <Flame
        className={`h-4 w-4 text-teal-300 ${currentStreak > 0 ? "animate-pulse" : ""}`}
        aria-hidden="true"
      />
      <span className="text-sm font-black text-white">{currentStreak}</span>
      <span className="text-xs font-bold text-slate-400">day streak</span>
    </div>
  );
}
