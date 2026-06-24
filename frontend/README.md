# JWT Authentication — Frontend

React SPA with login and welcome pages, consuming the JWT Authentication API (backend). Built following the **Bugatti Design** system: pure-black canvas, white uppercase letter-spaced typography, and a minimal luxury aesthetic.

---

## Table of Contents

1. [Design System](#design-system)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Prerequisites](#prerequisites)
6. [Local Development](#local-development)
7. [Docker Deployment (Full Stack)](#docker-deployment-full-stack)
8. [Default Credentials](#default-credentials)
9. [Token Lifecycle](#token-lifecycle)
10. [Routes](#routes)

---

## Design System

Follows the **Bugatti Design** specification (`DESIGN-bugatti.md`):

| Token | Value |
|-------|-------|
| Canvas | `#000000` |
| Ink (primary text) | `#ffffff` |
| Body text | `#cccccc` |
| Muted text | `#999999` |
| Surface card | `#141414` |
| Hairline | `#262626` |
| Hairline strong | `#3a3a3a` |
| Warning | `#d4a017` |

Typography uses `Bugatti Display` / `Bugatti Text Regular` / `Bugatti Monospace` with system font fallbacks (`Helvetica Neue`, `Georgia`, `Courier New`). All headings are UPPERCASE with wide letter-spacing. Inputs use a bottom-border-only treatment. Buttons are pill-shaped with a transparent background.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool + dev server |
| React Router v6 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling (Bugatti tokens in `tailwind.config.js`) |
| `sessionStorage` | Token persistence (cleared when browser tab closes) |

---

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── auth.js              # fetch wrappers for /auth/login and /auth/refresh
│   ├── context/
│   │   └── AuthContext.jsx      # auth state, sessionStorage, auto-refresh timer
│   ├── components/
│   │   └── ProtectedRoute.jsx   # redirects unauthenticated users to /login
│   ├── pages/
│   │   ├── LoginPage.jsx        # login form
│   │   └── WelcomePage.jsx      # protected welcome screen
│   ├── App.jsx                  # BrowserRouter + route definitions
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind directives + global resets
├── index.html
├── package.json
├── vite.config.js               # Vite config + /api dev proxy → localhost:8000
├── tailwind.config.js           # Bugatti design tokens
├── postcss.config.js
├── nginx.conf                   # Nginx SPA fallback + /api proxy → backend service
├── Dockerfile                   # Multi-stage: node (build) → nginx (serve)
├── docker-compose.yml           # Full-stack: frontend + backend
└── README.md
```

---

## Features

- **Login page** — `POST /api/auth/login`; stores `access_token` and `refresh_token` in `sessionStorage`
- **Welcome page** — protected route; displays the authenticated username
- **Route guard** — unauthenticated users are automatically redirected to `/login`
- **Auto token refresh** — silently exchanges the refresh token ~30 s before the access token expires
- **Session logout** — clears all tokens from `sessionStorage` and redirects to `/login`
- **Session restore** — if the browser tab is refreshed, valid tokens are reloaded from `sessionStorage`

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 20 |
| npm | ≥ 10 |
| Docker | ≥ 24 (Docker deployment only) |
| Docker Compose | ≥ 2 (Docker deployment only) |

---

## Local Development

### 1. Start the backend

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload --port 8000
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Open **http://localhost:3000**.

The Vite dev server proxies all `/api/*` requests to `http://localhost:8000`, so no CORS configuration is needed.

---

## Docker Deployment (Full Stack)

Run both services from the `frontend/` directory:

```bash
# (optional) copy and edit the backend .env
cp ../backend/.env.example ../backend/.env

cd frontend
docker compose up --build -d
```

| Service | URL |
|---------|-----|
| Frontend (Nginx) | http://localhost:3000 |
| Backend (via Nginx proxy) | http://localhost:3000/api |

Nginx proxies `/api/*` → `http://backend:8000/*` inside the Docker network — no CORS headers required.

### Stop

```bash
docker compose down
```

---

## Default Credentials

| Username | Password |
|----------|----------|
| `admin` | `admin123` |

---

## Token Lifecycle

| Token | Storage | Expiry | Auto-refresh |
|-------|---------|--------|-------------|
| `access_token` | `sessionStorage` | 300 s (5 min) | Yes — silently refreshed 30 s before expiry |
| `refresh_token` | `sessionStorage` | 86 400 s (24 h) | — |

Both tokens are cleared from `sessionStorage` when the user logs out or when a silent refresh fails.
Tokens are also cleared automatically when the browser tab is closed (because `sessionStorage` is tab-scoped).

---

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/login` | Public | Login form |
| `/welcome` | Protected | Welcome screen (requires active session) |
| `*` | — | Redirects to `/login` |
