from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Literal


class History(BaseModel):
    uid: str = Field(..., description="Firebase User UID")
    tmdb_id: int = Field(..., description="TMDB Movie/TV ID")
    media_type: Literal["movie", "tv"]
    title: str
    poster_path: Optional[str] = None

    watched_at: datetime = Field(default_factory=datetime.utcnow)

    progress: float = Field(
        default=0.0,
        ge=0.0,
        le=1.0,
        description="Watch progress between 0 and 1"
    )

    duration: Optional[int] = Field(
        default=None,
        description="Total duration in seconds"
    )

    current_time: Optional[int] = Field(
        default=None,
        description="Current playback position in seconds"
    )

    completed: bool = False