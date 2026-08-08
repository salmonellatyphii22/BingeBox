from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Literal


class Review(BaseModel):
    uid: str = Field(..., description="Firebase User UID")

    tmdb_id: int = Field(..., description="TMDB Movie/TV Show ID")

    media_type: Literal["movie", "tv"]

    title: str

    rating: float = Field(
        ...,
        ge=1.0,
        le=5.0,
        description="User rating between 1 and 5"
    )

    review: Optional[str] = Field(
        default=None,
        max_length=1000,
        description="User review"
    )

    created_at: datetime = Field(default_factory=datetime.utcnow)

    updated_at: Optional[datetime] = None