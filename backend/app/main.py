from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.history import router as history_router
from app.routers.auth import router as auth_router
from app.routers.movies import router as movies_router
from app.routers.mylist import router as mylist_router
from app.routers.tvshows import router as tvshows_router
from app.routers.users import router as users_router
from app.routers.review import router as review_router
from app.routers.settings import router as settings_router

app = FastAPI(
    title="Netflix Clone API",
    version="1.0.0"
)

# ---------------------------------------------
# CORS Configuration
# ---------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------
# Include Routers
# ---------------------------------------------
app.include_router(auth_router)
app.include_router(history_router)
app.include_router(movies_router)
app.include_router(mylist_router)
app.include_router(tvshows_router)
app.include_router(users_router)
app.include_router(review_router)
app.include_router(settings_router)

# ---------------------------------------------
# Root Endpoint
# ---------------------------------------------
@app.get("/")
async def root():
    return {
        "message": "Netflix Clone Backend Running 🚀"
    }