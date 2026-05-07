export enum SkillCategory {
  FRONTEND = "FRONTEND",
  BACKEND = "BACKEND",
  DEVOPS = "DEVOPS",
  DATA_SCIENCE = "DATA_SCIENCE",
  MOBILE = "MOBILE",
  DESIGN = "DESIGN",
  DATABASE = "DATABASE",
  CLOUD = "CLOUD",
  SECURITY = "SECURITY",
  AI_ML = "AI_ML",
}

export enum SkillType {
  TEACH = "TEACH",
  LEARN = "LEARN",
}

export enum ProficiencyLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}

export type SkillSort = "popularity" | "newest";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  description: string | null;
  iconUrl: string | null;
  teacherCount: number;
  learnerCount: number;
  createdAt: string;
};

export type UserSkill = {
  id: string;
  skill: Skill;
  type: SkillType;
  proficiency: ProficiencyLevel;
  createdAt: string;
};

export type SkillSuggestion = {
  id: string;
  name: string;
  category: SkillCategory;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};

export type SkillsResponse = {
  items: Skill[];
  nextCursor: string | null;
  totalCount: number;
};

export type CategoryInfo = {
  name: SkillCategory;
  label: string;
  skillCount: number;
};

export type UserSkillUser = {
  userId: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  proficiency: ProficiencyLevel;
};

export type SkillDetail = Skill & {
  teachers: UserSkillUser[];
  learners: UserSkillUser[];
};

export type SkillQueryParams = {
  search?: string;
  category?: SkillCategory | null;
  type?: SkillType | null;
  proficiency?: ProficiencyLevel | null;
  sort?: SkillSort;
  cursor?: string | null;
  limit?: number;
};

export type SkillFilters = {
  search: string;
  category: SkillCategory | null;
  type: SkillType | null;
  proficiency: ProficiencyLevel | null;
  sort: SkillSort;
};
