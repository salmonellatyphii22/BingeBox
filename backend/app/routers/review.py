from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user
from app.schemas.review import ReviewCreate, ReviewUpdate
from app.services.review_service import ReviewService

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)


# -------------------------------------------------------
# Get All Reviews
# -------------------------------------------------------
@router.get("/")
async def get_reviews(current_user=Depends(get_current_user)):
    return await ReviewService.get_reviews(
        current_user["uid"]
    )


# -------------------------------------------------------
# Get Review By ID
# -------------------------------------------------------
@router.get("/{review_id}")
async def get_review(
    review_id: str,
    current_user=Depends(get_current_user)
):
    return await ReviewService.get_review(
        current_user["uid"],
        review_id
    )


# -------------------------------------------------------
# Create Review
# -------------------------------------------------------
@router.post("/")
async def create_review(
    review: ReviewCreate,
    current_user=Depends(get_current_user)
):
    return await ReviewService.create_review(
        current_user["uid"],
        review
    )


# -------------------------------------------------------
# Update Review
# -------------------------------------------------------
@router.put("/{review_id}")
async def update_review(
    review_id: str,
    review: ReviewUpdate,
    current_user=Depends(get_current_user)
):
    return await ReviewService.update_review(
        current_user["uid"],
        review_id,
        review
    )


# -------------------------------------------------------
# Delete Review
# -------------------------------------------------------
@router.delete("/{review_id}")
async def delete_review(
    review_id: str,
    current_user=Depends(get_current_user)
):
    return await ReviewService.delete_review(
        current_user["uid"],
        review_id
    )


# -------------------------------------------------------
# Get Average Rating Given By User
# -------------------------------------------------------
@router.get("/stats/average-rating")
async def average_rating(current_user=Depends(get_current_user)):
    average = await ReviewService.average_rating(
        current_user["uid"]
    )

    return {
        "average_rating": average
    }


# -------------------------------------------------------
# Total Reviews
# -------------------------------------------------------
@router.get("/stats/total")
async def total_reviews(current_user=Depends(get_current_user)):
    total = await ReviewService.total_reviews(
        current_user["uid"]
    )

    return {
        "total_reviews": total
    }