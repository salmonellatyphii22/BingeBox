from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException

from app.database.mongodb import reviews_collection


class ReviewService:

    # -------------------------------------------------------
    # Get All Reviews of Current User
    # -------------------------------------------------------
    @staticmethod
    async def get_reviews(uid: str):

        reviews = []

        async for review in reviews_collection.find(
            {"uid": uid}
        ).sort("created_at", -1):

            review["_id"] = str(review["_id"])
            reviews.append(review)

        return reviews


    # -------------------------------------------------------
    # Get Review by ID
    # -------------------------------------------------------
    @staticmethod
    async def get_review(uid: str, review_id: str):

        review = await reviews_collection.find_one({
            "_id": ObjectId(review_id),
            "uid": uid
        })

        if not review:
            raise HTTPException(
                status_code=404,
                detail="Review not found."
            )

        review["_id"] = str(review["_id"])

        return review


    # -------------------------------------------------------
    # Create Review
    # -------------------------------------------------------
    @staticmethod
    async def create_review(uid: str, review):

        existing = await reviews_collection.find_one({
            "uid": uid,
            "movie_id": review.movie_id
        })

        if existing:
            raise HTTPException(
                status_code=409,
                detail="You have already reviewed this movie."
            )

        data = {
            "uid": uid,

            "movie_id": review.movie_id,
            "movie_title": review.movie_title,
            "poster_path": review.poster_path,

            "review_title": review.review_title,
            "review": review.review,

            "rating": review.rating,
            "spoiler": review.spoiler,
            "media_type": review.media_type,

            "created_at": datetime.utcnow(),
            "updated_at": None
        }

        result = await reviews_collection.insert_one(data)

        data["_id"] = str(result.inserted_id)

        return data


    # -------------------------------------------------------
    # Update Review
    # -------------------------------------------------------
    @staticmethod
    async def update_review(
        uid: str,
        review_id: str,
        review
    ):

        existing = await reviews_collection.find_one({
            "_id": ObjectId(review_id),
            "uid": uid
        })

        if not existing:
            raise HTTPException(
                status_code=404,
                detail="Review not found."
            )

        update_data = review.model_dump(exclude_unset=True)

        update_data["updated_at"] = datetime.utcnow()

        await reviews_collection.update_one(
            {
                "_id": ObjectId(review_id)
            },
            {
                "$set": update_data
            }
        )

        updated = await reviews_collection.find_one({
            "_id": ObjectId(review_id)
        })

        updated["_id"] = str(updated["_id"])

        return updated


    # -------------------------------------------------------
    # Delete Review
    # -------------------------------------------------------
    @staticmethod
    async def delete_review(uid: str, review_id: str):

        result = await reviews_collection.delete_one({
            "_id": ObjectId(review_id),
            "uid": uid
        })

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Review not found."
            )

        return {
            "message": "Review deleted successfully."
        }


    # -------------------------------------------------------
    # Total Reviews
    # -------------------------------------------------------
    @staticmethod
    async def total_reviews(uid: str):

        return await reviews_collection.count_documents({
            "uid": uid
        })


    # -------------------------------------------------------
    # Average Rating Given By User
    # -------------------------------------------------------
    @staticmethod
    async def average_rating(uid: str):

        pipeline = [
            {
                "$match": {
                    "uid": uid
                }
            },
            {
                "$group": {
                    "_id": None,
                    "average": {
                        "$avg": "$rating"
                    }
                }
            }
        ]

        result = await reviews_collection.aggregate(pipeline).to_list(1)

        if not result:
            return 0

        return round(result[0]["average"], 2)