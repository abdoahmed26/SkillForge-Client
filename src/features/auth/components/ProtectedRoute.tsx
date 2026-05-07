import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { refreshToken, fetchCurrentUser } from "../store/authSlice";

export function ProtectedRoute() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, isInitialized } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (!isInitialized && !isLoading) {
      dispatch(refreshToken())
        .unwrap()
        .then(() => dispatch(fetchCurrentUser()))
        .catch(() => {});
    }
  }, [dispatch, isInitialized, isLoading]);

  if (!isInitialized || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
