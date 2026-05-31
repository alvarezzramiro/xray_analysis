from sqlalchemy.orm import Session

from backend.app.models.users import User

from app.services.auth_service import (hash_password, verify_password)

def create_user(
    db: Session,
    email: str,
    username: str,
    password: str,
    full_name: str | None = None
):
    print(password)
    print(type(password))

    hashed_password = hash_password(password)

    user = User(
        email=email,
        username=username,
        hashed_password=hashed_password,
        full_name=full_name
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def get_user_by_email(db: Session, email: str):
    
    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

def get_user_by_username(db: Session, username: str):

    return (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

def authenticate_user(
    db: Session,
    email: str,
    password: str
):
    user = get_user_by_email(db, email)

    if not user:
        return None
    
    if not verify_password(password, user.hashed_password):
        return None
    
    return user