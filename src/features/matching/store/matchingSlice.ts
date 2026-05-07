import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  acceptMatch,
  declineMatch,
  getDiscoverCandidates,
  getInbox,
  getMyMatches,
  likeUser,
  skipUser,
} from "../api/matchingApi";
import type {
  DiscoverCandidate,
  LikeResponse,
  MatchedUser,
  MatchRequest,
} from "../types/matching.types";

type MatchingState = {
  candidates: DiscoverCandidate[];
  remaining: number;
  inbox: MatchRequest[];
  matches: MatchedUser[];
  isDiscoverLoading: boolean;
  isInboxLoading: boolean;
  isMatchesLoading: boolean;
  currentAction: "like" | "skip" | null;
  mutualMatch: LikeResponse | null;
  error: string | null;
};

const initialState: MatchingState = {
  candidates: [],
  remaining: 0,
  inbox: [],
  matches: [],
  isDiscoverLoading: false,
  isInboxLoading: false,
  isMatchesLoading: false,
  currentAction: null,
  mutualMatch: null,
  error: null,
};

const getErrorMessage = (error: unknown) => {
  const axiosError = error as AxiosError<{ message?: string | string[] }>;
  const message = axiosError.response?.data?.message;
  if (Array.isArray(message)) {
    return message.join(", ");
  }
  return message ?? axiosError.message ?? "Something went wrong";
};

export const fetchDiscoverCandidates = createAsyncThunk<
  Awaited<ReturnType<typeof getDiscoverCandidates>>,
  number | undefined,
  { rejectValue: string }
>("matching/fetchDiscover", async (limit, { rejectWithValue }) => {
  try {
    return await getDiscoverCandidates(limit);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const likeCandidate = createAsyncThunk<LikeResponse, string, { rejectValue: string }>(
  "matching/like",
  async (userId, { rejectWithValue }) => {
    try {
      return await likeUser(userId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const skipCandidate = createAsyncThunk<string, string, { rejectValue: string }>(
  "matching/skip",
  async (userId, { rejectWithValue }) => {
    try {
      await skipUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchInbox = createAsyncThunk<
  Awaited<ReturnType<typeof getInbox>>,
  void,
  { rejectValue: string }
>("matching/fetchInbox", async (_, { rejectWithValue }) => {
  try {
    return await getInbox();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const acceptMatchRequest = createAsyncThunk<
  LikeResponse,
  string,
  { rejectValue: string }
>("matching/accept", async (matchId, { rejectWithValue }) => {
  try {
    return await acceptMatch(matchId);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const declineMatchRequest = createAsyncThunk<
  { matchId: string; status: string },
  string,
  { rejectValue: string }
>("matching/decline", async (matchId, { rejectWithValue }) => {
  try {
    return await declineMatch(matchId);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchMyMatches = createAsyncThunk<
  Awaited<ReturnType<typeof getMyMatches>>,
  void,
  { rejectValue: string }
>("matching/fetchMatches", async (_, { rejectWithValue }) => {
  try {
    return await getMyMatches();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const matchingSlice = createSlice({
  name: "matching",
  initialState,
  reducers: {
    removeTopCandidate: (state) => {
      state.candidates.shift();
    },
    clearMutualMatch: (state) => {
      state.mutualMatch = null;
    },
    addInboxRequest: (state, action: PayloadAction<MatchRequest>) => {
      if (!state.inbox.some((request) => request.matchId === action.payload.matchId)) {
        state.inbox.unshift(action.payload);
      }
    },
    addMatch: (state, action: PayloadAction<MatchedUser>) => {
      if (!state.matches.some((match) => match.matchId === action.payload.matchId)) {
        state.matches.unshift(action.payload);
      }
      state.inbox = state.inbox.filter((request) => request.matchId !== action.payload.matchId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscoverCandidates.pending, (state) => {
        state.isDiscoverLoading = true;
        state.error = null;
      })
      .addCase(fetchDiscoverCandidates.fulfilled, (state, action) => {
        state.isDiscoverLoading = false;
        state.candidates = action.payload.candidates;
        state.remaining = action.payload.remaining;
      })
      .addCase(fetchDiscoverCandidates.rejected, (state, action) => {
        state.isDiscoverLoading = false;
        state.error = action.payload ?? "Unable to load discover candidates";
      })
      .addCase(likeCandidate.pending, (state) => {
        state.currentAction = "like";
      })
      .addCase(likeCandidate.fulfilled, (state, action) => {
        state.currentAction = null;
        state.candidates.shift();
        if (action.payload.isMutualMatch) {
          state.mutualMatch = action.payload;
        }
      })
      .addCase(likeCandidate.rejected, (state, action) => {
        state.currentAction = null;
        state.error = action.payload ?? "Unable to like candidate";
      })
      .addCase(skipCandidate.pending, (state) => {
        state.currentAction = "skip";
      })
      .addCase(skipCandidate.fulfilled, (state) => {
        state.currentAction = null;
        state.candidates.shift();
      })
      .addCase(skipCandidate.rejected, (state, action) => {
        state.currentAction = null;
        state.error = action.payload ?? "Unable to skip candidate";
      })
      .addCase(fetchInbox.pending, (state) => {
        state.isInboxLoading = true;
      })
      .addCase(fetchInbox.fulfilled, (state, action) => {
        state.isInboxLoading = false;
        state.inbox = action.payload.requests;
      })
      .addCase(fetchInbox.rejected, (state, action) => {
        state.isInboxLoading = false;
        state.error = action.payload ?? "Unable to load inbox";
      })
      .addCase(acceptMatchRequest.fulfilled, (state, action) => {
        state.inbox = state.inbox.filter((request) => request.matchId !== action.payload.matchId);
        if (action.payload.isMutualMatch) {
          state.mutualMatch = action.payload;
        }
      })
      .addCase(declineMatchRequest.fulfilled, (state, action) => {
        state.inbox = state.inbox.filter((request) => request.matchId !== action.payload.matchId);
      })
      .addCase(fetchMyMatches.pending, (state) => {
        state.isMatchesLoading = true;
      })
      .addCase(fetchMyMatches.fulfilled, (state, action) => {
        state.isMatchesLoading = false;
        state.matches = action.payload.matches;
      })
      .addCase(fetchMyMatches.rejected, (state, action) => {
        state.isMatchesLoading = false;
        state.error = action.payload ?? "Unable to load matches";
      });
  },
});

export const { addInboxRequest, addMatch, clearMutualMatch, removeTopCandidate } =
  matchingSlice.actions;

export default matchingSlice.reducer;
