import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import {
  CancelledSessionCard,
  CancelSessionModal,
  HistorySessionCard,
  RejectRequestModal,
  RequestCard,
  SessionCard,
  SessionFilterTabs,
} from "../components/SessionCards";
import {
  acceptRequest,
  cancelScheduledSession,
  fetchSessionHistory,
  fetchSessionRequests,
  fetchUpcomingSessions,
  joinScheduledSession,
  rejectRequest,
} from "../store/sessionsSlice";
import { SessionStatus, type Session } from "../types/session.types";

type SessionFilter = "all" | "requests" | "upcoming" | "completed" | "missed" | "cancelled";

export function MySessionsPage() {
  const dispatch = useAppDispatch();
  const { upcoming, history, requests, isUpcomingLoading, isHistoryLoading, isRequestsLoading, error } =
    useAppSelector((state) => state.sessions);
  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const [now, setNow] = useState(Date.now());
  const [cancelTarget, setCancelTarget] = useState<Session | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Session | null>(null);
  const [filter, setFilter] = useState<SessionFilter>("all");

  useEffect(() => {
    void dispatch(fetchUpcomingSessions());
    void dispatch(fetchSessionRequests());
    void dispatch(fetchSessionHistory());
  }, [dispatch]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const sortedUpcoming = useMemo(
    () =>
      [...upcoming].sort(
        (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
      ),
    [upcoming],
  );
  const incomingRequests = requests.filter((request) => request.requestedBy !== currentUserId);
  const sentRequests = requests.filter((request) => request.requestedBy === currentUserId);
  const completedSessions = history.filter(
    (session) => session.status === SessionStatus.COMPLETED || session.viewerOutcome === "completed",
  );
  const missedSessions = history.filter(
    (session) =>
      session.status === SessionStatus.MISSED ||
      (session.status !== SessionStatus.COMPLETED && session.viewerOutcome === "missed"),
  );
  const cancelledSessions = history.filter((session) => session.status === SessionStatus.CANCELLED);
  const showRequests = filter === "all" || filter === "requests";
  const showUpcoming = filter === "all" || filter === "upcoming";
  const showCompleted = filter === "all" || filter === "completed";
  const showMissed = filter === "all" || filter === "missed";
  const showCancelled = filter === "all" || filter === "cancelled";
  const filters: { value: SessionFilter; label: string; count: number }[] = [
    { value: "all", label: "All", count: requests.length + sortedUpcoming.length + history.length },
    { value: "requests", label: "Requests", count: requests.length },
    { value: "upcoming", label: "Upcoming", count: sortedUpcoming.length },
    { value: "completed", label: "Completed", count: completedSessions.length },
    { value: "missed", label: "Missed", count: missedSessions.length },
    { value: "cancelled", label: "Cancelled", count: cancelledSessions.length },
  ];

  const handleAccept = async (id: string) => {
    try {
      await dispatch(acceptRequest(id)).unwrap();
      toast.success("Session request accepted");
    } catch (acceptError) {
      toast.error(typeof acceptError === "string" ? acceptError : "Unable to accept request");
    }
  };

  const handleReject = async (id: string, comment: string) => {
    if (!comment.trim()) {
      toast.error("Add a rejection comment first");
      return;
    }
    try {
      await dispatch(rejectRequest({ id, comment: comment.trim() })).unwrap();
      setRejectTarget(null);
      toast.success("Session request rejected");
    } catch (rejectError) {
      toast.error(typeof rejectError === "string" ? rejectError : "Unable to reject request");
    }
  };

  const handleCancel = async (id: string, comment: string) => {
    if (!comment.trim()) {
      toast.error("Add a cancellation comment first");
      return;
    }
    try {
      await dispatch(cancelScheduledSession({ id, comment: comment.trim() })).unwrap();
      setCancelTarget(null);
      toast.success("Session cancelled");
    } catch (cancelError) {
      toast.error(typeof cancelError === "string" ? cancelError : "Unable to cancel session");
    }
  };

  const handleJoin = async (session: Session) => {
    try {
      const joinedSession = await dispatch(joinScheduledSession(session.id)).unwrap();
      window.open(joinedSession.joinUrl, "_blank", "noopener,noreferrer");
    } catch (joinError) {
      toast.error(typeof joinError === "string" ? joinError : "Unable to join session");
    }
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-300">Requests & Upcoming</p>
          <h1 className="font-heading text-4xl font-black text-white">My Sessions</h1>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-100">
          <CalendarClock className="h-4 w-4" aria-hidden="true" />
          {sortedUpcoming.length} scheduled
        </span>
      </motion.div>

      {error ? (
        <div className="mb-5 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
          {error}
        </div>
      ) : null}

      <SessionFilterTabs activeFilter={filter} filters={filters} onChange={setFilter} />

      {showRequests ? (
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-bold text-white">Session Requests</h2>
            <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-100">
              {requests.length} requests
            </span>
          </div>
          {isRequestsLoading ? (
            <div className="h-32 animate-pulse rounded-lg bg-slate-800/60" />
          ) : requests.length === 0 ? (
            <div className="glass-dark rounded-lg p-5 text-sm font-semibold text-slate-400">
              No session requests.
            </div>
          ) : (
            <div className="space-y-4">
              {[...incomingRequests, ...sentRequests].map((request) => (
                <RequestCard
                  key={request.id}
                  session={request}
                  isIncoming={request.requestedBy !== currentUserId}
                  onAccept={(id) => void handleAccept(id)}
                  onReject={setRejectTarget}
                />
              ))}
            </div>
          )}
        </div>
      ) : null}

      {showUpcoming ? (
        <>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-bold text-white">Upcoming Sessions</h2>
          </div>

          {isUpcomingLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-36 animate-pulse rounded-lg bg-slate-800/60" />
              ))}
            </div>
          ) : sortedUpcoming.length === 0 ? (
            <div className="glass-dark rounded-lg p-8 text-center">
              <CalendarClock className="mx-auto h-10 w-10 text-teal-300" aria-hidden="true" />
              <h2 className="mt-3 font-heading text-xl font-bold text-white">No upcoming sessions</h2>
              <p className="mt-2 text-sm text-slate-400">Send a booking request to one of your matches.</p>
              <Link
                to="/my-matches"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-5 py-3 text-sm font-bold text-white shadow-glow transition-all hover:opacity-90"
              >
                View Matches
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedUpcoming.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <SessionCard
                    session={session}
                    now={now}
                    isNext={index === 0}
                    onCancelClick={setCancelTarget}
                    onJoin={(session) => void handleJoin(session)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </>
      ) : null}

      {showCompleted ? (
        <>
          <div className="mb-4 mt-8 flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-bold text-white">Completed Sessions</h2>
          </div>

          {isHistoryLoading ? (
            <div className="h-32 animate-pulse rounded-lg bg-slate-800/60" />
          ) : completedSessions.length === 0 ? (
            <div className="glass-dark rounded-lg p-5 text-sm font-semibold text-slate-400">
              No completed sessions.
            </div>
          ) : (
            <div className="space-y-4">
              {completedSessions.map((session) => (
                <HistorySessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </>
      ) : null}

      {showMissed ? (
        <>
          <div className="mb-4 mt-8 flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-bold text-white">Missed Sessions</h2>
          </div>

          {isHistoryLoading ? (
            <div className="h-32 animate-pulse rounded-lg bg-slate-800/60" />
          ) : missedSessions.length === 0 ? (
            <div className="glass-dark rounded-lg p-5 text-sm font-semibold text-slate-400">
              No missed sessions.
            </div>
          ) : (
            <div className="space-y-4">
              {missedSessions.map((session) => (
                <HistorySessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </>
      ) : null}

      {showCancelled ? (
        <>
          <div className="mb-4 mt-8 flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-bold text-white">Cancelled Sessions</h2>
          </div>

          {isHistoryLoading ? (
            <div className="h-32 animate-pulse rounded-lg bg-slate-800/60" />
          ) : cancelledSessions.length === 0 ? (
            <div className="glass-dark rounded-lg p-5 text-sm font-semibold text-slate-400">
              No cancelled sessions.
            </div>
          ) : (
            <div className="space-y-4">
              {cancelledSessions.map((session) => (
                <CancelledSessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </>
      ) : null}

      <CancelSessionModal
        session={cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={(id, comment) => void handleCancel(id, comment)}
      />
      <RejectRequestModal
        session={rejectTarget}
        onClose={() => setRejectTarget(null)}
        onConfirm={(id, comment) => void handleReject(id, comment)}
      />
    </section>
  );
}
