from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
import os

from app.db.dependencies import get_db
from app.schemas.xray_schema import XRayUploadResponse
from app.services.xray_service import (
    save_xray_file,
    create_xray_record
)

from app.services.analysis_service import analyze_xray

from app.schemas.analysis_schema import AnalysisResponse

from app.models.xray_image import XRayImage

from app.models.xray_analysis import XRayAnalysis

router = APIRouter()

@router.post("/upload-xray", response_model=XRayUploadResponse)
def upload_xray_endpoint(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    import uuid
    
    image_id = str(uuid.uuid4())
    
    _, ext = os.path.splitext(file.filename)
    if not ext:
        ext = ".jpg" # Por si viene sin extensión
        
    nuevo_nombre = f"{image_id}{ext}"
    filepath = f"/code/uploads/{nuevo_nombre}"

    try:
        with open(filepath, "wb") as buffer:
            buffer.write(file.file.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al guardar archivo: {e}")

    xray = create_xray_record(
        db=db,
        id=image_id, 
        filename=nuevo_nombre,
        filepath=filepath
    )

    return XRayUploadResponse(
        image_id=xray.id,
        status=xray.status
    )

@router.post("/analyze/{image_id}", response_model=AnalysisResponse)
def analyze_xray_endpoint(image_id: UUID, db: Session = Depends(get_db)):
    
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

    analysis = analyze_xray(
        db=db,
        image_id=xray.id,
        image_path=xray.filepath
    )

    return {
        "analysis_id": analysis.id,
        "image_id": analysis.image_id,
        "model_version": analysis.model_version,
        "fracture_detected": analysis.fracture_detected,
        "detections_count": analysis.detections_count,
        "max_confidence": analysis.max_confidence,
        "detections": analysis.detections,
        "annotated_image_path": analysis.annotated_image_path,
        "processing_time_ms": analysis.processing_time_ms,
        "status": analysis.status,
        "error_message": analysis.error_message
    }

@router.get("/analysis/{analysis_id}")
def get_analysis_endpoint(analysis_id: UUID, db: Session = Depends(get_db)):
    analysis = (
        db.query(XRayAnalysis)
        .filter(XRayAnalysis.id == analysis_id)
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    return analysis

@router.get("/xray/{image_id}/analyses")
def get_xray_analyses_endpoint(image_id: UUID, db: Session = Depends(get_db)):
    analyses = (
        db.query(XRayAnalysis)
        .filter(XRayAnalysis.image_id == image_id)
        .all()
    )

    return analyses