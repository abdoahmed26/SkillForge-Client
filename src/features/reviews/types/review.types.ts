export type ReviewerRole = "teacher" | "learner";

export interface Review {
  id: string;
  reviewerId?: string;
  reviewedUserId?: string;
  sessionId?: string;
  reviewerRole: ReviewerRole;
  rating: number;
  text: string | null;
  createdAt: string;
  reviewer?: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
  };
  sessionSkill?: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  averageRating: number;
  totalReviewCount: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
