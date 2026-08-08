from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user
from app.schemas.user import UserUpdate
from app.services.user_service import UserService

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
async def get_profile(current_user=Depends(get_current_user)):
    return await UserService.get_profile(
        current_user["uid"]
    )


@router.put("/me")
async def update_profile(
    data: UserUpdate,
    current_user=Depends(get_current_user)
):
    return await UserService.update_profile(
        current_user["uid"],
        data
    )


@router.get("/dashboard")
async def dashboard(current_user=Depends(get_current_user)):
    return await UserService.dashboard(
        current_user["uid"]
    )


@router.delete("/me")
async def delete_account(current_user=Depends(get_current_user)):
    return await UserService.delete_account(
        current_user["uid"]
    )