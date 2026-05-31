from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.users import User

from app.core.security import require_admin

from app.schemas.user_schema import UserRoleUpdate, AdminUserResponse

from uuid import UUID

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

@router.get("/test")
def admin_test(
    admin: User = Depends(require_admin)
):
    return {
        "message": "Admin access granted"
    }

@router.patch("/users/{user_id}/role")
def update_user_role(
    user_id: UUID,
    role_data: UserRoleUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if role_data.role not in {"user", "admin"}:

        raise HTTPException(
            status_code=400,
            detail="Invalid role"
        )

    user.role = role_data.role

    db.commit()
    db.refresh(user)

    return {
        "user_id": user.id,
        "username": user.username,
        "role": user.role
    }

@router.get(
    "/users",
    response_model=list[AdminUserResponse]
)
def get_users(
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    return db.query(User).all()