import { api } from "../../../utils/api";
import type { AppNotification, NotificationsResponse } from "../types/notification.types";

export async function fetchNotifications(params?: { page?: number; limit?: number; unreadOnly?: boolean }) {
  const { data } = await api.get<NotificationsResponse>("/notifications", { params });
  return data;
}

export async function markNotificationRead(notificationId: string) {
  const { data } = await api.patch<AppNotification>(`/notifications/${notificationId}/read`);
  return data;
}

export async function markAllNotificationsRead() {
  const { data } = await api.patch<{ updatedCount: number; unreadCount: number }>("/notifications/read-all");
  return data;
}
