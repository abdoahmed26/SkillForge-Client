export interface AnalyticsStats {
  totalSessions: number;
  totalTeachingHours: number;
  totalLearningHours: number;
  completionRate: number;
}

export interface MonthlyHours {
  month: string;
  teachingHours: number;
  learningHours: number;
}

export interface SkillsRadarPoint {
  category: string;
  teachCount: number;
  learnCount: number;
}

export interface ActivityHeatmapDay {
  date: string;
  activityCount: number;
}

export interface TopSkill {
  skillName: string;
  sessionCount: number;
}

export interface AnalyticsDashboard {
  stats: AnalyticsStats;
  teachingHoursMonthly: MonthlyHours[];
  skillsRadar: SkillsRadarPoint[];
  activityHeatmap: ActivityHeatmapDay[];
  topSkillsTaught: TopSkill[];
  topSkillsLearned: TopSkill[];
}
