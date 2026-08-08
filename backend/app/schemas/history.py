from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


# -------------------------------------------------------
# Base History Schema
# -------------------------------------------------------

class HistoryBase(BaseModel):
    movie_id: int
    title: str
    poster_path: str

    backdrop_path: Optional[str] = None
    overview: Optional[str] = None
    release_date: Optional[str] = None
    media_type: str = "movie"

    runtime: Optional[int] = None
    genres: Optional[list[str]] = None


# -------------------------------------------------------
# Add Movie to History
# -------------------------------------------------------

class HistoryCreate(HistoryBase):
    pass


# -------------------------------------------------------
# Update History
# -------------------------------------------------------

class HistoryUpdate(BaseModel):
    watched_at: Optional[datetime] = None
    progress: Optional[int] = Field(
        default=None,
        ge=0,
        le=100
    )


# -------------------------------------------------------
# History Response
# -------------------------------------------------------

class HistoryResponse(HistoryBase):
    id: Optional[str] = None
    uid: str

    watched_at: datetime
    progress: int = 100

    model_config = ConfigDict(
        from_attributes=True
    )