import { motion } from "framer-motion";
import { CalendarPlus, UserCircle } from "lucide-react";
import { useState } from "react";
import { BookingFlow } from "../../sessions/components/BookingFlow";
import { CompatibilityBadge } from "./CompatibilityBadge";
import { SkillOverlapDisplay } from "./SkillOverlapDisplay";
import type { MatchedUser } from "../types/matching.types";

type MatchedUserCardProps = {
  match: MatchedUser;
};

const relativeDate = (value: string | null) => {
  if (!value) {
    return "Matched recently";
  }
  const days = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86400000));
  if (days === 0) {
    return "Matched today";
  }
  return `Matched ${days} day${days === 1 ? "" : "s"} ago`;
};

export function MatchedUserCard({ match }: MatchedUserCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const name = match.matchedUser.displayName || match.matchedUser.username;

  return (
    <>
      <motion.article whileHover={{ y: -4 }} className="glass-dark relative overflow-hidden rounded-lg p-5 transition-all hover:shadow-glow">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {match.matchedUser.avatarUrl ? (
              <img src={match.matchedUser.avatarUrl} alt={name} className="h-14 w-14 rounded-full object-cover ring-2 ring-indigo-500/50" />
            ) : (
              <div className="grid h-14 w-14 place-items-center rounded-full bg-slate-800 text-indigo-300 ring-2 ring-indigo-500/50">
                <UserCircle className="h-9 w-9" aria-hidden="true" />
              </div>
            )}
            <div>
              <h2 className="font-heading text-lg font-bold text-white">{name}</h2>
              <p className="text-sm text-slate-400">@{match.matchedUser.username}</p>
            </div>
          </div>
          <CompatibilityBadge score={match.compatibilityScore} size="sm" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">{relativeDate(match.matchedAt)}</p>
        <div className="mt-4">
          <SkillOverlapDisplay canTeachMe={match.skillOverlap.canTeachMe} canLearnFromMe={match.skillOverlap.canLearnFromMe} compact />
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsBookingOpen(true)}
          className="relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-4 py-3 text-sm font-bold text-white shadow-glow transition-all hover:opacity-90"
        >
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          Book Session
        </motion.button>
      </motion.article>
      {isBookingOpen ? (
        <BookingFlow
          matchedUser={match}
          onClose={() => setIsBookingOpen(false)}
        />
      ) : null}
    </>
  );
}
