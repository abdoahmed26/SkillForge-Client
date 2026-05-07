# SkillForge Client

SkillForge Client is the React application for the SkillForge platform. It provides the authenticated web experience for skill discovery, smart matching, session scheduling, realtime chat, notifications, reviews, analytics, and gamification.

This README is intentionally focused on frontend development. Use the repository root README for the full product overview.

## Table Of Contents

- [Technology Stack](#technology-stack)
- [Application Structure](#application-structure)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Runtime Integration](#runtime-integration)
- [Feature Modules](#feature-modules)
- [Quality Checklist](#quality-checklist)
- [Troubleshooting](#troubleshooting)

## Technology Stack

| Area | Technology |
| --- | --- |
| Framework | React 18 |
| Build tool | Vite |
| Language | TypeScript |
| State | Redux Toolkit, React Redux |
| Routing | React Router |
| Forms | React Hook Form, Zod |
| Styling | Tailwind CSS |
| UI motion | Framer Motion |
| Realtime | Socket.io Client |
| Charts | Recharts |
| HTTP | Axios |
| Notifications | React Hot Toast |
| Icons | Lucide React |

## Application Structure

```text
Client/
  src/
    components/          Shared reusable UI
    features/            Domain modules
    hooks/               Shared typed hooks and utilities
    layouts/             Authenticated and unauthenticated layouts
    routes/              Route configuration
    store/               Redux store setup
    utils/               API and helper utilities
```

The frontend follows a feature-first structure. Each feature owns its API helpers, components, pages, store slice, and types where applicable.

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_SOCKET_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

## Environment Variables

| Variable | Required | Example | Purpose |
| --- | --- | --- | --- |
| `VITE_API_URL` | Yes | `http://localhost:3000/api/v1` | Base URL for REST API calls. Include the backend API prefix. |
| `VITE_SOCKET_URL` | Yes | `http://localhost:3000` | Base URL for Socket.io namespaces. Do not include `/api/v1`. |

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Run TypeScript build checks and create production assets. |
| `npm run lint` | Run ESLint against the client project. |
| `npm run preview` | Preview the production build locally. |

## Runtime Integration

### HTTP API

REST calls are centralized in `src/utils/api.ts`.

- Axios uses `VITE_API_URL` as its `baseURL`.
- Requests include credentials so HTTP-only refresh cookies can be sent.
- Access tokens are attached as `Authorization: Bearer <token>` after login or refresh.
- A `401` response triggers one `/auth/refresh` request and retries the original request.
- If refresh fails, the client clears auth state and redirects to `/login`.

### Realtime

Realtime hooks connect to Socket.io namespaces through `VITE_SOCKET_URL` or a base URL derived from `VITE_API_URL`.

Expected namespaces:

- `/matching`
- `/sessions`
- `/chat`
- `/notifications`
- `/gamification`

## Feature Modules

| Module | Purpose |
| --- | --- |
| `features/auth` | Login, registration, forgot/reset password, password updates, protected routes, profile editing, avatar upload. |
| `features/skills` | Marketplace, autocomplete, categories, and user skill management. |
| `features/matching` | Discovery cards, match inbox, accepted matches, public profile and reviews modal. |
| `features/sessions` | Availability, booking flow, requests, upcoming sessions, history, joining calls, reviews entry point. |
| `features/chat` | Conversations, messages, typing state, reactions, online status. |
| `features/notifications` | Notification bell, dropdown, read state, realtime updates. |
| `features/reviews` | Review form, review cards, received reviews list. |
| `features/analytics` | Personal teaching and learning analytics with charts. |
| `features/gamification` | XP, level, streak, achievements, realtime badge updates. |

## Quality Checklist

Before opening a pull request or handing off frontend work:

```bash
npm run build
npm run lint
```

For UI changes, also verify:

- Responsive behavior at mobile and desktop widths.
- Text does not overflow buttons, cards, or modal panels.
- Loading, empty, success, and error states are visible where applicable.
- Realtime features still connect after login.

## Troubleshooting

### PowerShell blocks `npm`

Windows PowerShell may block `npm.ps1` because of execution policy. Use the command shim:

```powershell
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

### API requests fail

- Confirm the server is running on `http://localhost:3000`.
- Confirm `VITE_API_URL` includes `/api/v1`.
- Confirm the backend `FRONTEND_URL` matches the Vite origin exactly.
- Confirm cookies are allowed in the browser for local development.

### Realtime features do not connect

- Confirm `VITE_SOCKET_URL=http://localhost:3000`.
- Confirm the server is running with the same JWT secret used for HTTP authentication.
- Confirm the user is authenticated before opening pages that use sockets.

### Password reset link opens but cannot submit

- Confirm the URL contains a `token` query parameter.
- Confirm the reset link has not expired.
- Request a new reset email if the token is missing or expired.
