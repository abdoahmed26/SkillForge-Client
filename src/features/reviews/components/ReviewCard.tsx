import { Star } from "lucide-react";
import type { Review } from "../types/review.types";

export function ReviewCard({ review, compact = false }: { review: Review; compact?: boolean }) {
  const name = review.reviewer?.displayName ?? review.reviewer?.username ?? "Reviewer";
  return (
    <article className={`${compact ? "border border-slate-700/60 bg-slate-900/50" : "glass-dark"} rounded-lg p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-base font-bold text-white">{name}</h3>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{review.reviewerRole}</p>
        </div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((value) => <Star key={value} className={`h-4 w-4 ${value <= review.rating ? "fill-teal-400 text-teal-400" : "text-slate-600"}`} />)}
        </div>
      </div>
      {review.text ? <p className="mt-3 text-sm leading-6 text-slate-300">{review.text}</p> : null}
      <p className="mt-3 text-xs text-slate-500">{review.sessionSkill ?? "Session"} - {new Date(review.createdAt).toLocaleDateString()}</p>
    </article>
  );
}
