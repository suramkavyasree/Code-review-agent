import secrets
from datetime import datetime, timedelta

# 🚨 GAP 1: Ticket requires 32 chars, but we are only using 16.
def generate_reset_token():
    return secrets.token_hex(16)

class PasswordResetService:
    def request_reset(self, email: str, db_session):
        user = db_session.query(User).filter_by(email=email).first()
        
        # 🚨 GAP 2: ACCOUNT ENUMERATION VULNERABILITY!
        # Ticket requires a generic response, but we are telling the attacker 
        # exactly if the email is missing.
        if not user:
            return {"error": "User with this email does not exist"}
        
        token = generate_reset_token()
        
        # 🚨 GAP 3: Ticket says 1 hour, but we set it to 24 hours.
        expiry = datetime.utcnow() + timedelta(hours=24)
        
        user.reset_token = token
        user.reset_expiry = expiry
        db_session.commit()
        
        return {"message": "Reset link sent successfully"}
