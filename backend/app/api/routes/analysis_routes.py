from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.db.dependencies import get_db

from app.services.analysis_service import analyze_xray

from app.schemas.analysis_schema import AnalysisResponse

from app.models.xray_image import XRayImage

from app.models.xray_analysis import XRayAnalysis

from app.core.security import get_current_user

from app.models.users import User

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)

@router.get("/my", response_model=list[AnalysisResponse])
def get_my_analyses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    analyses = (
        db.query(XRayAnalysis)
        .join(
            XRayImage,
            XRayAnalysis.image_id == XRayImage.id
        )
        .filter(
            XRayImage.user_id == current_user.id
        )
        .order_by(XRayAnalysis.created_at.desc())
        .all()
    )

    return analyses

@router.post("/{image_id}", response_model=AnalysisResponse)
def analyze_xray_endpoint(
    image_id: UUID, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    xray = (
        db.query(XRayImage)
        .filter(XRayImage.id == image_id)
        .first()
    )

    if not xray:
        raise HTTPException(
            status_code=404,
            detail="X-Ray not found"
        )
    
    if xray.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    analysis = analyze_xray(
        db=db,
        image_id=xray.id,
        image_path=xray.filepath
    )

    return analysis

@router.get("/{analysis_id}")
def get_analysis_endpoint(
    analysis_id: UUID, 
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
            XRayAnalysis.id == analysis_id,
            XRayImage.user_id == current_user.id
        )
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    return analysis

@router.get("/xray/{image_id}", response_model=list[AnalysisResponse])
def get_xray_analyses_endpoint(
    image_id: UUID, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    xray = (
        db.query(XRayImage)
        .filter(
            XRayImage.id == image_id,
            XRayImage.user_id == current_user.id
        )
        .first()
    )

    if not xray:

        raise HTTPException(
            status_code=404,
            detail="X-Ray not found"
        )

    analyses = (
        db.query(XRayAnalysis)
        .filter(XRayAnalysis.image_id == image_id)
        .order_by(XRayAnalysis.created_at.desc())
        .all()
    )

    return analyses