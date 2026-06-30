from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Stateless Flashcard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Flashcard(BaseModel):
    id: int = None
    question: str
    answer: str
    

flashcards_db: List[Flashcard] = [
    Flashcard(id=1, question="What does a 404 HTTP status code mean?", answer="Not Found"),
]

@app.get("/api/cards", response_model=List[Flashcard])
def get_all_cards():
    return flashcards_db

@app.post("/api/cards", response_model=Flashcard, status_code=201)
def create_card(card: Flashcard):
    if not card.question.strip() or not card.answer.strip():
        raise HTTPException(status_code=400, detail="Fields cannot be empty")
    
    card.id = len(flashcards_db) + 1
    flashcards_db.append(card)
    return card