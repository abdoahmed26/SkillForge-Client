import { EmptyState } from "../../../components/common/EmptyState";
import { LoadingSkeleton } from "../../../components/common/LoadingSkeleton";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { readAllNotifications, readNotification } from "../store/notificationsSlice";
import { NotificationItem } from "./NotificationItem";

export function NotificationDropdown() {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.notifications);

  return (
    <div className="glass-dark fixed left-4 right-4 top-[4.5rem] z-50 sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[22rem] rounded-lg p-3 shadow-glow">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="font-heading text-sm font-bold text-white">Notifications</h2>
        <button type="button" onClick={() => void dispatch(readAllNotifications())} className="text-xs font-bold text-teal-300 hover:text-teal-200">
          Mark all read
        </button>
      </div>
      <div className="max-h-96 space-y-2 overflow-y-auto">
        {isLoading ? (
          <LoadingSkeleton className="h-32 border border-white/10 bg-slate-900/70" />
        ) : items.length ? (
          items.map((item) => <NotificationItem key={item.id} notification={item} onClick={() => void dispatch(readNotification(item.id))} />)
        ) : (
          <EmptyState title="No notifications" description="Updates from matches, sessions, achievements, and reviews will appear here." />
        )}
      </div>
    </div>
  );
}
