from fastapi import APIRouter, HTTPException, status
from jose import JWTError

from app.auth.schemas import LoginRequest, RefreshRequest, TokenResponse
from app.auth.service import authenticate_user
from app.core.config import settings
from app.core.security import create_access_token, create_refresh_token, decode_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=TokenResponse, summary="Obtain JWT tokens")
def login(request: LoginRequest):
    """
    Authenticate with username and password.

    Returns an **access token** (expires in 300 s) and a **refresh token** (expires in 24 h).
    """
    user = authenticate_user(request.username, request.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token({"sub": user["username"]})
    refresh_token = create_refresh_token({"sub": user["username"]})

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_SECONDS,
    )


@router.post("/refresh", response_model=TokenResponse, summary="Refresh JWT tokens")
def refresh(request: RefreshRequest):
    """
    Exchange a valid **refresh token** for a new pair of access and refresh tokens.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(request.refresh_token)
    except JWTError:
        raise credentials_exception

    if payload.get("type") != "refresh":
        raise credentials_exception

    username: str | None = payload.get("sub")
    if username is None:
        raise credentials_exception

    new_access_token = create_access_token({"sub": username})
    new_refresh_token = create_refresh_token({"sub": username})

    return TokenResponse(
        access_token=new_access_token,
        refresh_token=new_refresh_token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_SECONDS,
    )
