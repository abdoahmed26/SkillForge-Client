/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoadingSkeleton } from "../components/common/LoadingSkeleton";
import { NotFoundPage } from "../components/common/NotFoundPage";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";

const AppLayout = lazy(() => import("../layouts/AppLayout").then((module) => ({ default: module.AppLayout })));
const AuthLayout = lazy(() => import("../layouts/AuthLayout").then((module) => ({ default: module.AuthLayout })));
const DashboardPage = lazy(() => import("../features/auth/pages/DashboardPage").then((module) => ({ default: module.DashboardPage })));
const ForgotPasswordPage = lazy(() => import("../features/auth/pages/ForgotPasswordPage").then((module) => ({ default: module.ForgotPasswordPage })));
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage").then((module) => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage").then((module) => ({ default: module.RegisterPage })));
const ResetPasswordPage = lazy(() => import("../features/auth/pages/ResetPasswordPage").then((module) => ({ default: module.ResetPasswordPage })));
const ProfilePage = lazy(() => import("../features/auth/pages/ProfilePage").then((module) => ({ default: module.ProfilePage })));
const DiscoverPage = lazy(() => import("../features/matching/pages/DiscoverPage").then((module) => ({ default: module.DiscoverPage })));
const MatchInboxPage = lazy(() => import("../features/matching/pages/MatchInboxPage").then((module) => ({ default: module.MatchInboxPage })));
const MyMatchesPage = lazy(() => import("../features/matching/pages/MyMatchesPage").then((module) => ({ default: module.MyMatchesPage })));
const AvailabilityPage = lazy(() => import("../features/sessions/pages/AvailabilityPage").then((module) => ({ default: module.AvailabilityPage })));
const MySessionsPage = lazy(() => import("../features/sessions/pages/MySessionsPage").then((module) => ({ default: module.MySessionsPage })));
const MarketplacePage = lazy(() => import("../features/skills/pages/MarketplacePage").then((module) => ({ default: module.MarketplacePage })));
const MySkillsPage = lazy(() => import("../features/skills/pages/MySkillsPage").then((module) => ({ default: module.MySkillsPage })));
const AchievementsPage = lazy(() => import("../features/gamification/pages/AchievementsPage").then((module) => ({ default: module.AchievementsPage })));
const AnalyticsDashboardPage = lazy(() => import("../features/analytics/pages/AnalyticsDashboardPage").then((module) => ({ default: module.AnalyticsDashboardPage })));
const ChatPage = lazy(() => import("../features/chat/pages/ChatPage").then((module) => ({ default: module.ChatPage })));

function withRouteFallback(element: ReactNode) {
  return (
    <Suspense fallback={<LoadingSkeleton className="h-[60vh] border border-white/10 bg-slate-900/70" />}>
      {element}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  {
    element: withRouteFallback(<AuthLayout />),
    children: [
      { path: "/login", element: withRouteFallback(<LoginPage />) },
      { path: "/register", element: withRouteFallback(<RegisterPage />) },
      { path: "/forgot-password", element: withRouteFallback(<ForgotPasswordPage />) },
      { path: "/reset-password", element: withRouteFallback(<ResetPasswordPage />) },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: withRouteFallback(<AppLayout />),
        children: [
          { path: "/dashboard", element: withRouteFallback(<DashboardPage />) },
          { path: "/discover", element: withRouteFallback(<DiscoverPage />) },
          { path: "/match-inbox", element: withRouteFallback(<MatchInboxPage />) },
          { path: "/my-matches", element: withRouteFallback(<MyMatchesPage />) },
          { path: "/my-sessions", element: withRouteFallback(<MySessionsPage />) },
          { path: "/availability", element: withRouteFallback(<AvailabilityPage />) },
          { path: "/marketplace", element: withRouteFallback(<MarketplacePage />) },
          { path: "/my-skills", element: withRouteFallback(<MySkillsPage />) },
          { path: "/achievements", element: withRouteFallback(<AchievementsPage />) },
          { path: "/analytics", element: withRouteFallback(<AnalyticsDashboardPage />) },
          { path: "/chat", element: withRouteFallback(<ChatPage />) },
          { path: "/profile", element: withRouteFallback(<ProfilePage />) },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
