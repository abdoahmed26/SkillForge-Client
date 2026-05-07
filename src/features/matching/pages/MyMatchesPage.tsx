import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { EmptyDiscoverState } from "../components/EmptyDiscoverState";
import { MatchedUserCard } from "../components/MatchedUserCard";
import { fetchMyMatches } from "../store/matchingSlice";

export function MyMatchesPage() {
  const dispatch = useAppDispatch();
  const { matches, isMatchesLoading } = useAppSelector((state) => state.matching);

  useEffect(() => {
    void dispatch(fetchMyMatches());
  }, [dispatch]);

  return (
    <section>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-300">Accepted</p>
          <h1 className="font-heading text-4xl font-black text-white">My Matches</h1>
        </div>
        <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm font-bold text-teal-100">
          {matches.length} matches
        </span>
      </motion.div>

      {isMatchesLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-72 animate-pulse rounded-lg bg-slate-800/60" />
          ))}
        </div>
      ) : matches.length === 0 ? (
        <EmptyDiscoverState variant="matches" />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((match, index) => (
            <motion.div key={match.matchId} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <MatchedUserCard match={match} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
