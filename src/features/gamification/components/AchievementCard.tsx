import { motion } from "framer-motion";
import { Award, Lock } from "lucide-react";
import type { Achievement } from "../types/gamification.types";

const rarityClasses: Record<string, string> = {
  common: "border-slate-500/30 text-slate-200",
  rare: "border-teal-400/40 text-teal-200",
  epic: "border-indigo-400/40 text-indigo-200",
  legendary: "border-amber-300/50 text-amber-200",
};

interface AchievementCardProps {
  achievement: Achievement;
  onSelect: (achievement: Achievement) => void;
}

export function AchievementCard({ achievement, onSelect }: AchievementCardProps) {
  const threshold = Math.max(achievement.conditionThreshold, 1);
  const currentProgress = Math.max(achievement.currentProgress, 0);
  const progress = Math.min(100, (currentProgress / threshold) * 100);
  const rarityClass = rarityClasses[achievement.rarityCategory] ?? rarityClasses.common;

  return (
    <motion.button
      type="button"
      layout
      whileHover={{ y: -5 }}
      onClick={() => onSelect(achievement)}
      className={`glass-dark relative overflow-hidden rounded-lg border p-5 text-left shadow-soft transition ${rarityClass}`}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative flex items-start gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${
            achievement.isUnlocked ? "bg-gradient-to-tr from-indigo-500 to-teal-400 text-white shadow-glow" : "bg-slate-800 text-slate-500"
          }`}
        >
          {achievement.isUnlocked ? <Award className="h-6 w-6" aria-hidden="true" /> : <Lock className="h-5 w-5" aria-hidden="true" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="truncate font-heading text-base font-bold text-white">{achievement.name}</h3>
            <span className="shrink-0 text-xs font-black uppercase tracking-normal">{achievement.rarityCategory}</span>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-slate-400">{achievement.description}</p>
        </div>
      </div>
      <div className="relative mt-5">
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-400">
          <span>{achievement.isUnlocked ? "Unlocked" : "Progress"}</span>
          <span>
            {Math.min(currentProgress, threshold)}/{threshold}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-teal-400" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.button>
  );
}
