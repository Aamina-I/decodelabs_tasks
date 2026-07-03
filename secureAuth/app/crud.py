from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from . import models, auth

def create_user(db: Session, username: str, password: str):
    hashed = auth.hash_password(password)
    db_user = models.User(username=username, hashed_password=hashed)
    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        return None   

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()