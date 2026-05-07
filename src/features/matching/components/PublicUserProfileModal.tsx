import { AnimatePresence, motion } from "framer-motion";
import { Award, Star, UserCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { ReviewList } from "../../reviews/components/ReviewList";
import type { ReviewsResponse } from "../../reviews/types/review.types";
import { fetchUserReviews } from "../../reviews/api/reviewsApi";
import type { MatchUser } from "../types/matching.types";

type PublicProfile = {
  id: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  xp: number;
  level: number;
  averageRating: number;
  totalReviewCount: number;
};

type PublicUserProfileModalProps = {
  user: MatchUser | null;
  isOpen: boolean;
  onClose: () => void;
  onLike?: (userId: string) => void;
};

export function PublicUserProfileModal({ user, isOpen, onClose, onLike }: PublicUserProfileModalProps) {
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [reviews, setReviews] = useState<ReviewsResponse | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !user) {
      return;
    }

    let cancelled = false;
    setError(null);
    setProfile(null);
    setReviews(null);
    setIsProfileLoading(true);
    setIsReviewsLoading(true);

    api
      .get<PublicProfile>(`/users/${user.userId}`)
      .then(({ data }) => {
        if (!cancelled) setProfile(data);
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load profile");
      })
      .finally(() => {
        if (!cancelled) setIsProfileLoading(false);
      });

    fetchUserReviews(user.userId, { page: 1, limit: 5 })
      .then((data) => {
        if (!cancelled) setReviews(data);
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load reviews");
      })
      .finally(() => {
        if (!cancelled) setIsReviewsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, user]);

  const displayName = profile?.displayName || user?.displayName || user?.username || "User";
  const username = profile?.username || user?.username;
  const avatarUrl = profile?.avatarUrl ?? user?.avatarUrl ?? null;
  const averageRating = Number(profile?.averageRating ?? user?.averageRating ?? reviews?.averageRating ?? 0);
  const totalReviewCount = profile?.totalReviewCount ?? user?.totalReviewCount ?? reviews?.totalReviewCount ?? 0;

  return (
    <AnimatePresence>
      {isOpen && user ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="glass-dark max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg p-5"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="h-20 w-20 rounded-full object-cover ring-2 ring-indigo-500/50" />
                ) : (
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 text-white ring-2 ring-indigo-500/50">
                    <UserCircle className="h-12 w-12" aria-hidden="true" />
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="truncate font-heading text-2xl font-black text-white">{displayName}</h2>
                  <p className="text-sm font-semibold text-slate-400">@{username}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3 py-1 text-xs font-bold text-teal-100">
                      <Star className="h-4 w-4 fill-teal-300 text-teal-300" aria-hidden="true" />
                      {averageRating.toFixed(1)} ({totalReviewCount})
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-100">
                      <Award className="h-4 w-4" aria-hidden="true" />
                      Level {profile?.level ?? 1}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
                aria-label="Close profile"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {error ? (
              <p className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm font-bold text-red-200">
                {error}
              </p>
            ) : null}

            <div className="mt-5 rounded-lg border border-slate-700/60 bg-slate-900/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Bio</p>
              {isProfileLoading ? (
                <div className="mt-3 h-12 animate-pulse rounded bg-slate-800" />
              ) : (
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {profile?.bio || user.bio || "No bio added yet."}
                </p>
              )}
            </div>

            <div className="mt-5">
              <ReviewList response={reviews} isLoading={isReviewsLoading} compact />
            </div>

            {onLike ? (
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => onLike(user.userId)}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-5 py-3 text-sm font-bold text-white shadow-glow transition-all hover:opacity-90"
                >
                  Send match request
                </button>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
