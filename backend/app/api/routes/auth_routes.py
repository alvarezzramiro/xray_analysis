from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.user_schema import (
    UserCreate,
    UserResponse
)

from app.services.user_service import (
    create_user,
    get_user_by_email,
    get_user_by_username
)

from app.services.user_service import authenticate_user

from app.core.security import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/register", response_model=UserResponse)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):

    existing_email = get_user_by_email(db, user_data.email)

    if existing_email:
        
        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )
    
    existing_username = get_user_by_username(db, user_data.username)

    if existing_username:
        
        raise HTTPException(
            status_code=409,
            detail="Username already taken"
        )
    
    user = create_user(
        db=db,
        email=user_data.email,
        username=user_data.username,
        password=user_data.password,
        full_name=user_data.full_name
    )

    return user

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(
        db,
        form_data.username,
        form_data.password
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    
    access_token = create_access_token(
        data={
            "sub":user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }