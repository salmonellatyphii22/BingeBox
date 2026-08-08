from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# -------------------------------------------------------
# Base My List Schema
# -------------------------------------------------------

class MyListBase(BaseModel):
    movie_id: int
    title: str
    poster_path: str

    backdrop_path: Optional[str] = None
    overview: Optional[str] = None
    release_date: Optional[str] = None
    media_type: str = "movie"

    vote_average: Optional[float] = None
    runtime: Optional[int] = None
    genres: Optional[list[str]] = None


# -------------------------------------------------------
# Add Movie to My List
# -------------------------------------------------------

class MyListCreate(MyListBase):
    pass


# -------------------------------------------------------
# Update Movie
# -------------------------------------------------------

class MyListUpdate(BaseModel):
    title: Optional[str] = None
    poster_path: Optional[str] = None
    backdrop_path: Optional[str] = None
    overview: Optional[str] = None
    release_date: Optional[str] = None
    media_type: Optional[str] = None
    vote_average: Optional[float] = None
    runtime: Optional[int] = None
    genres: Optional[list[str]] = None


# -------------------------------------------------------
# Response Schema
# -------------------------------------------------------

class MyListResponse(MyListBase):
    id: Optional[str] = None
    uid: str
    added_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )