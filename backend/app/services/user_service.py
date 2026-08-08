from datetime import datetime
from fastapi import HTTPException

from app.database.mongodb import (
    users_collection,
    mylist_collection,
    watch_history_collection,
    reviews_collection,
    ratings_collection,
)


class UserService:

    # -------------------------------------------------------
    # Get Current User Profile
    # -------------------------------------------------------
    @staticmethod
    async def get_profile(uid: str):

        user = await users_collection.find_one({"uid": uid})

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found."
            )

        user["_id"] = str(user["_id"])

        return user

    # -------------------------------------------------------
    # Update User Profile
    # -------------------------------------------------------
    @staticmethod
    async def update_profile(uid: str, data):

        update_data = data.model_dump(exclude_unset=True)

        if not update_data:
            raise HTTPException(
                status_code=400,
                detail="No fields provided for update."
            )

        update_data["updated_at"] = datetime.utcnow()

        await users_collection.update_one(
            {"uid": uid},
            {
                "$set": update_data
            }
        )

        user = await users_collection.find_one({"uid": uid})

        if user:
            user["_id"] = str(user["_id"])

        return user

    # -------------------------------------------------------
    # Update Profile Picture
    # -------------------------------------------------------
    @staticmethod
    async def update_profile_picture(
        uid: str,
        photo_url: str
    ):

        await users_collection.update_one(
            {"uid": uid},
            {
                "$set": {
                    "photo_url": photo_url,
                    "updated_at": datetime.utcnow()
                }
            }
        )

        return {
            "message": "Profile picture updated successfully."
        }

    # -------------------------------------------------------
    # Dashboard Statistics
    # -------------------------------------------------------
    @staticmethod
    async def dashboard(uid: str):

        return {
            "my_list": await mylist_collection.count_documents(
                {"uid": uid}
            ),
            "watch_history": await watch_history_collection.count_documents(
                {"uid": uid}
            ),
            "reviews": await reviews_collection.count_documents(
                {"uid": uid}
            ),
            "ratings": await ratings_collection.count_documents(
                {"uid": uid}
            ),
        }

    # -------------------------------------------------------
    # Delete User Account Data
    # -------------------------------------------------------
    @staticmethod
    async def delete_account(uid: str):

        await users_collection.delete_one({"uid": uid})

        await mylist_collection.delete_many({"uid": uid})

        await watch_history_collection.delete_many({"uid": uid})

        await reviews_collection.delete_many({"uid": uid})

        await ratings_collection.delete_many({"uid": uid})

        return {
            "message": "User data deleted successfully."
        }

    # -------------------------------------------------------
    # Check User Exists
    # -------------------------------------------------------
    @staticmethod
    async def user_exists(uid: str):

        user = await users_collection.find_one(
            {"uid": uid}
        )

        return user is not None

    # -------------------------------------------------------
    # Create User
    # -------------------------------------------------------
    @staticmethod
    async def create_user(user_data: dict):

        existing = await users_collection.find_one(
            {"uid": user_data["uid"]}
        )

        if existing:
            return existing

        user_data["created_at"] = datetime.utcnow()
        user_data["updated_at"] = datetime.utcnow()
        user_data["last_login"] = datetime.utcnow()

        result = await users_collection.insert_one(user_data)

        user_data["_id"] = str(result.inserted_id)

        return user_data

    # -------------------------------------------------------
    # Update Last Login
    # -------------------------------------------------------
    @staticmethod
    async def update_last_login(uid: str):

        await users_collection.update_one(
            {"uid": uid},
            {
                "$set": {
                    "last_login": datetime.utcnow()
                }
            }
        )

    # -------------------------------------------------------
    # Get User Counts
    # -------------------------------------------------------
    @staticmethod
    async def get_counts(uid: str):

        return {
            "history": await watch_history_collection.count_documents(
                {"uid": uid}
            ),
            "mylist": await mylist_collection.count_documents(
                {"uid": uid}
            ),
            "reviews": await reviews_collection.count_documents(
                {"uid": uid}
            ),
            "ratings": await ratings_collection.count_documents(
                {"uid": uid}
            )
        }