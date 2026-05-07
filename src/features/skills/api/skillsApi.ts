import { api } from "../../../utils/api";
import type {
  CategoryInfo,
  Skill,
  SkillCategory,
  SkillDetail,
  SkillQueryParams,
  SkillSuggestion,
  SkillsResponse,
  UserSkill,
} from "../types/skill.types";
import type { ProficiencyLevel, SkillType } from "../types/skill.types";

export type AddUserSkillPayload = {
  skillId: string;
  type: SkillType;
  proficiency: ProficiencyLevel;
};

export type UpdateUserSkillPayload = Partial<{
  type: SkillType;
  proficiency: ProficiencyLevel;
}>;

export const getMySkills = async () => {
  const { data } = await api.get<UserSkill[]>("/users/me/skills");
  return data;
};

export const addUserSkill = async (payload: AddUserSkillPayload) => {
  const { data } = await api.post<UserSkill>("/users/me/skills", payload);
  return data;
};

export const updateUserSkill = async (
  id: string,
  payload: UpdateUserSkillPayload,
) => {
  const { data } = await api.patch<UserSkill>(`/users/me/skills/${id}`, payload);
  return data;
};

export const removeUserSkill = async (id: string) => {
  await api.delete(`/users/me/skills/${id}`);
};

export const autocompleteSkills = async (q: string) => {
  const { data } = await api.get<Skill[]>("/skills/autocomplete", {
    params: { q },
  });
  return data;
};

export const suggestSkill = async (payload: {
  name: string;
  category: SkillCategory;
}) => {
  const { data } = await api.post<SkillSuggestion>("/skills/suggestions", payload);
  return data;
};

export const getSkills = async (params: SkillQueryParams) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== null && value !== ""),
  );
  const { data } = await api.get<SkillsResponse>("/skills", {
    params: cleanParams,
  });
  return data;
};

export const getSkillDetail = async (id: string) => {
  const { data } = await api.get<SkillDetail>(`/skills/${id}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get<CategoryInfo[]>("/skills/categories");
  return data;
};
