import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException, status
from pathlib import Path

# Path to Firebase Admin SDK JSON
BASE_DIR = Path(__file__).resolve().parent.parent.parent
SERVICE_ACCOUNT_KEY = BASE_DIR / "firebase_admin_sdk.json"

# Initialize Firebase Admin SDK only once
if not firebase_admin._apps:
    cred = credentials.Certificate(str(SERVICE_ACCOUNT_KEY))
    firebase_admin.initialize_app(cred)


def verify_firebase_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)

        print("\n========== TOKEN VERIFIED ==========")
        print(decoded_token)
        print("===================================\n")

        return decoded_token

    except Exception as e:
        print("\n========== FIREBASE ERROR ==========")
        print(type(e))
        print(e)
        print("====================================\n")

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )