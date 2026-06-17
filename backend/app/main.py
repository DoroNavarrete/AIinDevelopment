from fastapi import FastAPI

from app.auth.router import router as auth_router

app = FastAPI(
    title="JWT Authentication API",
    description="FastAPI application demonstrating JWT-based authentication with access and refresh tokens.",
    version="1.0.0",
)

app.include_router(auth_router)


@app.get("/health", tags=["Health"])
def health_check():
    """Liveness probe — returns 200 OK when the service is running."""
    return {"status": "ok"}
