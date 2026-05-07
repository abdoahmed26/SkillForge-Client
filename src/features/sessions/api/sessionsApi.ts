import { api } from "../../../utils/api";
import type {
  AvailabilityPayload,
  AvailabilitySlotInput,
  AvailabilitySlot,
  AvailableSlots,
  CreateSessionDto,
  RescheduleDto,
  Session,
  SessionStatus,
  UpdateAvailabilitySlotDto,
} from "../types/session.types";

export const getMyAvailability = async () => {
  const { data } = await api.get<{ slots: AvailabilitySlot[] }>("/availability/me");
  return data;
};

export const updateMyAvailability = async (payload: AvailabilityPayload) => {
  const { data } = await api.put<{ slotCount: number }>("/availability/me", payload);
  return data;
};

export const addMyAvailabilitySlot = async (payload: AvailabilitySlotInput) => {
  const { data } = await api.post<{ slot: AvailabilitySlot }>("/availability/me", payload);
  return data;
};

export const getMyAvailabilitySlot = async (slotId: string) => {
  const { data } = await api.get<{ slot: AvailabilitySlot }>(`/availability/me/${slotId}`);
  return data;
};

export const updateMyAvailabilitySlot = async (
  slotId: string,
  payload: UpdateAvailabilitySlotDto,
) => {
  const { data } = await api.patch<{ slot: AvailabilitySlot }>(
    `/availability/me/${slotId}`,
    payload,
  );
  return data;
};

export const deleteMyAvailabilitySlot = async (slotId: string) => {
  const { data } = await api.delete<{ message: string; id: string }>(
    `/availability/me/${slotId}`,
  );
  return data;
};

export const getUserAvailability = async (userId: string) => {
  const { data } = await api.get<{ slots: AvailabilitySlot[] }>(`/availability/${userId}`);
  return data;
};

export const createSession = async (payload: CreateSessionDto) => {
  const { data } = await api.post<Session>("/sessions", payload);
  return data;
};

export const getAvailableSlots = async (teacherId: string, skillId: string) => {
  const { data } = await api.get<AvailableSlots>("/sessions/available-slots", {
    params: { teacherId, skillId, timezoneOffsetMinutes: new Date().getTimezoneOffset() },
  });
  return data;
};

export const getUpcomingSessions = async () => {
  const { data } = await api.get<{ sessions: Session[] }>("/sessions/upcoming");
  return data;
};

export const getSessionHistory = async (status?: SessionStatus) => {
  const { data } = await api.get<{ sessions: Session[] }>("/sessions/history", {
    params: status ? { status } : undefined,
  });
  return data;
};

export const getSessionRequests = async () => {
  const { data } = await api.get<{ requests: Session[] }>("/sessions/requests");
  return data;
};

export const acceptSessionRequest = async (id: string) => {
  const { data } = await api.post<Session>(`/sessions/${id}/accept`);
  return data;
};

export const rejectSessionRequest = async (id: string, comment: string) => {
  const { data } = await api.post<Session>(`/sessions/${id}/reject`, { comment });
  return data;
};

export const cancelSession = async (id: string, comment: string) => {
  const { data } = await api.post<Session>(`/sessions/${id}/cancel`, { comment });
  return data;
};

export const joinSession = async (id: string) => {
  const { data } = await api.post<Session>(`/sessions/${id}/join`);
  return data;
};

export const rescheduleSession = async (id: string, payload: RescheduleDto) => {
  const { data } = await api.patch<{ id: string; scheduledAt: string; rescheduleCount: number }>(
    `/sessions/${id}/reschedule`,
    payload,
  );
  return data;
};
