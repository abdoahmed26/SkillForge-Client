import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { useNotificationSocket } from "../hooks/useNotificationSocket";
import { loadNotifications } from "../store/notificationsSlice";
import { NotificationDropdown } from "./NotificationDropdown";

export function NotificationBell() {
  const dispatch = useAppDispatch();
  const unreadCount = useAppSelector((state) => state.notifications.unreadCount);
  const [isOpen, setIsOpen] = useState(false);
  useNotificationSocket();

  useEffect(() => {
    void dispatch(loadNotifications({ limit: 20 }));
  }, [dispatch]);

  return (
    <div className="relative">
      <button type="button" onClick={() => setIsOpen((value) => !value)} className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-700/70 bg-slate-800/60 text-slate-300 transition hover:bg-slate-700 hover:text-white" aria-label="Open notifications">
        <Bell className="h-5 w-5" />
        {unreadCount ? <span className="absolute -right-1 -top-1 rounded-full bg-teal-400 px-1.5 py-0.5 text-[10px] font-black text-slate-950">{unreadCount}</span> : null}
      </button>
      {isOpen ? <NotificationDropdown /> : null}
    </div>
  );
}
