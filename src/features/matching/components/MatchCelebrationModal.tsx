import { AnimatePresence, motion } from "framer-motion";
import { UserCircle } from "lucide-react";
import { CompatibilityBadge } from "./CompatibilityBadge";
import { SkillOverlapDisplay } from "./SkillOverlapDisplay";
import type { MatchUser, SkillOverlapItem } from "../types/matching.types";

type MatchCelebrationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  matchData: {
    matchedUser: MatchUser;
    compatibilityScore: number;
    canTeachMe: SkillOverlapItem[];
    canLearnFromMe: SkillOverlapItem[];
  } | null;
};

export function MatchCelebrationModal({ isOpen, onClose, matchData }: MatchCelebrationModalProps) {
  const name = matchData?.matchedUser.displayName || matchData?.matchedUser.username || "your match";

  return (
    <AnimatePresence>
      {isOpen && matchData ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 36 }).map((_, index) => (
              <span
                key={index}
                className="absolute h-2 w-2 animate-[fall_2.8s_linear_infinite] rounded-sm bg-teal-300"
                style={{ left: `${(index * 29) % 100}%`, animationDelay: `${(index % 9) * 0.16}s` }}
              />
            ))}
          </div>
          <motion.div
            onClick={(event) => event.stopPropagation()}
            initial={{ scale: 0.88, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            className="glass-dark relative w-full max-w-lg overflow-hidden rounded-2xl p-8 text-center"
          >
            <h2 className="font-heading text-5xl font-black">
              <span className="bg-gradient-to-r from-indigo-400 to-teal-300 bg-clip-text text-transparent">It's a Match!</span>
            </h2>
            <p className="mt-3 text-slate-300">You and {name} can start exchanging skills.</p>
            <div className="my-8 flex items-center justify-center gap-6">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 text-white ring-2 ring-indigo-400/60">
                <UserCircle className="h-14 w-14" aria-hidden="true" />
              </div>
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-indigo-400 to-teal-300 shadow-glow" />
              {matchData.matchedUser.avatarUrl ? (
                <img src={matchData.matchedUser.avatarUrl} alt={name} className="h-24 w-24 rounded-full object-cover ring-2 ring-teal-400/60" />
              ) : (
                <div className="grid h-24 w-24 place-items-center rounded-full bg-slate-800 text-teal-200 ring-2 ring-teal-400/60">
                  <UserCircle className="h-14 w-14" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <CompatibilityBadge score={matchData.compatibilityScore} />
            </div>
            <div className="mt-6 text-left">
              <SkillOverlapDisplay canTeachMe={matchData.canTeachMe} canLearnFromMe={matchData.canLearnFromMe} />
            </div>
            <button type="button" onClick={onClose} className="mt-8 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:opacity-90">
              Continue
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
