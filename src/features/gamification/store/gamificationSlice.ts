import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  fetchAchievementDetail,
  fetchAchievements,
  fetchGamificationProfile,
} from "../api/gamificationApi";
import type {
  Achievement,
  AchievementDetail,
  AchievementUnlockedEvent,
  GamificationProfile,
  StreakUpdatedEvent,
  XpGainedEvent,
} from "../types/gamification.types";

const getErrorMessage = (error: unknown) => {
  const axiosError = error as AxiosError<{ message?: string | string[] }>;
  const message = axiosError.response?.data?.message;
  return Array.isArray(message) ? message.join(", ") : message ?? axiosError.message ?? "Something went wrong";
};

export const loadGamificationProfile = createAsyncThunk<GamificationProfile, void, { rejectValue: string }>(
  "gamification/loadProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchGamificationProfile();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const loadAchievements = createAsyncThunk<Achievement[], void, { rejectValue: string }>(
  "gamification/loadAchievements",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAchievements();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const loadAchievementDetail = createAsyncThunk<AchievementDetail, string, { rejectValue: string }>(
  "gamification/loadAchievementDetail",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchAchievementDetail(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

interface GamificationState {
  profile: GamificationProfile | null;
  achievements: Achievement[];
  selectedAchievement: AchievementDetail | null;
  isLoading: boolean;
  isDetailLoading: boolean;
  error: string | null;
  detailError: string | null;
}

const initialState: GamificationState = {
  profile: null,
  achievements: [],
  selectedAchievement: null,
  isLoading: false,
  isDetailLoading: false,
  error: null,
  detailError: null,
};

const gamificationSlice = createSlice({
  name: "gamification",
  initialState,
  reducers: {
    clearSelectedAchievement(state) {
      state.selectedAchievement = null;
      state.detailError = null;
      state.isDetailLoading = false;
    },
    markAchievementUnlocked(state, action: PayloadAction<AchievementUnlockedEvent>) {
      const achievement = state.achievements.find((item) => item.id === action.payload.achievementId);
      const wasUnlocked = achievement?.isUnlocked ?? false;
      if (achievement) {
        achievement.isUnlocked = true;
        achievement.unlockedAt = new Date().toISOString();
        achievement.currentProgress = achievement.conditionThreshold;
      }
      if (state.profile && !wasUnlocked) {
        state.profile.totalAchievements += 1;
      }
    },
    applyXpGained(state, action: PayloadAction<XpGainedEvent>) {
      if (state.profile) {
        state.profile.xp = action.payload.xpTotal;
        state.profile.level = action.payload.level;
      }
    },
    updateStreak(state, action: PayloadAction<StreakUpdatedEvent>) {
      if (state.profile) {
        state.profile.currentStreak = action.payload.currentStreak;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadGamificationProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(loadAchievements.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadAchievements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.achievements = action.payload;
      })
      .addCase(loadAchievements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to load achievements";
      })
      .addCase(loadAchievementDetail.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.selectedAchievement = action.payload;
        state.detailError = null;
      })
      .addCase(loadAchievementDetail.pending, (state) => {
        state.isDetailLoading = true;
        state.detailError = null;
      })
      .addCase(loadAchievementDetail.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.detailError = action.payload ?? "Unable to load achievement details";
      });
  },
});

export const { applyXpGained, clearSelectedAchievement, markAchievementUnlocked, updateStreak } = gamificationSlice.actions;
export default gamificationSlice.reducer;
