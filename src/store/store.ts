import { configureStore } from "@reduxjs/toolkit";
import authReducer, { clearCredentials } from "../features/auth/store/authSlice";
import matchingReducer from "../features/matching/store/matchingSlice";
import sessionsReducer from "../features/sessions/store/sessionsSlice";
import skillsReducer from "../features/skills/store/skillsSlice";
import gamificationReducer from "../features/gamification/store/gamificationSlice";
import analyticsReducer from "../features/analytics/store/analyticsSlice";
import chatReducer from "../features/chat/store/chatSlice";
import notificationsReducer from "../features/notifications/store/notificationsSlice";
import reviewsReducer from "../features/reviews/store/reviewsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    matching: matchingReducer,
    sessions: sessionsReducer,
    skills: skillsReducer,
    gamification: gamificationReducer,
    analytics: analyticsReducer,
    chat: chatReducer,
    notifications: notificationsReducer,
    reviews: reviewsReducer,
  },
});

window.addEventListener("auth:expired", () => {
  store.dispatch(clearCredentials());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
