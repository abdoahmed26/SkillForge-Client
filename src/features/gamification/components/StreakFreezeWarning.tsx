import { motion } from "framer-motion";
import { Clock, Flame } from "lucide-react";
import type { StreakWarningEvent } from "../types/gamification.types";

interface StreakFreezeWarningProps {
  warning: StreakWarningEvent;
}

export function StreakFreezeWarning({ warning }: StreakFreezeWarningProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.98 }}
      className="glass-dark min-w-80 overflow-hidden rounded-lg border border-teal-400/30 p-4 shadow-glow-secondary"
    >
      <div className="flex items-center gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-400/15 text-teal-200">
          <Flame className="h-5 w-5 animate-pulse" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-black uppercase text-teal-300">Streak Warning</p>
          <p className="font-heading text-base font-bold text-white">{warning.currentStreak} day streak at risk</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {warning.hoursRemaining}h remaining today
          </p>
        </div>
      </div>
    </motion.div>
  );
}
