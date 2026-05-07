import { api } from "../../../utils/api";
import type {
  DiscoverResponse,
  LikeResponse,
  MatchedUser,
  MatchRequest,
} from "../types/matching.types";

export const getDiscoverCandidates = async (limit = 10) => {
  const { data } = await api.get<DiscoverResponse>("/matching/discover", {
    params: { limit },
  });
  return data;
};

export const likeUser = async (userId: string) => {
  const { data } = await api.post<LikeResponse>(`/matching/like/${userId}`);
  return data;
};

export const skipUser = async (userId: string) => {
  await api.post(`/matching/skip/${userId}`);
};

export const getInbox = async () => {
  const { data } = await api.get<{ requests: MatchRequest[] }>("/matching/inbox");
  return data;
};

export const acceptMatch = async (matchId: string) => {
  const { data } = await api.post<LikeResponse>(`/matching/inbox/${matchId}/accept`);
  return data;
};

export const declineMatch = async (matchId: string) => {
  const { data } = await api.post<{ matchId: string; status: string }>(
    `/matching/inbox/${matchId}/decline`,
  );
  return data;
};

export const getMyMatches = async () => {
  const { data } = await api.get<{ matches: MatchedUser[] }>("/matching/matches");
  return data;
};
