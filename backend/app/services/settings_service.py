from datetime import datetime
from fastapi import HTTPException

from app.database.mongodb import settings_collection


class SettingsService:

    # -------------------------------------------------------
    # Get User Settings
    # -------------------------------------------------------
    @staticmethod
    async def get_settings(uid: str):

        settings = await settings_collection.find_one({
            "uid": uid
        })

        if not settings:

            settings = {
                "uid": uid,
                "theme": "dark",
                "language": "English",
                "autoplay": True,
                "notifications": True,
                "video_quality": "Auto",
                "subtitles": False,
                "mature_content": True,
                "profile_visibility": "Private",
                "country": "India",
                "created_at": datetime.utcnow()
            }

            await settings_collection.insert_one(settings)

            settings = await settings_collection.find_one({
                "uid": uid
            })

        settings["_id"] = str(settings["_id"])

        return settings


    # -------------------------------------------------------
    # Update Settings
    # -------------------------------------------------------
    @staticmethod
    async def update_settings(uid: str, settings):

        update_data = settings.model_dump(exclude_unset=True)

        if not update_data:
            raise HTTPException(
                status_code=400,
                detail="No settings provided."
            )

        update_data["updated_at"] = datetime.utcnow()

        await settings_collection.update_one(
            {"uid": uid},
            {
                "$set": update_data
            },
            upsert=True
        )

        updated = await settings_collection.find_one({
            "uid": uid
        })

        updated["_id"] = str(updated["_id"])

        return updated


    # -------------------------------------------------------
    # Reset Settings
    # -------------------------------------------------------
    @staticmethod
    async def reset_settings(uid: str):

        default_settings = {
            "uid": uid,
            "theme": "dark",
            "language": "English",
            "autoplay": True,
            "notifications": True,
            "video_quality": "Auto",
            "subtitles": False,
            "mature_content": True,
            "profile_visibility": "Private",
            "country": "India",
            "updated_at": datetime.utcnow()
        }

        await settings_collection.update_one(
            {"uid": uid},
            {
                "$set": default_settings
            },
            upsert=True
        )

        settings = await settings_collection.find_one({
            "uid": uid
        })

        settings["_id"] = str(settings["_id"])

        return settings


    # -------------------------------------------------------
    # Update Theme
    # -------------------------------------------------------
    @staticmethod
    async def update_theme(uid: str, theme: str):

        if theme.lower() not in ["dark", "light"]:
            raise HTTPException(
                status_code=400,
                detail="Theme must be 'dark' or 'light'."
            )

        await settings_collection.update_one(
            {"uid": uid},
            {
                "$set": {
                    "theme": theme.lower(),
                    "updated_at": datetime.utcnow()
                }
            }
        )

        return {
            "message": "Theme updated successfully."
        }


    # -------------------------------------------------------
    # Update Language
    # -------------------------------------------------------
    @staticmethod
    async def update_language(uid: str, language: str):

        await settings_collection.update_one(
            {"uid": uid},
            {
                "$set": {
                    "language": language,
                    "updated_at": datetime.utcnow()
                }
            }
        )

        return {
            "message": "Language updated successfully."
        }


    # -------------------------------------------------------
    # Update Video Quality
    # -------------------------------------------------------
    @staticmethod
    async def update_video_quality(uid: str, quality: str):

        allowed = ["Auto", "480p", "720p", "1080p", "4K"]

        if quality not in allowed:
            raise HTTPException(
                status_code=400,
                detail="Invalid video quality."
            )

        await settings_collection.update_one(
            {"uid": uid},
            {
                "$set": {
                    "video_quality": quality,
                    "updated_at": datetime.utcnow()
                }
            }
        )

        return {
            "message": "Video quality updated successfully."
        }
