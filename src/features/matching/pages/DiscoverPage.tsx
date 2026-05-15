import { motion } from "framer-motion";
import { AnimatedPage } from "../../../components/common/AnimatedPage";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { fetchMySkills } from "../../skills/store/skillsSlice";
import { EmptyDiscoverState } from "../components/EmptyDiscoverState";
import { MatchCelebrationModal } from "../components/MatchCelebrationModal";
import { PublicUserProfileModal } from "../components/PublicUserProfileModal";
import { SwipeCardStack } from "../components/SwipeCardStack";
import {
  clearMutualMatch,
  fetchDiscoverCandidates,
  likeCandidate,
  skipCandidate,
} from "../store/matchingSlice";
import type { DiscoverCandidate } from "../types/matching.types";

export function DiscoverPage() {
  const dispatch = useAppDispatch();
  const mySkills = useAppSelector((state) => state.skills.mySkills);
  const { candidates, remaining, isDiscoverLoading, mutualMatch, error } = useAppSelector(
    (state) => state.matching,
  );
  const [profileCandidate, setProfileCandidate] = useState<DiscoverCandidate | null>(null);
  const hasSkills = mySkills.length > 0;

  useEffect(() => {
    void dispatch(fetchMySkills());
  }, [dispatch]);

  useEffect(() => {
    if (hasSkills) {
      void dispatch(fetchDiscoverCandidates(10));
    }
  }, [dispatch, hasSkills]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleNeedMore = useCallback(() => {
    if (!isDiscoverLoading && remaining > 0) {
      void dispatch(fetchDiscoverCandidates(10));
    }
  }, [dispatch, isDiscoverLoading, remaining]);

  const handleLike = (userId: string) => {
    setProfileCandidate(null);
    void dispatch(likeCandidate(userId));
  };

  const handleSkip = (userId: string) => {
    void dispatch(skipCandidate(userId));
  };

  return (
    <AnimatedPage>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-300">Smart Matching</p>
          <h1 className="font-heading text-4xl font-black text-white">Discover Matches</h1>
        </div>
        <span className="w-fit rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm font-bold text-teal-100">
          {remaining} remaining
        </span>
      </motion.div>

      {!hasSkills ? (
        <EmptyDiscoverState variant="noSkills" />
      ) : isDiscoverLoading && candidates.length === 0 ? (
        <div className="mx-auto h-[620px] max-w-md animate-pulse rounded-2xl bg-slate-800/60" />
      ) : candidates.length === 0 ? (
        <EmptyDiscoverState variant="noMatches" />
      ) : (
        <SwipeCardStack
          candidates={candidates}
          onLike={handleLike}
          onSkip={handleSkip}
          onViewProfile={setProfileCandidate}
          onNeedMore={handleNeedMore}
        />
      )}

      <PublicUserProfileModal
        user={profileCandidate}
        isOpen={Boolean(profileCandidate)}
        onClose={() => setProfileCandidate(null)}
        onLike={handleLike}
      />

      <MatchCelebrationModal
        isOpen={Boolean(mutualMatch)}
        onClose={() => dispatch(clearMutualMatch())}
        matchData={
          mutualMatch?.matchedUser
            ? {
                matchedUser: mutualMatch.matchedUser,
                compatibilityScore: mutualMatch.compatibilityScore,
                canTeachMe: mutualMatch.canTeachMe ?? [],
                canLearnFromMe: mutualMatch.canLearnFromMe ?? [],
              }
            : null
        }
      />
    </AnimatedPage>
  );
}
