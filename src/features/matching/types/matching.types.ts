export enum MatchStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export type SkillOverlapItem = {
  skillId?: string;
  skillName: string;
  proficiency: string;
};

export type MatchUser = {
  userId: string;
  username: string;
  displayName: string | null;
  bio?: string | null;
  avatarUrl: string | null;
  averageRating?: number;
  totalReviewCount?: number;
};

export type DiscoverCandidate = MatchUser & {
  compatibilityScore: number;
  canTeachMe: SkillOverlapItem[];
  canLearnFromMe: SkillOverlapItem[];
};

export type DiscoverResponse = {
  candidates: DiscoverCandidate[];
  remaining: number;
};

export type MatchRequest = {
  matchId: string;
  requester: MatchUser;
  compatibilityScore: number;
  canTeachMe: SkillOverlapItem[];
  canLearnFromMe: SkillOverlapItem[];
  createdAt: string;
};

export type MatchedUser = {
  matchId: string;
  matchedUser: MatchUser;
  compatibilityScore: number;
  skillOverlap: {
    canTeachMe: SkillOverlapItem[];
    canLearnFromMe: SkillOverlapItem[];
  };
  matchedAt: string | null;
};

export type LikeResponse = {
  matchId: string;
  status: MatchStatus;
  compatibilityScore: number;
  isMutualMatch: boolean;
  matchedUser?: MatchUser;
  canTeachMe?: SkillOverlapItem[];
  canLearnFromMe?: SkillOverlapItem[];
  message: string;
};
