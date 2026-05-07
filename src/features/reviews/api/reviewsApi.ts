import { api } from "../../../utils/api";
import type { Review, ReviewsResponse } from "../types/review.types";

export async function createReview(input: { sessionId: string; rating: number; text?: string }) {
  const { data } = await api.post<Review>("/reviews", input);
  return data;
}

export async function fetchUserReviews(userId: string, params?: { page?: number; limit?: number }) {
  const { data } = await api.get<ReviewsResponse>(`/reviews/user/${userId}`, { params });
  return data;
}

export async function fetchSessionReviews(sessionId: string) {
  const { data } = await api.get<{ reviews: Review[]; currentUserReviewed: boolean }>(
    `/reviews/session/${sessionId}`,
  );
  return data;
}
