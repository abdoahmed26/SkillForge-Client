import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConversations, fetchMessages } from "../api/chatApi";
import type { Conversation, Message } from "../types/chat.types";

export const loadConversations = createAsyncThunk("chat/loadConversations", fetchConversations);

export const loadMessages = createAsyncThunk(
  "chat/loadMessages",
  async (conversationId: string) => ({ conversationId, ...(await fetchMessages(conversationId)) }),
);

interface ChatState {
  conversations: Conversation[];
  messagesByConversation: Record<string, Message[]>;
  activeConversationId: string | null;
  typingByConversation: Record<string, string[]>;
  isLoading: boolean;
}

const initialState: ChatState = {
  conversations: [],
  messagesByConversation: {},
  activeConversationId: null,
  typingByConversation: {},
  isLoading: false,
};

const upsertMessage = (messages: Message[], message: Message) => {
  const index = messages.findIndex((item) => item.id === message.id);
  if (index >= 0) messages[index] = { ...messages[index], ...message };
  else messages.push(message);
  messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation(state, action: PayloadAction<string | null>) {
      state.activeConversationId = action.payload;
    },
    messageReceived(state, action: PayloadAction<Message & { conversationId: string }>) {
      const list = state.messagesByConversation[action.payload.conversationId] ?? [];
      upsertMessage(list, action.payload);
      state.messagesByConversation[action.payload.conversationId] = list;
    },
    messageUpdated(state, action: PayloadAction<Message & { conversationId: string }>) {
      const list = state.messagesByConversation[action.payload.conversationId] ?? [];
      upsertMessage(list, action.payload);
    },
    reactionAdded(state, action: PayloadAction<{ conversationId: string; messageId: string; userId: string; emoji: string }>) {
      const message = state.messagesByConversation[action.payload.conversationId]?.find((item) => item.id === action.payload.messageId);
      if (!message) return;
      message.reactions = [
        ...(message.reactions ?? []).filter((reaction) => reaction.userId !== action.payload.userId),
        { userId: action.payload.userId, emoji: action.payload.emoji },
      ];
    },
    reactionRemoved(state, action: PayloadAction<{ conversationId: string; messageId: string; userId: string }>) {
      const message = state.messagesByConversation[action.payload.conversationId]?.find((item) => item.id === action.payload.messageId);
      if (!message) return;
      message.reactions = (message.reactions ?? []).filter((reaction) => reaction.userId !== action.payload.userId);
    },
    userTyping(state, action: PayloadAction<{ conversationId: string; userId: string }>) {
      const users = new Set(state.typingByConversation[action.payload.conversationId] ?? []);
      users.add(action.payload.userId);
      state.typingByConversation[action.payload.conversationId] = [...users];
    },
    userStoppedTyping(state, action: PayloadAction<{ conversationId: string; userId: string }>) {
      state.typingByConversation[action.payload.conversationId] = (
        state.typingByConversation[action.payload.conversationId] ?? []
      ).filter((id) => id !== action.payload.userId);
    },
    userOnlineChanged(state, action: PayloadAction<{ userId: string; isOnline: boolean }>) {
      state.conversations = state.conversations.map((conversation) =>
        conversation.participant.id === action.payload.userId
          ? { ...conversation, participant: { ...conversation.participant, isOnline: action.payload.isOnline } }
          : conversation,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversations = action.payload;
        state.activeConversationId ??= action.payload[0]?.id ?? null;
      })
      .addCase(loadMessages.fulfilled, (state, action) => {
        state.messagesByConversation[action.payload.conversationId] = action.payload.messages;
      });
  },
});

export const {
  setActiveConversation,
  messageReceived,
  messageUpdated,
  reactionAdded,
  reactionRemoved,
  userTyping,
  userStoppedTyping,
  userOnlineChanged,
} = chatSlice.actions;
export default chatSlice.reducer;
