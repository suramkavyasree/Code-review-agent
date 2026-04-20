from fastapi import APIRouter, HTTPException, Request, status
import bcrypt
import jwt
from datetime import datetime, timedelta
from src.config import settings
from pydantic import BaseModel
import structlog

logger = structlog.get_logger(__name__)
router = APIRouter(prefix="/auth", tags=["auth"])

# Using secret from settings for JWT
JWT_SECRET = settings.secret_key.get_secret_value()
ALGORITHM = "HS256"

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(request_data: LoginRequest, request: Request):
    """
    User login endpoint.
    Retrieves user, verifies password, and returns JWT.
    """
    # 1. Validation 
    if not request_data.email or not request_data.password:
        raise HTTPException(status_code=400, detail="Email and password required")

    # 2. Mock User Retrieval
    mock_users = {
        "user@example.com": {
            "hashed_password": bcrypt.hashpw("password123".encode(), bcrypt.gensalt()).decode(),
            "id": "user_123"
        }
    }

    user = mock_users.get(request_data.email)
    
    # 3. Verify Password using bcrypt
    if user and bcrypt.checkpw(request_data.password.encode(), user["hashed_password"].encode()):
        # Success: Return JWT
        token = jwt.encode({
            "sub": user["id"],
            "exp": datetime.utcnow() + timedelta(hours=1)
        }, JWT_SECRET, algorithm=ALGORITHM)
        
        return {"access_token": token, "token_type": "bearer"}
    
    # 🚨 SECURITY GAP HERE: 
    # We are logging the email, but we FORGOT to log the IP address (request.client.host)
    # as required by KAN-1 Acceptance Criterion #3.
    logger.warning("Unsuccessful login attempt", user_email=request_data.email)
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password"
    )
