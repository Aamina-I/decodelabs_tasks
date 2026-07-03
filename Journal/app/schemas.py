
from pydantic import BaseModel
from datetime import date

class UserCreate(BaseModel):
    username: str
    email: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    class Config:
        from_attributes = True

class EntryCreate(BaseModel):
    date: date
    mood: str
    text: str | None = None

class EntryUpdate(BaseModel):
    mood: str | None = None
    text: str | None = None

class EntryOut(BaseModel):
    id: int
    user_id: int
    date: date
    mood: str
    text: str | None
    class Config:
        from_attributes = True