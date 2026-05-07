import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchAnalyticsDashboard } from "../api/analyticsApi";
import type { AnalyticsDashboard } from "../types/analytics.types";

const getErrorMessage = (error: unknown) => {
  const axiosError = error as AxiosError<{ message?: string | string[] }>;
  const message = axiosError.response?.data?.message;
  return Array.isArray(message) ? message.join(", ") : message ?? axiosError.message ?? "Something went wrong";
};

export const loadAnalyticsDashboard = createAsyncThunk<AnalyticsDashboard, void, { rejectValue: string }>(
  "analytics/loadDashboard",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAnalyticsDashboard();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

interface AnalyticsState {
  dashboard: AnalyticsDashboard | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  dashboard: null,
  isLoading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAnalyticsDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadAnalyticsDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboard = action.payload;
      })
      .addCase(loadAnalyticsDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to load analytics";
      });
  },
});

export default analyticsSlice.reducer;
