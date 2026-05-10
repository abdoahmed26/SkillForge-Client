import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api, setAccessToken } from "../../../utils/api";
import { getAccessToken, setAccessTokenCookie, removeAccessTokenCookie } from "../../../utils/cookies";
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordPayload,
  UpdatePasswordPayload,
  UpdateProfilePayload,
} from "../types/auth.types";
import type { User } from "../types/user.types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: !!getAccessToken(),
  isLoading: false,
  isInitialized: false,
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

export const loginUser = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", credentials);
      setAccessToken(data.accessToken);
      setAccessTokenCookie(data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterCredentials, { rejectValue: string }>(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/register", credentials);
      setAccessToken(data.accessToken);
      setAccessTokenCookie(data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    } finally {
      setAccessToken(null);
      removeAccessTokenCookie();
    }
  },
);

export const initializeAuth = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    const token = getAccessToken();
    if (!token) {
      return rejectWithValue("No token found");
    }

    setAccessToken(token);
    try {
      const { data } = await api.get<User>("/auth/me");
      return data;
    } catch (error) {
      setAccessToken(null);
      removeAccessTokenCookie();
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<User>("/auth/me");
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateProfile = createAsyncThunk<User, UpdateProfilePayload, { rejectValue: string }>(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch<User>("/users/profile", payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updatePassword = createAsyncThunk<{ message: string }, UpdatePasswordPayload, { rejectValue: string }>(
  "auth/updatePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ message: string }>("/auth/password", payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordPayload,
  { rejectValue: string }
>("auth/forgotPassword", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post<ForgotPasswordResponse>("/auth/forgot-password", payload);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const resetPassword = createAsyncThunk<{ message: string }, ResetPasswordPayload, { rejectValue: string }>(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ message: string }>("/auth/reset-password", payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const uploadAvatar = createAsyncThunk<string, File, { rejectValue: string }>(
  "auth/uploadAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const { data } = await api.post<{ avatarUrl: string }>("/users/avatar", formData);
      return data.avatarUrl;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      setAccessToken(action.payload.accessToken);
      setAccessTokenCookie(action.payload.accessToken);
    },
    clearCredentials: () => {
      setAccessToken(null);
      removeAccessTokenCookie();
      return { ...initialState, isInitialized: true, isAuthenticated: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to login";
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to register";
      })
      .addCase(logoutUser.fulfilled, () => ({ ...initialState, isInitialized: true, isAuthenticated: false }))
      .addCase(logoutUser.rejected, () => ({ ...initialState, isInitialized: true, isAuthenticated: false }))
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to update profile";
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to update password";
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to request password reset";
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to reset password";
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user.avatarUrl = action.payload;
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to upload avatar";
      });
  },
});

export const { clearError, setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
