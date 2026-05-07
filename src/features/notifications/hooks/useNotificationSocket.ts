import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { notificationReceived, unreadCountReceived } from "../store/notificationsSlice";
import type { AppNotification } from "../types/notification.types";

const socketUrl = import.meta.env.VITE_SOCKET_URL ?? "http://localhost:3000";

export function useNotificationSocket() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.accessToken);

  const socket = useMemo(() => (token ? io(`${socketUrl}/notifications`, { auth: { token } }) : null), [token]);

  useEffect(() => {
    if (!socket) return undefined;
    socket.on("notification:new", (notification: AppNotification) => dispatch(notificationReceived(notification)));
    socket.on("notification:unread_count", ({ count }: { count: number }) => dispatch(unreadCountReceived(count)));
    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);
}
