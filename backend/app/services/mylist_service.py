from datetime import datetime
from fastapi import HTTPException

from app.database.mongodb import mylist_collection


class MyListService:

    # -------------------------------------------------------
    # Get User My List
    # -------------------------------------------------------
    @staticmethod
    async def get_my_list(uid: str):

        movies = []

        async for movie in mylist_collection.find(
            {"uid": uid}
        ).sort("added_at", -1):

            movie["_id"] = str(movie["_id"])
            movies.append(movie)

        return movies

    # -------------------------------------------------------
    # Add Movie to My List
    # -------------------------------------------------------
    @staticmethod
    async def add_movie(uid: str, movie):

        existing = await mylist_collection.find_one({
            "uid": uid,
            "movie_id": movie.movie_id
        })

        if existing:
            raise HTTPException(
                status_code=409,
                detail="Movie already exists in My List."
            )

        data = {
            "uid": uid,

            "movie_id": movie.movie_id,
            "title": movie.title,
            "poster_path": movie.poster_path,
            "backdrop_path": movie.backdrop_path,
            "overview": movie.overview,
            "release_date": movie.release_date,
            "vote_average": movie.vote_average,
            "media_type": movie.media_type,
            "runtime": movie.runtime,
            "genres": movie.genres,

            "added_at": datetime.utcnow()
        }

        result = await mylist_collection.insert_one(data)

        data["_id"] = str(result.inserted_id)

        return data

    # -------------------------------------------------------
    # Remove Movie
    # -------------------------------------------------------
    @staticmethod
    async def remove_movie(uid: str, movie_id: int):

        result = await mylist_collection.delete_one({
            "uid": uid,
            "movie_id": movie_id
        })

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Movie not found in My List."
            )

        return {
            "message": "Movie removed successfully."
        }

    # -------------------------------------------------------
    # Check Movie Exists
    # -------------------------------------------------------
    @staticmethod
    async def check_movie(uid: str, movie_id: int):

        movie = await mylist_collection.find_one({
            "uid": uid,
            "movie_id": movie_id
        })

        return movie is not None

    # -------------------------------------------------------
    # Clear My List
    # -------------------------------------------------------
    @staticmethod
    async def clear_my_list(uid: str):

        result = await mylist_collection.delete_many({
            "uid": uid
        })

        return {
            "message": f"{result.deleted_count} movies removed from My List."
        }

    # -------------------------------------------------------
    # Get Movie Count
    # -------------------------------------------------------
    @staticmethod
    async def total_movies(uid: str):

        return await mylist_collection.count_documents({
            "uid": uid
        })
        
        # -------------------------------------------------------
    # Search Movies in My List
    # -------------------------------------------------------
    @staticmethod
    async def search_movies(uid: str, query: str):

        movies = []

        cursor = mylist_collection.find({
            "uid": uid,
            "title": {
                "$regex": query,
                "$options": "i"
            }
        })

        async for movie in cursor:
            movie["_id"] = str(movie["_id"])
            movies.append(movie)

        return movies

    # -------------------------------------------------------
    # Update Movie
    # -------------------------------------------------------
    @staticmethod
    async def update_movie(
        uid: str,
        movie_id: int,
        data: dict
    ):

        result = await mylist_collection.update_one(
            {
                "uid": uid,
                "movie_id": movie_id
            },
            {
                "$set": data
            }
        )

        if result.matched_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Movie not found."
            )

        movie = await mylist_collection.find_one({
            "uid": uid,
            "movie_id": movie_id
        })

        movie["_id"] = str(movie["_id"])

        return movie