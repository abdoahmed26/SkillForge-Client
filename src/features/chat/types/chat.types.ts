export interface ChatParticipant {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  isOnline: boolean;
}

export interface Conversation {
  id: string;
  matchId: string;
  participant: ChatParticipant;
  lastMessagePreview: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

export interface MessageReaction {
  userId: string;
  emoji: string;
}

export interface Message {
  id: string;
  conversationId?: string;
  senderId: string;
  content: string;
  isEdited: boolean;
  isDeleted: boolean;
  reactions: MessageReaction[];
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
}
