from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, ConfigDict


# -------------------------------------------------------
# Base User Schema
# -------------------------------------------------------

class UserBase(BaseModel):
    email: EmailStr

    display_name: Optional[str] = None
    photo_url: Optional[str] = None

    email_verified: bool = False

    preferred_language: str = "English"
    country: Optional[str] = None

    is_active: bool = True


# -------------------------------------------------------
# Create User
# -------------------------------------------------------

class UserCreate(UserBase):
    uid: str


# -------------------------------------------------------
# Update User
# -------------------------------------------------------

class UserUpdate(BaseModel):
    display_name: Optional[str] = None
    photo_url: Optional[str] = None

    preferred_language: Optional[str] = None
    country: Optional[str] = None

    is_active: Optional[bool] = None


# -------------------------------------------------------
# User Response
# -------------------------------------------------------

class UserResponse(UserBase):
    id: Optional[str] = None

    uid: str

    created_at: datetime
    last_login: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(
        from_attributes=True
    )


# -------------------------------------------------------
# Dashboard Statistics
# -------------------------------------------------------

class UserDashboard(BaseModel):
    my_list: int = 0
    watch_history: int = 0
    reviews: int = 0
    ratings: int = 0