from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.core.security import get_current_user

from app.models.user import User
from app.models.xray_analysis import XRayAnalysis
from app.models.xray_image import XRayImage

from app.schemas.feedback_schema import (
    FeedbackCreate,
    FeedbackResponse,
    FeedbackStatsResponse
)

from app.services.feedback_service import (
    create_feedback,
    get_user_feedbacks,
    get_feedback_by_id,
    get_feedback_stats
)

router = APIRouter(
    prefix="/feedback",
    tags=["Feedback"]
)

@router.post(
    "/",
    response_model=FeedbackResponse
)
def create_feedback_endpoint(
    feedback_data: FeedbackCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    analysis = (
        db.query(XRayAnalysis)
        .join(
            XRayImage,
            XRayAnalysis.image_id == XRayImage.id
        )
        .filter(
            XRayAnalysis.id == feedback_data.analysis_id,
            XRayImage.user_id == current_user.id
        )
        .first()
    )

    if not analysis:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    try:

        feedback = create_feedback(
            db=db,
            user_id=current_user.id,
            analysis_id=feedback_data.analysis_id,
            feedback_type=feedback_data.feedback_type,
            comment=feedback_data.comment
        )

        return feedback

    except ValueError as e:
    
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )
    
@router.get(
    "/my",
    response_model=list[FeedbackResponse]
)
def get_my_feedback_endpoint(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    feedbacks = get_user_feedbacks(
        db,
        current_user.id
    )
    
    return feedbacks

@router.get(
    "/stats",
    response_model=FeedbackStatsResponse
)
def get_feedback_stats_endpoint(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return get_feedback_stats(
        db,
        current_user.id
    )

@router.get(
    "/{feedback_id}",
    response_model=FeedbackResponse
)
def get_feedback_endpoint(
    feedback_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    feedback = get_feedback_by_id(
        db,
        feedback_id,
        current_user.id
    )

    if not feedback:

        raise HTTPException(
            status_code=404,
            detail="Feedback not found"
        )

    return feedback