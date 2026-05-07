import { motion } from "framer-motion";
import { Award, Flame, Star, Trophy } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { AchievementDetailModal } from "../components/AchievementDetailModal";
import { AchievementShowcase } from "../components/AchievementShowcase";
import {
  clearSelectedAchievement,
  loadAchievementDetail,
  loadAchievements,
  loadGamificationProfile,
} from "../store/gamificationSlice";
import type { Achievement } from "../types/gamification.types";

export function AchievementsPage() {
  const dispatch = useAppDispatch();
  const { achievements, profile, selectedAchievement, isLoading, isDetailLoading, error, detailError } =
    useAppSelector((state) => state.gamification);

  useEffect(() => {
    void dispatch(loadAchievements());
    void dispatch(loadGamificationProfile());
  }, [dispatch]);

  const handleSelect = (achievement: Achievement) => {
    void dispatch(loadAchievementDetail(achievement.id));
  };

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white">Achievements</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Track earned badges and milestone progress across your SkillForge activity.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Unlocked", value: `${profile?.totalAchievements ?? 0}/${profile?.totalAchievementsAvailable ?? achievements.length}`, icon: Trophy },
          { label: "Level", value: profile?.level ?? 1, icon: Award },
          { label: "XP", value: profile?.xp ?? 0, icon: Star },
          { label: "Streak", value: `${profile?.currentStreak ?? 0} days`, icon: Flame },
        ].map((item) => (
          <div key={item.label} className="glass-dark rounded-lg p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-slate-400">{item.label}</p>
              <item.icon className="h-5 w-5 text-teal-300" aria-hidden="true" />
            </div>
            <p className="mt-2 font-heading text-2xl font-black text-white">{item.value}</p>
          </div>
        ))}
      </div>
      {error ? <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm font-bold text-red-300">{error}</p> : null}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-44 animate-pulse rounded-lg border border-white/10 bg-slate-900/70" />
          ))}
        </div>
      ) : (
        <AchievementShowcase achievements={achievements} onSelect={handleSelect} />
      )}
      <AchievementDetailModal
        achievement={selectedAchievement}
        isLoading={isDetailLoading}
        error={detailError}
        onClose={() => dispatch(clearSelectedAchievement())}
      />
    </motion.section>
  );
}
