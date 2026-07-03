from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)  

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#Users
@app.post("/users", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    result = crud.create_user(db, user)
    if not result:
        raise HTTPException(status_code=409, detail="Username or email already exists")
    return result

@app.get("/users", response_model=list[schemas.UserOut])
def list_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

#Entries
@app.post("/users/{user_id}/entries", response_model=schemas.EntryOut)
def create_entry(user_id: int, entry: schemas.EntryCreate, db: Session = Depends(get_db)):
    result = crud.create_entry(db, user_id, entry)
    if not result:
        raise HTTPException(status_code=409, detail="Entry for this date already exists")
    return result

@app.get("/users/{user_id}/entries", response_model=list[schemas.EntryOut])
def list_entries(user_id: int, db: Session = Depends(get_db)):
    return crud.get_entries(db, user_id)

@app.put("/entries/{entry_id}", response_model=schemas.EntryOut)
def update_entry(entry_id: int, updates: schemas.EntryUpdate, db: Session = Depends(get_db)):
    result = crud.update_entry(db, entry_id, updates)
    if not result:
        raise HTTPException(status_code=404, detail="Entry not found")
    return result

@app.delete("/entries/{entry_id}")
def delete_entry(entry_id: int, db: Session = Depends(get_db)):
    result = crud.delete_entry(db, entry_id)
    if not result:
        raise HTTPException(status_code=404, detail="Entry not found")
    return {"message": "Entry deleted"}