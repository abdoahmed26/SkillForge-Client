import { api } from "../../../utils/api";
import type { AchievementDetail, AchievementsResponse, GamificationProfile } from "../types/gamification.types";

export async function fetchGamificationProfile() {
  const { data } = await api.get<GamificationProfile>("/gamification/profile");
  return data;
}

export async function fetchAchievements() {
  const { data } = await api.get<AchievementsResponse>("/gamification/achievements");
  return data.achievements;
}

export async function fetchAchievementDetail(id: string) {
  const { data } = await api.get<AchievementDetail>(`/gamification/achievements/${id}`);
  return data;
}
