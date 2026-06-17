from app.core.security import get_password_hash, verify_password

# In-memory user store for demonstration purposes.
# In a real application, replace this with a database query.
_USERS_DB: dict[str, dict] = {
    "admin": {
        "username": "admin",
        "hashed_password": get_password_hash("admin123"),
    }
}


def authenticate_user(username: str, password: str) -> dict | None:
    user = _USERS_DB.get(username)
    if user is None:
        return None
    if not verify_password(password, user["hashed_password"]):
        return None
    return user
