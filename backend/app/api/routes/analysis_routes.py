from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.db.dependencies import get_db

from app.services.analysis_service import ( analyze_xray, build_analysis_response )

from app.schemas.analysis_schema import AnalysisResponse

from app.models.xray_image import XRayImage

from app.models.xray_analysis import XRayAnalysis

from app.core.security import get_current_user
from app.core.exceptions import NoActiveModelError

from app.models.users import User

from pathlib import Path

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

    response = []

    for analysis in analyses:

        response.append(
            build_analysis_response(
                analysis,
                analysis.image
            )
        )

    return response

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

    try:

        analysis = analyze_xray(
            db=db,
            image_id=xray.id,
            image_path=xray.filepath
        )

        return build_analysis_response(analysis, xray)
    
    except NoActiveModelError as e:

        raise HTTPException(
            status_code=503,
            detail=str(e)
        )

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
    
    annotated_image_url = None

    if analysis.annotated_image_path:

        annotated_image_url = (
            f"http://localhost:8000/annotated/"
            f"{analysis.annotated_image_path}"
        )

    xray = (
        db.query(XRayImage)
        .filter(
            XRayImage.id == analysis.image_id
        )
        .first()
    )

    original_image_url = (
        f"http://localhost:8000/uploads/"
        f"{xray.filename}"
    )


    return build_analysis_response(
        analysis,
        analysis.image
    )

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