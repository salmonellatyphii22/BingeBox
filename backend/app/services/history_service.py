from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException

from app.database.mongodb import watch_history_collection


class HistoryService:

    @staticmethod
    async def get_history(uid: str):
        history = []

        async for movie in watch_history_collection.find(
            {"uid": uid}
        ).sort("watched_at", -1):

            movie["_id"] = str(movie["_id"])
            history.append(movie)

        return history

    @staticmethod
    async def add_history(uid: str, movie):

        existing = await watch_history_collection.find_one({
            "uid": uid,
            "movie_id": movie.movie_id
        })

        if existing:

            await watch_history_collection.update_one(
                {"_id": existing["_id"]},
                {
                    "$set": {
                        "watched_at": datetime.utcnow()
                    }
                }
            )

            return {
                "message": "History updated successfully."
            }

        history = {
            "uid": uid,

            "movie_id": movie.movie_id,
            "title": movie.title,
            "poster_path": movie.poster_path,
            "backdrop_path": movie.backdrop_path,
            "overview": movie.overview,
            "release_date": movie.release_date,
            "media_type": movie.media_type,
            "runtime": movie.runtime,
            "genres": movie.genres,

            "progress": 100,
            "watched_at": datetime.utcnow()
        }

        result = await watch_history_collection.insert_one(history)

        history["_id"] = str(result.inserted_id)

        return history

    @staticmethod
    async def delete_history(uid: str, history_id: str):

        result = await watch_history_collection.delete_one({
            "_id": ObjectId(history_id),
            "uid": uid
        })

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="History not found."
            )

        return {
            "message": "Removed from history."
        }

    @staticmethod
    async def clear_history(uid: str):

        result = await watch_history_collection.delete_many({
            "uid": uid
        })

        return {
            "message": f"{result.deleted_count} items removed from watch history."
        }

    @staticmethod
    async def is_in_history(uid: str, movie_id: int):

        movie = await watch_history_collection.find_one({
            "uid": uid,
            "movie_id": movie_id
        })

        return movie is not None

    @staticmethod
    async def update_progress(
        uid: str,
        movie_id: int,
        progress: int
    ):

        await watch_history_collection.update_one(
            {
                "uid": uid,
                "movie_id": movie_id
            },
            {
                "$set": {
                    "progress": progress,
                    "watched_at": datetime.utcnow()
                }
            }
        )

        return {
            "message": "Watch progress updated."
        }