export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarityCategory: AchievementRarity | string;
  conditionEventType: string;
  conditionThreshold: number;
  isUnlocked: boolean;
  unlockedAt: string | null;
  currentProgress: number;
  rarityPercentage: number;
}

export interface AchievementDetail extends Achievement {
  totalUnlocked: number;
  totalUsers: number;
}

export interface AchievementsResponse {
  achievements: Achievement[];
}

export interface AchievementUnlockedEvent {
  achievementId: string;
  name: string;
  description: string;
  icon: string;
  rarityCategory: AchievementRarity | string;
}

export interface XpGainedEvent {
  eventType: string;
  xpAmount: number;
  xpTotal: number;
  level: number;
  leveledUp: boolean;
}

export interface StreakUpdatedEvent {
  currentStreak: number;
  xpAwarded: number;
}

export interface StreakWarningEvent {
  currentStreak: number;
  hoursRemaining: number;
}

export interface GamificationProfile {
  xp: number;
  level: number;
  nextLevelXp: number;
  levelProgress: number;
  currentStreak: number;
  lastActiveDate: string | null;
  timezone: string;
  totalSessions: number;
  totalAchievements: number;
  totalAchievementsAvailable: number;
}
