import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { getAccessToken } from "../../../utils/cookies";
import { BadgeUnlockToast } from "../components/BadgeUnlockToast";
import { StreakFreezeWarning } from "../components/StreakFreezeWarning";
import { applyXpGained, markAchievementUnlocked, updateStreak } from "../store/gamificationSlice";
import type { AchievementUnlockedEvent, StreakUpdatedEvent, StreakWarningEvent, XpGainedEvent } from "../types/gamification.types";

export function useGamificationSocket() {
  const dispatch = useAppDispatch();
  const token = getAccessToken();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      return;
    }

    let isMounted = true;
    let socket: import("socket.io-client").Socket | null = null;

    const timer = window.setTimeout(() => {
      void import("socket.io-client").then(({ io }) => {
        if (!isMounted) {
          return;
        }

        const baseUrl = (import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1").replace(/\/api\/v\d+$/, "");
        socket = io(`${baseUrl}/gamification`, {
          auth: { token },
          transports: ["websocket"],
        });

        socket.on("gamification:achievement_unlocked", (payload: AchievementUnlockedEvent) => {
          dispatch(markAchievementUnlocked(payload));
          toast.custom(<BadgeUnlockToast achievement={payload} />, { duration: 5000 });
        });

        socket.on("gamification:xp_gained", (payload: XpGainedEvent) => {
          dispatch(applyXpGained(payload));
        });

        socket.on("gamification:streak_updated", (payload: StreakUpdatedEvent) => {
          dispatch(updateStreak(payload));
        });

        socket.on("gamification:streak_warning", (payload: StreakWarningEvent) => {
          toast.custom(<StreakFreezeWarning warning={payload} />, { duration: 7000 });
        });
      });
    }, 600);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
      socket?.disconnect();
    };
  }, [dispatch, isAuthenticated, token]);
}
