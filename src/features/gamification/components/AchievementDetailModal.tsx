import { motion } from "framer-motion";
import { Award, X } from "lucide-react";
import type { AchievementDetail } from "../types/gamification.types";

interface AchievementDetailModalProps {
  achievement: AchievementDetail | null;
  isLoading?: boolean;
  error?: string | null;
  onClose: () => void;
}

export function AchievementDetailModal({ achievement, isLoading = false, error, onClose }: AchievementDetailModalProps) {
  if (!achievement && !isLoading && !error) {
    return null;
  }

  const threshold = Math.max(achievement?.conditionThreshold ?? 1, 1);
  const currentProgress = Math.max(achievement?.currentProgress ?? 0, 0);
  const progress = Math.min(100, (currentProgress / threshold) * 100);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-dark w-full max-w-lg rounded-lg p-6 shadow-glow"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-gradient-to-tr from-indigo-500 to-teal-400 text-white shadow-glow">
              <Award className="h-7 w-7" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-white">
                {isLoading ? "Loading achievement..." : achievement?.name ?? "Achievement"}
              </h2>
              <p className="text-sm font-bold uppercase text-teal-300">{achievement?.rarityCategory ?? "details"}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close achievement details"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {error ? (
          <p className="mt-6 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm font-bold text-red-200">
            {error}
          </p>
        ) : isLoading ? (
          <div className="mt-6 space-y-3">
            <div className="h-4 animate-pulse rounded bg-slate-800" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-800" />
          </div>
        ) : achievement ? (
          <p className="mt-6 text-sm leading-6 text-slate-300">{achievement.description}</p>
        ) : null}
        {achievement ? (
          <>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-800/60 p-3">
            <p className="text-xs font-semibold text-slate-400">Unlocked By</p>
            <p className="mt-1 text-lg font-black text-white">{achievement.rarityPercentage}%</p>
          </div>
          <div className="rounded-lg bg-slate-800/60 p-3">
            <p className="text-xs font-semibold text-slate-400">Earned</p>
            <p className="mt-1 text-lg font-black text-white">{achievement.totalUnlocked}</p>
          </div>
          <div className="rounded-lg bg-slate-800/60 p-3">
            <p className="text-xs font-semibold text-slate-400">Status</p>
            <p className="mt-1 text-lg font-black text-white">{achievement.isUnlocked ? "Unlocked" : "Locked"}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-300">
            <span>Progress</span>
            <span>
              {Math.min(currentProgress, threshold)}/{threshold}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-teal-400" style={{ width: `${progress}%` }} />
          </div>
        </div>
          </>
        ) : null}
      </motion.div>
    </div>
  );
}
