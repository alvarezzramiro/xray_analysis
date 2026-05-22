import os
import uuid

from app.models.xray_image import XRayImage

from sqlalchemy.orm import Session


UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_xray_file(file):
    file_extension = file.filename.split(".")[-1]

    unique_filename = f"{uuid.uuid4()}.{file_extension}"

    filepath = os.path.join(UPLOAD_DIR, unique_filename)

    with open(filepath, "wb") as buffer:
        buffer.write(file.file.read())

    return unique_filename, filepath


def create_xray_record(db: Session, id: str, filename:str, filepath:str):
    
    db_xray = XRayImage(
        id=id,
        filename=filename,
        filepath=filepath,
        status="uploaded"
    )

    db.add(db_xray)
    db.commit()
    db.refresh(db_xray)

    return db_xray