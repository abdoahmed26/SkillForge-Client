import { Edit3, Smile, Trash2 } from "lucide-react";

interface MessageActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onReact?: () => void;
}

export function MessageActions({ onEdit, onDelete, onReact }: MessageActionsProps) {
  return (
    <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
      {onReact ? (
        <button type="button" onClick={onReact} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white" title="React">
          <Smile className="h-4 w-4" />
        </button>
      ) : null}
      {onEdit ? (
        <button type="button" onClick={onEdit} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white" title="Edit">
          <Edit3 className="h-4 w-4" />
        </button>
      ) : null}
      {onDelete ? (
        <button type="button" onClick={onDelete} className="grid h-8 w-8 place-items-center rounded-lg text-red-300 hover:bg-red-500/10" title="Delete">
          <Trash2 className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
