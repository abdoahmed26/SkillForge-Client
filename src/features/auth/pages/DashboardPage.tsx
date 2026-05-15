import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  CalendarClock,
  ChevronRight,
  Compass,
  Flame,
  GraduationCap,
  Handshake,
  MessageCircle,
  Sparkles,
  Star,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedPage } from "../../../components/common/AnimatedPage";
import { GradientButton } from "../../../components/common/GradientButton";
import { MotionCard } from "../../../components/common/MotionCard";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { loadAnalyticsDashboard } from "../../analytics/store/analyticsSlice";
import { loadGamificationProfile } from "../../gamification/store/gamificationSlice";
import { fetchInbox, fetchMyMatches } from "../../matching/store/matchingSlice";
import { loadNotifications } from "../../notifications/store/notificationsSlice";
import { loadUserReviews } from "../../reviews/store/reviewsSlice";
import {
  fetchSessionHistory,
  fetchSessionRequests,
  fetchUpcomingSessions,
} from "../../sessions/store/sessionsSlice";
import { formatDateTime, getCountdown } from "../../sessions/utils/sessionDate";
import { fetchMySkills } from "../../skills/store/skillsSlice";
import { SkillType } from "../../skills/types/skill.types";

type DashboardCard = {
  title: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
  to: string;
  tone: string;
};

function MetricCard({ card, index }: { card: DashboardCard; index: number }) {
  const Icon = card.icon;
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link to={card.to} className="absolute inset-0 z-10" aria-label={card.title} />
      <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full ${card.tone} opacity-20 blur-3xl transition group-hover:opacity-40 animate-pulse-slow`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{card.title}</p>
          <p className="mt-2 font-heading text-4xl font-bold text-white">{card.value}</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">{card.detail}</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-800/70 text-teal-400 border border-slate-700/50 shadow-soft">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
      </div>
    </MotionCard>
  );
}

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const mySkills = useAppSelector((state) => state.skills.mySkills);
  const { inbox, matches } = useAppSelector((state) => state.matching);
  const { upcoming, requests, history } = useAppSelector((state) => state.sessions);
  const notifications = useAppSelector((state) => state.notifications.items);
  const unreadCount = useAppSelector((state) => state.notifications.unreadCount);
  const gamification = useAppSelector((state) => state.gamification.profile);
  const analytics = useAppSelector((state) => state.analytics.dashboard);
  const reviews = useAppSelector((state) => state.reviews.response);

  const name = user?.displayName || user?.username || "there";
  const teachCount = mySkills.filter((skill) => skill.type === SkillType.TEACH).length;
  const learnCount = mySkills.filter((skill) => skill.type === SkillType.LEARN).length;
  const nextSession = [...upcoming].sort(
    (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
  )[0];
  const completedCount =
    analytics?.stats.totalSessions ??
    history.filter((session) => session.status === "COMPLETED").length;
  const reviewAverage = Number(user?.averageRating ?? reviews?.averageRating ?? 0);
  const reviewCount = user?.totalReviewCount ?? reviews?.totalReviewCount ?? 0;
  const levelProgress = Math.round((gamification?.levelProgress ?? 0) * 100);
  const totalHours =
    (analytics?.stats.totalTeachingHours ?? 0) + (analytics?.stats.totalLearningHours ?? 0);

  useEffect(() => {
    void dispatch(fetchMySkills());
    void dispatch(fetchInbox());
    void dispatch(fetchMyMatches());
    void dispatch(fetchUpcomingSessions());
    void dispatch(fetchSessionRequests());
    void dispatch(fetchSessionHistory());
    void dispatch(loadNotifications({ limit: 5 }));
    void dispatch(loadGamificationProfile());
    void dispatch(loadAnalyticsDashboard());
    if (user?.id) {
      void dispatch(loadUserReviews({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  const cards: DashboardCard[] = [
    {
      title: "Upcoming",
      value: upcoming.length,
      detail: nextSession ? getCountdown(nextSession.scheduledAt, Date.now()) : "No scheduled sessions",
      icon: CalendarClock,
      to: "/my-sessions",
      tone: "bg-teal-400",
    },
    {
      title: "Requests",
      value: requests.length + inbox.length,
      detail: `${requests.length} sessions, ${inbox.length} matches`,
      icon: Bell,
      to: "/match-inbox",
      tone: "bg-amber-300",
    },
    {
      title: "Matches",
      value: matches.length,
      detail: "People ready to book",
      icon: Handshake,
      to: "/my-matches",
      tone: "bg-indigo-400",
    },
    {
      title: "Rating",
      value: reviewAverage.toFixed(1),
      detail: `${reviewCount} reviews received`,
      icon: Star,
      to: "/profile",
      tone: "bg-teal-300",
    },
  ];

  const quickActions = [
    { label: "Discover matches", to: "/discover", icon: Compass },
    { label: "Book from matches", to: "/my-matches", icon: Video },
    { label: "Manage skills", to: "/my-skills", icon: Sparkles },
    { label: "Set availability", to: "/availability", icon: CalendarClock },
  ];

  return (
    <AnimatedPage className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-300">Dashboard</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-white">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-teal-400 bg-clip-text text-transparent">
              {name}
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Your workspace for sessions, matches, progress, and reputation.
          </p>
        </div>
        <Link
          to="/analytics"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-indigo-300/30 bg-indigo-500/10 px-4 py-3 text-sm font-bold text-indigo-100 transition hover:bg-indigo-500/20"
        >
          <BarChart3 className="h-4 w-4" aria-hidden />
          Full analytics
        </Link>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <MetricCard key={card.title} card={card} index={index} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark rounded-2xl p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-indigo-300">Next Session</p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-white">
                {nextSession ? nextSession.skill.name : "No session scheduled"}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {nextSession
                  ? `with ${nextSession.otherUser.displayName || nextSession.otherUser.username}`
                  : "Send a booking request to start learning or teaching."}
              </p>
            </div>
            {nextSession ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-400/10 px-3 py-1 text-xs font-bold text-teal-100">
                <CalendarClock className="h-4 w-4" aria-hidden />
                {formatDateTime(nextSession.scheduledAt)}
              </span>
            ) : null}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/my-sessions">
              <GradientButton variant="primary" className="text-sm">
                Open sessions
                <ChevronRight className="h-4 w-4" aria-hidden />
              </GradientButton>
            </Link>
            <Link
              to="/my-matches"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-slate-700"
            >
              Find someone to book
            </Link>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="glass-dark rounded-2xl p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-teal-300">Progress</p>
              <h2 className="mt-1 font-heading text-2xl font-black text-white">Level {gamification?.level ?? user?.level ?? 1}</h2>
            </div>
            <Flame className="h-7 w-7 text-teal-300" aria-hidden />
          </div>
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs font-bold text-slate-400">
              <span>{gamification?.xp ?? user?.xp ?? 0} XP</span>
              <span>{levelProgress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-teal-400" style={{ width: `${levelProgress}%` }} />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 p-3">
              <p className="text-xs font-bold text-slate-500">Sessions</p>
              <p className="mt-1 text-xl font-black text-white">{completedCount}</p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 p-3">
              <p className="text-xs font-bold text-slate-500">Hours</p>
              <p className="mt-1 text-xl font-black text-white">{totalHours.toFixed(1)}</p>
            </div>
          </div>
        </motion.article>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="glass-dark rounded-2xl p-5">
          <h2 className="font-heading text-xl font-bold text-white">Skill Mix</h2>
          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-slate-300">
                <span className="inline-flex items-center gap-2"><GraduationCap className="h-4 w-4 text-indigo-300" aria-hidden /> Teach</span>
                <span>{teachCount}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-indigo-400" style={{ width: `${mySkills.length ? (teachCount / mySkills.length) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-slate-300">
                <span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4 text-teal-300" aria-hidden /> Learn</span>
                <span>{learnCount}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-teal-400" style={{ width: `${mySkills.length ? (learnCount / mySkills.length) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
          <Link to="/my-skills" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-300 hover:text-teal-200">
            Update skills <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>

        <section className="glass-dark rounded-2xl p-5">
          <h2 className="font-heading text-xl font-bold text-white">Quick Actions</h2>
          <div className="mt-4 space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="flex items-center justify-between rounded-lg border border-slate-700/60 bg-slate-900/50 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-indigo-400/40 hover:bg-slate-800"
              >
                <span className="inline-flex items-center gap-2">
                  <action.icon className="h-4 w-4 text-teal-300" aria-hidden />
                  {action.label}
                </span>
                <ChevronRight className="h-4 w-4 text-slate-500" aria-hidden />
              </Link>
            ))}
          </div>
        </section>

        <section className="glass-dark rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-xl font-bold text-white">Notifications</h2>
            <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-100">
              {unreadCount} unread
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {notifications.slice(0, 3).map((item) => (
              <article key={item.id} className="rounded-lg border border-slate-700/60 bg-slate-900/50 p-3">
                <p className="line-clamp-1 text-sm font-bold text-white">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{item.description}</p>
              </article>
            ))}
            {notifications.length === 0 ? (
              <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 p-4 text-sm font-semibold text-slate-400">
                No recent notifications.
              </div>
            ) : null}
          </div>
          <Link to="/chat" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-300 hover:text-teal-200">
            <MessageCircle className="h-4 w-4" aria-hidden />
            Open chat
          </Link>
        </section>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Achievements", value: `${gamification?.totalAchievements ?? 0}/${gamification?.totalAchievementsAvailable ?? 0}`, icon: Award, to: "/achievements" },
          { label: "Completion", value: `${Math.round((analytics?.stats.completionRate ?? 0) * 100)}%`, icon: BarChart3, to: "/analytics" },
          { label: "Unread", value: unreadCount, icon: Bell, to: "/dashboard" },
        ].map((item) => (
          <Link key={item.label} to={item.to} className="glass-dark flex items-center justify-between rounded-2xl p-4 transition hover:-translate-y-1 hover:shadow-glow">
            <div>
              <p className="text-sm font-bold text-slate-400">{item.label}</p>
              <p className="mt-1 font-heading text-2xl font-black text-white">{item.value}</p>
            </div>
            <item.icon className="h-6 w-6 text-teal-300" aria-hidden />
          </Link>
        ))}
      </section>
    </AnimatedPage>
  );
}
