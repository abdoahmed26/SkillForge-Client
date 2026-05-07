import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  addMyAvailabilitySlot,
  acceptSessionRequest,
  cancelSession,
  createSession,
  deleteMyAvailabilitySlot,
  getAvailableSlots,
  getMyAvailability,
  getMyAvailabilitySlot,
  getSessionHistory,
  getSessionRequests,
  getUpcomingSessions,
  joinSession,
  rejectSessionRequest,
  updateMyAvailabilitySlot,
  updateMyAvailability,
} from "../api/sessionsApi";
import type {
  AvailabilityPayload,
  AvailabilitySlotInput,
  AvailabilitySlot,
  AvailableSlots,
  CreateSessionDto,
  Session,
  SessionStatus,
  UpdateAvailabilitySlotDto,
} from "../types/session.types";

type SessionsState = {
  myAvailability: AvailabilitySlot[];
  selectedAvailabilitySlot: AvailabilitySlot | null;
  isAvailabilityLoading: boolean;
  isAvailabilitySaving: boolean;
  availableSlots: AvailableSlots;
  upcoming: Session[];
  history: Session[];
  requests: Session[];
  isUpcomingLoading: boolean;
  isHistoryLoading: boolean;
  isRequestsLoading: boolean;
  isBooking: boolean;
  bookingError: string | null;
  error: string | null;
};

const initialState: SessionsState = {
  myAvailability: [],
  selectedAvailabilitySlot: null,
  isAvailabilityLoading: false,
  isAvailabilitySaving: false,
  availableSlots: { slots: [] },
  upcoming: [],
  history: [],
  requests: [],
  isUpcomingLoading: false,
  isHistoryLoading: false,
  isRequestsLoading: false,
  isBooking: false,
  bookingError: null,
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

export const fetchMyAvailability = createAsyncThunk<
  Awaited<ReturnType<typeof getMyAvailability>>,
  void,
  { rejectValue: string }
>("sessions/fetchMyAvailability", async (_, { rejectWithValue }) => {
  try {
    return await getMyAvailability();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const saveMyAvailability = createAsyncThunk<
  Awaited<ReturnType<typeof updateMyAvailability>>,
  AvailabilityPayload,
  { rejectValue: string }
>("sessions/saveMyAvailability", async (payload, { rejectWithValue }) => {
  try {
    return await updateMyAvailability(payload);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createAvailabilitySlot = createAsyncThunk<
  Awaited<ReturnType<typeof addMyAvailabilitySlot>>,
  AvailabilitySlotInput,
  { rejectValue: string }
>("sessions/createAvailabilitySlot", async (payload, { rejectWithValue }) => {
  try {
    return await addMyAvailabilitySlot(payload);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchAvailabilitySlot = createAsyncThunk<
  Awaited<ReturnType<typeof getMyAvailabilitySlot>>,
  string,
  { rejectValue: string }
>("sessions/fetchAvailabilitySlot", async (slotId, { rejectWithValue }) => {
  try {
    return await getMyAvailabilitySlot(slotId);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const editAvailabilitySlot = createAsyncThunk<
  Awaited<ReturnType<typeof updateMyAvailabilitySlot>>,
  { slotId: string; data: UpdateAvailabilitySlotDto },
  { rejectValue: string }
>("sessions/editAvailabilitySlot", async ({ slotId, data }, { rejectWithValue }) => {
  try {
    return await updateMyAvailabilitySlot(slotId, data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const removeAvailabilitySlot = createAsyncThunk<
  Awaited<ReturnType<typeof deleteMyAvailabilitySlot>>,
  string,
  { rejectValue: string }
>("sessions/removeAvailabilitySlot", async (slotId, { rejectWithValue }) => {
  try {
    return await deleteMyAvailabilitySlot(slotId);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchAvailableSlots = createAsyncThunk<
  AvailableSlots,
  { teacherId: string; skillId: string },
  { rejectValue: string }
>("sessions/fetchAvailableSlots", async ({ teacherId, skillId }, { rejectWithValue }) => {
  try {
    return await getAvailableSlots(teacherId, skillId);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchUpcomingSessions = createAsyncThunk<
  Awaited<ReturnType<typeof getUpcomingSessions>>,
  void,
  { rejectValue: string }
>("sessions/fetchUpcomingSessions", async (_, { rejectWithValue }) => {
  try {
    return await getUpcomingSessions();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchSessionHistory = createAsyncThunk<
  Awaited<ReturnType<typeof getSessionHistory>>,
  SessionStatus | undefined,
  { rejectValue: string }
>("sessions/fetchSessionHistory", async (status, { rejectWithValue }) => {
  try {
    return await getSessionHistory(status);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchSessionRequests = createAsyncThunk<
  Awaited<ReturnType<typeof getSessionRequests>>,
  void,
  { rejectValue: string }
>("sessions/fetchSessionRequests", async (_, { rejectWithValue }) => {
  try {
    return await getSessionRequests();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const acceptRequest = createAsyncThunk<Session, string, { rejectValue: string }>(
  "sessions/acceptRequest",
  async (id, { rejectWithValue }) => {
    try {
      return await acceptSessionRequest(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const rejectRequest = createAsyncThunk<
  Session,
  { id: string; comment: string },
  { rejectValue: string }
>("sessions/rejectRequest", async ({ id, comment }, { rejectWithValue }) => {
  try {
    return await rejectSessionRequest(id, comment);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const cancelScheduledSession = createAsyncThunk<
  Session,
  { id: string; comment: string },
  { rejectValue: string }
>("sessions/cancelScheduledSession", async ({ id, comment }, { rejectWithValue }) => {
  try {
    return await cancelSession(id, comment);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const joinScheduledSession = createAsyncThunk<Session, string, { rejectValue: string }>(
  "sessions/joinScheduledSession",
  async (id, { rejectWithValue }) => {
    try {
      return await joinSession(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const bookSession = createAsyncThunk<Session, CreateSessionDto, { rejectValue: string }>(
  "sessions/bookSession",
  async (payload, { rejectWithValue }) => {
    try {
      return await createSession(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    clearBookingState: (state) => {
      state.bookingError = null;
      state.availableSlots = { slots: [] };
    },
    clearSelectedAvailabilitySlot: (state) => {
      state.selectedAvailabilitySlot = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAvailability.pending, (state) => {
        state.isAvailabilityLoading = true;
        state.error = null;
      })
      .addCase(fetchMyAvailability.fulfilled, (state, action) => {
        state.isAvailabilityLoading = false;
        state.myAvailability = action.payload.slots;
      })
      .addCase(fetchMyAvailability.rejected, (state, action) => {
        state.isAvailabilityLoading = false;
        state.error = action.payload ?? "Unable to load availability";
      })
      .addCase(saveMyAvailability.pending, (state) => {
        state.isAvailabilitySaving = true;
        state.error = null;
      })
      .addCase(saveMyAvailability.fulfilled, (state) => {
        state.isAvailabilitySaving = false;
      })
      .addCase(saveMyAvailability.rejected, (state, action) => {
        state.isAvailabilitySaving = false;
        state.error = action.payload ?? "Unable to save availability";
      })
      .addCase(createAvailabilitySlot.pending, (state) => {
        state.isAvailabilitySaving = true;
        state.error = null;
      })
      .addCase(createAvailabilitySlot.fulfilled, (state, action) => {
        state.isAvailabilitySaving = false;
        const slot = action.payload.slot;
        if (!state.myAvailability.some((existing) => existing.id === slot.id)) {
          state.myAvailability.push(slot);
          state.myAvailability.sort(
            (a, b) => a.dayOfWeek - b.dayOfWeek || a.startTime.localeCompare(b.startTime),
          );
        }
      })
      .addCase(createAvailabilitySlot.rejected, (state, action) => {
        state.isAvailabilitySaving = false;
        state.error = action.payload ?? "Unable to add availability slot";
      })
      .addCase(fetchAvailabilitySlot.pending, (state) => {
        state.isAvailabilityLoading = true;
        state.error = null;
      })
      .addCase(fetchAvailabilitySlot.fulfilled, (state, action) => {
        state.isAvailabilityLoading = false;
        state.selectedAvailabilitySlot = action.payload.slot;
      })
      .addCase(fetchAvailabilitySlot.rejected, (state, action) => {
        state.isAvailabilityLoading = false;
        state.error = action.payload ?? "Unable to load availability slot";
      })
      .addCase(editAvailabilitySlot.pending, (state) => {
        state.isAvailabilitySaving = true;
        state.error = null;
      })
      .addCase(editAvailabilitySlot.fulfilled, (state, action) => {
        state.isAvailabilitySaving = false;
        const slot = action.payload.slot;
        const index = state.myAvailability.findIndex((existing) => existing.id === slot.id);
        if (index >= 0) {
          state.myAvailability[index] = slot;
        } else {
          state.myAvailability.push(slot);
        }
        state.myAvailability.sort(
          (a, b) => a.dayOfWeek - b.dayOfWeek || a.startTime.localeCompare(b.startTime),
        );
        if (state.selectedAvailabilitySlot?.id === slot.id) {
          state.selectedAvailabilitySlot = slot;
        }
      })
      .addCase(editAvailabilitySlot.rejected, (state, action) => {
        state.isAvailabilitySaving = false;
        state.error = action.payload ?? "Unable to update availability slot";
      })
      .addCase(removeAvailabilitySlot.pending, (state) => {
        state.isAvailabilitySaving = true;
        state.error = null;
      })
      .addCase(removeAvailabilitySlot.fulfilled, (state, action) => {
        state.isAvailabilitySaving = false;
        state.myAvailability = state.myAvailability.filter(
          (slot) => slot.id !== action.payload.id,
        );
        if (state.selectedAvailabilitySlot?.id === action.payload.id) {
          state.selectedAvailabilitySlot = null;
        }
      })
      .addCase(removeAvailabilitySlot.rejected, (state, action) => {
        state.isAvailabilitySaving = false;
        state.error = action.payload ?? "Unable to delete availability slot";
      })
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.isBooking = true;
        state.bookingError = null;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.isBooking = false;
        state.availableSlots = action.payload;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.isBooking = false;
        state.bookingError = action.payload ?? "Unable to load available slots";
      })
      .addCase(fetchUpcomingSessions.pending, (state) => {
        state.isUpcomingLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingSessions.fulfilled, (state, action) => {
        state.isUpcomingLoading = false;
        state.upcoming = action.payload.sessions;
      })
      .addCase(fetchUpcomingSessions.rejected, (state, action) => {
        state.isUpcomingLoading = false;
        state.error = action.payload ?? "Unable to load upcoming sessions";
      })
      .addCase(fetchSessionHistory.pending, (state) => {
        state.isHistoryLoading = true;
        state.error = null;
      })
      .addCase(fetchSessionHistory.fulfilled, (state, action) => {
        state.isHistoryLoading = false;
        state.history = action.payload.sessions;
      })
      .addCase(fetchSessionHistory.rejected, (state, action) => {
        state.isHistoryLoading = false;
        state.error = action.payload ?? "Unable to load session history";
      })
      .addCase(fetchSessionRequests.pending, (state) => {
        state.isRequestsLoading = true;
        state.error = null;
      })
      .addCase(fetchSessionRequests.fulfilled, (state, action) => {
        state.isRequestsLoading = false;
        state.requests = action.payload.requests;
      })
      .addCase(fetchSessionRequests.rejected, (state, action) => {
        state.isRequestsLoading = false;
        state.error = action.payload ?? "Unable to load session requests";
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter((request) => request.id !== action.payload.id);
        if (!state.upcoming.some((session) => session.id === action.payload.id)) {
          state.upcoming.push(action.payload);
          state.upcoming.sort(
            (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
          );
        }
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to accept request";
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter((request) => request.id !== action.payload.id);
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to reject request";
      })
      .addCase(cancelScheduledSession.fulfilled, (state, action) => {
        state.upcoming = state.upcoming.filter((session) => session.id !== action.payload.id);
        state.history = [action.payload, ...state.history.filter((session) => session.id !== action.payload.id)];
      })
      .addCase(cancelScheduledSession.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to cancel session";
      })
      .addCase(joinScheduledSession.fulfilled, (state, action) => {
        state.upcoming = state.upcoming.map((session) =>
          session.id === action.payload.id ? action.payload : session,
        );
      })
      .addCase(joinScheduledSession.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to join session";
      })
      .addCase(bookSession.pending, (state) => {
        state.isBooking = true;
        state.bookingError = null;
      })
      .addCase(bookSession.fulfilled, (state, action) => {
        state.isBooking = false;
        if (!state.requests.some((session) => session.id === action.payload.id)) {
          state.requests.unshift(action.payload);
        }
      })
      .addCase(bookSession.rejected, (state, action) => {
        state.isBooking = false;
        state.bookingError = action.payload ?? "Unable to book session";
      });
  },
});

export const { clearBookingState, clearSelectedAvailabilitySlot } = sessionsSlice.actions;
export default sessionsSlice.reducer;
