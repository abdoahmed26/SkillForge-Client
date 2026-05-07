import { Star } from "lucide-react";
import { EmptyState } from "../../../components/common/EmptyState";
import { LoadingSkeleton } from "../../../components/common/LoadingSkeleton";
import type { ReviewsResponse } from "../types/review.types";
import { ReviewCard } from "./ReviewCard";

export function ReviewList({
  response,
  isLoading,
  compact = false,
}: {
  response: ReviewsResponse | null;
  isLoading: boolean;
  compact?: boolean;
}) {
  if (isLoading) return <LoadingSkeleton className="h-64 border border-white/10 bg-slate-900/70" />;
  if (!response?.reviews.length) return <EmptyState icon={Star} title="No reviews yet" description="Completed-session reviews will appear here." />;

  return (
    <section className="space-y-4">
      <div className={`${compact ? "border border-slate-700/60 bg-slate-900/50" : "glass-dark"} flex items-center justify-between rounded-lg p-4`}>
        <div>
          <p className="font-heading text-2xl font-bold text-white">{response.averageRating.toFixed(1)}</p>
          <p className="text-xs text-slate-400">{response.totalReviewCount} reviews</p>
        </div>
      </div>
      {response.reviews.map((review) => <ReviewCard key={review.id} review={review} compact={compact} />)}
    </section>
  );
}
