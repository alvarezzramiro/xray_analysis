from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.core.security import (
    get_current_user,
    require_admin
)

from app.models.users import User

from app.schemas.dashboard_schema import (
    UserDashboardResponse,
    AdminDashboardResponse
)

from app.services.dashboard_service import (
    get_user_dashboard,
    get_admin_dashboard
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get(
    "/",
    response_model=UserDashboardResponse
)
def user_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return get_user_dashboard(
        db,
        current_user.id
    )

@router.get(
    "/admin",
    response_model=AdminDashboardResponse
)
def admin_dashboard(
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):

    return get_admin_dashboard(db)