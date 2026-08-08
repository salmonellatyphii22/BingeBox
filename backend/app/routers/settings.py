from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user
from app.schemas.settings import SettingsUpdate
from app.services.settings_service import SettingsService

router = APIRouter(
    prefix="/settings",
    tags=["Settings"]
)


@router.get("/")
async def get_settings(current_user=Depends(get_current_user)):
    return await SettingsService.get_settings(
        current_user["uid"]
    )


@router.put("/")
async def update_settings(
    settings: SettingsUpdate,
    current_user=Depends(get_current_user)
):
    return await SettingsService.update_settings(
        current_user["uid"],
        settings
    )


@router.post("/reset")
async def reset_settings(current_user=Depends(get_current_user)):
    return await SettingsService.reset_settings(
        current_user["uid"]
    )


@router.put("/theme/{theme}")
async def update_theme(
    theme: str,
    current_user=Depends(get_current_user)
):
    return await SettingsService.update_theme(
        current_user["uid"],
        theme
    )


@router.put("/language/{language}")
async def update_language(
    language: str,
    current_user=Depends(get_current_user)
):
    return await SettingsService.update_language(
        current_user["uid"],
        language
    )


@router.put("/video-quality/{quality}")
async def update_video_quality(
    quality: str,
    current_user=Depends(get_current_user)
):
    return await SettingsService.update_video_quality(
        current_user["uid"],
        quality
    )