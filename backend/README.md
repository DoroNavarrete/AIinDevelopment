# JWT Authentication API

FastAPI application that demonstrates JWT-based authentication using access and refresh tokens. Passwords are hashed with **bcrypt** via **passlib**, tokens are signed with **HS256**, and dependency management is handled by **Poetry**.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Local Development (Poetry)](#local-development-poetry)
5. [Docker Deployment](#docker-deployment)
6. [API Reference](#api-reference)
7. [Usage Examples](#usage-examples)
8. [Configuration](#configuration)
9. [Security Notes](#security-notes)

---

## Architecture

```
Client ──► POST /auth/login   ──► validate credentials ──► return access_token + refresh_token
       ──► POST /auth/refresh ──► validate refresh_token ──► return new access_token + refresh_token
       ──► GET  /health        ──► liveness probe
```

| Token          | Algorithm | Expiration  |
|----------------|-----------|-------------|
| `access_token` | HS256     | 300 seconds |
| `refresh_token`| HS256     | 24 hours    |

---

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                  # FastAPI application & router registration
│   ├── auth/
│   │   ├── __init__.py
│   │   ├── router.py            # /auth/login and /auth/refresh endpoints
│   │   ├── schemas.py           # Pydantic request/response models
│   │   └── service.py           # User authentication logic
│   └── core/
│       ├── __init__.py
│       ├── config.py            # Settings loaded from environment / .env
│       └── security.py          # Password hashing and JWT utilities
├── pyproject.toml               # Poetry dependencies (package-mode = false)
├── Dockerfile                   # Multi-stage Docker build
├── docker-compose.yml           # Docker Compose service definition
├── .env.example                 # Environment variable template
└── README.md
```

---

## Prerequisites

| Tool       | Version  |
|------------|----------|
| Python     | ≥ 3.11   |
| Poetry     | ≥ 1.8    |
| Docker     | ≥ 24     |
| Docker Compose | ≥ 2  |

---

## Local Development (Poetry)

### 1. Install dependencies

```bash
cd backend
poetry install
```

### 2. Configure environment (optional)

```bash
cp .env.example .env
# Edit .env and set a strong SECRET_KEY
```

### 3. Run the development server

```bash
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The interactive API docs are available at:

- **Swagger UI** → http://localhost:8000/docs
- **ReDoc** → http://localhost:8000/redoc

---

## Docker Deployment

### 1. Configure environment

```bash
cp .env.example .env
# Set a strong SECRET_KEY in .env
```

### 2. Build and start

```bash
docker compose up --build -d
```

### 3. Stop

```bash
docker compose down
```

### Build only (no Compose)

```bash
docker build -t jwt-api .
docker run -p 8000:8000 -e SECRET_KEY=your-secret jwt-api
```

---

## API Reference

### `GET /health`

Liveness probe.

**Response `200 OK`**
```json
{ "status": "ok" }
```

---

### `POST /auth/login`

Authenticate and obtain JWT tokens.

**Request body**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response `200 OK`**
```json
{
  "access_token": "<JWT>",
  "refresh_token": "<JWT>",
  "token_type": "bearer",
  "expires_in": 300
}
```

**Response `401 Unauthorized`** — incorrect credentials.

---

### `POST /auth/refresh`

Exchange a valid refresh token for a new token pair.

**Request body**
```json
{
  "refresh_token": "<refresh JWT>"
}
```

**Response `200 OK`**
```json
{
  "access_token": "<new JWT>",
  "refresh_token": "<new JWT>",
  "token_type": "bearer",
  "expires_in": 300
}
```

**Response `401 Unauthorized`** — token is invalid, expired, or not a refresh token.

---

## Usage Examples

### Login

```bash
curl -s -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | jq .
```

### Refresh tokens

```bash
REFRESH_TOKEN="<refresh_token from login response>"

curl -s -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\": \"$REFRESH_TOKEN\"}" | jq .
```

### Health check

```bash
curl http://localhost:8000/health
```

---

## Configuration

All settings are read from environment variables (or a `.env` file in the `backend/` directory).

| Variable                      | Default                               | Description                         |
|-------------------------------|---------------------------------------|-------------------------------------|
| `SECRET_KEY`                  | `change-this-secret-key-in-production`| HMAC signing key for JWTs           |
| `ALGORITHM`                   | `HS256`                               | JWT signing algorithm                |
| `ACCESS_TOKEN_EXPIRE_SECONDS` | `300`                                 | Access token lifetime in seconds     |
| `REFRESH_TOKEN_EXPIRE_SECONDS`| `86400`                               | Refresh token lifetime in seconds    |

---

## Security Notes

- **Change `SECRET_KEY` before deploying to any non-local environment.** Use a cryptographically random value (e.g., `openssl rand -hex 32`).
- Passwords are hashed with **bcrypt** (cost factor 12). The dependency `bcrypt` is pinned to `>=3.2,<4.0` because `passlib 1.7.x` is incompatible with `bcrypt 4.x`.
- This project uses an in-memory user store for demonstration. Replace `app/auth/service.py` with a real database integration before going to production.
- Refresh tokens are not stored server-side in this demo, so they cannot be explicitly revoked. For production use, add a token blocklist backed by Redis or a database.
