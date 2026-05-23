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

from app.services.analysis_service import (generate_fake_analysis)

from app.schemas.analysis_schema import (AnalysisResponse)

from app.models.xray_image import XRayImage

from app.services.overlay_service import (generate_overlay_image)

from app.services.detectors import FractureDetector

router = APIRouter()


@router.post("/upload-xray", response_model=XRayUploadResponse)
def upload_xray(
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
def analyze_xray(image_id: UUID, db: Session = Depends(get_db)):
    
    analysis = generate_fake_analysis(db=db, image_id=image_id)
    
    return analysis

@router.post("/overlay/{image_id}")
def create_overlay(image_id: UUID, db: Session = Depends(get_db)):
    xray = (
        db.query(XRayImage)
        .filter(XRayImage.id == image_id)
        .first()
    )

    if not xray:
        return { "error": "X-Ray not found" }
    
    analysis = generate_fake_analysis(
        db=db,
        image_id=image_id
    )

    annotated_path = generate_overlay_image(
        image_path=xray.filepath,
        analysis=analysis
    )

    return {
        "image_id": image_id,
        "annotated_image": annotated_path
    }

@router.post("/test-yolo/{image_id}")
def test_yolo(image_id: str):

    image_path = f"/code/uploads/{image_id}.jpg"

    if not os.path.exists(image_path):
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )

    detector = FractureDetector()
    result = detector.detect(image_path)

    return {
        "image_id": image_id,
        "detections": result["detections"],
        "annotated_image": result["annotated_image"]
    }