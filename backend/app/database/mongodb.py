from app.database.connection import get_database

# Database instance
db = get_database()

# Collections
users_collection = db["users"]

watch_history_collection = db["watch_history"]

mylist_collection = db["my_list"]

ratings_collection = db["ratings"]

reviews_collection = db["reviews"]

settings_collection = db["settings"]

search_history_collection = db["search_history"]