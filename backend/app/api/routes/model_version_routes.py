from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.core.security import require_admin

from app.models.users import User

from app.schemas.model_version_schema import (
    ModelVersionCreate,
    ModelVersionResponse
)

from app.services.model_version_service import (
    create_model_version,
    get_model_versions,
    get_active_model,
    activate_model_version
)

router = APIRouter(
    prefix="/models",
    tags=["Model Versions"]
)

@router.post(
    "/",
    response_model=ModelVersionResponse
)
def create_model_version_endpoint(
    data: ModelVersionCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):

    try:

        return create_model_version(
            db=db,
            version=data.version,
            model_path=data.model_path,
            dataset_size=data.dataset_size,
            precision=data.precision,
            recall=data.recall,
            map50=data.map50,
            map50_95=data.map50_95
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    
@router.get(
    "/",
    response_model=list[ModelVersionResponse]
)
def get_models_endpoint(
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):

    return get_model_versions(db)

@router.get(
    "/active",
    response_model=ModelVersionResponse
)
def get_active_model_endpoint(
    db: Session = Depends(get_db)
):

    model = get_active_model(db)

    if not model:

        raise HTTPException(
            status_code=404,
            detail="No active model"
        )

    return model

@router.patch(
    "/{model_id}/activate",
    response_model=ModelVersionResponse
)
def activate_model_endpoint(
    model_id: UUID,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):

    try:

        return activate_model_version(
            db,
            model_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )