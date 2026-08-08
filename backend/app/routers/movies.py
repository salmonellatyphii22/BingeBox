from fastapi import APIRouter

from app.services.tmdb_service import TMDBService

router = APIRouter(
    prefix="/movies",
    tags=["Movies"]
)


# -------------------------------------------------------
# Trending Movies
# -------------------------------------------------------
@router.get("/trending")
async def trending_movies():
    return await TMDBService.trending_movies()


# -------------------------------------------------------
# Top Rated Movies
# -------------------------------------------------------
@router.get("/top-rated")
async def top_rated_movies():
    return await TMDBService.top_rated_movies()


# -------------------------------------------------------
# Popular Movies
# -------------------------------------------------------
@router.get("/popular")
async def popular_movies():
    return await TMDBService.popular_movies()


# -------------------------------------------------------
# Upcoming Movies
# -------------------------------------------------------
@router.get("/upcoming")
async def upcoming_movies():
    return await TMDBService.upcoming_movies()


# -------------------------------------------------------
# Now Playing
# -------------------------------------------------------
@router.get("/now-playing")
async def now_playing_movies():
    return await TMDBService.now_playing_movies()


# -------------------------------------------------------
# Movie Details
# -------------------------------------------------------
@router.get("/{movie_id}")
async def movie_details(movie_id: int):
    return await TMDBService.movie_details(movie_id)


# -------------------------------------------------------
# Movie Credits
# -------------------------------------------------------
@router.get("/{movie_id}/credits")
async def movie_credits(movie_id: int):
    return await TMDBService.movie_credits(movie_id)


# -------------------------------------------------------
# Movie Videos
# -------------------------------------------------------
@router.get("/{movie_id}/videos")
async def movie_videos(movie_id: int):
    return await TMDBService.movie_videos(movie_id)


# -------------------------------------------------------
# Similar Movies
# -------------------------------------------------------
@router.get("/{movie_id}/similar")
async def similar_movies(movie_id: int):
    return await TMDBService.movie_similar(movie_id)


# -------------------------------------------------------
# Recommendations
# -------------------------------------------------------
@router.get("/{movie_id}/recommendations")
async def recommendations(movie_id: int):
    return await TMDBService.movie_recommendations(movie_id)


# -------------------------------------------------------
# Search Movies
# -------------------------------------------------------
@router.get("/search/{query}")
async def search_movies(query: str):
    return await TMDBService.search_movies(query)


# -------------------------------------------------------
# Movie Genres
# -------------------------------------------------------
@router.get("/genres")
async def movie_genres():
    return await TMDBService.movie_genres()


# -------------------------------------------------------
# Discover Movies by Genre
# -------------------------------------------------------
@router.get("/genre/{genre_id}")
async def discover_movies(genre_id: int):
    return await TMDBService.discover_movies(genre_id)