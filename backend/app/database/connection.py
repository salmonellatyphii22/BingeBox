import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

# Create MongoDB client
client = AsyncIOMotorClient(MONGODB_URL)

# Get database
database = client[DATABASE_NAME]


def get_database():
    """
    Returns the MongoDB database instance.
    """
    return database