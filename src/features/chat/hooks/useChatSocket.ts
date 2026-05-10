import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "../../../hooks/useAppHooks";
import { getAccessToken } from "../../../utils/cookies";
import { messageReceived, messageUpdated, reactionAdded, reactionRemoved, userOnlineChanged, userStoppedTyping, userTyping } from "../store/chatSlice";
import type { Message } from "../types/chat.types";

const socketUrl = import.meta.env.VITE_SOCKET_URL ?? "http://localhost:3000";

export function useChatSocket() {
  const dispatch = useAppDispatch();
  const token = getAccessToken();

  const socket = useMemo(() => {
    if (!token) return null;
    return io(`${socketUrl}/chat`, {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });
  }, [token]);

  useEffect(() => {
    if (!socket) return undefined;
    socket.on("chat:message", (message: Message & { conversationId: string }) => dispatch(messageReceived(message)));
    socket.on("chat:message_edited", (message: Message & { conversationId: string }) => dispatch(messageUpdated(message)));
    socket.on("chat:message_deleted", (message: Message & { conversationId: string }) => dispatch(messageUpdated({ ...message, isDeleted: true })));
    socket.on("chat:reaction_added", (payload: { conversationId: string; messageId: string; userId: string; emoji: string }) => dispatch(reactionAdded(payload)));
    socket.on("chat:reaction_removed", (payload: { conversationId: string; messageId: string; userId: string }) => dispatch(reactionRemoved(payload)));
    socket.on("chat:read", () => undefined);
    socket.on("chat:typing", (payload: { conversationId: string; userId: string }) => dispatch(userTyping(payload)));
    socket.on("chat:stop_typing", (payload: { conversationId: string; userId: string }) => dispatch(userStoppedTyping(payload)));
    socket.on("chat:user_online", ({ userId }: { userId: string }) => dispatch(userOnlineChanged({ userId, isOnline: true })));
    socket.on("chat:user_offline", ({ userId }: { userId: string }) => dispatch(userOnlineChanged({ userId, isOnline: false })));
    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);

  return socket;
}
