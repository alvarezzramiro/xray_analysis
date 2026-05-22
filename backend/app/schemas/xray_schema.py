from pydantic import BaseModel
from uuid import UUID

class XRayUploadResponse(BaseModel):
    image_id: UUID
    status: str