from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.training_schema import TrainingCandidateResponse

from app.services.training_service import get_pending_training_candidates

from app.services.training_export_service import export_pending_candidates

from app.schemas.training_schema import ExportResponse

router = APIRouter(
    prefix="/training",
    tags=["Training"]
)

@router.get(
    "/candidates",
    response_model=list[TrainingCandidateResponse]
)
def get_training_candidates_endpoint(
    db: Session = Depends(get_db)
):
    return get_pending_training_candidates(db)

@router.post(
    "/export",
    response_model=ExportResponse
)
def export_training_dataset(
    db: Session = Depends(get_db)
):

    exported_count = (
        export_pending_candidates(db)
    )

    return {
        "exported_candidates": exported_count
    }