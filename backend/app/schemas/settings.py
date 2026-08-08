from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


# -------------------------------------------------------
# Base Settings Schema
# -------------------------------------------------------

class SettingsBase(BaseModel):

    theme: str = Field(default="dark")
    language: str = Field(default="English")

    autoplay: bool = True
    notifications: bool = True

    video_quality: str = "Auto"

    subtitles: bool = False

    mature_content: bool = True

    profile_visibility: str = "Private"

    country: str = "India"


# -------------------------------------------------------
# Create Settings
# -------------------------------------------------------

class SettingsCreate(SettingsBase):
    pass


# -------------------------------------------------------
# Update Settings
# -------------------------------------------------------

class SettingsUpdate(BaseModel):

    theme: Optional[str] = None
    language: Optional[str] = None

    autoplay: Optional[bool] = None
    notifications: Optional[bool] = None

    video_quality: Optional[str] = None

    subtitles: Optional[bool] = None

    mature_content: Optional[bool] = None

    profile_visibility: Optional[str] = None

    country: Optional[str] = None


# -------------------------------------------------------
# Settings Response
# -------------------------------------------------------

class SettingsResponse(SettingsBase):

    id: Optional[str] = None

    uid: str

    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(
        from_attributes=True
    )