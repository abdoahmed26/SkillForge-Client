import { api } from "../../../utils/api";
import type { AnalyticsDashboard } from "../types/analytics.types";

export async function fetchAnalyticsDashboard() {
  const { data } = await api.get<AnalyticsDashboard>("/analytics/dashboard");
  return data;
}
