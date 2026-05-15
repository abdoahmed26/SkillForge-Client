import { motion } from "framer-motion";
import { Check, UserCircle, X } from "lucide-react";
import { CompatibilityBadge } from "./CompatibilityBadge";
import { SkillOverlapDisplay } from "./SkillOverlapDisplay";
import type { MatchRequest } from "../types/matching.types";

type MatchRequestCardProps = {
  request: MatchRequest;
  onAccept: () => void;
  onDecline: () => void;
};

export function MatchRequestCard({ request, onAccept, onDecline }: MatchRequestCardProps) {
  const name = request.requester.displayName || request.requester.username;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 80 }}
      whileHover={{ y: -4 }}
      className="glass-dark relative overflow-hidden rounded-[2rem] p-6 shadow-soft"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          {request.requester.avatarUrl ? (
            <img src={request.requester.avatarUrl} alt={name} className="h-16 w-16 rounded-full object-cover ring-2 ring-indigo-500/50" />
          ) : (
            <div className="grid h-16 w-16 place-items-center rounded-full bg-slate-800 text-indigo-300 ring-2 ring-indigo-500/50">
              <UserCircle className="h-10 w-10" aria-hidden="true" />
            </div>
          )}
          <div>
            <h2 className="font-heading text-xl font-bold text-white">{name}</h2>
            <p className="text-sm text-slate-400">@{request.requester.username}</p>
            <p className="mt-1 text-xs text-slate-500">{new Date(request.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <CompatibilityBadge score={request.compatibilityScore} size="sm" />
        <div className="min-w-0 flex-1">
          <SkillOverlapDisplay canTeachMe={request.canTeachMe} canLearnFromMe={request.canLearnFromMe} compact />
        </div>
        <div className="flex gap-3 md:flex-col">
          <button type="button" onClick={onAccept} className="inline-flex items-center gap-2 rounded-xl bg-teal-500/15 px-4 py-2 text-sm font-bold text-teal-200 transition hover:bg-teal-500/25">
            <Check className="h-4 w-4" /> Accept
          </button>
          <button type="button" onClick={onDecline} className="inline-flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-2 text-sm font-bold text-red-200 transition hover:bg-red-500/25">
            <X className="h-4 w-4" /> Decline
          </button>
        </div>
      </div>
    </motion.article>
  );
}
