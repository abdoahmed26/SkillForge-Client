import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { useEffect } from "react";
import { EmptyState } from "../../../components/common/EmptyState";
import { LoadingSkeleton } from "../../../components/common/LoadingSkeleton";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { ActivityHeatmap } from "../components/ActivityHeatmap";
import { SessionStatsCards } from "../components/SessionStatsCards";
import { SkillsRadarChart } from "../components/SkillsRadarChart";
import { TeachingHoursChart } from "../components/TeachingHoursChart";
import { TopSkillsList } from "../components/TopSkillsList";
import { loadAnalyticsDashboard } from "../store/analyticsSlice";

export function AnalyticsDashboardPage() {
  const dispatch = useAppDispatch();
  const { dashboard, error, isLoading } = useAppSelector((state) => state.analytics);

  useEffect(() => {
    void dispatch(loadAnalyticsDashboard());
  }, [dispatch]);

  const hasData = (dashboard?.stats.totalSessions ?? 0) > 0;

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white">Analytics</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Review your teaching rhythm, learning momentum, skill mix, and session consistency.
        </p>
      </div>

      {error ? <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm font-bold text-red-300">{error}</p> : null}

      {isLoading || !dashboard ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <LoadingSkeleton key={index} className="h-32 border border-white/10 bg-slate-900/70" />
          ))}
        </div>
      ) : (
        <>
          <SessionStatsCards stats={dashboard.stats} />
          {!hasData ? (
            <EmptyState
              icon={BarChart3}
              title="No analytics yet"
              description="Complete a session and your dashboard will start filling in automatically."
            />
          ) : (
            <>
              <div className="grid gap-6 xl:grid-cols-2">
                <TeachingHoursChart data={dashboard.teachingHoursMonthly} />
                <SkillsRadarChart data={dashboard.skillsRadar} />
              </div>
              <ActivityHeatmap data={dashboard.activityHeatmap} />
              <div className="grid gap-6 lg:grid-cols-2">
                <TopSkillsList title="Top Skills Taught" skills={dashboard.topSkillsTaught} />
                <TopSkillsList title="Top Skills Learned" skills={dashboard.topSkillsLearned} />
              </div>
            </>
          )}
        </>
      )}
    </motion.section>
  );
}
