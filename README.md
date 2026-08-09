# 🎬 BingeBox

A modern **Netflix-inspired streaming platform** built with **React, Firebase, FastAPI, and MongoDB**. BingeBox lets users discover movies and TV shows, search content, create personalized watchlists, rate titles, and manage their viewing history through a clean and responsive interface.

> **Note:** This project is built for educational and portfolio purposes and is not affiliated with Netflix.

---

## ✨ Features

### 🎥 Browse Content
- Trending Movies
- Popular TV Shows
- Multiple Categories
- Dynamic Banner
- Responsive Movie Rows

### 🔍 Search
- Search Movies & TV Shows
- Instant Search Suggestions
- Search History

### 👤 Authentication
- Firebase Authentication
- User Signup & Login
- Secure User Sessions
- Protected Routes

### ❤️ Personalization
- My List (Watchlist)
- Watch History
- Movie Ratings
- User Reviews
- Profile Management

### 🎨 User Interface
- Netflix-inspired Design
- Responsive Layout
- Smooth Animations
- Sidebar Navigation
- Dark Theme

---

# 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS3
- Firebase Authentication

### Backend
- FastAPI
- Python
- Pydantic
- Uvicorn

### Database
- MongoDB

### APIs
- TMDB API

---

# 📂 Project Structure

```
bingebox/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── firebase/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   └── main.py
│   └── requirements.txt
│
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/salmonellatyphii22/bingebox.git

cd bingebox
```

---

## 2. Frontend Setup

```bash
cd frontend

npm install

npm start
```

The frontend will run at:

```
http://localhost:3000
```

---

## 3. Backend Setup

Create a virtual environment

```bash
cd backend

python -m venv venv
```

### Activate Environment

**Windows**

```bash
venv\Scripts\activate
```

**macOS/Linux**

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Backend

```bash
uvicorn app.main:app --reload
```

The backend will run at:

```
http://127.0.0.1:8000
```

---

# 🔑 Environment Variables

## Frontend (.env)

```env
REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY

REACT_APP_FIREBASE_API_KEY=

REACT_APP_FIREBASE_AUTH_DOMAIN=

REACT_APP_FIREBASE_PROJECT_ID=

REACT_APP_FIREBASE_STORAGE_BUCKET=

REACT_APP_FIREBASE_MESSAGING_SENDER_ID=

REACT_APP_FIREBASE_APP_ID=
```

## Backend (.env)

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

SECRET_KEY=YOUR_SECRET_KEY

ALGORITHM=HS256
```

---

# 📸 Screenshots

Add screenshots of:

- Home Page
- Search Page
- Movies
- TV Shows
- My List
- Watch History
- User Profile

---

# 🚀 Future Enhancements

- Continue Watching
- AI-based Movie Recommendations
- Video Streaming
- User Avatars
- Multiple User Profiles
- Notifications
- Dark/Light Theme
- Multi-language Support
- Trending Analytics
- Admin Dashboard

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is developed for educational and portfolio purposes.

Movie and TV show metadata is provided by **The Movie Database (TMDB) API**.

Netflix is a registered trademark of Netflix, Inc. This project is not affiliated with or endorsed by Netflix.

---

# 👩‍💻 Author

**Sweta Jha**

GitHub: https://github.com/salmonellatyphii22

---

## ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub!

---

<p align="center">
Made with ❤️ using React, FastAPI, Firebase & MongoDB
</p>
