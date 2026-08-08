import os
import httpx
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"


class TMDBService:

    # ----------------------------------------------------
    # Helper Method
    # ----------------------------------------------------
    @staticmethod
    async def fetch(endpoint: str, params: dict = None):

        if not TMDB_API_KEY:
            raise HTTPException(
                status_code=500,
                detail="TMDB API Key is missing."
            )

        if params is None:
            params = {}

        params["api_key"] = TMDB_API_KEY

        async with httpx.AsyncClient() as client:

            response = await client.get(
                f"{BASE_URL}/{endpoint}",
                params=params
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=response.json()
            )

        return response.json()

    # ====================================================
    # MOVIES
    # ====================================================

    @staticmethod
    async def trending_movies():
        return await TMDBService.fetch("trending/movie/week")

    @staticmethod
    async def popular_movies():
        return await TMDBService.fetch("movie/popular")

    @staticmethod
    async def top_rated_movies():
        return await TMDBService.fetch("movie/top_rated")

    @staticmethod
    async def upcoming_movies():
        return await TMDBService.fetch("movie/upcoming")

    @staticmethod
    async def now_playing_movies():
        return await TMDBService.fetch("movie/now_playing")

    @staticmethod
    async def movie_details(movie_id: int):
        return await TMDBService.fetch(f"movie/{movie_id}")

    @staticmethod
    async def movie_credits(movie_id: int):
        return await TMDBService.fetch(f"movie/{movie_id}/credits")

    @staticmethod
    async def movie_videos(movie_id: int):
        return await TMDBService.fetch(f"movie/{movie_id}/videos")

    @staticmethod
    async def movie_similar(movie_id: int):
        return await TMDBService.fetch(f"movie/{movie_id}/similar")

    @staticmethod
    async def movie_recommendations(movie_id: int):
        return await TMDBService.fetch(
            f"movie/{movie_id}/recommendations"
        )

    # ====================================================
    # TV SHOWS
    # ====================================================

    @staticmethod
    async def trending_tv():
        return await TMDBService.fetch("trending/tv/week")

    @staticmethod
    async def popular_tv():
        return await TMDBService.fetch("tv/popular")

    @staticmethod
    async def top_rated_tv():
        return await TMDBService.fetch("tv/top_rated")

    @staticmethod
    async def airing_today():
        return await TMDBService.fetch("tv/airing_today")

    @staticmethod
    async def on_the_air():
        return await TMDBService.fetch("tv/on_the_air")

    @staticmethod
    async def tv_details(tv_id: int):
        return await TMDBService.fetch(f"tv/{tv_id}")

    @staticmethod
    async def tv_credits(tv_id: int):
        return await TMDBService.fetch(f"tv/{tv_id}/credits")

    @staticmethod
    async def tv_videos(tv_id: int):
        return await TMDBService.fetch(f"tv/{tv_id}/videos")

    @staticmethod
    async def tv_similar(tv_id: int):
        return await TMDBService.fetch(f"tv/{tv_id}/similar")

    @staticmethod
    async def tv_recommendations(tv_id: int):
        return await TMDBService.fetch(
            f"tv/{tv_id}/recommendations"
        )

    # ====================================================
    # SEARCH
    # ====================================================

    @staticmethod
    async def search_movies(query: str):

        return await TMDBService.fetch(
            "search/movie",
            {
                "query": query
            }
        )

    @staticmethod
    async def search_tv(query: str):

        return await TMDBService.fetch(
            "search/tv",
            {
                "query": query
            }
        )

    @staticmethod
    async def multi_search(query: str):

        return await TMDBService.fetch(
            "search/multi",
            {
                "query": query
            }
        )

    # ====================================================
    # GENRES
    # ====================================================

    @staticmethod
    async def movie_genres():

        return await TMDBService.fetch(
            "genre/movie/list"
        )

    @staticmethod
    async def tv_genres():

        return await TMDBService.fetch(
            "genre/tv/list"
        )

    @staticmethod
    async def discover_movies(genre_id: int):

        return await TMDBService.fetch(
            "discover/movie",
            {
                "with_genres": genre_id
            }
        )

    @staticmethod
    async def discover_tv(genre_id: int):

        return await TMDBService.fetch(
            "discover/tv",
            {
                "with_genres": genre_id
            }
        )