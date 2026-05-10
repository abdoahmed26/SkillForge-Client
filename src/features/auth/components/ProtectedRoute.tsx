import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { initializeAuth } from "../store/authSlice";

export function ProtectedRoute() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, isInitialized } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (!isInitialized && !isLoading) {
      dispatch(initializeAuth());
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
