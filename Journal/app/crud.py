from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from . import models, schemas

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, email=user.email)
    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        return None   

def get_users(db: Session):
    return db.query(models.User).all()

def create_entry(db: Session, user_id: int, entry: schemas.EntryCreate):
    db_entry = models.Entry(user_id=user_id, **entry.model_dump())
    db.add(db_entry)
    try:
        db.commit()
        db.refresh(db_entry)
        return db_entry
    except IntegrityError:
        db.rollback()
        return None    

def get_entries(db: Session, user_id: int):
    return db.query(models.Entry).filter(models.Entry.user_id == user_id).all()

def get_entry(db: Session, entry_id: int):
    return db.query(models.Entry).filter(models.Entry.id == entry_id).first()

def update_entry(db: Session, entry_id: int, updates: schemas.EntryUpdate):
    db_entry = get_entry(db, entry_id)
    if not db_entry:
        return None
    for key, value in updates.model_dump(exclude_unset=True).items():
        setattr(db_entry, key, value)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def delete_entry(db: Session, entry_id: int):
    db_entry = get_entry(db, entry_id)
    if not db_entry:
        return None
    db.delete(db_entry)
    db.commit()
    return db_entry