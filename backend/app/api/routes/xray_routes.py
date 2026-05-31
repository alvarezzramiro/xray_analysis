from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import os

from app.db.dependencies import get_db
from app.schemas.xray_schema import XRayUploadResponse, XRayResponse
from app.services.xray_service import create_xray_record

from app.models.xray_image import XRayImage

from app.core.security import get_current_user

from backend.app.models.users import User

router = APIRouter(
    prefix="/xray",
    tags=["XRay"]
)

@router.post("/upload", response_model=XRayUploadResponse)
def upload_xray_endpoint(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
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
        filepath=filepath,
        user_id=current_user.id
    )

    return XRayUploadResponse(
        image_id=xray.id,
        status=xray.status
    )

@router.get("/my", response_model=list[XRayResponse])
def get_my_xrays(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    xrays = (
        db.query(XRayImage)
        .filter(
            XRayImage.user_id == current_user.id
        )
        .order_by(XRayImage.created_at.desc())
        .all()
    )

    return xrays