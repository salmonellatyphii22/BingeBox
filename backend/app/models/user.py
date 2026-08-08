from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


class User(BaseModel):
    uid: str = Field(..., description="Firebase User UID")

    email: EmailStr

    display_name: Optional[str] = None

    photo_url: Optional[str] = None

    created_at: datetime = Field(default_factory=datetime.utcnow)

    last_login: datetime = Field(default_factory=datetime.utcnow)

    email_verified: bool = False

    is_active: bool = True

    preferred_language: str = "en"

    country: Optional[str] = None