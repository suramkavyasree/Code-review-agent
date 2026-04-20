
+58
Lines changed: 58 additions & 0 deletions
Original file line number	Diff line number	Diff line change
from fastapi import APIRouter, HTTPException, Request, status
import bcrypt
import jwt
from datetime import datetime, timedelta
from src.config import settings
from pydantic import BaseModel
import structlog
logger = structlog.get_logger(__name__)
router = APIRouter(prefix="/auth", tags=["auth"])
Comment on line R10
suramkavyasree commented now
@suramkavyasree
suramkavyasree
now
Owner
Author
ℹ️ INFO: JWT_SECRET should be in UPPER_SNAKE_CASE

The constant 'JWT_SECRET' is correctly in UPPER_SNAKE_CASE, but this is a reminder to ensure all constants follow this naming convention.

Why this matters: Following naming conventions for constants improves code readability and maintainability.

Write a reply
# Using secret from settings for JWT
JWT_SECRET = settings.secret_key.get_secret_value()
ALGORITHM = "HS256"
class LoginRequest(BaseModel):
    email: str
    password: str
Comment on line R18
suramkavyasree commented 16 minutes ago
@suramkavyasree
suramkavyasree
16 minutes ago
Owner
Author
⚠️ HIGH: Missing Type Hints for Function Parameters and Return Value

The 'login' function lacks type hints for its parameters and return value.

Why this matters: Type hints improve code readability and help with static analysis tools to catch potential bugs.

Suggested fix:

async def login(request_data: LoginRequest, request: Request) -> dict:
Write a reply
Comment on line R18
suramkavyasree commented 13 minutes ago
@suramkavyasree
suramkavyasree
13 minutes ago
Owner
Author
⚠️ HIGH: Missing Type Hints for Function Parameters and Return Value

The 'login' function lacks type hints for its parameters and return value.

Why this matters: Type hints improve code readability and help with static analysis tools to catch potential bugs.

Suggested fix:

async def login(request_data: LoginRequest, request: Request) -> dict:
Write a reply
Comment on line R18
suramkavyasree commented 5 minutes ago
@suramkavyasree
suramkavyasree
5 minutes ago
Owner
Author
⚠️ HIGH: Missing Type Hints for Function Parameters and Return Value

The 'login' function lacks type hints for its parameters and return value.

Why this matters: Type hints improve code readability and help with static analysis tools to catch potential bugs.

Suggested fix:

async def login(request_data: LoginRequest, request: Request) -> dict:
Write a reply
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
Comment on lines R27 to R33
suramkavyasree commented 16 minutes ago
@suramkavyasree
suramkavyasree
16 minutes ago
Owner
Author
🔶 MEDIUM: Hardcoded Mock User Data

The code uses hardcoded mock user data for authentication.

Why this matters: Using hardcoded data is not suitable for production environments and should be replaced with a proper user retrieval mechanism.

Suggested fix:

Replace mock user retrieval with a call to a user service that fetches data from a database.
Write a reply
Comment on lines R28 to R33
suramkavyasree commented 13 minutes ago
@suramkavyasree
suramkavyasree
13 minutes ago
Owner
Author
🔶 MEDIUM: Hardcoded Mock User Data

The code contains hardcoded mock user data for authentication.

Why this matters: Using hardcoded data is not suitable for production environments and should be replaced with a proper database or user management system.

Suggested fix:

Replace the mock user data with a call to a user service that retrieves user data from a database.
Write a reply
            "id": "user_123"
Comment on lines R28 to R34
suramkavyasree commented 5 minutes ago
@suramkavyasree
suramkavyasree
5 minutes ago
Owner
Author
🔶 MEDIUM: Use of Mock Data in Production Code

The login function uses mock data for user retrieval, which is not suitable for production.

Why this matters: Mock data should be replaced with actual data retrieval logic from a database or another secure source.

Suggested fix:

Replace mock data with a call to a user service that retrieves user data from a database.
Write a reply
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
        
Comment on lines R25 to R47
suramkavyasree commented 13 minutes ago
@suramkavyasree
suramkavyasree
13 minutes ago
Owner
Author
⚠️ HIGH: Business Logic in API Handler

The login function contains business logic for user retrieval and password verification.

Why this matters: According to the Service Pattern architecture note, business logic should reside in the src/services/ directory.

Suggested fix:

Move the user retrieval and password verification logic to a service function in src/services/.
Write a reply
        return {"access_token": token, "token_type": "bearer"}
    
    # 🚨 SECURITY GAP HERE: 
Comment on lines R35 to R50
suramkavyasree commented 5 minutes ago
@suramkavyasree
suramkavyasree
5 minutes ago
Owner
Author
⚠️ HIGH: Missing Exception Handling for External Calls

The bcrypt and jwt library calls are not wrapped in try/except blocks with specific exception types.

Why this matters: External calls should be wrapped in try/except blocks to handle potential exceptions gracefully.

Suggested fix:

Wrap bcrypt and jwt calls in try/except blocks with specific exceptions like 'bcrypt.BcryptError' and 'jwt.PyJWTError'.
Write a reply
    # We are logging the email, but we FORGOT to log the IP address (request.client.host)
    # as required by KAN-1 Acceptance Criterion #3.
    logger.warning("Unsuccessful  login attempt", user_email=request_data.email)
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
Comment on lines R18 to R56
suramkavyasree commented now
@suramkavyasree
suramkavyasree
now
Owner
Author
🚨 CRITICAL: Business logic in API route handler

The 'login' function contains business logic for user authentication, which should be moved to a service layer according to the architecture notes.

Why this matters: Keeping business logic in the service layer promotes separation of concerns and makes the codebase easier to maintain and test.

Suggested fix:

Move the user retrieval and password verification logic to a service function in src/services/.
Write a reply
        detail="Incorrect email or   password"
    )