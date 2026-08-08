from fastapi import APIRouter

from app.services.tmdb_service import TMDBService

router = APIRouter(
    prefix="/tvshows",
    tags=["TV Shows"]
)


# -------------------------------------------------------
# Trending TV Shows
# -------------------------------------------------------
@router.get("/trending")
async def trending_tv():
    return await TMDBService.trending_tv()


# -------------------------------------------------------
# Popular TV Shows
# -------------------------------------------------------
@router.get("/popular")
async def popular_tv():
    return await TMDBService.popular_tv()


# -------------------------------------------------------
# Top Rated TV Shows
# -------------------------------------------------------
@router.get("/top-rated")
async def top_rated_tv():
    return await TMDBService.top_rated_tv()


# -------------------------------------------------------
# Airing Today
# -------------------------------------------------------
@router.get("/airing-today")
async def airing_today():
    return await TMDBService.airing_today()


# -------------------------------------------------------
# On The Air
# -------------------------------------------------------
@router.get("/on-the-air")
async def on_the_air():
    return await TMDBService.on_the_air()


# -------------------------------------------------------
# TV Show Details
# -------------------------------------------------------
@router.get("/{tv_id}")
async def tv_details(tv_id: int):
    return await TMDBService.tv_details(tv_id)


# -------------------------------------------------------
# TV Credits
# -------------------------------------------------------
@router.get("/{tv_id}/credits")
async def tv_credits(tv_id: int):
    return await TMDBService.tv_credits(tv_id)


# -------------------------------------------------------
# TV Videos
# -------------------------------------------------------
@router.get("/{tv_id}/videos")
async def tv_videos(tv_id: int):
    return await TMDBService.tv_videos(tv_id)


# -------------------------------------------------------
# Season Details
# -------------------------------------------------------
@router.get("/{tv_id}/season/{season_number}")
async def season_details(
    tv_id: int,
    season_number: int
):
    return await TMDBService.fetch(
        f"tv/{tv_id}/season/{season_number}"
    )


# -------------------------------------------------------
# Episode Details
# -------------------------------------------------------
@router.get("/{tv_id}/season/{season_number}/episode/{episode_number}")
async def episode_details(
    tv_id: int,
    season_number: int,
    episode_number: int
):
    return await TMDBService.fetch(
        f"tv/{tv_id}/season/{season_number}/episode/{episode_number}"
    )


# -------------------------------------------------------
# Similar TV Shows
# -------------------------------------------------------
@router.get("/{tv_id}/similar")
async def similar_tv(tv_id: int):
    return await TMDBService.tv_similar(tv_id)


# -------------------------------------------------------
# Recommendations
# -------------------------------------------------------
@router.get("/{tv_id}/recommendations")
async def recommendations(tv_id: int):
    return await TMDBService.tv_recommendations(tv_id)


# -------------------------------------------------------
# Search TV Shows
# -------------------------------------------------------
@router.get("/search/{query}")
async def search_tv(query: str):
    return await TMDBService.search_tv(query)


# -------------------------------------------------------
# TV Genres
# -------------------------------------------------------
@router.get("/genres")
async def tv_genres():
    return await TMDBService.tv_genres()


# -------------------------------------------------------
# Discover TV Shows by Genre
# -------------------------------------------------------
@router.get("/genre/{genre_id}")
async def discover_tv(genre_id: int):
    return await TMDBService.discover_tv(genre_id)