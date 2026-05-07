import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createReview, fetchUserReviews } from "../api/reviewsApi";
import type { Review, ReviewsResponse } from "../types/review.types";

export const loadUserReviews = createAsyncThunk(
  "reviews/loadUser",
  async ({ userId, page = 1 }: { userId: string; page?: number }) => fetchUserReviews(userId, { page }),
);

export const submitReview = createAsyncThunk("reviews/submit", createReview);

interface ReviewsState {
  response: ReviewsResponse | null;
  isLoading: boolean;
  isSubmitting: boolean;
}

const initialState: ReviewsState = { response: null, isLoading: false, isSubmitting: false };

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
      })
      .addCase(loadUserReviews.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(submitReview.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.response?.reviews.unshift(action.payload as Review);
      })
      .addCase(submitReview.rejected, (state) => {
        state.isSubmitting = false;
      });
  },
});

export default reviewsSlice.reducer;
