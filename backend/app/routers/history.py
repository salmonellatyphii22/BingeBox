from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user
from app.schemas.history import HistoryCreate
from app.services.history_service import HistoryService

router = APIRouter(
    prefix="/history",
    tags=["Watch History"]
)


# -------------------------------------------------------
# Get User Watch History
# -------------------------------------------------------
@router.get("/")
async def get_watch_history(current_user=Depends(get_current_user)):
    return await HistoryService.get_history(
        current_user["uid"]
    )


# -------------------------------------------------------
# Add Movie to Watch History
# -------------------------------------------------------
@router.post("/")
async def add_to_history(
    movie: HistoryCreate,
    current_user=Depends(get_current_user)
):
    return await HistoryService.add_history(
        current_user["uid"],
        movie
    )


# -------------------------------------------------------
# Delete One History Item
# -------------------------------------------------------
@router.delete("/{history_id}")
async def delete_history(
    history_id: str,
    current_user=Depends(get_current_user)
):
    return await HistoryService.delete_history(
        current_user["uid"],
        history_id
    )


# -------------------------------------------------------
# Clear Entire Watch History
# -------------------------------------------------------
@router.delete("/")
async def clear_history(
    current_user=Depends(get_current_user)
):
    return await HistoryService.clear_history(
        current_user["uid"]
    )


# -------------------------------------------------------
# Check if Movie Exists in History
# -------------------------------------------------------
@router.get("/check/{movie_id}")
async def check_history(
    movie_id: int,
    current_user=Depends(get_current_user)
):
    exists = await HistoryService.is_in_history(
        current_user["uid"],
        movie_id
    )

    return {
        "exists": exists
    }


# -------------------------------------------------------
# Update Watch Progress
# -------------------------------------------------------
@router.put("/{movie_id}/progress/{progress}")
async def update_progress(
    movie_id: int,
    progress: int,
    current_user=Depends(get_current_user)
):
    return await HistoryService.update_progress(
        current_user["uid"],
        movie_id,
        progress
    )