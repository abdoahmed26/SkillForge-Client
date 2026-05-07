import { Award, Bell, CalendarClock, CheckCircle2, Handshake, Star } from "lucide-react";
import type { AppNotification } from "../types/notification.types";

const iconMap = {
  match_request: Handshake,
  match_accepted: CheckCircle2,
  session_reminder: CalendarClock,
  session_completed: CalendarClock,
  achievement_unlocked: Award,
  review_received: Star,
};

export function NotificationItem({ notification, onClick }: { notification: AppNotification; onClick: () => void }) {
  const Icon = iconMap[notification.type] ?? Bell;
  return (
    <button type="button" onClick={onClick} className={`flex w-full gap-3 rounded-lg p-3 text-left transition ${notification.isRead ? "hover:bg-slate-800/60" : "bg-indigo-500/10 hover:bg-indigo-500/15"}`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-800 text-teal-300">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold text-white">{notification.title}</span>
        <span className="mt-1 block text-xs leading-5 text-slate-400">{notification.description}</span>
        <span className="mt-1 block text-[11px] font-semibold text-slate-500">{new Date(notification.createdAt).toLocaleString()}</span>
      </span>
    </button>
  );
}
