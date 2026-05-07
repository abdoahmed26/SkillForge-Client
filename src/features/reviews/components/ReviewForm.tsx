import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { submitReview } from "../store/reviewsSlice";
import { StarRatingInput } from "./StarRatingInput";

export function ReviewForm({
  sessionId,
  onSubmitted,
  embedded = false,
}: {
  sessionId: string;
  onSubmitted?: () => void;
  embedded?: boolean;
}) {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector((state) => state.reviews.isSubmitting);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!rating) return;
    try {
      await dispatch(submitReview({ sessionId, rating, text: text.trim() || undefined })).unwrap();
      setRating(0);
      setText("");
      toast.success("Review submitted");
      onSubmitted?.();
    } catch {
      toast.error("Unable to submit review");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        embedded
          ? "space-y-4 rounded-lg border border-slate-700/60 bg-slate-900/50 p-4"
          : "glass-dark space-y-4 rounded-lg p-5"
      }
    >
      <StarRatingInput value={rating} onChange={setRating} />
      <textarea value={text} onChange={(event) => setText(event.target.value.slice(0, 1000))} className="min-h-28 w-full rounded-lg border border-slate-700 bg-slate-800/70 p-3 text-sm text-white outline-none focus:border-indigo-500" placeholder="Share feedback" />
      <button type="submit" disabled={!rating || isSubmitting} className="h-11 rounded-lg bg-gradient-to-r from-indigo-500 to-teal-400 px-5 text-sm font-bold text-white shadow-glow disabled:opacity-50">
        Submit review
      </button>
    </form>
  );
}
