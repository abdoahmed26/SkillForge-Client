import { api } from "../../../utils/api";
import type { Conversation, Message } from "../types/chat.types";

export async function fetchConversations() {
  const { data } = await api.get<{ conversations: Conversation[] }>("/chat/conversations");
  return data.conversations;
}

export async function fetchMessages(conversationId: string, params?: { before?: string; after?: string; limit?: number }) {
  const { data } = await api.get<{ messages: Message[]; hasMore: boolean }>(
    `/chat/conversations/${conversationId}/messages`,
    { params },
  );
  return data;
}

export async function editMessage(messageId: string, content: string) {
  const { data } = await api.patch<Message>(`/chat/messages/${messageId}`, { content });
  return data;
}

export async function deleteMessage(messageId: string) {
  const { data } = await api.delete<Message>(`/chat/messages/${messageId}`);
  return data;
}

export async function addReaction(messageId: string, emoji: string) {
  const { data } = await api.post<Message>(`/chat/messages/${messageId}/reactions`, { emoji });
  return data;
}

export async function removeReaction(messageId: string) {
  const { data } = await api.delete<Message>(`/chat/messages/${messageId}/reactions`);
  return data;
}

export async function markConversationRead(conversationId: string) {
  const { data } = await api.patch<{ conversationId: string; unreadCount: number }>(
    `/chat/conversations/${conversationId}/read`,
  );
  return data;
}
