import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useEffect } from "react";
import { SwipeCard } from "./SwipeCard";
import type { DiscoverCandidate } from "../types/matching.types";

type SwipeCardStackProps = {
  candidates: DiscoverCandidate[];
  onLike: (userId: string) => void;
  onSkip: (userId: string) => void;
  onViewProfile: (candidate: DiscoverCandidate) => void;
  onNeedMore: () => void;
};

export function SwipeCardStack({ candidates, onLike, onSkip, onViewProfile, onNeedMore }: SwipeCardStackProps) {
  const visible = candidates.slice(0, 3);

  useEffect(() => {
    if (candidates.length > 0 && candidates.length < 3) {
      onNeedMore();
    }
  }, [candidates.length, onNeedMore]);

  const top = candidates[0];

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center">
      <div className="relative h-[620px] w-full max-w-md">
        <AnimatePresence>
          {visible.map((candidate, index) => (
            <motion.div
              key={candidate.userId}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1 - index * 0.16, y: index * 18, scale: 1 - index * 0.05 }}
              exit={{ opacity: 0, x: index === 0 ? 800 : 0, rotate: 24 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              style={{ zIndex: visible.length - index }}
            >
              <SwipeCard
                candidate={candidate}
                isTop={index === 0}
                onSwipeRight={() => onLike(candidate.userId)}
                onSwipeLeft={() => onSkip(candidate.userId)}
                onViewProfile={() => onViewProfile(candidate)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center gap-5">
        <button
          type="button"
          disabled={!top}
          onClick={() => top && onSkip(top.userId)}
          className="grid h-14 w-14 place-items-center rounded-full border border-red-400/30 bg-red-500/10 text-red-300 transition-all hover:bg-red-500/20 disabled:opacity-40"
          aria-label="Skip candidate"
        >
          <X className="h-7 w-7" aria-hidden="true" />
        </button>
        <button
          type="button"
          disabled={!top}
          onClick={() => top && onLike(top.userId)}
          className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 text-white shadow-glow transition-all hover:scale-105 disabled:opacity-40"
          aria-label="Like candidate"
        >
          <Heart className="h-8 w-8" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
