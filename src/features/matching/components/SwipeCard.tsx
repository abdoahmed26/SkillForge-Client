import { motion, useMotionValue, useTransform } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { Eye, UserCircle } from "lucide-react";
import { CompatibilityBadge } from "./CompatibilityBadge";
import { SkillOverlapDisplay } from "./SkillOverlapDisplay";
import type { DiscoverCandidate } from "../types/matching.types";

type SwipeCardProps = {
  candidate: DiscoverCandidate;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onViewProfile: () => void;
  isTop: boolean;
};

export function SwipeCard({ candidate, onSwipeRight, onSwipeLeft, onViewProfile, isTop }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-15, 15]);
  const likeOpacity = useTransform(x, [20, 130], [0, 1]);
  const skipOpacity = useTransform(x, [-130, -20], [1, 0]);
  const name = candidate.displayName || candidate.username;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipeRight();
    } else if (info.offset.x < -100) {
      onSwipeLeft();
    }
  };

  return (
    <motion.article
      layout
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, rotate }}
      className="glass-dark absolute inset-0 cursor-grab overflow-hidden rounded-2xl p-5 shadow-glow active:cursor-grabbing"
    >
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl" />
      <motion.div style={{ opacity: likeOpacity }} className="absolute right-6 top-8 rotate-12 rounded-lg border-4 border-teal-400 px-4 py-2 text-2xl font-black text-teal-300">
        LIKE
      </motion.div>
      <motion.div style={{ opacity: skipOpacity }} className="absolute left-6 top-8 -rotate-12 rounded-lg border-4 border-red-400 px-4 py-2 text-2xl font-black text-red-300">
        SKIP
      </motion.div>
      <div className="relative flex h-full flex-col">
        <div className="flex flex-col items-center text-center">
          {candidate.avatarUrl ? (
            <img src={candidate.avatarUrl} alt={name} className="h-28 w-28 rounded-full object-cover ring-2 ring-indigo-500/50" />
          ) : (
            <div className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 text-white ring-2 ring-indigo-500/50">
              <UserCircle className="h-16 w-16" aria-hidden="true" />
            </div>
          )}
          <h2 className="mt-4 font-heading text-3xl font-black text-white">{name}</h2>
          <p className="text-sm font-semibold text-slate-400">@{candidate.username}</p>
        </div>
        <div className="my-5 flex justify-center">
          <CompatibilityBadge score={candidate.compatibilityScore} />
        </div>
        {isTop ? (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mx-auto mb-5">
            <button
              type="button"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={onViewProfile}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-300/30 bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-100 transition hover:bg-indigo-500/20 shadow-soft"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              View profile & reviews
            </button>
          </motion.div>
        ) : null}
        <SkillOverlapDisplay canTeachMe={candidate.canTeachMe} canLearnFromMe={candidate.canLearnFromMe} />
      </div>
    </motion.article>
  );
}
