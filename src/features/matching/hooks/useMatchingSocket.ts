import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { addInboxRequest, addMatch } from "../store/matchingSlice";
import type { MatchedUser, MatchRequest } from "../types/matching.types";

export function useMatchingSocket() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.accessToken);
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
        socket = io(`${baseUrl}/matching`, {
          auth: { token },
          transports: ["websocket"],
        });

        socket.on("match:request-received", (payload: MatchRequest) => {
          dispatch(addInboxRequest(payload));
        });

        socket.on("match:accepted", (payload: MatchedUser) => {
          dispatch(addMatch(payload));
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
