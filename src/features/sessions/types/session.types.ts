import type { MatchUser, SkillOverlapItem } from "../../matching/types/matching.types";

export enum SessionStatus {
  PENDING = "PENDING",
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  MISSED = "MISSED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
}

export type AvailabilitySlot = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export type AvailabilityPayload = {
  slots: { dayOfWeek: number; startTime: string }[];
};

export type AvailabilitySlotInput = {
  dayOfWeek: number;
  startTime: string;
};

export type UpdateAvailabilitySlotDto = Partial<AvailabilitySlotInput>;

export type SessionUser = {
  userId: string;
  displayName: string | null;
  avatarUrl: string | null;
  username: string;
};

export type SessionSkill = {
  id: string;
  name: string;
};

export type Session = {
  id: string;
  otherUser: SessionUser;
  skill: SessionSkill;
  role: "teacher" | "learner";
  scheduledAt: string;
  duration: number;
  status: SessionStatus;
  notes: string | null;
  rescheduleCount: number;
  requestedBy: string | null;
  rejectionComment: string | null;
  cancellationComment: string | null;
  cancelledBy: string | null;
  viewerJoinedAt: string | null;
  otherUserJoinedAt: string | null;
  viewerOutcome: "completed" | "missed" | null;
  joinUrl: string;
};

export type CreateSessionDto = {
  teacherId: string;
  skillId: string;
  scheduledAt: string;
  notes?: string;
};

export type RescheduleDto = {
  scheduledAt: string;
};

export type AvailableSlots = {
  slots: { date: string; times: string[] }[];
};

export type BookingMatchedUser = {
  matchId: string;
  matchedUser: MatchUser;
  skillOverlap: {
    canTeachMe: SkillOverlapItem[];
    canLearnFromMe: SkillOverlapItem[];
  };
};
