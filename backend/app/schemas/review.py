from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


# -------------------------------------------------------
# Base Review Schema
# -------------------------------------------------------

class ReviewBase(BaseModel):
    movie_id: int
    movie_title: str
    poster_path: str

    review_title: str
    review: str

    rating: float = Field(
        ge=1,
        le=10
    )

    spoiler: bool = False
    media_type: str = "movie"


# -------------------------------------------------------
# Create Review
# -------------------------------------------------------

class ReviewCreate(ReviewBase):
    pass


# -------------------------------------------------------
# Update Review
# -------------------------------------------------------

class ReviewUpdate(BaseModel):
    review_title: Optional[str] = None
    review: Optional[str] = None

    rating: Optional[float] = Field(
        default=None,
        ge=1,
        le=10
    )

    spoiler: Optional[bool] = None


# -------------------------------------------------------
# Review Response
# -------------------------------------------------------

class ReviewResponse(ReviewBase):
    id: Optional[str] = None
    uid: str

    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(
        from_attributes=True
    )