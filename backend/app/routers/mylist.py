from fastapi import APIRouter, Depends, Query

from app.auth.dependencies import get_current_user
from app.schemas.mylist import (
    MyListCreate,
    MyListUpdate
)
from app.services.mylist_service import MyListService

router = APIRouter(
    prefix="/mylist",
    tags=["My List"]
)


# -------------------------------------------------------
# Get User My List
# -------------------------------------------------------

@router.get("/")
async def get_my_list(
    current_user=Depends(get_current_user)
):
    return await MyListService.get_my_list(
        current_user["uid"]
    )


# -------------------------------------------------------
# Total Movies in My List
# -------------------------------------------------------

@router.get("/count")
async def total_movies(
    current_user=Depends(get_current_user)
):
    count = await MyListService.total_movies(
        current_user["uid"]
    )

    return {
        "count": count
    }


# -------------------------------------------------------
# Search Movies
# -------------------------------------------------------

@router.get("/search")
async def search_movies(
    q: str = Query(..., min_length=1),
    current_user=Depends(get_current_user)
):
    return await MyListService.search_movies(
        current_user["uid"],
        q
    )


# -------------------------------------------------------
# Add Movie
# -------------------------------------------------------

@router.post("/")
async def add_movie(
    movie: MyListCreate,
    current_user=Depends(get_current_user)
):
    return await MyListService.add_movie(
        current_user["uid"],
        movie
    )


# -------------------------------------------------------
# Update Movie
# -------------------------------------------------------

@router.put("/{movie_id}")
async def update_movie(
    movie_id: int,
    movie: MyListUpdate,
    current_user=Depends(get_current_user)
):
    return await MyListService.update_movie(
        current_user["uid"],
        movie_id,
        movie.model_dump(exclude_unset=True)
    )


# -------------------------------------------------------
# Remove Movie
# -------------------------------------------------------

@router.delete("/{movie_id}")
async def remove_movie(
    movie_id: int,
    current_user=Depends(get_current_user)
):
    return await MyListService.remove_movie(
        current_user["uid"],
        movie_id
    )


# -------------------------------------------------------
# Check Movie Exists
# -------------------------------------------------------

@router.get("/check/{movie_id}")
async def check_movie(
    movie_id: int,
    current_user=Depends(get_current_user)
):
    exists = await MyListService.check_movie(
        current_user["uid"],
        movie_id
    )

    return {
        "exists": exists
    }


# -------------------------------------------------------
# Clear My List
# -------------------------------------------------------

@router.delete("/")
async def clear_my_list(
    current_user=Depends(get_current_user)
):
    return await MyListService.clear_my_list(
        current_user["uid"]
    )