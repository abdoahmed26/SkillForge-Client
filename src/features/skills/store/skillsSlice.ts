import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  addUserSkill as addUserSkillApi,
  getCategories,
  getMySkills,
  getSkillDetail,
  getSkills,
  removeUserSkill as removeUserSkillApi,
  updateUserSkill as updateUserSkillApi,
  type AddUserSkillPayload,
  type UpdateUserSkillPayload,
} from "../api/skillsApi";
import type {
  CategoryInfo,
  Skill,
  SkillDetail,
  SkillFilters,
  SkillQueryParams,
  UserSkill,
} from "../types/skill.types";

type SkillsState = {
  mySkills: UserSkill[];
  isLoading: boolean;
  error: string | null;
  marketplace: {
    items: Skill[];
    nextCursor: string | null;
    totalCount: number;
    hasMore: boolean;
  };
  categories: CategoryInfo[];
  selectedSkill: SkillDetail | null;
  filters: SkillFilters;
  isMarketplaceLoading: boolean;
  isDetailLoading: boolean;
};

const initialFilters: SkillFilters = {
  search: "",
  category: null,
  type: null,
  proficiency: null,
  sort: "popularity",
};

const initialState: SkillsState = {
  mySkills: [],
  isLoading: false,
  error: null,
  marketplace: {
    items: [],
    nextCursor: null,
    totalCount: 0,
    hasMore: true,
  },
  categories: [],
  selectedSkill: null,
  filters: initialFilters,
  isMarketplaceLoading: false,
  isDetailLoading: false,
};

const getErrorMessage = (error: unknown) => {
  const axiosError = error as AxiosError<{ message?: string | string[] }>;
  const message = axiosError.response?.data?.message;
  if (Array.isArray(message)) {
    return message.join(", ");
  }
  return message ?? axiosError.message ?? "Something went wrong";
};

export const fetchMySkills = createAsyncThunk<UserSkill[], void, { rejectValue: string }>(
  "skills/fetchMySkills",
  async (_, { rejectWithValue }) => {
    try {
      return await getMySkills();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const addUserSkill = createAsyncThunk<UserSkill, AddUserSkillPayload, { rejectValue: string }>(
  "skills/addUserSkill",
  async (payload, { rejectWithValue }) => {
    try {
      return await addUserSkillApi(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateUserSkill = createAsyncThunk<
  UserSkill,
  { id: string; data: UpdateUserSkillPayload },
  { rejectValue: string }
>("skills/updateUserSkill", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await updateUserSkillApi(id, data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const removeUserSkill = createAsyncThunk<string, string, { rejectValue: string }>(
  "skills/removeUserSkill",
  async (id, { rejectWithValue }) => {
    try {
      await removeUserSkillApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchMarketplaceSkills = createAsyncThunk<
  { response: Awaited<ReturnType<typeof getSkills>>; append: boolean },
  SkillQueryParams | undefined,
  { rejectValue: string }
>("skills/fetchMarketplaceSkills", async (params = {}, { rejectWithValue }) => {
  try {
    const response = await getSkills(params);
    return { response, append: Boolean(params.cursor) };
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchSkillDetail = createAsyncThunk<SkillDetail, string, { rejectValue: string }>(
  "skills/fetchSkillDetail",
  async (id, { rejectWithValue }) => {
    try {
      return await getSkillDetail(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchCategories = createAsyncThunk<CategoryInfo[], void, { rejectValue: string }>(
  "skills/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategories();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<SkillFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
    },
    clearMarketplace: (state) => {
      state.marketplace.items = [];
      state.marketplace.nextCursor = null;
      state.marketplace.totalCount = 0;
      state.marketplace.hasMore = true;
    },
    clearSelectedSkill: (state) => {
      state.selectedSkill = null;
    },
    clearSkillsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMySkills.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMySkills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mySkills = action.payload;
      })
      .addCase(fetchMySkills.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to load skills";
      })
      .addCase(addUserSkill.fulfilled, (state, action) => {
        state.mySkills.unshift(action.payload);
      })
      .addCase(addUserSkill.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to add skill";
      })
      .addCase(updateUserSkill.fulfilled, (state, action) => {
        state.mySkills = state.mySkills.map((userSkill) =>
          userSkill.id === action.payload.id ? action.payload : userSkill,
        );
      })
      .addCase(updateUserSkill.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to update skill";
      })
      .addCase(removeUserSkill.fulfilled, (state, action) => {
        state.mySkills = state.mySkills.filter(
          (userSkill) => userSkill.id !== action.payload,
        );
      })
      .addCase(removeUserSkill.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to remove skill";
      })
      .addCase(fetchMarketplaceSkills.pending, (state) => {
        state.isMarketplaceLoading = true;
        state.error = null;
      })
      .addCase(fetchMarketplaceSkills.fulfilled, (state, action) => {
        state.isMarketplaceLoading = false;
        state.marketplace.items = action.payload.append
          ? [...state.marketplace.items, ...action.payload.response.items]
          : action.payload.response.items;
        state.marketplace.nextCursor = action.payload.response.nextCursor;
        state.marketplace.totalCount = action.payload.response.totalCount;
        state.marketplace.hasMore = Boolean(action.payload.response.nextCursor);
      })
      .addCase(fetchMarketplaceSkills.rejected, (state, action) => {
        state.isMarketplaceLoading = false;
        state.error = action.payload ?? "Unable to load marketplace";
      })
      .addCase(fetchSkillDetail.pending, (state) => {
        state.isDetailLoading = true;
      })
      .addCase(fetchSkillDetail.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.selectedSkill = action.payload;
      })
      .addCase(fetchSkillDetail.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.error = action.payload ?? "Unable to load skill detail";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const {
  clearMarketplace,
  clearSelectedSkill,
  clearSkillsError,
  resetFilters,
  setFilter,
} = skillsSlice.actions;

export default skillsSlice.reducer;
