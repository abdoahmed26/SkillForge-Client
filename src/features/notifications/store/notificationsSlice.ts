import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNotifications, markAllNotificationsRead, markNotificationRead } from "../api/notificationsApi";
import type { AppNotification } from "../types/notification.types";

export const loadNotifications = createAsyncThunk("notifications/load", fetchNotifications);
export const readNotification = createAsyncThunk("notifications/readOne", markNotificationRead);
export const readAllNotifications = createAsyncThunk("notifications/readAll", markAllNotificationsRead);

interface NotificationsState {
  items: AppNotification[];
  unreadCount: number;
  isLoading: boolean;
}

const initialState: NotificationsState = { items: [], unreadCount: 0, isLoading: false };

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationReceived(state, action: PayloadAction<AppNotification>) {
      state.items.unshift(action.payload);
      state.unreadCount += action.payload.isRead ? 0 : 1;
    },
    unreadCountReceived(state, action: PayloadAction<number>) {
      state.unreadCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.notifications;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
        state.unreadCount = state.items.filter((item) => !item.isRead).length;
      })
      .addCase(readAllNotifications.fulfilled, (state) => {
        state.items = state.items.map((item) => ({ ...item, isRead: true }));
        state.unreadCount = 0;
      });
  },
});

export const { notificationReceived, unreadCountReceived } = notificationsSlice.actions;
export default notificationsSlice.reducer;
