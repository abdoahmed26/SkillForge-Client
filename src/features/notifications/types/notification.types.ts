export type NotificationType =
  | "match_request"
  | "match_accepted"
  | "session_reminder"
  | "session_completed"
  | "achievement_unlocked"
  | "review_received";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  isRead: boolean;
  referenceId: string | null;
  referenceType: string | null;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: AppNotification[];
  unreadCount: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
