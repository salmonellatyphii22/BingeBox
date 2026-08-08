from fastapi import APIRouter, Depends
from datetime import datetime

from app.auth.dependencies import get_current_user
from app.database.mongodb import users_collection

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.get("/me")
async def get_profile(current_user=Depends(get_current_user)):
    """
    Returns the currently authenticated user's profile.
    Creates the user in MongoDB if it doesn't exist.
    """

    uid = current_user["uid"]

    user = await users_collection.find_one({"uid": uid})

    if not user:

        user = {
            "uid": uid,
            "email": current_user.get("email"),
            "display_name": current_user.get("name"),
            "photo_url": current_user.get("picture"),
            "email_verified": current_user.get("email_verified", False),
            "created_at": datetime.utcnow(),
            "last_login": datetime.utcnow(),
            "is_active": True,
            "preferred_language": "en",
            "country": None
        }

        await users_collection.insert_one(user)

    else:

        await users_collection.update_one(
            {"uid": uid},
            {
                "$set": {
                    "last_login": datetime.utcnow()
                }
            }
        )

        user = await users_collection.find_one({"uid": uid})

    user["_id"] = str(user["_id"])

    return user