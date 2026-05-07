import { Star } from "lucide-react";
import { useState } from "react";

export function StarRatingInput({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
  const [preview, setPreview] = useState(0);
  const active = preview || value;
  return (
    <div className="flex gap-1" onMouseLeave={() => setPreview(0)}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <button key={rating} type="button" onMouseEnter={() => setPreview(rating)} onClick={() => onChange(rating)} className="grid h-11 w-11 place-items-center rounded-lg hover:bg-slate-800" title={`${rating} stars`}>
          <Star className={`h-6 w-6 ${rating <= active ? "fill-teal-400 text-teal-400" : "text-slate-600"}`} />
        </button>
      ))}
    </div>
  );
}
