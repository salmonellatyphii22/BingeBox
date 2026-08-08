from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Literal


class MyList(BaseModel):
    uid: str = Field(..., description="Firebase User UID")

    movie_id: int = Field(..., description="TMDB Movie/TV Show ID")

    media_type: Literal["movie", "tv"]

    title: str

    poster_path: Optional[str] = None

    backdrop_path: Optional[str] = None

    overview: Optional[str] = None

    release_date: Optional[str] = None

    vote_average: Optional[float] = None

    added_at: datetime = Field(default_factory=datetime.utcnow)