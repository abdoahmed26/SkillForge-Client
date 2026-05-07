import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { EmptyDiscoverState } from "../components/EmptyDiscoverState";
import { MatchCelebrationModal } from "../components/MatchCelebrationModal";
import { MatchRequestCard } from "../components/MatchRequestCard";
import {
  acceptMatchRequest,
  clearMutualMatch,
  declineMatchRequest,
  fetchInbox,
} from "../store/matchingSlice";

export function MatchInboxPage() {
  const dispatch = useAppDispatch();
  const { inbox, isInboxLoading, mutualMatch } = useAppSelector((state) => state.matching);

  useEffect(() => {
    void dispatch(fetchInbox());
  }, [dispatch]);

  const accept = async (matchId: string) => {
    const result = await dispatch(acceptMatchRequest(matchId));
    if (acceptMatchRequest.fulfilled.match(result)) {
      toast.success("Match accepted!");
    }
  };

  const decline = async (matchId: string) => {
    const result = await dispatch(declineMatchRequest(matchId));
    if (declineMatchRequest.fulfilled.match(result)) {
      toast.success("Request declined");
    }
  };

  return (
    <section>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-300">Requests</p>
          <h1 className="font-heading text-4xl font-black text-white">Match Inbox</h1>
        </div>
        <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-100">
          {inbox.length} pending
        </span>
      </motion.div>

      {isInboxLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-40 animate-pulse rounded-lg bg-slate-800/60" />
          ))}
        </div>
      ) : inbox.length === 0 ? (
        <EmptyDiscoverState variant="inbox" />
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {inbox.map((request) => (
              <MatchRequestCard key={request.matchId} request={request} onAccept={() => void accept(request.matchId)} onDecline={() => void decline(request.matchId)} />
            ))}
          </AnimatePresence>
        </div>
      )}

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
    </section>
  );
}
