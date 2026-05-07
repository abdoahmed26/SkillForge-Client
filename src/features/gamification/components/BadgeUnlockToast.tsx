import { motion } from "framer-motion";
import { Award, Sparkles } from "lucide-react";
import type { AchievementUnlockedEvent } from "../types/gamification.types";

interface BadgeUnlockToastProps {
  achievement: AchievementUnlockedEvent;
}

export function BadgeUnlockToast({ achievement }: BadgeUnlockToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.98 }}
      className="glass-dark relative min-w-80 overflow-hidden rounded-lg p-4 shadow-glow"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-teal-400/10" />
      <Sparkles className="absolute right-4 top-4 h-5 w-5 animate-pulse text-teal-300" aria-hidden="true" />
      <div className="relative flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.4, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-tr from-indigo-500 to-teal-400 text-white shadow-glow"
        >
          <Award className="h-6 w-6" aria-hidden="true" />
        </motion.div>
        <div>
          <p className="text-xs font-black uppercase text-teal-300">Badge Unlocked</p>
          <p className="font-heading text-base font-bold text-white">{achievement.name}</p>
          <p className="text-xs text-slate-400">{achievement.rarityCategory}</p>
        </div>
      </div>
    </motion.div>
  );
}
