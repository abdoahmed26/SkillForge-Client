import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, Check, Clock, Send, Star, UserCircle, Video, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchSessionReviews } from "../../reviews/api/reviewsApi";
import { ReviewForm } from "../../reviews/components/ReviewForm";
import { formatDateTime, getCountdown } from "../utils/sessionDate";
import { SessionStatus, type Session } from "../types/session.types";

type SessionFilter = "all" | "requests" | "upcoming" | "completed" | "missed" | "cancelled" | "rejected";

function ParticipantAvatar({ avatarUrl, name }: { avatarUrl: string | null; name: string }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="h-14 w-14 rounded-full object-cover ring-2 ring-indigo-500/50"
      />
    );
  }

  return (
    <div className="grid h-14 w-14 place-items-center rounded-full bg-slate-800 text-indigo-300 ring-2 ring-indigo-500/50">
      <UserCircle className="h-9 w-9" aria-hidden="true" />
    </div>
  );
}

function SessionDateLine({ scheduledAt }: { scheduledAt: string }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm font-bold text-slate-200">
      <CalendarClock className="h-4 w-4 text-indigo-300" aria-hidden="true" />
      {formatDateTime(scheduledAt)}
    </p>
  );
}

export function SessionFilterTabs({
  activeFilter,
  filters,
  onChange,
}: {
  activeFilter: SessionFilter;
  filters: { value: SessionFilter; label: string; count: number }[];
  onChange: (filter: SessionFilter) => void;
}) {
  return (
    <div className="glass-dark mb-8 flex flex-wrap gap-2 rounded-lg p-2">
      {filters.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${
            activeFilter === item.value
              ? "bg-indigo-500/20 text-indigo-100"
              : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
          }`}
        >
          {item.label}
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-black ${
              activeFilter === item.value ? "bg-teal-400 text-slate-950" : "bg-slate-800 text-slate-300"
            }`}
          >
            {item.count}
          </span>
        </button>
      ))}
    </div>
  );
}

export function SessionCard({
  session,
  now,
  isNext,
  onCancelClick,
  onJoin,
}: {
  session: Session;
  now: number;
  isNext: boolean;
  onCancelClick: (session: Session) => void;
  onJoin: (session: Session) => void;
}) {
  const name = session.otherUser.displayName || session.otherUser.username;
  const startsAt = new Date(session.scheduledAt).getTime();
  const endsAt = startsAt + session.duration * 60 * 1000;
  const minutesUntil = Math.floor((startsAt - now) / 60000);
  const canJoin = now >= startsAt && now <= endsAt;
  const countdownTone =
    canJoin ? "text-teal-200" : minutesUntil < 15 ? "text-red-300" : minutesUntil < 60 ? "text-amber-300" : "text-teal-200";

  return (
    <motion.article
      whileHover={{ y: -5 }}
      className={`glass-dark relative overflow-visible rounded-[2rem] p-6 transition-all hover:shadow-glow ${
        isNext ? "border-indigo-500/50" : ""
      }`}
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-teal-400/10 blur-3xl" />
      <button
        type="button"
        onClick={() => onCancelClick(session)}
        className="absolute -right-4 -top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-red-300/60 bg-red-600 text-white shadow-[0_0_24px_rgba(220,38,38,0.45)] transition hover:bg-red-500"
        aria-label="Cancel session"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <ParticipantAvatar avatarUrl={session.otherUser.avatarUrl} name={name} />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-lg font-bold text-white">{session.skill.name}</h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  session.role === "teacher"
                    ? "bg-indigo-500/15 text-indigo-100"
                    : "bg-teal-400/10 text-teal-100"
                }`}
              >
                {session.role === "teacher" ? "Teaching" : "Learning"}
              </span>
              {isNext ? (
                <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-100">
                  Next
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-slate-400">with {name}</p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-700/60 bg-slate-900/60 px-4 py-3 sm:text-right">
          <div className="flex sm:justify-end">
            <SessionDateLine scheduledAt={session.scheduledAt} />
          </div>
          <p className={`mt-2 flex items-center gap-2 text-sm font-black sm:justify-end ${countdownTone}`}>
            <Clock className="h-4 w-4" aria-hidden="true" />
            {getCountdown(session.scheduledAt, now)}
          </p>
        </div>
      </div>

      {canJoin ? (
        <button
          type="button"
          onClick={() => onJoin(session)}
          className="relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-5 py-3 text-sm font-black text-white shadow-glow transition hover:opacity-90 sm:w-auto"
        >
          <Video className="h-4 w-4" aria-hidden="true" />
          Join call
        </button>
      ) : null}

      {session.notes ? (
        <p className="relative mt-4 line-clamp-2 rounded-lg border border-slate-700/60 bg-slate-900/50 px-4 py-3 text-sm text-slate-300">
          {session.notes}
        </p>
      ) : null}
    </motion.article>
  );
}

export function HistorySessionCard({ session }: { session: Session }) {
  const name = session.otherUser.displayName || session.otherUser.username;
  const isMissed = session.status === SessionStatus.MISSED;
  const canReview = session.status === SessionStatus.COMPLETED;
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isReviewChecking, setIsReviewChecking] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const handleReviewClick = async () => {
    if (hasReviewed) return;
    if (isReviewOpen) {
      setIsReviewOpen(false);
      return;
    }

    setIsReviewChecking(true);
    try {
      const response = await fetchSessionReviews(session.id);
      if (response.currentUserReviewed) {
        setHasReviewed(true);
        return;
      }
      setIsReviewOpen(true);
    } catch {
      toast.error("Unable to check review status");
    } finally {
      setIsReviewChecking(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark relative overflow-hidden rounded-2xl p-5"
    >
      <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full ${isMissed ? "bg-red-500/10" : "bg-teal-400/10"} blur-3xl`} />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-heading text-lg font-bold text-white">{session.skill.name}</h2>
            {/* <span className={`rounded-full px-3 py-1 text-xs font-bold ${isMissed ? "bg-red-500/10 text-red-200" : "bg-teal-400/10 text-teal-100"}`}>
              {isMissed ? "Missed" : "Completed"}
            </span> */}
          </div>
          <p className="mt-2 text-sm text-slate-400">with {name}</p>
          <div className="mt-2">
            <SessionDateLine scheduledAt={session.scheduledAt} />
          </div>
        </div>
        {canReview ? (
          <button
            type="button"
            onClick={() => void handleReviewClick()}
            disabled={isReviewChecking || hasReviewed}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-teal-300/30 bg-teal-400/10 px-4 py-3 text-sm font-bold text-teal-100 transition hover:bg-teal-400/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <Star className="h-4 w-4" aria-hidden="true" />
            {hasReviewed ? "Reviewed" : isReviewChecking ? "Checking..." : isReviewOpen ? "Close review" : "Add review"}
          </button>
        ) : null}
      </div>
      {isReviewOpen ? (
        <div className="relative mt-4">
          <ReviewForm
            sessionId={session.id}
            embedded
            onSubmitted={() => {
              setHasReviewed(true);
              setIsReviewOpen(false);
            }}
          />
        </div>
      ) : null}
    </motion.article>
  );
}

export function CancelSessionModal({
  session,
  onClose,
  onConfirm,
}: {
  session: Session | null;
  onClose: () => void;
  onConfirm: (id: string, comment: string) => void;
}) {
  const [comment, setComment] = useState("");

  useEffect(() => {
    setComment("");
  }, [session?.id]);

  return (
    <AnimatePresence>
      {session ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="glass-dark relative w-full max-w-lg overflow-hidden rounded-[2rem] p-6 shadow-soft"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-red-300">Cancel Session</p>
                <h2 className="mt-1 font-heading text-2xl font-black text-white">{session.skill.name}</h2>
                <p className="mt-2 text-sm text-slate-400">{formatDateTime(session.scheduledAt)}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
                aria-label="Close cancel modal"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <label className="relative mt-5 block text-sm font-semibold text-slate-300" htmlFor="cancel-comment">
              Cancellation comment
            </label>
            <textarea
              id="cancel-comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={4}
              maxLength={500}
              className="relative mt-2 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Tell the other user why you need to cancel"
            />

            <div className="relative mt-5 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-slate-700"
              >
                Keep Session
              </button>
              <button
                type="button"
                onClick={() => onConfirm(session.id, comment)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200 transition hover:bg-red-500/20"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Cancel Session
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function RejectRequestModal({
  session,
  onClose,
  onConfirm,
}: {
  session: Session | null;
  onClose: () => void;
  onConfirm: (id: string, comment: string) => void;
}) {
  const [comment, setComment] = useState("");

  useEffect(() => {
    setComment("");
  }, [session?.id]);

  return (
    <AnimatePresence>
      {session ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="glass-dark relative w-full max-w-lg overflow-hidden rounded-[2rem] p-6 shadow-soft"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-red-300">Reject Request</p>
                <h2 className="mt-1 font-heading text-2xl font-black text-white">{session.skill.name}</h2>
                <p className="mt-2 text-sm text-slate-400">{formatDateTime(session.scheduledAt)}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
                aria-label="Close reject modal"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <label className="relative mt-5 block text-sm font-semibold text-slate-300" htmlFor="reject-comment">
              Rejection comment
            </label>
            <textarea
              id="reject-comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={4}
              maxLength={500}
              className="relative mt-2 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Tell the sender why you are rejecting this request"
            />

            <div className="relative mt-5 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-slate-700"
              >
                Keep Request
              </button>
              <button
                type="button"
                onClick={() => onConfirm(session.id, comment)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200 transition hover:bg-red-500/20"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Reject Request
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function CancelledSessionCard({ session }: { session: Session }) {
  const name = session.otherUser.displayName || session.otherUser.username;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark relative overflow-hidden rounded-2xl p-5"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-200 absolute top-0 right-0">
              Cancelled
            </span>
            <h2 className="font-heading text-lg font-bold text-white">{session.skill.name}</h2>
          </div>
          <p className="mt-2 text-sm text-slate-400">with {name}</p>
          <div className="mt-2">
            <SessionDateLine scheduledAt={session.scheduledAt} />
          </div>
        </div>
      </div>
      {session.cancellationComment ? (
        <p className="relative mt-4 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
          {session.cancellationComment}
        </p>
      ) : null}
    </motion.article>
  );
}

export function RejectedSessionCard({ session }: { session: Session }) {
  const name = session.otherUser.displayName || session.otherUser.username;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark relative overflow-hidden rounded-2xl p-5"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          {/* <ParticipantAvatar avatarUrl={session.otherUser.avatarUrl} name={name} /> */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-lg font-bold text-white">{session.skill.name}</h2>
              <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-200 absolute top-0 right-0">
                Rejected
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-400">with {name}</p>
            <div className="mt-2">
              <SessionDateLine scheduledAt={session.scheduledAt} />
            </div>
          </div>
        </div>
      </div>
      {session.rejectionComment ? (
        <p className="relative mt-4 rounded-lg border border-orange-400/20 bg-orange-500/10 px-4 py-3 text-sm font-semibold text-orange-100">
          {session.rejectionComment}
        </p>
      ) : null}
    </motion.article>
  );
}

export function RequestCard({
  session,
  isIncoming,
  onAccept,
  onReject,
}: {
  session: Session;
  isIncoming: boolean;
  onAccept: (id: string) => void;
  onReject: (session: Session) => void;
}) {
  const name = session.otherUser.displayName || session.otherUser.username;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark relative overflow-hidden rounded-2xl p-5"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {/* <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                session.status === SessionStatus.REJECTED
                  ? "bg-red-500/10 text-red-200"
                  : "bg-amber-400/10 text-amber-100"
              }`}
            >
              {session.status === SessionStatus.REJECTED
                ? "Rejected"
                : isIncoming
                  ? "Incoming request"
                  : "Sent request"}
            </span> */}
            <h2 className="font-heading text-lg font-bold text-white">{session.skill.name}</h2>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            {isIncoming ? "From" : "To"} {name}
          </p>
          <div className="mt-2">
            <SessionDateLine scheduledAt={session.scheduledAt} />
          </div>
          {session.notes ? <p className="mt-3 text-sm text-slate-300">{session.notes}</p> : null}
          {session.rejectionComment ? (
            <p className="mt-3 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-100">
              {session.rejectionComment}
            </p>
          ) : null}
        </div>

        {isIncoming && session.status === SessionStatus.PENDING ? (
          <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row lg:justify-end">
            <button
              type="button"
              onClick={() => onAccept(session.id)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-400/15 px-4 py-3 text-sm font-bold text-teal-100 transition hover:bg-teal-400/25"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              Accept
            </button>
            <button
              type="button"
              onClick={() => onReject(session)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200 transition hover:bg-red-500/20"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Reject
            </button>
          </div>
        ) : session.status === SessionStatus.PENDING ? (
          <span className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm font-bold text-slate-300">
            <Send className="h-4 w-4 text-teal-300" aria-hidden="true" />
            Waiting for response
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100">
            <X className="h-4 w-4" aria-hidden="true" />
            Rejected
          </span>
        )}
      </div>
    </motion.article>
  );
}
