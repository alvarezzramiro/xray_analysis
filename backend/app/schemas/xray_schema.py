from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class XRayUploadResponse(BaseModel):
    image_id: UUID
    status: str

class XRayResponse(BaseModel):
    id: UUID
    filename: str
    status: str
    created_at: datetime
    class Config:
        from_attributes = True