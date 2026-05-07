export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  xp: number;
  level: number;
  currentStreak: number;
  averageRating: number;
  totalReviewCount: number;
  themePreference: "light" | "dark" | "system";
  createdAt: string;
  lastLoginAt: string | null;
}
