A collection of backend mini-projects built with Python, FastAPI, and SQL, covering REST API fundamentals, database persistence, and authentication.

Project 1: REST API Fundamentals: Flashcard App
Folder: flashcardApp

A simple flashcards web app to learn REST API basics.
- Backend: Python + FastAPI, serves flashcard data
- Frontend: React + Vite, view/flip/create flashcards
- Endpoints:GET /api/cards` (fetch cards), `POST /api/cards` (add card)
- Data exchanged as structured JSON

Project 2: Journal/Mood Tracker 
Folder: Journal

A backend API for logging daily journal entries with a mood, one entry per user per day.
- Stack: FastAPI + SQLAlchemy (ORM) + SQLite
- Schema: `User` (id, username, email) → `Entry` (id, user_id, date, mood, text)
- CRUD: create/list users, create/read/update/delete entries
- Duplicate prevention: unique constraint on `(user_id, date)` and on username/email; violations return `409 Conflict`
- Data persists across server restarts


Project 3: Secure Authentication System
Folder:secureAuth

A minimal authentication API demonstrating password hashing and JWT-based route protection.
- Stack: FastAPI + SQLAlchemy + SQLite + Passlib (bcrypt) + python-jose (JWT)
