import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../store/authSlice";
import type { LoginCredentials, RegisterCredentials } from "../types/auth.types";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const login = useCallback(
    (credentials: LoginCredentials) => dispatch(loginUser(credentials)).unwrap(),
    [dispatch],
  );
  const register = useCallback(
    (credentials: RegisterCredentials) => dispatch(registerUser(credentials)).unwrap(),
    [dispatch],
  );
  const logout = useCallback(() => dispatch(logoutUser()).unwrap(), [dispatch]);

  return { user, isAuthenticated, isLoading, error, login, register, logout };
};
